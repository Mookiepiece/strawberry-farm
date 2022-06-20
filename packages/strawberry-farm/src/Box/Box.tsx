import React from 'react';
import clsx, { ClassValue } from 'clsx';
import { bem } from '../utils/bem';

const Box: React.FC<
  {
    /**
     * display: grid
     */
    grid?: boolean | string | string[];
    /**
     * width & height: 100%
     */
    stretched?: boolean;
    /**
     * flex-direction: column
     */
    horizontal?: boolean;
    /**
     * flex-direction: *-reverse
     */
    reverse?: boolean;

    /**
     * justify-content
     */
    justify?: 'center' | 'between' | 'around' | 'evenly' | 'start' | 'end' | 'stretch';
    /**
     * align-items
     */
    align?: 'center' | 'start' | 'end' | 'stretch';
    /**
     * flex-wrap
     */
    wrap?: boolean;

    gap?: 2 | 5 | 10 | 20 | 30 | 50;
    /**
     * flex-grow
     */
    grow?: number | boolean;
    /**
     * flex-shrink
     */
    shrink?: number | boolean;
    /**
     * flex-basis
     */
    basis?: number | string;
    className?: ClassValue;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({
  grid,
  stretched,
  horizontal,
  reverse,
  justify,
  align,
  wrap,
  gap,
  grow,
  shrink,
  basis,
  children,
  className,
  style,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        className,
        bem('sf-box', {
          grid: !!grid,
          horizontal,
          stretched,
          reverse,
          wrap,
          justify: justify === 'start' || justify === undefined ? undefined : `justify-${justify}`,
          align: align === 'start' || align === undefined ? undefined : `align-${align}`,
        })
      )}
      style={{
        gap,
        flexGrow: typeof grow === 'boolean' ? (grow ? 1 : 0) : grow,
        flexShrink: typeof shrink === 'boolean' ? (shrink ? 1 : 0) : shrink,
        flexBasis: basis,
        gridTemplateColumns: Array.isArray(grid)
          ? grid.join(' ')
          : typeof grid === 'string'
          ? grid
          : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
