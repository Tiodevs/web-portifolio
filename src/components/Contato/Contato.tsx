import Image from 'next/image';
import styles from './Contato.module.scss';

interface ContatoProps {
  email: string;
  linkedin: string;
  instagram: string;
  copyright: string;
}

export function Contato({ email, linkedin, instagram, copyright }: ContatoProps) {
  return (
    <div className={styles.contato}>
      <div className={styles.imgFooter}>
        <Image 
          src="/me2.png" 
          alt="Foto do felipe o dono do portifolio" 
          width={429} 
          height={323} 
          quality={100} 
        />
      </div>
      <h2 className={styles.contatoTitle}>Contate-me</h2>
      <div className={styles.contatoLinks}>
        <a href={`mailto:${email}`} target="_blank">
          <img src="/iconEmail.svg" alt="Meu email" /> 
          {email}
        </a>
        <a href="https://www.linkedin.com/in/felipe-p-santos-a1a3b9207/" target="_blank">
          <img src="/iconLinkedin.svg" alt="Meu linkedin" />
        </a>
        <a href="https://www.instagram.com/somente_ofelipe/" target="_blank">
          <img src="/IconIntagram.svg" alt="Meu Intagram" />
        </a>
      </div>
      <p>{copyright}</p>
    </div>
  );
} 