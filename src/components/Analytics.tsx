import { useEffect } from "react";

declare global {
  interface Window {
    __kaizerGaConfigured?: boolean;
    __kaizerGaLoaded?: boolean;
    __kaizerAnalyticsEventsBound?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!measurementId) return;

    const gaScriptId = "kaizer-ga-script";

    const configureGa = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag =
        window.gtag ||
        function pushToDataLayer(...args: unknown[]) {
          window.dataLayer?.push(args);
        };

      if (window.__kaizerGaConfigured) return;

      window.gtag("js", new Date());
      window.gtag("config", measurementId);
      window.__kaizerGaConfigured = true;
    };

    const loadGa = () => {
      if (window.__kaizerGaLoaded) {
        configureGa();
        return;
      }

      const existingScript = document.getElementById(gaScriptId);
      if (existingScript) {
        configureGa();
        window.__kaizerGaLoaded = true;
        return;
      }

      const script = document.createElement("script");
      script.id = gaScriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.addEventListener("load", configureGa, { once: true });
      document.head.appendChild(script);
      window.__kaizerGaLoaded = true;
    };

    const handleClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("[data-analytics-event]")
          : null;

      if (!target || typeof window.gtag !== "function") return;

      const eventName = target.getAttribute("data-analytics-event");
      if (!eventName) return;

      const label =
        target.getAttribute("data-analytics-label") ||
        target.getAttribute("href") ||
        target.textContent?.trim() ||
        "unknown";

      window.gtag("event", eventName, {
        event_category: "engagement",
        event_label: label,
      });
    };

    loadGa();

    if (!window.__kaizerAnalyticsEventsBound) {
      document.addEventListener("click", handleClick);
      window.__kaizerAnalyticsEventsBound = true;
    }

    return () => {
      document.removeEventListener("click", handleClick);
      window.__kaizerAnalyticsEventsBound = false;
    };
  }, []);

  return null;
}

