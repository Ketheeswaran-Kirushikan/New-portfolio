import { useEffect, useRef } from "react";

/* ------------------------------------------------------------
   Dot distortion field.

   A grid of gold dots that ripples on its own and pushes away
   from the pointer. Canvas 2D rather than WebGL — same read, no
   shader dependency, and it degrades to a still grid when the
   visitor prefers reduced motion.
   ------------------------------------------------------------ */

type Props = {
  className?: string;
  /** Distance between dots, in CSS pixels. */
  spacing?: number;
  /** How far the pointer's influence reaches. */
  radius?: number;
  /** Base opacity of a resting dot. */
  opacity?: number;
  /** Ripple strength. 0 disables the ambient wave. */
  wave?: number;
};

export function DotDistortion({
  className = "",
  spacing = 26,
  radius = 170,
  opacity = 0.4,
  wave = 1,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Read the gold straight off the theme so the field follows
    // whichever mode is active.
    const gold = getComputedStyle(document.documentElement)
      .getPropertyValue("--c-accent")
      .trim() || "#bfa181";

    let width = 0;
    let height = 0;
    let raf = 0;
    let start = performance.now();

    // Pointer position, and a smoothed copy so the field lags
    // slightly behind the cursor rather than snapping to it.
    const pointer = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      eased.x += (pointer.x - eased.x) * 0.12;
      eased.y += (pointer.y - eased.y) * 0.12;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * spacing;
          const by = j * spacing;

          // Ambient wave: two offset sines make it read as organic
          // rather than as a marching grid.
          const w = reduced
            ? 0
            : wave *
              (Math.sin(bx * 0.012 + t * 0.9) + Math.cos(by * 0.014 - t * 0.7));

          let dx = w * 4.2;
          let dy = w * 3.4;
          let scale = 1 + w * 0.34;

          // Pointer displacement, falling off smoothly to nothing.
          const px = bx - eased.x;
          const py = by - eased.y;
          const dist = Math.hypot(px, py);

          if (dist < radius) {
            const force = (1 - dist / radius) ** 2;
            const angle = Math.atan2(py, px);
            dx += Math.cos(angle) * force * 26;
            dy += Math.sin(angle) * force * 26;
            scale += force * 1.9;
          }

          const r = Math.max(0.3, 1.05 * scale);
          ctx.globalAlpha = Math.min(0.95, opacity * scale);
          ctx.fillStyle = gold;
          ctx.beginPath();
          ctx.arc(bx + dx, by + dy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    start = performance.now();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [spacing, radius, opacity, wave]);

  return (
    <canvas ref={ref} className={className} aria-hidden="true" />
  );
}
