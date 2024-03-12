import { Bag } from './collection';
import { on } from './on';

type Direction = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'end';

type RuntimeConfigs = {
  $up: Element;
  $fan: HTMLElement;

  dir: Direction;
  offset: number;
  alignment?: Alignment;

  up: DOMRect;
  fan: DOMRect;
  map?: DOMRect;
  viewport: DOMRect;

  glitch?: boolean;

  x?: number;
  y?: number;
};

const isScrollableElement = (p: Element) => {
  const { overflowY, overflowX } = getComputedStyle(p);
  return /auto|scroll/.test(overflowY + overflowX);
};

const auto = (el: Element, cb: () => void) => {
  const bag = Bag();

  // NOTE: ResizeObserver will firing the callback immediately
  // probably scheduled like requestAnimationFrame
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

const place = (
  $up: Element,
  $fan: HTMLElement,
  {
    dir = 'bottom',
    alignment,
    offset = 0,
  }: {
    dir?: Direction;
    offset?: number;
    alignment?: Alignment;
    viewport?: DOMRect;
  } = {
    dir: 'bottom',
    offset: 0,
  },
) => {
  const viewport: DOMRect = {
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

  const up = $up.getBoundingClientRect();
  const fan = $fan.getBoundingClientRect();

  console.log($fan.innerHTML);

  let config: RuntimeConfigs = {
    $up,
    $fan,
    dir,
    alignment,
    up,
    fan,
    offset,
    viewport,
  };

  config = flip(config);
  config = align(config);

  if (!config.glitch) {
    // requestAnimationFrame(() => {
    $fan.style.setProperty('--x', config.x + 'px');
    $fan.style.setProperty('--y', config.y + 'px');
    $fan.style.setProperty('transform', 'translate(var(--x), var(--y))');
    // });

    return config.glitch;
  }
  return config.glitch;
};

const clamp = (min = 0, a: number, max = 100) =>
  Math.min(max, Math.max(a, min));

const availableSpace4: Record<
  Direction,
  ([[up], view]: [[DOMRect], DOMRect], offset: number) => DOMRect
> = {
  // prettier-ignore
  top: ([[up], viewport], offset) => { const height = clamp(0, up.top - viewport.top - offset, viewport.height); const bottom = viewport.top + height; return ({ ...viewport, bottom, height }) },
  // prettier-ignore
  right: ([[up], viewport], offset) => { const width = clamp(0, viewport.right - up.right - offset, viewport.width); const x = viewport.right - width; return ({ ...viewport, left: x, x, width }) },
  // prettier-ignore
  bottom: ([[up], viewport], offset) => { const height = clamp(0, viewport.bottom - up.bottom - offset, viewport.height); const y = viewport.bottom - height; return ({ ...viewport, top: y , y, height }) },
  // prettier-ignore
  left: ([[up], viewport], offset) => { const width = clamp(0, up.left - viewport.left - offset, viewport.width); const right = viewport.left + width; return ({ ...viewport, right, width }) },
};

const smaller = ([[fan], map]: [[DOMRect], DOMRect]) =>
  fan.width < map.width && fan.height < map.height;

const dontFlip = (config: RuntimeConfigs): RuntimeConfigs => {
  let { up, fan, viewport, dir, offset, glitch } = config;
  const map = availableSpace4[dir]([[up], viewport], offset);
  return {
    ...config,
    map: availableSpace4[dir]([[up], viewport], offset),
    glitch: glitch || smaller([[fan], map]),
  };
};

const flip = (config: RuntimeConfigs): RuntimeConfigs => {
  let { up, fan, viewport, dir, offset, glitch } = config;
  let map = availableSpace4[dir]([[up], viewport], offset);
  if (!smaller([[fan], map])) {
    let _glitch = true;
    for (const _dir of (
      {
        top: ['bottom', 'left', 'right'],
        bottom: ['top', 'left', 'right'],
        left: ['right', 'top', 'bottom'],
        right: ['left', 'top', 'bottom'],
      } as const
    )[dir]) {
      let _map = availableSpace4[_dir]([[up], viewport], offset);
      if (!smaller([[fan], map])) {
        map = _map;
        dir = _dir;
        _glitch = false;
        break;
      }
    }
    glitch ||= _glitch;
  }
  return { ...config, dir, map, glitch };
};

const align = (config: RuntimeConfigs): RuntimeConfigs => {
  let { up, fan, dir, alignment } = config;
  let map = config.map!;

  let x = 0,
    y = 0;

  if (dir === 'top' || dir === 'bottom') {
    y = dir === 'top' ? map.bottom - fan.height : map.top;

    if (alignment === 'start') {
      x = up.left;
    } else if (alignment === 'end') {
      x = up.right - fan.width;
    } else {
      x = Math.round((up.left + up.right) / 2 - fan.width / 2);
    }
    x = clamp(map.left, x, map.right - fan.width);
  } else {
    x = dir === 'left' ? map.right - fan.width : map.left;

    if (alignment === 'start') {
      y = up.top;
    } else if (alignment === 'end') {
      y = up.bottom - fan.height;
    } else {
      y = Math.round((up.top + up.bottom) / 2 - fan.height / 2);
    }
    y = clamp(map.top, y, map.bottom - fan.height);
  }

  return { ...config, x, y };
};

const inside = ([[fan], map]: [[DOMRect], DOMRect]) =>
  fan.left > map.left &&
  fan.top > map.top &&
  fan.bottom < map.bottom &&
  fan.right < map.right;

const shiftRange = (
  [[up, fan], map]: [[DOMRect, DOMRect], DOMRect],
  dir: Direction,
): [0, number] => {
  if (dir === 'bottom' || dir === 'top') {
    return [0, map.width - fan.width];
  }
  return [0, map.height - fan.height];
};

export const levitate = { auto, place };
