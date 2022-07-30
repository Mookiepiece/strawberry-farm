import React, { useRef } from 'react';
import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { Transition } from 'react-transition-group';
import { useEventCallback } from '../shared';

export type CollapsePanelProps = {
  active?: boolean;
  unmountOnExit?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    className?: ClassValue;
  };

const Collapse = React.forwardRef<HTMLDivElement, CollapsePanelProps>(
  ({ children, active, className, style, unmountOnExit, ...rest }, theirRef) => {
    const c = useCacheLatestNode(children);

    const ref = useRef<HTMLDivElement>();

    const handleExit = () => {
      if (ref.current) {
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    };

    const callbackRef = useEventCallback((el: HTMLDivElement) => {
      typeof theirRef === 'function' ? theirRef(el) : theirRef && (theirRef.current = el);
      ref.current = el;
    });

    return (
      <Transition
        in={active ?? !!children}
        timeout={300}
        onExit={handleExit}
        unmountOnExit={unmountOnExit ?? true}
      >
        {state => (
          <div
            className={clsx('sf-collapse-panel', className)}
            ref={callbackRef}
            style={{
              ...{
                entering: {
                  height: ref.current?.scrollHeight,
                  transition: 'all 0.3s var(--bezier-wave)',
                },
                entered: { height: undefined },
                exiting: {
                  height: 0,
                  marginTop: 0,
                  marginBottom: 0,
                  ...({ pointerEvents: 'none', userSelect: 'none' } as any),
                  transition: 'all 0.3s var(--bezier-wave)',
                },
                exited: { height: 0, marginTop: 0, marginBottom: 0 },
                unmounted: { height: undefined, marginTop: 0, marginBottom: 0 },
              }[state],
              ...style,
            }}
            {...rest}
          >
            {c}
          </div>
        )}
      </Transition>
    );
  }
);

const useCacheLatestNode = (node: React.ReactNode) => {
  const lastNodeRef = useRef<React.ReactNode>(null);

  return node ? (lastNodeRef.current = node) : lastNodeRef.current;
};

export default Collapse;
