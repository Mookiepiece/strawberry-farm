import React from 'react';
import { ClassValue } from 'clsx';
declare const Box: React.FC<{
    /**
     * display: grid
     */
    grid?: boolean | string | string[];
    /**
     * width & height: 100%
     */
    stretched?: boolean;
    /**
     * flex-direction: column
     */
    horizontal?: boolean;
    /**
     * flex-direction: *-reverse
     */
    reverse?: boolean;
    /**
     * justify-content
     */
    justify?: 'center' | 'between' | 'around' | 'evenly' | 'start' | 'end' | 'stretch';
    /**
     * align-items
     */
    align?: 'center' | 'start' | 'end' | 'stretch';
    /**
     * flex-wrap
     */
    wrap?: boolean;
    gap?: 2 | 5 | 10 | 20 | 30 | 50;
    /**
     * flex-grow
     */
    grow?: number | boolean;
    /**
     * flex-shrink
     */
    shrink?: number | boolean;
    /**
     * flex-basis
     */
    basis?: number | string;
    className?: ClassValue;
} & React.HTMLAttributes<HTMLDivElement>>;
export default Box;
