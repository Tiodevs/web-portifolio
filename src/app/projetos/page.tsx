'use client';

import { useMemo, useState } from 'react';
import styles from './page.module.css';
import CaseCard from '@/components/CaseCard/CaseCard';
import { Contato } from '../../components/Contato/Contato';
import { cases } from '@/data/cases';
import { useLoadingState } from '../../hooks/useLoadingState';

const FILTERS = ['Todos', 'Produto', 'IA', 'Web', 'SaaS', 'Cloud'] as const;

export default function ProjetosPage() {
  const { isLoading } = useLoadingState();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Todos');

  const visible = useMemo(
    () => (filter === 'Todos' ? cases : cases.filter((item) => item.tags.includes(filter))),
    [filter],
  );

  return (
    <div className={`${styles.page} ${isLoading ? styles.hidden : styles.visible}`}>
      <div className={styles.projects}>
        <div className={styles.project}>
          <h1 className={styles.projectsTitle}>Projetos</h1>
          <p className={styles.projectsDescription}>
            Cases de produto primeiro. Projetos da ASSUMTEK aparecem sem interface interna.
          </p>
          <div className={styles.filters} role="tablist" aria-label="Filtrar projetos">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={`${styles.filter} ${filter === item ? styles.filterActive : ''}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className={styles.projectsContainer}>
            {visible.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Contato />
    </div>
  );
}
