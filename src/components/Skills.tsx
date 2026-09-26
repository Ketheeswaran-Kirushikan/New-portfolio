import {
  Network,
  PanelsTopLeft,
  Server,
  Database,
  Cloud,
  Brain,
  PenTool,
  WandSparkles,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";
import { stack, type SkillGroup } from "../data/profile";
import { Reveal, SectionLabel } from "./ui";
import { motionSettings } from "../lib/motion";
const icons: Record<SkillGroup["id"], LucideIcon> = {
  lead: Network,
  frontend: PanelsTopLeft,
  backend: Server,
  data: Database,
  delivery: Cloud,
  mobile: Brain,
  animation: WandSparkles,
  prompting: MessageSquareText,
  design: PenTool,
};
export function Skills() {
  return (
    <section
      id="skills"
      className="section-shell"
      aria-labelledby="skills-title"
    >
      <div className="page-width">
        <Reveal>
          <div className="section-topline">
            <div>
              <SectionLabel index="04">The toolkit</SectionLabel>
              <h2 id="skills-title">
                The right tools.
                <br />A considered approach.
              </h2>
            </div>
            <p className="section-intro">
              From full-stack development and animation to prompt engineering
              and the people behind the product.
            </p>
          </div>
        </Reveal>
        <div className="skills-grid">
          {stack.map((group, i) => {
            const Icon = icons[group.id];
            const established = group.items.filter(
              (item) => !item.includes("(basic)"),
            );
            const learning = group.items.filter((item) =>
              item.includes("(basic)"),
            );
            return (
              <Reveal
                key={group.id}
                className="skill-group"
                delay={(i % 3) * motionSettings.stagger}
              >
                <article className="skill-card glass" data-skill={group.id}>
                  <div className="skill-card-header">
                    <Icon size={21} aria-hidden="true" />
                    <h3>{group.group}</h3>
                  </div>
                  <p className="skill-description">{group.description}</p>
                  <ul className="chips">
                    {established.map((s) => (
                      <li className="chip" key={s}>
                        {s}
                      </li>
                    ))}
                  </ul>
                  {learning.length > 0 && (
                    <>
                      <p className="skill-note">Foundational knowledge</p>
                      <ul className="chips">
                        {learning.map((s) => (
                          <li className="chip" key={s}>
                            {s.replace(" (basic)", "")}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
