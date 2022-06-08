import React, { useCallback, useContext, useEffect } from 'react';

export const createRegistry = <T,>(): [
  React.FC<{ itemsRef: React.MutableRefObject<T[]> }>,
  (i: T | undefined) => void
] => {
  const RegistryContext = React.createContext<(i: T) => () => void>(() => () => {});

  const RegistryProvider: React.FC<{
    itemsRef: React.MutableRefObject<T[]>;
  }> = ({ itemsRef: items, children }) => {
    const register = useCallback(
      (i: T) => {
        items.current = [...items.current, i];

        return () => {
          const index = items.current.findIndex(k => k === i);
          if (index !== -1) {
            items.current = [...items.current.slice(0, index), ...items.current.slice(index + 1)];
          } else {
        throw new Error('[strawberry-farm] ')
          }
        };
      },
      [items]
    );

    return <RegistryContext.Provider value={register}>{children}</RegistryContext.Provider>;
  };

  const useRegistry = (i: T | undefined): void => {
    const register = useContext(RegistryContext);

    useEffect(() => {
      if (i !== undefined) {
        return register(i);
      }
    }, [i, register]);
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
  const RegistryContext = React.createContext<(i: T) => () => void>(() => () => {});

  const RegistrySelectorContext = React.createContext<T[]>([]);

  const RegistryProvider: React.FC<{
    model: [T[], React.Dispatch<React.SetStateAction<T[]>>];
  }> = ({ model: [items, setItems], children }) => {
    const register = useCallback(
      (i: T) => {
        setItems(items => [...items, i]);

        return () => {
          setItems(items => {
            const index = items.findIndex(k => k === i);
            if (index !== -1) {
              return [...items.slice(0, index), ...items.slice(index + 1)];
            }
            return items;
          });
        };
      },
      [setItems]
    );

    const registerSelectorContextValue = items;

    return (
      <RegistryContext.Provider value={register}>
        <RegistrySelectorContext.Provider value={registerSelectorContextValue}>
          {children}
        </RegistrySelectorContext.Provider>
      </RegistryContext.Provider>
    );
  };

  const useRegistry = (i: T | undefined): void => {
    const register = useContext(RegistryContext);

    useEffect(() => {
      if (i !== undefined) {
        return register(i);
      }
    }, [i, register]);
  };

  const useRegistrySelector = () => useContext(RegistrySelectorContext);

  return [RegistryProvider, useRegistry, useRegistrySelector];
};
