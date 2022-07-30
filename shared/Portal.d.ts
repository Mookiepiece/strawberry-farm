import type React from 'react';
export declare const setup: (key: 'Modal' | 'Notification') => HTMLDivElement;
export declare const Portal: React.FC<{
    children: React.ReactNode;
}>;
export declare const NotificationPortal: React.FC<{
    children: React.ReactNode;
}>;
export declare const useMountedStatePlus: () => boolean;
