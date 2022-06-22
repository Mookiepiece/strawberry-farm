import React, { useImperativeHandle, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useEventCallback, Mitt } from '../shared';
import type { Emitter } from '../shared';
import { AXIS_MAP, useSlider } from '../Slider/useSlider';
import type { Direction } from '../Slider/useSlider';

type ScrollViewMitt = Emitter<{
  SCROLL: [number, number];
  RESIZE: [string, string];
}>;

export type ScrollViewProps = {
  wrapStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
};
export type ScrollViewInstance = {
  container: HTMLDivElement | null;
};

const ScrollView: React.ForwardRefExoticComponent<
  ScrollViewProps & React.RefAttributes<ScrollViewInstance>
> = React.forwardRef(({ children, wrapStyle, containerStyle }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mitt] = useState<ScrollViewMitt>(Mitt);

  useImperativeHandle(
    ref,
    () => ({
      get container() {
        return containerRef.current;
      },
    }),
    []
  );

  // FEAT: scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    mitt.emit('SCROLL', [
      (containerRef.current.scrollLeft * 100) / containerRef.current.clientWidth,
      (containerRef.current.scrollTop * 100) / containerRef.current.clientHeight,
    ]);
  }, [mitt]);

  // useEffect(() => {
  //   handleScroll();
  //   if (!containerRef.current) return;
  //   const heightPercentage =
  //     (containerRef.current.clientHeight * 100) / containerRef.current.scrollHeight;
  //   const widthPercentage =
  //     (containerRef.current.clientWidth * 100) / containerRef.current.scrollWidth;

  //   mitt.emit('RESIZE', [
  //     widthPercentage < 100 ? widthPercentage + '%' : '',
  //     heightPercentage < 100 ? heightPercentage + '%' : '',
  //   ]);
  // }, [children, handleScroll, mitt]);

  // FEAT: resize
  useEffect(() => {
    if (!containerRef.current) return;
    const div = containerRef.current;
    const update = () => {
      if (!containerRef.current) return;
      const heightPercentage =
        (containerRef.current.clientHeight * 100) / containerRef.current.scrollHeight;
      const widthPercentage =
        (containerRef.current.clientWidth * 100) / containerRef.current.scrollWidth;

      mitt.emit('RESIZE', [
        widthPercentage < 100 ? widthPercentage + '%' : '',
        heightPercentage < 100 ? heightPercentage + '%' : '',
      ]);
    };
    update();
    const ro = new ResizeObserver(() => {
      // resize observer's entries (contentBoxSize etc) is not stable. from my test.
      update();
    });
    ro.observe(div);
    return () => {
      ro.unobserve(div);
    };
  }, [mitt, handleScroll]);

  return (
    <div className="st-scroll-view-wrap" style={wrapStyle}>
      <div
        className="st-scroll-view"
        ref={containerRef}
        onScroll={handleScroll}
        style={containerStyle}
      >
        {children}
      </div>
      <Scrollbar containerRef={containerRef} mitt={mitt} />
      <Scrollbar vertical containerRef={containerRef} mitt={mitt} />
    </div>
  );
});

type ScrollbarProps = {
  vertical?: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  mitt: ScrollViewMitt;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ vertical, mitt, containerRef }) => {
  const xy: Direction = AXIS_MAP[vertical ? 'vertical' : 'horizontal'];

  const [size, setSize] = useState('0');
  const [move, setMove] = useState(0);

  useEffect(() => {
    const index = vertical ? 1 : 0;
    mitt.on('RESIZE', e => setSize(e[index]));
    mitt.on('SCROLL', e => setMove(e[index]));
  }, [mitt, vertical]);

  //   this is thumb
  //   \                    \  this is thumbMouseOffset
  //   \                    \
  //   \   <- mouse click here
  //   \
  //
  const thumbMouseOffsetRef = useRef<number>(0);

  const onChange = ({ mouse }: { mouse: { x: number; y: number } }) => {
    if (!barRef.current) return;
    if (!containerRef.current) return;

    const offset =
      (mouse as any)[xy.axis.toLowerCase() as any] -
      barRef.current.getBoundingClientRect()[xy.clientRectStart];

    const scrolledPercentage =
      ((offset - thumbMouseOffsetRef.current) * 100) / barRef.current[xy.offsetSize];
    containerRef.current[xy.scrollValue] =
      (scrolledPercentage / 100) * containerRef.current[xy.scrollSize];
  };

  const { active, handleStart } = useSlider({
    onChange,
  });

  const thumbRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleThumbMouseDown = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== thumbRef.current) return;

    if (!thumbRef.current) return;

    thumbMouseOffsetRef.current =
      e[xy.mouseEventClientValue] - thumbRef.current.getBoundingClientRect()[xy.clientRectStart];
    handleStart(e);
  });

  const handleBarMouseDown = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // thumb self
    if (e.target !== barRef.current) return;

    if (!barRef.current) return;
    if (!thumbRef.current) return;
    if (!containerRef.current) return;

    const thumbHalf = thumbRef.current[xy.offsetSize] / 2;
    const offset =
      e[xy.mouseEventClientValue] -
      barRef.current.getBoundingClientRect()[xy.clientRectStart] -
      thumbHalf;

    const thumbPositionPercentage = (offset * 100) / containerRef.current[xy.offsetSize];

    containerRef.current[xy.scrollValue] =
      (thumbPositionPercentage * containerRef.current[xy.scrollSize]) / 100;

    if (!thumbRef.current) return;
    thumbMouseOffsetRef.current = thumbHalf;
    handleStart(e);
  });

  const style = renderThumbStyle({ size, move, xy });
  return (
    <div
      onMouseDown={handleBarMouseDown}
      className={clsx(
        'st-scrollbar',
        vertical ? 'st-scrollbar--vertical' : 'st-scrollbar--horizontal',
        active && 'st-scrollbar--active'
      )}
      ref={barRef}
    >
      <div
        className="st-scrollbar__thumb"
        style={style}
        onMouseDown={handleThumbMouseDown}
        ref={thumbRef}
      ></div>
    </div>
  );
};

function renderThumbStyle({ move, size, xy }: { move: number; size: string; xy: Direction }) {
  const translate = `translate${xy.axis}(${move}%)`;
  return {
    [xy.size]: size,
    transform: translate,
  };
}

export default ScrollView;
