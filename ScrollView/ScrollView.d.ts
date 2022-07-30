import React from 'react';
export declare type ScrollViewProps = {
    wrapStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    children?: React.ReactNode;
};
export declare type ScrollViewInstance = {
    container: HTMLDivElement | null;
};
declare const ScrollView: React.ForwardRefExoticComponent<ScrollViewProps & React.RefAttributes<ScrollViewInstance>>;
export default ScrollView;
