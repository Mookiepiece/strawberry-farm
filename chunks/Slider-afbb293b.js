import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import React, { useRef, useMemo } from 'react';
import { c as clsx } from './clsx.m-1795d575.js';
import '@babel/runtime-corejs3/helpers/slicedToArray';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/splice';
import '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import { u as useEventCallback } from './keys-73f87561.js';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/instance/filter';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import '@babel/runtime-corejs3/core-js-stable/object/define-property';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/helpers/defineProperty';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
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
import { u as useSlider } from './useSlider-e11cf4ab.js';

var noop = function noop() {};

var EMPTY = [];

var Slider = function Slider(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 100 : _ref$max,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? EMPTY : _ref$label;
  var percentage = (value - min) / (max - min) * 100;
  var clamp = useEventCallback(function (v) {
    var _min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : min;

    var _max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : max;

    return Math.max(_min, Math.min(v, _max));
  });
  var railRef = useRef(null);
  var labelWithPosition = useMemo(function () {
    return _mapInstanceProperty(label).call(label, function (_ref2) {
      var value = _ref2.value,
          label = _ref2.label;
      return {
        value: value,
        label: label,
        percentage: Math.round((value - min) / (max - min) * 100)
      };
    });
  }, [label, max, min]);
  var handleSliderChange = useEventCallback(function (_ref3) {
    var _ref3$mouse = _ref3.mouse,
        x = _ref3$mouse.x;
        _ref3$mouse.y;
    if (!railRef.current) return;

    var _railRef$current$getB = railRef.current.getBoundingClientRect(),
        width = _railRef$current$getB.width,
        left = _railRef$current$getB.left;

    var percentage = (x - left) / width;

    if (typeof step === 'number') {
      var v = clamp(step * Math.round(percentage * (max - min) / step) + min);
      onChange(v);
    } else {
      onChange(labelWithPosition[findNearesetIndex(_mapInstanceProperty(labelWithPosition).call(labelWithPosition, function (_ref4) {
        var percentage = _ref4.percentage;
        return percentage;
      }), percentage * 100)].value);
    }
  });

  var _useSlider = useSlider({
    onChange: handleSliderChange
  }),
      active = _useSlider.active,
      handleStart = _useSlider.handleStart;

  var prev = function prev() {
    if (step === null) {
      var currentIndex = findNearesetIndex(_mapInstanceProperty(labelWithPosition).call(labelWithPosition, function (_ref5) {
        var percentage = _ref5.percentage;
        return percentage;
      }), percentage);
      onChange(labelWithPosition[clamp(currentIndex - 1, 0, labelWithPosition.length - 1)].value);
    } else {
      onChange(clamp(value - step));
    }
  };

  var next = function next() {
    if (step === null) {
      var currentIndex = findNearesetIndex(_mapInstanceProperty(labelWithPosition).call(labelWithPosition, function (_ref6) {
        var percentage = _ref6.percentage;
        return percentage;
      }), percentage);
      onChange(labelWithPosition[clamp(currentIndex + 1, 0, labelWithPosition.length - 1)].value);
    } else {
      onChange(clamp(value + step));
    }
  };

  var handleKeydown = function handleKeydown(e) {
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

  return /*#__PURE__*/React.createElement("div", {
    className: clsx('st-slider', active && 'st-slider--active')
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-slider__labels"
  }, _mapInstanceProperty(labelWithPosition).call(labelWithPosition, function (_ref7) {
    var label = _ref7.label,
        value = _ref7.value,
        percentage = _ref7.percentage;
    return /*#__PURE__*/React.createElement("div", {
      className: "st-slider__label-item",
      key: value,
      onClick: function onClick() {
        return onChange(value);
      },
      style: {
        left: percentage + '%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-slider__label-item__inner"
    }, label || value));
  })), /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "st-slider__input-el",
    onKeyDown: handleKeydown
  }), /*#__PURE__*/React.createElement("div", {
    className: "st-slider__rail",
    ref: railRef,
    onMouseDown: handleStart
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-slider__fill",
    style: {
      width: percentage + '%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "st-slider__thumb",
    style: {
      left: percentage + '%'
    },
    onTouchStart: function onTouchStart(e) {
      e.stopPropagation();
      handleStart(e);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-slider__tooltip"
  }, value))));
};

var findNearesetIndex = function findNearesetIndex(valueArray, percentage) {
  if (percentage <= valueArray[0]) return 0;
  if (percentage >= valueArray[valueArray.length - 1]) return valueArray.length - 1;
  return _reduceInstanceProperty(valueArray).call(valueArray, function (ans, value, index) {
    if (typeof ans === 'number') return ans;

    if (valueArray.length - 1 !== index) {
      var nextValue = valueArray[index + 1];

      if (value <= percentage && percentage < nextValue) {
        return percentage - value > nextValue - percentage ? index + 1 : index;
      }
    }
  }, undefined);
};

export { Slider as S };
