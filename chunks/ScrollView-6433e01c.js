import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import React, { useRef, useState, useImperativeHandle, useCallback, useEffect } from 'react';
import { c as clsx } from './clsx.m-1795d575.js';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/instance/map';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/instance/filter';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import '@babel/runtime-corejs3/core-js-stable/object/define-property';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import { M as Mitt } from './mitt-640f195b.js';
import { u as useEventCallback } from './keys-73f87561.js';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/helpers/asyncToGenerator';
import '@babel/runtime-corejs3/regenerator';
import '@babel/runtime-corejs3/core-js-stable/promise';
import 'react-dom';
import 'react-use';
import 'react-dom/client';
import 'zustand';
import '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';
import { u as useSlider, A as AXIS_MAP } from './useSlider-3384c449.js';

var ScrollView = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      wrapStyle = _ref.wrapStyle,
      containerStyle = _ref.containerStyle;
  var containerRef = useRef(null);

  var _useState = useState(Mitt),
      _useState2 = _slicedToArray(_useState, 1),
      mitt = _useState2[0];

  useImperativeHandle(ref, function () {
    return {
      get container() {
        return containerRef.current;
      }

    };
  }, []); // FEAT: scroll

  var handleScroll = useCallback(function () {
    if (!containerRef.current) return;
    mitt.emit('SCROLL', [containerRef.current.scrollLeft * 100 / containerRef.current.clientWidth, containerRef.current.scrollTop * 100 / containerRef.current.clientHeight]);
  }, [mitt]); // useEffect(() => {
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

  useEffect(function () {
    if (!containerRef.current) return;
    var div = containerRef.current;

    var update = function update() {
      if (!containerRef.current) return;
      var heightPercentage = containerRef.current.clientHeight * 100 / containerRef.current.scrollHeight;
      var widthPercentage = containerRef.current.clientWidth * 100 / containerRef.current.scrollWidth;
      mitt.emit('RESIZE', [widthPercentage < 100 ? widthPercentage + '%' : '', heightPercentage < 100 ? heightPercentage + '%' : '']);
    };

    update();
    var ro = new ResizeObserver(function () {
      // resize observer's entries (contentBoxSize etc) is not stable. from my test.
      update();
    });
    ro.observe(div);
    return function () {
      ro.unobserve(div);
    };
  }, [mitt, handleScroll]);
  return /*#__PURE__*/React.createElement("div", {
    className: "st-scroll-view-wrap",
    style: wrapStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-scroll-view",
    ref: containerRef,
    onScroll: handleScroll,
    style: containerStyle
  }, children), /*#__PURE__*/React.createElement(Scrollbar, {
    containerRef: containerRef,
    mitt: mitt
  }), /*#__PURE__*/React.createElement(Scrollbar, {
    vertical: true,
    containerRef: containerRef,
    mitt: mitt
  }));
});

var Scrollbar = function Scrollbar(_ref2) {
  var vertical = _ref2.vertical,
      mitt = _ref2.mitt,
      containerRef = _ref2.containerRef;
  var xy = AXIS_MAP[vertical ? 'vertical' : 'horizontal'];

  var _useState3 = useState('0'),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      move = _useState6[0],
      setMove = _useState6[1];

  useEffect(function () {
    var index = vertical ? 1 : 0;
    mitt.on('RESIZE', function (e) {
      return setSize(e[index]);
    });
    mitt.on('SCROLL', function (e) {
      return setMove(e[index]);
    });
  }, [mitt, vertical]); //   this is thumb
  //   \                    \  this is thumbMouseOffset
  //   \                    \
  //   \   <- mouse click here
  //   \
  //

  var thumbMouseOffsetRef = useRef(0);

  var onChange = function onChange(_ref3) {
    var mouse = _ref3.mouse;
    if (!barRef.current) return;
    if (!containerRef.current) return;
    var offset = mouse[xy.axis.toLowerCase()] - barRef.current.getBoundingClientRect()[xy.clientRectStart];
    var scrolledPercentage = (offset - thumbMouseOffsetRef.current) * 100 / barRef.current[xy.offsetSize];
    containerRef.current[xy.scrollValue] = scrolledPercentage / 100 * containerRef.current[xy.scrollSize];
  };

  var _useSlider = useSlider({
    onChange: onChange
  }),
      active = _useSlider.active,
      handleStart = _useSlider.handleStart;

  var thumbRef = useRef(null);
  var barRef = useRef(null);
  var handleThumbMouseDown = useEventCallback(function (e) {
    if (e.target !== thumbRef.current) return;
    if (!thumbRef.current) return;
    thumbMouseOffsetRef.current = e[xy.mouseEventClientValue] - thumbRef.current.getBoundingClientRect()[xy.clientRectStart];
    handleStart(e);
  });
  var handleBarMouseDown = useEventCallback(function (e) {
    // thumb self
    if (e.target !== barRef.current) return;
    if (!barRef.current) return;
    if (!thumbRef.current) return;
    if (!containerRef.current) return;
    var thumbHalf = thumbRef.current[xy.offsetSize] / 2;
    var offset = e[xy.mouseEventClientValue] - barRef.current.getBoundingClientRect()[xy.clientRectStart] - thumbHalf;
    var thumbPositionPercentage = offset * 100 / containerRef.current[xy.offsetSize];
    containerRef.current[xy.scrollValue] = thumbPositionPercentage * containerRef.current[xy.scrollSize] / 100;
    if (!thumbRef.current) return;
    thumbMouseOffsetRef.current = thumbHalf;
    handleStart(e);
  });
  var style = renderThumbStyle({
    size: size,
    move: move,
    xy: xy
  });
  return /*#__PURE__*/React.createElement("div", {
    onMouseDown: handleBarMouseDown,
    className: clsx('st-scrollbar', vertical ? 'st-scrollbar--vertical' : 'st-scrollbar--horizontal', active && 'st-scrollbar--active'),
    ref: barRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-scrollbar__thumb",
    style: style,
    onMouseDown: handleThumbMouseDown,
    ref: thumbRef
  }));
};

function renderThumbStyle(_ref4) {
  var _context, _ref5;

  var move = _ref4.move,
      size = _ref4.size,
      xy = _ref4.xy;

  var translate = _concatInstanceProperty(_context = "translate".concat(xy.axis, "(")).call(_context, move, "%)");

  return _ref5 = {}, _defineProperty(_ref5, xy.size, size), _defineProperty(_ref5, "transform", translate), _ref5;
}

export { ScrollView as S };
