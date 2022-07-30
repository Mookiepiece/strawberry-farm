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
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import React, { useRef } from 'react';
import { c as clsx } from './clsx.m-1795d575.js';
import { T as Transition } from './SwitchTransition-3c04c189.js';
import '@babel/runtime-corejs3/helpers/slicedToArray';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/instance/map';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/splice';
import '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import { u as useEventCallback } from './keys-73f87561.js';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/helpers/asyncToGenerator';
import '@babel/runtime-corejs3/regenerator';
import '@babel/runtime-corejs3/core-js-stable/promise';
import 'react-dom';
import 'react-use';
import 'react-dom/client';
import 'zustand';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';

var _excluded = ["children", "active", "className", "style", "unmountOnExit"];

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var Collapse = /*#__PURE__*/React.forwardRef(function (_ref, theirRef) {
  var children = _ref.children,
      active = _ref.active,
      className = _ref.className,
      style = _ref.style,
      unmountOnExit = _ref.unmountOnExit,
      rest = _objectWithoutProperties(_ref, _excluded);

  var c = useCacheLatestNode(children);
  var ref = useRef();

  var handleExit = function handleExit() {
    if (ref.current) {
      ref.current.style.height = "".concat(ref.current.scrollHeight, "px");
    }
  };

  var callbackRef = useEventCallback(function (el) {
    typeof theirRef === 'function' ? theirRef(el) : theirRef && (theirRef.current = el);
    ref.current = el;
  });
  return /*#__PURE__*/React.createElement(Transition, {
    "in": active !== null && active !== void 0 ? active : !!children,
    timeout: 300,
    onExit: handleExit,
    unmountOnExit: unmountOnExit !== null && unmountOnExit !== void 0 ? unmountOnExit : true
  }, function (state) {
    var _ref$current;

    return /*#__PURE__*/React.createElement("div", _extends({
      className: clsx('sf-collapse-panel', className),
      ref: callbackRef,
      style: _objectSpread(_objectSpread({}, {
        entering: {
          height: (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollHeight,
          transition: 'all 0.3s var(--bezier-wave)'
        },
        entered: {
          height: undefined
        },
        exiting: _objectSpread(_objectSpread({
          height: 0,
          marginTop: 0,
          marginBottom: 0
        }, {
          pointerEvents: 'none',
          userSelect: 'none'
        }), {}, {
          transition: 'all 0.3s var(--bezier-wave)'
        }),
        exited: {
          height: 0,
          marginTop: 0,
          marginBottom: 0
        },
        unmounted: {
          height: undefined,
          marginTop: 0,
          marginBottom: 0
        }
      }[state]), style)
    }, rest), c);
  });
});

var useCacheLatestNode = function useCacheLatestNode(node) {
  var lastNodeRef = useRef(null);
  return node ? lastNodeRef.current = node : lastNodeRef.current;
};

export { Collapse as C };
