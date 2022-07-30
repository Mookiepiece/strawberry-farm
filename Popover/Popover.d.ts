import React from 'react';
import type { PopperProps } from '../Popper';
export declare type PopoverProps = Omit<PopperProps, 'onClose' | 'visible'> & {
    trigger?: 'click' | 'hover' | 'focus';
    timeout?: number;
};
declare const Popover: React.FC<PopoverProps>;
export default Popover;
