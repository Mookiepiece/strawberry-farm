import React from 'react';
import { createLiteModal, useModals } from './useModals';
declare type ModalProps = {
    visible: boolean;
    title?: string;
    onClose?: () => void | Promise<void> | boolean | Promise<boolean>;
    noHeader?: boolean;
    closable?: boolean;
    maskClosable?: boolean;
    width?: string | number;
    maxWidth?: string | number;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    onVisibilityChange?: (visible: boolean) => void;
} & React.HTMLProps<HTMLDivElement>;
declare let registry: number[];
declare const ModalMitt: import("../shared").Emitter<{
    REGISTER: number;
    UNREGISTER: number;
    REMOTE_CLOSE: number;
}>;
declare const Modal: React.FC<ModalProps> & {
    Mitt: typeof ModalMitt;
    registry: typeof registry;
    createLiteModal: typeof createLiteModal;
    useModals: typeof useModals;
};
export default Modal;
