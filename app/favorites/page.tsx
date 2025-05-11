"use client";
import React, { useState, useEffect } from 'react';
import { Beer } from '@/types';
import { fetchBeers } from '@/lib/api';
import { getAllUserData } from '@/lib/localStorageUtils';
import BeerGallery from '@/components/beer/BeerGallery';

const FavoritesPage = () => {
    const [favoriteBeers, setFavoriteBeers] = useState<Beer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            setIsLoading(true);
            const allUserData = getAllUserData();
            const favoriteIds = Object.entries(allUserData)
                .filter(([id, data]) => data.isFavorite)
                .map(([id]) => id);

            if (favoriteIds.length > 0) {
                const beers = await fetchBeers({ ids: favoriteIds.join('|') });
                setFavoriteBeers(beers);
            } else {
                setFavoriteBeers([]);
            }
            setIsLoading(false);
        };
        loadFavorites();
    }, []);

    if (isLoading) return <p>Loading your favorite brews...</p>;

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-beer-jonquil">Your Favorite Beers</h1>
            {favoriteBeers.length > 0 ? (
                <BeerGallery beers={favoriteBeers} />
            ) : (
                <p className="text-center text-beer-timberwolf/80 dark:text-beer-cafe-noir/80">
                    You have not marked any beers as favorites yet!
                </p>
            )}
        </main>
    );
};
export default FavoritesPage;