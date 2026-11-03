import { useEffect, useRef, useState } from "react";
import { Arrow, Brand, Icon, RotatingBadge, SectionLabel, WhatsappIcon } from "./components/ui";
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
import { Cursor, LoaderCount, VelocityMarquee, setScrollLocked, useSmoothScroll } from "./components/effects";
import {
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

function Loader({ done }) {
  return (
    <div className={`loader ${done ? "loader--done" : ""}`} aria-hidden="true">
      <div className="loader__inner">
        <img src="/assets/ícone branco.jpg" alt="" />
        <p className="loader__word">
          {"nutrition's life".split("").map((letter, index) => (
            <span key={index} style={{ "--i": index }}>{letter === " " ? " " : letter}</span>
          ))}
        </p>
        <span className="loader__bar" />
      </div>
      <LoaderCount />
      <span className="loader__tag">Nutrição · Estratégia · Resultado</span>
    </div>
  );
}

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
  const ref = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, window.scrollY / window.innerHeight);
      ref.current?.style.setProperty("--hs", progress.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={`hero ${ready ? "is-ready" : ""}`} id="inicio" ref={ref}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__kicker"><span className="pulse-dot" /> Nutricionista · CRN 14913</p>
          <h1 className="hero__title">
            <span className="hero__line"><span>Alimente a sua</span></span>
            <span className="hero__line"><span><em>melhor versão.</em></span></span>
          </h1>
          <p className="hero__lead">
            Acompanhamento próximo e estratégico para transformar sua rotina, sua saúde e seu corpo — com ciência e sem restrições severas.
          </p>
          <div className="hero__actions">
            <Magnetic>
              <a className="btn btn--coral" href={whatsappLink("Gostaria de agendar uma consulta.")} target="_blank" rel="noopener noreferrer">
                Agendar consulta <Arrow />
              </a>
            </Magnetic>
            <a className="btn btn--line" href="#quiz">Descubra seu plano</a>
          </div>
          <a className="hero__proof" href="#resultados">
            <span className="hero__avatars">
              {results.map((result) => <img src={result.after} alt="" key={result.after} />)}
            </span>
            <span>
              <span className="hero__stars">★★★★★ <strong>5,0</strong></span>
              <small>21 avaliações · ver antes e depois</small>
            </span>
          </a>
        </div>

        <div className="hero__visual">
          <span className="hero__disc" aria-hidden="true" />
          <img className="hero__photo" src="/assets/anderson-cutout-2.png" alt="Anderson Oliveira, nutricionista da Nutrition's Life" fetchPriority="high" />
          <span className="plate hero__plate" aria-hidden="true">
            <img src={specialties[2].image} alt="" />
          </span>
          <div className="hero__chip">
            <Icon name="leaf" />
            <span><strong>100% individualizado</strong><small>Sem dieta da moda</small></span>
          </div>
        </div>
      </div>

      <ul className="services container" aria-label="Formas de atendimento">
        {[["pin", "Consultório em Maracanaú"], ["chat", "Consultoria online"], ["plate", "Personal Diet em casa"], ["book", "Guias digitais"]].map(([icon, label]) => (
          <li key={label}><span className="services__icon"><Icon name={icon} /></span>{label}</li>
        ))}
      </ul>
    </section>
  );
}

function Marquee() {
  const words = ["Nutrição clínica", "Emagrecimento", "Hipertrofia", "Nutrição funcional", "Fitoterapia", "Suplementação"];
  const items = words.map((word) => <span key={word}>{word}<b>✦</b></span>);
  return (
    <div className="marquee" aria-label="Áreas de atuação">
      <VelocityMarquee className="marquee__row marquee__row--coral">{items}</VelocityMarquee>
      <VelocityMarquee className="marquee__row marquee__row--forest" direction={-1}>{items}</VelocityMarquee>
    </div>
  );
}

