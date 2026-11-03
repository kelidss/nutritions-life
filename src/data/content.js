export const links = {
  whatsapp: "https://wa.me/558591131822",
  doctoralia: "https://www.doctoralia.com.br/anderson-igor-nascimento-oliveira/nutricionista/maracanau",
  instagram: "https://www.instagram.com/nutritions_lifee/",
  mapEmbed: "https://maps.google.com/maps?q=-3.8593816,-38.576287&z=16&output=embed",
  mapDirections: "https://www.google.com/maps/dir/?api=1&destination=-3.8593816,-38.576287",
};

export const whatsappLink = (message) => `${links.whatsapp}?text=${encodeURIComponent(`Olá, Anderson! ${message}`)}`;

const unsplash = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

export const stats = [
  { to: 5, label: "áreas de especialidade" },
  { to: 100, suffix: "%", label: "plano individualizado" },
  { to: 5, decimals: 1, label: "nota no Doctoralia" },
  { to: 3, label: "formatos de atendimento" },
];

export const methodCompare = {
  old: [
    ["Restrição severa", "Cortes radicais que geram ansiedade, fome e compulsão."],
    ["Cardápio genérico", "Papel pronto que ignora seus gostos e sua rotina."],
    ["Efeito sanfona", "Perde rápido, recupera tudo em poucas semanas."],
    ["Sozinho no processo", "Você só volta a falar com alguém um mês depois."],
  ],
  new: [
    ["Comida da vida real", "Estratégia calculada que inclui o que você gosta."],
    ["100% individualizado", "Rotina, exames e preferências como ponto de partida."],
    ["Resultado duradouro", "Recomposição corporal que cabe na sua vida para sempre."],
    ["WhatsApp direto", "Suporte, ajustes e feedbacks durante todo o plano."],
  ],
};

export const specialties = [
  { title: "Emagrecimento e recomposição corporal", image: unsplash("1490645935967-10de6ba17061"), tags: ["Sem efeito sanfona", "Bioimpedância"], text: "Perca gordura preservando massa magra, com plano calculado para a sua rotina e ajustes semanais.", message: "Quero emagrecer com acompanhamento nutricional." },
  { title: "Nutrição esportiva e hipertrofia", image: unsplash("1517836357463-d25dfeac3438"), tags: ["Performance", "Ganho de massa"], text: "Alimentação alinhada ao seu treino para ganhar massa muscular, força e rendimento.", message: "Quero um plano de nutrição esportiva." },
  { title: "Nutrição clínica e funcional", image: unsplash("1512621776951-a57141f2eefd"), tags: ["Exames", "Saúde intestinal"], text: "Cuidado com exames alterados, intestino, sono e energia, tratando a causa e não só o sintoma.", message: "Quero cuidar da minha saúde com nutrição clínica." },
  { title: "Fitoterapia e suplementação", image: unsplash("1505576399279-565b52d4ac71"), tags: ["Baseado em evidências", "Manipulados"], text: "Fitoterápicos e suplementos prescritos de forma individual, só quando fizer sentido para você.", message: "Tenho dúvidas sobre suplementação e fitoterapia." },
];

export const steps = [
  { title: "Avaliação", tag: "Diagnóstico", text: "Anamnese aprofundada, recordatório alimentar, bioimpedância completa e definição clara das suas metas.", bullets: ["Análise de exames laboratoriais", "Mapeamento da rotina e horários", "Composição corporal detalhada"] },
  { title: "Plano estratégico", tag: "Personalização", text: "Plano alimentar calculado e individualizado, com receitas práticas, fitoterápicos e suplementação quando necessário.", bullets: ["Cardápio calculado para o seu objetivo", "Substituições para viagens e fins de semana", "Prescrição de manipulados e suplementos"] },
  { title: "Acompanhamento", tag: "Evolução", text: "Feedbacks, ajustes de cardápio e suporte próximo direto pelo WhatsApp durante toda a vigência do plano.", bullets: ["Canal direto para dúvidas rápidas", "Ajustes para novas fases de treino", "Comparativo de evolução e métricas"] },
];

export const includes = [
  ["chat", "WhatsApp direto", "Dúvidas do dia a dia, substituições em restaurantes e apoio motivacional."],
  ["swap", "Guia de substituições", "Troque alimentos equivalentes mantendo os mesmos macronutrientes."],
  ["book", "E-book de receitas", "Opções práticas para almoço, lanches e pré-treino com ingredientes simples."],
  ["chart", "Relatório de evolução", "Gráficos de gordura, massa magra e hidratação a cada retorno."],
];

