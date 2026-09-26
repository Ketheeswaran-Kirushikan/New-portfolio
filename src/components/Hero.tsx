import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin, Code2, Layers3 } from "lucide-react";
import { identity, scope } from "../data/profile";
import { GithubMark, LinkedinMark } from "./Brand";
import { Counter, Reveal } from "./ui";
import { useMotionPreferences } from "./MotionPreferences";
import { motionSettings } from "../lib/motion";

export function Hero() {
  const { enabled } = useMotionPreferences();
  const frame = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, motionSettings.spring);
  const rotateY = useSpring(y, motionSettings.spring);
  const neutral = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <section id="home" className="hero page-width">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="availability hero-enter">
            <span className="status-dot" />
            {identity.availability}
          </div>
          <p className="hero-greeting hero-enter">Hello, I'm</p>
          <h1 aria-label={identity.name}>
            <span className="name-mask">
              <span className="name-line">Kirushikan</span>
            </span>
            <span className="name-mask">
              <span className="name-line second">
                Ketheeswaran<span className="text-accent">.</span>
              </span>
            </span>
          </h1>
          <div className="hero-enter hero-role">
            <span className="label-rule" />
            {identity.role}
          </div>
          <p className="hero-summary hero-enter">{identity.introduction}</p>
          <div className="hero-buttons hero-enter">
            <a href="#work" className="button button-primary">
              View projects <ArrowUpRight size={19} />
            </a>
            <a href="#contact" className="button button-secondary">
              Contact me <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-links hero-enter">
            <a href={identity.github} target="_blank" rel="noopener noreferrer">
              <GithubMark /> GitHub
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinMark /> LinkedIn
            </a>
            <span className="hero-link-divider" />
            <a
              href={identity.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View résumé <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="portrait-stage hero-enter">
          <div className="portrait-orbit orbit-one" aria-hidden="true" />
          <div className="portrait-orbit orbit-two" aria-hidden="true" />
          <motion.div
            ref={frame}
            className="portrait-composition"
            style={{
              rotateX: enabled ? rotateX : 0,
              rotateY: enabled ? rotateY : 0,
            }}
            onPointerMove={(event) => {
              if (
                !enabled ||
                event.pointerType !== "mouse" ||
                !matchMedia("(hover: hover) and (pointer: fine)").matches
              )
                return;
              const rect = frame.current!.getBoundingClientRect();
              x.set(-((event.clientY - rect.top) / rect.height - 0.5) * 8);
              y.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
            }}
            onPointerLeave={neutral}
          >
            <div className="portrait-frame glass">
              <div className="portrait-topline">
                <span className="status-dot" />
                <span>THE PERSON BEHIND THE CODE</span>
                <span>↗</span>
              </div>
              <div className="portrait-window">
                <img
                  src={identity.portrait}
                  alt="Kirushikan Ketheeswaran"
                  width="1536"
                  height="2304"
                  fetchPriority="high"
                />
                <div className="portrait-shade" />
              </div>
              <div className="portrait-caption">
                <span>
                  <MapPin size={14} />
                  {identity.base}
                </span>
                <span className="font-mono">GMT +5:30</span>
              </div>
            </div>
            <div className="portrait-badge badge-top glass">
              <Code2 size={20} />
              <div>
                <strong>Full-stack engineering</strong>
                <span>From interface to infrastructure</span>
              </div>
            </div>
            <div className="portrait-badge badge-bottom glass">
              <Layers3 size={20} />
              <div>
                <strong>Built with intention.</strong>
                <span>Architecture · Code · People</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="hero-bottom">
        <dl className="stats-grid">
          {scope
            .filter((s) => !s.needsVerification)
            .map((s, i) => (
              <Reveal key={s.label} delay={i * motionSettings.stagger}>
                <div className="stat">
                  <dt>
                    <Counter to={s.value} />
                  </dt>
                  <dd>
                    <strong>{s.label}</strong>
                    <span>{s.note}</span>
                  </dd>
                </div>
              </Reveal>
            ))}
        </dl>
        <a href="#about" className="scroll-cue">
          <ArrowDown size={17} />
          <span>SCROLL TO EXPLORE</span>
        </a>
      </div>
    </section>
  );
}
