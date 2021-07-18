import clsx from 'clsx';
import React from 'react';
import Spin from '../Spin';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  height?: string | number;
  primary?: boolean;
  textual?: boolean;
  block?: boolean;
  solid?: boolean;
  loading?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

const Button: React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLButtonElement> & ButtonProps
> = React.forwardRef(
  (
    {
      type = 'button',
      primary,
      textual,
      block,
      solid,
      loading = false,
      disabled,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={clsx(
          className,
          'st-button',
          primary ? 'st-button--primary' : textual ? 'st-button--textual' : 'st-button--default',
          block && 'st-button--block',
          loading && 'st-button--loading',
          solid && 'st-button--solid'
        )}
        disabled={disabled || loading}
        ref={ref}
        {...rest}
      >
        <Spin weight={1} loading={loading} />
        <span className="st-button__content">{children}</span>
      </button>
    );
  }
);

export default Button;
