
type HTMLElementEventMapCustomized = HTMLElementEventMap & Record<string,CustomEvent>

export const on = <T extends HTMLElement, K extends keyof HTMLElementEventMapCustomized>(
  el: T,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMapCustomized[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => {
  el.addEventListener(type, listener, options);
  return () => el.removeEventListener(type, listener, options);
};

const controled = new Map<string, {}>();

const ON = _ => {
  const receiver = Object.assign(() => {}, { _ });
  return new Proxy(receiver, {
    get(target, p, receiver) {
      if (typeof p === 'string') return ON(target._ + '.' + p);
      throw new Error();
    },
    apply(target, thisArg, argArray) {
      console.log(target._);
    },
  });
};

const on2 = ON('');

type KM = 'alt' | 'meta' | 'ctrl' | 'shift';
type KM2 = 'alt' | 'meta' | 'ctrl' | 'shift';

on(document.body, 'animationcancelqwe',(e)=>{
})
