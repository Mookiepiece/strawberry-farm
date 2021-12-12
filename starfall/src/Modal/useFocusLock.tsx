import React, { useEffect, useRef } from 'react';

const activeElements: HTMLElement[] = [];

const pushActiveElements = activeElements.push.bind(activeElements);

const popActiveElements = () => {
  let el;
  while ((el = activeElements.pop())) {
    if (document.body.contains(el)) {
      return el;
    }
  }
};

const useFocusLock = ({
  disabled,
  ref,
}: {
  disabled?: boolean;
  ref: React.MutableRefObject<HTMLElement | null>;
}) => {
  useEffect(() => {
    if (!disabled) {
      const lastActiveElement = document.activeElement;
      if (lastActiveElement instanceof HTMLElement) {
        pushActiveElements(lastActiveElement);
      }
      ref.current?.focus();
    } else {
      popActiveElements()?.focus();
    }
  }, [disabled, ref]);

  return;
};

export const FocusLock: React.FC<{
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}> = ({ disabled, onKeyDown, children }) => {
  const sentinelStartRef = useRef<HTMLDivElement>(null);
  const sentinelStartInnerRef = useRef<HTMLDivElement>(null);
  const sentinelEndRef = useRef<HTMLDivElement>(null);
  const sentinelEndInnerRef = useRef<HTMLDivElement>(null);

  useFocusLock({
    disabled,
    ref: sentinelStartInnerRef,
  });

  return (
    <>
      <div
        ref={sentinelStartRef}
        aria-hidden="true"
        className="st-focus-sentinel"
        onFocus={e => {
          sentinelEndInnerRef.current?.focus();
        }}
        tabIndex={0}
      ></div>
      <div
        ref={sentinelStartInnerRef}
        aria-hidden="true"
        className="st-focus-sentinel"
        tabIndex={0}
        onKeyDown={onKeyDown}
      ></div>
      {children}
      <div
        ref={sentinelEndInnerRef}
        aria-hidden="true"
        className="st-focus-sentinel"
        tabIndex={0}
        onKeyDown={onKeyDown}
      ></div>
      <div
        ref={sentinelEndRef}
        aria-hidden="true"
        className="st-focus-sentinel"
        onFocus={e => {
          sentinelStartInnerRef.current?.focus();
        }}
        tabIndex={0}
      ></div>
    </>
  );
};
