import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '@starfall/Button';
import { Portal } from '@starfall/_utils/Portal';
import Mitt from '@starfall/_utils/mitt';
import clsx from 'clsx';
import { useEventCallback } from '@starfall/_utils/useEventCallback';
import horizon from '@starfall/_utils/horizon';

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
} = props => {
  const {
    visible,
    title,
    onClose,
    noHeader,
    closable = true,
    maskClosable = true,
    width,
    maxWidth,
    style,
    children,

    mountOnEnter,
    unmountOnExit,
    onVisibilityChange,
    ...rest
  } = props;

  const [id] = useState<number>(() => uuid++);

  useEffect(() => {
    if (visible) {
      console.log('I am res', id);
      ModalMitt.emit('REGISTER', id);
    } else {
      ModalMitt.emit('UNREGISTER', id);
    }
  }, [id, visible]);

  const ecOnClose = useEventCallback(onClose || noop);
  useEffect(() => {
    const cb = (i: number) => {
      if (i == id) ecOnClose();
    };
    ModalMitt.on('REMOTE_CLOSE', cb);
    return () => ModalMitt.off('REMOTE_CLOSE', cb);
  }, [ecOnClose, id]);

  return (
    <Portal>
      <CSSTransition
        timeout={300}
        in={visible}
        classNames="st-modal-wrap"
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
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
          <div className="st-modal">
            <div className="st-modal__header">
              <div className="st-modal__title">{title}</div>
              {closable ? (
                <Button textual className="st-modal__close" onClick={visible ? onClose : undefined}>
                  ×
                </Button>
              ) : null}
            </div>
            <div className="st-modal__body">{children}</div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

Modal.Mitt = ModalMitt;
Modal.registry = registry;

export default Modal;
