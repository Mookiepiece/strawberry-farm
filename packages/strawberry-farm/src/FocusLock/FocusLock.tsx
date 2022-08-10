import React, { useEffect, useRef } from 'react';

const activeElements: Element[] = [];

const pushActiveElements = activeElements.push.bind(activeElements);

const popActiveElements = () => {
  let el;
  while ((el = activeElements.pop())) {
    if (document.body.contains(el)) {
      return el;
    }
  }
};

const FocusLock: React.FC<{
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  children?: React.ReactNode;
}> = ({ disabled, onKeyDown, children }) => {
  const sentinelStartRef = useRef<HTMLDivElement>(null);
  const sentinelEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;

    const prevActiveElement = document.activeElement;
    sentinelStartRef.current?.focus();
    if (prevActiveElement) {
      pushActiveElements(prevActiveElement);
      return () => {
        (popActiveElements() as any)?.focus?.();
      };
    }
  }, [disabled]);

  return (
    <>
      <div
        ref={sentinelStartRef}
        aria-hidden="true"
        className="st-focus-sentinel"
        tabIndex={0}
        onKeyDown={e => {
          if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
            sentinelEndRef.current?.focus();
          }
          onKeyDown?.(e);
        }}
      ></div>
      {children}
      <div
        ref={sentinelEndRef}
        aria-hidden="true"
        className="st-focus-sentinel"
        tabIndex={0}
        onKeyDown={e => {
          if (!e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
            sentinelStartRef.current?.focus();
          }
          onKeyDown?.(e);
        }}
      ></div>
    </>
  );
};

export default FocusLock;
