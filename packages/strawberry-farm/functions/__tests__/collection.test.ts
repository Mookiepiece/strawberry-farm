import { describe, expect, it, vi } from 'vitest';
import { Bag } from '../collection';

describe('collection', () => {
  describe('Bag', () => {
    it('Very good', () => {
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
});
