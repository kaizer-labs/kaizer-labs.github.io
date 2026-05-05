import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { site } from "../data/site";

interface DocumentMetaOptions {
  title: string;
  description: string;
}

export function useDocumentMeta({ title, description }: DocumentMetaOptions) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attribute: string, value: string) => {
      const node = document.querySelector(selector);
      if (node) {
        node.setAttribute(attribute, value);
      }
    };

    const canonicalHref = new URL(location.pathname, site.website).toString();

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", canonicalHref);
  }, [description, location.pathname, title]);
}

