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

type CreateStateModeRegistry<T> = () => [
  React.FC<{
    model: [T[], React.Dispatch<React.SetStateAction<T[]>>];
  }>,
  (i: T | undefined) => void,
  () => T[]
];

export const createStateModeRegistry = <T,>(): ReturnType<CreateStateModeRegistry<T>> => {
  const RegistryContext = React.createContext<{
    register(i: T): void;
    unregister(i: T): void;
  }>({
    register() {},
    unregister() {},
  });

  const RegistrySelectorContext = React.createContext<T[]>([]);

  const RegistryProvider: React.FC<{
    model: [T[], React.Dispatch<React.SetStateAction<T[]>>];
  }> = ({ model: [items, setItems], children }) => {
    const register = useCallback((i: T) => setItems(items => [...items, i]), [setItems]);

    const unregister = useCallback(i => setItems(items => items.filter(k => k === i)), [setItems]);

    const registerContextValue = useMemo(() => ({ register, unregister }), [register, unregister]);
    const registerSelectorContextValue = items;

    return (
      <RegistryContext.Provider value={registerContextValue}>
        <RegistrySelectorContext.Provider value={registerSelectorContextValue}>
          {children}
        </RegistrySelectorContext.Provider>
      </RegistryContext.Provider>
    );
  };

  const useRegistry = (i?: T | undefined): void => {
    const { register, unregister } = useContext(RegistryContext);

    useEffect(() => {
      if (i !== undefined) {
        register(i);
        return () => unregister(i);
      }
    }, [i, register, unregister]);
  };

  const useRegistrySelector = () => useContext(RegistrySelectorContext);

  return [RegistryProvider, useRegistry, useRegistrySelector];
};
