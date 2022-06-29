import React from 'react';
import { Button } from '🦄';
import { useStorage, versionedStorage } from '🦄/shared';

const demo_storage = versionedStorage({
  root: 'demo',
  version: 1,
  initialValue: { a: 0 },
  storage: sessionStorage,
});

const BasicUsage: React.FC = () => {
  const [state, setState] = useStorage(demo_storage);

  return <Button onClick={() => setState(({ a }) => ({ a: a + 1 }))}>Count: {state.a}</Button>;
};
export default BasicUsage;
