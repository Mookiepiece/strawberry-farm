import React, { useState, useEffect, useRef, Children } from 'react';
import { autoUpdate, computePosition, Middleware, Placement } from '@floating-ui/dom';
import { EMPTY_ARRAY, noop, Portal } from '../shared';
import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { CSSTransition } from 'react-transition-group';
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
  unmountOnExit?: boolean;
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
  unmountOnExit = true,
  middleware = EMPTY_ARRAY,
}: PopperProps): React.ReactElement => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const middlewareRef = useRef(middleware);
  middlewareRef.current = middleware;

  const [positionCalculated, setPositionCalculated] = useState(false);

  useEffect(() => {
    if (!visible || !referenceElement || !popperElement) {
      return setPositionCalculated(false);
    }

    return autoUpdate(referenceElement, popperElement, () => {
      computePosition(referenceElement, popperElement, {
        middleware: middlewareRef.current,
        placement,
      }).then(({ x, y, middlewareData, placement }) => {
        popperElement.style.setProperty('--x', x + 'px');
        popperElement.style.setProperty('--y', y + 'px');

        if (popperElement.getAttribute('data-popper-placement') !== placement) {
          popperElement.setAttribute('data-popper-placement', placement);
        }
        setPositionCalculated(true);
      });
    });
  }, [placement, popperElement, referenceElement, visible]);

  useClickAway(closeOnClickOutside && visible ? [referenceElement, popperElement] : [], onClose);

  return (
    <>
      {React.cloneElement(children, {
        ref: setReferenceElement,
      })}
      <Portal>
        <CSSTransition
          in={visible && positionCalculated}
          timeout={100}
          classNames="sf-popper"
          unmountOnExit={unmountOnExit}
        >
          <div
            className={clsx('sf-popper', popupClassName)}
            style={popupStyle}
            ref={setPopperElement}
          >
            {popup}
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default Popper;
