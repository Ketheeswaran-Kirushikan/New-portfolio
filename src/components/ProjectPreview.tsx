import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  PanelsTopLeft,
  X,
} from "lucide-react";
import { type Project } from "../data/profile";
import { motionSettings } from "../lib/motion";
import { GithubMark } from "./Brand";
import { Modal } from "./Modal";
import { useMotionPreferences } from "./MotionPreferences";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "role", label: "My role" },
  { id: "build", label: "Build details" },
] as const;
type Tab = (typeof tabs)[number]["id"];

export function ProjectPreview({
  project,
  collection,
  direction,
  onStep,
  onClose,
  returnFocus,
}: {
  project: Project;
  collection: Project[];
  direction: number;
  onStep: (direction: number) => void;
  onClose: () => void;
  returnFocus: HTMLElement | null;
}) {
  const { enabled } = useMotionPreferences();
  const [tab, setTab] = useState<Tab>("overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const layoutRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const index = collection.findIndex((item) => item.title === project.title);
  const previous =
    collection[(index - 1 + collection.length) % collection.length];
  const next = collection[(index + 1) % collection.length];

  useEffect(() => {
    storyRef.current?.scrollTo({ top: 0, behavior: "instant" });
    layoutRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [project.title]);

  const step = (value: number) => {
    setTab("overview");
    onStep(value);
  };

  const moveTab = (
    event: KeyboardEvent<HTMLButtonElement>,
    current: number,
  ) => {
    let target: number;
    if (event.key === "ArrowRight") target = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      target = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(tabs[target].id);
    tabRefs.current[target]?.focus();
  };

  return (
    <Modal
      onClose={onClose}
      labelledBy="project-title"
      className="project-dialog"
      returnFocus={returnFocus}
    >
      <div className="case-toolbar">
        <div className="case-toolbar-label">
          <PanelsTopLeft size={18} aria-hidden="true" />
          <span>Selected work</span>
          <span className="case-toolbar-divider" aria-hidden="true">
            /
          </span>
          <span>Project preview</span>
        </div>
        <button
          className="case-close"
          onClick={onClose}
          aria-label="Close project details"
          data-autofocus
        >
          <span>Close</span>
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="case-layout" ref={layoutRef}>
        <motion.figure
          key={project.image}
          className="case-visual"
          initial={enabled ? { opacity: 0, x: direction * 16 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: enabled ? motionSettings.projectChange : 0,
            ease: motionSettings.ease,
          }}
        >
          <div className="case-visual-heading">
            <span className="eyebrow">{project.kind}</span>
            <span>{project.year}</span>
          </div>
          <div className="case-browser">
            <div className="case-browser-bar">
              <span className="case-browser-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="case-browser-label">Interface preview</span>
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="case-expand"
                aria-label={"Open full-size preview of " + project.title}
                title="Open full-size image"
              >
                <Maximize2 size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="case-image-frame">
              <img
                src={project.image}
                alt={project.title + " interface preview"}
                width="1440"
                height="900"
                decoding="async"
              />
            </div>
          </div>
          <figcaption className="case-caption">
            <span>{project.scope}</span>
            <a href={project.image} target="_blank" rel="noopener noreferrer">
              Full-size image <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </figcaption>
        </motion.figure>

        <div className="case-story" ref={storyRef}>
          <div className="case-project-heading">
            <p className="eyebrow">{project.category}</p>
            <h2 id="project-title">{project.title}</h2>
            <dl className="case-facts">
              <div>
                <dt>My role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>{project.scope}</dd>
              </div>
            </dl>
          </div>

          <div className="case-actions">
            {project.live && (
              <a
                className="button button-primary"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
            {project.repo && (
              <a
                className="button button-secondary"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubMark />
                Source code
              </a>
            )}
          </div>
          {!!project.portals?.length && (
            <nav
              className="case-portals"
              aria-label={project.title + " portals"}
            >
              {project.portals.map((portal) => (
                <a
                  key={portal.href}
                  href={portal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {portal.label}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              ))}
            </nav>
          )}

          <div
            className="case-tabs"
            role="tablist"
            aria-label="Project details"
          >
            {tabs.map((item, i) => (
              <button
                key={item.id}
                id={"case-tab-" + item.id}
                ref={(element) => {
                  tabRefs.current[i] = element;
                }}
                role="tab"
                aria-selected={tab === item.id}
                aria-controls="case-panel"
                tabIndex={tab === item.id ? 0 : -1}
                onClick={() => setTab(item.id)}
                onKeyDown={(event) => moveTab(event, i)}
              >
                {item.label}
                {tab === item.id && (
                  <motion.span
                    className="case-tab-line"
                    layoutId="case-tab-line"
                    aria-hidden="true"
                    transition={
                      enabled ? motionSettings.spring : { duration: 0 }
                    }
                  />
                )}
              </button>
            ))}
          </div>
          <motion.div
            key={project.title + tab}
            className="case-panel"
            id="case-panel"
            role="tabpanel"
            aria-labelledby={"case-tab-" + tab}
            tabIndex={0}
            initial={enabled ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: enabled ? 0.25 : 0,
              ease: motionSettings.ease,
            }}
          >
            {tab === "overview" && (
              <>
                <p className="case-summary">{project.brief}</p>
                <p>{project.detail}</p>
              </>
            )}
            {tab === "role" && (
              <>
                <h3>My contribution</h3>
                <ul className="case-list">
                  {project.responsibilities.map((item, i) => (
                    <li key={item}>
                      <span aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {tab === "build" && (
              <>
                <h3>Technologies</h3>
                <ul className="chips case-stack">
                  {project.stack.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
                <h3>Engineering considerations</h3>
                <ul className="case-considerations">
                  {project.hardParts.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="case-footer">
        <button
          className="case-pager case-previous"
          onClick={() => step(-1)}
          aria-label="Previous project"
          disabled={collection.length < 2}
        >
          <ChevronLeft size={20} aria-hidden="true" />
          <span>
            <small>Previous project</small>
            <strong>{previous.title}</strong>
          </span>
        </button>
        <p className="case-counter" aria-live="polite">
          <span aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
            <span> / {String(collection.length).padStart(2, "0")}</span>
          </span>
          <span className="sr-only">
            {project.title}, project {index + 1} of {collection.length}
          </span>
        </p>
        <button
          className="case-pager case-next"
          onClick={() => step(1)}
          aria-label="Next project"
          disabled={collection.length < 2}
        >
          <span>
            <small>Next project</small>
            <strong>{next.title}</strong>
          </span>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </Modal>
  );
}
