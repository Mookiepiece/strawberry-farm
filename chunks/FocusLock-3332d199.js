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

var FocusLock = function FocusLock(_ref) {
  var disabled = _ref.disabled,
      _onKeyDown = _ref.onKeyDown,
      children = _ref.children;
  var sentinelStartRef = useRef(null);
  var sentinelEndRef = useRef(null);
  useEffect(function () {
    var _sentinelStartRef$cur;

    if (disabled) return;
    var prevActiveElement = document.activeElement;
    (_sentinelStartRef$cur = sentinelStartRef.current) === null || _sentinelStartRef$cur === void 0 ? void 0 : _sentinelStartRef$cur.focus();

    if (prevActiveElement) {
      pushActiveElements(prevActiveElement);
      return function () {
        var _popActiveElements, _popActiveElements$fo;

        (_popActiveElements = popActiveElements()) === null || _popActiveElements === void 0 ? void 0 : (_popActiveElements$fo = _popActiveElements.focus) === null || _popActiveElements$fo === void 0 ? void 0 : _popActiveElements$fo.call(_popActiveElements);
      };
    }
  }, [disabled]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: sentinelStartRef,
    "aria-hidden": "true",
    className: "st-focus-sentinel",
    tabIndex: 0,
    onKeyDown: function onKeyDown(e) {
      if (e.shiftKey && e.key === 'Tab') {
        var _sentinelEndRef$curre;

        e.preventDefault();
        (_sentinelEndRef$curre = sentinelEndRef.current) === null || _sentinelEndRef$curre === void 0 ? void 0 : _sentinelEndRef$curre.focus();
      }

      _onKeyDown === null || _onKeyDown === void 0 ? void 0 : _onKeyDown(e);
    }
  }), children, /*#__PURE__*/React.createElement("div", {
    ref: sentinelEndRef,
    "aria-hidden": "true",
    className: "st-focus-sentinel",
    tabIndex: 0,
    onKeyDown: function onKeyDown(e) {
      if (!e.shiftKey && e.key === 'Tab') {
        var _sentinelStartRef$cur2;

        e.preventDefault();
        (_sentinelStartRef$cur2 = sentinelStartRef.current) === null || _sentinelStartRef$cur2 === void 0 ? void 0 : _sentinelStartRef$cur2.focus();
      }

      _onKeyDown === null || _onKeyDown === void 0 ? void 0 : _onKeyDown(e);
    }
  }));
};

export { FocusLock as F };
