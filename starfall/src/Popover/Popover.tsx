import React, { useState, useEffect, useRef } from 'react';
import Popper from '../Popper';
import type { PopperProps } from '../Popper';

export type PopoverProps = PopperProps & {
  trigger?: 'click' | 'hover' | 'focus';
  timeout?: number;
};

const Popover: React.FC<PopoverProps> = ({
  trigger,
  timeout,
  children,
  visible,
  onClose: _onClose,
  closeOnClickOutside,
  popup,
  ...rest
}) => {
  const [localVisible, setLocalVisible] = useState(false);

  useEffect(() => {
    if (!trigger) {
      if (typeof visible !== 'boolean') {
        throw new Error('[st-popover] visible muse be provide if trigger not provided');
      }
      setLocalVisible(visible);
    }
  }, [visible, trigger]);

  // FEAT: hoving popup will also not close the popup.
  const hovingRef = useRef(false);

  // FRAT: show & hide, lazy hide
  const hideTimer = useRef<NodeJS.Timeout>();
  const clearHideTimer = () => hideTimer.current && clearTimeout(hideTimer.current);
  const show = () => {
    clearHideTimer();
    setLocalVisible(true);
  };
  const hide = () => {
    clearHideTimer();
    hideTimer.current = setTimeout(
      () => {
        setLocalVisible(false);
        _onClose?.();
      },
      trigger === 'hover' ? timeout || 500 : timeout || 0
    );
  };

  // FEAT: preset triggers
  const onClick =
    trigger === 'click'
      ? (e: React.MouseEvent) => {
          localVisible ? hide() : show();
          children.props.onClick?.(e);
        }
      : children.props.onClick;
  // https://w3c.github.io/uievents/#event-type-mouseenter
  // touch will trigger mouseenter events
  const onMouseEnter =
    trigger === 'hover'
      ? (e: React.MouseEvent) => {
          show();
          hovingRef.current = true;
          children.props.onMouseEnter?.(e);
        }
      : children.props.onMouseEnter;
  const onMouseLeave =
    trigger === 'hover'
      ? (e: React.MouseEvent) => {
          hide();
          hovingRef.current = false;
          children.props.onMouseLeave?.(e);
        }
      : children.props.onMouseLeave;
  const onFocus =
    trigger === 'focus' || trigger === 'hover'
      ? (e: React.FocusEvent) => {
          show();
          children.props.onFocus?.(e);
        }
      : undefined;
  const onBlur =
    trigger === 'focus' || trigger === 'hover'
      ? (e: React.FocusEvent) => {
          // NOTE: `blur` will trigger after `mouseEnter`, causing close the popup when click the popup.
          // this is also where `hovingRef` takes into effect.
          if (!(trigger === 'hover' && hovingRef.current === true)) {
            hide();
          }
          children.props.onBlur?.(e);
        }
      : undefined;

  return (
    <Popper
      {...rest}
      popup={
        <div
          onMouseEnter={
            trigger === 'hover'
              ? () => {
                  hovingRef.current = true;
                  clearHideTimer();
                }
              : undefined
          }
          onMouseLeave={
            trigger === 'hover'
              ? () => {
                  hovingRef.current = false;
                  hide();
                }
              : undefined
          }
        >
          {popup}
        </div>
      }
      visible={localVisible}
      onClose={trigger ? hide : _onClose}
      closeOnClickOutside={
        typeof closeOnClickOutside === 'boolean' ? closeOnClickOutside : trigger !== 'hover'
      }
    >
      {React.cloneElement(children, {
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
      })}
    </Popper>
  );
};

export default Popover;
