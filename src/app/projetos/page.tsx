'use client';

import styles from "./page.module.css";
import ProjectCard from "@/components/Projetos/ProjectCard";
import { Contato } from "../../components/Contato/Contato";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLoadingState } from "../../hooks/useLoadingState";

export default function Home() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useLoadingState();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(projectsRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    })
      .from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.2")
      .from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")
      .from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
  }, [isLoading]);

  return (
    <div className={`${styles.page} ${isLoading ? styles.hidden : styles.visible}`}>
      <div className={styles.projects} ref={projectsRef}>
        <div className={styles.project}>
          <h2 className={styles.projectsTitle} ref={titleRef}>Meus projetos</h2>
          <p className={styles.projectsDescription} ref={descriptionRef}>
            Aqui está um pouco dos meus projetos mais recentes. Cada um deles reflete meu foco em soluções centradas no usuário e meu compromisso com a excelência em performance, segurança e resultados reais para o negócio.
          </p>
          <div className={styles.projectsContainer} ref={containerRef}>
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


        </div>
      </div>

      <Contato/>
    </div>
  );
}
