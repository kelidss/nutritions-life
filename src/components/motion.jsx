import { Fragment, useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Adiciona .is-in aos elementos [data-reveal] quando entram na tela. */
export function useRevealAll() {
  useEffect(() => {
    document.documentElement.classList.add("motion");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

/** Parallax vertical suave para elementos com [data-speed]. */
export function useParallaxAll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const elements = [...document.querySelectorAll("[data-speed]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      elements.forEach((element) => {
        const rect = element.parentElement.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - middle) * Number(element.dataset.speed);
        element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/** Escreve --p (0 a 1) no elemento conforme ele atravessa a tela. */
export function useScrollProgress(ref, { start = 0.85, end = 0.3, onProgress } = {}) {
  const callback = useRef(onProgress);
  callback.current = onProgress;

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const span = Math.max(rect.height, (start - end) * viewport);
      const progress = Math.min(1, Math.max(0, (start * viewport - rect.top) / span));
      element.style.setProperty("--p", progress.toFixed(4));
      callback.current?.(progress);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, start, end]);
}

/** Converte a rolagem vertical em deslocamento horizontal da trilha (só em telas largas). */
export function useHorizontalScroll(sectionRef, trackRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const query = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let distance = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!distance) return;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
      track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`;
      section.style.setProperty("--progress", progress.toFixed(4));
    };
    const measure = () => {
      if (!query.matches) {
        distance = 0;
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + distance}px`;
      update();
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    measure();
    const images = track.querySelectorAll("img");
    images.forEach((image) => image.addEventListener("load", measure));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    query.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      images.forEach((image) => image.removeEventListener("load", measure));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      query.removeEventListener("change", measure);
    };
  }, [sectionRef, trackRef]);
}

/**
 * Título que surge palavra por palavra. Linhas iniciadas com * ficam em itálico/coral
 * e ganham um traço desenhado à mão sob a última palavra.
 */
export function SplitTitle({ as: Tag = "h2", lines, className = "" }) {
  let index = 0;
  return (
    <Tag className={`split ${className}`} data-reveal="split">
      {lines.map((line) => {
        const emphasis = line.startsWith("*");
        const words = (emphasis ? line.slice(1) : line).split(" ");
        const content = words.map((word, position) => {
          const mask = <span className="split__mask"><span className="split__word" style={{ "--i": index++ }}>{word}</span></span>;
          const isLast = position === words.length - 1;
          return (
            <Fragment key={position}>
              {emphasis && isLast ? (
                <span className="split__last">
                  {mask}
                  <svg className="scribble" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M3 13 C 60 5, 110 17, 170 10 S 260 5, 297 11" pathLength="1" />
                  </svg>
                </span>
              ) : mask}
              {isLast ? "" : " "}
            </Fragment>
          );
        });
        return <span className="split__line" key={line}>{emphasis ? <em>{content}</em> : content}</span>;
      })}
    </Tag>
  );
}

export function CountUp({ to, decimals = 0, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (prefersReducedMotion()) { setValue(to); return; }
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(to * (1 - Math.pow(1 - t, 4)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [to, duration]);

  return <span ref={ref}>{value.toFixed(decimals).replace(".", ",")}{suffix}</span>;
}

/** Envolve um botão e faz ele "seguir" levemente o cursor. */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const onMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { ref.current.style.transform = ""; };
  return <span className="magnetic" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</span>;
}

/** Handlers de inclinação 3D para cards (usa --rx, --ry, --gx, --gy no CSS). */
export const tilt = (max = 7) => ({
  onMouseMove: (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
    element.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
    element.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    element.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  },
  onMouseLeave: (event) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  },
});
