import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DotDistortion } from "./DotDistortion";
import { identity } from "../data/profile";

/* ------------------------------------------------------------
   Opening sequence.

   The dot field runs behind the name while a hairline fills to
   100%, then the whole panel lifts away. It waits for the window
   load event but never shows for less than a beat or more than
   ~2.6s, so a fast connection still gets the moment and a slow
   one is never held hostage.
   ------------------------------------------------------------ */

const MIN_MS = 1500;
const MAX_MS = 2600;

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      onDone();
      return;
    }

    const start = performance.now();
    let loaded = document.readyState === "complete";
    const markLoaded = () => {
      loaded = true;
    };
    window.addEventListener("load", markLoaded);

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      // Creep toward 90% on time alone, then finish on load.
      const timed = Math.min(90, (elapsed / MIN_MS) * 90);
      const done = (loaded && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      setProgress(done ? 100 : timed);

      if (done) {
        setTimeout(() => setVisible(false), 420);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", markLoaded);
    };
  }, [reduced, onDone]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <DotDistortion
            className="absolute inset-0 size-full"
            spacing={24}
            radius={200}
            opacity={0.32}
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {identity.role}
            </motion.p>

            <h1 className="mt-5 overflow-hidden text-4xl sm:text-6xl">
              {identity.name.split(" ").map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.95,
                    delay: 0.25 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </h1>

            {/* Hairline progress */}
            <div className="mt-10 h-px w-56 bg-line sm:w-72">
              <motion.div
                className="h-full origin-left bg-accent"
                style={{ scaleX: progress / 100 }}
                transition={{ ease: "linear" }}
              />
            </div>

            <p className="mt-4 font-mono text-xs font-bold tracking-[0.26em] text-muted tabular-nums">
              {String(Math.round(progress)).padStart(3, "0")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
