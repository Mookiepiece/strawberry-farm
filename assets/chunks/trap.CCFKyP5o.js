const e=`import { on } from './on';\r
\r
const trapped: (HTMLElement | SVGElement)[] = [];\r
\r
/**\r
 * Focus Trap\r
 *\r
 * This only detects the \`focusin\` event inside the document. Catch the run away focus back, you may see browser scrolled to that thief.\r
 *\r
 * To prevent any scrolls, wrap your target element with two guardian <div tabindex='0'> and make sure they are inside viewport.\r
 *\r
 * when a new trap is set, current trap will temperary disabled and will recover when that pop.\r
 *\r
 * The element itself or one of it's children is required to be focusable. It is recommended to mark the element itself \`tabindex="-1"\`.\r
 */\r
export const trap = (\r
  el: HTMLElement | SVGElement,\r
  details?: (theif: Element) => void | boolean,\r
) => {\r
  trapped.push(el);\r
  const backTo = document.activeElement;\r
  trapIn(el);\r
  const off = on(document).focusin(({ target: thief }) => {\r
    // Only trap the top most element\r
    const isTop = el === trapped[trapped.length - 1];\r
    if (!isTop) return;\r
\r
    if (thief && thief instanceof Element) {\r
      const i = el.compareDocumentPosition(thief);\r
      const direction =\r
        i === Node.DOCUMENT_POSITION_FOLLOWING\r
          ? 1\r
          : i === Node.DOCUMENT_POSITION_PRECEDING\r
            ? -1\r
            : 0;\r
\r
      if (direction) {\r
        if (details?.(thief) === false) return;\r
        trapIn(el, direction === -1);\r
      }\r
    }\r
  });\r
\r
  return () => {\r
    const isTop = el === trapped[trapped.length - 1];\r
\r
    trapped.splice(trapped.indexOf(el), 1);\r
    off();\r
\r
    if (isTop) (backTo as any)?.focus?.();\r
  };\r
};\r
\r
export const trapIn = (el: HTMLElement | SVGElement, reversed = false) => {\r
  // focusable elements modified based on: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/\r
  // those are "maybe focusable" (e.g. <a> without herf attribute cannot be focusd), we have to try them out.\r
  const children = [\r
    ...el.querySelectorAll<HTMLElement | SVGElement>(\r
      ':is(a,input,button,select,textarea,summary,[tabindex]:not([tabindex="-1"])):not(:disabled)',\r
    ),\r
  ];\r
\r
  if (reversed) {\r
    children.reverse();\r
  }\r
\r
  let ok = false;\r
  for (const i of children) {\r
    i.focus();\r
    if (i === document.activeElement) {\r
      ok = true;\r
      break;\r
    }\r
  }\r
\r
  // the worst case is focus the element itself when no focusable elemnts inside it\r
  // e.g. info dialog overlay\r
  if (!ok) {\r
    el.focus();\r
  }\r
};\r
`;export{e as default};
