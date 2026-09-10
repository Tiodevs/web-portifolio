'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy } from '@/data/cases';
import { CaseCover } from '../CaseCover/CaseCover';
import { HabilidadesList } from '../Habilidades/HabilidadesList';
import { Contato } from '../Contato/Contato';
import styles from './CaseStudy.module.scss';

type CaseStudyViewProps = {
  item: CaseStudy;
};

export function CaseStudyView({ item }: CaseStudyViewProps) {
  return (
    <div className={styles.page}>
      <Link href="/projetos" className={styles.back}>
        ← Projetos
      </Link>

      <div className={styles.heroVisual}>
        {item.image && !item.confidential ? (
          <Image
            src={item.image}
            alt={`Capa de ${item.title}`}
            width={1200}
            height={640}
            className={styles.heroImage}
          />
        ) : (
          <CaseCover theme={item.coverTheme} title={item.title} company={item.company} />
        )}
      </div>

      <p className={styles.eyebrow}>
        {item.company} · {item.period} · {item.role}
      </p>
      <h1>{item.title}</h1>
      <p className={styles.lede}>{item.summary}</p>

      {item.confidential && (
        <p className={styles.note}>
          Interface omitida por confidencialidade. O case descreve o problema, o papel e o impacto — sem prints internos.
        </p>
      )}

      {item.metrics.length > 0 && (
        <ul className={styles.metrics}>
          {item.metrics.map((metric) => (
            <li key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
      )}

      <section className={styles.block}>
        <h2>Contexto</h2>
        <p>{item.context}</p>
      </section>
      <section className={styles.block}>
        <h2>Problema</h2>
        <p>{item.problem}</p>
      </section>
      <section className={styles.block}>
        <h2>O que eu fiz</h2>
        <p>{item.contribution}</p>
      </section>

      <div className={styles.stack}>
        <HabilidadesList titulo="Frontend" habilidades={item.stack.frontend} habilidadeDestaque={item.stack.frontend[0]} />
        <HabilidadesList titulo="Backend e entorno" habilidades={item.stack.backend} habilidadeDestaque={item.stack.backend[0]} />
      </div>

      <section className={styles.block}>
        <h2>Resultado</h2>
        <p>{item.result}</p>
      </section>

      {item.screens && item.screens.length > 0 && !item.confidential && (
        <div className={styles.screens}>
          {item.screens.map((screen) => (
            <Image
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              width={1200}
              height={800}
            />
          ))}
        </div>
      )}

      <div className={styles.actions}>
        {item.github && (
          <a href={item.github} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
            GitHub
          </a>
        )}
        {item.liveUrl && (
          <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
            Ver online
          </a>
        )}
      </div>

      <Contato />
    </div>
  );
}
