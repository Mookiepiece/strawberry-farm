import { Bag } from './collection';
import { on } from './on';

type Direction = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'end';
type Position = Direction | `${Direction}-${Alignment}`;

const isScrollableElement = (p: Element) => {
  const { overflowY, overflowX } = getComputedStyle(p);
  return /auto|scroll/.test(overflowY + overflowX);
};

const auto = (el: Element, cb: () => void) => {
  const bag = Bag();

  const ro = new ResizeObserver(cb);

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
  dir: Direction = 'bottom',
  offset = 0,
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

  const map = availableSpace4[dir]([[up], viewport], offset);

  if (smaller([[fan], map])) {
    let x = 0,
      y = map.top;

    // ('start');
    // left0 = up.left;

    ('center');
    x = Math.round((up.left + up.right) / 2 - fan.width / 2);

    // ('end');
    // left0 = up.right - fan.width;

    x = clamp(map.left, x, map.right - fan.width);
    console.log(map);
    requestAnimationFrame(() => {
      $fan.style.setProperty('--x', x + 'px');
      $fan.style.setProperty('--y', y + 'px');
      $fan.style.setProperty('transform', 'translate(var(--x), var(--y))');
    });
  } else {
    requestAnimationFrame(() => {
      $fan.style.setProperty('--x', 0 + 'px');
      $fan.style.setProperty('--y', 0 + 'px');
      $fan.style.setProperty('transform', 'translate(var(--x), var(--y))');
    });
  }
};

const clamp = (min = 0, a: number, max = 100) =>
  Math.min(max, Math.max(a, min));

const availableSpace4: Record<
  Direction,
  ([[up], map]: [[DOMRect], DOMRect], offset: number) => DOMRect
> = {
  // prettier-ignore
  top: ([[up], map], offset) => { const height = clamp(0, up.top - map.top - offset, map.height); const bottom = map.top + height; return ({ ...map, bottom, height }) },
  // prettier-ignore
  right: ([[up], map], offset) => { const width = clamp(0, map.right - up.right - offset, map.width); const x = map.right - width; return ({ ...map, left: x, x, width }) },
  // prettier-ignore
  bottom: ([[up], map], offset) => { const height = clamp(0, map.bottom - up.bottom - offset, map.height); const y = map.bottom - height; return ({ ...map, top: y , y, height }) },
  // prettier-ignore
  left: ([[up], map], offset) => { const width = clamp(0, up.left - map.left - offset, map.width); const right = map.left + width; return ({ ...map, right, width }) },
};

const smaller = ([[fan], map]: [[DOMRect], DOMRect]) =>
  fan.width < map.width && fan.height < map.height;

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
