import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import { useState } from 'react';
import { useUnmount } from 'react-use';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/instance/map';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/instance/filter';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import '@babel/runtime-corejs3/core-js-stable/object/define-property';
import '@babel/runtime-corejs3/helpers/defineProperty';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/splice';
import '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import { u as useEventCallback } from './keys-73f87561.js';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/helpers/asyncToGenerator';
import '@babel/runtime-corejs3/regenerator';
import '@babel/runtime-corejs3/core-js-stable/promise';
import 'react-dom';
import 'react-dom/client';
import 'zustand';
import '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';

// https://github.com/element-plus/element-plus/blob/a57727bfa41943bc4bf81a2bc31d6895362b5077/packages/scrollbar/src/util.ts#L1
var AXIS_MAP = {
  vertical: {
    offsetSize: 'offsetHeight',
    scrollValue: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    axis: 'Y',
    mouseEventClientValue: 'clientY',
    clientRectStart: 'top'
  },
  horizontal: {
    offsetSize: 'offsetWidth',
    scrollValue: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    axis: 'X',
    mouseEventClientValue: 'clientX',
    clientRectStart: 'left'
  }
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

var useSlider = function useSlider(_ref) {
  var onChange = _ref.onChange,
      _ref$trackMouseEvents = _ref.trackMouseEvents,
      trackMouseEvents = _ref$trackMouseEvents === void 0 ? true : _ref$trackMouseEvents,
      _ref$trackTouchEvents = _ref.trackTouchEvents,
      trackTouchEvents = _ref$trackTouchEvents === void 0 ? true : _ref$trackTouchEvents;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var handleDrag = useEventCallback(function (e) {
    var mouse = position(e);
    onChange === null || onChange === void 0 ? void 0 : onChange({
      mouse: mouse
    });
  });
  var handleEnd = useEventCallback(function () {
    setActive(false);
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', handleEnd);
    document.removeEventListener('touchcancel', handleEnd);
  });
  var handleStart = useEventCallback(function (e) {
    var _context;

    // middle click and right click won't trigger drag
    if (e.ctrlKey || 'button' in e && _includesInstanceProperty(_context = [1, 2]).call(_context, e.button)) {
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
    active: active,
    handleStart: handleStart,
    handleDrag: handleDrag,
    handleEnd: handleEnd
  };
};

var position = function position(e) {
  return 'touches' in e ? {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY
  } : {
    x: e.clientX,
    y: e.clientY
  };
};

export { AXIS_MAP as A, useSlider as u };
