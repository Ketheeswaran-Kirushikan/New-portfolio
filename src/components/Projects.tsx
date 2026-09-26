import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowUpRight, ExternalLink, Library } from "lucide-react";
import { alsoBuilt, projects, type Project } from "../data/profile";
import { GithubMark } from "./Brand";
import { Reveal, SectionLabel } from "./ui";
import { ProjectPreview } from "./ProjectPreview";
import { useMotionPreferences } from "./MotionPreferences";
import { motionSettings } from "../lib/motion";
import { AnimatePresence } from "motion/react";

const ProjectVolumes = lazy(() => import("./ProjectVolumes"));
class ShowcaseBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [details, setDetails] = useState(false);
  const [direction, setDirection] = useState(1);
  const [nearby, setNearby] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const trigger = useRef<HTMLElement | null>(null);
  const { enabled, reduced } = useMotionPreferences();
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    [],
  );
  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );
  const show3D = desktop && !reduced && !failed;
  const onFailure = useCallback(() => setFailed(true), []);
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 900px) and (hover: hover) and (pointer: fine)",
    );
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearby(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      query.removeEventListener("change", update);
      observer.disconnect();
      clearTimeout(timer.current);
    };
  }, []);
  const open = useCallback(
    (project: Project) => {
      clearTimeout(timer.current);
      trigger.current = document.activeElement as HTMLElement;
      setSelected(project);
      if (show3D && enabled)
        timer.current = setTimeout(
          () => setDetails(true),
          motionSettings.selection * 1000,
        );
      else setDetails(true);
    },
    [show3D, enabled],
  );
  const close = () => {
    clearTimeout(timer.current);
    setDetails(false);
    setSelected(null);
  };
  const step = (direction: number) => {
    setDirection(direction);
    const index = visible.findIndex((p) => p.title === selected?.title);
    setSelected(visible[(index + direction + visible.length) % visible.length]);
  };
  return (
    <section id="work" ref={ref} className="section-shell">
      <div className="page-width">
        <Reveal>
          <div className="section-topline">
            <div>
              <SectionLabel index="02">Selected work</SectionLabel>
              <h2>
                Ideas made tangible<span className="text-accent">.</span>
              </h2>
            </div>
            <p className="section-intro">
              A collection of products, platforms, and the decisions behind
              them.
            </p>
          </div>
        </Reveal>
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => {
                clearTimeout(timer.current);
                setSelected(null);
                setDetails(false);
                setFilter(c);
              }}
            >
              {c}
            </button>
          ))}
        </div>
        {show3D && (
          <div className="showcase-stage">
            <div className="showcase-caption">
              <span>THE PROJECT COLLECTION</span>
              <span>
                {String(visible.length).padStart(2, "0")} VOLUMES / SELECT TO
                EXPLORE
              </span>
            </div>
            <span className="showcase-watermark" aria-hidden="true">
              Selected works.
            </span>
            {nearby ? (
              <ShowcaseBoundary onFailure={onFailure}>
                <Suspense
                  fallback={
                    <div className="showcase-loading">
                      <Library size={26} />
                      <span>Preparing the collection</span>
                    </div>
                  }
                >
                  <ProjectVolumes
                    projects={visible}
                    selected={selected?.title ?? null}
                    onSelect={open}
                    onFailure={onFailure}
                    animate={enabled}
                  />
                </Suspense>
              </ShowcaseBoundary>
            ) : (
              <div className="showcase-loading">
                <Library size={26} />
              </div>
            )}
            <p className="showcase-hint">
              Explore a volume, or browse the case studies below.
            </p>
          </div>
        )}
        <div className="project-grid" aria-label="Project collection">
          {visible.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * motionSettings.stagger}>
              <article
                className="project-card glass"
                onPointerMove={(event) => {
                  if (!enabled || event.pointerType !== "mouse") return;
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty(
                    "--pointer-x",
                    `${event.clientX - rect.left}px`,
                  );
                  event.currentTarget.style.setProperty(
                    "--pointer-y",
                    `${event.clientY - rect.top}px`,
                  );
                }}
              >
                <button
                  className="project-image-button"
                  aria-label={"Open case study for " + p.title}
                  onClick={() => open(p)}
                >
                  <span className="project-image-wrap">
                    <img
                      src={p.image}
                      alt={p.title + " website screenshot"}
                      width="1440"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                </button>
                <div className="project-card-body">
                  <div className="project-meta">
                    <span>{p.category}</span>
                    <span>
                      {p.year} / {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.brief}</p>
                  <ul className="chips">
                    {p.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="project-card-actions">
                    <button
                      className="text-link"
                      onClick={() => open(p)}
                      aria-label={"Read " + p.title + " case study"}
                    >
                      Case study <ArrowUpRight size={15} />
                    </button>
                    {p.live && (
                      <a
                        className="text-link"
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live project <ExternalLink size={13} />
                      </a>
                    )}
                    {p.repo && (
                      <a
                        className="text-link"
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source code <GithubMark className="size-3.5" />
                      </a>
                    )}
                  </div>
                  <ProjectPortals project={p} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="also-built">
          <p className="eyebrow">More explorations</p>
          <ul>
            {alsoBuilt.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.note}</p>
                <span>{item.stack}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {details && selected && (
          <ProjectPreview
            project={selected}
            collection={visible}
            direction={direction}
            onStep={step}
            onClose={close}
            returnFocus={trigger.current}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
function ProjectPortals({ project }: { project: Project }) {
  if (!project.portals?.length) return null;
  return (
    <div className="portal-links">
      {project.portals.map((portal) => (
        <a
          key={portal.href}
          href={portal.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.title + " " + portal.label}
        >
          {portal.label}
          <ArrowUpRight size={12} />
        </a>
      ))}
    </div>
  );
}
