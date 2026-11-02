import { useEffect, useState } from "react";
import { Arrow, Brand, SectionLabel } from "./components/ui";
import {
  AnimatedStat,
  MethodComparison,
  SpecialtyCardInteractive,
  ProcessTimeline,
  PatientSupportKit,
  ReviewsCarousel,
  PlanFilter,
  BenefitsBentoGrid,
  FaqSupportCard
} from "./components/InteractiveSections";
import { faq, links, plans } from "./data/content";
import { useReveal } from "./hooks/useReveal";

const { whatsapp, doctoralia, instagram } = links;

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linksList = [
    ["Sobre", "#sobre"], 
    ["Especialidades", "#especialidades"], 
    ["Como Funciona", "#processo"],
    ["Planos", "#planos"], 
    ["Avaliações", "#avaliacoes"],
    ["Dúvidas", "#duvidas"]
  ];

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__brand-wrap">
        <Brand />
        <span className="header-location-tag">Maracanaú — CE</span>
      </div>
      
      <button 
        className="menu-button" 
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open} 
        aria-controls="main-nav" 
        onClick={() => setOpen(!open)}
      >
        menu <b>{open ? "×" : "+"}</b>
      </button>
      
      <nav id="main-nav" className={`nav ${open ? "nav--open" : ""}`} aria-label="Navegação principal">
        {linksList.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav-cta" href="#contato" onClick={() => setOpen(false)}>
          Agendar consulta <Arrow />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero ${entered ? "hero--entered" : ""}`} id="inicio">
      <div className="hero__copy">
        <div className="hero-kicker-pill hero-entrance hero-entrance--kicker">
          <span className="pill-dot"></span>
          <span>Clínica & Consultoria Nutricional · Maracanaú & Online</span>
        </div>

        <h1 className="hero__title">
          <span className="hero-word hero-word--1">Alimente</span>{" "}
          <span className="hero-word hero-word--2">a</span>{" "}
          <span className="hero-word hero-word--3">sua</span>
          <br />
          <em>
            <span className="hero-word hero-word--4">melhor</span>{" "}
            <span className="hero-word hero-word--5">versão.</span>
          </em>
        </h1>
        
        <p className="hero__description hero-entrance hero-entrance--desc">
          Um acompanhamento próximo e estratégico para transformar sua rotina, sua saúde e sua composição corporal com base em evidências científicas — sem restrições severas.
        </p>
        
        <div className="hero__actions hero-entrance hero-entrance--actions">
          <a className="button button--coral button--glow" href="#contato">
            Agendar consulta <Arrow />
          </a>
          <a className="under-link" href="#sobre">
            Conheça o método <span className="arrow-down">↓</span>
          </a>
        </div>
        
        <div className="hero__meta hero-entrance hero-entrance--meta">
          <div>
            <strong>Anderson Oliveira</strong>
            <span>Nutricionista Especializado · CRN-11</span>
          </div>
          <div className="hero-social-proof">
            <span className="hero-social-proof__stars">★★★★★</span>
            <small>5.0 no Doctoralia (21 avaliações)</small>
          </div>
        </div>
      </div>
      
      <div className="hero__visual">
        <div className="hero__ambient-glow"></div>

        {/* Moldura em Cápsula Editorial */}
        <div className="hero-capsule-frame">
          <div className="hero-photo-wrap">
            <img 
              src="/assets/anderson-cutout-2.png?v=6" 
              alt="Anderson Oliveira, nutricionista da Nutrition's Life" 
              fetchPriority="high" 
            />
          </div>
        </div>
        
        {/* Badges Flutuantes de Luxo */}
        <div className="hero-glass-pill hero-glass-pill--top floating-element">
          <span className="pill-dot" />
          <strong>Presencial & Online</strong>
        </div>

        <div className="hero-glass-pill hero-glass-pill--bottom floating-element floating-element--delayed">
          <div className="hero-glass-pill__icon">✦</div>
          <div>
            <strong>100% Individualizado</strong>
            <small>Sem dietas restritivas · Metas reais</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() { 
  return (
    <div className="ticker" aria-label="Áreas de atuação">
      <div className="ticker__track">
        <span>nutrição clínica <b>✦</b> nutrição esportiva <b>✦</b> nutrição funcional <b>✦</b> fitoterapia <b>✦</b> suplementação clínica <b>✦</b></span>
        <span>nutrição clínica <b>✦</b> nutrição esportiva <b>✦</b> nutrição funcional <b>✦</b> fitoterapia <b>✦</b> suplementação clínica <b>✦</b></span>
      </div>
    </div>
  ); 
}

function About() {
  return (
    <section className="section about" id="sobre">
      <SectionLabel number="01">Sobre o profissional</SectionLabel>
      <div className="about__grid">
        <div className="about__portrait-editorial">
          <img 
            src="/assets/anderson-hero-1.jpg" 
            alt="Anderson Oliveira, nutricionista especializado" 
            loading="lazy" 
          />
          <div className="about__portrait-footer">
            <strong>Anderson Oliveira</strong>
            <span>Nutrição Clínica · Esportiva · Fitoterapia & Suplementação</span>
          </div>
        </div>
        
        <div className="about__copy">
          <p className="eyebrow"><i />Uma abordagem diferente</p>
          <h2>Você não precisa de mais uma dieta. Precisa de uma <em>estratégia.</em></h2>
          <p className="about__copy-text">
            Sou Anderson Oliveira, nutricionista especializado em Nutrição Clínica, Funcional, Esportiva, Fitoterapia e Suplementação Clínica e Esportiva, com consultório em Maracanaú e atendimento online para todo o Brasil.
          </p>
          <p className="about__copy-text">
            Cada consulta combina escuta ativa, tecnologia e ciência na prática para construir um plano que respeita seus horários, preferências alimentares e o objetivo que você quer conquistar.
          </p>
          <a className="under-link" href="#contato">Fale diretamente comigo <Arrow /></a>
          
          <div className="about__pillars">
            <div className="pillar-item">
              <span className="pillar-item__num">01</span>
              <strong>Escuta Individual</strong>
              <p>Sua rotina e preferências como ponto de partida.</p>
            </div>
            <div className="pillar-item">
              <span className="pillar-item__num">02</span>
              <strong>Ciência na Prática</strong>
              <p>Estratégias comprovadas sem modismos e sem culpa.</p>
            </div>
            <div className="pillar-item">
              <span className="pillar-item__num">03</span>
              <strong>Acompanhamento</strong>
              <p>Suporte contínuo no WhatsApp durante sua jornada.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparativo Interativo de Alto Valor */}
      <MethodComparison />

      {/* Estatísticas Dinâmicas com Contadores Animados */}
      <div className="stats">
        <AnimatedStat targetValue={5} suffix="" label={<>áreas de<br />especialidade</>} />
        <AnimatedStat targetValue={100} suffix="%" label={<>plano<br />individualizado</>} />
        <AnimatedStat targetValue={360} suffix="°" label={<>olhar para<br />sua rotina</>} />
      </div>
    </section>
  );
}

function Specialties() {
  const specialtiesData = [
    {
      number: "01",
      line1: "nutrição",
      line2: "clínica",
      description: "Reeducação alimentar duradoura, emagrecimento consciente e cuidado preventivo integral.",
      label: "Saúde & Longevidade",
      tags: ["Emagrecimento", "Exames Laboratoriais", "Saúde Intestinal", "Doenças Crônicas"],
      details: [
        "Análise clínica minuciosa do seu histórico, rotina e exames de sangue",
        "Ajuste calórico inteligente sem cortes drásticos ou alimentos proibidos",
        "Cardápio com alimentos práticos que você encontra no mercado do seu bairro"
      ]
    },
    {
      number: "02",
      line1: "nutrição",
      line2: "esportiva",
      description: "Mais desempenho, energia para o treino diário e melhora acentuada da composição corporal.",
      label: "Performance & Força",
      tags: ["Hipertrofia", "Composição Corporal", "Pré e Pós-Treino", "Atletas & Amadores"],
      details: [
        "Estratégia personalizada de macronutrientes para a intensidade dos seus treinos",
        "Periodização nutricional de acordo com suas metas de ganho muscular e corte de gordura",
        "Suplementação esportiva com comprovação científica rigorosa (creatina, whey, eletrólitos)"
      ]
    },
    {
      number: "03",
      line1: "funcional,",
      line2: "fitoterapia & suplementos",
      description: "Estratégias individualizadas baseadas nas mais recentes evidências científicas.",
      label: "Equilíbrio & Vitalidade",
      tags: ["Fitoterápicos", "Equilíbrio Metabólico", "Sono & Imunidade", "Modulação"],
      details: [
        "Prescrição precisa de fitoterápicos e compostos bioativos certificados",
        "Otimização da absorção de micronutrientes, digestão e flora intestinal",
        "Regulação de energia diária, foco mental e qualidade profunda do sono"
      ]
    }
  ];

  return (
    <section className="dark-section" id="especialidades">
      <div className="grain-overlay" aria-hidden="true"></div>
      <div className="section">
        <SectionLabel number="02" light>Onde posso te ajudar</SectionLabel>
        <div className="section-heading">
          <div>
            <p className="specialties-intro">O cuidado começa entendendo que cada corpo tem uma história.</p>
            <h2>Seu objetivo.<br /><em>Meu método.</em></h2>
          </div>
          <div className="specialties-lead">
            <span>03</span>
            <p>frentes de atuação para construir uma estratégia que faça sentido para a sua rotina.</p>
          </div>
        </div>
        
        <div className="specialties-grid">
          {specialtiesData.map((item) => (
            <SpecialtyCardInteractive key={item.number} {...item} />
          ))}
        </div>

        <div className="specialties-bottom">
          <span>✦</span>
          <p>Uma abordagem sem fórmulas prontas, com ciência, escuta e acompanhamento próximo.</p>
          <a href="#contato">Encontrar meu caminho <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    [
      "01",
      "Avaliação",
      "Anamnese aprofundada, recordatório diário e semanal, bioimpedância completa e definição clara das suas metas.",
      "Diagnóstico",
      ["Análise de exames laboratoriais recentes", "Mapeamento completo de rotina e horários", "Avaliação física e composição corporal"]
    ],
    [
      "02",
      "Plano Estratégico",
      "Plano alimentar calculado e individualizado, com receitas práticas e recomendações de fitoterápicos e suplementação.",
      "Personalização",
      ["Cardápio calculado com base em seus objetivos", "Substituições fáceis para viagens e fins de semana", "Prescrição de manipulados e suplementos quando necessário"]
    ],
    [
      "03",
      "Acompanhamento",
      "Feedbacks semanais, ajustes de cardápio e suporte próximo direto pelo WhatsApp durante toda a vigência.",
      "Evolução",
      ["Canal direto no WhatsApp para dúvidas rápidas", "Ajustes de cardápio para novas fases de treino", "Comparativo mensal de evolução física e métricas"]
    ]
  ];

  return (
    <section className="section process" id="processo">
      <SectionLabel number="03">Como funciona</SectionLabel>
      <div className="section-heading process__heading">
        <div>
          <p className="eyebrow"><i />Do primeiro encontro à evolução</p>
          <h2>Um plano que<br /><em>acompanha você.</em></h2>
        </div>
        <p className="process__highlight">Você recebe clareza para começar, estratégia para avançar e acompanhamento para não caminhar sozinho.</p>
      </div>

      {/* Linha do Tempo Viva */}
      <ProcessTimeline steps={steps} />

      {/* Material de Apoio Tangível do Paciente */}
      <PatientSupportKit />
    </section>
  );
}

function PlanCard({ plan }) {
  const href = `${whatsapp}?text=${encodeURIComponent(`Olá, Anderson! ${plan.message}`)}`;
  return (
    <article className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`}>
      {plan.featured && <span className="plan-card__badge">Mais Escolhido</span>}
      <span className="plan-card__label">{plan.label}</span>
      <h3>{plan.title}</h3>
      <p className="plan-card__detail">{plan.detail}</p>
      
      <ul className="plan-card__features">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      
      <div className="price">
        <small>A partir de</small>
        <strong>{plan.price}</strong>
        <span>à vista / PIX</span>
      </div>
      
      <a className={`button ${plan.featured ? "button--dark" : "button--green"}`} href={href} target="_blank" rel="noopener noreferrer">
        Tenho interesse <Arrow />
      </a>
      
      <details className="plan-card__packages">
        <summary>Ver pacotes e valores <span className="plus-icon">+</span></summary>
        <div className="packages-list">
          {plan.packages.map(([label, price]) => (
            <div className="package-item" key={label}>
              <span className="package-name">{label}</span>
              <span className="package-price">{price}</span>
            </div>
          ))}
        </div>
      </details>
    </article>
  );
}

