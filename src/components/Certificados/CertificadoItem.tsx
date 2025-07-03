import Image from 'next/image';
import styles from './CertificadoItem.module.css';

interface CertificadoItemProps {
  titulo: string;
  descricao: string;
  imagem?: string;
  index?: number;
  progresso?: number; // Valor de 0 a 100
  status?: string; // Texto personalizado do status
}

export function CertificadoItem({ 
  titulo, 
  descricao, 
  imagem, 
  index = 0, 
  progresso = 100, 
  status = "Concluído" 
}: CertificadoItemProps) {
  return (
    <div 
      className={`${styles.certificadoCard} curso-item`} 
      data-index={index}
      data-progress={progresso < 100 ? 'incomplete' : 'complete'}
    >
      <div className={styles.cardContainer}>
        {imagem && (
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={imagem}
                alt={`Certificado de ${titulo}`}
                width={400}
                height={250}
                quality={100}
                className={styles.certificadoImage}
              />
            </div>
            <div className={styles.imageOverlay}></div>
          </div>
        )}
        
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <h3 className={styles.titulo} data-testid="certificado-titulo">{titulo}</h3>
            <div className={styles.badge}>
              <span>{progresso === 100 ? 'Certificado' : 'Em Andamento'}</span>
            </div>
          </div>
          
          <p className={styles.descricao} data-testid="certificado-descricao">{descricao}</p>
          
          <div className={styles.footer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
            <span className={styles.statusText}>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 