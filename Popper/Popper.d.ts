import React from 'react';
import { Middleware, Placement } from '@floating-ui/dom';
import type { ClassValue } from 'clsx';
export declare type PopperProps = {
    popup: React.ReactNode;
    visible?: boolean;
    onClose?: () => void;
    middleware?: Middleware[];
    placement?: Placement;
    popupClassName?: ClassValue;
    popupStyle?: React.CSSProperties;
    closeOnClickOutside?: boolean;
    unmountOnExit?: boolean;
    children: React.ReactElement;
};
declare const Popper: ({ children, popup, visible, onClose, popupClassName, popupStyle, placement, closeOnClickOutside, unmountOnExit, middleware, }: PopperProps) => React.ReactElement;
export default Popper;
