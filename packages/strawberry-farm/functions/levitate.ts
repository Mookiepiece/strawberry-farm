import { Bag } from './collection';
import { on } from './on';

export type Direction = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'end';

type Levitate = typeof _levitate & {
  auto: typeof auto;
};

export type PopConfigs = {
  $ref: HTMLElement | SVGElement;
  $pop: HTMLElement | SVGElement;
  ref: DOMRect;
  pop: DOMRect;

  dir: Direction;
  offset: number;
  alignment?: Alignment;

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

  // NOTE: ResizeObserver will firing the callback once the element is being observed
  // it is probably scheduled after requestAnimationFrame, at next painting https://stackoverflow.com/questions/77943736/order-of-callbacks-settimeout-and-resizeobserver
  // https://drafts.csswg.org/resize-observer/#intro
  // > Observation will fire when observation starts if Element is being rendered, and Element’s size is not 0,0.
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

  // Note: Intersection Observer is hard to use...
  // It didn't pass my test on "multiple scrollable parent", which makes bounding rect "overlays" the element.
  // https://github.com/floating-ui/floating-ui/blob/2be011f877dd0c56d77b528d9f4422c83f6950b9/packages/dom/src/autoUpdate.ts#L141

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

const align = (config: PopConfigs): PopConfigs => {
  let { ref, pop, dir, alignment } = config;
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
  $ref: HTMLElement | SVGElement,
  $pop: HTMLElement | SVGElement,
  {
    dir = 'bottom',
    alignment,
    offset = 0,
    viewport: _viewport,
  }: {
    dir?: Direction;
    offset?: number;
    alignment?: Alignment;
    viewport?: DOMRect;
  } = {
    dir: 'bottom',
    offset: 0,
  },
  ...plugins: PopPlugin[]
) => {
  const viewport = _viewport || {
    x: 0,
    y: 0,
    top: 0,
    right: document.body.clientWidth,
    bottom: document.body.clientHeight,
    left: 0,
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    toJSON() {},
  };

  const ref = $ref.getBoundingClientRect();
  const pop = $pop.getBoundingClientRect();

  const map = availableSpace4[dir]([[ref], viewport], offset);

  let config: PopConfigs = {
    $ref,
    $pop,
    dir,
    alignment,
    ref,
    pop,
    offset,
    viewport,
    map,
  };

  for (let p of plugins) config = p(config);
  config = align(config);

  $pop.style.setProperty('--x', config.x + 'px');
  $pop.style.setProperty('--y', config.y + 'px');
  $pop.style.setProperty('transform', 'translate(var(--x), var(--y))');

  return config;
};

export const levitate: Levitate = Object.assign(_levitate, { auto });
