/* eslint-disable no-irregular-whitespace */
import { Transition } from '@headlessui/react';
import React, { useRef } from 'react';
import FocusLock from '../FocusLock';
import { Portal, createComponentInstancesPool, noop, Keys } from '../shared';
import { DialogBody } from './DialogBody';

export const { CollectorMitt, useCollectComponentInstance } = createComponentInstancesPool();

export type DialogProps = {
  visible: boolean;
  onClose?(): void;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Dialog: React.FC<DialogProps> & {
  Mitt: typeof CollectorMitt;
  Body: typeof DialogBody;
} = ({ children, visible, onClose = noop, ...rest }) => {
  const backgroundElRef = useRef<HTMLDivElement | null>(null);

  useCollectComponentInstance({
    active: visible,
    listener() {
      onClose();
    },
  });

  const handleFocusLockKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === Keys.ESC) {
      onClose();
    }
  };

  return (
    <Portal>
      <Transition
        show={visible}
        className="sf-dialog-background"
        enterFrom="sf-dialog-background-out"
        enter="sf-dialog-background-active"
        enterTo="sf-dialog-background-in"
        leaveFrom="sf-dialog-background-in"
        leave="sf-dialog-background-active"
        leaveTo="sf-dialog-background-out"
        onClick={(e: React.MouseEvent) => e.target === backgroundElRef.current && onClose()}
        as="div"
        ref={backgroundElRef}
      >
        <Transition
          appear
          show={visible}
          className="sf-dialog"
          enterFrom="sf-dialog-out"
          enter="sf-dialog-active"
          enterTo="sf-dialog-in"
          leaveFrom="sf-dialog-in"
          leave="sf-dialog-active"
          leaveTo="sf-dialog-out"
          {...rest}
          as="div"
        >
          <FocusLock disabled={!visible} onKeyDown={handleFocusLockKeyDown}>
            {children}
          </FocusLock>
        </Transition>
      </Transition>
    </Portal>
  );
};

Dialog.Mitt = CollectorMitt;
Dialog.Body = DialogBody;

export default Dialog;
