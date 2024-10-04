const n=`import { Bag } from './collection';\r
import { on } from './on';\r
\r
export type Direction = 'top' | 'right' | 'bottom' | 'left';\r
export type Alignment = 'start' | 'end';\r
\r
type Levitate = typeof _levitate & {\r
  auto: typeof auto;\r
};\r
\r
export type PopConfigs = {\r
  $anc: { getBoundingClientRect(): DOMRect };\r
  $pop: HTMLElement;\r
  anc: DOMRect;\r
\r
  dir: Direction;\r
  align?: Alignment;\r
\r
  map: DOMRect;\r
  viewport: DOMRect;\r
\r
  x?: number;\r
  y?: number;\r
};\r
\r
export interface PopPlugin {\r
  (configs: PopConfigs): PopConfigs;\r
  post?: boolean;\r
}\r
\r
const isScrollableElement = (p: Element) => {\r
  const { overflowY, overflowX } = getComputedStyle(p);\r
  return /auto|scroll/.test(overflowY + overflowX);\r
};\r
\r
const auto = (_anc: unknown | [unknown, unknown], cb: () => void) => {\r
  const bag = Bag();\r
\r
  const [$anc, $pop] = Array.isArray(_anc) ? _anc : [_anc];\r
  const ro = new ResizeObserver(cb);\r
  bag(() => ro.disconnect());\r
  $anc && $anc instanceof Element && ro.observe($anc);\r
  $pop && $pop instanceof Element && ro.observe($pop);\r
\r
  bag(on(window).resize(cb));\r
\r
  if ($anc && $anc instanceof Element)\r
    for (\r
      let p: Element | null = $anc;\r
      p && p !== document.documentElement;\r
      p = p.parentElement\r
    )\r
      if (isScrollableElement(p)) bag(on(p).scroll(() => cb())); // ancestorScroll @floating-ui/core@1.6\r
\r
  return () => bag();\r
};\r
\r
const clamp = (min = 0, a: number, max = 100) =>\r
  Math.min(max, Math.max(a, min));\r
\r
export const clipMap = ({\r
  dir,\r
  anc,\r
  viewport: view,\r
}: Pick<PopConfigs, 'dir' | 'anc' | 'viewport'>) => {\r
  switch (dir) {\r
    case 'top': {\r
      const height = clamp(0, anc.top - view.top, view.height);\r
      const bottom = view.top + height;\r
      return { ...view, bottom, height };\r
    }\r
    case 'right': {\r
      const width = clamp(0, view.right - anc.right, view.width);\r
      const x = view.right - width;\r
      return { ...view, left: x, x, width };\r
    }\r
    case 'bottom': {\r
      const height = clamp(0, view.bottom - anc.bottom, view.height);\r
      const y = view.bottom - height;\r
      return { ...view, top: y, y, height };\r
    }\r
    case 'left': {\r
      const width = clamp(0, anc.left - view.left, view.width);\r
      const right = view.left + width;\r
      return { ...view, right, width };\r
    }\r
  }\r
};\r
\r
const Align = (config: PopConfigs): PopConfigs => {\r
  let { anc, $pop, dir, align: alignment } = config;\r
\r
  const pop = {\r
    width: $pop.offsetWidth,\r
    height: $pop.offsetHeight,\r
  };\r
\r
  let map = config.map!;\r
\r
  let x = 0,\r
    y = 0;\r
\r
  if (dir === 'top' || dir === 'bottom') {\r
    y = dir === 'top' ? map.bottom - pop.height : map.top;\r
\r
    if (alignment === 'start') {\r
      x = anc.left;\r
    } else if (alignment === 'end') {\r
      x = anc.right - pop.width;\r
    } else {\r
      x = Math.round((anc.left + anc.right) / 2 - pop.width / 2);\r
    }\r
    x = clamp(map.left, x, map.right - pop.width);\r
  } else {\r
    x = dir === 'left' ? map.right - pop.width : map.left;\r
\r
    if (alignment === 'start') {\r
      y = anc.top;\r
    } else if (alignment === 'end') {\r
      y = anc.bottom - pop.height;\r
    } else {\r
      y = Math.round((anc.top + anc.bottom) / 2 - pop.height / 2);\r
    }\r
    y = clamp(map.top, y, map.bottom - pop.height);\r
  }\r
\r
  return { ...config, x, y };\r
};\r
\r
const _levitate = (\r
  $anc: { getBoundingClientRect(): DOMRect },\r
  $pop: HTMLElement,\r
  {\r
    dir = 'bottom',\r
    align,\r
    viewport = {\r
      x: 0,\r
      y: 0,\r
      top: 0,\r
      right: document.body.clientWidth,\r
      bottom: document.body.clientHeight,\r
      left: 0,\r
      width: document.body.clientWidth,\r
      height: document.body.clientHeight,\r
      toJSON() {},\r
    },\r
    plugins = [],\r
  }: {\r
    dir?: Direction;\r
    align?: Alignment;\r
    viewport?: DOMRect;\r
    plugins?: PopPlugin[];\r
  } = {},\r
) => {\r
  const anc = $anc.getBoundingClientRect();\r
\r
  const map = clipMap({ dir, anc, viewport });\r
\r
  let config: PopConfigs = {\r
    $anc,\r
    $pop,\r
    anc,\r
    dir,\r
    align,\r
    viewport,\r
    map,\r
  };\r
\r
  for (let p of plugins.filter(_ => !_.post)) config = p(config);\r
  config = Align(config);\r
  for (let p of plugins.filter(_ => _.post)) config = p(config);\r
\r
  return config;\r
};\r
\r
export const levitate: Levitate = Object.assign(_levitate, { auto });\r
`;export{n as default};
