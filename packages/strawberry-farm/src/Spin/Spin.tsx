import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { useLazyLoading } from './useLazyLoading';

type SpinProps = {
  loading?: boolean;
  weight?: 1 | 2 | 3;
  lazy?: number;
  children?: React.ReactNode;
};

const Spin: React.FC<SpinProps> & {
  Container: typeof SpinContainer;
} = ({ loading: _loading, weight = 2, lazy }) => {
  const loading = useLazyLoading(_loading, lazy);

  return (
    <Transition
      show={loading === true || loading === undefined}
      className="st-spin"
      enterFrom="st-spin-out"
      enter="st-spin-active"
      enterTo="st-spin-in"
      leaveFrom="st-spin-in"
      leave="st-spin-active"
      leaveTo="st-spin-out"
      style={
        {
          '--st-spin-border': weight + 'px',
        } as React.CSSProperties
      }
    ></Transition>
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
