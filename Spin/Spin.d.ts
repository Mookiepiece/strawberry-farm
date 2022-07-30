import React from 'react';
declare type SpinProps = {
    loading?: boolean;
    weight?: 1 | 2 | 3;
    lazy?: number;
    children?: React.ReactNode;
};
declare const Spin: React.FC<SpinProps> & {
    Container: typeof SpinContainer;
};
declare const SpinContainer: React.FC<SpinProps>;
export default Spin;
