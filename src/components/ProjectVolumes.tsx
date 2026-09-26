// Project-specific adaptation of the MIT-licensed Vengeance UI Books Showcase.
// The cover/page/spine construction is adapted; lifecycle, covers, selection,
// accessibility integration and demand rendering are implemented for this site.
// See public/third-party-notices.txt for attribution and the original licence.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Project } from "../data/profile";
import { motionSettings } from "../lib/motion";

type Props = {
  projects: Project[];
  selected: string | null;
  onSelect: (project: Project) => void;
  onFailure: () => void;
  animate: boolean;
};

export default function ProjectVolumes({
  projects,
  selected,
  onSelect,
  onFailure,
  animate,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const actions = useRef<{ select: () => void } | null>(null);
  const latest = useRef({ selected, onSelect, onFailure, animate });
  latest.current = { selected, onSelect, onFailure, animate };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // A fresh canvas per setup also survives React StrictMode's effect replay.
    const canvas = document.createElement("canvas");
    canvas.className = "showcase-canvas";
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      canvas.remove();
      latest.current.onFailure();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-6, 6, 2.4, -2.4, 0.1, 40);
    camera.position.set(0, 2.7, 12);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const key = new THREE.DirectionalLight(0xf2fbff, 2.8);
    key.position.set(-3, 6, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xa78bfa, 1.4);
    rim.position.set(6, 3, -3);
    scene.add(rim);

    let disposed = false;
    let visible = false;
    let frame = 0;
    let started = 0;
    let duration = motionSettings.selection * 1000;
    let transitioning = false;
    let hover = -1;
    const images: HTMLImageElement[] = [];
    const textures: THREE.Texture[] = [];
    const pickables: THREE.Object3D[] = [];
    type Pose = { x: number; y: number; z: number; ry: number; scale: number };
    const volumes: { group: THREE.Group; from: Pose; to: Pose }[] = [];
    const snapshot = (g: THREE.Group): Pose => ({
      x: g.position.x,
      y: g.position.y,
      z: g.position.z,
      ry: g.rotation.y,
      scale: g.scale.x,
    });
    const apply = (g: THREE.Group, p: Pose) => {
      g.position.set(p.x, p.y, p.z);
      g.rotation.y = p.ry;
      g.scale.setScalar(p.scale);
    };
    const invalidate = () => {
      if (!disposed && visible && !document.hidden && !frame)
        frame = requestAnimationFrame(render);
    };

    function cover(project: Project, index: number) {
      const art = document.createElement("canvas");
      art.width = 768;
      art.height = 1024;
      const ctx = art.getContext("2d")!;
      const accent = index % 2 === 0 ? "#5ce1e6" : "#b6a2fa";
      const gradient = ctx.createLinearGradient(0, 0, 768, 1024);
      gradient.addColorStop(0, index % 2 === 0 ? "#162d3a" : "#262c44");
      gradient.addColorStop(1, "#0b131e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 768, 1024);
      ctx.fillStyle = accent;
      ctx.fillRect(0, 0, 11, 1024);
      ctx.font = "500 19px monospace";
      ctx.fillText(
        "CASE STUDY / " + String(index + 1).padStart(2, "0"),
        46,
        67,
      );
      ctx.fillStyle = "#f1f5f9";
      ctx.font = "600 49px sans-serif";
      const words = project.title.split(" ");
      let line = "",
        y = 145;
      words.forEach((word) => {
        const candidate = line ? line + " " + word : word;
        if (ctx.measureText(candidate).width > 650 && line) {
          ctx.fillText(line, 46, y);
          y += 60;
          line = word;
        } else line = candidate;
      });
      ctx.fillText(line, 46, y);
      ctx.fillStyle = "#a7b4c7";
      ctx.font = "22px sans-serif";
      ctx.fillText(project.kind, 46, 305);
      ctx.fillStyle = "#080c12";
      ctx.fillRect(35, 355, 698, 456);
      ctx.strokeStyle = "#ffffff25";
      ctx.strokeRect(35, 355, 698, 456);
      ctx.fillStyle = accent;
      ctx.font = "500 21px monospace";
      ctx.fillText(project.category.toUpperCase(), 46, 887);
      ctx.fillStyle = "#a7b4c7";
      ctx.font = "20px sans-serif";
      ctx.fillText(project.year + "  /  " + project.role, 46, 933);
      const texture = new THREE.CanvasTexture(art);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        4,
        renderer.capabilities.getMaxAnisotropy(),
      );
      textures.push(texture);
      const image = new Image();
      images.push(image);
      image.onload = () => {
        if (disposed) return;
        const factor = Math.min(686 / image.width, 444 / image.height);
        const w = image.width * factor,
          h = image.height * factor;
        ctx.drawImage(image, 41 + (686 - w) / 2, 361 + (444 - h) / 2, w, h);
        texture.needsUpdate = true;
        invalidate();
      };
      image.onerror = () => {
        /* The title remains legible; the HTML card retains the original asset. */
      };
      image.src = project.image;
      return texture;
    }

    projects.forEach((project, index) => {
      const group = new THREE.Group();
      // Separate boards, page block and spine preserve the volume's real depth.
      const boardGeometry = new THREE.BoxGeometry(1.53, 2.2, 0.035);
      const edge = new THREE.MeshStandardMaterial({
        color: index % 2 ? 0x776b9e : 0x3a707b,
        roughness: 0.7,
      });
      const paper = new THREE.MeshStandardMaterial({
        color: 0xb1bbca,
        roughness: 1,
      });
      const front = new THREE.MeshBasicMaterial({ map: cover(project, index) });
      const frontBoard = new THREE.Mesh(boardGeometry, [
        edge,
        edge,
        edge,
        edge,
        front,
        edge,
      ]);
      frontBoard.position.z = 0.17;
      const backBoard = new THREE.Mesh(boardGeometry, edge);
      backBoard.position.z = -0.17;
      const pages = new THREE.Mesh(
        new THREE.BoxGeometry(1.46, 2.12, 0.29),
        paper,
      );
      const spine = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, 2.2, 0.37),
        edge,
      );
      spine.position.x = -0.75;
      group.add(frontBoard, backBoard, pages, spine);
      group.traverse((object) => {
        object.userData.projectIndex = index;
      });
      pickables.push(frontBoard, spine, pages, backBoard);
      const pose = {
        x: (index - (projects.length - 1) / 2) * 1.76,
        y: 0,
        z: 0,
        ry: -0.24,
        scale: 1,
      };
      apply(group, pose);
      scene.add(group);
      volumes.push({ group, from: pose, to: pose });
    });

    function transition(selection = false) {
      if (disposed) return;
      const focused = projects.findIndex(
        (p) => p.title === latest.current.selected,
      );
      volumes.forEach((volume, i) => {
        volume.from = snapshot(volume.group);
        const baseX = (i - (projects.length - 1) / 2) * 1.76;
        volume.to =
          focused === i
            ? { x: 0, y: 0.12, z: 2, ry: -0.04, scale: 1.18 }
            : {
                x: focused >= 0 ? baseX + (i < focused ? -1.2 : 1.2) : baseX,
                y: focused < 0 && hover === i ? 0.12 : 0,
                z: focused >= 0 ? -1.8 : hover === i ? 0.55 : 0,
                ry: focused >= 0 ? -0.38 : hover === i ? -0.12 : -0.24,
                scale: focused >= 0 ? 0.82 : 1,
              };
      });
      duration = latest.current.animate
        ? selection
          ? motionSettings.selection * 1000
          : 220
        : 0;
      started = performance.now();
      transitioning = true;
      invalidate();
    }
    function render(now: number) {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      if (transitioning) {
        const t = duration ? Math.min(1, (now - started) / duration) : 1;
        const eased = 1 - Math.pow(1 - t, 3);
        volumes.forEach(({ group, from, to }) =>
          apply(group, {
            x: THREE.MathUtils.lerp(from.x, to.x, eased),
            y: THREE.MathUtils.lerp(from.y, to.y, eased),
            z: THREE.MathUtils.lerp(from.z, to.z, eased),
            ry: THREE.MathUtils.lerp(from.ry, to.ry, eased),
            scale: THREE.MathUtils.lerp(from.scale, to.scale, eased),
          }),
        );
        transitioning = t < 1;
      }
      try {
        renderer.render(scene, camera);
      } catch {
        latest.current.onFailure();
        return;
      }
      if (transitioning) invalidate();
    }
    const resize = new ResizeObserver(() => {
      if (disposed) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const halfWidth = Math.max(5.9, projects.length * 0.93);
      const halfHeight = (halfWidth * height) / width;
      camera.left = -halfWidth;
      camera.right = halfWidth;
      camera.top = halfHeight;
      camera.bottom = -halfHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      invalidate();
    });
    resize.observe(canvas);
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) invalidate();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    intersection.observe(canvas);
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else invalidate();
    };
    document.addEventListener("visibilitychange", visibility);
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pick = (event: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      ray.setFromCamera(pointer, camera);
      return (
        ray.intersectObjects(pickables, false)[0]?.object.userData
          .projectIndex ?? -1
      );
    };
    const move = (event: PointerEvent) => {
      if (latest.current.selected) return;
      const next = pick(event);
      if (next === hover) return;
      hover = next;
      canvas.style.cursor = hover < 0 ? "default" : "pointer";
      transition();
    };
    const leave = () => {
      if (hover !== -1) {
        hover = -1;
        canvas.style.cursor = "default";
        transition();
      }
    };
    const click = (event: MouseEvent) => {
      const index = pick(event);
      if (index >= 0) latest.current.onSelect(projects[index]);
    };
    const lost = (event: Event) => {
      event.preventDefault();
      latest.current.onFailure();
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("click", click);
    canvas.addEventListener("webglcontextlost", lost);
    actions.current = { select: () => transition(true) };
    transition(true);
    return () => {
      disposed = true;
      actions.current = null;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("click", click);
      canvas.removeEventListener("webglcontextlost", lost);
      images.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((m) => materials.add(m));
        }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.renderLists.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [projects]);
  useEffect(() => {
    actions.current?.select();
  }, [selected, animate]);
  return <div ref={hostRef} className="size-full" aria-hidden="true" />;
}
