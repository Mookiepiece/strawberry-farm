import React, { useState, useEffect } from 'react';
import type { Modifier, Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';
import { Portal, useEventCallback } from '../utils';
import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { CSSTransition } from 'react-transition-group';
import { sameWidth, createOffsetModifier, arrow, preventOverflow } from './modifiers';
import useClickAway from './useClickAway';

export type PopperProps = {
  popup: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
  modifiers?: Modifier<any, any>[];
  placement?: Placement;
  popupClassName?: ClassValue;
  popupStyle?: React.CSSProperties;
  closeOnClickOutside?: boolean;
  children: React.ReactElement;
};

const noop = () => {};
const EMPTY: [] = [];

const PopperModifiers = {
  sameWidth,
  createOffsetModifier,
  arrow,
  preventOverflow,
};

const Popper: React.FC<PopperProps> & {
  modifiers: typeof PopperModifiers;
} = ({
  children,
  popup,
  visible,
  onClose = noop,
  popupClassName,
  popupStyle,
  placement,
  closeOnClickOutside = true,
  modifiers = EMPTY,
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  // NOTE: usePopper is using react-fast-compare to compare options, no need to useMemo
  const { styles, attributes } = usePopper(referenceElement, visible ? popperElement : null, {
    modifiers,
    placement,
  });

  useClickAway(closeOnClickOutside && visible ? [referenceElement, popperElement] : [], onClose);

  // FEAT: click outside to close
  const onCloseEc = useEventCallback(onClose);
  useEffect(() => {
    if (closeOnClickOutside)
      if (referenceElement && popperElement) {
        if (visible) {
          const handleClickOutside = (e: MouseEvent) => {
            if (e.target instanceof Element) {
              if (!referenceElement.contains(e.target) && !popperElement.contains(e.target)) {
                onCloseEc();
              }
            }
          };
          document.addEventListener('click', handleClickOutside);
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
        }
      }
  }, [referenceElement, popperElement, visible, onCloseEc, closeOnClickOutside]);

  const [exited, setExited] = useState(false);
  return (
    <>
      {React.cloneElement(children, {
        ref: setReferenceElement,
      })}
      <Portal>
        <CSSTransition
          in={!!visible}
          timeout={100}
          onEnter={() => setExited(false)}
          onExited={() => setExited(true)}
          classNames="st-popper"
        >
          <div
            className={clsx('st-popper')}
            style={visible || !exited ? styles.popper : { display: 'none' }}
            {...attributes.popper}
            ref={setPopperElement}
            aria-hidden={!visible}
          >
            <div className={clsx('st-popper__inner', popupClassName)} style={popupStyle}>
              {popup}
              {modifiers.includes(arrow) ? (
                <div style={styles.arrow} {...attributes.arrow} data-popper-arrow></div>
              ) : null}
            </div>
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

Popper.modifiers = PopperModifiers;

export default Popper;
