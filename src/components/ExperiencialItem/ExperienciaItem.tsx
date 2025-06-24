import styles from './ExperienciaItem.module.scss';

interface ExperienciaItemProps {
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
  isLast?: boolean;
}

export function ExperienciaItem({ empresa, cargo, periodo, descricao, isLast = false }: ExperienciaItemProps) {
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
          <p className={styles.timelineDescription}>{descricao}</p>
        </div>
      </div>
    </div>
  );
} 