import React from 'react';
declare type SliderProps = {
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number | null;
    label?: {
        value: number;
        label?: React.ReactNode;
    }[];
};
declare const Slider: React.FC<SliderProps>;
export default Slider;
