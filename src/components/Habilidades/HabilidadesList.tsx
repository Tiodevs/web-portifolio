import styles from './HabilidadesList.module.scss';
import Image from 'next/image';

interface Habilidade {
  nome: string;
  imagem?: string;
  altImagem?: string;
}

interface HabilidadesListProps {
  titulo: string;
  habilidades: (string | Habilidade)[];
  habilidadeDestaque?: string;
  imagem?: string;
  altImagem?: string;
}

export function HabilidadesList({ 
  titulo, 
  habilidades, 
  habilidadeDestaque, 
  imagem, 
  altImagem 
}: HabilidadesListProps) {
  return (
    <div className={styles.habilidadesContainer}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h3>{titulo}</h3>
        </div>
      </div>
      <div className={styles.habilidadesList}>
        {habilidades.map((habilidade, index) => {
          const isObject = typeof habilidade === 'object';
          const nomeHabilidade = isObject ? habilidade.nome : habilidade;
          const imagemHabilidade = isObject ? habilidade.imagem : undefined;
          const altImagemHabilidade = isObject ? habilidade.altImagem : undefined;
          
          return (
            <div 
              key={index}
              className={`${styles.habilidadeItem} ${nomeHabilidade === habilidadeDestaque ? styles.habilidadeDestaque : ''}`}
            >
              {imagemHabilidade && (
                <div className={styles.habilidadeImagem}>
                  <Image 
                    src={imagemHabilidade} 
                    alt={altImagemHabilidade || nomeHabilidade} 
                    width={20} 
                    height={20} 
                    quality={100}
                  />
                </div>
              )}
              <span className={styles.habilidadeTexto}>
                {nomeHabilidade}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 