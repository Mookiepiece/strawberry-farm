import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _extends from '@babel/runtime-corejs3/helpers/extends';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _Object$fromEntries from '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Object$entries from '@babel/runtime-corejs3/core-js-stable/object/entries';
import _startsWithInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/starts-with';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import React, { useState, useCallback, useMemo } from 'react';
import { P as Popper } from './Popper-c1867831.js';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
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
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';

var _excluded = ["trigger", "timeout", "children", "closeOnClickOutside", "popup"];

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * ```txt
 * Popover Signal
 * ^        ^^
 * ```
 */
var PIG;

(function (PIG) {
  PIG[PIG["CLICK"] = 1] = "CLICK";
  PIG[PIG["HOVER"] = 2] = "HOVER";
  PIG[PIG["FOCUS"] = 4] = "FOCUS";
  PIG[PIG["HOVER_POPUP"] = 8] = "HOVER_POPUP";
})(PIG || (PIG = {}));

var Popover = function Popover(_ref) {
  var trigger = _ref.trigger,
      timeout = _ref.timeout,
      children = _ref.children,
      closeOnClickOutside = _ref.closeOnClickOutside,
      popup = _ref.popup,
      rest = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      _visible = _useState2[0],
      setVisible = _useState2[1];

  var visible = !!_visible;

  var _useState3 = useState(function () {
    return new _Map();
  }),
      _useState4 = _slicedToArray(_useState3, 1),
      timers = _useState4[0];

  var clearHideTimer = useCallback(function (pig) {
    if (timers.has(pig)) {
      clearTimeout(timers.get(pig));
      timers["delete"](pig);
    }
  }, [timers]);
  var show = useEventCallback(function (pig) {
    clearHideTimer(pig);
    timers.set(pig, _setTimeout(function () {
      return setVisible(function (v) {
        return v | pig;
      });
    }, pig === PIG.HOVER || pig === PIG.HOVER_POPUP ? timeout || 300 : timeout || 0));
  });
  var hide = useEventCallback(function (pig) {
    clearHideTimer(pig);
    timers.set(pig, _setTimeout(function () {
      return setVisible(function (v) {
        return v & ~pig;
      });
    }, pig === PIG.HOVER || pig === PIG.HOVER_POPUP ? timeout || 300 : timeout || 0));
  });
  var toggle = useEventCallback(function (pig) {
    return !visible ? show(pig) : hide(pig);
  });

  var _useMemo = useMemo(function () {
    if (trigger === 'click') {
      return strategyOfClick({
        hide: hide,
        show: show,
        toggle: toggle
      });
    }

    if (trigger === 'focus') {
      return strategyOfFocus({
        hide: hide,
        show: show,
        toggle: toggle
      });
    }

    if (trigger === 'hover') {
      return {
        popupProps: _objectSpread(_objectSpread({}, strategyOfFocus({
          hide: hide,
          show: show,
          toggle: toggle
        }).popupProps), strategyOfHover({
          hide: hide,
          show: show,
          toggle: toggle
        }).popupProps),
        referenceElProps: _objectSpread(_objectSpread({}, strategyOfFocus({
          hide: hide,
          show: show,
          toggle: toggle
        }).referenceElProps), strategyOfHover({
          hide: hide,
          show: show,
          toggle: toggle
        }).referenceElProps)
      };
    }

    throw new Error();
  }, [hide, show, toggle, trigger]),
      popupProps = _useMemo.popupProps,
      referenceElProps = _useMemo.referenceElProps;

  return /*#__PURE__*/React.createElement(Popper, _extends({}, rest, {
    popup: /*#__PURE__*/React.createElement("div", popupProps, popup),
    visible: visible,
    onClose: function onClose() {
      return setVisible(0);
    },
    closeOnClickOutside: typeof closeOnClickOutside === 'boolean' ? closeOnClickOutside : trigger !== 'hover'
  }), /*#__PURE__*/React.cloneElement(children, _objectSpread({}, mergeNodeOriginalEventListeners(children, referenceElProps))));
};

var strategyOfClick = function strategyOfClick(_ref2) {
  var toggle = _ref2.toggle;
  return {
    referenceElProps: {
      onClick: function onClick() {
        return toggle(PIG.CLICK);
      }
    }
  };
}; // https://w3c.github.io/uievents/#event-type-mouseenter
// touch will trigger mouseenter events ???????


var strategyOfHover = function strategyOfHover(_ref3) {
  var hide = _ref3.hide,
      show = _ref3.show;
  return {
    popupProps: {
      onMouseEnter: function onMouseEnter() {
        return show(PIG.HOVER_POPUP);
      },
      onMouseLeave: function onMouseLeave() {
        return hide(PIG.HOVER_POPUP);
      }
    },
    referenceElProps: {
      onMouseEnter: function onMouseEnter() {
        return show(PIG.HOVER);
      },
      onMouseLeave: function onMouseLeave() {
        return hide(PIG.HOVER);
      }
    }
  };
};

var strategyOfFocus = function strategyOfFocus(_ref4) {
  var hide = _ref4.hide,
      show = _ref4.show;
  return {
    referenceElProps: {
      onFocus: function onFocus() {
        return show(PIG.FOCUS);
      },
      onBlur: function onBlur() {
        return hide(PIG.FOCUS);
      }
    }
  };
};

var mergeNodeOriginalEventListeners = function mergeNodeOriginalEventListeners(child, props) {
  var _context;

  return _Object$fromEntries(_mapInstanceProperty(_context = _Object$entries(props)).call(_context, function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    if (_startsWithInstanceProperty(k).call(k, 'on') && typeof v === 'function') {
      return [k, function () {
        var _child$props$k, _child$props, _context2;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_child$props$k = (_child$props = child.props)[k]) === null || _child$props$k === void 0 ? void 0 : _child$props$k.call.apply(_child$props$k, _concatInstanceProperty(_context2 = [_child$props]).call(_context2, args));
        v.apply(void 0, args);
      }];
    }

    return [k, v];
  }));
};

export { Popover as P };
