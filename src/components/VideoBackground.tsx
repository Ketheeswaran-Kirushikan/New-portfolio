/* ------------------------------------------------------------
   Full-bleed video layer for the hero.

   Optional by design: leave `heroVideo` empty in profile.ts and
   nothing renders, so the dot field shows through instead. Drop
   an .mp4 into /public and set the path to switch it on.
   ------------------------------------------------------------ */

export function VideoBackground({
  src,
  poster,
  className = "",
}: {
  src?: string;
  poster?: string;
  className?: string;
}) {
  if (!src) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <video
        className="size-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      {/* Scrim — keeps the headline legible over any footage and
          pulls the video into the palette. */}
      <div className="absolute inset-0 bg-bg/78" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/80" />
    </div>
  );
}
