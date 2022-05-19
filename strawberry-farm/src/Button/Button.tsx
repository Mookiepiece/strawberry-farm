import React from 'react';

type DialogProps = {
  haircut?: boolean;
  width?: string | number;
  height?: string | number;
} & React.HtmlHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<DialogProps> = props => {
  const { haircut, children, width, height, ...rest } = props;
  return (
    <button className="sf-button" style={{ width, height }} {...rest}>
      {children}
      {haircut ? <div className="sf-hair"></div> : null}
    </button>
  );
};

export default Button;
