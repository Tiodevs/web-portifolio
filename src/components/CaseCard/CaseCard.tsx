'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy } from '@/data/cases';
import { CaseCover } from '../CaseCover/CaseCover';
import styles from './CaseCard.module.scss';

type CaseCardProps = {
  item: CaseStudy;
  featured?: boolean;
};

export default function CaseCard({ item, featured = false }: CaseCardProps) {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const href = `/projetos/${item.slug}`;

  return (
    <article
      className={`${styles.card} ${featured ? styles.featured : ''} project-card-item`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height,
        });
      }}
      onMouseLeave={() => setPointer({ x: 0.5, y: 0.5 })}
    >
      <div className={styles.info}>
        <div className={styles.infoText}>
          <p className={styles.eyebrow}>
            {item.company} · {item.period}
          </p>
          <h3>{item.title}</h3>
          <span className={styles.subtitle}>{item.role}</span>
          {item.metrics.length > 0 && (
            <ul className={styles.metrics}>
              {item.metrics.slice(0, 3).map((metric) => (
                <li key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </li>
              ))}
            </ul>
          )}
          <p>{item.summary}</p>
        </div>
        <div className={styles.buttonContainer}>
          <Link href={href} className={styles.button}>
            Ver case
          </Link>
          {item.confidential && (
            <span className={styles.badge}>Sem prints internos</span>
          )}
          {item.github && (
            <Link href={item.github} className={styles.button2} target="_blank" rel="noopener noreferrer">
              <Image src="/iconGit.svg" alt={`GitHub de ${item.title}`} width={24} height={24} className={styles.icon} />
            </Link>
          )}
        </div>
      </div>
      <Link href={href} className={styles.visual} aria-label={`Abrir case ${item.title}`}>
        {item.image && !item.confidential ? (
          <Image src={item.image} alt={`Capa de ${item.title}`} width={626} height={500} />
        ) : (
          <CaseCover
            theme={item.coverTheme}
            title={item.title}
            company={item.company}
            pointer={pointer}
          />
        )}
      </Link>
    </article>
  );
}
