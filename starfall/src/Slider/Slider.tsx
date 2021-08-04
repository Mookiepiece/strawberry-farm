import React, { useRef, useMemo } from 'react';
import clsx from 'clsx';
import { useEventCallback } from '@mookiepiece/starfall-utils';
import { useSlider } from './useSlider';

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
          onTouchStart={e => {
            e.stopPropagation();
            handleStart(e);
          }}
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
