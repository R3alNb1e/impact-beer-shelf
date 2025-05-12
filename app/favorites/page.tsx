"use client";

import React, { useState, useEffect } from 'react';
import { Beer } from '@/types';
import { fetchBeers } from '@/lib/api';
import { getAllUserData } from '@/lib/localStorageUtils';
import BeerGallery from '@/components/beer/BeerGallery';

const FavoritesPage = () => {
    const [favoriteBeers, setFavoriteBeers] = useState<Beer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFavorites = async () => {
            console.log("FAV PAGE: Effect Running");
            setIsLoading(true);
            setError(null);
            const allUserData = getAllUserData();
            console.log("FAV PAGE: Raw Local Storage Data:", allUserData);

            const favoriteIds = Object.entries(allUserData)
                .filter(([_id, data]) => data?.isFavorite === true)
                .map(([id]) => id);
            console.log("FAV PAGE: Filtered Favorite IDs:", favoriteIds);

            if (favoriteIds.length > 0) {
                try {
                    const params = {
                        ids: favoriteIds.join(','),
                        page: 1,
                        per_page: Math.max(10, favoriteIds.length)
                    };
                    console.log("FAV PAGE: Fetching beers with params:", params);
                    const beers = await fetchBeers(params);
                    console.log("FAV PAGE: Beers received from API:", beers);
                    setFavoriteBeers(beers);
                } catch (err) {
                    console.error("FAV PAGE: Error fetching beers:", err);
                    if (err instanceof Error) {
                        setError(`Could not load your favorite beers. ${err.message}`);
                    } else {
                        setError("Could not load your favorite beers. An unknown error occurred.");
                    }
                    setFavoriteBeers([]);
                }
            } else {
                console.log("FAV PAGE: No favorite IDs found, setting empty array.");
                setFavoriteBeers([]);
            }
            setIsLoading(false);
        };

        loadFavorites();
    }, []);

    if (isLoading) {
        return <p className="text-center mt-8">Loading your favorite brews...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-beer-jonquil">Your Favorite Beers</h1>
            {favoriteBeers.length > 0 ? (
                <BeerGallery beers={favoriteBeers} />
            ) : (
                <p className="text-center text-beer-timberwolf/80 dark:text-beer-cafe-noir/80">
                    You have not marked any beers as favorites yet, or they could not be loaded.
                </p>
            )}
        </main>
    );
};

export default FavoritesPage;