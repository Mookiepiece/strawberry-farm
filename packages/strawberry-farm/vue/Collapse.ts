import { Bag, nextFrame, on } from '../functions';

const bags = new WeakMap<HTMLElement, ReturnType<typeof Bag>>();

const resetBag = (el: HTMLElement) => {
  let bag = bags.get(el);
  bag?.();

  if (!bag) {
    bag = Bag();
    bags.set(el, bag);
  }

  return bag;
};

export const Collapse = {
  show(el: HTMLElement) {
    el.style.setProperty('--h', '0');
    el.classList.remove('collapsed');
    el.classList.add('collapsing');

    const bag = resetBag(el);
    nextFrame(() => {
      el.style.setProperty('--h', el.scrollHeight + 'px');
      bag(
        on(el).transitionend.self.once(_ => {
          el.style.removeProperty('--h');
          el.classList.remove('collapsing');
        }),
      );
    }, bag(new AbortController()).signal);
    //
  },
  hide(el: HTMLElement) {
    el.style.setProperty('--h', el.scrollHeight + 'px');
    el.classList.add('collapsing');

    const bag = resetBag(el);
    nextFrame(() => {
      el.style.setProperty('--h', '0');

      bag(
        on(el).transitionend.self.once(_ => {
          el.style.removeProperty('--h');
          el.classList.add('collapsed');
          el.classList.remove('collapsing');
        }),
      );
    }, bag(new AbortController()).signal);
  },
  toggle(el: HTMLElement) {
    el.classList.contains('collapsed') || // leaved 
    el.style.getPropertyValue('--h') === '0' // leaving
      ? Collapse.show(el)
      : Collapse.hide(el);
  },
};