export const sampleMenu = [
  { meal: "Café da manhã", time: "07h", kcal: 380, macros: { p: 24, c: 38, g: 14 }, image: unsplash("1525351484163-7529414344d8", 800), dishes: ["Tapioca com ovos mexidos e queijo branco", "Café sem açúcar ou com adoçante", "1 porção de mamão com chia"] },
  { meal: "Almoço", time: "12h", kcal: 560, macros: { p: 42, c: 62, g: 14 }, image: unsplash("1504674900247-0877df9cc836", 800), dishes: ["Arroz, feijão e frango grelhado", "Salada colorida à vontade", "Fio de azeite e limão"] },
  { meal: "Lanche", time: "16h", kcal: 320, macros: { p: 16, c: 42, g: 9 }, image: unsplash("1484723091739-30a097e8f929", 800), dishes: ["Cuscuz com ovo", "Iogurte natural", "Fruta da estação"] },
  { meal: "Jantar", time: "20h", kcal: 450, macros: { p: 34, c: 40, g: 14 }, image: unsplash("1467003909585-2f8a72700288", 800), dishes: ["Peixe assado com legumes", "Batata-doce ou arroz", "Chá sem açúcar"] },
];

export const plans = [
  { label: "Presencial", title: "Consultório", image: "/assets/image.png", detail: "Rua São Francisco, 441 · Maracanaú", features: ["Anamnese e recordatório alimentar", "Bioimpedância e composição corporal", "Plano calculado e individualizado", "Fitoterápicos e/ou suplementação", "Acompanhamento via WhatsApp"], featured: true, packages: [["Avulso sem retorno", "R$ 200"], ["Avulso com 1 retorno", "R$ 360"], ["Pacote 3 consultas", "R$ 550"], ["Pacote 4 consultas", "R$ 700"], ["Pacote 6 consultas", "R$ 1.000"], ["Pacote 12 consultas", "R$ 1.900"]] },
  { label: "Online", title: "Consultoria", image: unsplash("1516321318423-f06f85e504b3", 400), detail: "Atendimento para todo o Brasil", features: ["Anamnese e recordatório alimentar", "Avaliação física por vídeo e/ou fotos", "Plano calculado e individualizado", "Fitoterápicos e/ou suplementação", "Acompanhamento via WhatsApp"], packages: [["Avulso sem retorno", "R$ 170"], ["Avulso com 1 retorno", "R$ 300"], ["Pacote 3 consultas", "R$ 420"], ["Pacote 4 consultas", "R$ 500"], ["Pacote 6 consultas", "R$ 800"], ["Pacote 12 consultas", "R$ 1.500"]] },
  { label: "Em casa", title: "Personal Diet", image: unsplash("1498837167922-ddd27525d352", 400), detail: "Consulta no conforto do seu lar", features: ["Atendimento na sua casa", "Bioimpedância e composição corporal", "Plano calculado e individualizado", "Fitoterápicos e/ou suplementação", "Acompanhamento via WhatsApp"], packages: [["Avulso sem retorno", "R$ 250"], ["Avulso com 1 retorno", "R$ 500"], ["Pacote 3 consultas", "R$ 700"], ["Pacote 4 consultas", "R$ 900"], ["Pacote 6 consultas", "R$ 1.300"], ["Pacote 12 consultas", "R$ 2.500"]] },
];

export const planNotes = ["Material de apoio para a sua nova jornada", "Pacotes de 3+ consultas podem ser divididos com familiares ou amigos", "10% de desconto em procedimentos estéticos, manipulados e suplementos"];

export const reviews = [
  { quote: "O melhor nutricionista que eu já conheci. Dá total suporte ao atleta do início ao fim, ajustando cada refeição com base no rendimento real dos treinos.", author: "Áquila Mendes", tag: "Performance esportiva" },
  { quote: "Consulta acolhedora e extremamente detalhista. Pela primeira vez consegui seguir um plano alimentar sem sofrimento e já perdi 8 kg de forma saudável.", author: "Juliana Frota", tag: "Emagrecimento" },
  { quote: "A facilidade de tirar dúvidas no WhatsApp durante o mês faz toda a diferença. Profissional atencioso, técnico e muito capacitado.", author: "Marcos Vinícius", tag: "Nutrição clínica" },
];