function About() {
  const statementRef = useRef(null);
  useScrollProgress(statementRef, { start: 0.85, end: 0.35 });
  const statement = "Eu também já passei pelo processo de mudar hábitos e transformar meu corpo. Sei que não é simples começar — por isso construo estratégias possíveis, com acolhimento, ciência e constância.";
  const words = statement.split(" ");

  return (
    <section className="about" id="sobre">
      <div className="container about__grid">
        <div className="about__media" data-reveal="clip">
          <div className="about__frame">
            <img data-speed="-0.06" src="/assets/anderson-transformacao.png" alt="Antes e depois da transformação pessoal de Anderson Oliveira" loading="lazy" />
          </div>
        </div>

        <div className="about__copy">
          <SectionLabel number="01">Sobre o Anderson</SectionLabel>
          <SplitTitle lines={["Você não precisa", "de mais uma dieta.", "*Precisa de estratégia."]} />
          <p className="about__intro" data-reveal>
            Sou <strong>Anderson Oliveira</strong>, nutricionista especializado em Nutrição Clínica, Funcional, Esportiva, Fitoterapia e Suplementação, com consultório em Maracanaú e atendimento online para todo o Brasil.
          </p>
          <p className="about__statement" ref={statementRef} style={{ "--n": words.length }}>
            {words.map((word, index) => <span key={index} style={{ "--i": index }}>{word} </span>)}
          </p>
          <ul className="about__chips" data-reveal>
            <li><Icon name="star" /> CRN-11</li>
            <li><Icon name="pin" /> Maracanaú · CE</li>
            <li><Icon name="chat" /> Online · todo o Brasil</li>
          </ul>
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
          <SectionLabel number="03">Por que funciona</SectionLabel>
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
            <span className="method__badge">✦ Recomendado</span>
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
            <SectionLabel number="04">Especialidades</SectionLabel>
            <SplitTitle lines={["Seu caminho", "para uma", "*saúde de verdade."]} />
            <p data-reveal>Cada objetivo pede uma estratégia diferente. Escolha por onde quer começar.</p>
            <div className="spec__hint" data-reveal>
              <span className="spec__bar"><span /></span>
              Role para explorar →
            </div>
          </div>
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
  const [active, setActive] = useState(-1);
  useScrollProgress(ref, {
    start: 0.65,
    end: 0.35,
    onProgress: (p) => setActive(p <= 0.02 ? -1 : Math.min(steps.length - 1, Math.floor(p * steps.length))),
  });

  return (
    <section className="process" id="processo">
      <div className="container">
        <div className="process__grid">
          <div className="process__aside">
            <SectionLabel number="05">Como funciona</SectionLabel>
            <SplitTitle lines={["Um plano que", "*acompanha você."]} />
            <p data-reveal>Clareza para começar, estratégia para avançar e acompanhamento para não caminhar sozinho.</p>
            <div className="process__big" aria-hidden="true">
              <span key={active}>0{Math.max(active, 0) + 1}</span>
            </div>
          </div>
          <ol className="process__steps" ref={ref}>
            <span className="process__line" aria-hidden="true"><span /></span>
            {steps.map((step, index) => (
              <li className={`process__step ${index <= active ? "is-active" : ""}`} key={step.title}>
                <span className="process__dot">0{index + 1}</span>
                <span className="process__tag">{step.tag}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ul>
                  {step.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="includes">
          <h3 className="includes__title" data-reveal>Tudo isso <em>incluso</em> no seu plano</h3>
          <div className="includes__grid">
            {includes.map(([icon, title, text], index) => (
              <article className="include-card" data-reveal style={{ "--d": index }} key={title} {...tilt(10)}>
                <span className="include-card__icon"><Icon name={icon} /></span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
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
          <SectionLabel number="06">Exemplo de cardápio</SectionLabel>
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

  return (
    <article className={`plan ${plan.featured ? "plan--featured" : ""}`} data-reveal style={{ "--d": index }} {...tilt(4)}>
      {plan.featured && <span className="plan__badge">Mais escolhido</span>}
      <span className="plan__label">{plan.label}</span>
      <h3>{plan.title}</h3>
      <p className="plan__detail">{plan.detail}</p>

      <label className="plan__select">
        <span>Escolha o formato</span>
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
          <SectionLabel number="08">Planos e valores</SectionLabel>
          <SplitTitle lines={["Seu cuidado,", "*do seu jeito."]} />
          <p data-reveal>Escolha o formato e o pacote — o valor por consulta e a economia aparecem na hora.</p>
        </div>
        <div className="plans__grid">
          {plans.map((plan, index) => <PlanCard plan={plan} index={index} key={plan.title} />)}
        </div>
        <ul className="plans__notes" data-reveal>
          {planNotes.map((note) => <li key={note}>✦ {note}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const done = step >= quiz.length;

  const choose = (option) => {
    setAnswers([...answers.slice(0, step), option]);
    setStep(step + 1);
  };
  const restart = () => {
    setAnswers([]);
    setStep(0);
  };

  let result = null;
  if (done) {
    const [goal, format, length] = answers;
    const plan = plans[format.plan];
    const [label, price] = plan.packages[length.package];
    const count = consultCount(label);
    result = { goal, plan, label, price, count, perConsult: Math.round(toNumber(price) / count), specialty: specialties[goal.specialty] };
  }

  return (
    <section className="quiz" id="quiz">
      <div className="container">
        <div className="quiz__box" data-reveal="scale">
          <div className="quiz__aside">
            <SectionLabel number="07">Descubra seu plano</SectionLabel>
            <h2>Seu plano ideal em <em>30 segundos.</em></h2>
            <p>Responda 3 perguntas rápidas e receba uma recomendação feita para o seu momento.</p>
            <ol className="quiz__steps" aria-hidden="true">
              {quiz.map((item, index) => (
                <li className={index < step ? "is-done" : index === step ? "is-current" : ""} key={item.key}>
                  <span>{index < step ? "✓" : index + 1}</span>
                </li>
              ))}
            </ol>
            <div className="quiz__progress" aria-hidden="true">
              <span style={{ "--q": Math.min(step, quiz.length) / quiz.length }} />
            </div>
          </div>

          <div className="quiz__stage" aria-live="polite">
            {!done ? (
              <div className="quiz__question" key={step}>
                <span className="quiz__count">Pergunta {step + 1} de {quiz.length}</span>
                <h3>{quiz[step].question}</h3>
                <div className="quiz__options">
                  {quiz[step].options.map((option, index) => (
                    <button
                      type="button"
                      className={answers[step] === option ? "is-selected" : ""}
                      style={{ "--d": index }}
                      onClick={() => choose(option)}
                      key={option.label}
                    >
                      <span className="quiz__letter">{"ABCD"[index]}</span>
                      <span className="quiz__text"><strong>{option.label}</strong><small>{option.hint}</small></span>
                      <Arrow />
                    </button>
                  ))}
                </div>
                {step > 0 && <button type="button" className="quiz__link" onClick={() => setStep(step - 1)}>← Voltar</button>}
              </div>
            ) : (
              <div className="quiz__result" key="result">
                <div className="quiz__burst" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, index) => <i key={index} style={{ "--a": `${index * 30}deg` }} />)}
                </div>
                <span className="quiz__count">✦ Sua recomendação</span>
                <h3>{result.plan.title} <em>· {result.label}</em></h3>
                <p>Foco em <strong>{result.specialty.title.toLowerCase()}</strong>, com plano individualizado e acompanhamento direto pelo WhatsApp.</p>
                <div className="quiz__price">
                  <strong>{result.price}</strong>
                  <span>{result.count > 1 ? `${money(result.perConsult)} por consulta` : "à vista / PIX"} · {result.plan.detail}</span>
                </div>
                <div className="quiz__actions">
                  <a
                    className="btn btn--coral"
                    href={whatsappLink(`Fiz o quiz do site! Objetivo: ${result.goal.label.toLowerCase()}. Plano: ${result.plan.title} – ${result.label} (${result.price}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero esse plano <Arrow />
                  </a>
                  <button type="button" className="quiz__link" onClick={restart}>Refazer ↺</button>
                </div>
              </div>
            )}
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
          <SectionLabel number="10">Opiniões reais</SectionLabel>
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
          <SectionLabel number="11">Perguntas frequentes</SectionLabel>
          <SplitTitle lines={["Tire suas", "*dúvidas."]} />
          <p data-reveal>Não encontrou o que procura? Mande uma mensagem — a resposta vem direto do Anderson.</p>
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
  const [active, setActive] = useState(0);
  const result = results[active];

  return (
    <section className="results" id="resultados">
      <div className="container">
        <div className="results__head">
          <div>
            <SectionLabel number="02">Resultados reais</SectionLabel>
            <SplitTitle lines={["Transformações que", "*falam por si."]} />
          </div>
          <p data-reveal>Arraste a linha para comparar. Cada resultado veio de um plano individualizado, construído para a rotina de cada paciente.</p>
        </div>

        <div className="results__grid">
          <div className="results__viewer" data-reveal="clip">
            <BeforeAfter result={result} key={result.name} />
          </div>

          <div className="results__side">
            <ul className="results__list" role="tablist" aria-label="Pacientes">
              {results.map((item, index) => (
                <li key={item.name}>
                  <button type="button" role="tab" aria-selected={index === active} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}>
                    <span className="results__thumbs">
                      <img src={item.before} alt="" />
                      <img src={item.after} alt="" />
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.goal}</small>
                    </span>
                    <Arrow />
                  </button>
                </li>
              ))}
            </ul>
            <p className="results__text" key={result.name}>{result.text}</p>

            <figure className="results__stage" data-reveal>
              <img src="/assets/resultados/paciente-palco.webp" alt="Pacientes em competição de fisiculturismo da CBFFW" loading="lazy" />
              <figcaption>
                <span>✦ Do consultório ao palco</span>
                <strong>Preparação nutricional para competições de fisiculturismo.</strong>
              </figcaption>
            </figure>
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
  const toggle = (id) => setCart((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const selectAll = () => setCart(guides.map((guide) => guide.id));

  const count = cart.length;
  const full = count * guidePrice;
  const total = guidesTotal(count);
  // Se um combo maior custa o mesmo ou menos, o carrinho sugere completar.
  const upsell = guideCombos.find((combo) => combo.size > count && combo.price <= total + guidePrice);
  const nextCombo = guideCombos.find((combo) => combo.size > count);
  let cartHint = `Leve ${nextCombo?.size} guias por ${money(nextCombo?.price ?? 0)}`;
  if (count === guides.length) cartHint = "Coleção completa com o melhor preço";
  else if (upsell) cartHint = `Adicione mais ${upsell.size - count} e leve ${upsell.size === guides.length ? "a coleção completa" : `${upsell.size} guias`} por ${money(upsell.price)}`;
  else if (total < full) cartHint = `Combo aplicado: economia de ${money(full - total)}`;
  const chosen = guides.filter((guide) => cart.includes(guide.id));
  const message = `Quero comprar ${count === guides.length ? "a coleção completa de guias" : `${count} guia${count > 1 ? "s" : ""}`}: ${chosen.map((guide) => guide.title).join(", ")}. Total: ${money(total)}.`;

  return (
    <section className="store" id="guias">
      <div className="container">
        <div className="sec-head sec-head--center">
          <SectionLabel number="09">Guias digitais</SectionLabel>
          <SplitTitle lines={["Conhecimento para", "*levar para casa."]} />
          <p data-reveal>Guias práticos em PDF criados pelo Anderson. Cada um sai por {money(guidePrice)} — e em combo fica ainda mais em conta.</p>
        </div>

        <div className="combos" data-reveal>
          {guideCombos.map((combo) => (
            <div className={`combo ${combo.size === guides.length ? "combo--hot" : ""}`} key={combo.size}>
              <span className="combo__label">{combo.label}</span>
              <strong>{money(combo.price)}</strong>
              <small>de {money(combo.size * guidePrice)} · economia de {money(combo.size * guidePrice - combo.price)}</small>
              {combo.size === guides.length && (
                <button type="button" onClick={selectAll}>Quero todos <Arrow /></button>
              )}
            </div>
          ))}
        </div>

        <div className="store__grid">
          {guides.map((guide, index) => {
            const selected = cart.includes(guide.id);
            return (
              <article className={`guide ${selected ? "is-selected" : ""}`} data-reveal style={{ "--d": index % 4 }} key={guide.id}>
                <button type="button" className="guide__cover" onClick={() => toggle(guide.id)} aria-pressed={selected} data-cursor={selected ? "Remover" : "Adicionar"}>
                  <img src={`/assets/guias/${guide.id}.webp`} alt={`Capa do ${guide.title}`} loading="lazy" />
                  <img className="guide__peek" src={`/assets/guias/${guide.id}-p2.webp`} alt="" loading="lazy" />
                  <span className="guide__check" aria-hidden="true">✓</span>
                </button>
                <div className="guide__body">
                  <span className="guide__meta">{guide.pages} páginas · PDF</span>
                  <h3>{guide.title}</h3>
                  <p>{guide.subtitle}</p>
                  <div className="guide__foot">
                    <strong>{money(guidePrice)}</strong>
                    <button
                      type="button"
                      className="round-add"
                      onClick={() => toggle(guide.id)}
                      aria-label={selected ? `Remover ${guide.title} do carrinho` : `Adicionar ${guide.title} ao carrinho`}
                    >
                      {selected ? "✓" : "+"}
                    </button>
                  </div>
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
    <section className="booking" id="contato">
      <div className="container">
        <div className="booking__card" data-reveal="scale">
          <div className="booking__media">
            <img data-speed="-0.05" src="/assets/image.png" alt="Anderson Oliveira atendendo um paciente no consultório" loading="lazy" />
            <ul className="booking__info">
              <li><Icon name="pin" /><span><small>Consultório</small>Rua São Francisco, 441 · Maracanaú</span></li>
              <li><Icon name="chat" /><span><small>Online</small>Atendimento para todo o Brasil</span></li>
            </ul>
          </div>
          <form className="booking__form" onSubmit={submit}>
            <SectionLabel number="12">Agende sua consulta</SectionLabel>
            <SplitTitle lines={["Sua melhor versão", "*começa hoje."]} />
            <p className="booking__lead">Escolha as opções e a mensagem chega pronta no WhatsApp do Anderson.</p>
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
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Brand />
            <p>Nutrição clínica, esportiva e funcional em Maracanaú (CE) e online para todo o Brasil.</p>
          </div>
          <nav aria-label="Links do rodapé">
            <h3>Navegação</h3>
            {navLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
          </nav>
          <address>
            <h3>Atendimento</h3>
            <span>Presencial: Rua São Francisco, 441 · Maracanaú · CE</span>
            <span>Online: todo o Brasil</span>
            <span>Em casa: Personal Diet</span>
          </address>
          <div>
            <h3>Redes</h3>
            <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href={doctoralia} target="_blank" rel="noopener noreferrer">Doctoralia ↗</a>
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          </div>
        </div>
        <p className="footer__giant" aria-hidden="true">nutrition&apos;s life</p>
        <div className="footer__bottom">
          <small>© 2026 Anderson Oliveira · Nutricionista · CRN-11</small>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
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
    const timer = setTimeout(() => setReady(true), prefersReducedMotion() ? 0 : 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader done={ready} />
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
      <Cursor />
    </>
  );
}
