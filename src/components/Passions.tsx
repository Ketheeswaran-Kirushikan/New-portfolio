import { Palette, BookOpen, Dumbbell, type LucideIcon } from "lucide-react";
import { passions, type Passion } from "../data/profile";
import { Reveal, SectionLabel } from "./ui";
import { motionSettings } from "../lib/motion";

const icons: Record<Passion["id"], LucideIcon> = {
  create: Palette,
  discover: BookOpen,
  move: Dumbbell,
};

export function Passions() {
  return (
    <section
      id="passions"
      className="section-shell passions-section"
      aria-labelledby="passions-title"
    >
      <div className="page-width">
        <Reveal>
          <div className="section-topline">
            <div>
              <SectionLabel index="07">Beyond the code</SectionLabel>
              <h2 id="passions-title">What keeps me inspired.</h2>
            </div>
            <p className="section-intro">
              A little more about me: the creative interests, everyday pleasures
              and sports I enjoy outside software engineering.
            </p>
          </div>
        </Reveal>
        <div className="passions-grid">
          {passions.map((passion, i) => {
            const Icon = icons[passion.id];
            return (
              <Reveal key={passion.id} delay={i * motionSettings.stagger}>
                <article className="passion-card" data-passion={passion.id}>
                  <div className="passion-topline">
                    <span className="passion-icon">
                      <Icon size={25} aria-hidden="true" />
                    </span>
                    <span className="passion-number" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <h3>{passion.title}</h3>
                  <p>{passion.description}</p>
                  <ul className="passion-interests">
                    {passion.interests.map((interest) => (
                      <li key={interest}>{interest}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
