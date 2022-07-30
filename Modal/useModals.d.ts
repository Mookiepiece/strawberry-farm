import React from 'react';
declare type LiteModalFC<T extends any, R extends any> = React.ForwardRefExoticComponent<React.RefAttributes<LiteModalFCInstance<T, R>>> & {
    instantiate: [T] extends [undefined] ? (args?: T) => Promise<R> : (args: T) => Promise<R>;
};
declare type LiteModalFCInstanceOpenOptions = {
    onClose?(): void | false;
};
declare type LiteModalFCInstance<T extends any = undefined, R extends any = undefined> = {
    open: [T] extends [undefined] ? (args?: undefined, options?: LiteModalFCInstanceOpenOptions) => Promise<R> : (args: T, options?: LiteModalFCInstanceOpenOptions) => Promise<R>;
    close(): void;
};
export declare const createLiteModal: <T extends unknown = undefined, R extends unknown = undefined>(Component: React.VFC<{
    visible: boolean;
    close(): void;
    resolve: [R] extends [undefined] ? (v?: R | undefined) => void : (v: R) => void;
    reject(e?: any): void;
    args?: T | undefined;
}>) => LiteModalFC<T, R>;
declare type MapToInstance<A extends LiteModalFC<any, any>[]> = {
    [K in keyof A]: A[K] extends LiteModalFC<infer T, infer R> ? LiteModalFCInstance<T, R> : never;
};
export declare const useModals: <A extends LiteModalFC<any, any>[]>(...args: A) => [MapToInstance<A>, React.ReactElement<any, string | React.JSXElementConstructor<any>>];
export {};
