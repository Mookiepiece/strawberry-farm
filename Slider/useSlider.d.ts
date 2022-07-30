import React from 'react';
export declare type Direction = {
    offsetSize: 'offsetHeight' | 'offsetWidth';
    scrollValue: 'scrollTop' | 'scrollLeft';
    scrollSize: 'scrollHeight' | 'scrollWidth';
    size: 'height' | 'width';
    axis: 'X' | 'Y';
    mouseEventClientValue: 'clientY' | 'clientX';
    clientRectStart: 'top' | 'left';
};
export declare const AXIS_MAP: {
    vertical: Direction;
    horizontal: Direction;
};
export declare const useSlider: ({ onChange, trackMouseEvents, trackTouchEvents, }: {
    onChange: (prop: {
        mouse: {
            x: number;
            y: number;
        };
    }) => void;
    trackMouseEvents?: boolean | undefined;
    trackTouchEvents?: boolean | undefined;
}) => {
    active: boolean;
    handleStart: (e: React.MouseEvent | React.TouchEvent) => void;
    handleDrag: (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => void;
    handleEnd: () => void;
};
