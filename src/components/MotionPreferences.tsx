import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "motion/react";

const Context = createContext({
  enabled: false,
  reduced: false,
});

export function MotionPreferences({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const enabled = !reduced;
  useEffect(() => {
    // Intro animations must not replay after a theme or motion preference change.
    const timer = setTimeout(
      () => {
        document.documentElement.dataset.intro = "complete";
      },
      enabled ? 1200 : 0,
    );
    return () => clearTimeout(timer);
  }, [enabled]);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "enabled" : "reduced";
  }, [enabled]);
  return (
    <Context.Provider value={{ enabled, reduced }}>
      <MotionConfig reducedMotion={enabled ? "user" : "always"}>
        {children}
      </MotionConfig>
    </Context.Provider>
  );
}

export const useMotionPreferences = () => useContext(Context);
