import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import type { ClassValue } from 'clsx';
import clsx from 'clsx';

export type CollapsePanelProps = {
  active?: boolean;
  unmountOnExit?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    className?: ClassValue;
  };

const CollapsePanel: React.FC<CollapsePanelProps> = ({
  children,
  active,
  className,
  style,
  unmountOnExit,
  ...rest
}) => {
  const c = useCacheLatestNode(children);

  const ref = useRef<HTMLDivElement>(null);

  const handleExit = () => {
    if (ref.current) {
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      void ref.current.scrollHeight; // trigger browsers reflow to apply the height.
      // https://github.com/reactjs/react-transition-group/blob/master/src/CSSTransition.js#L193
    }
  };

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
          ref={ref}
          style={{
            ...{
              entering: {
                height: ref.current?.scrollHeight,
                transition: 'all 0.3s cubic-bezier(0.66, 0, 0, 1)',
              },
              entered: { height: undefined },
              exiting: {
                height: 0,
                marginTop: 0,
                marginBottom: 0,
                ...({ pointerEvents: 'none', userSelect: 'none' } as any),
                transition: 'all 0.3s',
              },
              exited: { height: 0 },
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
};

const useCacheLatestNode = (node: React.ReactNode) => {
  const lastNodeRef = useRef<React.ReactNode>(null);

  return node ? (lastNodeRef.current = node) : lastNodeRef.current;
};

export default CollapsePanel;
