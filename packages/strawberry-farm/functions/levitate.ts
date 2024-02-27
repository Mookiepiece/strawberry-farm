const auto = (el: Element) => {
  let { top, right, bottom, left } = el.getBoundingClientRect();

  const io = new IntersectionObserver(() => {}, {
    rootMargin: `${top}px ${right}px ${bottom}px ${left}px`,
  });

  io.observe(el);
};

const levitate = {};
