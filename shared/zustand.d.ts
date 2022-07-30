import React from 'react';
import { Destroy, State, GetState, Subscribe, StoreMutatorIdentifier, UseBoundStore, Mutate } from 'zustand';
/** Copy */
declare type StoreApi<T extends State> = {
    setState: React.Dispatch<React.SetStateAction<T>>;
    getState: GetState<T>;
    subscribe: Subscribe<T>;
    destroy: Destroy;
};
/** Copy */
declare type Get<T, K, F = never> = K extends keyof T ? T[K] : F;
/** Copy */
declare type StateCreator<T extends State, Mis extends [StoreMutatorIdentifier, unknown][] = [], Mos extends [StoreMutatorIdentifier, unknown][] = [], U = T> = ((setState: Get<Mutate<StoreApi<T>, Mis>, 'setState', undefined>, getState: Get<Mutate<StoreApi<T>, Mis>, 'getState', undefined>, store: Mutate<StoreApi<T>, Mis>, $$storeMutations: Mis) => U) & {
    $$storeMutators?: Mos;
};
/** Copy */
export declare type ZustandStore<T extends State, Mos extends [StoreMutatorIdentifier, unknown][] = []> = UseBoundStore<Mutate<StoreApi<T>, Mos>>;
/** Copy */
declare type Create = {
    <T extends State, Mos extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, [], Mos>): ZustandStore<T, Mos>;
    <T extends State>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, [], Mos>) => ZustandStore<T, Mos>;
};
/**
 * `Strawberry Farm Zustand` VS `Vanilla Zustand`
 *
 * - setState always runs in `replace` mode
 */
export declare const zustand: Create;
export {};
