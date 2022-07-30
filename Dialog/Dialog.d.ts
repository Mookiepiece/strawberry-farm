import React from 'react';
declare type DialogProps = {
    title: string;
    warning?: boolean;
    children?: React.ReactNode;
};
declare const Dialog: React.FC<DialogProps>;
export default Dialog;
