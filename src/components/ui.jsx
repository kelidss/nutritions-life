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

export function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? "section-label--light" : ""}`}>
      <span>{number}</span>
      <i aria-hidden="true" />
      <small>{children}</small>
    </div>
  );
}
