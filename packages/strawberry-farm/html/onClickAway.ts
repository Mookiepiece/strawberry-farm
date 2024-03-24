import { on } from '../functions';

/**
 *
 * Vueuse has encountered this problem
 * https://github.com/vueuse/vueuse/pull/2405
 *
 * But they said, it seems this issue is fixed in the latest version of Safari.
 *
 */
export const onClickAway = (
  ref: HTMLElement | HTMLElement[],
  cb: () => void,
) => {
  const elements = Array.isArray(ref) ? ref : [ref];

  return on(document).click(e => {
    if (elements.every(el => el?.contains(e.target as Node) === false)) cb();
  });
};
