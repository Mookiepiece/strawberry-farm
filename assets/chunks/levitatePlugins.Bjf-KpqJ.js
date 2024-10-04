const r=`import { clipMap, Direction, PopConfigs, PopPlugin } from './levitate';\r
\r
export const margin: (m?: number) => PopPlugin =\r
  (m = 5) =>\r
  config => {\r
    let map = config.map;\r
\r
    const m2 = 2 * m;\r
    if (map.width < m2 || map.height < m2) return config;\r
\r
    const x = map.x + m;\r
    const y = map.y + m;\r
\r
    return {\r
      ...config,\r
      map: {\r
        x,\r
        y,\r
        top: y,\r
        right: map.right - m,\r
        bottom: map.bottom - m,\r
        left: x,\r
        width: map.width - m2,\r
        height: map.height - m2,\r
        toJSON() {},\r
      },\r
    };\r
  };\r
\r
const AUTO_P_FALLBACKS: Record<Direction, Direction[]> = {\r
  top: ['bottom', 'left', 'right'],\r
  bottom: ['top', 'left', 'right'],\r
  left: ['right', 'top', 'bottom'],\r
  right: ['left', 'top', 'bottom'],\r
};\r
\r
const FLIP_FALLBACKS: Record<Direction, Direction[]> = {\r
  top: ['bottom'],\r
  bottom: ['top'],\r
  left: ['right'],\r
  right: ['left'],\r
};\r
\r
export const autoPlacement =\r
  (param?: {\r
    limit?: number;\r
    fallback?: Direction[];\r
    margin?: number;\r
    __flip?: true;\r
  }) =>\r
  (popcorn: PopConfigs): PopConfigs => {\r
    let { anc: ref, map, $pop, viewport, dir } = popcorn;\r
\r
    const _limit =\r
      dir === 'left' || dir === 'right'\r
        ? $pop.offsetWidth - $pop.clientWidth + $pop.scrollWidth\r
        : $pop.offsetHeight - $pop.clientHeight + $pop.scrollHeight;\r
\r
    const limit = param?.limit ?? _limit;\r
    const fallbacks =\r
      param?.fallback ??\r
      (param?.__flip ? FLIP_FALLBACKS : AUTO_P_FALLBACKS)[dir];\r
\r
    const space = dir === 'left' || dir === 'right' ? map.width : map.height;\r
\r
    if (space < limit) {\r
      for (const _dir of fallbacks) {\r
        let _map = clipMap({ dir: _dir, anc: ref, viewport });\r
\r
        if (param?.margin)\r
          _map = margin(param.margin)({ ...popcorn, map: _map }).map;\r
\r
        if (_map.width * _map.height > map.width * map.height) {\r
          map = _map;\r
          dir = _dir;\r
          if (map.height >= limit) break;\r
        }\r
      }\r
    }\r
\r
    return { ...popcorn, dir, map };\r
  };\r
\r
export const flip: typeof autoPlacement = param =>\r
  autoPlacement({ __flip: true, ...param });\r
\r
export const sameWidth: PopPlugin = config => {\r
  const $pop = config.$pop as HTMLElement;\r
  let width: any = $pop.style.getPropertyValue('width');\r
  if (!width.endsWith('px')) width = '';\r
  width = Number(width.slice(0, -2));\r
\r
  const shouldBe = config.$anc.getBoundingClientRect().width;\r
\r
  if (width !== shouldBe) {\r
    $pop.style.setProperty('width', shouldBe + 'px');\r
\r
    const pop = $pop.getBoundingClientRect();\r
    return { ...config, pop };\r
  }\r
  return config;\r
};\r
\r
export const applyTransform: PopPlugin = config => {\r
  const $ref = config.$anc as HTMLElement;\r
  const $pop = config.$pop as HTMLElement;\r
\r
  $pop.setAttribute('data-pop-dir', config.dir);\r
  $ref.setAttribute('data-pop-dir', config.dir);\r
  $pop.style.setProperty('--x', config.x + 'px');\r
  $pop.style.setProperty('--y', config.y + 'px');\r
  $pop.style.setProperty('left', 'var(--x)');\r
  $pop.style.setProperty('top', 'var(--y)');\r
  return config;\r
};\r
applyTransform.post = true;\r
\r
export const maxHeight: PopPlugin = config => {\r
  const $pop = config.$pop as HTMLElement;\r
  $pop.style.setProperty('--map-width', config.map.width + 'px');\r
  $pop.style.setProperty('--map-height', config.map.height + 'px');\r
  $pop.style.setProperty('max-width', 'var(--map-width)');\r
  $pop.style.setProperty('max-height', 'var(--map-height)');\r
  return config;\r
};\r
`;export{r as default};
