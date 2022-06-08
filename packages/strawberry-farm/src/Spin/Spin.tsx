import clsx from 'clsx';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useLazyLoading } from './useLazyLoading';

type SpinProps = {
  loading?: boolean;
  weight?: 1 | 2 | 3;
  lazy?: number;
};

const Spin: React.FC<SpinProps> & {
  Container: typeof SpinContainer;
} = ({ loading: _loading, weight = 2, lazy }) => {
  const loading = useLazyLoading(_loading, lazy);

  return (
    <CSSTransition
      in={loading === true || loading === undefined}
      timeout={loading === undefined ? 0 : 300}
      classNames="st-spin"
      unmountOnExit
    >
      <div
        className="st-spin"
        style={
          {
            '--st-spin-border': weight + 'px',
          } as React.CSSProperties
        }
      ></div>
    </CSSTransition>
  );
};

const SpinContainer: React.FC<SpinProps> = ({ children, loading: _loading, weight, lazy }) => {
  const loading = useLazyLoading(_loading, lazy);

  return (
    <div className={clsx('st-spin-container', loading && 'st-spin-container--loading')}>
      <div className="st-spin-container__inner">{children}</div>
      <div className="st-spin-container__overlay">
        <Spin {...{ loading, weight }} />
      </div>
    </div>
  );
};
Spin.Container = SpinContainer;

export default Spin;
