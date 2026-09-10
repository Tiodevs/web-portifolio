import Link from 'next/link';
import styles from './ExperienciaItem.module.scss';

interface ExperienciaItemProps {
  empresa: string;
  cargo: string;
  periodo: string;
  descricao?: string;
  bullets?: string[];
  caseSlug?: string;
  isLast?: boolean;
}

export function ExperienciaItem({
  empresa,
  cargo,
  periodo,
  descricao,
  bullets,
  caseSlug,
  isLast = false,
}: ExperienciaItemProps) {
  return (
    <div className={`${styles.timelineItem} ${isLast ? styles.lastItem : ''}`}>
      <div className={styles.timelineMarker}>
        <div className={styles.timelineDot}></div>
        {!isLast && <div className={styles.timelineLine}></div>}
      </div>
      <div className={styles.timelineContent}>
        <div className={styles.timelineCard}>
          <div className={styles.timelineHeader}>
            <div className={styles.timelineInfo}>
              <h3 className={styles.timelineTitle}>{empresa}</h3>
              <p className={styles.timelineCargo}>{cargo}</p>
            </div>
            <span className={styles.timelinePeriod}>{periodo}</span>
          </div>
          {bullets && bullets.length > 0 ? (
            <ul className={styles.timelineList}>
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.timelineDescription}>{descricao}</p>
          )}
          {caseSlug && (
            <Link href={`/projetos/${caseSlug}`} className={styles.caseLink}>
              Ver case
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
