"use client";

import React, { useState, useEffect } from 'react';
import { BeerFilters } from '@/types';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';

interface FilterControlsProps {
    initialFilters?: Partial<BeerFilters>;
    onApplyFilters: (filters: Partial<BeerFilters>) => void;
    isLoading?: boolean;
}

const FilterControls: React.FC<FilterControlsProps> = ({ initialFilters = {}, onApplyFilters, isLoading = false }) => {
    const [filters, setFilters] = useState<Partial<BeerFilters>>(initialFilters);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFilters(prev => ({
            ...prev,
            [name as keyof BeerFilters]: value === '' ? undefined : (type === 'number' && value !== '' ? parseFloat(value) : value),
        }));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'brewed_after' | 'brewed_before') => {
        const yearValue = e.target.value;
        if (yearValue === '') {
            setFilters(prev => ({ ...prev, [field]: undefined }));
            return;
        }
        if (/^\d{0,4}$/.test(yearValue)) {
            setFilters(prev => ({
                ...prev,
                [field]: yearValue.length === 4 ? `${field === 'brewed_after' ? '01' : '12'}/${yearValue}` : undefined
            }));
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const activeFilters: Partial<BeerFilters> = {};
        let key: keyof BeerFilters;
        for (key in filters) {
            const value = filters[key];
            if (value !== undefined && value !== null && String(value).trim() !== '') {
                (activeFilters as any)[key] = value;
            }
        }
        onApplyFilters(activeFilters);
        if (window.innerWidth < 640) {
            setShowFilters(false);
        }
    };

    const handleReset = () => {
        const defaultFilters: Partial<BeerFilters> = {
            beer_name: undefined,
            brewed_after: undefined,
            brewed_before: undefined,
            abv_gt: undefined,
            abv_lt: undefined,
            ibu_gt: undefined,
            ibu_lt: undefined,
        };
        setFilters(defaultFilters);
        onApplyFilters({}); // Send empty object for reset
        if (window.innerWidth < 640) {
            setShowFilters(false);
        }
    };
    // ... rest of your component JSX (inputClass, labelClass, form)
    const inputClass = "w-full p-2.5 rounded-md bg-beer-timberwolf/80 dark:bg-beer-cafe-noir/80 border border-beer-beaver dark:border-beer-chamoisee text-beer-cafe-noir dark:text-beer-timberwolf placeholder-beer-cafe-noir/50 dark:placeholder-beer-timberwolf/50 focus:ring-2 focus:ring-beer-jonquil focus:border-transparent disabled:opacity-70";
    const labelClass = "block text-sm font-medium mb-1 text-beer-cafe-noir dark:text-beer-timberwolf";

    // For display in the input, get just the year part
    const getDisplayYear = (dateString: string | undefined) => {
        if (dateString && dateString.includes('/')) {
            return dateString.split('/')[1];
        }
        return '';
    };

    return (
        <div className="mb-8 p-4 sm:p-6 bg-beer-beaver/50 dark:bg-beer-chamoisee/30 rounded-xl shadow-lg">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center justify-between w-full p-3 bg-beer-jonquil text-beer-cafe-noir rounded-md mb-4 font-semibold"
                aria-expanded={showFilters}
                aria-controls="filter-form"
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                <SlidersHorizontal size={20} className={`transform transition-transform duration-200 ${showFilters ? 'rotate-90' : ''}`} />
            </button>

            <form id="filter-form" onSubmit={handleSubmit} className={`${showFilters ? 'block' : 'hidden'} sm:block space-y-6`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    <div>
                        <label htmlFor="beer_name" className={labelClass}>Beer Name</label>
                        <input type="text" id="beer_name" name="beer_name" value={filters.beer_name || ''} onChange={handleChange} placeholder="e.g., Punk IPA" className={inputClass} disabled={isLoading} />
                    </div>
                    <div>
                        <label htmlFor="brewed_after_year_display" className={labelClass}>Brewed After (YYYY)</label>
                        <input type="number" id="brewed_after_year_display" name="brewed_after_year_display" value={getDisplayYear(filters.brewed_after)} onChange={(e) => handleYearChange(e, 'brewed_after')} placeholder="e.g., 2010" className={inputClass} disabled={isLoading} min="1900" max={new Date().getFullYear()} />
                    </div>
                    <div>
                        <label htmlFor="brewed_before_year_display" className={labelClass}>Brewed Before (YYYY)</label>
                        <input type="number" id="brewed_before_year_display" name="brewed_before_year_display" value={getDisplayYear(filters.brewed_before)} onChange={(e) => handleYearChange(e, 'brewed_before')} placeholder="e.g., 2015" className={inputClass} disabled={isLoading} min="1900" max={new Date().getFullYear()} />
                    </div>
                    <div>
                        <label htmlFor="abv_gt" className={labelClass}>Min ABV (%)</label>
                        <input type="number" id="abv_gt" name="abv_gt" step="0.1" value={filters.abv_gt === undefined ? '' : filters.abv_gt} onChange={handleChange} placeholder="e.g., 5.0" className={inputClass} disabled={isLoading} />
                    </div>
                    <div>
                        <label htmlFor="abv_lt" className={labelClass}>Max ABV (%)</label>
                        <input type="number" id="abv_lt" name="abv_lt" step="0.1" value={filters.abv_lt === undefined ? '' : filters.abv_lt} onChange={handleChange} placeholder="e.g., 8.0" className={inputClass} disabled={isLoading} />
                    </div>
                    <div>
                        <label htmlFor="ibu_gt" className={labelClass}>Min IBU</label>
                        <input type="number" id="ibu_gt" name="ibu_gt" value={filters.ibu_gt === undefined ? '' : filters.ibu_gt} onChange={handleChange} placeholder="e.g., 20" className={inputClass} disabled={isLoading} />
                    </div>
                    <div>
                        <label htmlFor="ibu_lt" className={labelClass}>Max IBU</label>
                        <input type="number" id="ibu_lt" name="ibu_lt" value={filters.ibu_lt === undefined ? '' : filters.ibu_lt} onChange={handleChange} placeholder="e.g., 60" className={inputClass} disabled={isLoading} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-beer-beaver/80 dark:border-beer-chamoisee/50">
                    <button type="button" onClick={handleReset} disabled={isLoading} className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 border border-beer-chamoisee dark:border-beer-beaver text-beer-cafe-noir dark:text-beer-timberwolf rounded-md shadow-sm hover:bg-beer-chamoisee/30 dark:hover:bg-beer-beaver/30 transition duration-150 disabled:opacity-50">
                        <RotateCcw size={18} className="mr-2"/> Reset
                    </button>
                    <button type="submit" disabled={isLoading} className="w-full sm:w-auto flex items-center justify-center px-8 py-2.5 bg-beer-jonquil text-beer-cafe-noir font-semibold rounded-md shadow-md hover:bg-opacity-90 transition duration-150 disabled:opacity-50">
                        <Search size={18} className="mr-2"/> Apply Filters
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterControls;