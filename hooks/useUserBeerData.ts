"use client";
import { useState, useEffect, useCallback } from 'react';
import { UserBeerData, getUserDataForBeer, updateUserDataForBeer } from '@/lib/localStorageUtils';

export const useUserBeerData = (beerId: number | string) => {
    const idStr = beerId.toString();
    const [data, setData] = useState<UserBeerData | undefined>(undefined);

    useEffect(() => {
        setData(getUserDataForBeer(idStr));
    }, [idStr]);

    const updateData = useCallback((updates: Partial<UserBeerData>) => {
        updateUserDataForBeer(idStr, updates);
        setData(prevData => ({ ...(prevData || {}), ...updates }));
    }, [idStr]);

    const toggleFavorite = useCallback(() => {
        const currentIsFavorite = data?.isFavorite || false;
        updateData({ isFavorite: !currentIsFavorite });
    }, [data, updateData]);


    return {
        isFavorite: !!data?.isFavorite,
        rating: data?.rating,
        notes: data?.notes,
        toggleFavorite,
    };
};