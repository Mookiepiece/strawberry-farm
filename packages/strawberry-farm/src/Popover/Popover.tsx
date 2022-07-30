import React, { useState, useCallback, useMemo } from 'react';
import Popper from '../Popper';
import type { PopperProps } from '../Popper';
import { useEventCallback } from '../shared';

export type PopoverProps = Omit<PopperProps, 'onClose' | 'visible'> & {
  trigger?: 'click' | 'hover' | 'focus';
  timeout?: number;
};

/**
 * ```txt
 * Popover Signal
 * ^        ^^
 * ```
 */
enum PIG {
  CLICK = 1,
  HOVER = 1 << 1,
  FOCUS = 1 << 2,
  HOVER_POPUP = 1 << 3,
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  timeout,
  children,
  closeOnClickOutside,
  popup,
  ...rest
}) => {
  const [_visible, setVisible] = useState(0);

  const visible = !!_visible;

  const [timers] = useState(() => new Map<PIG, NodeJS.Timeout>());
  const clearHideTimer = useCallback(
    (pig: PIG) => {
      if (timers.has(pig)) {
        clearTimeout(timers.get(pig));
        timers.delete(pig);
      }
    },
    [timers]
  );

  const show = useEventCallback((pig: PIG) => {
    clearHideTimer(pig);
    timers.set(
      pig,
      setTimeout(
        () => setVisible(v => v | pig),
        pig === PIG.HOVER || pig === PIG.HOVER_POPUP ? timeout || 300 : timeout || 0
      )
    );
  });
  const hide = useEventCallback((pig: PIG) => {
    clearHideTimer(pig);
    timers.set(
      pig,
      setTimeout(
        () => setVisible(v => v & ~pig),
        pig === PIG.HOVER || pig === PIG.HOVER_POPUP ? timeout || 300 : timeout || 0
      )
    );
  });
  const toggle = useEventCallback((pig: PIG) => (!visible ? show(pig) : hide(pig)));

  const { popupProps, referenceElProps } = useMemo(() => {
    if (trigger === 'click') {
      return strategyOfClick({ hide, show, toggle });
    }
    if (trigger === 'focus') {
      return strategyOfFocus({ hide, show, toggle });
    }
    if (trigger === 'hover') {
      return {
        popupProps: {
          ...strategyOfFocus({ hide, show, toggle }).popupProps,
          ...strategyOfHover({ hide, show, toggle }).popupProps,
        },
        referenceElProps: {
          ...strategyOfFocus({ hide, show, toggle }).referenceElProps,
          ...strategyOfHover({ hide, show, toggle }).referenceElProps,
        },
      };
    }
    throw new Error();
  }, [hide, show, toggle, trigger]);

  return (
    <Popper
      {...rest}
      popup={<div {...popupProps}>{popup}</div>}
      visible={visible}
      onClose={() => setVisible(0)}
      closeOnClickOutside={
        typeof closeOnClickOutside === 'boolean' ? closeOnClickOutside : trigger !== 'hover'
      }
    >
      {React.cloneElement(children, {
        ...mergeNodeOriginalEventListeners(children, referenceElProps),
      })}
    </Popper>
  );
};

export default Popover;

type PopoverStrategy = (args: {
  hide(pig: PIG): void;
  show(pig: PIG): void;
  toggle(pig: PIG): void;
}) => {
  popupProps?: Partial<React.HTMLAttributes<HTMLElement>>;
  referenceElProps: Partial<React.HTMLAttributes<HTMLElement>>;
};

const strategyOfClick: PopoverStrategy = ({ toggle }) => {
  return {
    referenceElProps: {
      onClick: () => toggle(PIG.CLICK),
    },
  };
};

// https://w3c.github.io/uievents/#event-type-mouseenter
// touch will trigger mouseenter events ???????
const strategyOfHover: PopoverStrategy = ({ hide, show }) => {
  return {
    popupProps: {
      onMouseEnter: () => show(PIG.HOVER_POPUP),
      onMouseLeave: () => hide(PIG.HOVER_POPUP),
    },
    referenceElProps: {
      onMouseEnter: () => show(PIG.HOVER),
      onMouseLeave: () => hide(PIG.HOVER),
    },
  };
};

const strategyOfFocus: PopoverStrategy = ({ hide, show }) => {
  return {
    referenceElProps: {
      onFocus: () => show(PIG.FOCUS),
      onBlur: () => hide(PIG.FOCUS),
    },
  };
};

const mergeNodeOriginalEventListeners = <T extends (...args: any[]) => any>(
  child: React.ReactElement,
  props: React.HTMLAttributes<HTMLElement>
): T => {
  return Object.fromEntries(
    Object.entries(props).map(([k, v]) => {
      if (k.startsWith('on') && typeof v === 'function') {
        return [
          k,
          (...args: any[]) => {
            child.props[k]?.(...args);
            v(...args);
          },
        ];
      }

      return [k, v];
    })
  ) as any as T;
};
