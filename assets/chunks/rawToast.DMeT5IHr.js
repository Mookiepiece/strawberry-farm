const r=`import { Bag, fx, inc, nextFrame, on } from '../shared';\r
import { type ToastBarElement } from '../html/ToastBarElement';\r
\r
const uuid = inc('ToastItem');\r
\r
export type RawToastConfig = {\r
  message: string | Node;\r
  bar?: string;\r
  duration?: number;\r
};\r
\r
export const rawToast = ({\r
  message,\r
  duration = 4000,\r
  bar: _bar = 'ToastBarTopCenter',\r
}: RawToastConfig) => {\r
  const bar = document.getElementById(_bar) as ToastBarElement;\r
  const div = document.createElement('div');\r
  div.id = uuid();\r
  div.classList.add('f2');\r
  div.setAttribute('role', 'log');\r
  div.append(message);\r
\r
  const onClose = Bag();\r
  const bag = Bag();\r
\r
  const close = () => {\r
    onClose();\r
\r
    fx.transition(div, {\r
      from() {\r
        div.classList.add('leaving');\r
      },\r
      done() {\r
        bag();\r
        div.remove();\r
        bar.sort();\r
      },\r
    });\r
  };\r
\r
  const mo = new MutationObserver(() => {\r
    // This excutes many times, e.g. adding entering class name\r
    // If we don't want to get an infinite loop in google chrome\r
    if (div.offsetHeight !== bar.heightCacheMap.get(div)) {\r
      bar.sort();\r
    }\r
  });\r
  mo.observe(div, {\r
    subtree: true,\r
    childList: true,\r
    attributes: true,\r
    characterData: true,\r
  });\r
  onClose(() => mo.disconnect());\r
\r
  let timer: ReturnType<typeof setTimeout>;\r
  const pause = () => clearTimeout(timer);\r
  const play = () => {\r
    if (Number.isFinite(duration)) {\r
      timer = setTimeout(close, duration);\r
    }\r
  };\r
  play();\r
  onClose(on(div).pointerenter(pause));\r
  onClose(on(div).pointerleave(play));\r
\r
  bar.insertBefore(div, bar.firstElementChild);\r
  div.classList.add('entering');\r
  nextFrame(() => {\r
    div.classList.remove('entering');\r
    bar.sort();\r
  });\r
\r
  return { div, pause, play, close, bag };\r
};\r
`;export{r as default};
