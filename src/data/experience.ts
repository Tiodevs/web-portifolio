export type ExperienceItemData = {
  empresa: string;
  cargo: string;
  periodo: string;
  bullets: string[];
  caseSlug?: string;
};

export const experiences: ExperienceItemData[] = [
  {
    empresa: 'Grupo Boticário',
    cargo: 'Engenheiro de Software Pleno',
    periodo: 'Jan 2026 — Atual',
    caseSlug: 'app-super',
    bullets: [
      'Ponto focal em GenIA no suporte fabril: RAG sobre documentação técnica, BI para a gestão e redesenho de processos (BPMN) com integrações.',
      'Decisões técnicas no App Super (PWA, +5.000 colaboradores): React, Node.js, DocumentDB, SSO, AWS (EKS, S3, ArgoCD, New Relic).',
      'Substituição de planilhas manuais com cerca de +20% de produtividade dos coordenadores e −10% no tempo de alocação, em um recorte de R$ 63 mi/ano.',
    ],
  },
  {
    empresa: 'ASSUMTEK',
    cargo: 'Desenvolvedor Full Stack Pleno & Tech Lead',
    periodo: 'Jan 2025 — Jan 2026',
    caseSlug: 'plataforma-rh',
    bullets: [
      'Produto de RH do zero (Next, Node, PostgreSQL): jornada PJ, folha, travas de horas, aprovações e cálculo dinâmico de remuneração.',
      '−70% no tempo operacional do RH no fechamento da folha. Liderança técnica com arquitetura, demandas e 1:1.',
      'Integrações MarTech (n8n, Make, Meta Ads, CRMs) e pipelines Node/Python para Power BI em todos os setores e clientes B2B.',
    ],
  },
  {
    empresa: 'Sentier',
    cargo: 'Fundador & Desenvolvedor Full Stack',
    periodo: 'Jan 2021 — Jan 2025',
    caseSlug: 'saas-barbearias',
    bullets: [
      'Mais de 40 projetos B2B ponta a ponta: sistemas, landings, automações e BI, do Figma ao deploy.',
      'SaaS multi-tenant para barbearias (agenda, folha, assinaturas, lembretes) com Next.js, Node, Prisma, S3, Resend e Vercel.',
      '+7.000 usuários cadastrados e economia de tempo estimada entre 17% e 20% na operação dos clientes.',
    ],
  },
];

export const volunteerWork = [
  {
    titulo: 'Global Shapers Community',
    contexto: 'Fórum Econômico Mundial · atual',
    descricao:
      'Capacitação de professores da rede pública no uso prático de IA e apoio a treinamentos sobre identificação e denúncia de sinais de abuso infantil nas escolas.',
  },
  {
    titulo: 'Liderança regional e TI',
    contexto: '2023 — 2024',
    descricao:
      'Gestão de voluntários no Sul do Brasil e estruturação de sistemas e Power BI para 20 acampamentos nacionais.',
  },
  {
    titulo: 'Saúde e ONGs',
    contexto: 'Vários períodos',
    descricao:
      'Voluntariado com pacientes oncológicos no Hospital Erasto Gaertner e apoio web/audiovisual para a ONG Afeka e populações vulneráveis.',
  },
];
