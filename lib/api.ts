import { Beer } from '@/types';

const API_BASE_URL = 'https://punkapi.online/v3';

interface FetchBeersParams {
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
    if (params?.beer_name) queryParams.append('beer_name', params.beer_name);
    if (params?.ids) queryParams.append('ids', params.ids);
    if (params?.brewed_before) queryParams.append('brewed_before', params.brewed_before);
    if (params?.brewed_after) queryParams.append('brewed_after', params.brewed_after);
    if (params?.abv_gt) queryParams.append('abv_gt', params.abv_gt.toString());
    if (params?.abv_lt) queryParams.append('abv_lt', params.abv_lt.toString());
    if (params?.ibu_gt) queryParams.append('ibu_gt', params.ibu_gt.toString());
    if (params?.ibu_lt) queryParams.append('ibu_lt', params.ibu_lt.toString());
    if (params?.ebc_gt) queryParams.append('ebc_gt', params.ebc_gt.toString());
    if (params?.ebc_lt) queryParams.append('ebc_lt', params.ebc_lt.toString());
    if (params?.food) queryParams.append('food', params.food);


    const url = `${API_BASE_URL}/beers?${queryParams.toString()}`;
    try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
            console.error('[API FETCH V3] Response not OK:', response.status, response.statusText, await response.text());
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Beer[] = await response.json();
        return data;
    } catch (error) {
        console.error("[API FETCH V3] Failed to fetch beers:", error);
        return [];
    }
}

export async function fetchRandomBeer(): Promise<Beer | null> {
    const url = `${API_BASE_URL}/beers/random`;
    try {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
            const errorBody = await response.text();
            console.error('[API FETCH V3] Response not OK (random):', response.status, response.statusText, errorBody);
            if (response.status === 404) {
                throw new Error(`Random beer endpoint not found (404).`);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const beerData: Beer = await response.json();

        if (beerData && beerData.id && beerData.name) {
            return beerData;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`[API FETCH V3] Failed to fetch random beer:`, error);
        return null;
    }
}