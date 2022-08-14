import React from 'react';
export declare type SeedString = '🍓' | '🍇' | '🌽' | '🍟';
export declare const SEED_NAME_MAP: Map<string, {
    name: string;
    value: number;
}>;
export declare type FarmBagItem = {
    id: number;
    type: SeedString;
};
export declare type FarmState = {
    selectedBagItem: FarmBagItem | null;
    bag: FarmBagItem[];
    wallet: number;
};
export declare const FarmContext: React.Context<{
    state: FarmState;
    selectItem: (item: FarmBagItem) => void;
    buy: (type: SeedString) => void;
    harvest: (item: FarmBagItem) => void;
    plant: () => void;
}>;
export declare const useFarm: () => {
    state: FarmState;
    selectItem: (item: FarmBagItem) => void;
    buy: (type: SeedString) => void;
    harvest: (item: FarmBagItem) => void;
    plant: () => void;
};
