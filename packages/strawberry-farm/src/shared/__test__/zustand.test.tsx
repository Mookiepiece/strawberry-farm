import React from 'react';
import { act, render } from '@testing-library/react';
import { zustand } from '../zustand';

describe('zustand', () => {
  it('always runs in `replace` mode', () => {
    const useStore = zustand<{
      a?: number;
      c?: number;
      x: () => number;
      y: () => void;
      z: () => void;
    }>((set, get) => ({
      a: 1,
      c: 3,
      x: () => {
        set(v => ({ x: v.x, y: v.y, z: v.z }));
        return 1;
      },
      y: () => set(v => ({ ...v, a: (get().a ?? 0) + 1 })),
      z: () => set(v => ({ ...v, a: (v.a ?? 0) + 1 })),
    }));

    // Initial value
    expect(useStore.getState().a).toBe(1);
    expect(useStore.getState().c).toBe(3);

    // Instance Methods I
    const num = useStore.getState().x();
    expect(num).toBe(1);
    expect(useStore.getState().a).toBe(undefined);
    expect(useStore.getState().c).toBe(undefined);
    expect(typeof useStore.getState().x).toBe('function');

    // Store API I
    useStore.setState(v => ({ ...v, a: 0 }));
    expect(useStore.getState().a).toBe(0);
    expect(useStore.getState().c).toBe(undefined);

    // Instance Methods II
    useStore.getState().y();
    expect(useStore.getState().a).toBe(1);
    useStore.getState().z();
    expect(useStore.getState().a).toBe(2);

    // Store API II
    useStore.setState(() => ({ x: () => 2, y: () => {}, z: () => {} }));
    expect(useStore.getState().x()).toBe(2);
    useStore.setState({ a: 1, x: () => 2, y: () => {}, z: () => {} });
    expect(useStore.getState().a).toBe(1);
    expect(useStore.getState().c).toBe(undefined);
  });

  it('inherits vanilla zustand functionality', () => {
    const useStore = zustand<{
      a?: number;
      c?: number;
    }>(() => ({
      a: 1,
      c: 3,
    }));

    const spy = jest.fn();
    const Comp = () => {
      const state = useStore();
      spy(state);

      return (
        <div className="modal">
          <button className="close"></button>
        </div>
      );
    };

    const spy2 = jest.fn();
    const Comp2 = () => {
      const a = useStore(s => s.a);
      spy2(a);

      return (
        <div className="modal">
          <button className="close"></button>
        </div>
      );
    };

    render(
      <>
        <Comp />
        <Comp2 />
      </>
    );

    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);

    act(() => {
      useStore.setState({ a: 1, c: 4 });
    });

    expect(spy).toBeCalledTimes(2);
    expect(spy2).toBeCalledTimes(1);
  });
});
