'use client';

import { useLoadingState } from '../hooks/useLoadingState';
import styles from './ContentWrapper.module.scss';

interface ContentWrapperProps {
    children: React.ReactNode;
}

export function ContentWrapper({ children }: ContentWrapperProps) {
    const { isLoading } = useLoadingState();

    return (
        <div className={`${styles.contentWrapper} ${isLoading ? styles.hidden : styles.visible}`}>
            {children}
        </div>
    );
} 