export function Arrow() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

export function Brand({ dark = false }) {
  return (
    <a className={`brand ${dark ? "brand--dark" : ""}`} href="#inicio" aria-label="Nutrition's Life, início">
      <img src={`/assets/ícone ${dark ? "preto" : "branco"}.jpg`} alt="" />
      <span>nutrition&apos;s<small>life</small></span>
    </a>
  );
}

export function SectionLabel({ number, children }) {
  return (
    <p className="section-label" data-reveal>
      <span>{number}</span>
      <i aria-hidden="true" />
      {children}
    </p>
  );
}

const iconPaths = {
  plate: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.5" /></>,
  drop: <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z" />,
  leaf: <><path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15z" /><path d="M5 19l8-8" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  swap: <><path d="M4 8h14l-4-4" /><path d="M20 16H6l4 4" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></>,
  chart: <><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 16v-5M12 16V8M16 16v-3" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
};

export function Icon({ name }) {
  return (
    <svg className="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

export function WhatsappIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M16 2a13 13 0 0 0-11.26 19.5L3 29l7.73-1.7A13 13 0 1 0 16 2zm0 24a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-4.58 1 1-4.47-.26-.42A10.91 10.91 0 1 1 16 26zm5.94-8.13c-.33-.16-1.92-.95-2.22-1.06s-.52-.16-.74.16-.85 1.06-1.05 1.28-.39.25-.72.08a9.14 9.14 0 0 1-2.69-1.66 10.1 10.1 0 0 1-1.86-2.32c-.2-.33 0-.5.15-.66s.33-.39.49-.58a2.25 2.25 0 0 0 .33-.55.61.61 0 0 0 0-.58c-.08-.16-.74-1.78-1-2.44s-.54-.56-.74-.57h-.63a1.22 1.22 0 0 0-.88.41A3.68 3.68 0 0 0 9.7 12a6.43 6.43 0 0 0 1.35 3.41 14.7 14.7 0 0 0 5.62 4.97c.78.34 1.39.54 1.86.69a4.48 4.48 0 0 0 2.06.13 3.36 3.36 0 0 0 2.21-1.56 2.73 2.73 0 0 0 .19-1.56c-.07-.12-.26-.2-.59-.36z" />
    </svg>
  );
}
