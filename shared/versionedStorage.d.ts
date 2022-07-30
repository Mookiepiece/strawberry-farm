import React, { SetStateAction } from 'react';
import { EqualityChecker, StateSelector } from 'zustand';
import { ZustandStore } from './zustand';
export declare type STORAGE_META = {
    meta: {
        version: number;
    };
};
declare type StorageModel<T extends Record<string, any>> = {
    meta: {
        version: number;
        versionBeforeUpgrade: number | undefined;
    };
    get(): T;
    set: React.Dispatch<React.SetStateAction<T>>;
    subscribe: ZustandStore<T>['subscribe'];
    useStore: ZustandStore<T>;
};
export declare type StorageModelUpgradeFn = Record<string, (legacyValue: any) => any>;
export declare const versionedStorage: <T extends Record<string, any>>({ root, initialValue, version, upgradeFn, storage, }: {
    root: string;
    initialValue: T;
    version: number;
    upgradeFn?: StorageModelUpgradeFn | undefined;
    storage: Storage;
}) => StorageModel<T>;
export declare const useStorage: <S extends Record<string, any>, U = S>(storageModel: StorageModel<S>, selector?: StateSelector<S, U> | undefined, equals?: EqualityChecker<U> | undefined) => [U, React.Dispatch<React.SetStateAction<S>>];
export {};
