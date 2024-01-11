import { on } from './on';

// Inspired by vueuse usePointerSwipe
export const trackPointer = (
  el: HTMLElement,
  onStart?: (p: {
    subscribe(cb: (p2: { e: PointerEvent; done: boolean }) => void): void;
    e: PointerEvent;
  }) => void,
) => {
  const offs0 = new Set<any>();
  const offs = new Set<any>();
  if (!el.style.getPropertyValue('touch-action')) {
    console.warn(
      '[StrawberryFarm] Pointer events should apply on elements that `touch-action` is `none`',
    );
  }

  if (!el.style.getPropertyValue('touch-action')) {
    el.style?.setProperty('touch-action', 'none');
    offs0.add(() => {
      el.style?.removeProperty('touch-action');
    });
  }

  offs0.add(
    on(el, 'pointerdown', async ev => {
      el.setPointerCapture(ev.pointerId);

      const subscribe: (cb: (p2: { e: PointerEvent; done: boolean }) => void) => void = cb => {
        offs.add(
          on(el, 'pointermove', ev => {
            cb({
              e: ev,
              done: false,
            });
          }),
        );

        offs.add(
          on(el, 'pointerup', ev => {
            cb({
              e: ev,
              done: true,
            });

            offs.forEach(_ => _());
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
    offs0.forEach(_ => _());
    offs.forEach(_ => _());
  };
};
