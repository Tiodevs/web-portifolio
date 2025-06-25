'use client';

import Link from "next/link";
import styles from "./page.module.css";
import ProjectCard from "@/components/Projetos/ProjectCard";
import { Contato } from "@/components/Contato/Contato";
import { HabilidadesList } from "@/components/Habilidades/HabilidadesList";
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
            <img src="/projcts/03/Capa02.png" alt="Capa do projeto" />
          </div>
          <h2 className={styles.projectsTitle} ref={titleRef}>Sentier - Landing Page</h2>
          <p className={styles.projectsDescription} ref={descriptionRef}>
          Desenvolvi uma landing page para o Sentier, com um design moderno e responsivo. O site foi criado com Next.js e node.js, a pagina foi feita para apresentar as informações da empresa e os produtos que ela oferece.
          </p>
          <div className={styles.projezctsContainer}>

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
                  "Git",
                ]}
                habilidadeDestaque="Node.js"
              />
            </div>

            <div className={styles.projectsContainerTelas}>
                <img src="/projcts/03/Tela01.png" alt="Tela do projeto" />
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
