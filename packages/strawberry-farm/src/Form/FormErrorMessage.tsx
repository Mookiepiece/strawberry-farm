import clsx from 'clsx';
import React from 'react';
import Collapse from '../Collapse';

export const FormErrorMessage: React.FC = ({ children }) => {
  return (
    <span className={clsx('sf-error-message', children && 'sf-error-message--active')}>
      <Collapse active={!!children} unmountOnExit>
        {children}
      </Collapse>
    </span>
  );
};
