import { Link } from "react-router-dom";
import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="studio-footer studio-container">
      <div className="studio-footer__top">
        <a className="studio-brand studio-footer__newsletter" href={site.newsletterUrl} target="_blank" rel="noreferrer" data-analytics-event="newsletter_subscribe_click" data-analytics-label="footer_build_with_judgment"><span className="studio-mark" aria-hidden="true">Kz<span>.</span></span><span>Build with Judgment</span></a>
        <div className="studio-footer__socials"><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${site.email}`}>Email ↗</a></div>
      </div>
      <div className="studio-footer__bottom">
        <p>© {new Date().getFullYear()} Kaizer Charania</p>
        <span className="studio-footer__note"><span className="status-dot"/> Human judgment. Agent velocity.</span>
        <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><button type="button" data-open-consent>Cookies</button></div>
      </div>
    </footer>
  );
}
