import React from 'react';
import { Button } from '🦄';
import { zustand } from '🦄/shared';

const useStore = zustand(() => ({ count: 1 }));

const BasicUsage: React.FC = () => {
  const { count } = useStore();

  return (
    <Button onClick={() => useStore.setState(s => ({ ...s, count: s.count + 1 }))}>
      Count: {count}
    </Button>
  );
};

export default BasicUsage;
