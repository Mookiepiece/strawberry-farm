const e=`import { fx } from '../shared';\r
\r
export const collapse = {\r
  show(el: HTMLElement | SVGElement) {\r
    return new Promise<void>(resolve => {\r
      fx.transition(el, {\r
        from() {\r
          el.style.setProperty('--h', '0');\r
          el.classList.remove('collapsed');\r
          el.classList.add('collapsing');\r
        },\r
        to(x) {\r
          el.style.setProperty('--h', el.scrollHeight + 'px');\r
        },\r
        done() {\r
          el.style.removeProperty('--h');\r
          el.classList.remove('collapsing');\r
          resolve();\r
        },\r
      });\r
    });\r
  },\r
  hide(el: HTMLElement | SVGElement) {\r
    return new Promise<void>(resolve => {\r
      fx.transition(el, {\r
        from() {\r
          el.style.setProperty('--h', el.scrollHeight + 'px');\r
          el.classList.add('collapsing');\r
        },\r
        to() {\r
          el.style.setProperty('--h', '0');\r
        },\r
        done() {\r
          el.style.removeProperty('--h');\r
          el.classList.add('collapsed');\r
          el.classList.remove('collapsing');\r
          resolve();\r
        },\r
      });\r
    });\r
  },\r
  toggle(el: HTMLElement | SVGElement) {\r
    el.classList.contains('collapsed') || // leaved\r
    el.style.getPropertyValue('--h') === '0' // leaving\r
      ? collapse.show(el)\r
      : collapse.hide(el);\r
  },\r
};\r
`;export{e as default};
