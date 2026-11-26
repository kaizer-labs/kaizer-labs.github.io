import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      try {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) {
          target.scrollIntoView({ behavior: "auto", block: "start" });
          return;
        }
      } catch {
        // Malformed or unknown fragments fall back to the page's starting position.
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.hash, location.pathname]);
}

