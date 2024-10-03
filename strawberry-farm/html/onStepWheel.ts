import { on } from '../shared';

/**
 * To support touchpad which triggers delta less than 50 frequently.
 */
export const onStepWheel = (
  el: HTMLElement | SVGElement,
  cb: (delta: number) => void,
) => {
  let delta = 0;

  return on(el).wheel.prevent(e => {
    delta += e.deltaY;

    if (delta > 20) {
      delta = 0;
      cb(1);
    } else if (delta < 20) {
      delta = 0;
      cb(-1);
    }
  });
};
