import { useEffect, useState } from "react";

import {
  ensureConsentMode,
  type ConsentMode,
  updateConsentMode,
} from "../lib/consent";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consentMode, setConsentMode] = useState<ConsentMode>("all");

  useEffect(() => {
    setConsentMode(ensureConsentMode());
    setIsVisible(false);

    const openBanner = () => setIsVisible(true);
    document.addEventListener("kaizer:open-consent", openBanner);

    const footerButtons = document.querySelectorAll("[data-open-consent]");
    footerButtons.forEach((button) =>
      button.addEventListener("click", openBanner),
    );

    return () => {
      document.removeEventListener("kaizer:open-consent", openBanner);
      footerButtons.forEach((button) =>
        button.removeEventListener("click", openBanner),
      );
    };
  }, []);

  const setConsent = (value: ConsentMode) => {
    updateConsentMode(value);
    setConsentMode(value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="consent-banner" data-consent-banner>
      <div className="consent-banner__inner">
        <div>
          <p className="section-kicker">Preferences</p>
          <p className="consent-banner__copy">
            Analytics is enabled by default so visits, traffic sources, page
            usage, scroll depth, and outbound clicks can be measured in GA4.
            You can switch this site to essential-only tracking here at any
            time. Current mode: <strong>{consentMode}</strong>.
          </p>
        </div>

        <div className="consent-banner__actions">
          <button
            className="button button--ghost"
            type="button"
            data-analytics-event="consent_mode_essential"
            data-analytics-label="cookie_banner"
            onClick={() => setConsent("essential")}
          >
            Essential only
          </button>
          <button
            className="button"
            type="button"
            data-analytics-event="consent_mode_all"
            data-analytics-label="cookie_banner"
            onClick={() => setConsent("all")}
          >
            Allow preferences
          </button>
        </div>
      </div>
    </div>
  );
}
