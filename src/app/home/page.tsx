'use client';

import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import CaseCard from '../../components/CaseCard/CaseCard';
import { HabilidadesList } from '../../components/Habilidades/HabilidadesList';
import { ExperienciaItem } from '../../components/ExperiencialItem/ExperienciaItem';
import { Contato } from '../../components/Contato/Contato';
import { CertificadoItem } from '../../components/Certificados/CertificadoItem';
import { Voluntariado } from '../../components/Voluntariado/Voluntariado';
import { MetricStat } from '../../components/MetricStat/MetricStat';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoadingState } from '../../hooks/useLoadingState';
import { featuredCases } from '../../data/cases';
import { experiences } from '../../data/experience';
import { CV_PATH } from '../../lib/social';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoadingState();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const tl = gsap.timeline();
    gsap.set([titleRef.current, textRef.current, actionsRef.current], {
      opacity: 0,
      y: 24,
    });

    tl.from(headerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
    })
      .from(imageRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.2')
      .to(titleRef.current, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' })
      .to(textRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to(actionsRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.25');
  }, [isLoading]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const timer = setTimeout(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card-item');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      const timelineItems = gsap.utils.toArray<HTMLElement>('.timelineItem');
      timelineItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={`${styles.page} ${isLoading ? styles.hidden : styles.visible}`}>
      <div className={styles.header} ref={headerRef}>
        <div ref={imageRef} className={styles.image}>
          <Image
            src="/Me.png"
            alt="Foto de Felipe P. dos Santos"
            width={604}
            height={324}
          />
        </div>
        <div className={styles.text}>
          <p className={styles.kicker}>Curitiba · Full Stack Pleno</p>
          <h1 ref={titleRef}>Web, Cloud, IA e produto com número no fim.</h1>
          <p ref={textRef}>
            Construo aplicações que saem da planilha e entram em operação.
            Lidero da concepção ao suporte e integro IA no fluxo com código limpo,
            seguro e impacto que dá para apontar.
          </p>
          <div className={styles.heroMetrics}>
            <MetricStat value="+5 mil" label="pessoas no App Super" href="/projetos/app-super" />
            <MetricStat value="−70%" label="tempo de folha no RH" href="/projetos/plataforma-rh" />
            <MetricStat value="+7 mil" label="usuários no SaaS Sentier" href="/projetos/saas-barbearias" />
          </div>
          <div className={styles.heroActions} ref={actionsRef}>
            <a className={styles.buttonPrimary} href="#projetos">
              Ver cases
            </a>
            <a className={styles.buttonheader} href={CV_PATH} download="CV-Felipe-Santos.pdf">
              Baixar currículo
            </a>
          </div>
        </div>
      </div>

      <div className={styles.projects} id="projetos">
        <div className={styles.project}>
          <div className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>Cases que sustentam o CV</h2>
            <p className={styles.projectsDescription}>
              Produto em escala, não landing de vitrine. Interfaces internas de clientes
              ficam de fora — o recorte é problema, papel e resultado.
            </p>
          </div>
          <div className={styles.projectsContainer}>
            {featuredCases.map((item) => (
              <CaseCard key={item.slug} item={item} featured />
            ))}
          </div>
          <div className={styles.projectsButtonContainer}>
            <Link href="/projetos" className={styles.projectsButton}>Ver todos os projetos</Link>
          </div>
        </div>
      </div>

      <div className={styles.habilidades} id="habilidades">
        <h2 className={styles.habilidadesTitle}>Habilidades</h2>
        <div className={styles.habilidadesContainer}>
          <HabilidadesList
            titulo="Front-end"
            habilidades={[
              { nome: 'HTML', imagem: '/icons/html5-original.svg', altImagem: 'HTML5' },
              { nome: 'CSS', imagem: '/icons/css3-original.svg', altImagem: 'CSS3' },
              { nome: 'JavaScript', imagem: '/icons/javascript-original.svg', altImagem: 'JavaScript' },
              { nome: 'TypeScript', imagem: '/icons/typescript-original.svg', altImagem: 'TypeScript' },
              { nome: 'React', imagem: '/icons/react-original.svg', altImagem: 'React' },
              { nome: 'Next.js', imagem: '/icons/nextjs-original.svg', altImagem: 'Next.js' },
              'Tailwind CSS',
              'GSAP',
            ]}
            habilidadeDestaque="Next.js"
          />
          <HabilidadesList
            titulo="Back-end & APIs"
            habilidades={[
              { nome: 'Node.js', imagem: '/icons/nodejs-original.svg', altImagem: 'Node.js' },
              'Python',
              { nome: 'Express', imagem: '/icons/express-original.svg', altImagem: 'Express' },
              { nome: 'Prisma', imagem: '/icons/prisma-original.svg', altImagem: 'Prisma' },
              { nome: 'PostgreSQL', imagem: '/icons/postgresql-original.svg', altImagem: 'PostgreSQL' },
              'MongoDB',
              'APIs REST',
              'Autenticação',
              'DDD',
            ]}
            habilidadeDestaque="Node.js"
          />
          <HabilidadesList
            titulo="Cloud & DevOps"
            habilidades={[
              'AWS (S3, SQS, Lambda, EKS)',
              { nome: 'Docker', imagem: '/icons/docker-original.svg', altImagem: 'Docker' },
              'CI/CD & Git Flow',
              { nome: 'Vercel', imagem: '/icons/vercel-original.svg', altImagem: 'Vercel' },
              { nome: 'Railway', imagem: '/icons/railway-original.svg', altImagem: 'Railway' },
              'New Relic',
            ]}
            habilidadeDestaque="AWS (S3, SQS, Lambda, EKS)"
          />
          <HabilidadesList
            titulo="Automação & outros"
            habilidades={[
              'Make & n8n',
              { nome: 'Figma', imagem: '/icons/figma-original.svg', altImagem: 'Figma' },
              'Scrum',
              'Power BI',
            ]}
            habilidadeDestaque="Make & n8n"
          />
          <HabilidadesList
            titulo="IA & LLMs"
            habilidades={[
              'LangChain & RAG',
              'OpenAI SDK & Gemini',
              'Prompt engineering',
              'Gestão de memória / contexto',
              'GitHub Copilot',
            ]}
            habilidadeDestaque="LangChain & RAG"
          />
        </div>
      </div>

      <div className={styles.experiencias} id="experiencia">
        <h2 className={styles.experienciasTitle}>Experiências</h2>
        <div className={styles.timelineContainer}>
          {experiences.map((item, index) => (
            <ExperienciaItem
              key={item.empresa}
              empresa={item.empresa}
              cargo={item.cargo}
              periodo={item.periodo}
              bullets={item.bullets}
              caseSlug={item.caseSlug}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>

      <Voluntariado />

      <div className={styles.educacao} id="educacao">
        <h2 className={styles.educacaoTitle}>Educação</h2>
        <div className={styles.educacaoContainer}>
          <div className={styles.educacaoCategoria}>
            <h3 className={styles.categoriaTitle}>Formação e cursos</h3>
            <div className={styles.categoriaContent}>
              <CertificadoItem
                titulo="FAEL — Análise e Desenvolvimento de Sistemas"
                descricao="Graduação em Análise e Desenvolvimento de Sistemas (jan 2021 – dez 2025)."
                index={1}
              />
              <CertificadoItem
                titulo="Grupo Boticário — Programa Desenvolve"
                descricao="Programa intensivo em Full Stack (Node, React, Next) e IA."
                index={2}
              />
              <CertificadoItem
                titulo="Harvard Business Education — Business Fundamentals"
                descricao="Fundamentos de negócio para ligar entrega técnica a valor e priorização."
                index={3}
              />
              <CertificadoItem
                titulo="Google — Análise de Dados & BI"
                descricao="Ciclo de vida dos dados e tomada de decisão orientada a evidência."
                imagem="/certificados/googDados.jpeg"
                index={4}
              />
              <CertificadoItem
                titulo="Harvard University — CS50x"
                descricao="Fundamentos, algoritmos e projetos práticos de software e web."
                imagem="/certificados/CS50x.png"
                index={5}
              />
              <CertificadoItem
                titulo="AWS Academy — Cloud Foundations"
                descricao="Infraestrutura global, serviços essenciais, segurança e arquitetura na AWS."
                imagem="/certificados/aws.png"
                index={6}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="contato">
        <Contato />
      </div>
    </div>
  );
}
