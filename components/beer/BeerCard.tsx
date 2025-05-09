"use client";

import React from 'react';
import Image from 'next/image';
import { Beer } from '@/types';

interface BeerCardProps {
    beer: Beer;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
    let imageUrlToDisplay: string | null = null;

    // Still need to put the size in and make sure that the gallery only loads when all the cards have the img correctly
    if (beer.image) {
        imageUrlToDisplay = `https://punkapi.online/v3/images/${beer.image}`;
    }

    console.log(`[BeerCard] Beer: "${beer.name}", API image field: "${beer.image}", Constructed URL: "${imageUrlToDisplay}"`);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
            <div className="block group">
                <div className="relative w-full h-64 sm:h-72 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {imageUrlToDisplay ? (
                        <Image
                            src={imageUrlToDisplay}
                            alt={beer.name || 'Beer image'}
                            layout="fill"
                            objectFit="contain"
                            className="p-4 group-hover:scale-105 transition-transform duration-300"
                            unoptimized={false}
                            onError={(e) => {
                                console.error(`Failed to load image for ${beer.name}: ${imageUrlToDisplay}`, (e.target as HTMLImageElement).src);
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 p-4 text-center">
                            <span>No Image Available</span>
                        </div>
                    )}
                </div>
                <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-400 mb-1 truncate" title={beer.name}>
                        {beer.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden text-ellipsis" title={beer.tagline}>
                        {beer.tagline}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                        First Brewed: {beer.first_brewed}
                    </p>
                    <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                ABV: {beer.abv !== null && beer.abv !== undefined ? `${beer.abv}%` : 'N/A'}
                            </span>
                            {beer.ibu !== null && beer.ibu !== undefined && (
                                <span className="text-gray-500 dark:text-gray-400">IBU: {beer.ibu}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeerCard;