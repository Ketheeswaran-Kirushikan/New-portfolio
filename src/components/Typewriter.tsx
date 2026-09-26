import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------
   Two text animations.

   TextGenerate — words arrive one at a time out of a blur. Used
   once, on the h1, so it reads as the page composing itself.

   Typewriter — types a phrase, holds, deletes, moves to the next.
   Used on the single line below the headline.

   Both fall back to plain text under prefers-reduced-motion.
   ------------------------------------------------------------ */

export function TextGenerate({
  text,
  className = "",
  delay = 0,
  stagger = 0.11,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(12px)", y: "0.25em" }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.85,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}

export function Typewriter({
  phrases,
  className = "",
  typeSpeed = 55,
  deleteSpeed = 28,
  hold = 1900,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const full = phrases[index % phrases.length];

    // Finished typing — hold, then start deleting.
    if (!deleting && shown === full) {
      const id = setTimeout(() => setDeleting(true), hold);
      return () => clearTimeout(id);
    }

    // Finished deleting — advance to the next phrase.
    if (deleting && shown === "") {
      setDeleting(false);
      setIndex((n) => (n + 1) % phrases.length);
      return;
    }

    const id = setTimeout(
      () =>
        setShown((s) =>
          deleting ? full.slice(0, s.length - 1) : full.slice(0, s.length + 1),
        ),
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(id);
  }, [shown, deleting, index, phrases, typeSpeed, deleteSpeed, hold, reduced]);

  if (reduced) return <span className={className}>{phrases[0]}</span>;

  return (
    <span className={className}>
      {shown}
      <span className="caret ml-0.5 inline-block h-[0.95em] w-px translate-y-[0.1em] bg-accent align-middle" />
    </span>
  );
}
