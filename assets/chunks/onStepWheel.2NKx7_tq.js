const e=`import { on } from '../shared';\r
\r
/**\r
 * To support touchpad which triggers delta less than 50 frequently.\r
 */\r
export const onStepWheel = (\r
  el: HTMLElement | SVGElement,\r
  cb: (delta: number) => void,\r
) => {\r
  let delta = 0;\r
\r
  return on(el).wheel.prevent(e => {\r
    delta += e.deltaY;\r
\r
    if (delta > 20) {\r
      delta = 0;\r
      cb(1);\r
    } else if (delta < 20) {\r
      delta = 0;\r
      cb(-1);\r
    }\r
  });\r
};\r
`;export{e as default};
