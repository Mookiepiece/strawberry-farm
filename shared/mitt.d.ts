export interface Emitter<T> {
    on<K extends keyof T>(...args: T[K] extends undefined | void ? [type: K, handler: () => void] : [type: K, handler: (event: T[K]) => void]): () => void;
    off<K extends keyof T>(...args: T[K] extends undefined | void ? [type: K, handler: () => void] : [type: K, handler: (event: T[K]) => void]): void;
    emit<K extends keyof T>(...args: T[K] extends undefined | void ? [type: K] : [type: K, event: T[K]]): void;
}
export declare const Mitt: <T>() => Emitter<T>;
