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

  const hideTimer = useRef<NodeJS.Timeout>();
  const clearHideTimer = () => hideTimer.current && clearTimeout(hideTimer.current);
  const show = () => {
    clearHideTimer();
    setLocalVisible(true);
  };
  const hide = () =>
    (hideTimer.current = setTimeout(
      () => {
        setLocalVisible(false);
        _onClose?.();
      },
      trigger === 'hover' ? timeout || 200 : timeout || 0
    ));

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
          children.props.onMouseEnter?.(e);
        }
      : children.props.onMouseEnter;
  const onMouseLeave =
    trigger === 'hover'
      ? (e: React.MouseEvent) => {
          hide();
          children.props.onMouseLeave?.(e);
        }
      : children.props.onMouseLeave;
  const onFocus =
    trigger === 'focus'
      ? (e: React.FocusEvent) => {
          show();
          children.props.onFocus?.(e);
        }
      : undefined;
  const onBlur =
    trigger === 'focus'
      ? (e: React.FocusEvent) => {
          hide();
          children.props.onBlur?.(e);
        }
      : undefined;

  return (
    <Popper
      {...rest}
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
