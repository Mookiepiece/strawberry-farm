export declare const createComponentInstancesPool: <T extends unknown>() => {
    CollectorMitt: import("./mitt").Emitter<{
        REGISTER: number;
        UNREGISTER: number;
        SINGAL: T extends undefined ? {
            id: number;
            data?: undefined;
        } : {
            id: number;
            data: T;
        };
    }>;
    useCollectComponentInstance: ({ active, listener, }: {
        active: boolean;
        listener: T extends undefined ? (data?: undefined) => void : (data: T) => void;
    }) => void;
};
