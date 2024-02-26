import { on } from '.';

const trapped: HTMLElement[] = [];

/**
 * Focus Trap
 *
 * This only detects the focus event inside the document.
 * that means, the user is able to focus other buttons (e.g. bookmark) inside the browser's chrome.
 *
 * when a new trap is set, current trap will temperary disabled and will recover when that pop.
 */
export const trap = (el: HTMLElement) => {
  trapped.push(el);
  const backTo = document.activeElement;
  focusInside(el);
  const off = _trap(el);

  return () => {
    trapped.splice(trapped.indexOf(el), 1);
    off();

    const isTop = el === trapped[trapped.length - 1];

    if (isTop) backTo instanceof HTMLElement && backTo.focus();
  };
};

const _trap = (el: HTMLElement) =>
  on(document).focusin(({ target: thief }) => {
    // Only trap the top most element
    const isTop = el === trapped[trapped.length - 1];
    if (!isTop) return;

    if (thief && thief instanceof HTMLElement) {
      const i = el.compareDocumentPosition(thief);
      const direction =
        i === Node.DOCUMENT_POSITION_FOLLOWING
          ? 1
          : i === Node.DOCUMENT_POSITION_PRECEDING
            ? -1
            : 0;

      if (direction) {
        focusInside(el, direction === -1);
      }
    }
  });

const focusInside = (el: HTMLElement, reversed = false) => {
  // focusable elements modified based on: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/
  // those are "maybe focusable" (e.g. <a> without herf attribute cannot be focusd), we have to try them out.
  const children = [
    ...el.querySelectorAll<HTMLElement>(
      ':is(a,input,button,select,textarea,[tabindex]):not(:disabled)',
    ),
  ];

  if (reversed) {
    children.reverse();
  }

  let ok = false;
  for (const i of children) {
    i.focus();
    if (i === document.activeElement) {
      ok = true;
      break;
    }
  }

  // the worst case is focus the element itself when no focusable elemnts inside it
  // e.g. info dialog overlay
  if (!ok) {
    el.focus();
  }
};
