import { useEventCallback } from '@mookiepiece/starfall-utils';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useMemo } from 'react';
import { useUnmount } from 'react-use';
type Direction = {
  offsetSize: 'offsetHeight' | 'offsetWidth';
  scrollValue: 'scrollTop' | 'scrollLeft';
  scrollSize: 'scrollHeight' | 'scrollWidth';
  size: 'height' | 'width';
  axis: 'X' | 'Y';
  mouseEventClientValue: 'clientY' | 'clientX';
  clientRectStart: 'top' | 'left';
};
// https://github.com/element-plus/element-plus/blob/a57727bfa41943bc4bf81a2bc31d6895362b5077/packages/scrollbar/src/util.ts#L1
const BAR_MAP = {
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
const useSlider = ({
  direction,
  onChange,
}: {
  direction: Direction;
  onChange: (prop: {
    mouse: {
      x: number;
      y: number;
    };
  }) => void;
}) => {
  const [active, setActive] = useState(false);
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

  const handleDrag = useEventCallback(
    (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
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
    setActive(true);
    handleDrag(e.nativeEvent);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchcancel', handleEnd);
  });

  useUnmount(handleEnd); // component could unexpectly unmount during dragging.

  return {
    active,
    handleStart,
    handleDrag,
    handleEnd,
  };
};

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number | null;
  label?: { value: number; label?: React.ReactNode }[];
};

const noop = () => {};
const EMPTY: [] = [];

const Slider: React.FC<SliderProps> = ({
  value = 0,
  onChange = noop,
  min = 0,
  max = 100,
  step = 1,
  label = EMPTY,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const clamp = useEventCallback((v: number, _min: number = min, _max: number = max) =>
    Math.max(_min, Math.min(v, _max))
  );

  const railRef = useRef<HTMLDivElement>(null);

  const labelWithPosition = useMemo(() => {
    return label.map(({ value, label }) => ({
      value,
      label,
      percentage: Math.round(((value - min) / (max - min)) * 100),
    }));
  }, [label, max, min]);

  const handleSliderChange = useEventCallback(({ mouse: { x, y } }) => {
    if (!railRef.current) return;

    const { width, left } = railRef.current.getBoundingClientRect();
    const percentage = (x - left) / width;

    if (typeof step === 'number') {
      const v = clamp(step * Math.round((percentage * (max - min)) / step) + min);
      onChange(v);
    } else {
      onChange(
        labelWithPosition[
          findNearesetIndex(
            labelWithPosition.map(({ percentage }) => percentage),
            percentage * 100
          )
        ].value
      );
    }
  });

  const { active, handleStart } = useSlider({
    direction: BAR_MAP.horizontal,
    onChange: handleSliderChange,
  });

  const prev = () => {
    if (step === null) {
      const currentIndex = findNearesetIndex(
        labelWithPosition.map(({ percentage }) => percentage),
        percentage
      );
      onChange(labelWithPosition[clamp(currentIndex - 1, 0, labelWithPosition.length - 1)].value);
    } else {
      onChange(clamp(value - step));
    }
  };

  const next = () => {
    if (step === null) {
      const currentIndex = findNearesetIndex(
        labelWithPosition.map(({ percentage }) => percentage),
        percentage
      );
      onChange(labelWithPosition[clamp(currentIndex + 1, 0, labelWithPosition.length - 1)].value);
    } else {
      onChange(clamp(value + step));
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        next();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        prev();
        break;
    }
  };

  return (
    <div className={clsx('st-slider', active && 'st-slider--active')}>
      <div className="st-slider__labels">
        {labelWithPosition.map(({ label, value, percentage }) => (
          <div
            className="st-slider__label-item"
            key={value}
            onClick={() => onChange(value)}
            style={{ left: percentage + '%' }}
          >
            <div className="st-slider__label-item__inner">{label || value}</div>
          </div>
        ))}
      </div>
      <input type="range" className="st-slider__input-el" onKeyDown={handleKeydown} />
      <div className="st-slider__rail" ref={railRef} onMouseDown={handleStart}>
        <div
          className="st-slider__fill"
          style={{
            width: percentage + '%',
          }}
        ></div>
        <div
          className="st-slider__thumb"
          style={{
            left: percentage + '%',
          }}
          onTouchStart={handleStart}
        >
          <div className="st-slider__tooltip">{value}</div>
        </div>
      </div>
    </div>
  );
};

const findNearesetIndex = (valueArray: number[], percentage: number) => {
  if (percentage <= valueArray[0]) return 0;
  if (percentage >= valueArray[valueArray.length - 1]) return valueArray.length - 1;

  return valueArray.reduce((ans: undefined | number, value, index) => {
    if (typeof ans === 'number') return ans;
    if (valueArray.length - 1 !== index) {
      const nextValue = valueArray[index + 1];
      if (value <= percentage && percentage < nextValue) {
        return percentage - value > nextValue - percentage ? index + 1 : index;
      }
    }
  }, undefined) as number;
};

export default Slider;
