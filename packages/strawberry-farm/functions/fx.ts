import { Bag, makeTimeout, nextFrame, on } from '.';

const bins = new WeakMap<HTMLElement, ReturnType<typeof Bag>>();

const resetBag = (el: HTMLElement) => {
  let bag = bins.get(el);

  if (bag) {
    bag();
  } else {
    bag = Bag();
    bins.set(el, bag);
  }

  return bag;
};

type TransitionInit = {
  from?: (bag: ReturnType<typeof Bag>) => (() => void) | void;
  to?: (bag: ReturnType<typeof Bag>) => (() => void) | void;
  done?: (bag: ReturnType<typeof Bag>) => (() => void) | void;
};

const transition = (el: HTMLElement, options: TransitionInit) => {
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
    const off = on(el).transitionend.self(_ => {
      if (++count === transitionDurations.length) {
        off();
        options.done?.(bag);
      }
    });
    bag(off);

    // If some transition properties didn't get changed during the transition
    // it will not fires an TransitionEvent.
    // Thus we need this fallback
    // https://github.com/vuejs/core/blob/9a936aaec489c79433a32791ecf5ddb1739a62bd/packages/runtime-dom/src/components/Transition.ts#L357
    const timeout = Math.max(
      ...transitionDelays.map((s, index) => {
        let delay = Number(s.slice(0, -1));
        let duration = Number(transitionDurations[index].slice(0, -1));

        delay = Number.isNaN(delay) ? 0 : delay; // There are some kind of invalid values, see vue.
        duration = Number.isNaN(duration) ? 0 : duration;

        return (delay + duration) * 1000;
      }),
    );

    bag(
      makeTimeout(() => {
        if (count < transitionDurations.length) {
          count = Number.NEGATIVE_INFINITY;
          options.done?.(bag);
        }
      }, timeout + 1),
    );
  }, bag(new AbortController()).signal);
};

const cssTransition = (
  el: HTMLElement,
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
    done(bag) {
      el.classList.remove(cssname + '-active');
      el.classList.remove(cssname + '-to');
      options?.done?.(bag);
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
