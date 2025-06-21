import styles from './ExperienciaItem.module.scss';

interface ExperienciaItemProps {
  titulo: string;
  periodo: string;
  descricao: string;
}

export function ExperienciaItem({ titulo, periodo, descricao }: ExperienciaItemProps) {
  return (
    <div className={styles.experienciasItem}>
      <div className={styles.experienciasItemheader}>
        <h3 className={styles.experienciasItemtitle}>{titulo}</h3>
        <p className={styles.experienciasItemsubtitle}>{periodo}</p>
      </div>
      <p className={styles.experienciasItemdescription}>{descricao}</p>
    </div>
  );
} 