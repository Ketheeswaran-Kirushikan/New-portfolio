import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, GraduationCap, X } from "lucide-react";
import { mentorship } from "../data/profile";
import { motionSettings } from "../lib/motion";
import { Modal } from "./Modal";
import { useMotionPreferences } from "./MotionPreferences";
import { Reveal } from "./ui";

export function Mentorship() {
  const [selected, setSelected] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const { enabled } = useMotionPreferences();
  const { orientation, viva } = mentorship;
  const photo = selected === null ? null : orientation.photos[selected];
  const changePhoto = (direction: number) => {
    setSelected((current) =>
      current === null
        ? null
        : (current + direction + orientation.photos.length) %
          orientation.photos.length,
    );
  };

  return (
    <section
      id="community"
      className="community"
      aria-labelledby="community-title"
    >
      <Reveal>
        <header className="community-heading">
          <div>
            <p className="eyebrow">Mentorship & community</p>
            <h2 id="community-title">{mentorship.heading}</h2>
          </div>
          <p className="section-intro">{mentorship.introduction}</p>
        </header>
      </Reveal>

      <article aria-labelledby="orientation-title">
        <Reveal>
          <header className="community-event-heading">
            <div>
              <p className="community-audience">{orientation.audience}</p>
              <h3 id="orientation-title">{orientation.title}</h3>
            </div>
            <p>{orientation.description}</p>
          </header>
          <div className="community-gallery">
            {orientation.photos.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className="community-photo"
                aria-label={`View orientation photo ${index + 1}: ${item.alt}`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  trigger.current = event.currentTarget;
                  setSelected(index);
                }}
              >
                <img
                  src={item.src}
                  srcSet={`${item.small} 640w, ${item.src} 1600w`}
                  sizes={
                    index === 0
                      ? "(max-width: 599px) calc(100vw - 36px), (max-width: 899px) 65vw, 800px"
                      : "(max-width: 599px) calc(50vw - 24px), (max-width: 899px) 32vw, 400px"
                  }
                  alt={item.alt}
                  width="1600"
                  height="1067"
                  loading="lazy"
                  decoding="async"
                />
                <span className="community-photo-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="community-photo-expand" aria-hidden="true">
                  <Expand size={18} />
                </span>
              </button>
            ))}
          </div>
          <p className="community-gallery-note">
            Orientation at Uki <span aria-hidden="true">·</span> Select a photo
            to view
          </p>
        </Reveal>
      </article>

      <Reveal>
        <article className="community-viva" aria-labelledby="viva-title">
          <span className="community-viva-icon" aria-hidden="true">
            <GraduationCap size={26} />
          </span>
          <div>
            <p className="community-audience">{viva.audience}</p>
            <h3 id="viva-title">{viva.title}</h3>
          </div>
          <p>{viva.description}</p>
        </article>
      </Reveal>

      <AnimatePresence>
        {photo && selected !== null && (
          <Modal
            className="community-dialog"
            labelledBy="community-dialog-title"
            onClose={() => setSelected(null)}
            returnFocus={trigger.current}
          >
            <div
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  changePhoto(event.key === "ArrowLeft" ? -1 : 1);
                }
              }}
            >
              <div className="modal-bar">
                <h2 id="community-dialog-title">Uki orientation</h2>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Close photo viewer"
                  data-autofocus
                  onClick={() => setSelected(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="community-viewer">
                <figure aria-live="polite" aria-atomic="true">
                  <motion.img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    width="1600"
                    height="1067"
                    initial={enabled ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: enabled ? motionSettings.projectChange : 0,
                    }}
                  />
                  <figcaption>
                    <span>{photo.caption}</span>
                    <span className="community-photo-count">
                      {selected + 1} / {orientation.photos.length}
                    </span>
                  </figcaption>
                </figure>
                <div className="community-viewer-controls">
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => changePhoto(-1)}
                    aria-label="Previous orientation photo"
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Previous
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => changePhoto(1)}
                    aria-label="Next orientation photo"
                  >
                    Next <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
