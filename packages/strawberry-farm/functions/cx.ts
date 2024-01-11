/**
 * @example
 * cx('a', true && 'b', false && 'c')
 */
export const cx = (...args: (string | number | null | boolean | undefined)[]) =>
  args.reduce<string>(
    (a, b) => (b && typeof b === 'string' ? a + (a && ' ') + b : a),
    '',
  );
