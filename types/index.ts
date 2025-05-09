export interface Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image: string | null;
    abv: number | null;
    ibu: number | null;
    target_fg: number | null;
    target_og: number | null;
    ebc: number | null;
    srm: number | null;
    ph: number | null;
    attenuation_level: number | null;
    volume: Volume;
    boil_volume: Volume;
    method: Method;
    ingredients: Ingredients;
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
}

export interface Volume {
    value: number;
    unit: string;
}

export interface Method {
    mash_temp: MashTemp[];
    fermentation: Fermentation;
    twist: string | null;
}

export interface MashTemp {
    temp: Volume;
    duration: number | null;
}

export interface Fermentation {
    temp: Volume;
}

export interface Ingredients {
    malt: Malt[];
    hops: Hop[];
    yeast: string | null;
}

export interface Malt {
    name: string;
    amount: Volume;
}

export interface Hop {
    name: string;
    amount: Volume;
    add: string;
    attribute: string;
}