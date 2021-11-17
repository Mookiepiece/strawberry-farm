import React, { useCallback, useContext, useEffect, useMemo } from 'react';

export const createRegistry = <T,>(): [
  React.FC<{ itemsRef: React.MutableRefObject<T[]> }>,
  (i: T | undefined) => void
] => {
  const RegistryContext = React.createContext<{
    register(i: T): void;
    unregister(i: T): void;
  }>({
    register() {},
    unregister() {},
  });

  const RegistryProvider: React.FC<{
    itemsRef: React.MutableRefObject<T[]>;
  }> = ({ itemsRef: items, children }) => {
    const register = useCallback(
      (i: T) => {
        items.current = [...items.current, i];
      },
      [items]
    );

    const unregister = useCallback(
      i => {
        const index = items.current.findIndex(k => k === i);
        if (index !== -1) {
          items.current = [...items.current.slice(0, index), ...items.current.slice(index + 1)];
        }
      },
      [items]
    );

    const registryContextValue = useMemo(() => ({ register, unregister }), [register, unregister]);

    return (
      <RegistryContext.Provider value={registryContextValue}>{children}</RegistryContext.Provider>
    );
  };

  const useRegistry = (i: T | undefined): void => {
    const { register, unregister } = useContext(RegistryContext);

    useEffect(() => {
      if (i !== undefined) {
        register(i);
        return () => unregister(i);
      }
    }, [i, register, unregister]);
  };

  return [RegistryProvider, useRegistry];
};
