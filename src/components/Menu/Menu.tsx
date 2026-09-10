'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Menu.module.scss';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useLoadingState } from '../../hooks/useLoadingState';
import { CV_PATH } from '../../lib/social';

const menuItems = [
  { name: 'Home', href: '/home' },
  { name: 'Projetos', href: '/projetos' },
  { name: 'Experiência', href: '/home#experiencia' },
  { name: 'Contato', href: '/home#contato' },
  { name: 'CV', href: CV_PATH, external: true },
];

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { isLoading } = useLoadingState();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.from(menuRef.current, {
      y: reduced ? 0 : -24,
      opacity: 0,
      duration: reduced ? 0 : 0.45,
      ease: 'power2.out',
    });
  }, [isLoading]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname.startsWith('/links') || isLoading) {
    return null;
  }

  return (
    <nav ref={menuRef} className={styles.nav} aria-label="Principal">
      <div className={styles.menuDesktop}>
        {menuItems.map((item) => {
          const active = !item.external && (
            item.href === '/home'
              ? pathname === '/home'
              : pathname === item.href || pathname.startsWith(`${item.href}/`)
          );

          if (item.external) {
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuItem}
              >
                {item.name}
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.menuItem} ${active ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <button
        className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
      >
        <span className={styles.hamburger}></span>
        <span className={styles.hamburger}></span>
      </button>
      {isOpen && (
        <div className={styles.menuMobile}>
          {menuItems.map((item) => (
            item.external ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
}
