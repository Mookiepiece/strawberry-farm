import { describe, expect, it } from 'vitest';
import { cx } from '../cx';

describe('cx', () => {
  it('works', () => {
    expect(cx('a', true && 'b', false && 'c', '   d e     f')).toBe(
      'a b d e f',
    );
  });
});
