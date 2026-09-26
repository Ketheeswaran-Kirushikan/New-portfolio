import {
  Network,
  GitPullRequest,
  ScanLine,
  PenTool,
  ArrowUpRight,
} from "lucide-react";
import { identity, practice } from "../data/profile";
import { Reveal, Spread } from "./ui";
import { motionSettings } from "../lib/motion";
const icons = [Network, GitPullRequest, ScanLine, PenTool];
export function About() {
  return (
    <Spread
      id="about"
      index="01"
      label="The approach"
      title="What a lead actually does."
      lede={identity.summary}
    >
      <div className="service-list">
        {practice.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={item.n} delay={i * motionSettings.stagger}>
              <article className="service-card glass">
                <div className="service-icon">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="service-index font-mono">0{i + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul className="service-signals">
                    {item.signals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <ArrowUpRight
                  className="service-arrow"
                  size={20}
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          );
        })}
      </div>
    </Spread>
  );
}
