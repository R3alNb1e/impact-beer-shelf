// src/app/page.tsx
import { fetchBeers } from '@/lib/api'; // Adjust path if needed
import { Beer } from '@/types';       // Adjust path if needed
import BeerGallery from '@/components/beer/BeerGallery'; // Adjust path if needed

export default async function HomePage() {
    console.log('[HOMEPAGE] Fetching initial beers...'); // DEBUG LOG
    const initialBeers: Beer[] = await fetchBeers({ page: 1, per_page: 12 });
    console.log('[HOMEPAGE] Initial beers received in HomePage:', initialBeers ? initialBeers.length : 'null/undefined', 'items'); // DEBUG LOG

    return (
        <main className="container mx-auto px-4 py-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                    Explore Our Beers
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Discover a wide variety of unique and flavorful beers from the Punk API.
                </p>
            </header>

            {initialBeers && initialBeers.length > 0 ? (
                <BeerGallery beers={initialBeers} />
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Could Not Load Beers</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        There might be an issue with the API or your connection. Please check the console for more details and try again later.
                    </p>
                </div>
            )}
        </main>
    );
}