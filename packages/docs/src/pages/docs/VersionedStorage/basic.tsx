import React from 'react';
import { Button } from '🦄';
import { useStorage, versionedStorage } from '🦄/shared';

const demo_storage = versionedStorage({
  root: 'demo',
  version: 1,
  initialValue: { count: 0 },
  storage: sessionStorage,
});

const BasicUsage: React.FC = () => {
  const [state, setState] = useStorage(demo_storage);

  return (
    <Button onClick={() => setState(({ count }) => ({ count: count + 1 }))}>
      Count: {state.count}
    </Button>
  );
};
export default BasicUsage;
