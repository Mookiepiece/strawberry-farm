import React, { useRef } from 'react';
import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { useEventCallback } from '../shared';
import { Transition } from '@headlessui/react';

export type CollapsePanelProps = {
  active?: boolean;
  unmount?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    className?: ClassValue;
  };

const Collapse = React.forwardRef<HTMLDivElement, CollapsePanelProps>(
  ({ children, active, className, style, unmount, ...rest }, theirRef) => {
    const c = useCacheLatestNode(children);

    const ref = useRef<HTMLDivElement>();



    const callbackRef = useEventCallback((el: HTMLDivElement) => {
      typeof theirRef === 'function' ? theirRef(el) : theirRef && (theirRef.current = el);
      ref.current = el;
    });

    const beforeTransition = () => {
      if (ref.current) {
        ref.current.style.setProperty('--h', ref.current.scrollHeight + 'px');
      }
    };

    const afterTransition = () => {
      if (ref.current) {
        ref.current.style.removeProperty('--h');
      }
    };

    return (
      <Transition
        show={active ?? !!children}
        enterFrom="sf-collapse-out"
        enter="sf-collapse-active"
        enterTo="sf-collapse-in"
        leaveFrom="sf-collapse-in"
        leave="sf-collapse-active"
        leaveTo="sf-collapse-out"
        beforeEnter={beforeTransition}
        afterEnter={afterTransition}
        beforeLeave={beforeTransition}
        afterLeave={afterTransition}
        className={clsx('sf-collapse', className)}
        ref={callbackRef}
        {...rest}
      >
        {c}
      </Transition>
    );
  }
);

const useCacheLatestNode = (node: React.ReactNode) => {
  const lastNodeRef = useRef<React.ReactNode>(null);

  return node ? (lastNodeRef.current = node) : lastNodeRef.current;
};

export default Collapse;
