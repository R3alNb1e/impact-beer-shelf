"use client";

import React from 'react';
import Image from 'next/image';
import { Beer } from '@/types';
import { Heart, CalendarDays, Zap, Droplet, Percent } from 'lucide-react';
import {useUserBeerData} from "@/hooks/useUserBeerData";

export interface BeerCardProps {
    beer: Beer;
    isLarge?: boolean;
    variant?: 'default' | 'wide' | 'tall' | 'extraLarge';
}

const BeerCard: React.FC<BeerCardProps> = ({ beer, isLarge = false, variant = 'default' }) => {
    const { isFavorite, toggleFavorite } = useUserBeerData(beer.id);

    let imageUrlToDisplay: string | null = null;

    if (beer.image_url) {
        imageUrlToDisplay = beer.image_url;
    } else if (beer.image) {
        imageUrlToDisplay = `https://punkapi.online/v3/images/${beer.image}`;
    }

    const renderFavoriteButton = (baseClasses = "absolute top-2 right-2 z-20") => (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite();
            }}
            className={`${baseClasses} p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-beer-jonquil focus-visible:ring-offset-2 focus-visible:ring-offset-black/50`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            <Heart
                size={isLarge ? 24 : 18}
                className={`transition-all duration-200 ${
                    isFavorite ? 'fill-red-500 stroke-red-600' : 'fill-transparent stroke-current'
                }`}
            />
        </button>
    );


    if (isLarge && (variant === 'extraLarge' || variant === 'tall')) {
        return (
            <div className="relative bg-beer-cafe-noir rounded-xl shadow-2xl overflow-hidden h-full group transition-all duration-300 hover:shadow-beer-jonquil/30 hover:ring-2 hover:ring-beer-jonquil">
                {renderFavoriteButton("absolute top-3 right-3 z-20")}

                {imageUrlToDisplay ? (
                    <Image
                        src={imageUrlToDisplay}
                        alt={beer.name || 'Beer image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={process.env.NODE_ENV === 'development'}
                        priority={isLarge}
                        onError={(e) => {
                            console.error(`Failed to load image for ${beer.name}: ${imageUrlToDisplay}`, (e.target as HTMLImageElement).src);
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-beer-timberwolf/70 p-4 text-center bg-beer-cafe-noir/90">
                        <Droplet size={60} className="opacity-50 mb-3" />
                        <span className="text-lg">No Image Available</span>
                    </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-end
                                bg-gradient-to-t from-black/70 via-black/40 to-transparent
                                p-4 sm:p-5 md:p-6 group-hover:from-black/80 transition-all duration-300">
                    <h3
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-beer-jonquil transition-colors duration-300 drop-shadow-lg truncate"
                        title={beer.name}
                    >
                        {beer.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white mt-1 drop-shadow-md truncate" title={beer.tagline}>
                        {beer.tagline}
                    </p>
                    <div className="mt-2 flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                        {beer.abv && (
                            <div className="flex items-center text-white">
                                <Percent size={14} className="mr-1 text-beer-jonquil" />
                                <span className="font-medium">{beer.abv}% ABV</span>
                            </div>
                        )}
                        {beer.ibu && (
                            <div className="flex items-center text-white">
                                <Zap size={14} className="mr-1 text-beer-jonquil" />
                                <span className="font-medium">{beer.ibu} IBU</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (isLarge && variant === 'wide') {
        return (
            <div className="relative bg-beer-beaver dark:bg-beer-chamoisee/80 rounded-xl shadow-xl dark:shadow-beer-cafe-noir/40 overflow-hidden h-full group flex flex-col sm:flex-row transition-all duration-300 hover:shadow-beer-jonquil/20 hover:ring-2 hover:ring-beer-jonquil/70">
                {renderFavoriteButton("absolute top-3 right-3 z-20 text-beer-timberwolf dark:text-beer-cafe-noir bg-beer-chamoisee/40 dark:bg-beer-beaver/40 hover:bg-beer-chamoisee/60 dark:hover:bg-beer-beaver/60")}

                {/* Image Section */}
                <div className="relative w-full sm:w-2/5 md:w-1/3 h-48 sm:h-full bg-beer-chamoisee/50 dark:bg-beer-beaver/50 flex items-center justify-center overflow-hidden">
                    {imageUrlToDisplay ? (
                        <Image
                            src={imageUrlToDisplay}
                            alt={beer.name || 'Beer image'}
                            fill
                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw"
                            unoptimized={process.env.NODE_ENV === 'development'}
                            onError={(e) => {
                                console.error(`Failed to load image for ${beer.name}: ${imageUrlToDisplay}`, (e.target as HTMLImageElement).src);
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-beer-timberwolf/70 dark:text-beer-cafe-noir/70 p-4 text-center">
                            <Droplet size={48} className="opacity-50 mb-2" />
                            <span>No Image</span>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="w-full sm:w-3/5 md:w-2/3 p-5 flex flex-col justify-between text-beer-timberwolf dark:text-beer-cafe-noir">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-beer-jonquil transition-colors duration-300 truncate" title={beer.name}>
                            {beer.name}
                        </h3>
                        <p className="text-sm text-beer-timberwolf/80 dark:text-beer-cafe-noir/80 mt-1 mb-3" title={beer.tagline}>
                            {beer.tagline}
                        </p>
                        <div className="text-xs text-beer-timberwolf/70 dark:text-beer-cafe-noir/70 mb-3 flex items-center">
                            <CalendarDays size={14} className="mr-2 opacity-80 text-beer-jonquil" />
                            <span>First Brewed: {beer.first_brewed}</span>
                        </div>
                        {beer.description && (
                            <p className="text-xs text-beer-timberwolf/90 dark:text-beer-cafe-noir/90 mb-3 max-h-24 overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-beer-jonquil/50 scrollbar-track-transparent">
                                {beer.description.length > 150 ? `${beer.description.substring(0, 147)}...` : beer.description}
                            </p>
                        )}
                    </div>
                    <div className="mt-auto pt-3 border-t border-beer-chamoisee/70 dark:border-beer-beaver/70 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center text-sm">
                        <div className="flex items-center">
                            <Percent size={16} className="mr-1.5 text-beer-jonquil opacity-90" />
                            <span className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir mr-1">ABV:</span>
                            <span className="text-beer-jonquil font-medium">
                                {beer.abv !== null && beer.abv !== undefined ? `${beer.abv}%` : 'N/A'}
                            </span>
                        </div>
                        {beer.ibu !== null && beer.ibu !== undefined && (
                            <div className="flex items-center">
                                <Zap size={16} className="mr-1.5 text-beer-jonquil opacity-90" />
                                <span className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir mr-1">IBU:</span>
                                <span className="text-beer-jonquil font-medium">{beer.ibu}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="relative bg-beer-beaver dark:bg-beer-chamoisee/80 rounded-xl shadow-xl dark:shadow-beer-cafe-noir/40 overflow-hidden h-full group flex flex-row transition-all duration-300 hover:shadow-beer-jonquil/20 hover:ring-2 hover:ring-beer-jonquil/70">
            {renderFavoriteButton("absolute top-1.5 right-1.5 z-20 text-beer-timberwolf dark:text-beer-cafe-noir bg-beer-chamoisee/40 dark:bg-beer-beaver/40 hover:bg-beer-chamoisee/60 dark:hover:bg-beer-beaver/60")}

            {/* Content Area (Left Side) */}
            <div className="w-3/5 sm:w-1/2 p-3 sm:p-4 flex flex-col text-beer-timberwolf dark:text-beer-cafe-noir">
                <div className="mb-2">
                    <h3 className="text-sm sm:text-base font-bold text-beer-jonquil transition-colors duration-300 group-hover:text-beer-jonquil/80 leading-tight pr-6" title={beer.name}> {/* Added padding right to prevent overlap with button */}
                        {beer.name}
                    </h3>
                    <p className="text-xs text-beer-timberwolf/80 dark:text-beer-cafe-noir/80 mt-1 h-8 sm:h-9 overflow-hidden text-ellipsis" title={beer.tagline}>
                        {beer.tagline}
                    </p>
                </div>
                <div className="text-[10px] sm:text-xs text-beer-timberwolf/70 dark:text-beer-cafe-noir/70 mb-2 flex items-center">
                    <CalendarDays size={12} className="mr-1 opacity-80 text-beer-jonquil shrink-0" />
                    <span className="truncate">{beer.first_brewed}</span>
                </div>
                <div className="flex-grow"></div>
                <div className="mt-auto pt-1.5 border-t border-beer-chamoisee/70 dark:border-beer-beaver/70 flex flex-col space-y-1 text-xs">
                    <div className="flex items-center">
                        <Percent size={12} className="mr-1 text-beer-jonquil opacity-90 shrink-0" />
                        <span className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir mr-0.5">ABV:</span>
                        <span className="text-beer-jonquil font-medium">
                            {beer.abv !== null && beer.abv !== undefined ? `${beer.abv}%` : 'N/A'}
                        </span>
                    </div>
                    {beer.ibu !== null && beer.ibu !== undefined && (
                        <div className="flex items-center">
                            <Zap size={12} className="mr-1 text-beer-jonquil opacity-90 shrink-0" />
                            <span className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir mr-0.5">IBU:</span>
                            <span className="text-beer-jonquil font-medium">{beer.ibu}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Area (Right Side) */}
            <div className="relative w-2/5 sm:w-1/2 bg-beer-chamoisee/40 dark:bg-beer-beaver/40 flex items-center justify-center overflow-hidden group">
                {imageUrlToDisplay ? (
                    <Image
                        src={imageUrlToDisplay}
                        alt={beer.name || 'Beer image'}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 20vw, 15vw"
                        unoptimized={process.env.NODE_ENV === 'development'}
                        onError={(e) => {
                            console.error(`Failed to load image for ${beer.name}: ${imageUrlToDisplay}`, (e.target as HTMLImageElement).src);
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-beer-timberwolf/70 dark:text-beer-cafe-noir/70 p-2 text-center">
                        <Droplet size={32} className="opacity-50 mb-1" />
                        <span className="text-xs">No Image</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeerCard;