'use client';

import { useCallback, useEffect, useState } from 'react';

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

    const setGlobalLoading = useCallback((loading: boolean) => {
        globalLoadingState = loading;
        listeners.forEach(listener => listener(loading));
    }, []);

    return { isLoading, setGlobalLoading };
};
