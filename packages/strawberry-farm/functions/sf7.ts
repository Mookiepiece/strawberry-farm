import { on as _on } from './on';

type SF7<T extends HTMLElement> = {
  el: HTMLElement;
};

type ShiftFirst<T extends any[]> = T extends [infer First, ...infer Rest]
  ? Rest
  : never;

/**
 * Naming inspired by framework7(dom7)
 */
const sf7 = (el: HTMLElement) => {
  const on: (typeof el)['addEventListener'] = (type, listener, options) => {
    el.addEventListener(type, listener, options);
    return () => el.removeEventListener(type, listener, options);
  };

  return {
    el,
    $: query => el.querySelector(query),
    $$: query => [...el.querySelectorAll(query)],
    on,
    get $0() {
      return el.firstElementChild;
    },
  };
};
