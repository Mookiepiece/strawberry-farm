const e=`import { on } from '../shared';\r
\r
/**\r
 * Using pointerdown, otherwise click other interactive elements will lost their focus but focus on the popper reference.\r
 */\r
export const onClickAway = (ref: Element | Element[], cb: () => void) => {\r
  const elements = Array.isArray(ref) ? ref : [ref];\r
\r
  return on(document).pointerdown.capture(e => {\r
    if (elements.every(el => el.contains(e.target as Node) === false)) cb();\r
  });\r
};\r
`;export{e as default};
