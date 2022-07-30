import React from 'react';
export declare const createPortalChannel: <X>({ ConsumerComponent, displayName, }: {
    ConsumerComponent: React.ComponentType<{
        model: [{
            id: number;
            payload: X;
        }[], React.Dispatch<React.SetStateAction<{
            id: number;
            payload: X;
        }[]>>];
    }>;
    displayName?: string | undefined;
}) => {
    push: (children: X) => void;
    setup: () => void;
};
