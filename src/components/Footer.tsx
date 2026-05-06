import { Link } from "react-router-dom";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p className="footer-copy">© {year} Kaizer Charania</p>

        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <button
            className="footer-button"
            type="button"
            data-open-consent
            data-analytics-event="consent_preferences_open"
            data-analytics-label="footer_cookie_preferences"
            aria-haspopup="dialog"
          >
            Cookie preferences
          </button>
        </div>
      </div>
    </footer>
  );
}

