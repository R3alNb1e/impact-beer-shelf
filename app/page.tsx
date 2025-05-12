"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useMemo
import { Beer, BeerFilters } from '@/types';
import { fetchBeers } from '@/lib/api';
import BeerGallery from '@/components/beer/BeerGallery';
import HeroSection from '@/components/layout/HeroSection';
import FilterControls from '@/components/filters/FilterControls';
import { motion } from 'framer-motion';
import { Beer as BeerIcon } from 'lucide-react';

export default function Page() {
    const [beers, setBeers] = useState<Beer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState<BeerFilters>({});
    const [currentPage, setCurrentPage] = useState(1);
    const beersPerPage = 20;

    const loadBeers = useCallback(async (filtersToLoad: BeerFilters, page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const params = { ...filtersToLoad, page, per_page: beersPerPage };
            console.log("Fetching beers with params:", params);
            const fetchedBeers = await fetchBeers(params);
            setBeers(fetchedBeers);
        } catch (err) {
            setError("Failed to load beers. The brewery might be taking a break!");
            console.error(err);
            setBeers([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const memoizedInitialFilters = useMemo(() => activeFilters, [activeFilters]);

    useEffect(() => {
        loadBeers(activeFilters, currentPage);
    }, [activeFilters, currentPage, loadBeers]);

    const handleApplyFilters = useCallback((newFilters: BeerFilters) => {
        setActiveFilters(newFilters);
        setCurrentPage(1);
    }, []);

    return (
        <main className="w-full">
            <HeroSection />

            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <FilterControls
                    initialFilters={memoizedInitialFilters}
                    onApplyFilters={handleApplyFilters}
                    isLoading={isLoading}
                />

                {isLoading && (
                    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-beer-timberwolf dark:text-beer-cafe-noir">
                        <motion.div
                            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-12 h-12 mb-4 text-beer-jonquil"
                        >
                            <BeerIcon size={48} />
                        </motion.div>
                        <p className="text-lg">Searching for brews...</p>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="text-center py-10 bg-beer-timberwolf/70 dark:bg-beer-cafe-noir/70 p-8 rounded-lg shadow-xl mt-8 border border-red-500/50">
                        <h2 className="text-2xl font-semibold mb-3 text-red-600 dark:text-red-400">Oops! Could Not Load Beers</h2>
                        <p className="text-beer-chamoisee dark:text-beer-beaver mb-6">{error}</p>
                    </div>
                )}

                {!isLoading && !error && beers.length > 0 && (
                    <BeerGallery beers={beers} />
                )}

                {!isLoading && !error && beers.length === 0 && (
                    <div className="text-center py-10  p-8 rounded-lg shadow-md mt-8">
                        <h2 className="text-2xl font-semibold mb-3 text-beer-cafe-noir dark:text-beer-timberwolf">No Beers Found</h2>
                        <p className="text-beer-chamoisee dark:text-beer-beaver">
                            Try adjusting your filters or check back later!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}