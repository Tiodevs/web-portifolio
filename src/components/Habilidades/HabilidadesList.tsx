import styles from './HabilidadesList.module.scss';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
  const habilidadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Configurar animações para cada habilidade
    habilidadeRefs.current.forEach((habilidadeRef, index) => {
      if (!habilidadeRef) return;

      const textRef1 = habilidadeRef.querySelector('.texto-original') as HTMLElement;
      const textRef2 = habilidadeRef.querySelector('.texto-hover') as HTMLElement;

      if (!textRef1 || !textRef2) return;

      // Configurações iniciais do segundo texto
      gsap.set(textRef2, {
        y: '100%',
        rotationX: -90,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 1,
        pointerEvents: 'none'
      });

      // Criar timeline para animação
      const tl = gsap.timeline({ paused: true });

      tl.to(textRef1, {
        duration: 0.4,
        y: '-100%',
        rotationX: 90,
        ease: 'power2.inOut'
      })
        .to(textRef2, {
          duration: 0.4,
          y: '0%',
          rotationX: 0,
          ease: 'power2.inOut'
        }, '<');

      // Adicionar event listeners
      habilidadeRef.addEventListener('mouseenter', () => {
        tl.play();
      });

      habilidadeRef.addEventListener('mouseleave', () => {
        tl.reverse();
      });
    });
  }, [habilidades]);

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
              ref={(el) => { habilidadeRefs.current[index] = el; }}
              className={`${styles.habilidadeItem} ${nomeHabilidade === habilidadeDestaque ? styles.habilidadeDestaque : ''}`}
              data-testid="habilidade-item"
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
              <div className={styles.habilidadeTextoContainer}>
                <span className={`${styles.habilidadeTexto} texto-original`}>
                  {nomeHabilidade}
                </span>
                <span className={`${styles.habilidadeTexto} texto-hover`}>
                  {nomeHabilidade}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 