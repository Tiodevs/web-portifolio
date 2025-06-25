'use client';

import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import ProjectCard from '../../components/Projetos/ProjectCard';
import { HabilidadesList } from '../../components/Habilidades/HabilidadesList';
import { ExperienciaItem } from '../../components/ExperiencialItem/ExperienciaItem';
import { Contato } from '../../components/Contato/Contato';
import { CertificadoItem } from '../../components/Certificados/CertificadoItem';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useLoadingState } from "../../hooks/useLoadingState";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const buttonTextRef2 = useRef<HTMLSpanElement>(null);

  // Refs para a seção de projetos
  const projectsHeaderRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useLoadingState();

  useEffect(() => {
    const tl = gsap.timeline();

    // Animação do header
    gsap.set([titleRef.current, textRef.current, buttonRef.current], {
      opacity: 0,
      y: 30
    });

    // Animação do header
    tl.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    })
      .from(imageRef.current, {
        y: 30,
        scale: 5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.8")
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 1
      })
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4")
      .to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
        clearProps: "all",
      }, "-=0.4");

    // Configurações do botão CV
    gsap.set(buttonTextRef2.current, {
      y: '100%',
      rotationX: -90,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      opacity: 1,
      pointerEvents: 'none'
    });

    // Adiciona a animação de hover
    if (buttonRef.current && buttonTextRef.current && buttonTextRef2.current) {
      const buttonTl = gsap.timeline({ paused: true });

      buttonTl.to(buttonTextRef.current, {
        duration: 0.5,
        y: '-100%',
        rotationX: 90,
        ease: 'power2.inOut'
      })
        .to(buttonTextRef2.current, {
          duration: 0.5,
          y: '0%',
          rotationX: 0,
          ease: 'power2.inOut'
        }, '<');

      buttonRef.current.addEventListener('mouseenter', () => {
        buttonTl.play();
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        buttonTl.reverse();
      });
    }


  }, [isLoading]);

  useEffect(() => {
    // Animação dos projetos com cabeçalho fixo
    const timer = setTimeout(() => {
      console.log('Iniciando animação dos projetos...');

      const projectCards = gsap.utils.toArray<HTMLElement>('.project-card-item');
      console.log('Cards encontrados:', projectCards.length);

      if (projectCards.length > 0) {
        console.log('Criando ScrollTrigger...');

        // Efeito de acordeão nos cards
        projectCards.forEach((card, index) => {
          const isFirst = index === 0;

          // Define posição inicial dos cards
          gsap.set(card, {
            zIndex: projectCards.length + index,
            position: 'sticky',
            top: `${100 + (index * 10)}px`, // Mais espaçamento entre cards
          });

          if (isFirst) {
            gsap.set(card, {
              y: 0,
            });

            // Animação de entrada suave para cada card
            gsap.fromTo(card,
              {
                y: 0,
              },
              {
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: 'top 70%',
                  end: 'top 100%',
                  scrub: false,
                  markers: false,
                }
              }
            );
          } else {

            // Animação de entrada suave para cada card
            gsap.fromTo(card,
              {
                y: 150,
              },
              {
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: 'top 70%',
                  end: 'top 100%',
                  scrub: false,
                  markers: false,
                }
              }
            );

          }



        });
      }

      // Animações da timeline de experiências
      const timelineItems = gsap.utils.toArray<HTMLElement>('.timelineItem');

      timelineItems.forEach((item, index) => {
        const dot = item.querySelector('.timelineDot');
        const card = item.querySelector('.timelineCard');
        const line = item.querySelector('.timelineLine');

        // Animação de entrada do item
        gsap.fromTo(item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Animação do ponto da timeline
        if (dot) {
          gsap.fromTo(dot,
            {
              scale: 0,
              rotation: -180,
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }

        // Animação da linha da timeline
        if (line) {
          gsap.fromTo(line,
            {
              scaleY: 0,
              transformOrigin: 'top',
            },
            {
              scaleY: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                end: 'bottom 70%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }

        // Animação do card
        if (card) {
          gsap.fromTo(card,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
      });

      // Animações da seção de educação/cursos
      const cursoItems = gsap.utils.toArray<HTMLElement>('.curso-item');

      cursoItems.forEach((item, index) => {
        // Animação lateral de entrada (da direita para esquerda)
        gsap.fromTo(item,
          {
            opacity: 0,
            x: 120,
            rotationY: 15,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.15,
          }
        );



        // Animação de hover mais suave
        const cardContainer = item.querySelector('.cardContainer');
        if (cardContainer) {
          gsap.set(cardContainer, {
            transformPerspective: 1000,
          });
        }
      });

    }, 500);


    return () => {
      clearTimeout(timer);
      // Limpa todos os ScrollTriggers quando o componente desmonta
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);


  return (
    <div className={`${styles.page} ${isLoading ? styles.hidden : styles.visible}`}>
      <div className={styles.header} ref={headerRef}>
        <div ref={imageRef} className={styles.image}>
          <Image
            src="/Me.png"
            alt="Foto do felipe o dono do portifolio"
            width={604}
            height={324}
            quality={100}
          />
        </div>
        <div className={styles.text}>
          <h1 ref={titleRef}>Mais que código. Resultados.</h1>
          <p ref={textRef}>Desenvolvo soluções digitais completas — de Landing Pages a sistemas web e aplicativos móveis (iOS/Android). Meu foco é entender seu modelo de negócio para que cada projeto entregue um retorno sobre o investimento claro e mensurável.</p>

          <a
            ref={buttonRef}
            className={styles.buttonheader}
            href="/cv25.pdf"
            download="cv25.pdf"
          >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <span
                className={styles.buttonText1}
                ref={buttonTextRef}
              >
                Baixar currículo
              </span>
              <span
                ref={buttonTextRef2}
                className={styles.buttonText2}
              >
                Baixar agora
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.projects}>
        <div className={styles.project}>
          <div ref={projectsHeaderRef} className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>Meus projetos</h2>
            <p className={styles.projectsDescription}>
              Aqui está um pouco dos meus projetos mais recentes. Cada um deles reflete meu foco em soluções centradas no usuário e meu compromisso com a excelência em performance, segurança e resultados reais para o negócio.
            </p>
          </div>
          <div className={styles.projectsContainer}>
            {/* <ProjectCard
              title="IA CHAT"
              subtitle="2025 - Full Stack"
              description="Desenvolvi uma solução completa de IA que gera especificações funcionais para consultores SAP, automatizando tarefas que antes levavam horas e reduzindo esse tempo para poucos minutos. Atuei em todas as frentes do projeto — do backend ao frontend, além da infraestrutura e DevOps — garantindo performance, escalabilidade e uma experiência de uso fluida."
              image="/projcts/01/capa01.png"
              link="/projetos/01"
              linksgit="/"
            />
            <ProjectCard
              title="Site de links"
              subtitle="2025 - Full Stack"
              description="Desenvolvi um site de links para um a ASSUMTEK, com um design moderno e responsivo. O site foi criado com Next.js e node.js, uma interface de adiministração para gerenciar os links e um painel de controle para gerenciar o site."
              image="/projcts/02/Capa01.png"
              link="/projetos/02"
              linksgit="/"
            /> */}
            <ProjectCard
              title="Sentier - Landing Page"
              subtitle="2025 - Full Stack"
              description="Desenvolvi uma landing page para o Sentier, com um design moderno e responsivo. O site foi criado com Next.js e node.js, a pagina foi feita para apresentar as informações da empresa e os produtos que ela oferece."
              image="/projcts/03/Capa01.png"
              link="/projetos/03"
              linksgit="https://github.com/Tiodevs/SentierFrontend"
            />
            <ProjectCard
              title="Cloud It Solutions - Landing Page"
              subtitle="2025 - Full Stack"
              description="Desenvolvi uma landing page para a Cloud It Solutions, com um design moderno e responsivo. O site foi criado com Next.js e node.js, a pagina foi feita para apresentar as informações da empresa e os produtos que ela oferece."
              image="/projcts/04/Capa01.png"
              link="/projetos/04"
              linksgit="https://github.com/Tiodevs/SentierFrontend"
            />
          </div>
          <div className={styles.projectsButtonContainer}>
            <Link href="/projetos" className={styles.projectsButton}>Ver mais</Link>
          </div>
        </div>
      </div>

      <div className={styles.habilidades}>
        <h2 className={styles.habilidadesTitle}>Habilidades</h2>
        <div className={styles.habilidadesContainer}>
          <HabilidadesList
            titulo="Frontend"
            habilidades={[
              { nome: "HTML", imagem: "/icons/html5-original.svg", altImagem: "HTML5" },
              { nome: "CSS", imagem: "/icons/css3-original.svg", altImagem: "CSS3" },
              { nome: "JavaScript", imagem: "/icons/javascript-original.svg", altImagem: "JavaScript" },
              { nome: "TypeScript", imagem: "/icons/typescript-original.svg", altImagem: "TypeScript" },
              { nome: "React", imagem: "/icons/react-original.svg", altImagem: "React" },
              { nome: "Next.js", imagem: "/icons/nextjs-original.svg", altImagem: "Next.js" },
              { nome: "Figma", imagem: "/icons/figma-original.svg", altImagem: "Figma" },
              { nome: "Vercel", imagem: "/icons/vercel-original.svg", altImagem: "Vercel" },
              { nome: "Axios", imagem: "/icons/axios-plain.svg", altImagem: "Axios" },
              "GSAP",
              "SEO",
            ]}
            habilidadeDestaque="Next.js"
          />
          <HabilidadesList
            titulo="Backend"
            habilidades={[
              { nome: "Node.js", imagem: "/icons/nodejs-original.svg", altImagem: "Node.js" },
              { nome: "Express", imagem: "/icons/express-original.svg", altImagem: "Express" },
              { nome: "Prisma", imagem: "/icons/prisma-original.svg", altImagem: "Prisma" },
              { nome: "PostgreSQL", imagem: "/icons/postgresql-original.svg", altImagem: "PostgreSQL" },
              { nome: "Railway", imagem: "/icons/railway-original.svg", altImagem: "Railway" },
              { nome: "Git", imagem: "/iconGit.svg", altImagem: "Git" },
              { nome: "GitHub", imagem: "/iconGit.svg", altImagem: "GitHub" },
              { nome: "Supabase", imagem: "/icons/supabase-original.svg", altImagem: "Supabase" },
              { nome: "Docker", imagem: "/icons/docker-original.svg", altImagem: "Docker" },
              "Yup",
              "AWS",
              "CI/CD",
              "Desenvolvimento de IA",
            ]}
            habilidadeDestaque="Node.js"
          />
          <HabilidadesList
            titulo="Soft skills"
            habilidades={[
              "Comunicação Clara e Eficiente",
              "Pensamento Analítico",
              "Liderança e Tomada de Decisão",
              "Adaptabilidade",
              "Escuta Ativa e Empatia",
              "Gestão de Tempo e Prioridades",
              "Pensamento empreendedor",
            ]}
            habilidadeDestaque="Liderança e Tomada de Decisão"
          />
          <HabilidadesList
            titulo="Outros"
            habilidades={[
              "Automações com n8n e make",
              "sap",
              "Metodologias ágeis",
            ]}
            habilidadeDestaque="Metodologias ágeis"
          />

        </div>
      </div>

      <div className={styles.experiencias}>
        <h2 className={styles.experienciasTitle}>Experiências</h2>
        <div className={styles.timelineContainer}>
          <ExperienciaItem
            empresa="ASSUMTEK Education"
            cargo="Líder de equipe de TI - Desenvolvedor FullSatck"
            periodo="Jan 2025 — Atual"
            descricao="Em minha trajetória na Assumtek, evoluí de um Desenvolvedor focado na criação de produtos para um Líder responsável pela estratégia tecnológica da empresa. 
Comecei liderando o desenvolvimento de um complexo SaaS com IA para o mercado SAP, utilizando Node.js e Next.js. Após o sucesso do projeto, fui promovido a Líder de Equipe de TI, onde passei a gerenciar a segurança e a infraestrutura crítica, implementando a política de recuperação de desastres com Veeam."
          />
          <ExperienciaItem
            empresa="Empreendedor"
            cargo="Fundador & Consultor de Estratégia Digital"
            periodo="Jan 2025 — Atual"
            descricao="Fundei a Sentier como uma startup focada no desenvolvimento de produtos e soluções digitais sob medida. Atuei como líder técnico e de produto, gerenciando projetos desde a concepção (MVP) até a implementação, com foco especial na construção de aplicações web de alta performance e na arquitetura de software."
          />
          <ExperienciaItem
            empresa="Trabalho Voluntário"
            cargo="Pausa na carreira"
            periodo="Jan 2023 — Jan 2025"
            descricao="Dediquei um período sabático de dois anos para liderar e executar projetos de alto impacto social, aplicando competências em tecnologia, gestão e comunicação para apoiar ONGs e comunidades em vulnerabilidade. Esta experiência fortaleceu minhas habilidades de liderança, resolução de problemas complexos e adaptação em ambientes dinâmicos."
          />
          <ExperienciaItem
            empresa="Cedaspy"
            cargo="Professor de tecnologia - Programação, robotica, marketing e design"
            periodo="Jan 2022 — Jan 2023"
            descricao="Responsável por ministrar um currículo técnico abrangente para jovens, com foco em prepará-los para os desafios do mercado de trabalho digital. Criei um ambiente de aprendizado engajador, prático e orientado a resultados."

          />
        </div>
      </div>

      <div className={styles.educacao}>
        <h2 className={styles.educacaoTitle}>Educação</h2>

        <div className={styles.educacaoContainer}>
          <div className={styles.educacaoCategoria}>
            <h3 className={styles.categoriaTitle}>Formação Acadêmica</h3>
            <div className={styles.categoriaContent}>
              <CertificadoItem
                titulo="Faculdade de ADS - Análise e Desenvolvimento de Sistemas"
                descricao="Atualmente cursando Análise e Desenvolvimento de Sistemas na Universidade Estácio de Sá, com previsão de conclusão o segundo semestre de 2025. Estou aprofundando meus conhecimentos em programação, desenvolvimento web e sistemas, além de aprender sobre IA e desenvolvimento de software."
                index={0}
                progresso={90}
                status="Ultimo semestre"
              />
            </div>
          </div>

          <div className={styles.educacaoCategoria}>
            <h3 className={styles.categoriaTitle}>Cursos em Andamento</h3>
            <div className={styles.categoriaContent}>
              <CertificadoItem
                titulo="Programa Desenvolve | Desenvolvimento de Software - Grupo Boticário"
                descricao="Atualmente participando do Desenvolve, o programa de aceleração de carreiras em tecnologia do Grupo Boticário. Fui selecionado para esta trilha de desenvolvimento de software, que visa formar os futuros especialistas da companhia através de uma imersão em projetos reais, tecnologias de ponta e na cultura de uma das maiores empresas de beleza e tecnologia do mundo."
                index={1}
                progresso={10}
                status="10% Concluído"
              />
            </div>
            <div className={styles.categoriaContent}>
              <CertificadoItem
                titulo="JStack"
                descricao="Treinamento sobre SaaS, integração com inteligência artificial, React Native, TypeScript, Serverless Framework, AWS Lambda, AWS S3 e muito mais!"
                index={2}
                progresso={5}
                status="5% Concluído"
              />
            </div>
          </div>

          <div className={styles.educacaoCategoria}>
            <h3 className={styles.categoriaTitle}>Cursos Concluídos</h3>
            <div className={styles.categoriaContent}>
              <CertificadoItem
                titulo="Harvard University: CS50x Introdução à Ciência da Computação"
                descricao="Orgulhoso por ter concluído o CS50x de Harvard, uma das mais desafiadoras e gratificantes introduções à ciência da computação. O curso me levou de conceitos fundamentais, como o sistema binário e algoritmos, a projetos práticos de desenvolvimento de software e web. Finalizei com sucesso todos os trabalhos propostos."
                imagem="/certificados/CS50x.png"
                index={2}
              />
              <CertificadoItem
                titulo="Curso do Google - Análise de Dados"
                descricao="Este programa intensivo, ministrado por especialistas do Google, me proporcionou uma base sólida no mundo da análise de dados. Aprendi a identificar o ciclo de vida dos dados, a importância da tomada de decisões baseada em dados e as principais ferramentas e metodologias utilizadas por analistas de dados no dia a dia."
                imagem="/certificados/googDados.jpeg"
                index={3}
              />
              <CertificadoItem
                titulo="Santander - Liderança e Performance"
                descricao="O treinamento de 8 horas explorou como a estratégia, a tecnologia e o fator humano se unem para criar equipes vencedoras. Adquiri conhecimentos sobre como aplicar essa mentalidade de alta performance para otimizar processos, motivar equipes e acelerar resultados no ambiente de trabalho."
                imagem="/certificados/SantanderLidereança.jpg"
                index={4}
              />
              <CertificadoItem
                titulo="AWS Academy Graduate - Cloud Foundations"
                descricao="Este programa me proporcionou um entendimento detalhado dos conceitos da nuvem AWS, incluindo sua infraestrutura global, serviços essenciais, segurança, arquitetura e modelos de precificação. Adquiri o conhecimento fundamental para articular os benefícios da nuvem AWS e tomar decisões informadas sobre soluções baseadas em seus principais serviços."
                imagem="/certificados/aws.png"
                index={5}
              />
              <CertificadoItem
                titulo="Matheus Fraga - Full Stack, Node e React"
                descricao="Finalizei com sucesso o curso Projeto Completo da Udemy, que me proporcionou uma imersão prática no desenvolvimento de software. Durante as 25.5 horas de curso, apliquei conceitos de back-end, front-end e mobile para construir uma aplicação funcional."
                imagem="/certificados/MatheusFraga-React-Next-Node-ReactNative.jpg"
                index={6}
              />
            </div>
          </div>
        </div>
      </div>

      <Contato
        email="santospefelipe@gmail.com"
        linkedin="https://www.linkedin.com/in/felipe-santos-pe/"
        instagram="https://www.instagram.com/felipe.santos.pe/"
        copyright="© 2025 Felipe Santos"
      />
    </div>
  );
}
