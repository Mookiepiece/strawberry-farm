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

export const availableSpace4: Record<
  Direction,
  ([[ref], view]: [[DOMRect], DOMRect], offset: number) => DOMRect
> = {
  // prettier-ignore
  top: ([[ref], viewport], offset) => { const height = clamp(0, ref.top - viewport.top - offset, viewport.height); const bottom = viewport.top + height; return ({ ...viewport, bottom, height }) },
  // prettier-ignore
  right: ([[ref], viewport], offset) => { const width = clamp(0, viewport.right - ref.right - offset, viewport.width); const x = viewport.right - width; return ({ ...viewport, left: x, x, width }) },
  // prettier-ignore
  bottom: ([[ref], viewport], offset) => { const height = clamp(0, viewport.bottom - ref.bottom - offset, viewport.height); const y = viewport.bottom - height; return ({ ...viewport, top: y , y, height }) },
  // prettier-ignore
  left: ([[ref], viewport], offset) => { const width = clamp(0, ref.left - viewport.left - offset, viewport.width); const right = viewport.left + width; return ({ ...viewport, right, width }) },
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

  const map = availableSpace4[dir]([[ref], viewport], offset);

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

  for (let p of plugins) config = p(config);
  config = Align(config);

  $pop.style.setProperty('--x', config.x + 'px');
  $pop.style.setProperty('--y', config.y + 'px');
  $pop.style.setProperty('transform', 'translate(var(--x), var(--y))');

  return config;
};

export const levitate: Levitate = Object.assign(_levitate, { auto });
