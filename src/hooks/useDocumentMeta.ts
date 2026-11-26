import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { site } from "../data/site";

interface DocumentMetaOptions {
  title: string;
  description: string;
  noindex?: boolean;
}

export function useDocumentMeta({ title, description, noindex = false }: DocumentMetaOptions) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const existingRobots = document.querySelector('meta[name="robots"]');
    if (noindex || import.meta.env.DEV) {
      const robots = existingRobots || document.createElement("meta");
      robots.setAttribute("name", "robots");
      robots.setAttribute("content", "noindex, nofollow, noarchive");
      if (!existingRobots) document.head.appendChild(robots);
    } else {
      existingRobots?.remove();
    }

    const setMeta = (selector: string, attribute: string, value: string) => {
      const node = document.querySelector(selector);
      if (node) {
        node.setAttribute(attribute, value);
      }
    };

    const canonicalUrl = new URL(site.website);
    canonicalUrl.pathname = location.pathname === "/"
      ? "/"
      : `${location.pathname.replace(/\/+$/, "")}/`;
    canonicalUrl.search = "";
    canonicalUrl.hash = "";
    const canonicalHref = canonicalUrl.toString();

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalHref);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", canonicalHref);
  }, [description, location.pathname, noindex, title]);
}

