import Image from 'next/image';
import styles from './CertificadoItem.module.css';

interface CertificadoItemProps {
  titulo: string;
  descricao: string;
  imagem?: string;
}

export function CertificadoItem({ titulo, descricao, imagem }: CertificadoItemProps) {
  return (
    <div className={styles.certificadoItem}>
      <div className={styles.certificadoContent}>
        <h3 className={styles.certificadoTitulo}>{titulo}</h3>
        <p className={styles.certificadoDescricao}>{descricao}</p>
      </div>
      {imagem && (
        <div className={styles.certificadoImagem}>
          <Image
            src={imagem}
            alt={`Certificado de ${titulo}`}
            width={300}
            height={200}
            quality={100}
          />
        </div>
      )}
    </div>
  );
} 