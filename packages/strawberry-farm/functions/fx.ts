import { Bag, nextFrame, on } from '.';

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

function toMs(s: string): number {
  if (s === 'auto') return 0
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

const transitionFX = (el: HTMLElement, options: TransitionInit) => {
  // return new Promise<void>(resolve => {
  const bag = resetBag(el);
  options.from?.(bag);
  // el.classList.add(cssname + '-enter-from');
  // el.classList.add(cssname + '-enter-active');
  // bag(() => {
  //   el.classList.remove(cssname + '-enter-from');
  //   el.classList.remove(cssname + '-enter-active');
  // });

  nextFrame(() => {
    options.to?.(bag);
    // el.classList.remove(cssname + '-enter-from');
    // el.classList.add(cssname + '-enter-to');
    // bag(() => {
    //   el.classList.remove(cssname + '-enter-to');
    // });

    const transitionDelays = window
      .getComputedStyle(el)
      .transitionDelay.split(',');
    const transitionDurations = window
      .getComputedStyle(el)
      .transitionDuration.split(',');

    let count = 0;
    const off = on(el).transitionend.self(_ => {
      console.log(1);
      if (++count === transitionDurations.length) {
        off();
        options.done?.(bag);

        // el.classList.remove(cssname + '-enter-active');
        // el.classList.remove(cssname + '-enter-to');

        // resolve();
      }
    });
    bag(off);

    // If some transition properties didn't change and thus didn't transitioned
    // https://github.com/vuejs/core/blob/9a936aaec489c79433a32791ecf5ddb1739a62bd/packages/runtime-dom/src/components/Transition.ts#L357
    const timeout = 



  }, bag(new AbortController()).signal);
  // });
};

const cssTransitionFX = (
  el: HTMLElement,
  cssname: string = 'v',
  options?: TransitionInit,
) => {
  transitionFX(el, {
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

export const fx = {
  cssTransition: cssTransitionFX,
};

// // Inspired by https://vuejs.org/guide/built-ins/transition.html
// export const transition = (cssname: string = 'v') => {
//   return {
//     enter(el: HTMLElement) {

//     },
//   };
// };
