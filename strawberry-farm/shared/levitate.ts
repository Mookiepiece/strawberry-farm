import { Bag } from './collection';
import { on } from './on';

export type Direction = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'end';

type Levitate = typeof _levitate & {
  auto: typeof auto;
};

export type PopConfigs = {
  $ref: { getBoundingClientRect(): DOMRect };
  $pop: { getBoundingClientRect(): DOMRect };
  ref: DOMRect;
  pop: DOMRect;

  dir: Direction;
  offset: number;
  align?: Alignment;

  map: DOMRect;
  viewport: DOMRect;

  x?: number;
  y?: number;
};

export interface PopPlugin {
  (configs: PopConfigs): PopConfigs;
  post?: boolean;
}

const isScrollableElement = (p: Element) => {
  const { overflowY, overflowX } = getComputedStyle(p);
  return /auto|scroll/.test(overflowY + overflowX);
};

const auto = (el: Element, cb: () => void) => {
  const bag = Bag();

  const ro = new ResizeObserver(cb);
  bag(() => ro.disconnect());

  for (
    let p: Element | null = el;
    p && p !== document.documentElement;
    p = p.parentElement
  ) {
    ro.observe(p); // ancestorResize @floating-ui/core@1.6
    if (isScrollableElement(p)) bag(on(p).scroll(() => cb())); // ancestorScroll @floating-ui/core@1.6
  }

  return () => bag();
};

const clamp = (min = 0, a: number, max = 100) =>
  Math.min(max, Math.max(a, min));

export const ClipMap: Record<
  Direction,
  ([[ref], view]: [[DOMRect], DOMRect], offset: number) => DOMRect
> = {
  // prettier-ignore
  top: ([[ref], view]) => { const height = clamp(0, ref.top - view.top, view.height); const bottom = view.top + height; return ({ ...view, bottom, height }) },
  // prettier-ignore
  right: ([[ref], view]) => { const width = clamp(0, view.right - ref.right, view.width); const x = view.right - width; return ({ ...view, left: x, x, width }) },
  // prettier-ignore
  bottom: ([[ref], view]) => { const height = clamp(0, view.bottom - ref.bottom, view.height); const y = view.bottom - height; return ({ ...view, top: y , y, height }) },
  // prettier-ignore
  left: ([[ref], view]) => { const width = clamp(0, ref.left - view.left, view.width); const right = view.left + width; return ({ ...view, right, width }) },
};

const Align = (config: PopConfigs): PopConfigs => {
  let { ref, pop, dir, align: alignment } = config;
  let map = config.map!;

  let x = 0,
    y = 0;

  if (dir === 'top' || dir === 'bottom') {
    y = dir === 'top' ? map.bottom - pop.height : map.top;

    if (alignment === 'start') {
      x = ref.left;
    } else if (alignment === 'end') {
      x = ref.right - pop.width;
    } else {
      x = Math.round((ref.left + ref.right) / 2 - pop.width / 2);
    }
    x = clamp(map.left, x, map.right - pop.width);
  } else {
    x = dir === 'left' ? map.right - pop.width : map.left;

    if (alignment === 'start') {
      y = ref.top;
    } else if (alignment === 'end') {
      y = ref.bottom - pop.height;
    } else {
      y = Math.round((ref.top + ref.bottom) / 2 - pop.height / 2);
    }
    y = clamp(map.top, y, map.bottom - pop.height);
  }

  return { ...config, x, y };
};

const _levitate = (
  $ref: { getBoundingClientRect(): DOMRect },
  $pop: { getBoundingClientRect(): DOMRect },
  {
    dir = 'bottom',
    align,
    offset = 0,
    viewport = {
      x: 0,
      y: 0,
      top: 0,
      right: document.body.clientWidth,
      bottom: document.body.clientHeight,
      left: 0,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      toJSON() {},
    },
  }: {
    dir?: Direction;
    offset?: number;
    align?: Alignment;
    viewport?: DOMRect;
  } = {},
  ...plugins: PopPlugin[]
) => {
  const ref = $ref.getBoundingClientRect();
  const pop = $pop.getBoundingClientRect();

  const map = ClipMap[dir]([[ref], viewport], offset);

  let config: PopConfigs = {
    $ref,
    $pop,
    dir,
    align,
    ref,
    pop,
    offset,
    viewport,
    map,
  };

  for (let p of plugins.filter(_ => !_.post)) config = p(config);
  config = Align(config);
  for (let p of plugins.filter(_ => _.post)) config = p(config);

  return config;
};

export const levitate: Levitate = Object.assign(_levitate, { auto });
