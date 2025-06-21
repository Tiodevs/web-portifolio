'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import styles from './not-found.module.scss';

import { useLoadingState } from '../hooks/useLoadingState';

export default function NotFound() {

    const {isLoading} = useLoadingState();

    useEffect(() => {
        gsap.from('.error-content', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }, []);

    return (
        <div className={`${styles.container} ${isLoading ? styles.hidden : styles.visible}`}>
            <div className={`${styles.content} error-content`}>
                <h2 className={styles.subtitle}>Página não encontrada</h2>
                <p className={styles.description}>
                    Caso queira voltar para a página inicial, clique no botão abaixo.
                </p>
                <a href="/home" className={styles.button}>
                    Voltar para Home
                </a>
            </div>
        </div>
    );
} 