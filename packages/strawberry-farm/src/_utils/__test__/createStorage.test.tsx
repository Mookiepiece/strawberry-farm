import type { STORAGE_VALUE } from '../createStorage';
import { createStorage } from '../createStorage';

type MY_SESSION_STORAGE = STORAGE_VALUE & {
  a: number;
  b?: number;
};
describe('createStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('creates storage model', () => {
    const mySessionStorage = createStorage<MY_SESSION_STORAGE>({
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

    mySessionStorage.set({ ...mySessionStorage.value, a: 1 });
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
    const mySessionStorage0 = createStorage<MY_SESSION_STORAGE>({
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
    expect(mySessionStorage0.value.a).toBe(1);
    expect(spy).toBeCalledTimes(1);

    const mySessionStorage1 = createStorage<MY_SESSION_STORAGE>({
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
    expect(mySessionStorage1.value.a).toBe(21);
    expect(spy).toBeCalledTimes(3);
  });
});