function Plans() {
  const [filter, setFilter] = useState("all");

  const filteredPlans = plans.filter((p) => {
    if (filter === "presencial") return p.label.toLowerCase().includes("presencial");
    if (filter === "online") return p.label.toLowerCase().includes("online");
    if (filter === "casa") return p.label.toLowerCase().includes("casa");
    return true;
  });

  return (
    <section className="plans" id="planos">
      <div className="section">
        <SectionLabel number="04">Planos Nutrition&apos;s Life</SectionLabel>
        <div className="section-heading plans__heading">
          <div>
            <p className="eyebrow"><i />Escolha o seu formato</p>
            <h2>Seu cuidado,<br /><em>do seu jeito.</em></h2>
          </div>
          <div className="plans__intro">
            <p>Escolha entre atendimento presencial, online ou no conforto da sua casa. Todos os formatos incluem estratégia individualizada e acompanhamento durante a vigência.</p>
            <a className="under-link" href="/assets/Planos%20Nutrition%27s%20Life.%202_20260807_223625_0000.pdf" target="_blank" rel="noopener noreferrer">
              Ver apresentação completa em PDF <Arrow />
            </a>
          </div>
        </div>

        {/* Filtro Interativo por Formato */}
        <PlanFilter activeFilter={filter} onFilterChange={setFilter} />

        <div className="plans-grid">
          {filteredPlans.map((plan) => (
            <PlanCard plan={plan} key={plan.title} />
          ))}
        </div>

        {/* Bento Grid Moderno de Vantagens #TeamNL */}
        <BenefitsBentoGrid />
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="dark-section reviews" id="avaliacoes">
      <div className="section">
        <SectionLabel number="05" light>Opiniões verificadas</SectionLabel>
        <div className="reviews__grid">
          <div>
            <p className="reviews__eyebrow">O que dizem os pacientes</p>
            <p className="quote-mark">“</p>
            <h2>21 pacientes<br />deram <em>5 estrelas.</em></h2>
            <p className="reviews__desc">Experiências reais de quem já começou a cuidar da saúde e da composição corporal com Anderson.</p>
            <div className="reviews__proof">
              <span>★★★★★</span>
              <strong>5.0</strong>
              <small>avaliação máxima<br />na Doctoralia</small>
            </div>
            <a className="button button--coral button--glow mt-4" href={`${doctoralia}#profile-reviews`} target="_blank" rel="noopener noreferrer">
              Ler todas as opiniões na Doctoralia <Arrow />
            </a>
            <div className="reviews__photos" aria-label="Momentos do acompanhamento nutricional">
              <figure className="reviews__photo reviews__photo--main">
                <img src="/assets/anderson-hero-2.jpg" alt="Anderson Oliveira em atendimento nutricional" loading="lazy" />
                <figcaption>Ciência aplicada à sua rotina</figcaption>
              </figure>
              <figure className="reviews__photo reviews__photo--small">
                <img src="/assets/perfil 4.jpg" alt="Detalhe do atendimento da Nutrition's Life" loading="lazy" />
              </figure>
            </div>
          </div>

          {/* Carrossel Interativo com Opiniões Reais */}
          <ReviewsCarousel />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="section faq" id="duvidas">
      <SectionLabel number="06">Perguntas frequentes</SectionLabel>
      <div className="faq__grid">
        <div className="faq__intro">
          <span className="faq__count">05 respostas para começar com clareza</span>
          <h2>Antes de começar,<br /><em>tire suas dúvidas.</em></h2>
          <p>Informação clara para você escolher seu formato de atendimento com segurança.</p>

          {/* Card Humanizado com foto do Anderson */}
          <FaqSupportCard whatsappUrl={whatsapp} />
        </div>
        
        <div className="faq__list">
          {faq.map(([question, answer], idx) => (
            <details key={question} className="faq-item">
              <summary>
                <span className="faq-item__idx">0{idx + 1}</span>
                <span className="faq-item__title">{question}</span>
                <span className="faq__toggle">+</span>
              </summary>
              <div className="faq__answer">
                <p>{answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const href = `${whatsapp}?text=${encodeURIComponent("Olá, Anderson! Quero agendar uma consulta.")}`;
  return (
    <section className="contact" id="contato">
      <div className="contact__inner">
        <div className="contact__content">
          <p className="eyebrow"><i />Seu próximo passo</p>
          <span className="contact__step">07 / 07</span>
          <h2>Seu próximo passo<br /><em>começa aqui.</em></h2>
          <p className="contact__text">Agende sua conversa e descubra qual formato faz sentido para o seu momento e objetivo de saúde.</p>
          
          <a className="button button--green button--glow" href={href} target="_blank" rel="noopener noreferrer">
            Falar agora pelo WhatsApp <Arrow />
          </a>
          
          <div className="contact__details">
            <div><span>Atendimento</span><strong>Presencial · Online · Em casa</strong></div>
            <div><span>Localização</span><strong>Rua São Francisco, 441 · Maracanaú</strong></div>
            <div><span>Resposta</span><strong>Direto com o Anderson</strong></div>
          </div>
          <p className="contact__note">Resposta ágil pelo WhatsApp · escolha seu formato e tire suas dúvidas antes de agendar.</p>
        </div>
        
        <div className="contact__visual">
          <img src="/assets/anderson-cutout.png" alt="Anderson Oliveira, nutricionista" loading="lazy" />
          <div className="contact__mark floating-element">
            <span>✦</span><strong>comece<br /><em>hoje</em></strong>
            <small>Nutrition&apos;s Life</small>
          </div>
          <span className="contact__visual-caption">Atendimento próximo, estratégia possível.</span>
        </div>
      </div>
    </section>
  );
}

function FloatingWhatsapp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const href = `${whatsapp}?text=${encodeURIComponent("Olá, Anderson! Gostaria de mais informações sobre as consultas.")}`;

  return (
    <div className="floating-wa-container">
      {showTooltip && (
        <div className="floating-wa-tooltip animate-fade-in">
          <span>Olá! Posso te ajudar a escolher o plano ideal? 👋</span>
          <button 
            type="button" 
            className="floating-wa-tooltip__close" 
            onClick={() => setShowTooltip(false)}
            aria-label="Fechar balão"
          >
            ×
          </button>
        </div>
      )}
      <a 
        href={href} 
        className="floating-wa" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Fale no WhatsApp"
      >
        <span className="floating-wa__pulse"></span>
        <svg viewBox="0 0 32 32" className="floating-wa__icon">
          <path fill="currentColor" d="M16 2a13 13 0 0 0-11.26 19.5L3 29l7.73-1.7A13 13 0 1 0 16 2zm0 24a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-4.58 1 1-4.47-.26-.42A10.91 10.91 0 1 1 16 26zm5.94-8.13c-.33-.16-1.92-.95-2.22-1.06s-.52-.16-.74.16-.85 1.06-1.05 1.28-.39.25-.72.08a9.14 9.14 0 0 1-2.69-1.66 10.1 10.1 0 0 1-1.86-2.32c-.2-.33 0-.5.15-.66s.33-.39.49-.58a2.25 2.25 0 0 0 .33-.55.61.61 0 0 0 0-.58c-.08-.16-.74-1.78-1-2.44s-.54-.56-.74-.57h-.63a1.22 1.22 0 0 0-.88.41A3.68 3.68 0 0 0 9.7 12a6.43 6.43 0 0 0 1.35 3.41 14.7 14.7 0 0 0 5.62 4.97c.78.34 1.39.54 1.86.69a4.48 4.48 0 0 0 2.06.13 3.36 3.36 0 0 0 2.21-1.56 2.73 2.73 0 0 0 .19-1.56c-.07-.12-.26-.2-.59-.36z"/>
        </svg>
      </a>
    </div>
  );
}

function Footer() { 
  return (
    <footer className="footer">
      <Brand dark />
      <p>Nutrição baseada em ciência, estratégia e individualidade.</p>
      <div className="footer-links">
        <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram <Arrow /></a>
        <a href={doctoralia} target="_blank" rel="noopener noreferrer">Doctoralia <Arrow /></a>
      </div>
      <small className="footer-copy">© 2026 Anderson Igor Nascimento Oliveira · Nutricionista em Maracanaú · CRN-11</small>
    </footer>
  ); 
}

export default function App() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Ticker />
        <About />
        <Specialties />
        <Process />
        <Plans />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}
