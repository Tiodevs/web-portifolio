'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLoadingState } from '../hooks/useLoadingState';
import styles from './LoadingOverlay.module.scss';

export function LoadingOverlay() {
    const [loadingText, setLoadingText] = useState('Carregando...');
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const { isLoading, setGlobalLoading } = useLoadingState();

    // Garante que o componente só renderize no cliente
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Efeito para controlar o loading apenas uma vez no carregamento inicial
    useEffect(() => {
        if (!isMounted) return;

        // Garante que o loading apareça imediatamente
        setGlobalLoading(true);
        setLoadingText('Carregando...');

        // Tempo de carregamento para uma experiência mais suave
        const timer = setTimeout(() => {
            setGlobalLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [isMounted]); // Removido pathname e setGlobalLoading das dependências

    // Não renderiza nada até o componente estar montado
    if (!isMounted) {
        return null;
    }

    if (!isLoading) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>{loadingText}</p>
            </div>
        </div>
    );
} 