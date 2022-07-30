import _bindInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/bind';
import React, { useRef, useEffect } from 'react';

var _context;
var activeElements = [];

var pushActiveElements = _bindInstanceProperty(_context = activeElements.push).call(_context, activeElements);

var popActiveElements = function popActiveElements() {
  var el;

  while (el = activeElements.pop()) {
    if (document.body.contains(el)) {
      return el;
    }
  }
};

var useFocusLock = function useFocusLock(_ref) {
  var disabled = _ref.disabled,
      ref = _ref.ref;
  useEffect(function () {
    if (!disabled) {
      var _ref$current;

      var lastActiveElement = document.activeElement;

      if (lastActiveElement instanceof HTMLElement) {
        pushActiveElements(lastActiveElement);
      }

      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
    } else {
      var _popActiveElements;

      (_popActiveElements = popActiveElements()) === null || _popActiveElements === void 0 ? void 0 : _popActiveElements.focus();
    }
  }, [disabled, ref]);
  return;
};

var FocusLock = function FocusLock(_ref2) {
  var disabled = _ref2.disabled,
      onKeyDown = _ref2.onKeyDown,
      children = _ref2.children;
  var sentinelStartRef = useRef(null);
  var sentinelStartInnerRef = useRef(null);
  var sentinelEndRef = useRef(null);
  var sentinelEndInnerRef = useRef(null);
  useFocusLock({
    disabled: disabled,
    ref: sentinelStartInnerRef
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: sentinelStartRef,
    "aria-hidden": "true",
    className: "st-focus-sentinel",
    onFocus: function onFocus(e) {
      var _sentinelEndInnerRef$;

      (_sentinelEndInnerRef$ = sentinelEndInnerRef.current) === null || _sentinelEndInnerRef$ === void 0 ? void 0 : _sentinelEndInnerRef$.focus();
    },
    tabIndex: 0
  }), /*#__PURE__*/React.createElement("div", {
    ref: sentinelStartInnerRef,
    "aria-hidden": "true",
    className: "st-focus-sentinel",
    tabIndex: 0,
    onKeyDown: onKeyDown
  }), children, /*#__PURE__*/React.createElement("div", {
    ref: sentinelEndInnerRef,
    "aria-hidden": "true",
    className: "st-focus-sentinel",
    tabIndex: 0,
    onKeyDown: onKeyDown
  }), /*#__PURE__*/React.createElement("div", {
    ref: sentinelEndRef,
    "aria-hidden": "true",
    className: "st-focus-sentinel",
    onFocus: function onFocus(e) {
      var _sentinelStartInnerRe;

      (_sentinelStartInnerRe = sentinelStartInnerRef.current) === null || _sentinelStartInnerRe === void 0 ? void 0 : _sentinelStartInnerRe.focus();
    },
    tabIndex: 0
  }));
};

export { FocusLock as F };
