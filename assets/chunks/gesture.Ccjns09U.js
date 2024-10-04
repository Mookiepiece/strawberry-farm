const n=`import { Bag } from './collection';\r
import { on } from './on';\r
\r
// Inspired by vueuse usePointerSwipe\r
export const swipe = (\r
  el: HTMLElement | SVGElement,\r
  onStart?: (\r
    e: PointerEvent,\r
  ) => ((p2: { e: PointerEvent; done: boolean }) => void) | void,\r
) => {\r
  const bag = Bag();\r
  const smallBag = Bag();\r
\r
  bag(\r
    on(el).pointerdown(async ev => {\r
      const subscription = onStart?.(ev);\r
      if (subscription) {\r
        el.setPointerCapture(ev.pointerId);\r
        ev.preventDefault(); // Prevent from dragging selected text\r
\r
        // Sometimes we drag the children inside the container instead the container itself.\r
        // Better to mannually set \`touch-action\` for each draggable children instead.\r
        // el.style?.setProperty('touch-action', 'none');\r
\r
        smallBag(\r
          on(el).pointermove(e => {\r
            subscription({ e, done: false });\r
          }),\r
        );\r
\r
        smallBag(\r
          on(el).pointerup(e => {\r
            subscription({ e, done: true });\r
            smallBag();\r
          }),\r
        );\r
      }\r
    }),\r
  );\r
\r
  return () => {\r
    bag();\r
    smallBag();\r
  };\r
};\r
`;export{n as default};
