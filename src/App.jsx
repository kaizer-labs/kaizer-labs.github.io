import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, OrbitControls, Sphere, Torus } from "@react-three/drei";
import { ArrowUpRight, BookOpen, Briefcase, Cpu, Database, Layers3, Menu, X } from "lucide-react";

const blogPosts = [
  {
    slug: "from-monolith-to-momentum",
    title: "From Monolith to Momentum: What Platform Modernization Actually Takes",
    date: "March 2026",
    category: "Architecture",
    summary:
      "A practical account of moving business-critical backend systems toward microservices and event-driven design without breaking delivery.",
    content: `Most modernization efforts fail for the same reason: people treat architecture as a drawing exercise instead of an operating discipline. The real work begins after the diagram looks clean.

In my own platform work, the hard part was never naming the services. It was deciding where boundaries actually belonged, how ownership should shift, what latency budgets mattered, and how to evolve the system without turning every sprint into a migration project. That required tradeoff discipline. A monolith is not a moral failure. Sometimes it is simply a system that outlived the assumptions it was built on.

The first useful move is not decomposition. It is visibility. Before splitting anything, I focus on request paths, dependency bottlenecks, retry patterns, cache behavior, and operational pain. Once the failure modes are obvious, the service boundaries become less theoretical and more economic.

The second move is to separate business capability from framework enthusiasm. Teams often overfit to fashionable patterns. Event-driven architecture is powerful, but only when event contracts, idempotency, observability, and replay strategy are treated as first-class concerns. Otherwise, you do not get decoupling. You get distributed confusion.

The third move is sequencing. Strong modernization preserves delivery. That means identifying low-regret seams, extracting high-value paths first, and leaving enough room for rollback. Good migrations are staged campaigns, not heroic rewrites.

What matters most is this: architecture should make the team faster, not just the diagram prettier. If a modernization effort improves reliability, throughput, system ownership, and developer confidence, it is working. If it only creates more meetings and more boxes, it is theater.`,
  },
  {
    slug: "latency-is-a-leadership-problem",
    title: "Latency Is a Leadership Problem, Not Just a Technical One",
    date: "March 2026",
    category: "Engineering Leadership",
    summary:
      "Why performance work often stalls until somebody treats it as a product, architecture, and execution problem at the same time.",
    content: `Teams love to call latency a technical issue because that makes it feel containable. In reality, persistent latency is usually a sign of fragmented ownership. Nobody owns the whole path, everyone owns a piece, and the user pays the tax.

When I think about performance work, I treat it as a leadership problem first. That means drawing the full path from request initiation to final response, making the bottlenecks visible, and forcing tradeoffs into the open. Is the problem compute, orchestration, data access, API shape, cache design, or simply too many hops? The answer usually involves several layers at once.

Meaningful latency improvement rarely comes from one clever trick. It comes from removing waste in sequence. Better API contracts. Smarter caching. Fewer duplicate calls. Cleaner data retrieval patterns. Better async boundaries. Tighter instrumentation. Once those are aligned, performance gains stop being random and start being repeatable.

This is also where leadership matters. Somebody has to align backend, product, frontend, and data concerns into one objective. Somebody has to say no to work that adds surface area without value. Somebody has to push for operational clarity instead of optimism.

The lesson is simple. Fast systems are usually a byproduct of clear ownership and ruthless prioritization. Teams do not accidentally get sub-second behavior in critical workflows. They decide it matters, then they engineer for it.`,
  },
  {
    slug: "building-ai-systems-that-earn-trust",
    title: "Building AI Systems That Earn Trust in Real Engineering Environments",
    date: "March 2026",
    category: "AI Systems",
    summary:
      "A grounded view on AI-enabled platforms, retrieval, orchestration, and why operational trust matters more than novelty.",
    content: `AI systems are easy to demo and hard to operationalize. That gap is where most value is won or lost.

In engineering environments, the useful question is not whether a model can generate an answer. The useful question is whether the system around the model produces consistent, explainable, and operationally trustworthy outcomes. That means retrieval quality, data freshness, fallback behavior, auditability, and latency are part of the product, not implementation details.

I approach AI-enabled systems the same way I approach any other critical platform. Start with the workflow. Define where intelligence actually improves the user outcome. Then constrain the problem. What data is authoritative? What can be cached? What must be recomputed? What happens when confidence is low? If those answers are missing, the system is not ready.

The engineering challenge is orchestration, not just prompting. Useful AI platforms require clean contracts between ingestion, retrieval, ranking, model execution, observability, and user-facing controls. They also require restraint. A simple deterministic path with good monitoring often beats a complicated agent flow that nobody can debug.

The future belongs to teams that can combine software discipline with AI leverage. Not hype. Not dashboards full of vague metrics. Real systems. Clear contracts. Measurable outcomes. That is where trust is built, and trust is what keeps AI from becoming another expensive toy.`,
  },
];

