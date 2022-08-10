import React from 'react';
import { DialogBody } from './DialogBody';
export declare const CollectorMitt: import("../shared").Emitter<{
    REGISTER: number;
    UNREGISTER: number;
    SINGAL: {
        id: number;
        data: unknown;
    };
}>, useCollectComponentInstance: ({ active, listener, }: {
    active: boolean;
    listener: (data: unknown) => void;
}) => void;
export declare type DialogProps = {
    visible: boolean;
    onClose?(): void;
    children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;
declare const Dialog: React.FC<DialogProps> & {
    Mitt: typeof CollectorMitt;
    Body: typeof DialogBody;
};
export default Dialog;
