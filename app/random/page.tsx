"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Beer } from '@/types';
import { fetchRandomBeer } from '@/lib/api';
import { motion } from 'framer-motion';
import {
    Droplet, Percent, CalendarDays, Package,
    Thermometer, TestTube2, Utensils, Lightbulb,
    Beer as BeerIcon
} from 'lucide-react';

const RandomBeerPage = () => {
    const [beer, setBeer] = useState<Beer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRandomBeer = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const randomBeerData = await fetchRandomBeer();
            if (randomBeerData) {
                setBeer(randomBeerData);
            } else {
                setError("Could not fetch a random beer. The brewery might be out of surprises!");
            }
        } catch (err) {
            setError("An error occurred while fetching a beer. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRandomBeer();
    }, [loadRandomBeer]);

    const renderVolume = (volume: { value: number; unit: string }) => `${volume.value} ${volume.unit}`;

    const cardBaseClass = "bg-beer-beaver/70 dark:bg-beer-chamoisee/40 p-4 sm:p-6 rounded-lg shadow-md";
    const titleClass = "text-xl font-semibold text-beer-jonquil mb-2 flex items-center";
    const listItemClass = "text-beer-timberwolf dark:text-beer-cafe-noir/90";
    const subItemClass = "ml-4 text-sm text-beer-timberwolf/80 dark:text-beer-cafe-noir/80";

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-6 text-beer-timberwolf dark:text-beer-cafe-noir">
                <motion.div
                    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 mb-4 text-beer-jonquil"
                >
                    <BeerIcon size={64} />
                </motion.div>
                <p className="text-xl">Fetching a fresh brew...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-6 text-red-500 dark:text-red-400">
                <Droplet size={64} className="mb-4" />
                <p className="text-xl mb-4">{error}</p>
                <button
                    onClick={loadRandomBeer}
                    className="bg-beer-jonquil text-beer-cafe-noir font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-80 transition-opacity"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!beer) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-6 text-beer-timberwolf dark:text-beer-cafe-noir">
                <p className="text-xl">No beer data available at the moment.</p>
            </div>
        );
    }

    let imageUrlToDisplay: string | null = null;
    if (beer.image_url) {
        imageUrlToDisplay = beer.image_url;
    } else if (beer.image) {
        imageUrlToDisplay = `https://punkapi.online/v3/images/${beer.image}`;
    }

    return (
        <main className="container mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8 text-beer-timberwolf dark:text-beer-cafe-noir">
            <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-beer-jonquil mb-4">Discover a Random Brew!</h1>
                <button
                    onClick={loadRandomBeer}
                    disabled={isLoading}
                    className="bg-[#533527] text-[#CBC4B9] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                    {isLoading ? 'Pouring...' : 'Get Another Random Beer!'}
                </button>
            </div>

            <article className="bg-beer-cafe-noir/30 dark:bg-beer-timberwolf/10 p-6 sm:p-8 rounded-xl shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {/* Image Column */}
                    <div className="md:col-span-1 flex flex-col items-center">
                        {imageUrlToDisplay ? (
                            <div className="relative w-full max-w-xs h-96 md:h-[500px] bg-beer-beaver/50 dark:bg-beer-chamoisee/30 rounded-lg flex items-center justify-center p-4 shadow-inner">
                                <Image
                                    src={imageUrlToDisplay}
                                    alt={beer.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 25vw"
                                    priority
                                />
                            </div>
                        ) : (
                            <div className="w-full max-w-xs h-96 md:h-[500px] bg-beer-beaver/50 dark:bg-beer-chamoisee/30 rounded-lg flex flex-col items-center justify-center text-beer-timberwolf/70 dark:text-beer-cafe-noir/70 p-4 shadow-inner">
                                <Droplet size={80} className="opacity-60 mb-4" />
                                <p>No Image Available</p>
                            </div>
                        )}
                        <p className="text-xs text-beer-timberwolf/60 dark:text-beer-cafe-noir/60 mt-2 italic text-center">
                            Image of {beer.name}
                        </p>
                    </div>

                    {/* Main Info Column */}
                    <div className="md:col-span-2">
                        <h2 className="text-3xl sm:text-4xl font-bold text-beer-jonquil mb-2">{beer.name}</h2>
                        <p className="text-xl text-beer-timberwolf/90 dark:text-beer-cafe-noir/90 italic mb-4">{beer.tagline}</p>
                        <p className="text-beer-timberwolf/80 dark:text-beer-cafe-noir/80 mb-6 leading-relaxed">{beer.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className={cardBaseClass}>
                                <h3 className={titleClass}><Percent size={20} className="mr-2" /> Stats</h3>
                                <ul className="space-y-1">
                                    {beer.abv && <li className={listItemClass}><strong>ABV:</strong> {beer.abv}%</li>}
                                    {beer.ibu && <li className={listItemClass}><strong>IBU:</strong> {beer.ibu}</li>}
                                    {beer.ebc && <li className={listItemClass}><strong>EBC:</strong> {beer.ebc}</li>}
                                    {beer.srm && <li className={listItemClass}><strong>SRM:</strong> {beer.srm}</li>}
                                    {beer.ph && <li className={listItemClass}><strong>pH:</strong> {beer.ph}</li>}
                                </ul>
                            </div>
                            <div className={cardBaseClass}>
                                <h3 className={titleClass}><CalendarDays size={20} className="mr-2" /> Brewing</h3>
                                <ul className="space-y-1">
                                    <li className={listItemClass}><strong>First Brewed:</strong> {beer.first_brewed}</li>
                                    {beer.attenuation_level && <li className={listItemClass}><strong>Attenuation:</strong> {beer.attenuation_level}%</li>}
                                    {beer.target_og && <li className={listItemClass}><strong>OG:</strong> {beer.target_og}</li>}
                                    {beer.target_fg && <li className={listItemClass}><strong>FG:</strong> {beer.target_fg}</li>}
                                </ul>
                            </div>
                        </div>
                        <div className={`${cardBaseClass} mb-6`}>
                            <h3 className={titleClass}><Package size={20} className="mr-2" /> Volume</h3>
                            <ul className="space-y-1">
                                <li className={listItemClass}><strong>Beer:</strong> {renderVolume(beer.volume)}</li>
                                <li className={listItemClass}><strong>Boil:</strong> {renderVolume(beer.boil_volume)}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Ingredients Section */}
                <div className={`${cardBaseClass} mb-6`}>
                    <h3 className={titleClass}><TestTube2 size={20} className="mr-2" /> Ingredients</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                        <div>
                            <h4 className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir/95 mb-1">Malt:</h4>
                            <ul className="list-disc list-inside">
                                {beer.ingredients.malt.map((m, i) => (
                                    <li key={i} className={subItemClass}>{m.name}: {renderVolume(m.amount)}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir/95 mb-1">Hops:</h4>
                            <ul className="list-disc list-inside">
                                {beer.ingredients.hops.map((h, i) => (
                                    <li key={i} className={subItemClass}>
                                        {h.name} ({renderVolume(h.amount)}) - Add: {h.add}, Attr: {h.attribute}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {beer.ingredients.yeast && (
                            <div>
                                <h4 className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir/95 mb-1">Yeast:</h4>
                                <p className={subItemClass}>{beer.ingredients.yeast}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Method Section */}
                {beer.method && (
                    <div className={`${cardBaseClass} mb-6`}>
                        <h3 className={titleClass}><Thermometer size={20} className="mr-2" /> Method</h3>
                        <div className="mt-2 space-y-2">
                            {beer.method.mash_temp && beer.method.mash_temp.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir/95 mb-1">Mash Temps:</h4>
                                    {beer.method.mash_temp.map((mt, i) => (
                                        <p key={i} className={subItemClass}>
                                            {mt.temp.value}°{mt.temp.unit} {mt.duration ? `for ${mt.duration} mins` : ''}
                                        </p>
                                    ))}
                                </div>
                            )}
                            {beer.method.fermentation && (
                                <div>
                                    <h4 className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir/95 mb-1">Fermentation:</h4>
                                    <p className={subItemClass}>{beer.method.fermentation.temp.value}°{beer.method.fermentation.temp.unit}</p>
                                </div>
                            )}
                            {beer.method.twist && (
                                <div>
                                    <h4 className="font-semibold text-beer-timberwolf dark:text-beer-cafe-noir/95 mb-1">Twist:</h4>
                                    <p className={subItemClass}>{beer.method.twist}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Food Pairing Section */}
                {beer.food_pairing && beer.food_pairing.length > 0 && (
                    <div className={`${cardBaseClass} mb-6`}>
                        <h3 className={titleClass}><Utensils size={20} className="mr-2" /> Food Pairing</h3>
                        <ul className="list-disc list-inside mt-2">
                            {beer.food_pairing.map((food, i) => (
                                <li key={i} className={subItemClass}>{food}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Brewer's Tips */}
                {beer.brewers_tips && (
                    <div className={`${cardBaseClass}`}>
                        <h3 className={titleClass}><Lightbulb size={20} className="mr-2" /> Brewer Tips</h3>
                        <p className={`${subItemClass} mt-2 leading-relaxed`}>{beer.brewers_tips}</p>
                    </div>
                )}
            </article>
        </main>
    );
};

export default RandomBeerPage;