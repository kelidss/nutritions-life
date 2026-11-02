import { useState, useEffect, useRef } from "react";
import { Arrow } from "./ui";

/**
 * 1. AnimatedStat — Contador dinâmico com animação fluida
 */
export function AnimatedStat({ targetValue, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1400;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = targetValue / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
              setCount(targetValue);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue, hasAnimated]);

  return (
    <div className="stat-card stat-card--interactive" ref={elementRef}>
      <div className="stat-card__number-wrap">
        <strong>{count}{suffix}</strong>
        <span className="stat-card__dot" />
      </div>
      <span>{label}</span>
    </div>
  );
}

/**
 * 2. MethodComparison — Comparativo Interativo
 */
export function MethodComparison() {
  const [activeTab, setActiveTab] = useState("method");

  const traditionalPoints = [
    { title: "Restrição Severa", desc: "Cortes radicais de carboidratos e grupos inteiros, gerando ansiedade e compulsão." },
    { title: "Cardápios Genéricos", desc: "Planos impressos pré-fabricados que não respeitam seus gostos nem sua rotina." },
    { title: "Efeito Sanfona", desc: "Perda rápida de peso seguida da recuperação de tudo em poucas semanas." },
    { title: "Solidão no Processo", desc: "Você recebe o papel e só volta um mês depois, sem apoio nem suporte diário." },
  ];

  const methodPoints = [
    { title: "Comida da Vida Real", desc: "Estratégia calculada que inclui o que você gosta, sem terrorismos nutricionais." },
    { title: "100% Individualizado", desc: "Rotina, horários, exames laboratoriais e preferências pessoais como ponto de partida." },
    { title: "Resultados Duradouros", desc: "Reeducação e recomposição corporal que cabem na sua rotina para sempre." },
    { title: "Acompanhamento no WhatsApp", desc: "Suporte próximo, respostas de dúvidas e feedbacks durante toda a vigência." },
  ];

  return (
    <div className="comparison-box">
      <div className="comparison-box__header">
        <div>
          <span className="comparison-box__kicker">✦ Por que funciona</span>
          <h3 className="comparison-box__title">A diferença entre <em>fazer dieta</em> e ter uma <em>estratégia</em>.</h3>
        </div>

        <div className="comparison-toggle" role="tablist">
          <button
            type="button"
            className={`comparison-toggle__btn ${activeTab === "traditional" ? "comparison-toggle__btn--active" : ""}`}
            onClick={() => setActiveTab("traditional")}
            role="tab"
            aria-selected={activeTab === "traditional"}
          >
            Dieta Comum
          </button>
          <button
            type="button"
            className={`comparison-toggle__btn ${activeTab === "method" ? "comparison-toggle__btn--active" : ""}`}
            onClick={() => setActiveTab("method")}
            role="tab"
            aria-selected={activeTab === "method"}
          >
            <span>Método Nutrition&apos;s Life</span>
            <small>✦</small>
          </button>
        </div>
      </div>

      <div className="comparison-box__content">
        {activeTab === "traditional" ? (
          <div className="comparison-grid comparison-grid--traditional animate-fade-in">
            {traditionalPoints.map((pt, i) => (
              <div className="comparison-item comparison-item--bad" key={i}>
                <span className="comparison-item__badge">✕</span>
                <div>
                  <strong>{pt.title}</strong>
                  <p>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="comparison-grid comparison-grid--method animate-fade-in">
            {methodPoints.map((pt, i) => (
              <div className="comparison-item comparison-item--good" key={i}>
                <span className="comparison-item__badge">✓</span>
                <div>
                  <strong>{pt.title}</strong>
                  <p>{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 3. SpecialtyCardInteractive — Card expansivo de especialidade com tags e detalhes
 */
export function SpecialtyCardInteractive({ number, line1, line2, description, label, tags, details }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`specialty specialty--interactive ${expanded ? "specialty--expanded" : ""}`}>
      <div className="specialty__header">
        <span className="specialty__number">{number}</span>
        <span className="specialty__label">{label}</span>
      </div>

      <h3>{line1}<br />{line2}</h3>
      <p>{description}</p>

      <div className="specialty__tags">
        {tags.map((tag, i) => (
          <span className="specialty-tag" key={i}>{tag}</span>
        ))}
      </div>

      <button
        type="button"
        className="specialty__toggle-btn"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span>{expanded ? "Menos detalhes" : "O que inclui na consulta"}</span>
        <span className={`toggle-chevron ${expanded ? "toggle-chevron--open" : ""}`}>↓</span>
      </button>

      {expanded && (
        <div className="specialty__dropdown animate-dropdown">
          <ul className="specialty-details-list">
            {details.map((item, idx) => (
              <li key={idx}>
                <span className="bullet-point">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

/**
 * 4. ProcessTimeline — Linha do tempo interativa dos 3 passos
 */
export function ProcessTimeline({ steps }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="process-timeline">
      <div className="process-timeline__track">
        <div
          className="process-timeline__fill"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="process-timeline__steps">
        {steps.map(([number, title, desc, tag, bullets], idx) => {
          const isActive = idx === activeStep;
          return (
            <div
              key={number}
              className={`timeline-step ${isActive ? "timeline-step--active" : ""}`}
              onClick={() => setActiveStep(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setActiveStep(idx)}
            >
              <div className="timeline-step__header">
                <span className="timeline-step__badge">{number}</span>
                <span className="timeline-step__tag">{tag}</span>
              </div>
              <h3 className="timeline-step__title">{title}</h3>
              <p className="timeline-step__desc">{desc}</p>
              
              {bullets && (
                <ul className="timeline-step__bullets">
                  {bullets.map((b, i) => (
                    <li key={i}>✓ {b}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 5. PatientSupportKit — O que o paciente recebe (Material de Apoio tangível)
 */
export function PatientSupportKit() {
  const items = [
    {
      icon: "📱",
      title: "WhatsApp Direto",
      desc: "Canal exclusivo para dúvidas do dia a dia, substituições em restaurantes e apoio motivacional."
    },
    {
      icon: "📋",
      title: "Guia de Substituições",
      desc: "Tabela prática para trocar alimentos equivalentes mantendo exatamente os mesmos macronutrientes."
    },
    {
      icon: "🥗",
      title: "E-book de Receitas Fáceis",
      desc: "Opções práticas para almoço, lanches rápidos e pré-treino com ingredientes simples de mercado."
    },
    {
      icon: "📊",
      title: "Relatório de Bioimpedância",
      desc: "Acompanhamento visual gráfico da sua evolução de gordura, massa magra e hidratação celular."
    }
  ];

  return (
    <div className="support-kit">
      <div className="support-kit__heading">
        <span className="support-kit__kicker">✦ Cuidado Completo</span>
        <h4>O que está incluso no seu plano:</h4>
      </div>
      <div className="support-kit__grid">
        {items.map((item, idx) => (
          <div className="support-kit__card" key={idx}>
            <span className="support-kit__icon">{item.icon}</span>
            <strong>{item.title}</strong>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 6. ReviewsCarousel — Carrossel de opiniões reais verificadas da Doctoralia
 */
export function ReviewsCarousel() {
  const reviews = [
    {
      quote: "O melhor nutricionista que eu já conheci. Ele dá total suporte ao atleta do início ao fim, ajustando cada refeição com base no rendimento real dos treinos.",
      author: "Áquila Mendes",
      detail: "Opinião verificada · Doctoralia",
      stars: "★★★★★",
      tag: "Performance Esportiva",
      initials: "AM"
    },
    {
      quote: "Consulta acolhedora e extremamente detalhista. Pela primeira vez consegui seguir um plano alimentar sem sofrimento e já perdi 8kg de forma saudável e contínua.",
      author: "Juliana Frota",
      detail: "Opinião verificada · Doctoralia",
      stars: "★★★★★",
      tag: "Emagrecimento & Saúde",
      initials: "JF"
    },
    {
      quote: "A facilidade de tirar dúvidas no WhatsApp durante o mês faz toda a diferença. O Anderson é um profissional atencioso, técnico e muito capacitado.",
      author: "Marcos Vinícius",
      detail: "Opinião verificada · Doctoralia",
      stars: "★★★★★",
      tag: "Nutrição Clínica",
      initials: "MV"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex];

  return (
    <div className="reviews-carousel">
      <blockquote className="reviews-carousel__card animate-fade-in" key={currentIndex}>
        <div className="reviews-carousel__top">
          <div className="stars">{current.stars}</div>
          <span className="reviews-tag">{current.tag}</span>
        </div>
        <p className="reviews-carousel__quote">“{current.quote}”</p>
        <footer className="reviews-carousel__footer">
          <div className="reviews-avatar">{current.initials}</div>
          <div>
            <strong>{current.author}</strong>
            <small>{current.detail}</small>
          </div>
        </footer>
      </blockquote>

      <div className="reviews-carousel__controls">
        <div className="reviews-dots">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`reviews-dot ${idx === currentIndex ? "reviews-dot--active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para depoimento ${idx + 1}`}
            />
          ))}
        </div>
        <div className="reviews-nav-buttons">
          <button
            type="button"
            className="reviews-nav-btn"
            onClick={prevReview}
            aria-label="Depoimento anterior"
          >
            ←
          </button>
          <button
            type="button"
            className="reviews-nav-btn"
            onClick={nextReview}
            aria-label="Próximo depoimento"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 7. PlanFilter — Filtro interativo para planos de atendimento
 */
export function PlanFilter({ activeFilter, onFilterChange }) {
  const options = [
    { id: "all", label: "Todos os Formatos" },
    { id: "presencial", label: "Presencial (Consultório)" },
    { id: "online", label: "Consultoria Online" },
    { id: "casa", label: "Personal Diet (Em Casa)" },
  ];

  return (
    <div className="plans-filter-bar">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`plans-filter-pill ${activeFilter === opt.id ? "plans-filter-pill--active" : ""}`}
          onClick={() => onFilterChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/**
 * 8. BenefitsBentoGrid — Bento Grid moderno para as vantagens de ser #TeamNL
 */
export function BenefitsBentoGrid() {
  const benefits = [
    {
      badge: "01",
      title: "Material de Apoio Completo",
      desc: "Guia exclusivo de compras no mercado, e-book de receitas práticas e orientações passo a passo.",
      highlight: false
    },
    {
      badge: "02",
      title: "Pacotes Compartilháveis",
      desc: "Pacotes com 3 ou mais consultas podem ser compartilhados entre familiares ou amigos (1 consulta por pessoa).",
      highlight: true
    },
    {
      badge: "03",
      title: "10% de Desconto Exclusivo",
      desc: "Benefício direto em procedimentos estéticos selecionados, manipulados e lojas parceiras de suplementos.",
      highlight: false
    },
    {
      badge: "04",
      title: "Acompanhamento WhatsApp",
      desc: "Tire dúvidas sobre rótulos de alimentos, refeições fora de casa e mantenha sua constância sem travas.",
      highlight: false
    }
  ];

  return (
    <div className="benefits-bento">
      <div className="benefits-bento__header">
        <span className="benefits-bento__kicker">✦ Vantagens Exclusivas</span>
        <h3>Por que fazer parte do <em>#TeamNL</em></h3>
        <p>Mais cuidado, benefícios práticos e suporte em cada etapa da sua transformação.</p>
      </div>

      <div className="benefits-bento__grid">
        {benefits.map((b, i) => (
          <div className={`bento-card ${b.highlight ? "bento-card--highlight" : ""}`} key={i}>
            <div className="bento-card__badge">{b.badge}</div>
            <h4>{b.title}</h4>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 9. FaqSupportCard — Card humanizado de suporte no FAQ
 */
export function FaqSupportCard({ whatsappUrl }) {
  return (
    <div className="faq-support-card">
      <div className="faq-support-card__avatar">
        <img src="/assets/perfil 2.jpg" alt="Anderson Oliveira Nutricionista" />
        <span className="faq-support-card__online" />
      </div>
      <div>
        <strong>Ainda ficou com alguma dúvida?</strong>
        <p>Fale diretamente com Anderson no WhatsApp e receba orientações para seu caso.</p>
      </div>
      <a
        href={`${whatsappUrl}?text=${encodeURIComponent("Olá, Anderson! Tenho uma dúvida sobre as consultas.")}`}
        className="button button--coral button--glow"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tirar dúvida no WhatsApp <Arrow />
      </a>
    </div>
  );
}
