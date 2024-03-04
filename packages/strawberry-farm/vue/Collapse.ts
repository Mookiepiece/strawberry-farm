import { Bag, nextFrame, on } from '../functions';

const bins = new WeakMap<HTMLElement, ReturnType<typeof Bag>>();

const resetBag = (el: HTMLElement) => {
  let bag = bins.get(el);
  bag?.();

  if (!bag) {
    bag = Bag();
    bins.set(el, bag);
  }

  return bag;
};

export const collapse = {
  show(el: HTMLElement) {
    return new Promise<void>(resolve => {
      el.style.setProperty('--h', '0');
      el.classList.remove('Collapsed');
      el.classList.add('Collapsing');

      const bag = resetBag(el);
      nextFrame(() => {
        el.style.setProperty('--h', el.scrollHeight + 'px');
        bag(
          on(el).transitionend.self.once(_ => {
            el.style.removeProperty('--h');
            el.classList.remove('Collapsing');
            resolve();
          }),
        );
      }, bag(new AbortController()).signal);
    });
  },
  hide(el: HTMLElement) {
    return new Promise<void>(resolve => {
      el.style.setProperty('--h', el.scrollHeight + 'px');
      el.classList.add('Collapsing');

      const bag = resetBag(el);
      nextFrame(() => {
        el.style.setProperty('--h', '0');

        bag(
          on(el).transitionend.self.once(_ => {
            el.style.removeProperty('--h');
            el.classList.add('Collapsed');
            el.classList.remove('Collapsing');
            resolve();
          }),
        );
      }, bag(new AbortController()).signal);
    });
  },
  toggle(el: HTMLElement) {
    el.classList.contains('Collapsed') || // leaved
    el.style.getPropertyValue('--h') === '0' // leaving
      ? collapse.show(el)
      : collapse.hide(el);
  },
};
