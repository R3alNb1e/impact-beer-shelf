import React from 'react';
import { Beer } from '@/types';
import BeerCard from './BeerCard';

interface BeerGalleryProps {
    beers: Beer[];
}

const BeerGallery: React.FC<BeerGalleryProps> = ({ beers }) => {
    if (!beers || beers.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600 dark:text-gray-400">No beers to display at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {beers.map((beer) => (
                <BeerCard key={beer.id} beer={beer} />
            ))}
        </div>
    );
};

export default BeerGallery;