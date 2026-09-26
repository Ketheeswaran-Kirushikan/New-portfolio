import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { track, type Role } from "../data/profile";
import { Reveal, Spread } from "./ui";
import { useMotionPreferences } from "./MotionPreferences";
import { motionSettings } from "../lib/motion";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreferences();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, motionSettings.spring);
  return (
    <Spread
      id="experience"
      index="03"
      label="The journey"
      title="Experience that shapes the work."
      lede="Software engineering, technical leadership, and a grounding in the businesses that depend on both."
    >
      <div className="timeline" ref={ref}>
        <div className="timeline-line" aria-hidden="true">
          <motion.div
            className="timeline-progress"
            style={{ scaleY: enabled ? progress : 1 }}
          />
        </div>
        {track.map((role) => (
          <Entry key={`${role.org}-${role.title}`} role={role} />
        ))}
      </div>
    </Spread>
  );
}
function Entry({ role }: { role: Role }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { margin: "-15% 0px -30% 0px" });
  return (
    <article
      ref={ref}
      className={"timeline-entry" + (visible ? " is-visible" : "")}
    >
      <Reveal>
        <p className="timeline-period">
          {role.period}
          {role.current ? " · Current" : ""}
        </p>
        <h3>{role.title}</h3>
        <p className="timeline-org">{role.org}</p>
        <span className="timeline-place">{role.place}</span>
        <p className="timeline-lede">{role.points[0]}</p>
        {role.points.length > 1 && (
          <details>
            <summary>More about this role</summary>
            <ul>
              {role.points.slice(1).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </details>
        )}
        <ul className="chips">
          {role.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}
