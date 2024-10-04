const n=`import { onTimeout, nextFrame } from './scheduler';\r
import { Bag, Bags } from './collection';\r
import { on } from './on';\r
\r
const { resetBag } = Bags();\r
\r
type TransitionInit = {\r
  from?: (bag: ReturnType<typeof Bag>) => (() => void) | void;\r
  to?: (bag: ReturnType<typeof Bag>) => (() => void) | void;\r
  done?: () => (() => void) | void;\r
};\r
\r
const transition = (el: HTMLElement | SVGElement, options: TransitionInit) => {\r
  const bag = resetBag(el);\r
  options.from?.(bag);\r
\r
  nextFrame(() => {\r
    options.to?.(bag);\r
\r
    const transitionDelays = window\r
      .getComputedStyle(el)\r
      .transitionDelay.split(',');\r
    const transitionDurations = window\r
      .getComputedStyle(el)\r
      .transitionDuration.split(',');\r
\r
    let count = 0;\r
    bag(\r
      on(el).transitionend.self(_ => {\r
        if (++count === transitionDurations.length) {\r
          bag();\r
          options.done?.();\r
        }\r
      }),\r
    );\r
\r
    // https://github.com/vuejs/core/blob/9a936aaec489c79433a32791ecf5ddb1739a62bd/packages/runtime-dom/src/components/Transition.ts#L357\r
    const timeout = Math.max(\r
      ...transitionDelays.map((s, index) => { \r
        let delay = Number(s.slice(0, -1));\r
        let duration = Number(transitionDurations[index].slice(0, -1));\r
\r
        delay = Number.isNaN(delay) ? 0 : delay;\r
        duration = Number.isNaN(duration) ? 0 : duration;\r
\r
        return (delay + duration) * 1000;\r
      }),\r
    );\r
\r
    bag(\r
      onTimeout(() => {\r
        bag();\r
        options.done?.();\r
      }, timeout + 1),\r
    );\r
  }, bag(new AbortController()).signal);\r
};\r
\r
const cssTransition = (\r
  el: HTMLElement | SVGElement,\r
  cssname: string = 'v',\r
  options?: TransitionInit,\r
) => {\r
  transition(el, {\r
    from(bag) {\r
      el.classList.add(cssname + '-from');\r
      el.classList.add(cssname + '-active');\r
      bag(() => {\r
        el.classList.remove(cssname + '-from');\r
        el.classList.remove(cssname + '-active');\r
      });\r
\r
      options?.from?.(bag);\r
    },\r
    to(bag) {\r
      el.classList.remove(cssname + '-from');\r
      el.classList.add(cssname + '-to');\r
      bag(() => {\r
        el.classList.remove(cssname + '-to');\r
      });\r
\r
      options?.to?.(bag);\r
    },\r
    done() {\r
      el.classList.remove(cssname + '-active');\r
      el.classList.remove(cssname + '-to');\r
      options?.done?.();\r
    },\r
  });\r
};\r
\r
/**\r
 * Inspired by https://vuejs.org/guide/built-ins/transition.html\r
 */\r
export const fx = {\r
  transition,\r
  cssTransition,\r
};\r
`;export{n as default};
