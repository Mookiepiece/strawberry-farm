import React from 'react';
export declare const project: <T extends string, P extends T | T[]>(name: P, render: (model: any) => React.ReactNode, meta?: {
    greedy?: boolean;
}) => React.ReactElement;
