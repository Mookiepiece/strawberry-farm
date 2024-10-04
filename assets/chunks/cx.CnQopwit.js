const n=`/**\r
 * @example\r
 * cx('a', true && 'b', false && 'c', '   d e     f')\r
 */\r
export const cx = (...args: (string | number | null | boolean | undefined)[]) =>\r
  args.reduce<string>(\r
    (a, b) =>\r
      b && typeof b === 'string'\r
        ? a + (a && ' ') + b.split(' ').filter(Boolean).join(' ')\r
        : a,\r
    '',\r
  );\r
`;export{n as default};
