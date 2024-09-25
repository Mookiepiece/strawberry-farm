import { Bag } from './collection';
import { on } from './on';

export type Direction = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'end';

type Levitate = typeof _levitate & {
  auto: typeof auto;
};

export type PopConfigs = {
  $anc: { getBoundingClientRect(): DOMRect };
  $pop: HTMLElement;
  anc: DOMRect;

  dir: Direction;
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

const auto = (_anc: unknown | [unknown, unknown], cb: () => void) => {
  const bag = Bag();

  const [$anc, $pop] = Array.isArray(_anc) ? _anc : [_anc];
  const ro = new ResizeObserver(cb);
  bag(() => ro.disconnect());
  $anc && $anc instanceof Element && ro.observe($anc);
  $pop && $pop instanceof Element && ro.observe($pop);

  bag(on(window).resize(cb));

  if ($anc && $anc instanceof Element)
    for (
      let p: Element | null = $anc;
      p && p !== document.documentElement;
      p = p.parentElement
    )
      if (isScrollableElement(p)) bag(on(p).scroll(() => cb())); // ancestorScroll @floating-ui/core@1.6

  return () => bag();
};

const clamp = (min = 0, a: number, max = 100) =>
  Math.min(max, Math.max(a, min));

export const clipMap = ({
  dir,
  anc,
  viewport: view,
}: Pick<PopConfigs, 'dir' | 'anc' | 'viewport'>) => {
  switch (dir) {
    case 'top': {
      const height = clamp(0, anc.top - view.top, view.height);
      const bottom = view.top + height;
      return { ...view, bottom, height };
    }
    case 'right': {
      const width = clamp(0, view.right - anc.right, view.width);
      const x = view.right - width;
      return { ...view, left: x, x, width };
    }
    case 'bottom': {
      const height = clamp(0, view.bottom - anc.bottom, view.height);
      const y = view.bottom - height;
      return { ...view, top: y, y, height };
    }
    case 'left': {
      const width = clamp(0, anc.left - view.left, view.width);
      const right = view.left + width;
      return { ...view, right, width };
    }
  }
};

const Align = (config: PopConfigs): PopConfigs => {
  let { anc, $pop, dir, align: alignment } = config;

  const pop = {
    width: $pop.offsetWidth,
    height: $pop.offsetHeight,
  };

  let map = config.map!;

  let x = 0,
    y = 0;

  if (dir === 'top' || dir === 'bottom') {
    y = dir === 'top' ? map.bottom - pop.height : map.top;

    if (alignment === 'start') {
      x = anc.left;
    } else if (alignment === 'end') {
      x = anc.right - pop.width;
    } else {
      x = Math.round((anc.left + anc.right) / 2 - pop.width / 2);
    }
    x = clamp(map.left, x, map.right - pop.width);
  } else {
    x = dir === 'left' ? map.right - pop.width : map.left;

    if (alignment === 'start') {
      y = anc.top;
    } else if (alignment === 'end') {
      y = anc.bottom - pop.height;
    } else {
      y = Math.round((anc.top + anc.bottom) / 2 - pop.height / 2);
    }
    y = clamp(map.top, y, map.bottom - pop.height);
  }

  return { ...config, x, y };
};

const _levitate = (
  $anc: { getBoundingClientRect(): DOMRect },
  $pop: HTMLElement,
  {
    dir = 'bottom',
    align,
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
    plugins = [],
  }: {
    dir?: Direction;
    align?: Alignment;
    viewport?: DOMRect;
    plugins?: PopPlugin[];
  } = {},
) => {
  const anc = $anc.getBoundingClientRect();

  const map = clipMap({ dir, anc, viewport });

  let config: PopConfigs = {
    $anc,
    $pop,
    anc,
    dir,
    align,
    viewport,
    map,
  };

  for (let p of plugins.filter(_ => !_.post)) config = p(config);
  config = Align(config);
  for (let p of plugins.filter(_ => _.post)) config = p(config);

  return config;
};

export const levitate: Levitate = Object.assign(_levitate, { auto });
