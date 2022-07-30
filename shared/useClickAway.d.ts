import type { RefObject } from 'react';
export declare const useClickAway: <K extends keyof DocumentEventMap = "click">(_ref: (RefObject<HTMLElement> | HTMLElement | null)[] | RefObject<HTMLElement> | HTMLElement | null, callback: (event: DocumentEventMap[K]) => void, eventName?: K) => void;
