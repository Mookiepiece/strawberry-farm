import { on } from '../functions';

/**
 * Using pointerdown, otherwise click other interactive elements will lost their focus but focus on the popper reference.
 */
export const onClickAway = (
  ref: HTMLElement | HTMLElement[],
  cb: () => void,
) => {
  const elements = Array.isArray(ref) ? ref : [ref];

  return on(document).pointerdown(e => {
    if (elements.every(el => el?.contains(e.target as Node) === false)) cb();
  });
};
