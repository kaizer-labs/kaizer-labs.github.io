import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));
const articleDirectory = path.join(root, "private-review/airbyte-2026/articles");
const animationDirectory = path.join(root, "private-review/airbyte-2026/animations");
const moduleId = "virtual:review-articles";
const resolvedModuleId = `\0${moduleId}`;
const animationModuleId = "virtual:review-animations";
const resolvedAnimationModuleId = `\0${animationModuleId}`;
const animationKinds = ["regression-verdict", "feedback-lifecycle", "window-splitting"] as const;
const animationRoute = "/_review/flow-previews/";

function localReview(enabled: boolean): Plugin {
  return {
    name: "local-review-articles",
    enforce: "pre",
    resolveId(id) {
      if (id === moduleId) return resolvedModuleId;
      if (id === animationModuleId) return resolvedAnimationModuleId;
    },
    async load(id) {
      if (id === resolvedAnimationModuleId) {
        const animations: Record<string, { gif: string; poster: string; durationSeconds: number }> = {};
        if (enabled) {
          const filenames = new Set(await readdir(animationDirectory).catch((error: NodeJS.ErrnoException) => {
            if (error.code === "ENOENT") return [];
            throw error;
          }));
          const manifest = filenames.has("manifest.json")
            ? JSON.parse(await readFile(path.join(animationDirectory, "manifest.json"), "utf8")) as Record<string, { durationSeconds?: unknown }>
            : {};
          for (const kind of animationKinds) {
            const duration = manifest[kind]?.durationSeconds;
            if (filenames.has(`${kind}.gif`) && filenames.has(`${kind}.png`) && typeof duration === "number" && Number.isFinite(duration) && duration > 0 && duration <= 90) {
              animations[kind] = { gif: `${animationRoute}${kind}.gif`, poster: `${animationRoute}${kind}.png`, durationSeconds: duration };
            }
          }
        }
        return `export default ${JSON.stringify(animations)};`;
      }
      if (id !== resolvedModuleId) return;
      const articles: Record<string, string> = {};
      // Production never reads the private directory or imports its contents.
      if (enabled) {
        const filenames = await readdir(articleDirectory).catch((error: NodeJS.ErrnoException) => {
          if (error.code === "ENOENT") return [];
          throw error;
        });
        for (const filename of filenames.filter((name) => name.endsWith(".md")).sort()) {
          articles[filename] = await readFile(path.join(articleDirectory, filename), "utf8");
        }
      }
      return `export default ${JSON.stringify(articles)};`;
    },
    configureServer(server) {
      if (!enabled) return;
      server.watcher.add(articleDirectory);
      server.watcher.add(animationDirectory);
      server.middlewares.use(async (request, response, next) => {
        let requestedPath: string;
        try {
          requestedPath = decodeURIComponent((request.url || "").split("?")[0]);
        } catch {
          response.statusCode = 400;
          response.end("Invalid request path.");
          return;
        }
        if (requestedPath.toLowerCase().includes("private-review")) {
          response.statusCode = 403;
          response.end("Private review documents are available only as local files.");
          return;
        }
        if (requestedPath.startsWith(animationRoute)) {
          const filename = requestedPath.slice(animationRoute.length);
          const allowed = animationKinds.some((kind) => filename === `${kind}.gif` || filename === `${kind}.png`);
          if (!allowed) {
            response.statusCode = 404;
            response.end("Preview not found.");
            return;
          }
          if (request.method !== "GET" && request.method !== "HEAD") {
            response.statusCode = 405;
            response.setHeader("Allow", "GET, HEAD");
            response.end();
            return;
          }
          try {
            const data = await readFile(path.join(animationDirectory, filename));
            response.setHeader("Content-Type", filename.endsWith(".gif") ? "image/gif" : "image/png");
            response.setHeader("Content-Length", data.byteLength);
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("X-Content-Type-Options", "nosniff");
            response.end(request.method === "HEAD" ? undefined : data);
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
              next(error);
              return;
            }
            response.statusCode = 404;
            response.end("Preview not found.");
          }
          return;
        }
        next();
      });
      const refresh = (filename: string) => {
        if (!filename.startsWith(`${articleDirectory}${path.sep}`) && !filename.startsWith(`${animationDirectory}${path.sep}`)) return;
        for (const id of [resolvedModuleId, resolvedAnimationModuleId]) {
          const module = server.moduleGraph.getModuleById(id);
          if (module) server.moduleGraph.invalidateModule(module);
        }
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh);
      server.watcher.on("change", refresh);
      server.watcher.on("unlink", refresh);
    },
    transform(code, id) {
      if (!enabled || !/\.(?:scss|css)(?:\?|$)/.test(id)) return;
      const localStyles = code.replace(/@import\s+url\(\s*(['"])https:\/\/fonts\.googleapis\.com\/[^'"]*\1\s*\)\s*;/g, "");
      if (localStyles !== code) return { code: localStyles, map: null };
    },
    async transformIndexHtml(html) {
      if (!enabled) return html;
      const fontSource = await readFile(path.join(root, "scripts/social-preview.html"), "utf8");
      const localFonts = (fontSource.match(/@font-face\s*\{[^}]+\}/g) || []).join("\n").replaceAll("font-display: block", "font-display: swap");
      return html
        .replace(/<link\b[^>]*href="https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>/g, "")
        .replace("</head>", `<style>${localFonts}</style>\n</head>`);
    },
  };
}

export default defineConfig(({ command, mode, isPreview }) => {
  const review = command === "serve" && mode !== "production" && !isPreview;
  return {
    plugins: [localReview(review), react()],
    server: {
      host: "127.0.0.1",
      // Preserve Vite's standard deny rules and register the private rule before
      // Vite compiles its filesystem matcher.
      fs: review ? { deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "**/private-review/**"] } : undefined,
      headers: review ? {
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:; connect-src 'self' ws://127.0.0.1:* ws://localhost:*; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
      } : {},
    },
  };
});

