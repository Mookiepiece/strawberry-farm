import clsx from 'clsx';
import React from 'react';
import Collapse from '../Collapse';

export const FormErrorMessage: React.FC = ({ children }) => {
  return (
    <span className={clsx('st-error-message', children && 'st-error-message--active')}>
      <Collapse.Panel active={!!children} unmountOnExit>
        {children}
      </Collapse.Panel>
    </span>
  );
};
