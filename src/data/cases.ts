export type CoverTheme =
  | 'industrial'
  | 'people'
  | 'saas'
  | 'neural'
  | 'nodes'
  | 'landing';

export type CaseMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  period: string;
  role: string;
  summary: string;
  featured: boolean;
  confidential: boolean;
  coverTheme: CoverTheme;
  image?: string;
  screens?: { src: string; alt: string }[];
  github?: string;
  liveUrl?: string;
  metrics: CaseMetric[];
  context: string;
  problem: string;
  contribution: string;
  stack: { frontend: string[]; backend: string[] };
  result: string;
  tags: string[];
};

export const cases: CaseStudy[] = [
  {
    slug: 'app-super',
    title: 'App Super',
    company: 'Grupo Boticário',
    period: '2026 — Atual',
    role: 'Full Stack · PWA',
    summary:
      'PWA de gestão fabril para mais de 5.000 colaboradores: decisões de código, SSO e nuvem AWS no lugar de dezenas de planilhas.',
    featured: true,
    confidential: true,
    coverTheme: 'industrial',
    metrics: [
      { value: '+5 mil', label: 'colaboradores na operação' },
      { value: '+20%', label: 'produtividade dos coordenadores' },
      { value: '−10%', label: 'tempo de alocação de equipes' },
      { value: 'R$ 63 mi', label: 'custo operacional no recorte' },
    ],
    context:
      'O App Super concentra jornada, folgas e matriz de habilidades no chão de fábrica. O recorte público descreve o problema, o papel técnico e o impacto — sem interface interna.',
    problem:
      'Controle de horas, folgas e competências vivia em planilhas. Coordenadores perdiam tempo alocando times e a gestão tinha pouca visibilidade para decidir.',
    contribution:
      'Atuei nas decisões técnicas de um PWA em React, Node.js, MongoDB/DocumentDB e SSO. Colaborei com DevOps em deploy e monitoramento na AWS (EKS, S3, ArgoCD e New Relic). Em paralelo, fui ponto focal em GenIA: RAG sobre documentação técnica, dashboards de BI e redesenho de processos (BPMN) com integrações.',
    stack: {
      frontend: ['React', 'PWA', 'SSO'],
      backend: ['Node.js', 'MongoDB / DocumentDB', 'AWS EKS', 'S3', 'ArgoCD', 'New Relic'],
    },
    result:
      'A sistematização substituiu dezenas de planilhas. Houve cerca de 20% mais produtividade dos coordenadores fabris, 10% menos tempo em alocação de equipes e melhor governança sobre um custo operacional da ordem de R$ 63 milhões/ano.',
    tags: ['Produto', 'Cloud', 'IA'],
  },
  {
    slug: 'plataforma-rh',
    title: 'Plataforma de RH',
    company: 'ASSUMTEK',
    period: '2025 — 2026',
    role: 'Full Stack Pleno & Tech Lead',
    summary:
      'Sistema interno de jornada PJ e folha, do zero: regras de negócio, aprovações e cálculo de remuneração com redução forte no fechamento.',
    featured: true,
    confidential: true,
    coverTheme: 'people',
    metrics: [
      { value: '−70%', label: 'tempo operacional do RH' },
      { value: '0 → 1', label: 'produto interno no lugar de planilha' },
      { value: 'Lead', label: 'arquitetura, demandas e 1:1' },
    ],
    context:
      'Produto interno de RH. Não há prints da interface — o case cobre o desenho do produto, a liderança técnica e o resultado operacional.',
    problem:
      'Jornada de PJ, limites de horas, aprovações de liderança e cálculo de remuneração (impostos, benefícios, auxílio-transporte) dependiam de processo manual, lento e sujeito a erro no fechamento da folha.',
    contribution:
      'Desenvolvi o sistema web do zero (Node, PostgreSQL, Next.js, Vercel, Railway), com regras de negócio e fluxos de aprovação. Como tech lead, cuidei de arquitetura, gestão de demandas e 1:1. No entorno do produto, construí integrações MarTech (Node, n8n, Make, Meta Ads, CRMs) e pipelines de dados em Node e Python para Power BI.',
    stack: {
      frontend: ['Next.js', 'React', 'TypeScript'],
      backend: ['Node.js', 'PostgreSQL', 'Python', 'n8n', 'Make', 'Power BI', 'Vercel', 'Railway'],
    },
    result:
      'A entrega reduziu em cerca de 70% o tempo operacional do RH no fechamento da folha e passou a alimentar relatórios gerenciais para Produto, Marketing, TI, RH e clientes B2B.',
    tags: ['Produto', 'Liderança', 'Dados'],
  },
  {
    slug: 'saas-barbearias',
    title: 'SaaS para barbearias',
    company: 'Sentier',
    period: '2021 — 2025',
    role: 'Fundador & Full Stack',
    summary:
      'Plataforma multi-tenant com agenda, folha, assinaturas e lembretes — comercializada e adotada por vários estabelecimentos.',
    featured: true,
    confidential: true,
    coverTheme: 'saas',
    metrics: [
      { value: '+7 mil', label: 'usuários cadastrados' },
      { value: '17–20%', label: 'economia de tempo na operação' },
      { value: '+40', label: 'projetos B2B ponta a ponta' },
    ],
    context:
      'Produto próprio da Sentier. O recorte público não usa telas de estabelecimentos clientes: o foco é o produto, a arquitetura e a escala.',
    problem:
      'Barbearias geriam agenda, comissão, assinaturas e lembretes de forma fragmentada. Faltava um sistema multi-tenant que digitalizasse o dia a dia sem operação pesada.',
    contribution:
      'Desenhei e construí o SaaS (agenda, folha, motor de assinaturas, disparo de lembretes) com Next.js, Node.js, Prisma, AWS S3, Resend e Vercel. Na Sentier, também liderei mais de 40 entregas B2B — sistemas sob medida, automações e painéis de BI — da prototipação no Figma ao deploy.',
    stack: {
      frontend: ['Next.js', 'TypeScript', 'Figma'],
      backend: ['Node.js', 'Prisma', 'AWS S3', 'Resend', 'Vercel'],
    },
    result:
      'A plataforma passou de 7.000 usuários cadastrados. A digitalização gerou economia de tempo estimada entre 17% e 20% na operação diária das barbearias clientes.',
    tags: ['SaaS', 'Produto', 'Fundação'],
  },
  {
    slug: 'ia-chat',
    title: 'IA Chat',
    company: 'Especificações SAP',
    period: '2025',
    role: 'Full Stack',
    summary:
      'Solução de IA que gera especificações funcionais para consultores SAP, encurtando um trabalho de horas para minutos.',
    featured: false,
    confidential: false,
    coverTheme: 'neural',
    image: '/projcts/01/capa01.png',
    screens: [
      { src: '/projcts/01/Tela01.png', alt: 'Tela inicial do IA Chat' },
      { src: '/projcts/01/Tela02.png', alt: 'Fluxo de geração de especificações' },
      { src: '/projcts/01/Tela03.png', alt: 'Resultado da especificação gerada' },
    ],
    metrics: [
      { value: 'Horas → min', label: 'tempo da especificação funcional' },
    ],
    context:
      'Consultores SAP gastavam horas montando especificações funcionais a partir de regras e documentos. A ferramenta usa IA para estruturar esse artefato.',
    problem:
      'O trabalho era repetitivo, lento e inconsistente entre consultores. Faltava um fluxo único do pedido à especificação pronta para revisão.',
    contribution:
      'Atuei em backend, frontend, infraestrutura e DevOps: modelo de dados, integração com IA, interface e deploy, com foco em performance e uso fluido.',
    stack: {
      frontend: ['Figma', 'Next.js', 'TypeScript', 'GSAP', 'Vercel'],
      backend: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Railway', 'Integração com IA'],
    },
    result:
      'Tarefas que levavam horas passaram a poucos minutos, com uma experiência contínua da captura do contexto até o texto da especificação.',
    tags: ['IA', 'Web'],
  },
  {
    slug: 'site-links',
    title: 'Hub de links',
    company: 'ASSUMTEK',
    period: '2025',
    role: 'Full Stack',
    summary:
      'Site de links com painel para a equipe gerenciar destinos, sem expor a interface interna do produto.',
    featured: false,
    confidential: true,
    coverTheme: 'nodes',
    metrics: [],
    context:
      'Hub público de atalhos da empresa, com área administrativa. Prints do painel interno ficam de fora deste case.',
    problem:
      'Links institucionais mudavam com frequência e dependiam de alguém alterar código ou um documento solto. A equipe precisava publicar e reordenar destinos sozinha.',
    contribution:
      'Construí o site em Next.js com API em Node, autenticação simples para o painel e um layout responsivo para o hub público.',
    stack: {
      frontend: ['Figma', 'Next.js', 'TypeScript', 'GSAP', 'Vercel'],
      backend: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Railway'],
    },
    result:
      'A comunicação passou a ter um único endereço público, e o time passou a atualizar links sem deploy manual de conteúdo.',
    tags: ['Web'],
  },
  {
    slug: 'sentier-landing',
    title: 'Landing Sentier',
    company: 'Sentier',
    period: '2025',
    role: 'Full Stack',
    summary:
      'Landing da Sentier para apresentar a empresa e os produtos, com visual próprio e stack Next.js.',
    featured: false,
    confidential: false,
    coverTheme: 'landing',
    image: '/projcts/03/Capa01.png',
    screens: [{ src: '/projcts/03/Tela01.png', alt: 'Landing page da Sentier' }],
    github: 'https://github.com/Tiodevs/SentierFrontend',
    metrics: [],
    context:
      'Página pública da Sentier, pensada para explicar o que a empresa entrega e encaminhar contato.',
    problem:
      'A marca precisava de uma vitrine rápida, responsiva e alinhada ao tom dos produtos — sem um site institucional antigo.',
    contribution:
      'Desenhei e implementei a landing em Next.js, com animações leves e estrutura para conteúdo de produtos e empresa.',
    stack: {
      frontend: ['Figma', 'Next.js', 'TypeScript', 'GSAP', 'Vercel'],
      backend: ['Node.js'],
    },
    result:
      'A empresa passou a ter um ponto de entrada público coerente com o restante do portfólio de produto.',
    tags: ['Web'],
  },
];

export const featuredCases = cases.filter((item) => item.featured);

export function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug);
}

export const CASE_REDIRECTS: Record<string, string> = {
  '01': 'ia-chat',
  '02': 'site-links',
  '03': 'sentier-landing',
};
