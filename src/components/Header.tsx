import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { site } from "../data/site";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
];

export function Header() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(
    document.documentElement.dataset.theme !== "light",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const nextTheme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("theme-preference", nextTheme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#08111f" : "#f6f3ec");
  }, [isDark]);

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth > 719) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link className="brand" to="/">
          <span className="brand__name">{site.name}</span>
          <span className="brand__role">{site.role}</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-nav"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="menu-toggle__line"></span>
          <span className="menu-toggle__line"></span>
          <span className="menu-toggle__line"></span>
        </button>

        <nav
          className="main-nav"
          id="primary-nav"
          aria-label="Primary"
          data-open={isMenuOpen ? "true" : undefined}
        >
          {links.map((link) => (
            <NavLink
              className={({ isActive }) =>
                ["nav-link", isActive ? "is-active" : ""].filter(Boolean).join(" ")
              }
              key={link.href}
              to={link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label="Toggle color theme"
            title="Toggle color theme"
            aria-pressed={isDark}
            onClick={() => setIsDark((current) => !current)}
          >
            <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4.25"></circle>
                <path d="M12 1.75v2.5"></path>
                <path d="M12 19.75v2.5"></path>
                <path d="M4.75 4.75l1.8 1.8"></path>
                <path d="M17.45 17.45l1.8 1.8"></path>
                <path d="M1.75 12h2.5"></path>
                <path d="M19.75 12h2.5"></path>
                <path d="M4.75 19.25l1.8-1.8"></path>
                <path d="M17.45 6.55l1.8-1.8"></path>
              </svg>
            </span>
            <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.5 14.2A8.8 8.8 0 1 1 9.8 3.5a7.1 7.1 0 0 0 10.7 10.7Z"></path>
              </svg>
            </span>
            <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
          <Link
            className="nav-cta"
            to="/contact"
            data-analytics-event="contact_click"
            data-analytics-label="header_connect"
          >
            Connect
          </Link>
        </div>
      </div>
    </header>
  );
}
