import { Bag } from './collection';
import { on } from './on';

// Inspired by vueuse usePointerSwipe
export const trackPointer = (
  el: HTMLElement,
  onStart?: (p: {
    subscribe(cb: (p2: { e: PointerEvent; done: boolean }) => void): void;
    e: PointerEvent;
  }) => void,
) => {
  const bag = Bag();

  if (!el.style.getPropertyValue('touch-action')) {
    el.style?.setProperty('touch-action', 'none');
    bag(() => {
      el.style?.removeProperty('touch-action');
    });
  }

  const smallBag = Bag();

  bag(
    on(el).pointerdown(async ev => {
      el.setPointerCapture(ev.pointerId);

      const subscribe: (
        cb: (p2: { e: PointerEvent; done: boolean }) => void,
      ) => void = cb => {
        smallBag(
          on(el).pointermove(e => {
            cb({ e, done: false });
          }),
        );

        smallBag(
          on(el).pointerup(e => {
            cb({ e, done: true });
            smallBag();
          }),
        );
        return;
      };

      onStart?.({
        subscribe,
        e: ev,
      });
    }),
  );

  return () => {
    bag();
    smallBag();
  };
};
