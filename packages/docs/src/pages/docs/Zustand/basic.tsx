import React from 'react';
import { Button } from '🦄';
import { zustand, ZustandStore } from '🦄/shared';

const useStore = zustand(() => ({ a: 1 }));

const BasicUsage: React.FC = () => {
  const { a } = useStore();

  return <Button onClick={() => useStore.setState(s => ({ ...s, a: s.a + 1 }))}>Count: {a}</Button>;
};

export default BasicUsage;
