import { ArrowUp, ArrowUpRight, FileText, Mail } from "lucide-react";
import { identity, sections } from "../data/profile";
import { GithubMark, LinkedinMark } from "./Brand";

export function Footer() {
  return (
    <footer className="footer">
      <div className="page-width">
        <div className="footer-heading">
          <a
            href="#home"
            className="footer-monogram"
            aria-label={identity.name + " — Home"}
          >
            {identity.initials}
            <span aria-hidden="true">.</span>
          </a>
          <p className="footer-status">
            <span aria-hidden="true" />
            {identity.availability}
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-profile">
            <h2>
              {identity.name}
              <span>.</span>
            </h2>
            <p>{identity.role}</p>
            <span className="footer-speciality">
              Full-stack development &amp; technical leadership.
            </span>
          </div>

          <nav className="footer-navigation" aria-label="Footer navigation">
            <h3 className="footer-label">Explore</h3>
            <ul>
              {sections
                .filter((section) => !["home", "contact"].includes(section.id))
                .map((section) => (
                  <li key={section.id}>
                    <a href={"#" + section.id}>
                      {section.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="footer-contact">
            <h3 className="footer-label">Get in touch</h3>
            <a className="footer-mail" href={"mailto:" + identity.email}>
              <Mail size={17} aria-hidden="true" />
              <span>{identity.email}</span>
            </a>
            <div className="footer-profiles" aria-label="Social profiles">
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubMark />
                <span>GitHub</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinMark />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
            <a
              className="footer-resume"
              href={identity.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={16} aria-hidden="true" />
              View résumé
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-colophon">
          <p>
            © {new Date().getFullYear()} {identity.name}
          </p>
          <p className="footer-base">{identity.base}</p>
          <a className="footer-top-link" href="#home">
            Back to top
            <span>
              <ArrowUp size={17} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
