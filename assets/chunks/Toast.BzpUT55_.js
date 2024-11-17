const n=`import { Bag, fx, nextFrame, on } from '../shared';\r
\r
const div = (props: { class: any | any[] }, children: any[] = []) => {\r
  const div = document.createElement('div');\r
  div.className = Array.isArray(props.class)\r
    ? props.class.filter(Boolean).join(' ')\r
    : props.class;\r
  div.append(...children.filter(Boolean));\r
  return div;\r
};\r
\r
export class ToastBarElement extends HTMLElement {\r
  offsetMap = new WeakMap<HTMLDivElement, number>();\r
  heightCacheMap = new WeakMap<HTMLDivElement, number>();\r
  sort(startIndex = 0) {\r
    if (this.getAttribute('fixed') === 'true') return;\r
\r
    const children = ([...this.children] as HTMLDivElement[]).filter(\r
      el => !el.classList.contains('leaving'),\r
    );\r
    if (!children.length) return;\r
\r
    let offsetCounter =\r
      (startIndex && this.offsetMap.get(children[startIndex - 1])) || 0;\r
\r
    for (const i of children.slice(startIndex)) {\r
      this.offsetMap.set(i, offsetCounter);\r
      i.style.setProperty('--toast-offset', offsetCounter + 'px');\r
      offsetCounter += i.offsetHeight + 10;\r
      this.heightCacheMap.set(i, i.offsetHeight);\r
    }\r
  }\r
}\r
\r
if (globalThis.window) {\r
  customElements.define('toast-bar', ToastBarElement);\r
}\r
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
        div.remove();\r
        bar.sort();\r
        bag();\r
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
\r
type ToastConfig = RawToastConfig | string | Node;\r
type ToastType = 'blank' | 'error' | 'success' | 'loading' | 'custom';\r
\r
const defaultTimeouts: Record<ToastType, number> = {\r
  blank: 4000,\r
  error: 4000,\r
  custom: 4000,\r
  loading: Infinity,\r
  success: 2000,\r
};\r
\r
const icons: Partial<Record<ToastType, string>> = {\r
  success: 'toast-i-success',\r
  error: 'toast-i-error',\r
};\r
\r
const defaultTones: Partial<Record<ToastType, string>> = {\r
  success: 'tone-rasp',\r
  error: 'tone-reimu',\r
};\r
\r
const unpackConfig = (_config: ToastConfig): RawToastConfig =>\r
  _config instanceof Node || typeof _config === 'string'\r
    ? { message: _config }\r
    : _config;\r
\r
const createToast = (_config: ToastConfig, type: ToastType) => {\r
  let { message, bar, duration } = unpackConfig(_config);\r
\r
  switch (type) {\r
    case 'success':\r
    case 'error':\r
    case 'blank':\r
      message = (() => {\r
        const iconName = icons[type];\r
        return div(\r
          {\r
            class: [\r
              'toast',\r
              'toast--styled',\r
              iconName && 'toast--rich',\r
              defaultTones[type],\r
            ],\r
          },\r
          [iconName ? div({ class: iconName }) : undefined, message],\r
        );\r
      })();\r
      break;\r
    default:\r
  }\r
\r
  return rawToast({\r
    message,\r
    duration: duration ?? defaultTimeouts[type],\r
    bar,\r
  });\r
};\r
\r
export const Toast = {\r
  defaultTimeouts,\r
  defaultTones,\r
  success: (config: ToastConfig) => createToast(config, 'success'),\r
  error: (config: ToastConfig) => createToast(config, 'error'),\r
  blank: (config: ToastConfig) => createToast(config, 'blank'),\r
  custom: (config: ToastConfig) => rawToast(unpackConfig(config)),\r
};\r
`;export{n as default};
