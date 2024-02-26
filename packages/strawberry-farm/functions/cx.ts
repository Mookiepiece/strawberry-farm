/**
 * @example
 * cx('a', true && 'b', false && 'c', '   d e     f')
 */
export const cx = (...args: (string | number | null | boolean | undefined)[]) =>
  args.reduce<string>(
    (a, b) =>
      b && typeof b === 'string'
        ? a + (a && ' ') + b.split(' ').filter(Boolean).join(' ')
        : a,
    '',
  );
