import React from 'react';
import clsx from 'clsx';
import Spin from '../Spin';
import { bem } from '../shared/bem';
type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  height?: string | number;
  primary?: boolean;
  textual?: boolean;
  block?: boolean;
  solid?: boolean;
  loading?: boolean;
  haircut?: boolean;
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
      haircut,
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
          bem('sf-button', {
            primary,
            textual,
            default: !textual && !primary,
            block,
            loading,
            solid,
          })
        )}
        disabled={disabled || loading}
        ref={ref}
        {...rest}
      >
        <span className="sf-button__content">{children}</span>
        <Spin weight={1} loading={loading} />
        {haircut ? <span className="sf-haircut"></span> : null}
      </button>
    );
  }
);

export default Button;
