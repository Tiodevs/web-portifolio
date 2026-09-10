'use client';

import { useEffect, useState } from 'react';
import { useLoadingState } from '../../hooks/useLoadingState';
import styles from './LoadingOverlay.module.scss';

export function LoadingOverlay() {
    const [isMounted, setIsMounted] = useState(false);
    const { isLoading, setGlobalLoading } = useLoadingState();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setGlobalLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setGlobalLoading(false);
        }, 280);

        return () => clearTimeout(timer);
    }, [isMounted, setGlobalLoading]);

    if (!isMounted || !isLoading) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.loadingText}>Carregando...</p>
            </div>
        </div>
    );
}
