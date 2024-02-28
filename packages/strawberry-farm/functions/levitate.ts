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

const place = (target: Element, reference: Element) => {
  const tect = target.getBoundingClientRect();
  const rect = reference.getBoundingClientRect();
  measure('aaa', tect);
  measure('bbb', rect);
};

export const levitate = { auto, measure, place };
