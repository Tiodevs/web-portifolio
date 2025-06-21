import styles from './HabilidadesList.module.scss';

interface HabilidadesListProps {
  titulo: string;
  habilidades: string[];
  habilidadeDestaque?: string;
}

export function HabilidadesList({ titulo, habilidades, habilidadeDestaque }: HabilidadesListProps) {
  return (
    <div className={styles.habilidadesContainer}>
      <h3>{titulo}</h3>
      <div className={styles.habilidadesList}>
        {habilidades.map((habilidade, index) => (
          <p 
            key={index}
            className={habilidade === habilidadeDestaque ? styles.habilidadeDestaque : ''}
          >
            {habilidade}
          </p>
        ))}
      </div>
    </div>
  );
} 