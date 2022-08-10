import clsx from 'clsx';
import React from 'react';
import Collapse from '../Collapse';

export const FormErrorMessage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <span className={clsx('sf-error-message', children && 'sf-error-message--active')}>
      <Collapse active={!!children}>
        {children}
      </Collapse>
    </span>
  );
};
