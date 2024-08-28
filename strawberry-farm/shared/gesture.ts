import { Bag } from './collection';
import { on } from './on';

// Inspired by vueuse usePointerSwipe
export const swipe = (
  el: HTMLElement | SVGElement,
  onStart?: (
    e: PointerEvent,
  ) => ((p2: { e: PointerEvent; done: boolean }) => void) | void,
) => {
  const bag = Bag();
  const smallBag = Bag();

  bag(
    on(el).pointerdown(async ev => {
      const subscription = onStart?.(ev);
      if (subscription) {
        el.setPointerCapture(ev.pointerId);
        ev.preventDefault(); // Prevent from dragging selected text

        // Sometimes we drag the children inside the container instead the container itself.
        // Better to mannually set `touch-action` for each draggable children instead.
        // el.style?.setProperty('touch-action', 'none');

        smallBag(
          on(el).pointermove(e => {
            subscription({ e, done: false });
          }),
        );

        smallBag(
          on(el).pointerup(e => {
            subscription({ e, done: true });
            smallBag();
          }),
        );
      }
    }),
  );

  return () => {
    bag();
    smallBag();
  };
};