const projects = [
  {
    title: "Platform Modernization",
    icon: Layers3,
    blurb: "Drove backend modernization toward microservices and event-driven patterns for business-critical systems.",
  },
  {
    title: "High-Scale Data & Search Systems",
    icon: Database,
    blurb: "Designed data-intensive services, request pipelines, and fitment and similarity workflows backed by cloud and analytics infrastructure.",
  },
  {
    title: "AI-Enabled Engineering Platforms",
    icon: Cpu,
    blurb: "Built and shaped AI-assisted systems, retrieval-driven workflows, and production-minded platform foundations.",
  },
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} />
      <Environment preset="city" />
      <Float speed={1.5} rotationIntensity={1.1} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]} position={[-1.5, 0.2, 0]}>
          <MeshDistortMaterial distort={0.35} speed={1.8} roughness={0.1} metalness={0.5} />
        </Sphere>
      </Float>
      <Float speed={1.1} rotationIntensity={1.2} floatIntensity={1.2}>
        <Torus args={[1.2, 0.3, 24, 120]} position={[1.7, -0.1, 0.2]} rotation={[1.1, 0.5, 0.2]}>
          <meshStandardMaterial metalness={0.7} roughness={0.2} />
        </Torus>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.4} enablePan={false} />
    </Canvas>
  );
}

function NavLinks({ items, onClick }) {
  return items.map((item) => (
    <a
      key={item.label}
      href={item.href}
      onClick={onClick}
      className="transition-colors hover:text-white"
    >
      {item.label}
    </a>
  ));
}

export default function KaizerPortfolioSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(blogPosts[0]);
  const nav = useMemo(() => navItems, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_25%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-200">
            Kaizer Charania
          </a>

          <nav className="hidden items-center gap-8 text-sm text-neutral-300 md:flex">
            <NavLinks items={nav} />
          </nav>

          <button
            type="button"
            className="rounded-xl border border-white/10 p-2 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-nav" className="border-t border-white/10 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-neutral-300">
              <NavLinks items={nav} onClick={() => setMenuOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <main id="top" className="relative z-10">
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-300">
              <Briefcase className="h-3.5 w-3.5" />
              Software Engineer Lead · Platform and AI Systems
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              I build reliable backend platforms, modern distributed systems, and AI-enabled engineering products.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
              Engineering leader with a strong backend foundation across platform architecture, event-driven systems,
              cloud-native services, data-heavy workflows, and production-minded AI initiatives.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#work"
                className="rounded-2xl border border-white/10 bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition-transform hover:-translate-y-0.5"
              >
                View Work
              </a>
              <a
                href="#writing"
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Read Blog
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative h-[380px] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-black/30 lg:h-[520px]"
          >
            <div className="absolute inset-0">
              <HeroScene />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-[0.22em] text-neutral-400">Focus Areas</div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-200">
                {[
                  "Distributed Systems",
                  "Platform Engineering",
                  "Event-Driven Architecture",
                  "AI-Enabled Products",
                  "Cloud and Data Infrastructure",
                ].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
              <div className="text-sm uppercase tracking-[0.22em] text-neutral-400">About</div>
              <p className="mt-5 text-lg leading-8 text-neutral-200">
                I work at the intersection of backend engineering, platform architecture, technical leadership, and
                AI-oriented product thinking. My strength is turning complex technical problems into systems that are
                faster, more reliable, and easier for teams to operate.
              </p>
              <p className="mt-4 text-base leading-8 text-neutral-300">
                My work spans backend platform modernization, microservice evolution, event-driven design, data-intensive
                workflows, engineering process improvement, and building practical AI systems that serve real operational
                goals.
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
              <div className="text-sm uppercase tracking-[0.22em] text-neutral-400">Core Stack</div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-neutral-200">
                {[
                  "Python",
                  "React",
                  "AWS",
                  "GraphQL",
                  "FastAPI / Flask",
                  "Redis",
                  "DynamoDB / Athena",
                  "Docker",
                  "WebSockets",
                  "Microservices",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="mb-8">
            <div className="text-sm uppercase tracking-[0.22em] text-neutral-400">Selected Work</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Systems built for scale, speed, and practical impact
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">{project.blurb}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="writing" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.22em] text-neutral-400">Writing</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Essays on architecture, leadership, and production AI
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
              <BookOpen className="h-4 w-4" />
              Custom blog section
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className={`w-full rounded-[24px] border p-5 text-left transition-all ${
                    selectedPost.slug === post.slug
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">{post.category}</div>
                    <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">{post.summary}</p>
                  <div className="mt-3 text-xs text-neutral-500">{post.date}</div>
                </button>
              ))}
            </div>

            <motion.article
              key={selectedPost.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">{selectedPost.category}</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">{selectedPost.title}</h3>
              <div className="mt-3 text-sm text-neutral-500">{selectedPost.date}</div>
              <div className="mt-6 space-y-5 text-base leading-8 text-neutral-200">
                {selectedPost.content.split("\n\n").map((paragraph, index) => (
                  <p key={`${selectedPost.slug}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-10">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl shadow-black/25 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-neutral-400">Contact</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Open to serious conversations about platform, architecture, and engineering leadership.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-neutral-300">
                  This section is ready for your LinkedIn, GitHub, resume link, and direct contact details.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
