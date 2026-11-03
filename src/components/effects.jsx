import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { prefersReducedMotion } from "./motion";

let lenis = null;

/** Rolagem suave com inércia (desktop). No toque o navegador mantém a rolagem nativa. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => {
      lenis.destroy();
      lenis = null;
    };
  }, []);
}

export function setScrollLocked(locked) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/** Velocidade da rolagem suavizada, compartilhada por quem precisar (px por frame). */
function useScrollVelocity(onFrame) {
  const callback = useRef(onFrame);
  callback.current = onFrame;

  useEffect(() => {
    let last = window.scrollY;
    let velocity = 0;
    let frame = requestAnimationFrame(function tick() {
      const y = window.scrollY;
      velocity += (y - last - velocity) * 0.2;
      last = y;
      callback.current(velocity);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}

/**
 * Faixa infinita que acelera e inverte o sentido conforme a rolagem.
 * `direction` 1 anda para a esquerda, -1 para a direita.
 */
export function VelocityMarquee({ children, direction = 1, speed = 0.6, className = "" }) {
  const trackRef = useRef(null);
  const state = useRef({ x: 0, sign: 1, visible: true });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { state.current.visible = entry.isIntersecting; });
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  useScrollVelocity((velocity) => {
    const track = trackRef.current;
    const current = state.current;
    if (!track || !current.visible || prefersReducedMotion()) return;
    if (Math.abs(velocity) > 0.5) current.sign = velocity > 0 ? 1 : -1;
    const half = track.scrollWidth / 2;
    current.x -= (speed + Math.min(Math.abs(velocity) * 0.35, 18)) * direction * current.sign;
    if (current.x <= -half) current.x += half;
    if (current.x > 0) current.x -= half;
    const skew = Math.max(-8, Math.min(8, velocity * -0.25));
    track.style.transform = `translate3d(${current.x.toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
  });

  return (
    <div className={`vmarquee ${className}`}>
      <div className="vmarquee__track" ref={trackRef}>
        {children}
        {children}
      </div>
    </div>
  );
}

/** Cursor personalizado: ponto + anel que cresce sobre links e mostra rótulos em [data-cursor]. */
export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled] = useState(() => window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion());
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState("");

  useEffect(() => {
    if (!enabled) return undefined;
    document.documentElement.classList.add("has-cursor");
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const evaluate = (node) => {
      const element = node?.closest?.("[data-cursor], a, button, select, label");
      const text = element?.closest("[data-cursor]")?.dataset.cursor || "";
      setLabel(text);
      setMode(text ? "label" : element ? "hover" : "");
    };
    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      evaluate(event.target);
    };
    // Ao rolar sem mexer o mouse, o elemento sob o cursor muda.
    const onScroll = () => evaluate(document.elementFromPoint(target.x, target.y));
    const onLeave = () => setMode("hidden");
    const onDown = () => ringRef.current?.classList.add("is-down");
    const onUp = () => ringRef.current?.classList.remove("is-down");
    const tick = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className={`cursor-dot ${mode ? `is-${mode}` : ""}`} ref={dotRef} aria-hidden="true" />
      <div className={`cursor-ring ${mode ? `is-${mode}` : ""}`} ref={ringRef} aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  );
}

/** Contador 0–100 do loader. */
export function LoaderCount({ duration = 1100 }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [duration]);
  return <span className="loader__count">{String(value).padStart(3, "0")}</span>;
}
