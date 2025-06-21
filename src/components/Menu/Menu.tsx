'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Menu.module.scss';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useLoadingState } from '../../hooks/useLoadingState';

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { isLoading } = useLoadingState();
    
    const menuItems = [
        { name: 'Home', path: '/home' },
        { name: 'Projetos', path: '/projetos' },
        { name: 'Curriculo', path: '/cv25.pdf' },
    ];

    useEffect(() => {
        // Animação simples: menu desliza de cima para baixo
        gsap.from(menuRef.current, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }, [isLoading]);

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        
        // Se for o currículo, abre em nova aba
        if (path === '/cv25.pdf') {
            window.open(path, '_blank');
            return;
        }
        
        // Para outras páginas, verifica se já estamos na mesma página
        if (pathname === path) {
            // Se já estamos na mesma página, força um refresh
            window.location.href = path;
        } else {
            // Se for uma página diferente, usa o router
            window.location.href = path;
        }
    };

    // Se isLoading for true, retorna null
    if (isLoading) {
        return null;
    }

    return (
        <nav ref={menuRef} className={styles.nav}>
            <div className={styles.menuDesktop}>
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={
                            `${styles.menuItem} ` +
                            (pathname.startsWith(item.path) ? styles.active : '')
                        }
                    >
                        {item.name}
                    </button>
                ))}
            </div>
            <button
                className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menu"
            >
                <span className={styles.hamburger}></span>
                <span className={styles.hamburger}></span>
            </button>
            {isOpen && (
                <div className={styles.menuMobile}>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={styles.menuItem}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}
