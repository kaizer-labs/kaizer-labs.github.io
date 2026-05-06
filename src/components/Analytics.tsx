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
const engagementPulseIntervalMs = 45_000;
const maxEngagementPulsesPerPage = 10;
const viewportResizeDebounceMs = 450;
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
  if (window.gtag) return;

  window.gtag = function gtag() {
    (window.dataLayer as unknown[] | undefined)?.push(arguments);
  };
}

function setAnalyticsDisabled(measurementId: string, disabled: boolean) {
  const win = window as unknown as Record<string, boolean | undefined>;
  win[`ga-disable-${measurementId}`] = disabled;
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
  const cleanedExtension = extension?.replace(/^\//, "") || "";
  const isDownload =
    !!extension && downloadExtensions.includes(cleanedExtension);
  const origin = destinationUrl?.origin || "";
  const isOutbound =
    !!destinationUrl &&
    origin !== "" &&
    origin !== "null" &&
    origin !== window.location.origin;

  return {
    destination_host: destinationUrl?.host,
    destination_path: pathname,
    file_extension:
      cleanedExtension && downloadExtensions.includes(cleanedExtension)
        ? cleanedExtension
        : undefined,
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

  const payload = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean>;

  window.gtag("event", eventName, payload);
}

function getMeasurementId() {
  const raw =
    import.meta.env.VITE_GA_MEASUREMENT_ID ||
    import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
  const id = typeof raw === "string" ? raw.trim() : "";
  return id || undefined;
}

export function Analytics() {
  const location = useLocation();
  const currentPath = useMemo(
    () => `${location.pathname}${location.search}${location.hash}`,
    [location.hash, location.pathname, location.search],
  );
  const [consentMode, setConsentMode] = useState<ConsentMode>("all");
  const pageStartRef = useRef<number>(0);
  const pageVisibleSinceRef = useRef<number>(performance.now());
  const navTimingSentRef = useRef(false);
  const lastViewportSigRef = useRef("");

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
    const measurementId = getMeasurementId();
    if (!measurementId) return;

    const analyticsEnabled = consentMode === "all";
    setAnalyticsDisabled(measurementId, !analyticsEnabled);

    if (!analyticsEnabled) return;

    configureGoogleTag(measurementId);
    loadGoogleTag(measurementId);
  }, [consentMode]);

  useEffect(() => {
    const measurementId = getMeasurementId();
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

    if (!navTimingSentRef.current) {
      const navEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (navEntry) {
        navTimingSentRef.current = true;
        trackEvent("page_load_timing", {
          event_category: "performance",
          page_path: currentPath,
          dom_content_loaded_ms: Math.round(
            navEntry.domContentLoadedEventEnd,
          ),
          load_complete_ms: Math.round(navEntry.loadEventEnd),
          dns_ms: Math.round(navEntry.domainLookupEnd - navEntry.domainLookupStart),
          connect_ms: Math.round(navEntry.connectEnd - navEntry.connectStart),
          ttfb_ms: Math.round(navEntry.responseStart - navEntry.requestStart),
        });
      }
    }

    const seenScrollMilestones = new Set<number>();
    const seenSections = new Set<string>();
    let pulseCount = 0;

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
      if (anchor.closest("[data-analytics-event]")) return;

      const rawHref = anchor.getAttribute("href")?.trim() ?? "";
      if (!rawHref || rawHref.toLowerCase().startsWith("javascript:")) {
        return;
      }
      const linkLabel =
        anchor.textContent?.trim() ||
        anchor.getAttribute("aria-label") ||
        "link";

      if (rawHref.startsWith("mailto:")) {
        trackEvent("mailto_click", {
          event_category: "navigation",
          event_label: linkLabel,
          link_url: anchor.href,
          page_path: currentPath,
        });
        return;
      }

      if (rawHref.startsWith("tel:")) {
        trackEvent("tel_click", {
          event_category: "navigation",
          event_label: linkLabel,
          link_url: anchor.href,
          page_path: currentPath,
        });
        return;
      }

      if (rawHref.startsWith("#") && rawHref.length > 1) {
        trackEvent("fragment_link_click", {
          event_category: "navigation",
          event_label: linkLabel,
          fragment: rawHref,
          page_path: currentPath,
        });
        return;
      }

      const metadata = getLinkMetadata(anchor);

      if (metadata.is_download) {
        trackEvent("file_download", {
          event_category: "asset",
          link_text: metadata.link_text,
          link_url: anchor.href,
          file_extension: metadata.file_extension,
          destination_path: metadata.destination_path,
          page_path: currentPath,
        });
        trackEvent("download_click", {
          event_category: "asset",
          event_label: metadata.link_text,
          destination_path: metadata.destination_path,
          page_path: currentPath,
        });
        return;
      }

      if (metadata.is_outbound) {
        trackEvent("outbound_click", {
          event_category: "navigation",
          event_label: metadata.link_text,
          destination_host: metadata.destination_host,
          destination_path: metadata.destination_path,
          link_url: anchor.href,
          page_path: currentPath,
        });
        return;
      }

      trackEvent("internal_nav_click", {
        event_category: "navigation",
        event_label: metadata.link_text,
        link_url: anchor.href,
        destination_path: metadata.destination_path,
        page_path: currentPath,
      });
    };

    const handleUiButtonClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element ? event.target : null;
      if (!target) return;

      const control = target.closest(
        'button, [role="button"], input[type="button"]',
      );
      if (!control || !(control instanceof HTMLElement)) return;
      if (control.closest("[data-analytics-event]")) return;
      if (
        control instanceof HTMLButtonElement &&
        control.type === "submit"
      ) {
        return;
      }

      const label =
        control.getAttribute("aria-label") ||
        control.getAttribute("title") ||
        (control instanceof HTMLInputElement
          ? control.value
          : control.textContent?.trim()) ||
        "control";

      const inputType =
        control instanceof HTMLInputElement ? control.type : "button";

      trackEvent("ui_control_click", {
        event_category: "engagement",
        event_label: label.slice(0, 140),
        control_tag: control.tagName.toLowerCase(),
        control_type:
          control instanceof HTMLButtonElement ||
          control instanceof HTMLInputElement
            ? control.type || inputType
            : undefined,
        page_path: currentPath,
      });
    };

    const handleVisibilityChange = () => {
      const now = performance.now();
      if (document.visibilityState === "hidden") {
        trackEvent("tab_visibility", {
          visibility_state: "hidden",
          page_path: currentPath,
          active_time_ms: Math.round(now - pageVisibleSinceRef.current),
        });
      } else {
        trackEvent("tab_visibility", {
          visibility_state: "visible",
          page_path: currentPath,
        });
        pageVisibleSinceRef.current = now;
      }
    };

    const handlePageHide = (event: PageTransitionEvent) => {
      trackEvent("page_leave", {
        page_path: currentPath,
        persisted: event.persisted,
        engagement_time_seconds: Math.max(
          Math.round((performance.now() - pageStartRef.current) / 1000),
          0,
        ),
      });
    };

    const handleTimelineMilestoneClick = (
      milestoneEvent: Event,
    ): void => {
      const detail = (milestoneEvent as CustomEvent<Record<string, string>>).detail;
      if (!detail) return;
      trackEvent("timeline_milestone_click", {
        event_category: "engagement",
        company: detail.company,
        milestone_date: detail.milestone_date,
        milestone_label: detail.milestone_label,
        page_path: currentPath,
      });
    };

    const handleJavaScriptError = (errorEvent: ErrorEvent) => {
      trackEvent("javascript_error", {
        event_category: "diagnostics",
        message: (errorEvent.message || "error").slice(0, 240),
        source: errorEvent.filename,
        lineno: errorEvent.lineno,
        colno: errorEvent.colno,
        page_path: currentPath,
      });
    };

    const handleUnhandledRejection = (rejectionEvent: PromiseRejectionEvent) => {
      const reason = rejectionEvent.reason;
      const message =
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : "non_error_rejection";

      trackEvent("unhandled_promise_rejection", {
        event_category: "diagnostics",
        message: String(message).slice(0, 240),
        page_path: currentPath,
      });
    };

    pageVisibleSinceRef.current = performance.now();
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener(
      "kaizer:timeline-milestone-click",
      handleTimelineMilestoneClick,
    );
    window.addEventListener("error", handleJavaScriptError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const sig = `${window.innerWidth}x${window.innerHeight}`;
        if (sig === lastViewportSigRef.current) return;
        lastViewportSigRef.current = sig;
        trackEvent("viewport_resize", {
          event_category: "engagement",
          viewport_inner: sig,
          page_path: currentPath,
        });
      }, viewportResizeDebounceMs);
    };
    window.addEventListener("resize", handleResize);

    const heartbeatId = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (pulseCount >= maxEngagementPulsesPerPage) {
        window.clearInterval(heartbeatId);
        return;
      }
      pulseCount += 1;
      trackEvent("session_engagement_pulse", {
        event_category: "engagement",
        pulse_index: pulseCount,
        engagement_time_seconds: Math.max(
          Math.round((performance.now() - pageStartRef.current) / 1000),
          0,
        ),
        max_scroll_percent_so_far: Math.max(
          ...Array.from(seenScrollMilestones),
          0,
        ),
        page_path: currentPath,
      });
      if (pulseCount >= maxEngagementPulsesPerPage) {
        window.clearInterval(heartbeatId);
      }
    }, engagementPulseIntervalMs);

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

    document.addEventListener("click", handleAnalyticsClick, true);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("click", handleUiButtonClick);
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
      document.removeEventListener("click", handleAnalyticsClick, true);
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("click", handleUiButtonClick);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("submit", handleSubmit);
      window.removeEventListener("scroll", handleScroll);
      window.clearInterval(heartbeatId);
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener(
        "kaizer:timeline-milestone-click",
        handleTimelineMilestoneClick,
      );
      window.removeEventListener("error", handleJavaScriptError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, [consentMode, currentPath]);

  return null;
}
