import { fx } from '../functions';

export const collapse = {
  show(el: HTMLElement | SVGElement) {
    return new Promise<void>(resolve => {
      fx.transition(el, {
        from() {
          el.style.setProperty('--h', '0');
          el.classList.remove('collapsed');
          el.classList.add('collapsing');
        },
        to(x) {
          el.style.setProperty('--h', el.scrollHeight + 'px');
        },
        done() {
          el.style.removeProperty('--h');
          el.classList.remove('collapsing');
          resolve();
        },
      });
    });
  },
  hide(el: HTMLElement | SVGElement) {
    return new Promise<void>(resolve => {
      fx.transition(el, {
        from() {
          el.style.setProperty('--h', el.scrollHeight + 'px');
          el.classList.add('collapsing');
        },
        to() {
          el.style.setProperty('--h', '0');
        },
        done() {
          el.style.removeProperty('--h');
          el.classList.add('collapsed');
          el.classList.remove('collapsing');
          resolve();
        },
      });
    });
  },
  toggle(el: HTMLElement | SVGElement) {
    el.classList.contains('collapsed') || // leaved
    el.style.getPropertyValue('--h') === '0' // leaving
      ? collapse.show(el)
      : collapse.hide(el);
  },
};
