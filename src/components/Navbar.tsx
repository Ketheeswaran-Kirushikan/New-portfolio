import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { identity, sections } from "../data/profile";
import { useTheme } from "../hooks/useTheme";
import { useMotionPreferences } from "./MotionPreferences";
import { Modal } from "./Modal";
import { motionSettings } from "../lib/motion";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { enabled } = useMotionPreferences();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-20% 0px -65% 0px" },
    );
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    const scroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    const query = matchMedia("(min-width: 1200px)");
    const close = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  return (
    <>
      <header
        className={"site-header hero-enter" + (scrolled ? " is-scrolled" : "")}
      >
        <div className="header-inner page-width">
          <a
            className="header-brand"
            href="#home"
            aria-label={identity.name + " — Home"}
            aria-current={active === "home" ? "location" : undefined}
          >
            <span className="header-monogram">
              {identity.initials}
              <span>.</span>
            </span>
            <span className="header-signature">
              <strong>{identity.name.split(" ")[0]}</strong>
              <span>{identity.role}</span>
            </span>
          </a>

          <nav className="header-links" aria-label="Main navigation">
            {sections.slice(1).map((section) => (
              <a
                key={section.id}
                href={"#" + section.id}
                onClick={() => setActive(section.id)}
                aria-current={active === section.id ? "location" : undefined}
              >
                {section.label}
                {active === section.id && (
                  <motion.span
                    className="header-active-line"
                    layoutId="active-section"
                    aria-hidden="true"
                    transition={
                      enabled ? motionSettings.spring : { duration: 0 }
                    }
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="header-theme"
              onClick={toggle}
              aria-label={
                theme === "dark" ? "Use light theme" : "Use dark theme"
              }
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              className="header-resume"
              href={identity.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              className="header-menu-toggle"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <Modal
            onClose={() => setOpen(false)}
            labelledBy="menu-title"
            className="menu-dialog"
          >
            <div className="menu-heading">
              <div>
                <p className="eyebrow">Navigation</p>
                <h2 id="menu-title">Explore the portfolio.</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                data-autofocus
              >
                <X size={23} />
              </button>
            </div>
            <nav id="mobile-menu" aria-label="Mobile navigation">
              {sections.map((section, i) => (
                <a
                  key={section.id}
                  href={"#" + section.id}
                  onClick={() => {
                    setActive(section.id);
                    setOpen(false);
                  }}
                  aria-current={active === section.id ? "location" : undefined}
                >
                  <span className="menu-index">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span>{section.label}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </nav>
            <div className="menu-footer">
              <a
                className="header-resume"
                href={identity.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View résumé <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <span>{identity.base}</span>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
