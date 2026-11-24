import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
];

export function Header() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(document.documentElement.dataset.theme !== "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem("theme-preference", theme); } catch { /* Use session theme when storage is unavailable. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#292a2e" : "#e7e8eb");
  }, [isDark]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        document.querySelector<HTMLButtonElement>(".studio-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="studio-header">
      <div className="studio-container studio-header__inner">
        <Link className="studio-brand" to="/" aria-label="Kaizer Charania — home" onClick={() => setIsMenuOpen(false)}>
          <span className="studio-mark" aria-hidden="true">Kz<span>.</span></span>
          <span>kaizer<span className="studio-brand__suffix"> / labs</span></span>
        </Link>
        <button className="studio-menu-toggle" type="button" aria-expanded={isMenuOpen} aria-controls="studio-navigation" aria-label={isMenuOpen ? "Close navigation" : "Open navigation"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span>{isMenuOpen ? "Close" : "Menu"}</span><span aria-hidden="true">{isMenuOpen ? "−" : "+"}</span>
        </button>
        <nav className="studio-nav" id="studio-navigation" aria-label="Primary" data-open={isMenuOpen} onClick={() => setIsMenuOpen(false)}>
          {links.map((link) => <NavLink key={link.href} to={link.href} className={({ isActive }) => isActive ? "is-active" : undefined}>{link.label}</NavLink>)}
          <Link className="studio-nav__contact" to="/contact" data-analytics-event="contact_click" data-analytics-label="header_connect">Let’s talk <span aria-hidden="true">↗</span></Link>
        </nav>
        <button className="studio-theme" type="button" aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} title={isDark ? "Light theme" : "Dark theme"} onClick={() => setIsDark(!isDark)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
        </button>
      </div>
    </header>
  );
}
