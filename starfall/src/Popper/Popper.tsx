import React, { useState } from 'react';
import type { Modifier, Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';
import { NotificationPortal, useEventCallback } from '@mookiepiece/starfall-utils';
import { useEffect } from 'react';
import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { CSSTransition } from 'react-transition-group';
import { sameWidth, createOffsetModifier, arrow } from './modifiers';

export type PopperProps = {
  popup: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
  modifiers?: Modifier<unknown, unknown>[];
  placement?: Placement;
  popupClassName?: ClassValue;
  popupStyle?: React.CSSProperties;
  closeOnClickOutside?: boolean;
  children: React.ReactElement;
};

const noop = () => {};
const EMPTY: [] = [];

const Popper: React.FC<PopperProps> & {
  modifiers: {
    sameWidth: typeof sameWidth;
    createOffsetModifier: typeof createOffsetModifier;
    arrow: typeof arrow;
  };
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

  // FEAT: state of popper will be ready the next render, and we just wait for it.
  const [lazyVisible, setLazyVisible] = useState(visible);
  useEffect(() => setLazyVisible(visible), [visible]);

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

  return (
    <>
      {React.cloneElement(children, {
        ref: setReferenceElement,
      })}
      <NotificationPortal>
        <CSSTransition in={!!lazyVisible} timeout={100} classNames="st-popper">
          <div
            className={clsx('st-popper')}
            style={styles.popper}
            {...attributes.popper}
            ref={setPopperElement}
            aria-hidden={!lazyVisible}
          >
            <div className={clsx('st-popper__inner', popupClassName)} style={popupStyle}>
              {popup}
              {modifiers.includes(arrow) ? (
                <div style={styles.arrow} {...attributes.arrow} data-popper-arrow></div>
              ) : null}
            </div>
          </div>
        </CSSTransition>
      </NotificationPortal>
    </>
  );
};

Popper.modifiers = {
  sameWidth,
  createOffsetModifier,
  arrow,
};

export default Popper;
