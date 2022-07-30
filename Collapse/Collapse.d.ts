import React from 'react';
import type { ClassValue } from 'clsx';
export declare type CollapsePanelProps = {
    active?: boolean;
    unmountOnExit?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    className?: ClassValue;
};
declare const Collapse: React.ForwardRefExoticComponent<{
    active?: boolean | undefined;
    unmountOnExit?: boolean | undefined;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className"> & {
    className?: ClassValue;
} & React.RefAttributes<HTMLDivElement>>;
export default Collapse;
