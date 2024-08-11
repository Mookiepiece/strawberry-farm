import { onTimeout, nextFrame } from './scheduler';
import { Bag, Bags } from './collection';
import { on } from './on';

const { resetBag } = Bags();

type TransitionInit = {
  from?: (bag: ReturnType<typeof Bag>) => (() => void) | void;
  to?: (bag: ReturnType<typeof Bag>) => (() => void) | void;
  done?: () => (() => void) | void;
};

const transition = (el: HTMLElement | SVGElement, options: TransitionInit) => {
  const bag = resetBag(el);
  options.from?.(bag);

  nextFrame(() => {
    options.to?.(bag);

    const transitionDelays = window
      .getComputedStyle(el)
      .transitionDelay.split(',');
    const transitionDurations = window
      .getComputedStyle(el)
      .transitionDuration.split(',');

    let count = 0;
    bag(
      on(el).transitionend.self(_ => {
        if (++count === transitionDurations.length) {
          bag();
          options.done?.();
        }
      }),
    );

    // https://github.com/vuejs/core/blob/9a936aaec489c79433a32791ecf5ddb1739a62bd/packages/runtime-dom/src/components/Transition.ts#L357
    const timeout = Math.max(
      ...transitionDelays.map((s, index) => { 
        let delay = Number(s.slice(0, -1));
        let duration = Number(transitionDurations[index].slice(0, -1));

        delay = Number.isNaN(delay) ? 0 : delay;
        duration = Number.isNaN(duration) ? 0 : duration;

        return (delay + duration) * 1000;
      }),
    );

    bag(
      onTimeout(() => {
        bag();
        options.done?.();
      }, timeout + 1),
    );
  }, bag(new AbortController()).signal);
};

const cssTransition = (
  el: HTMLElement | SVGElement,
  cssname: string = 'v',
  options?: TransitionInit,
) => {
  transition(el, {
    from(bag) {
      el.classList.add(cssname + '-from');
      el.classList.add(cssname + '-active');
      bag(() => {
        el.classList.remove(cssname + '-from');
        el.classList.remove(cssname + '-active');
      });

      options?.from?.(bag);
    },
    to(bag) {
      el.classList.remove(cssname + '-from');
      el.classList.add(cssname + '-to');
      bag(() => {
        el.classList.remove(cssname + '-to');
      });

      options?.to?.(bag);
    },
    done() {
      el.classList.remove(cssname + '-active');
      el.classList.remove(cssname + '-to');
      options?.done?.();
    },
  });
};

/**
 * Inspired by https://vuejs.org/guide/built-ins/transition.html
 */
export const fx = {
  transition,
  cssTransition,
};
