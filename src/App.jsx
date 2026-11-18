import { useEffect, useRef, useState } from "react";
import { Arrow, Brand, Icon, SectionLabel, WhatsappIcon } from "./components/ui";
import {
  CountUp,
  Magnetic,
  SplitTitle,
  prefersReducedMotion,
  tilt,
  useHorizontalScroll,
  useParallaxAll,
  useRevealAll,
  useScrollProgress,
} from "./components/motion";
import { VelocityMarquee, setScrollLocked, useSmoothScroll } from "./components/effects";
import {
  evaluations,
  faq,
  guideCombos,
  guidePrice,
  guides,
  includes,
  links,
  methodCompare,
  planNotes,
  plans,
  quiz,
  results,
  reviews,
  sampleMenu,
  specialties,
  stats,
  steps,
  whatsappLink,
} from "./data/content";

const { doctoralia, instagram } = links;

const navLinks = [
  ["Sobre", "#sobre"],
  ["Resultados", "#resultados"],
  ["Especialidades", "#especialidades"],
  ["Planos", "#planos"],
  ["Guias", "#guias"],
  ["Contato", "#contato"],
];

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 500 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(open);
  }, [open]);

  const classes = ["header", scrolled && "header--scrolled", hidden && !open && "header--hidden", open && "header--open"].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <Brand dark={!open} />
      <nav id="main-nav" className="nav" aria-label="Navegação principal">
        {navLinks.map(([label, href], index) => (
          <a href={href} key={href} style={{ "--i": index }} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <a className="header__cta" href={whatsappLink("Gostaria de agendar uma consulta.")} target="_blank" rel="noopener noreferrer">
        Agendar consulta <Arrow />
      </a>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        <span /><span />
      </button>
    </header>
  );
}

function Hero({ ready }) {
  return (
    <section className={`hero hero--soft ${ready ? "is-ready" : ""}`} id="inicio">
      <div className="container">
        <div className="hs">

          <div className="hs__copy">
            <p className="hero__kicker">Nutricionista em Maracanaú · CRN 14913</p>
            <h1 className="hero__title hs__title">
              <span className="hero__line"><span>Alimente a sua</span></span>
              <span className="hero__line"><span><em>melhor versão.</em></span></span>
            </h1>
            <p className="hero__lead">
              Acompanhamento próximo e estratégico para transformar sua rotina, sua saúde e seu corpo — <strong>com ciência e sem restrições severas.</strong>
            </p>
            <div className="hero__actions">
              <Magnetic>
                <a className="btn hs__cta" href={whatsappLink("Gostaria de agendar uma consulta.")} target="_blank" rel="noopener noreferrer">
                  Agendar consulta <span className="hs__cta-arrow"><Arrow /></span>
                </a>
              </Magnetic>
              <a className="btn btn--line" href="#quiz">Descubra seu plano</a>
            </div>
            <ul className="hs__features">
              <li><span><Icon name="leaf" /></span>Plano 100% individual</li>
              <li><span><Icon name="chat" /></span>Suporte pelo WhatsApp</li>
              <li><span><Icon name="pin" /></span>Presencial e online</li>
            </ul>
          </div>

          <div className="hs__visual">
            <div className="hs__halo" aria-hidden="true">
              <span className="hs__orb" />
              <span className="hs__ring" />
              <p className="hs__hello">
                oi, eu sou o Anderson!
                <svg viewBox="0 0 120 70"><path d="M6 12c40-12 84 0 104 40M92 40l18 14 2-22" /></svg>
              </p>
            </div>
            <span className="hs__chip" aria-hidden="true"><Icon name="chart" /> Bioimpedância inclusa</span>
            <span className="hs__plate" aria-hidden="true"><img src={sampleMenu[1].image} alt="" /></span>
            <img className="hs__photo" src="/assets/anderson-cutout-clean.png" alt="Anderson Oliveira, nutricionista" fetchPriority="high" />
            <div className="hs__badge">
              <img src="/assets/anderson-pill.webp" alt="" />
              <span>
                <strong>Anderson Oliveira <i aria-hidden="true">✓</i></strong>
                <small>★★★★★ 5,0 · 21 avaliações</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Nutrição clínica", "Emagrecimento", "Hipertrofia", "Nutrição funcional", "Fitoterapia", "Suplementação"];
  const items = words.map((word) => <span key={word}>{word}<b>•</b></span>);
  return (
    <div className="marquee" aria-label="Áreas de atuação">
      <VelocityMarquee className="marquee__row marquee__row--coral">{items}</VelocityMarquee>
      <VelocityMarquee className="marquee__row marquee__row--forest" direction={-1}>{items}</VelocityMarquee>
    </div>
  );
}

function About() {
  const statementRef = useRef(null);
  useScrollProgress(statementRef, { start: 0.85, end: 0.4 });
  const statement = "Não acredito em dieta perfeita. Acredito em estratégia possível, ajustada à sua rotina, com acolhimento, ciência e constância.";
  const words = statement.split(" ");
  const story = [
    { image: "/assets/anderson-antes.webp", alt: "Anderson antes da mudança de hábitos", title: "onde tudo começou", text: "Acima do peso e sem saber por onde começar. Eu conheço esse lugar." },
    { image: "/assets/anderson-depois.webp", alt: "Anderson depois da mudança de hábitos", title: "a virada", text: "Mudei a alimentação e a rotina na prática, um passo de cada vez." },
  ];
  const pillars = [
    ["swap", "Plano possível", "Feito para a sua rotina, não para uma vida perfeita."],
    ["chart", "Ciência no detalhe", "Exames, bioimpedância e evidência guiando cada ajuste."],
    ["chat", "Falo direto com você", "Dúvidas pelo WhatsApp, sem intermediários."],
  ];
  const areas = ["Nutrição clínica", "Nutrição esportiva", "Nutrição funcional", "Fitoterapia", "Suplementação"];

  return (
    <section className="bio" id="sobre">
      <div className="container">
        <div className="bio__head">
          <div>
            <SectionLabel>prazer, Anderson</SectionLabel>
            <SplitTitle lines={["Eu sei como é", "*começar do zero."]} />
          </div>
          <p className="bio__intro" data-reveal>
            Sou <strong>Anderson Oliveira</strong>, nutricionista em Maracanaú e online para todo o Brasil. Antes de cuidar dos meus pacientes, precisei cuidar de mim — e essa história mudou o jeito que eu atendo.
          </p>
        </div>

        <div className="bio__body">
        <ol className="bio__story">
          {story.map((item, index) => (
            <li className="bio__step" data-reveal style={{ "--d": index }} key={item.title}>
              <figure className="bio__photo">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span className="bio__num">0{index + 1}</span>
              </figure>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {index < story.length - 1 && (
                <svg className="bio__arrow" viewBox="0 0 120 50" aria-hidden="true"><path d="M4 30c30-26 70-26 104-4M96 14l12 12-16 6" /></svg>
              )}
            </li>
          ))}
        </ol>

        <div className="bio__bottom">
          <p className="bio__statement" ref={statementRef} style={{ "--n": words.length }}>
            {words.map((word, index) => <span key={index} style={{ "--i": index }}>{word} </span>)}
          </p>
          <div className="bio__side">
            <ul className="bio__pillars">
              {pillars.map(([icon, title, text], index) => (
                <li data-reveal style={{ "--d": index }} key={title}>
                  <span className="bio__icon"><Icon name={icon} /></span>
                  <span><strong>{title}</strong>{text}</span>
                </li>
              ))}
            </ul>
            <ul className="bio__areas" data-reveal>
              {areas.map((area) => <li key={area}>{area}</li>)}
            </ul>
            <div className="bio__foot" data-reveal>
              <div>
                <span className="bio__signature">Anderson Oliveira</span>
                <small>Nutricionista · CRN 14913</small>
              </div>
              <div className="bio__links">
                <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram <Arrow /></a>
                <a href={doctoralia} target="_blank" rel="noopener noreferrer">Doctoralia · 5,0 <Arrow /></a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats" aria-label="Números">
      <div className="container stats__grid">
        {stats.map((item, index) => (
          <div className="stats__item" data-reveal style={{ "--d": index }} key={item.label}>
            <strong><CountUp to={item.to} decimals={item.decimals} suffix={item.suffix} /></strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="method" id="metodo">
      <div className="container">
        <div className="sec-head sec-head--center">
          <SectionLabel>por que funciona</SectionLabel>
          <SplitTitle lines={["A diferença entre", "*fazer dieta e ter estratégia."]} />
        </div>
        <div className="method__grid">
          <article className="method__card method__card--old" data-reveal="left">
            <h3>Dieta comum</h3>
            <ul>
              {methodCompare.old.map(([title, text], index) => (
                <li key={title} style={{ "--d": index }}>
                  <span className="method__mark">✕</span>
                  <div><strong className="strike">{title}</strong><p>{text}</p></div>
                </li>
              ))}
            </ul>
          </article>
          <div className="method__vs" data-reveal="scale">vs</div>
          <article className="method__card method__card--new" data-reveal="right" {...tilt(5)}>
            <span className="method__badge">é assim que eu trabalho</span>
            <h3>Método Nutrition&apos;s Life</h3>
            <ul>
              {methodCompare.new.map(([title, text], index) => (
                <li key={title} style={{ "--d": index }}>
                  <span className="method__mark">✓</span>
                  <div><strong>{title}</strong><p>{text}</p></div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function Specialties() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  useHorizontalScroll(sectionRef, trackRef);

  return (
    <section className="spec" id="especialidades" ref={sectionRef}>
      <div className="spec__sticky">
        <div className="spec__track" ref={trackRef}>
          <div className="spec__intro">
            <SectionLabel>como posso te ajudar</SectionLabel>
            <SplitTitle lines={["Seu caminho", "para uma", "*saúde de verdade."]} />
            <p data-reveal>Cada objetivo pede uma estratégia diferente. Escolha por onde quer começar.</p>
            <div className="spec__hint" data-reveal>
              <span className="spec__bar"><span /></span>
              Role para explorar →
            </div>
          </div>
          <div className="spec__cards">
          {specialties.map((item, index) => (
            <article className="spec-card" key={item.title}>
              <span className="plate spec-card__plate"><img src={item.image} alt="" loading="lazy" /></span>
              <span className="spec-card__num">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="spec-card__foot">
                <ul className="spec-card__tags">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <a className="round-add" href={whatsappLink(item.message)} target="_blank" rel="noopener noreferrer" aria-label={`Quero saber mais sobre ${item.title}`}>
                  <Arrow />
                </a>
              </div>
            </article>
          ))}
          </div>
          <div className="spec__end">
            <p>Não sabe por onde começar?</p>
            <Magnetic>
              <a className="circle-btn" href={whatsappLink("Não sei qual especialidade é a ideal para mim. Pode me ajudar?")} target="_blank" rel="noopener noreferrer">
                Fale comigo <Arrow />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  useScrollProgress(ref, { start: 0.8, end: 0.45 });
  const photos = [
    ["/assets/fotos/personal-diet-avaliacao.webp", "Anderson medindo a circunferência de uma paciente"],
    ["/assets/fotos/consultorio.webp", "Anderson montando o plano alimentar no computador"],
    ["/assets/fotos/personal-diet.webp", "Anderson conversando com uma paciente"],
  ];
  const [chat, ...others] = includes;

  return (
    <section className="journey" id="processo">
      <div className="container">
        <div className="journey__head">
          <SectionLabel>o passo a passo</SectionLabel>
          <SplitTitle lines={["Um plano que", "*acompanha você."]} />
          <p data-reveal>Clareza para começar, estratégia para avançar e acompanhamento para não caminhar sozinho.</p>
        </div>

        <ol className="journey__steps" ref={ref}>
          <svg className="journey__path" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M40 30 C 200 -10, 300 70, 500 30 S 800 -10, 960 30" pathLength="1" />
          </svg>
          {steps.map((step, index) => (
            <li className="journey__step" data-reveal style={{ "--d": index }} key={step.title}>
              <figure className="journey__photo">
                <img src={photos[index][0]} alt={photos[index][1]} loading="lazy" />
                <span className="journey__num">0{index + 1}</span>
              </figure>
              <span className="journey__tag">{step.tag}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <ul>
                {step.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </li>
          ))}
        </ol>

        <div className="perks">
          <div className="perks__intro" data-reveal>
            <p className="perks__kicker">e não para por aí</p>
            <h3>Tudo isso <em>incluso</em> no seu plano.</h3>
            <p>Além da consulta, você recebe materiais e suporte para colocar o plano em prática todos os dias.</p>
          </div>

          <article className="perks__chat" data-reveal style={{ "--d": 1 }}>
            <div className="perks__chat-head">
              <span className="perks__icon"><Icon name={chat[0]} /></span>
              <div>
                <strong>{chat[1]}</strong>
                <small>{chat[2]}</small>
              </div>
            </div>
            <div className="perks__phone" aria-label="Exemplo ilustrativo de conversa pelo WhatsApp">
              <p className="perks__msg perks__msg--in">Vou num aniversário hoje 😅 o que eu como lá?</p>
              <p className="perks__msg perks__msg--out">Prioriza a proteína e a salada, escolhe 1 docinho sem culpa e volta ao plano amanhã 💪</p>
              <p className="perks__msg perks__msg--in">Perfeito, obrigada!</p>
              <span className="perks__typing"><i /><i /><i /></span>
            </div>
            <span className="perks__note">exemplo de conversa</span>
          </article>

          {others.map(([icon, title, text], index) => (
            <article className="perks__card" data-reveal style={{ "--d": index + 2 }} key={title}>
              <span className="perks__icon"><Icon name={icon} /></span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evaluations() {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = evaluations[tab];
  const [file, label] = current.pages[page];
  const src = (name) => `/assets/avaliacao/${name}.webp`;
  const stageRef = useRef(null);

  const choose = (index) => {
    setTab(index);
    setPage(0);
  };
  const step = (direction) => setPage((value) => (value + direction + current.pages.length) % current.pages.length);

  useEffect(() => {
    if (!zoom) return undefined;
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, [zoom]);

  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setZoom(false);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section className="evals" id="avaliacao">
      <div className="container">
        <div className="evals__head">
          <div>
            <SectionLabel>por dentro da avaliação</SectionLabel>
            <SplitTitle lines={["Uma avaliação", "*de verdade."]} />
          </div>
          <p data-reveal>Veja fichas reais de pacientes (com os nomes ocultados) e entenda a profundidade de cada avaliação física — no consultório ou online.</p>
        </div>

        <div className="evals__tabs" role="tablist" aria-label="Tipo de avaliação" data-reveal>
          {evaluations.map((item, index) => (
            <button type="button" role="tab" aria-selected={index === tab} className={index === tab ? "is-active" : ""} onClick={() => choose(index)} key={item.key}>
              {item.tab}
            </button>
          ))}
        </div>

        <div className="evals__body" key={current.key}>
          <div className="evals__info">
            <span className="evals__where">{current.where}</span>
            <h3>{current.title}</h3>
            <p>{current.text}</p>
            <ul>
              {current.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a className="btn btn--coral" href={whatsappLink(`Quero agendar uma ${current.title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">
              Quero minha avaliação <Arrow />
            </a>
          </div>

          <div className="evals__viewer">
            <div
              className="deck3d"
              ref={stageRef}
              data-reveal="deck"
            >
              <div className="deck3d__scene">
                {current.pages.map(([name, text, ratio], index) => {
                  const offset = index - page;
                  return (
                    <button
                      type="button"
                      className={`deck3d__sheet ${offset === 0 ? "is-front" : ""}`}
                      style={{ "--o": offset, "--a": Math.abs(offset), "--ar": ratio, "--i": index }}
                      onClick={() => (offset === 0 ? setZoom(true) : setPage(index))}
                      aria-label={offset === 0 ? `Ampliar ficha: ${text}` : `Ver ficha: ${text}`}
                      key={name}
                    >
                      <img src={src(name)} alt={`Exemplo de ficha de ${current.title.toLowerCase()}: ${text}`} loading="lazy" />
                    </button>
                  );
                })}
                <span className="deck3d__chip deck3d__chip--a" aria-hidden="true">{label}</span>
                <span className="deck3d__chip deck3d__chip--b" aria-hidden="true">toque para ampliar</span>
              </div>
              <span className="deck3d__floor" aria-hidden="true" />
            </div>
            <div className="deck3d__nav">
              <button type="button" onClick={() => step(-1)} aria-label="Ficha anterior">←</button>
              <div className="deck3d__dots">
                {current.pages.map(([name, text], index) => (
                  <button type="button" className={index === page ? "is-active" : ""} onClick={() => setPage(index)} key={name}>{text}</button>
                ))}
              </div>
              <button type="button" onClick={() => step(1)} aria-label="Próxima ficha">→</button>
            </div>
          </div>
        </div>
      </div>

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onClick={() => setZoom(false)}>
          <img src={src(file)} alt={label} onClick={(event) => event.stopPropagation()} />
          <button type="button" className="lightbox__close" onClick={() => setZoom(false)} aria-label="Fechar">✕</button>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={(event) => { event.stopPropagation(); step(-1); }} aria-label="Página anterior">←</button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={(event) => { event.stopPropagation(); step(1); }} aria-label="Próxima página">→</button>
          <span className="lightbox__label">{label} · {page + 1}/{current.pages.length}</span>
        </div>
      )}
    </section>
  );
}

function MenuDay() {
  const [active, setActive] = useState(0);
  const meal = sampleMenu[active];
  const total = meal.macros.p * 4 + meal.macros.c * 4 + meal.macros.g * 9;
  const macroRows = [["Proteínas", meal.macros.p, 4], ["Carboidratos", meal.macros.c, 4], ["Gorduras", meal.macros.g, 9]];

  return (
    <section className="menu" id="cardapio">
      <div className="container menu__grid">
        <div className="menu__copy">
          <SectionLabel>um dia no prato</SectionLabel>
          <SplitTitle lines={["Um dia de", "*comida de verdade."]} />
          <p className="menu__intro" data-reveal>Saboroso, prático e com comida regional. Toque em cada refeição — os valores são ilustrativos, o seu cardápio é calculado para você.</p>

          <div className="menu__tabs" role="tablist" aria-label="Refeições do dia" data-reveal>
            {sampleMenu.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={index === active}
                className={index === active ? "is-active" : ""}
                onClick={() => setActive(index)}
                key={item.meal}
              >
                <small>{item.time}</small>
                {item.meal}
              </button>
            ))}
          </div>

          <div className="menu__panel" key={active} role="tabpanel">
            <ul className="menu__dishes">
              {meal.dishes.map((dish, index) => <li key={dish} style={{ "--d": index }}>{dish}</li>)}
            </ul>
            <div className="menu__macros">
              {macroRows.map(([label, grams, factor], index) => (
                <div className="macro" key={label}>
                  <span>{label}</span>
                  <span className="macro__bar"><span style={{ "--w": `${Math.round((grams * factor / total) * 100)}%`, "--d": index }} /></span>
                  <strong>{grams} g</strong>
                </div>
              ))}
            </div>
          </div>

          <a className="link-arrow" href={whatsappLink("Quero um cardápio individualizado.")} target="_blank" rel="noopener noreferrer">
            Quero meu cardápio individualizado <Arrow />
          </a>
        </div>

        <div className="menu__visual" data-reveal="scale">
          <svg className="menu__ring" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="96" /></svg>
          <div className="menu__plate" key={active}>
            <img src={meal.image} alt={`Exemplo de ${meal.meal.toLowerCase()}: ${meal.dishes[0].toLowerCase()}`} loading="lazy" />
          </div>
          <div className="menu__kcal" key={`kcal-${active}`}>
            <strong>{meal.kcal}</strong>
            <small>kcal</small>
          </div>
        </div>
      </div>
    </section>
  );
}

const toNumber = (price) => Number(price.replace(/\D/g, ""));
const consultCount = (label) => {
  const match = label.match(/(\d+) consultas/);
  if (match) return Number(match[1]);
  return label.includes("retorno") && !label.includes("sem") ? 2 : 1;
};
const money = (value) => `R$ ${value.toLocaleString("pt-BR")}`;

function PlanCard({ plan, index }) {
  const [choice, setChoice] = useState(plan.featured ? 2 : 0);
  const [label, price] = plan.packages[choice];
  const total = toNumber(price);
  const count = consultCount(label);
  const base = toNumber(plan.packages[0][1]);
  const saving = base * count - total;
  // O plano em destaque fica no meio, como na referência.
  const order = plan.featured ? 2 : index === 1 ? 1 : 3;

  return (
    <article className={`plan ${plan.featured ? "plan--featured" : ""}`} data-reveal style={{ "--d": index, order }}>
      <span className="plate plan__plate"><img src={plan.image} alt="" loading="lazy" /></span>
      {plan.featured && <span className="plan__badge">o mais escolhido</span>}
      <span className="plan__label">{plan.label}</span>
      <h3>{plan.title}</h3>
      <p className="plan__detail">{plan.detail}</p>

      <label className="plan__select">
        <span>Escolha o pacote</span>
        <select value={choice} onChange={(event) => setChoice(Number(event.target.value))}>
          {plan.packages.map(([packageLabel], packageIndex) => (
            <option value={packageIndex} key={packageLabel}>{packageLabel}</option>
          ))}
        </select>
      </label>

      <div className="plan__price" key={choice}>
        <strong>{price}</strong>
        <span>{count > 1 ? `${money(Math.round(total / count))} por consulta` : "à vista / PIX"}</span>
        {saving > 0 && <em className="plan__saving">Economia de {money(saving)}</em>}
      </div>

      <ul className="plan__features">
        {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>

      <a className="btn btn--block" href={whatsappLink(`Tenho interesse no plano ${plan.title} (${label} – ${price}).`)} target="_blank" rel="noopener noreferrer">
        Quero este plano <Arrow />
      </a>
    </article>
  );
}

function Plans() {
  return (
    <section className="plans" id="planos">
      <div className="container">
        <div className="sec-head sec-head--center">
          <SectionLabel>planos e valores</SectionLabel>
          <SplitTitle lines={["Seu cuidado,", "*do seu jeito."]} />
          <p data-reveal>Escolha o formato e o pacote — o valor por consulta e a economia aparecem na hora.</p>
        </div>
        <div className="plans__grid">
          {plans.map((plan, index) => <PlanCard plan={plan} index={index} key={plan.title} />)}
        </div>
        <ul className="plans__notes" data-reveal>
          {planNotes.map((note) => <li key={note}><span>✓</span>{note}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [visible, setVisible] = useState(0);
  const [started, setStarted] = useState(false);
  const bodyRef = useRef(null);

  // A conversa só começa quando o celular aparece na tela.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(bodyRef.current);
    return () => observer.disconnect();
  }, []);
  const step = answers.length;
  const done = step >= quiz.length;

  let result = null;
  if (done) {
    const [goal, format, length] = answers;
    const plan = plans[format.plan];
    const [label, price] = plan.packages[length.package];
    const count = consultCount(label);
    result = { goal, plan, label, price, count, perConsult: Math.round(toNumber(price) / count), specialty: specialties[goal.specialty] };
  }

  // Monta a conversa: perguntas do Anderson e respostas do visitante.
  const reactions = ["Ótimo objetivo! E como você prefere ser atendido?", "Perfeito. Por quanto tempo você quer acompanhamento?"];
  const messages = [
    { from: "bot", text: "Oi! Eu sou o Anderson. Vou te ajudar a achar o plano ideal em 3 perguntinhas." },
    { from: "bot", text: quiz[0].question },
  ];
  answers.forEach((answer, index) => {
    messages.push({ from: "me", text: answer.label });
    if (index < quiz.length - 1) messages.push({ from: "bot", text: reactions[index] });
  });
  if (result) {
    messages.push({ from: "bot", text: "Pronto! Pelo que você me contou, eu indico:" });
    messages.push({ from: "bot", plan: result });
    messages.push({ from: "bot", text: `O foco vai ser ${result.specialty.title.toLowerCase()}. Quer agendar? É só me chamar aqui embaixo.` });
  }

  const typing = started && visible < messages.length && messages[visible].from === "bot";

  useEffect(() => {
    if (!started || visible >= messages.length) return undefined;
    const delay = messages[visible].from === "me" ? 150 : prefersReducedMotion() ? 0 : 850;
    const timer = setTimeout(() => setVisible((value) => value + 1), delay);
    return () => clearTimeout(timer);
  }, [started, visible, messages.length]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  const answer = (option) => setAnswers([...answers, option]);
  const restart = () => {
    setAnswers([]);
    setVisible(0);
  };
  const ready = visible >= messages.length;

  return (
    <section className="chatq" id="quiz">
      <div className="container chatq__grid">
        <div className="chatq__copy">
          <SectionLabel>vamos descobrir juntos?</SectionLabel>
          <SplitTitle lines={["Seu plano ideal", "*em 30 segundos."]} />
          <p data-reveal>Uma conversa rápida comigo: responda 3 perguntas e receba na hora a minha sugestão de plano para o seu momento.</p>
          <ul className="chatq__perks" data-reveal>
            <li><Icon name="chat" /> 3 perguntas rápidas</li>
            <li><Icon name="star" /> Sugestão na hora</li>
            <li><Icon name="leaf" /> Sem compromisso</li>
          </ul>
        </div>

        <div className="chatq__phone" data-reveal="scale">
          <div className="chatq__top">
            <img src="/assets/anderson-depois.webp" alt="" />
            <div>
              <strong>Anderson Oliveira</strong>
              <small>{typing ? "digitando…" : "online"}</small>
            </div>
            {step > 0 && <button type="button" onClick={restart} aria-label="Recomeçar a conversa">↺</button>}
          </div>

          <div className="chatq__body" ref={bodyRef} data-lenis-prevent aria-live="polite">
            {messages.slice(0, visible).map((message, index) => (
              message.plan ? (
                <div className="chatq__msg chatq__msg--bot chatq__plan" key={index}>
                  <span className="plate"><img src={message.plan.plan.image} alt="" /></span>
                  <div>
                    <strong>{message.plan.plan.title}</strong>
                    <small>{message.plan.label}</small>
                    <b>{message.plan.price}</b>
                    <small>{message.plan.count > 1 ? `${money(message.plan.perConsult)} por consulta` : "à vista / PIX"} · {message.plan.plan.detail}</small>
                  </div>
                </div>
              ) : (
                <p className={`chatq__msg chatq__msg--${message.from}`} key={index}>{message.text}</p>
              )
            ))}
            {typing && <span className="chatq__typing" aria-label="Anderson está digitando"><i /><i /><i /></span>}
          </div>

          <div className="chatq__reply">
            {!done && ready && (
              <div className="chatq__options" key={step}>
                {quiz[step].options.map((option, index) => (
                  <button type="button" style={{ "--d": index }} onClick={() => answer(option)} key={option.label}>
                    <Icon name={option.icon} /> {option.label}
                  </button>
                ))}
              </div>
            )}
            {done && ready && (
              <div className="chatq__final">
                <a
                  className="btn btn--coral"
                  href={whatsappLink(`Fiz o quiz do site! Objetivo: ${result.goal.label.toLowerCase()}. Plano: ${result.plan.title} – ${result.label} (${result.price}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon /> Continuar no WhatsApp
                </a>
                <button type="button" onClick={restart}>Refazer</button>
              </div>
            )}
            {!ready && <span className="chatq__wait">…</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const loop = [...reviews, ...reviews, ...reviews, ...reviews];
  return (
    <section className="reviews" id="avaliacoes">
      <div className="container reviews__head">
        <div>
          <SectionLabel>quem já passou por aqui</SectionLabel>
          <SplitTitle lines={["O que dizem", "*os pacientes."]} />
        </div>
        <div className="reviews__score" data-reveal="scale">
          <strong><CountUp to={5} decimals={1} /></strong>
          <div>
            <span className="reviews__stars">★★★★★</span>
            <small>21 avaliações verificadas no Doctoralia</small>
            <a className="link-arrow" href={doctoralia} target="_blank" rel="noopener noreferrer">Ver todas <Arrow /></a>
          </div>
        </div>
      </div>
      <div className="reviews__marquee">
        <div className="reviews__track">
          {loop.map((review, index) => (
            <figure className="review" key={index} aria-hidden={index >= reviews.length}>
              <span className="review__quote" aria-hidden="true">“</span>
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <span className="review__avatar">{review.author.split(" ").map((part) => part[0]).join("")}</span>
                <span>
                  <strong>{review.author}</strong>
                  <small>{review.tag} · Doctoralia</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="duvidas">
      <div className="container faq__grid">
        <div className="faq__head">
          <SectionLabel>dúvidas comuns</SectionLabel>
          <SplitTitle lines={["Tire suas", "*dúvidas."]} />
          <p data-reveal>Não encontrou o que procura? Mande uma mensagem — a resposta vem direto de mim.</p>
          <div className="faq__card" data-reveal>
            <img src="/assets/anderson-cutout-2.png" alt="" loading="lazy" />
            <div>
              <p>ficou alguma dúvida?</p>
              <strong>Me chama, eu respondo pessoalmente.</strong>
              <a className="btn btn--coral" href={whatsappLink("Tenho uma dúvida antes de agendar.")} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon /> Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="faq__list">
          {faq.map(([question, answer], index) => (
            <div className={`faq__item ${open === index ? "is-open" : ""}`} data-reveal style={{ "--d": index }} key={question}>
              <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
                {question}
                <span className="faq__icon" aria-hidden="true" />
              </button>
              <div className="faq__answer"><div><p>{answer}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter({ result }) {
  const [position, setPosition] = useState(50);
  const ref = useRef(null);

  // Pequena demonstração do arraste quando o comparador aparece pela primeira vez.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = (now - start) / 1600;
        if (t >= 1) { setPosition(50); return; }
        setPosition(50 + Math.sin(t * Math.PI * 2) * 22 * (1 - t));
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="ba" ref={ref} style={{ "--pos": `${position}%` }} data-cursor="Arraste">
      <img className="ba__img" src={result.before} alt={`${result.name} antes do acompanhamento`} />
      <img className="ba__img ba__img--after" src={result.after} alt={`${result.name} depois do acompanhamento`} />
      <span className="ba__tag ba__tag--before">Antes</span>
      <span className="ba__tag ba__tag--after">Depois</span>
      <span className="ba__handle" aria-hidden="true"><span>‹ ›</span></span>
      <input
        className="ba__range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Comparar antes e depois"
      />
    </div>
  );
}

function Results() {
  return (
    <section className="results" id="resultados">
      <div className="container">
        <div className="sec-head sec-head--center">
          <SectionLabel>gente de verdade</SectionLabel>
          <SplitTitle lines={["Transformações que", "*falam por si."]} />
          <p data-reveal>Pessoas reais, com rotina de verdade. Arraste a linha de cada foto para ver a mudança.</p>
        </div>

        <div className="results__cards">
          {results.map((result, index) => (
            <article className={`result-card ${index === 1 ? "result-card--featured" : ""}`} data-reveal style={{ "--d": index }} key={result.name}>
              <BeforeAfter result={result} />
              <div className="result-card__body">
                <span className="result-card__tag">{result.goal}</span>
                <h3>{result.name}</h3>
                <p>{result.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="results__stage">
          <div className="results__stage-media" data-reveal="left">
            <img src="/assets/resultados/paciente-palco-rafa.webp" alt="Paciente de biquíni vermelho no palco de uma competição de fisiculturismo da CBFFW" loading="lazy" />
          </div>
          <div className="results__stage-copy" data-reveal="right">
            <span className="results__stage-kicker">do consultório ao palco</span>
            <h3>Ela começou do zero e <em>chegou ao pódio.</em></h3>
            <p>Treino, plano alimentar ajustado fase a fase e muita constância. A mesma estratégia individualizada do primeiro dia até o palco do fisiculturismo.</p>
            <a className="link-arrow" href={whatsappLink("Quero preparação nutricional para competição.")} target="_blank" rel="noopener noreferrer">
              Quero me preparar <Arrow />
            </a>
          </div>
        </div>

        <p className="results__note">Imagens divulgadas com autorização dos pacientes. Os resultados variam de pessoa para pessoa.</p>
      </div>
    </section>
  );
}

const guidesTotal = (count) => {
  let best = count * guidePrice;
  guideCombos.forEach((combo) => {
    if (count >= combo.size) best = Math.min(best, combo.price + (count - combo.size) * guidePrice);
    else best = Math.min(best, combo.price);
  });
  return count === 0 ? 0 : best;
};

function Store() {
  const [cart, setCart] = useState([]);
  const shelfRef = useRef(null);
  const toggle = (id) => setCart((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const selectAll = () => setCart(guides.map((guide) => guide.id));
  const toShelf = () => shelfRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const count = cart.length;
  const full = count * guidePrice;
  const total = guidesTotal(count);
  const upsell = guideCombos.find((combo) => combo.size > count && combo.price <= total + guidePrice);
  const nextCombo = guideCombos.find((combo) => combo.size > count);
  let cartHint = `Leve ${nextCombo?.size} guias por ${money(nextCombo?.price ?? 0)}`;
  if (count === guides.length) cartHint = "Coleção completa com o melhor preço";
  else if (upsell) cartHint = `Adicione mais ${upsell.size - count} e leve ${upsell.size === guides.length ? "a coleção completa" : `${upsell.size} guias`} por ${money(upsell.price)}`;
  else if (total < full) cartHint = `Combo aplicado: economia de ${money(full - total)}`;
  const chosen = guides.filter((guide) => cart.includes(guide.id));
  const message = `Quero comprar ${count === guides.length ? "a coleção completa de guias" : `${count} guia${count > 1 ? "s" : ""}`}: ${chosen.map((guide) => guide.title).join(", ")}. Total: ${money(total)}.`;
  const maxOff = Math.round((1 - guideCombos[guideCombos.length - 1].price / (guides.length * guidePrice)) * 100);
  const stack = ["doces-fitness", "industrializados", "temperos"];

  return (
    <section className="store" id="guias">
      <div className="container">
        <div className="store__head">
          <div className="store__intro">
            <SectionLabel>meus guias</SectionLabel>
            <SplitTitle lines={["Conhecimento para", "*levar para casa."]} />
            <p data-reveal>Guias práticos em PDF, escritos por mim, para usar na cozinha, no mercado e no fim de semana. Cada um sai por {money(guidePrice)} — em combo, fica ainda mais em conta.</p>
            <ul className="store__perks" data-reveal>
              <li><Icon name="chat" /> Envio pelo WhatsApp</li>
              <li><Icon name="book" /> Leia no celular ou imprima</li>
              <li><Icon name="star" /> Até {maxOff}% off nos combos</li>
            </ul>
          </div>
          <div className="store__stack" data-reveal="scale" aria-hidden="true">
            {stack.map((id, index) => (
              <img src={`/assets/guias/${id}.webp`} alt="" loading="lazy" style={{ "--i": index }} key={id} />
            ))}
            <p className="store__note">
              escritos por mim!
              <svg viewBox="0 0 90 70"><path d="M8 12c30-8 60 6 66 40M58 42l16 12 6-18" /></svg>
            </p>
          </div>
        </div>

        <div className="tickets" data-reveal>
          {guideCombos.map((combo) => {
            const complete = combo.size === guides.length;
            return (
              <div className={`ticket ${complete ? "ticket--hot" : ""}`} key={combo.size}>
                <div className="ticket__main">
                  <span className="ticket__label">{combo.label}</span>
                  <strong>{money(combo.price)}</strong>
                  <small><s>{money(combo.size * guidePrice)}</s> · economia de {money(combo.size * guidePrice - combo.price)}</small>
                </div>
                <div className="ticket__stub">
                  {complete ? (
                    <button type="button" onClick={selectAll}>Quero todos</button>
                  ) : (
                    <button type="button" onClick={toShelf}>Escolher {combo.size}</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="shelf" ref={shelfRef}>
          {guides.map((guide, index) => {
            const selected = cart.includes(guide.id);
            return (
              <article className={`book ${selected ? "is-selected" : ""}`} data-reveal style={{ "--d": index % 4 }} key={guide.id}>
                <button type="button" className="book__cover" onClick={() => toggle(guide.id)} aria-pressed={selected} data-cursor={selected ? "Remover" : "Adicionar"}>
                  <img src={`/assets/guias/${guide.id}.webp`} alt={`Capa do ${guide.title}`} loading="lazy" />
                  <img className="book__peek" src={`/assets/guias/${guide.id}-p2.webp`} alt="" loading="lazy" />
                  <span className="book__pages">{guide.pages} págs</span>
                  <span className="book__check" aria-hidden="true">✓</span>
                </button>
                <h3>{guide.title}</h3>
                <p>{guide.subtitle}</p>
                <div className="book__foot">
                  <strong>{money(guidePrice)}</strong>
                  <button type="button" className="book__add" onClick={() => toggle(guide.id)} aria-label={selected ? `Remover ${guide.title} do carrinho` : `Adicionar ${guide.title} ao carrinho`}>
                    {selected ? "No carrinho ✓" : "Adicionar +"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className={`cart ${count ? "is-open" : ""}`} aria-live="polite">
        <div className="cart__info">
          <span className="cart__count">{count}</span>
          <div>
            <strong>
              {money(total)}
              {total < full && <s>{money(full)}</s>}
            </strong>
            <small>{cartHint}</small>
          </div>
        </div>
        <div className="cart__actions">
          <button type="button" className="cart__clear" onClick={() => setCart([])}>Limpar</button>
          <a className="btn btn--coral" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
            Comprar pelo WhatsApp <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

const bookingModes = ["Consultório", "Online", "Em casa"];
const bookingPeriods = ["Manhã", "Tarde", "Noite"];
const bookingGoals = ["Emagrecer", "Ganhar massa", "Saúde e exames", "Performance"];

function Booking() {
  const [name, setName] = useState("");
  const [mode, setMode] = useState(bookingModes[0]);
  const [period, setPeriod] = useState(bookingPeriods[0]);
  const [goal, setGoal] = useState(bookingGoals[0]);

  const submit = (event) => {
    event.preventDefault();
    const intro = name.trim() ? `Meu nome é ${name.trim()}. ` : "";
    const message = `${intro}Quero agendar uma consulta (${mode.toLowerCase()}), de preferência no período da ${period.toLowerCase()}. Meu objetivo: ${goal.toLowerCase()}.`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  const choice = (options, value, onChange, label) => (
    <fieldset className="booking__field">
      <legend>{label}</legend>
      <div className="booking__pills">
        {options.map((option) => (
          <label className={option === value ? "is-active" : ""} key={option}>
            <input type="radio" name={label} value={option} checked={option === value} onChange={() => onChange(option)} />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <section className="visit" id="contato">
      <div className="container">
        <div className="visit__head">
          <div>
            <SectionLabel>bora começar?</SectionLabel>
            <SplitTitle lines={["Sua melhor versão", "*começa hoje."]} />
          </div>
          <p data-reveal>Venha ao consultório em Maracanaú, receba o Anderson em casa ou faça tudo online. Escolha as opções ao lado e a mensagem chega pronta no WhatsApp.</p>
        </div>

        <div className="visit__grid">
          <div className="visit__place" data-reveal="left">
            <div className="visit__map">
              <iframe
                title="Mapa do consultório Nutrition's Life em Maracanaú"
                src={links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <ul className="visit__info">
              <li>
                <span className="visit__icon"><Icon name="pin" /></span>
                <div>
                  <strong>R. Evandisa Santos, 17F</strong>
                  <small>Pajuçara · Maracanaú – CE · dentro da Luana Bezerra Estética</small>
                </div>
                <a className="visit__route" href={links.mapDirections} target="_blank" rel="noopener noreferrer">Como chegar <Arrow /></a>
              </li>
              <li>
                <span className="visit__icon"><Icon name="screen" /></span>
                <div>
                  <strong>Consultoria online</strong>
                  <small>Para todo o Brasil, com acompanhamento pelo app Nutrium</small>
                </div>
              </li>
              <li>
                <span className="visit__icon"><Icon name="home" /></span>
                <div>
                  <strong>Personal Diet</strong>
                  <small>Avaliação e consulta no conforto da sua casa</small>
                </div>
              </li>
            </ul>
          </div>

          <form className="booking__form visit__form" onSubmit={submit} data-reveal="right">
            <p className="visit__form-title">Monte sua mensagem</p>
            <div className="booking__grid">
              <label className="booking__name">
                <span>Seu nome</span>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Como podemos te chamar?" autoComplete="given-name" />
              </label>
              {choice(bookingGoals, goal, setGoal, "Objetivo")}
              {choice(bookingModes, mode, setMode, "Formato")}
              {choice(bookingPeriods, period, setPeriod, "Melhor período")}
            </div>
            <button type="submit" className="btn btn--coral booking__submit">
              <WhatsappIcon /> Enviar pelo WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <Brand />
        <nav className="footer__nav" aria-label="Links do rodapé">
          {navLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="footer__social">
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={doctoralia} target="_blank" rel="noopener noreferrer">Doctoralia</a>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <small>© 2026 Anderson Oliveira · Nutricionista · CRN 14913 · R. Evandisa Santos, 17F – Pajuçara, Maracanaú – CE</small>
        <a href="#inicio">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}

function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      className={`floating-wa ${visible ? "is-visible" : ""}`}
      href={whatsappLink("Gostaria de mais informações sobre as consultas.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale no WhatsApp"
    >
      <WhatsappIcon />
    </a>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  useRevealAll();
  useParallaxAll();
  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollProgress />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Stats />
        <Results />
        <Method />
        <Specialties />
        <Process />
        <Evaluations />
        <MenuDay />
        <Quiz />
        <Plans />
        <Store />
        <Reviews />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
