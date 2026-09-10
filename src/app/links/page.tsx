'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLoadingState } from '../../hooks/useLoadingState';
import { LINKEDIN_PROFILE_URL, GITHUB_URL, INSTAGRAM_URL, EMAIL } from '../../lib/social';

type LinkItem = {
  title: string;
  subtitle: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
};

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H8M17 7V16" />
  </svg>
);

const links: LinkItem[] = [
  {
    title: 'Portfólio',
    subtitle: 'Sobre mim, habilidades e experiência',
    href: '/home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
        <path d="M9 21v-7h6v7" />
      </svg>
    ),
  },
  {
    title: 'Projetos',
    subtitle: 'Trabalhos e cases que desenvolvi',
    href: '/projetos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 4v5" />
      </svg>
    ),
  },
  {
    title: 'Currículo',
    subtitle: 'Baixe meu CV em PDF',
    href: '/CV2026v3.pdf',
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v5h5" />
        <path d="M19 8v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8l5 5Z" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    subtitle: 'Conecte-se comigo profissionalmente',
    href: LINKEDIN_PROFILE_URL,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    title: 'GitHub',
    subtitle: 'Veja meu código e repositórios',
    href: GITHUB_URL,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
      </svg>
    ),
  },
  {
    title: 'Instagram',
    subtitle: 'Acompanhe meu dia a dia',
    href: INSTAGRAM_URL,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'E-mail',
    subtitle: EMAIL,
    href: `mailto:${EMAIL}`,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  const { isLoading } = useLoadingState();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(`.${styles.profile}`, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
        .from(
          `.${styles.featured}`,
          { y: 24, opacity: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.35'
        )
        .from(
          `.${styles.linkCard}`,
          { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <main
      ref={containerRef}
      className={`${styles.page} ${isLoading ? styles.hidden : styles.visible}`}
    >
      <div className={styles.card}>
        <section className={styles.profile}>
          <div className={styles.avatar}>
            <Image src="/Me.png" alt="Felipe P. dos Santos" width={120} height={120} quality={100} />
          </div>
          <h1 className={styles.name}>Felipe P. dos Santos</h1>
          <p className={styles.role}>Desenvolvedor Full Stack Pleno</p>

          <div className={styles.socials}>
            <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
              </svg>
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="E-mail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3.5 7 8.5 6 8.5-6" />
              </svg>
            </a>
          </div>
        </section>

        <Link href="/home" className={styles.featured}>
          <div className={styles.featuredOverlay} />
          <div className={styles.featuredContent}>
            <span className={styles.featuredTitle}>Portfólio Completo</span>
            <span className={styles.featuredSubtitle}>
              Web, Cloud, IA & Automação — de Curitiba para produtos que escalam.
            </span>
          </div>
        </Link>

        <div className={styles.links}>
          {links.map((item) =>
            item.external ? (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={styles.linkCard}>
                <span className={styles.linkIcon}>{item.icon}</span>
                <span className={styles.linkText}>
                  <span className={styles.linkTitle}>{item.title}</span>
                  <span className={styles.linkSubtitle}>{item.subtitle}</span>
                </span>
                <span className={styles.linkArrow}><IconArrow /></span>
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={styles.linkCard}>
                <span className={styles.linkIcon}>{item.icon}</span>
                <span className={styles.linkText}>
                  <span className={styles.linkTitle}>{item.title}</span>
                  <span className={styles.linkSubtitle}>{item.subtitle}</span>
                </span>
                <span className={styles.linkArrow}><IconArrow /></span>
              </Link>
            )
          )}
        </div>

        <p className={styles.copyright}>© 2026 Felipe Santos</p>
      </div>
    </main>
  );
}