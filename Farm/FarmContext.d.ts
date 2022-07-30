import React from 'react';
import type { Emitter } from '../shared';
export declare const uuid: () => number;
export declare type FarmState = {
    fields: Map<number, FieldRegisterProps>;
    selectedBagItem: FarmBagItem | null;
    bag: FarmBagItem[];
    wallet: number;
};
export declare type SeedString = '🍓' | '🍇' | '🌽' | '🍟';
export declare const SEED_NAME_MAP: Map<string, {
    name: string;
    value: number;
}>;
export declare type FarmBagItem = {
    id: number;
    type: SeedString;
};
export declare type FieldRegisterProps = {
    id: number;
};
export declare type FarmMitt = Emitter<{
    PLANT: undefined;
    HARVEST: FarmBagItem;
    SELECT_BAG_ITEM: FarmBagItem;
    REGISTER_FIELD: FieldRegisterProps;
    UNREGISTER_FIELD: number;
}>;
export declare const FarmContext: React.Context<{
    farmMitt: FarmMitt;
}>;
