import { describe, expect, it, vi } from 'vitest';
import { Bag, Bags } from '../collection';

describe('collection', () => {
  describe('Bag', () => {
    it('works', () => {
      const bag = Bag();

      // Callback Fn
      const f1 = vi.fn();
      bag(f1);
      bag(f1);
      bag(f1);
      expect(f1).not.toBeCalled();

      bag();
      expect(f1).toBeCalledTimes(1);
      f1.mockReset();

      bag();
      expect(f1).not.toBeCalled();

      // AbortController
      const a1 = new AbortController();
      const r = bag(a1);
      expect(r).toEqual(a1);
      expect(a1.signal.aborted).toBeFalsy();

      bag();
      expect(a1.signal.aborted).toBeTruthy();
    });
  });

  describe('Bags', () => {
    it('works', () => {
      const { getBag, resetBag, weakMap } = Bags();

      const a = {};
      const bag = resetBag(a);

      const s1 = bag(new AbortController()).signal;

      expect(getBag(a)).toBe(weakMap.get(a));
      expect(s1.aborted).toBe(false);

      expect(resetBag(a)).toBe(weakMap.get(a));
      expect(s1.aborted).toBe(true);
    });
  });
});
