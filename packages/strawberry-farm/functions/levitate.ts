type Direction = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'end';

const auto = (el: Element) => {
  let { top, right, bottom, left } = el.getBoundingClientRect();

  const io = new IntersectionObserver(() => {}, {
    rootMargin: `${top}px ${right}px ${bottom}px ${left}px`,
  });

  io.observe(el);
};

const measure = (id: string, { top, left, width, height }: DOMRect) => {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.style.pointerEvents = 'none';
    el.style.boxShadow =
      'inset 0 0 0 1px ' +
      {
        a: '#fa8',
        b: '#8af',
      }[id[0]];
    document.body.appendChild(el);
  }

  el.style.position = 'fixed';
  el.style.top = top + 'px';
  el.style.left = left + 'px';
  el.style.width = width + 'px';
  el.style.height = height + 'px';
};

const place = ($up: Element, $fan: HTMLElement, dir = 'bottom', offset = 0) => {
  const boundary: DOMRect = {
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
  measure('aaa', up);
  measure('bbb', fan);

  if (hasAvailableSpace(up, fan, boundary)) {
    $fan.style.setProperty('top', up.top + 'px');
    $fan.style.setProperty('left', up.left + 'px');
  }
};

type Dimension = { x: number; y: number };

const availableSpace4: Record<
  Direction,
  (up: DOMRect, bound: DOMRect) => Dimension
> = {
  // prettier-ignore
  top: (up,bound) => ({ x: bound.width, y: Math.max(up.top - bound.top, 0) }),
  // prettier-ignore
  right: (up,bound) => ({ x: Math.max(bound.right - up.right), y: bound.height }),
  // prettier-ignore
  bottom: (up,bound) => ({ x: bound.width, y: Math.max(bound.bottom - up.bottom, 0) }),
  // prettier-ignore
  left: (up,bound) => ({ x: Math.max( up.left - bound.left), y: bound.height }),
};
const addOffset4: Record<
  Direction,
  (fan: DOMRect, offset: number, dir: Direction) => Dimension
> = {
  // prettier-ignore
  top: (fan,offset,bound) => ({ ...fan, height:fan.height + offset, bottom : fan.bottom + offset }),
};

const smallerThan = (fan: DOMRect, dimension: Dimension) =>
  fan.width < dimension.x && fan.height < dimension.y;

const availableSpace = (up: DOMRect, bound: DOMRect, dir: Direction) =>
  availableSpace4[dir](up, bound);

const hasAvailableSpace = (
  up: DOMRect,
  fan: DOMRect,
  bound: DOMRect,
  dir: Direction,
) => smallerThan(fan, availableSpace(up, bound, dir));

export const levitate = { auto, measure, place };
