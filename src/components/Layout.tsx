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
  noindex?: boolean;
  children: ReactNode;
}

export function Layout({
  title,
  description,
  frameClass,
  noindex,
  children,
}: LayoutProps) {
  useDocumentMeta({ title, description, noindex });
  useScrollToTop();

  return (
    <>
      <Analytics />
      <div className={["site-frame", frameClass].filter(Boolean).join(" ")}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main className="page-shell" id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <ConsentBanner />
      </div>
    </>
  );
}
