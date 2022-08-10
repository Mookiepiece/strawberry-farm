import React, { useState, useEffect, useRef, Children } from 'react';
import { autoUpdate, computePosition, Middleware, Placement } from '@floating-ui/dom';
import { EMPTY_ARRAY, noop, Portal } from '../shared';
import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { Transition } from '@headlessui/react';
import { useClickAway } from '../shared';

export type PopperProps = {
  popup: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
  middleware?: Middleware[];
  placement?: Placement;
  popupClassName?: ClassValue;
  popupStyle?: React.CSSProperties;
  closeOnClickOutside?: boolean;
  unmount?: boolean;
  children: React.ReactElement;
};

const Popper = ({
  children,
  popup,
  visible,
  onClose = noop,
  popupClassName,
  popupStyle,
  placement,
  closeOnClickOutside = true,
  unmount,
  middleware = EMPTY_ARRAY,
}: PopperProps): React.ReactElement => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const middlewareRef = useRef(middleware);
  middlewareRef.current = middleware;

  const [positionCalculated, setPositionCalculated] = useState(false);

  useEffect(() => {
    if (!visible || !referenceElement || !popperElement) {
      return;
    }

    let cleanup = noop;
    let cleanupCalled = false;
    // The first frame, height is 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cleanupCalled) return;

        cleanup = autoUpdate(referenceElement, popperElement, () => {
          computePosition(referenceElement, popperElement, {
            middleware: middlewareRef.current,
            placement,
          }).then(({ x, y, middlewareData, placement }) => {
            popperElement.style.setProperty('--x', x + 'px');
            popperElement.style.setProperty('--y', y + 'px');

            if (popperElement.firstElementChild) {
              if (
                popperElement.firstElementChild.getAttribute('data-popper-placement') !== placement
              ) {
                popperElement.firstElementChild.setAttribute('data-popper-placement', placement);
              }
            }
          });
          setPositionCalculated(true);
        });
      });

      return () => {
        cleanupCalled = true;
        cleanup();
      };
    });
  }, [placement, popperElement, referenceElement, visible]);

  useClickAway(closeOnClickOutside && visible ? [referenceElement, popperElement] : [], onClose);

  return (
    <>
      {React.cloneElement(children, {
        ref: setReferenceElement,
      })}
      <Portal>
        {visible || positionCalculated ? (
          <div className="sf-popper-wrap" ref={setPopperElement as any}>
            <Transition
              show={visible && positionCalculated}
              className={clsx('sf-popper', popupClassName)}
              style={popupStyle}
              enterFrom="sf-popper-out"
              enter="sf-popper-active"
              enterTo="sf-popper-in"
              leaveFrom="sf-popper-in"
              leave="sf-popper-active"
              leaveTo="sf-popper-out"
              // We'll manually handle unmount because we need position calculated with proper width and height
              unmount={false}
              afterLeave={() => setPositionCalculated(false)}
            >
              {popup}
            </Transition>
          </div>
        ) : null}
      </Portal>
    </>
  );
};

export default Popper;
