const e=`import { on } from '../shared';\r
\r
/**\r
 * Using pointerdown, otherwise click other interactive elements will lost their focus but focus on the popper reference.\r
 */\r
export const onClickAway = (\r
  ref: HTMLElement | SVGElement | (HTMLElement | SVGElement)[],\r
  cb: () => void,\r
) => {\r
  const elements = Array.isArray(ref) ? ref : [ref];\r
\r
  return on(document).pointerdown.capture(e => {\r
    if (elements.every(el => el?.contains(e.target as Node) === false)) cb();\r
  });\r
};\r
`;export{e as default};
