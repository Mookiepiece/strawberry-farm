import React from 'react';
export declare const createRegistry: <T>() => [React.FC<{
    itemsRef: React.MutableRefObject<T[]>;
    children?: React.ReactNode;
}>, (i: T | undefined) => void];
export declare const createStateModeRegistry: <T>() => [React.FC<{
    model: [T[], React.Dispatch<React.SetStateAction<T[]>>];
}>, (i: T | undefined) => void, () => T[]];
