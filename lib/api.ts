import { Beer } from '@/types';

const API_BASE_URL = 'https://punkapi.online/v3';

export interface FetchBeersParams {
    page?: number;
    per_page?: number;
    beer_name?: string;
    ids?: string;
    brewed_before?: string;
    brewed_after?: string;
    abv_gt?: number;
    abv_lt?: number;
    ibu_gt?: number;
    ibu_lt?: number;
    ebc_gt?: number;
    ebc_lt?: number;
    food?: string;
}

export async function fetchBeers(params?: FetchBeersParams): Promise<Beer[]> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.beer_name) queryParams.append('beer_name', params.beer_name.replace(/ /g, '_'));
    if (params?.ids) queryParams.append('ids', params.ids);
    if (params?.brewed_before) queryParams.append('brewed_before', params.brewed_before);
    if (params?.brewed_after) queryParams.append('brewed_after', params.brewed_after);
    if (params?.abv_gt) queryParams.append('abv_gt', params.abv_gt.toString());
    if (params?.abv_lt) queryParams.append('abv_lt', params.abv_lt.toString());
    if (params?.ibu_gt) queryParams.append('ibu_gt', params.ibu_gt.toString());
    if (params?.ebc_gt) queryParams.append('ebc_gt', params.ebc_gt.toString());
    if (params?.ebc_lt) queryParams.append('ebc_lt', params.ebc_lt.toString());
    if (params?.food) queryParams.append('food', params.food.replace(/ /g, '_'));

    const url = `${API_BASE_URL}/beers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    console.log(`[API FETCH V3] Requesting URL: ${url}`);

    try {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(
                '[API FETCH V3] Response not OK:',
                response.status,
                response.statusText,
                "Body:", errorBody
            );
            throw new Error(
                `API Error: ${response.status} ${response.statusText}. Body: ${errorBody}`
            );
        }

        const data: Beer[] = await response.json();

        if (!Array.isArray(data)) {
            console.error('[API FETCH V3] API response was not an array as expected. Received:', data);
            throw new Error('Invalid API response format: expected an array of beers.');
        }
        console.log("[API FETCH V3] Successfully fetched beers:", data);
        return data;

    } catch (error) {
        console.error("[API FETCH V3] An error occurred in fetchBeers:", error);
        throw error;
    }
}

export async function fetchRandomBeer(): Promise<Beer | null> {
    const url = `${API_BASE_URL}/beers/random`;
    console.log(`[API FETCH V3] Requesting random beer from URL: ${url}`);

    try {
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('[API FETCH V3] Response not OK (random):', response.status, response.statusText, "Body:", errorBody);
            if (response.status === 404) throw new Error(`Random beer endpoint not found (404). Body: ${errorBody}`);
            throw new Error(`API Error fetching random beer: ${response.status} ${response.statusText}. Body: ${errorBody}`);
        }

        const beerData: Beer = await response.json(); // Directly expect a single Beer object

        if (beerData && beerData.id && beerData.name) { // Check the object directly
            console.log("[API FETCH V3] Successfully fetched random beer:", beerData);
            return beerData;
        } else {
            console.warn('[API FETCH V3] Random beer data is malformed or incomplete:', beerData);
            return null;
        }
    } catch (error) {
        console.error(`[API FETCH V3] Failed to fetch random beer:`, error);
        return null;
    }
}