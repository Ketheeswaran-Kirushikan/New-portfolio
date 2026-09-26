import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "motion";
import { motionSettings } from "../lib/motion";
import { useMotionPreferences } from "./MotionPreferences";

// Content is visible by default. Animation enhances it after intersection.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreferences();
  useEffect(() => {
    const el = ref.current;
    if (
      !enabled ||
      !el ||
      el.dataset.revealed ||
      !("IntersectionObserver" in window)
    )
      return;
    let animation: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.dataset.revealed = "true";
        animation = animate(
          el,
          { opacity: [0, 1], y: [motionSettings.distance, 0] },
          {
            duration: motionSettings.entrance,
            delay,
            ease: motionSettings.ease,
          },
        );
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      animation?.stop();
      el.style.opacity = "1";
      el.style.transform = "none";
    };
  }, [enabled, delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{index}</span>
      <span className="label-rule" />
      {children}
    </p>
  );
}

export function Spread({
  id,
  index,
  label,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section-shell">
      <div className="page-width editorial-grid">
        <header className="editorial-heading">
          <Reveal>
            <SectionLabel index={index}>{label}</SectionLabel>
            <h2>{title}</h2>
            {lede && <p className="section-intro">{lede}</p>}
          </Reveal>
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function Counter({
  to,
  className = "",
}: {
  to: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { enabled } = useMotionPreferences();
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled || el.dataset.counted) return;
    let animation: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      el.dataset.counted = "true";
      animation = animate(0, to, {
        duration: 0.9,
        ease: motionSettings.ease,
        onUpdate: (value) => {
          el.textContent = String(Math.round(value));
        },
      });
      observer.disconnect();
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      animation?.stop();
      el.textContent = String(to);
    };
  }, [to, enabled]);
  return (
    <span className={className}>
      <span className="sr-only">{to}</span>
      <span ref={ref} aria-hidden="true">
        {to}
      </span>
    </span>
  );
}

export function Backdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <div className="ambient ambient-cyan" />
      <div className="ambient ambient-violet" />
      <div className="backdrop-grid" />
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="technology-strip page-width">
      <div className="strip-label">
        <span className="font-mono">BUILT WITH</span>
      </div>
      <div className="marquee-window">
        <div className="marquee-track">
          <ul>
            {items.map((item) => (
              <li key={item}>
                {item}
                <span aria-hidden="true">✦</span>
              </li>
            ))}
          </ul>
          <ul aria-hidden="true" className="marquee-duplicate">
            {items.map((item) => (
              <li key={item}>
                {item}
                <span>✦</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
