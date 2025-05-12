// src/hooks/useUserBeerData.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import {UserBeerData, getUserDataForBeer, updateUserDataForBeer, USER_DATA_KEY} from '@/lib/localStorageUtils';

export const useUserBeerData = (beerId: number | string) => {
    const idStr = beerId.toString();
    const [data, setData] = useState<UserBeerData | undefined>(() => {
        if (typeof window !== 'undefined') {
            return getUserDataForBeer(idStr);
        }
        return undefined;
    });

    useEffect(() => {
        const initialData = getUserDataForBeer(idStr);
        setData(initialData);

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === USER_DATA_KEY) {
                 setData(getUserDataForBeer(idStr));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);

    }, [idStr]);

    const updateData = useCallback((updates: Partial<UserBeerData>) => {
        if (typeof window !== 'undefined') {
            updateUserDataForBeer(idStr, updates);
            setData(prevData => ({ ...(prevData || {}), ...updates }));
        }
    }, [idStr]);

    const toggleFavorite = useCallback(() => {
        const currentIsFavorite = data?.isFavorite || false;
        updateData({ isFavorite: !currentIsFavorite });
    }, [data, updateData]);

    return {
        isFavorite: !!data?.isFavorite,
        rating: data?.rating,
        notes: data?.notes,
        updateData,
        toggleFavorite,
    };
};