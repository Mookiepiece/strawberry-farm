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
  measure('aaa', up);
  measure('bbb', fan);

  const map = availableSpace4[dir]([[up], viewport], offset);

  if (smaller([[fan], map])) {
    const [rangeMin,rangeMax] = shiftRange([[up,fan],map],dir);

    'start';


    'center';


    'end';

    $fan.style.setProperty('top', up.top + 'px');
    $fan.style.setProperty('left', up.left + 'px');
  }
};

const clamp = (min= 0,a: number,max = 100) => Math.min(max,Math.max(a,min));

const availableSpace4: Record<
  Direction,
  ([[up], map]: [[DOMRect], DOMRect], offset: number) => DOMRect
> = {
  // prettier-ignore
  top: ([[up], map], offset) => { const height = Math.max(up.top - map.top - offset, 0); const bottom = map.top + height; return ({ ...map, bottom, height }) },
  // prettier-ignore
  right: ([[up], map], offset) => { const width = Math.max(map.right - up.right - offset, 0); const x = map.right - width; return ({ ...map, left: x, x, width }) },
  // prettier-ignore
  bottom: ([[up], map], offset) => { const height = Math.max(map.bottom - up.bottom - offset, 0); const y = map.bottom - height; return ({ ...map, top: y , y, height }) },
  // prettier-ignore
  left: ([[up], map], offset) => { const width = Math.max(up.left - map.left - offset, 0); const right = map.left + width; return ({ ...map, right, width }) },
};

// const visibleRect = ([[up], viewport]: [[DOMRect], DOMRect]) :DOMRect => {
  
//   const top = Math.max(, 0);

//   return {
//     ...up,

//   }
// };

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
  const r = {
    x: 0,
    y: 0,
    width: fan.width,
    height: fan.height,
    get left() {
      return this.x;
    },
    get top() {
      return this.y;
    },
    get right() {
      return this.x + this.width;
    },
    get bottom() {
      return this.y + this.height;
    },
  };
  if (dir === 'bottom' || dir === 'top') {
    return [0, map.width - fan.width];
  }
  return [0, map.height - fan.height];
  // const shiftRange = [map.width - r.left, map.width - r.width]
};

export const levitate = { auto, measure, place };
