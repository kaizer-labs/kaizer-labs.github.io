import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { ensureConsentMode, type ConsentMode } from "../lib/consent";

declare global {
  interface Window {
    __kaizerGaConfigured?: boolean;
    __kaizerGaLoaded?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const scrollMilestones = [25, 50, 75, 100];
const downloadExtensions = [
  "pdf",
  "zip",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "csv",
  "txt",
  "ics",
];

function initializeGoogleTag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function pushToDataLayer(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

function setAnalyticsDisabled(measurementId: string, disabled: boolean) {
  (
    window as Window &
      Record<`ga-disable-${string}`, boolean | undefined>
  )[`ga-disable-${measurementId}`] = disabled;
}

function configureGoogleTag(measurementId: string) {
  initializeGoogleTag();

  if (window.__kaizerGaConfigured) return;

  window.gtag?.("js", new Date());
  window.gtag?.("config", measurementId, {
    anonymize_ip: true,
    send_page_view: false,
  });
  window.__kaizerGaConfigured = true;
}

function loadGoogleTag(measurementId: string) {
  if (window.__kaizerGaLoaded) return;

  const gaScriptId = "kaizer-ga-script";
  const existingScript = document.getElementById(gaScriptId);
  if (existingScript) {
    window.__kaizerGaLoaded = true;
    return;
  }

  const script = document.createElement("script");
  script.id = gaScriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  window.__kaizerGaLoaded = true;
}

function resolveSectionLabel(element: Element) {
  const explicitLabel = element.getAttribute("data-analytics-section");
  if (explicitLabel) return explicitLabel;

  const heading = element.querySelector("h1, h2, h3");
  if (heading?.textContent?.trim()) {
    return heading.textContent.trim().toLowerCase().replace(/\s+/g, "_");
  }

  if (element.id) return element.id;

  const className =
    typeof element.className === "string" ? element.className.trim() : "";

  return className.split(/\s+/).find(Boolean) || element.tagName.toLowerCase();
}

function getLinkMetadata(anchor: HTMLAnchorElement) {
  let destinationUrl: URL | null = null;

  try {
    destinationUrl = new URL(anchor.href, window.location.href);
  } catch {
    destinationUrl = null;
  }

  const pathname = destinationUrl?.pathname || anchor.getAttribute("href") || "";
  const extension = pathname.split(".").pop()?.toLowerCase();
  const isDownload =
    !!extension && downloadExtensions.includes(extension.replace(/^\//, ""));
  const isOutbound =
    !!destinationUrl && destinationUrl.origin !== window.location.origin;

  return {
    destination_host: destinationUrl?.host,
    destination_path: pathname,
    is_download: isDownload,
    is_outbound: isOutbound,
    link_text: anchor.textContent?.trim() || anchor.getAttribute("aria-label") || "link",
  };
}

function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
}

export function Analytics() {
  const location = useLocation();
  const currentPath = useMemo(
    () => `${location.pathname}${location.search}${location.hash}`,
    [location.hash, location.pathname, location.search],
  );
  const [consentMode, setConsentMode] = useState<ConsentMode>("all");
  const pageStartRef = useRef<number>(0);

  useEffect(() => {
    const syncConsent = () => setConsentMode(ensureConsentMode());
    const handleConsentUpdated = (event: Event) => {
      const consentEvent = event as CustomEvent<ConsentMode>;
      setConsentMode(consentEvent.detail);
    };

    syncConsent();
    window.addEventListener("kaizer:consent-updated", handleConsentUpdated);

    return () => {
      window.removeEventListener("kaizer:consent-updated", handleConsentUpdated);
    };
  }, []);

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!measurementId) return;

    const analyticsEnabled = consentMode === "all";
    setAnalyticsDisabled(measurementId, !analyticsEnabled);

    if (!analyticsEnabled) return;

    configureGoogleTag(measurementId);
    loadGoogleTag(measurementId);
  }, [consentMode]);

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!measurementId || consentMode !== "all") return;

    pageStartRef.current = performance.now();

    trackEvent("page_view", {
      page_location: window.location.href,
      page_path: currentPath,
      page_referrer: document.referrer || undefined,
      page_title: document.title,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
    });

    const seenScrollMilestones = new Set<number>();
    const seenSections = new Set<string>();

    const handleAnalyticsClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("[data-analytics-event]")
          : null;

      if (!target) return;

      const eventName = target.getAttribute("data-analytics-event");
      if (!eventName) return;

      const label =
        target.getAttribute("data-analytics-label") ||
        target.getAttribute("href") ||
        target.textContent?.trim() ||
        "unknown";

      trackEvent(eventName, {
        event_category: "engagement",
        event_label: label,
        page_path: currentPath,
      });
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;

      if (!(anchor instanceof HTMLAnchorElement)) return;

      const metadata = getLinkMetadata(anchor);

      if (metadata.is_outbound) {
        trackEvent("outbound_click", {
          event_category: "navigation",
          event_label: metadata.link_text,
          destination_host: metadata.destination_host,
          destination_path: metadata.destination_path,
          page_path: currentPath,
        });
      }

      if (metadata.is_download) {
        trackEvent("download_click", {
          event_category: "asset",
          event_label: metadata.link_text,
          destination_path: metadata.destination_path,
          page_path: currentPath,
        });
      }
    };

    const reportScrollDepth = () => {
      const scrollTop = window.scrollY + window.innerHeight;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      const denominator = Math.max(documentHeight, 1);
      const progress = Math.min((scrollTop / denominator) * 100, 100);

      scrollMilestones.forEach((milestone) => {
        if (progress >= milestone && !seenScrollMilestones.has(milestone)) {
          seenScrollMilestones.add(milestone);
          trackEvent("scroll_depth_reached", {
            event_category: "engagement",
            percent_scrolled: milestone,
            page_path: currentPath,
          });
        }
      });
    };

    let scrollTicking = false;
    const handleScroll = () => {
      if (scrollTicking) return;

      scrollTicking = true;
      window.requestAnimationFrame(() => {
        reportScrollDepth();
        scrollTicking = false;
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.55) return;

          const sectionLabel = resolveSectionLabel(entry.target);
          if (seenSections.has(sectionLabel)) return;

          seenSections.add(sectionLabel);
          trackEvent("section_view", {
            event_category: "engagement",
            event_label: sectionLabel,
            page_path: currentPath,
          });
        });
      },
      {
        threshold: [0.55],
      },
    );

    document
      .querySelectorAll("main > section, main > article, main > article > section")
      .forEach((section) => sectionObserver.observe(section));

    const handleCopy = () => {
      const selectedText = document.getSelection()?.toString().trim();
      if (!selectedText) return;

      trackEvent("content_copy", {
        event_category: "engagement",
        copied_characters: selectedText.length,
        page_path: currentPath,
      });
    };

    const handleSubmit = (event: SubmitEvent) => {
      if (!(event.target instanceof HTMLFormElement)) return;

      trackEvent("form_submit", {
        event_category: "engagement",
        event_label: event.target.getAttribute("name") || event.target.id || "form",
        form_action: event.target.getAttribute("action") || currentPath,
        page_path: currentPath,
      });
    };

    document.addEventListener("click", handleAnalyticsClick);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("submit", handleSubmit);
    window.addEventListener("scroll", handleScroll, { passive: true });
    reportScrollDepth();

    return () => {
      const elapsedSeconds = Math.max(
        Math.round((performance.now() - pageStartRef.current) / 1000),
        0,
      );

      if (elapsedSeconds > 0) {
        trackEvent("page_engagement_detail", {
          engagement_time_seconds: elapsedSeconds,
          max_scroll_percent: Math.max(...Array.from(seenScrollMilestones), 0),
          page_path: currentPath,
        });
      }

      sectionObserver.disconnect();
      document.removeEventListener("click", handleAnalyticsClick);
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("submit", handleSubmit);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [consentMode, currentPath]);

  return null;
}
