import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Award, X, ExternalLink } from "lucide-react";
import { certificates, type Credential } from "../data/profile";
import { Reveal, SectionLabel } from "./ui";
import { Modal } from "./Modal";
import { motionSettings } from "../lib/motion";

export function Certificates() {
  const [certificate, setCertificate] = useState<Credential | null>(null);
  return (
    <section
      id="certificates"
      className="section-shell"
      aria-labelledby="certificates-title"
    >
      <div className="page-width">
        <Reveal>
          <div className="section-topline">
            <div>
              <SectionLabel index="06">Certificates</SectionLabel>
              <h2 id="certificates-title">Curiosity, continued.</h2>
            </div>
            <p className="section-intro">
              Focused learning in programming, digital marketing and
              communication that complements my engineering education.
            </p>
          </div>
        </Reveal>
        <div className="certificates-grid">
          {certificates.map((item, i) => (
            <Reveal key={item.title} delay={i * motionSettings.stagger}>
              <article className="credential glass">
                <div className="credential-top">
                  <span className="certificate-icon" aria-hidden="true">
                    <Award size={24} />
                  </span>
                  <span>{item.period}</span>
                </div>
                <p className="certificate-issuer">{item.org}</p>
                <h3>{item.title}</h3>
                <p className="credential-result">{item.result}</p>
                <p className="certificate-description">{item.detail}</p>
                {item.assetUrl && (
                  <button
                    className="text-link"
                    onClick={() => setCertificate(item)}
                  >
                    View certificate <ExternalLink size={15} />
                  </button>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {certificate?.assetUrl && (
          <Modal
            onClose={() => setCertificate(null)}
            labelledBy="certificate-title"
          >
            <div className="modal-bar">
              <h2 id="certificate-title" className="text-lg">
                {certificate.title}
              </h2>
              <button
                className="icon-button"
                aria-label="Close certificate"
                onClick={() => setCertificate(null)}
                data-autofocus
              >
                <X size={22} />
              </button>
            </div>
            <div className="modal-content">
              {/\.pdf(?:$|\?)/i.test(certificate.assetUrl) ? (
                <object
                  data={certificate.assetUrl}
                  type="application/pdf"
                  className="h-[65vh] w-full"
                >
                  <a
                    className="text-link"
                    href={certificate.assetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open certificate PDF
                  </a>
                </object>
              ) : (
                <img
                  src={certificate.assetUrl}
                  alt={certificate.title + " certificate"}
                  className="w-full"
                />
              )}
              <a
                className="text-link"
                href={certificate.assetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open original <ExternalLink size={15} />
              </a>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
