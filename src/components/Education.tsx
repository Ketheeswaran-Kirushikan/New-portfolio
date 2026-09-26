import { GraduationCap } from "lucide-react";
import { education } from "../data/profile";
import { Reveal, SectionLabel } from "./ui";
import { motionSettings } from "../lib/motion";

export function Education() {
  return (
    <section
      id="education"
      className="section-shell"
      aria-labelledby="education-title"
    >
      <div className="page-width">
        <Reveal>
          <div className="section-topline">
            <div>
              <SectionLabel index="05">Education</SectionLabel>
              <h2 id="education-title">A foundation to build on.</h2>
            </div>
            <p className="section-intro">
              From commerce to software engineering, each step connects formal
              learning with the practical work of building products.
            </p>
          </div>
        </Reveal>
        <div className="education-list">
          {education.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * motionSettings.stagger}>
              <article className="education-card">
                <div className="education-meta">
                  <span className="education-icon" aria-hidden="true">
                    <GraduationCap size={24} />
                  </span>
                  <p className="education-period">{item.period}</p>
                  <p className="education-result">{item.result}</p>
                </div>
                <div className="education-body">
                  <h3>{item.title}</h3>
                  <p className="education-org">{item.org}</p>
                  <p className="education-description">{item.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
