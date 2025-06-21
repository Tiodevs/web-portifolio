'use client';

import { useState, useEffect } from 'react';

let globalLoadingState = true;
let listeners: ((loading: boolean) => void)[] = [];

export const useLoadingState = () => {
    const [isLoading, setIsLoading] = useState(globalLoadingState);

    useEffect(() => {
        const updateState = (loading: boolean) => {
            setIsLoading(loading);
        };

        listeners.push(updateState);

        return () => {
            listeners = listeners.filter(listener => listener !== updateState);
        };
    }, []);

    const setGlobalLoading = (loading: boolean) => {
        globalLoadingState = loading;
        listeners.forEach(listener => listener(loading));
    };

    return { isLoading, setGlobalLoading };
}; 