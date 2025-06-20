'use client';

import Link from "next/link";
import styles from "./page.module.css";
import ProjectCard from "@/app/components/ProjectCard";
import { Contato } from "@/app/components/Contato";
import { HabilidadesList } from "@/app/components/HabilidadesList";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const capaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(pageRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    })
    .from(capaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2")
    .from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .from(descriptionRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");
  }, []);

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.projects}>
        <div className={styles.project}>
          <div className={styles.projectCapa} ref={capaRef}>
            <img src="/projcts/01/Capa02.png" alt="Capa do projeto" />
          </div>
          <h2 className={styles.projectsTitle} ref={titleRef}>IA CHAT</h2>
          <p className={styles.projectsDescription} ref={descriptionRef}>
            Desenvolvi uma solução completa de IA que gera especificações funcionais para consultores SAP, automatizando tarefas que antes levavam horas e reduzindo esse tempo para poucos minutos. Atuei em todas as frentes do projeto — do backend ao frontend, além da infraestrutura e DevOps — garantindo performance, escalabilidade e uma experiência de uso fluida.
          </p>
          <div className={styles.projectsContainer}>

            <div className={styles.projectsContainerList}>
              <HabilidadesList
                titulo="Frontend"
                habilidades={[
                  "Figma",
                  "Next.js",
                  "CSS",
                  "Typescript",
                  "Vercel",
                  "GSAP",
                  "Git",
                ]}
                habilidadeDestaque="Next.js"
              />
              <HabilidadesList
                titulo="Backend"
                habilidades={[
                  "Node.js",
                  "Express",
                  "Prisma",
                  "PostgreSQL",
                  "Railway",
                  "Supabase",
                  "Yup",
                  "Integração com IA",
                  "Desenvolvimento de IA",
                  "Git",
                ]}
                habilidadeDestaque="Node.js"
              />
            </div>

            <div className={styles.projectsContainerTelas}>
                <img src="/projcts/01/Tela01.png" alt="Tela do projeto" />
                <img src="/projcts/01/Tela02.png" alt="Tela do projeto" />
                <img src="/projcts/01/Tela03.png" alt="Tela do projeto" />
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
