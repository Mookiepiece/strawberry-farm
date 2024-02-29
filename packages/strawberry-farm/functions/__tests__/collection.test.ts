import { describe, expect, it, vi } from 'vitest';
import { Bin } from '../collection';

describe('collection', () => {
  describe('Bin', () => {
    it('Very good', () => {
      const bin = Bin();
      
      // Callback Fn
      const f1 = vi.fn();
      bin(f1);
      bin(f1);
      bin(f1);
      expect(f1).not.toBeCalled();

      bin();
      expect(f1).toBeCalledTimes(1);
      f1.mockReset();

      bin();
      expect(f1).not.toBeCalled();

      // AbortController
      const a1 = new AbortController();
      const r = bin(a1);
      expect(r).toEqual(a1);
      expect(a1.signal.aborted).toBeFalsy();

      bin();
      expect(a1.signal.aborted).toBeTruthy();
    });
  });
});
