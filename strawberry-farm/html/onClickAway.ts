import { on } from '../shared';

/**
 * Using pointerdown, otherwise click other interactive elements will lost their focus but focus on the popper reference.
 */
export const onClickAway = (
  ref: HTMLElement | SVGElement | (HTMLElement | SVGElement)[],
  cb: () => void,
) => {
  const elements = Array.isArray(ref) ? ref : [ref];

  return on(document).pointerdown.capture(e => {
    if (elements.every(el => el?.contains(e.target as Node) === false)) cb();
  });
};
