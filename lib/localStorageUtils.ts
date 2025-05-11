const USER_DATA_KEY = 'userBeerCollectionData';

export interface UserBeerData {
    isFavorite?: boolean;
    rating?: number;
    notes?: string;
}

export interface AllUserBeerData {
    [beerId: string]: UserBeerData;
}

export const getAllUserData = (): AllUserBeerData => {
    if (typeof window === 'undefined') return {};
    const data = window.localStorage.getItem(USER_DATA_KEY);
    return data ? JSON.parse(data) : {};
};

export const getUserDataForBeer = (beerId: number | string): UserBeerData | undefined => {
    const allData = getAllUserData();
    return allData[beerId.toString()];
};

export const updateUserDataForBeer = (beerId: number | string, updates: Partial<UserBeerData>) => {
    if (typeof window === 'undefined') return;
    const allData = getAllUserData();
    const currentData = allData[beerId.toString()] || {};
    allData[beerId.toString()] = { ...currentData, ...updates };
    window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(allData));
};