export const faq = [
  ["Preciso seguir uma dieta restritiva?", "Não. O plano é construído a partir da sua rotina, preferências e objetivo. A proposta é criar estratégias possíveis para a sua vida real."],
  ["O atendimento online funciona para mim?", "Sim. A consulta online inclui anamnese, avaliação por vídeo e/ou fotos e acompanhamento próximo pelo WhatsApp."],
  ["A consulta inclui suplementação?", "Quando fizer sentido para o seu caso, a suplementação é avaliada de forma individualizada e baseada em evidências."],
  ["Como funciona o pagamento e o agendamento?", "Para confirmar a consulta, é solicitado o envio de 30% de entrada, abatido do valor total. Reagendamentos devem ser feitos com no mínimo 12 horas de antecedência; o saldo fica disponível por até 20 dias para uma nova data."],
  ["Os benefícios continuam depois do plano?", "Os benefícios ficam disponíveis durante a vigência do plano. Ao final, podem ser retomados mediante renovação."],
];

export const quiz = [
  {
    question: "Qual é o seu principal objetivo?",
    key: "goal",
    options: [
      { label: "Emagrecer e perder gordura", hint: "Sem efeito sanfona", specialty: 0 },
      { label: "Ganhar massa muscular", hint: "Hipertrofia e força", specialty: 1 },
      { label: "Cuidar da saúde e dos exames", hint: "Intestino, sono, energia", specialty: 2 },
      { label: "Render mais no esporte", hint: "Performance e recuperação", specialty: 1 },
    ],
  },
  {
    question: "Como você prefere ser atendido?",
    key: "plan",
    options: [
      { label: "No consultório", hint: "Maracanaú · CE", plan: 0 },
      { label: "Online", hint: "De qualquer lugar do Brasil", plan: 1 },
      { label: "Na minha casa", hint: "Personal Diet", plan: 2 },
    ],
  },
  {
    question: "Por quanto tempo quer acompanhamento?",
    key: "package",
    options: [
      { label: "Quero começar com uma consulta", hint: "Consulta + 1 retorno", package: 1 },
      { label: "Cerca de 3 meses", hint: "Pacote 3 consultas", package: 2 },
      { label: "Cerca de 6 meses", hint: "Pacote 6 consultas", package: 4 },
      { label: "Um ano de transformação", hint: "Pacote 12 consultas", package: 5 },
    ],
  },
];

export const results = [
  { name: "Paciente 1", goal: "Emagrecimento", before: "/assets/resultados/paciente-1-antes.webp", after: "/assets/resultados/paciente-1-depois.webp", text: "Mudança completa de composição corporal com plano possível e acompanhamento contínuo." },
  { name: "Paciente 2", goal: "Recomposição corporal", before: "/assets/resultados/paciente-2-antes.webp", after: "/assets/resultados/paciente-2-depois.webp", text: "Menos gordura, mais definição e treino rendendo de verdade." },
  { name: "Paciente 3", goal: "Definição", before: "/assets/resultados/paciente-3-antes.webp", after: "/assets/resultados/paciente-3-depois.webp", text: "Estratégia ajustada à rotina para chegar à melhor forma." },
];

export const guides = [
  { id: "temperos", title: "Guia de Temperos", subtitle: "Temperos que dão sabor e saúde", pages: 28 },
  { id: "industrializados", title: "Guia de Industrializados", subtitle: "Como escolher alimentos mais saudáveis no supermercado", pages: 73 },
  { id: "doces-fitness", title: "E-book Doces Fitness", subtitle: "Receitas doces para encaixar na dieta sem culpa", pages: 31 },
  { id: "rotulos", title: "Guia de Rótulos", subtitle: "Como ler rótulos e fazer boas escolhas", pages: 12 },
  { id: "bebidas", title: "Guia de Bebidas Alcoólicas", subtitle: "Álcool e redução de danos", pages: 20 },
  { id: "doces", title: "Guia de Doces", subtitle: "Doces com cerca de 100 calorias para a dieta", pages: 23 },
  { id: "salada", title: "Guia de Salada", subtitle: "Saladas deliciosas + ideias de molhos", pages: 12 },
  { id: "refeicao-livre", title: "Guia de Refeição Livre", subtitle: "Como aproveitar sem afetar seus resultados", pages: 34 },
];

// Preços dos guias (em reais). Os combos são aplicados automaticamente no carrinho.
export const guidePrice = 15;
export const guideCombos = [
  { size: 3, price: 39, label: "Combo 3 guias" },
  { size: 5, price: 59, label: "Combo 5 guias" },
  { size: 8, price: 79, label: "Coleção completa" },
];
