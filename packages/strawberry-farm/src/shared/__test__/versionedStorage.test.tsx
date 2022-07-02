import { act, render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useStorage, versionedStorage } from '../versionedStorage';

const $ = document.querySelector.bind(document);

type MyStorageValue = {
  a: number;
  b?: number;
};

describe('creates versioned storages', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('creates storage model', () => {
    const mySessionStorage = versionedStorage<MyStorageValue>({
      root: 'my',
      initialValue: { a: 0 },
      version: 14,
      storage: sessionStorage,
    });

    expect(mySessionStorage.meta.version).toBe(14);
    expect(sessionStorage.getItem('my')).toBe(
      JSON.stringify({
        meta: {
          version: 14,
        },
        a: 0,
      })
    );

    mySessionStorage.set({ ...mySessionStorage.get(), a: 1 });
    expect(sessionStorage.getItem('my')).toBe(
      JSON.stringify({
        meta: {
          version: 14,
        },
        a: 1,
      })
    );
  });

  it('upgrade if needed', () => {
    sessionStorage.setItem(
      'my',
      JSON.stringify({
        meta: {
          version: 10,
        },
        a: 0,
      })
    );

    const spy = jest.fn();
    const mySessionStorage0 = versionedStorage<MyStorageValue>({
      root: 'my',
      initialValue: { a: 1, b: 0 },
      version: 13,
      upgradeFn: {
        '10': () => {
          spy();
          throw new Error();
        },
      },
      storage: sessionStorage,
    });
    expect(mySessionStorage0.get().a).toBe(1);
    expect(spy).toBeCalledTimes(1);

    const mySessionStorage1 = versionedStorage<MyStorageValue>({
      root: 'my',
      initialValue: { a: 1, b: 0 },
      version: 15,
      upgradeFn: {
        '13': v => {
          spy();
          v.a += 10;
          return v;
        },
        '14': v => {
          spy();
          v.a += 10;
          return v;
        },
      },
      storage: sessionStorage,
    });
    expect(mySessionStorage1.get().a).toBe(21);
    expect(spy).toBeCalledTimes(3);
  });

  it('fits react lifecycle with useSyncExternalStore', () => {
    const mySessionStorage = versionedStorage<MyStorageValue>({
      root: 'my',
      initialValue: { a: 0 },
      version: 14,
      storage: sessionStorage,
    });

    const Child: React.FC<{
      setState: React.Dispatch<React.SetStateAction<MyStorageValue>>;
    }> = ({ setState }) => {
      useEffect(() => {
        setState(s => ({ a: s.a + 1 }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return <div></div>;
    };

    const Comp = () => {
      const [state, setState] = useStorage(mySessionStorage);

      useEffect(() => {
        setState(s => ({ a: s.a * 2 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <>
          <button id="a">{state.a}</button>
          <Child setState={setState} />
        </>
      );
    };

    render(<Comp />);
    const button = $('#a') as HTMLElement;

    // (0 + 1) * 2 = 2
    expect(button.innerHTML).toBe('2');
  });

  it('optimize reders by using zustand selectors', () => {
    const mySessionStorage = versionedStorage<MyStorageValue>({
      root: 'my',
      initialValue: { a: 0 },
      version: 14,
      storage: sessionStorage,
    });

    const spy = jest.fn();

    const Comp = () => {
      const [a] = useStorage(mySessionStorage, s => [s.a]);

      spy();

      return <>{a[0]}</>;
    };

    render(<Comp />);

    expect(spy).toBeCalledTimes(1);

    act(() => mySessionStorage.set({ a: 0, b: 2 }));
    expect(spy).toBeCalledTimes(1);
    act(() => mySessionStorage.set({ a: 1, b: 2 }));
    expect(spy).toBeCalledTimes(2);
  });
});
