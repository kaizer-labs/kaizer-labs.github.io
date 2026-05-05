import type { ReactNode } from "react";

import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { Analytics } from "./Analytics";
import { ConsentBanner } from "./ConsentBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  title: string;
  description: string;
  frameClass?: string;
  children: ReactNode;
}

export function Layout({
  title,
  description,
  frameClass,
  children,
}: LayoutProps) {
  useDocumentMeta({ title, description });
  useScrollToTop();

  return (
    <>
      <Analytics />
      <div className={["site-frame", frameClass].filter(Boolean).join(" ")}>
        <div className="site-glow site-glow--left"></div>
        <div className="site-glow site-glow--right"></div>
        <div className="site-grid"></div>
        <Header />
        <main className="page-shell">{children}</main>
        <Footer />
        <ConsentBanner />
      </div>
    </>
  );
}
