import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import Button from '../Button';
import FocusLock from '../FocusLock';
import { useEventCallback, Portal, Mitt, horizon } from '@mookiepiece/starfall-utils';
import { Keys } from './Keys';
import { createLiteModal, useModals } from './useModals';

type ModalProps = {
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

let registry: number[] = [];
const ModalMitt = Mitt<{ REGISTER: number; UNREGISTER: number; REMOTE_CLOSE: number }>();
ModalMitt.on('REGISTER', id => (Modal.registry = registry = [...registry, id]));
ModalMitt.on(
  'UNREGISTER',
  id => (Modal.registry = registry = horizon.remove(registry, i => i === id))
);

let uuid = 1;
const noop = () => {};

const Modal: React.FC<ModalProps> & {
  Mitt: typeof ModalMitt;
  registry: typeof registry;
  createLiteModal: typeof createLiteModal;
  useModals: typeof useModals;
} = props => {
  const {
    visible,
    title,
    onClose: _onClose,
    noHeader,
    closable = true,
    maskClosable = true,
    width,
    maxWidth,
    style,
    children,

    mountOnEnter,
    unmountOnExit = true,
    onVisibilityChange,
    ...rest
  } = props;
  const onClose = useEventCallback(_onClose || noop);

  const [id] = useState<number>(() => uuid++);

  useEffect(() => {
    if (visible) {
      ModalMitt.emit('REGISTER', id);
    } else {
      ModalMitt.emit('UNREGISTER', id);
    }
  }, [id, visible]);

  useEffect(() => {
    const cb = (i: number) => {
      if (i == id) onClose();
    };
    ModalMitt.on('REMOTE_CLOSE', cb);
    return () => ModalMitt.off('REMOTE_CLOSE', cb);
  }, [onClose, id]);

  const handleFocusLockKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === Keys.ESC) {
      onClose();
    }
  };

  return (
    <Portal>
      <CSSTransition
        timeout={300}
        in={visible}
        classNames="st-modal-wrap"
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear
        onEnter={onVisibilityChange && (() => onVisibilityChange(true))}
        onExit={onVisibilityChange && (() => onVisibilityChange(false))}
      >
        <div
          className={clsx('st-modal-wrap', !visible && 'st-not-interactive')}
          aria-hidden={!visible}
          style={{
            width,
            maxWidth,
            ...style,
          }}
          {...rest}
        >
          <div
            className="st-modal__mask"
            onClick={maskClosable && visible ? onClose : undefined}
          ></div>
          <FocusLock disabled={!visible} onKeyDown={handleFocusLockKeyDown}>
            <div className="st-modal">
              <div className="st-modal__header">
                <div className="st-modal__title">{title}</div>
                {closable ? (
                  <Button
                    textual
                    className="st-modal__close"
                    onClick={visible ? onClose : undefined}
                  >
                    ×
                  </Button>
                ) : null}
              </div>
              <div className="st-modal__body">{children}</div>
            </div>
          </FocusLock>
        </div>
      </CSSTransition>
    </Portal>
  );
};

Modal.Mitt = ModalMitt;
Modal.registry = registry;
Modal.createLiteModal = createLiteModal;
Modal.useModals = useModals;

export default Modal;
