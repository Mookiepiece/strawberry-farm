/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Modifier } from '@popperjs/core';

// https://popper.js.org/docs/v2/modifiers/community-modifiers/
// https://codesandbox.io/s/bitter-sky-pe3z9?file=/src/index.js:72-408
export const sameWidth: Modifier<any, any> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    // 这一步是为了计算正确的位置，因为宽度影响着位置所以提前设置一个宽度， this is for positioning, because width affects the position
    state.elements.popper.style.width = `${(state.elements.reference as any).offsetWidth}px`;
  },
};

export const createOffsetModifier = (skidding = 0, distance = 10): Modifier<unknown, unknown> =>
  ({
    name: 'offset',
    options: {
      offset: [skidding, distance],
    },
  } as any);

export const arrow = {
  name: 'arrow',
} as any;
