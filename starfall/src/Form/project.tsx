/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FormSubscription } from './FormSubscription';

export const project = <T extends string, P extends T | T[]>(
  name: P,
  render: (model: any) => React.ReactNode,
  meta?: {
    onUpdate?: (newValue: any) => void;
  }
): React.ReactElement => {
  return <FormSubscription names={name} {...meta} render={render} />;
};
