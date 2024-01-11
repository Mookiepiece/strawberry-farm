import { on as _on } from './on';

type SFOM<T extends HTMLElement> = {
  el: HTMLElement;
};

type ShiftFirst<T extends any[]> = T extends [infer First, ...infer Rest]
  ? Rest
  : never;

const sfom = (el: HTMLElement) => {
  const on: (typeof el)['addEventListener'] = (type, listener, options) => {
    el.addEventListener(type, listener, options);
    return () => el.removeEventListener(type, listener, options);
  };

  return {
    el,
    $: query => el.querySelector(query),
    $$: query => [...el.querySelectorAll(query)].map(el => sfom(el)),
    on,
    get $0() {
      return el.firstElementChild;
    },
  };
};
