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
                <p className="text-beer-timberwolf/80 dark:text-beer-cafe-noir/80">
                    No beers to display at the moment.
                </p>
            </div>
        );
    }

    const getGridItemConfig = (index: number, totalItems: number): { className: string; isLarge: boolean; variant: 'default' | 'wide' | 'tall' | 'extraLarge' } => {
        let className = "lg:col-span-1 lg:row-span-1";
        let isLarge = false;
        let variant: 'default' | 'wide' | 'tall' | 'extraLarge' = 'default';
        const patternIndex = index % 8;
        if (totalItems === 1) {
            className = "lg:col-span-4 lg:row-span-2"; isLarge = true; variant = 'extraLarge';
        } else if (totalItems === 2) {
            className = "lg:col-span-2 lg:row-span-2"; isLarge = true; variant = 'extraLarge';
        } else if (totalItems === 3) {
            if (index === 0) {
                className = "lg:col-span-2 lg:row-span-2"; isLarge = true; variant = 'extraLarge';
            } else {
                className = "lg:col-span-2 lg:row-span-1"; isLarge = true; variant = 'wide';
            }
        } else {
            switch (patternIndex) {
                case 0: className = "lg:col-span-2 lg:row-span-2"; isLarge = true; variant = 'extraLarge'; break;
                case 1: className = "lg:col-span-1 lg:row-span-1"; isLarge = false; variant = 'default'; break;
                case 2: className = "lg:col-span-1 lg:row-span-1"; isLarge = false; variant = 'default'; break;
                case 3: className = "lg:col-span-2 lg:row-span-1"; isLarge = true; variant = 'wide'; break;
                case 4: className = "lg:col-span-1 lg:row-span-2"; isLarge = true; variant = 'tall'; break;
                case 5: className = "lg:col-span-1 lg:row-span-1"; isLarge = false; variant = 'default'; break;
                case 6: className = "lg:col-span-1 lg:row-span-1"; isLarge = false; variant = 'default'; break;
                case 7: className = "lg:col-span-2 lg:row-span-1"; isLarge = true; variant = 'wide'; break;
                default: className = "lg:col-span-1 lg:row-span-1"; isLarge = false; variant = 'default';
            }
        }
        return { className, isLarge, variant };
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6
                        lg:grid-flow-dense lg:auto-rows-[15rem]
                        sm:auto-rows-[28rem] md:auto-rows-[30rem]">
            {beers.map((beer, index) => {
                const { className: gridItemClass, isLarge, variant } = getGridItemConfig(index, beers.length);
                return (
                    <div key={beer.id} className={`${gridItemClass}`}>
                        <BeerCard beer={beer} isLarge={isLarge} variant={variant} />
                    </div>
                );
            })}
        </div>
    );
};

export default BeerGallery;