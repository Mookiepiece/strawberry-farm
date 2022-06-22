import React, { useState } from 'react';
import { useUnmount } from 'react-use';
import { useEventCallback } from '../shared';

export type Direction = {
  offsetSize: 'offsetHeight' | 'offsetWidth';
  scrollValue: 'scrollTop' | 'scrollLeft';
  scrollSize: 'scrollHeight' | 'scrollWidth';
  size: 'height' | 'width';
  axis: 'X' | 'Y';
  mouseEventClientValue: 'clientY' | 'clientX';
  clientRectStart: 'top' | 'left';
};
// https://github.com/element-plus/element-plus/blob/a57727bfa41943bc4bf81a2bc31d6895362b5077/packages/scrollbar/src/util.ts#L1
export const AXIS_MAP = {
  vertical: {
    offsetSize: 'offsetHeight',
    scrollValue: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    axis: 'Y',
    mouseEventClientValue: 'clientY',
    clientRectStart: 'top',
  } as Direction,
  horizontal: {
    offsetSize: 'offsetWidth',
    scrollValue: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    axis: 'X',
    mouseEventClientValue: 'clientX',
    clientRectStart: 'left',
  } as Direction,
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSlider = ({
  onChange,
  trackMouseEvents = true,
  trackTouchEvents = true,
}: {
  // direction: Direction;
  onChange: (prop: {
    mouse: {
      x: number;
      y: number;
    };
  }) => void;
  trackMouseEvents?: boolean;
  trackTouchEvents?: boolean;
}) => {
  const [active, setActive] = useState(false);

  const handleDrag = useEventCallback(
    (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
      const mouse = position(e);
      onChange?.({ mouse });
    }
  );

  const handleEnd = useEventCallback(() => {
    setActive(false);
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', handleEnd);
    document.removeEventListener('touchcancel', handleEnd);
  });
  const handleStart = useEventCallback((e: React.MouseEvent | React.TouchEvent) => {
    // middle click and right click won't trigger drag
    if (e.ctrlKey || ('button' in e && [1, 2].includes(e.button))) {
      return;
    }

    setActive(true);
    handleDrag(e.nativeEvent);
    if (trackMouseEvents) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleEnd);
    }
    if (trackTouchEvents) {
      document.addEventListener('touchmove', handleDrag);
      document.addEventListener('touchend', handleEnd);
      document.addEventListener('touchcancel', handleEnd);
    }
  });

  useUnmount(handleEnd); // component could unexpectly unmount during dragging.

  return {
    active,
    handleStart,
    handleDrag,
    handleEnd,
  };
};

const position = (
  e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
): {
  x: number;
  y: number;
} => {
  return 'touches' in e
    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
    : { x: e.clientX, y: e.clientY };
};
