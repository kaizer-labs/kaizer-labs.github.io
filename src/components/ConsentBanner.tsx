import { useEffect, useState } from "react";

const consentKey = "kaizer-portfolio-consent";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(consentKey);
    setIsVisible(!storedConsent);

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

  const setConsent = (value: "essential" | "all") => {
    window.localStorage.setItem(consentKey, value);
    window.dispatchEvent(
      new CustomEvent("kaizer:consent-updated", { detail: value }),
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="consent-banner" data-consent-banner>
      <div className="consent-banner__inner">
        <div>
          <p className="section-kicker">Preferences</p>
          <p className="consent-banner__copy">
            This portfolio stores a small local preference so the cookie controls
            feel integrated instead of outsourced.
          </p>
        </div>

        <div className="consent-banner__actions">
          <button
            className="button button--ghost"
            type="button"
            onClick={() => setConsent("essential")}
          >
            Essential only
          </button>
          <button className="button" type="button" onClick={() => setConsent("all")}>
            Allow preferences
          </button>
        </div>
      </div>
    </div>
  );
}

