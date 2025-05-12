export const USER_DATA_KEY = 'userBeerCollectionData';

export interface UserBeerData {
    isFavorite?: boolean;
    rating?: number;
    notes?: string;
}

// Add 'export' here
export interface AllUserBeerData {
    [beerId: string]: UserBeerData;
}

export const getAllUserData = (): AllUserBeerData => {
    if (typeof window === 'undefined') {
        console.warn("Attempted to access localStorage on the server.");
        return {};
    }
    try {
        const data = window.localStorage.getItem(USER_DATA_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error reading or parsing localStorage data:", error);
        return {};
    }
};

export const getUserDataForBeer = (beerId: number | string): UserBeerData | undefined => {
    const allData = getAllUserData();
    return allData[beerId.toString()];
};

export const updateUserDataForBeer = (beerId: number | string, updates: Partial<UserBeerData>) => {
    if (typeof window === 'undefined') {
        console.warn("Attempted to access localStorage on the server.");
        return;
    }
    try {
        const allData = getAllUserData();
        const currentData = allData[beerId.toString()] || {};
        allData[beerId.toString()] = { ...currentData, ...updates };
        window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(allData));
    } catch (error) {
        console.error("Error updating localStorage data:", error);
    }
};