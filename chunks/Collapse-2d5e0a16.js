import _extends from '@babel/runtime-corejs3/helpers/extends';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import React, { useRef } from 'react';
import { c as clsx } from './clsx.m-1795d575.js';
import '@babel/runtime-corejs3/helpers/slicedToArray';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/instance/map';
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
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';
import { Transition } from '@headlessui/react';

var _excluded = ["children", "active", "className", "style", "unmount"];
var Collapse = /*#__PURE__*/React.forwardRef(function (_ref, theirRef) {
  var children = _ref.children,
      active = _ref.active,
      className = _ref.className;
      _ref.style;
      _ref.unmount;
      var rest = _objectWithoutProperties(_ref, _excluded);

  var c = useCacheLatestNode(children);
  var ref = useRef();
  var callbackRef = useEventCallback(function (el) {
    typeof theirRef === 'function' ? theirRef(el) : theirRef && (theirRef.current = el);
    ref.current = el;
  });

  var beforeTransition = function beforeTransition() {
    if (ref.current) {
      ref.current.style.setProperty('--h', ref.current.scrollHeight + 'px');
    }
  };

  var afterTransition = function afterTransition() {
    if (ref.current) {
      ref.current.style.removeProperty('--h');
    }
  };

  return /*#__PURE__*/React.createElement(Transition, _extends({
    show: active !== null && active !== void 0 ? active : !!children,
    enterFrom: "sf-collapse-out",
    enter: "sf-collapse-active",
    enterTo: "sf-collapse-in",
    leaveFrom: "sf-collapse-in",
    leave: "sf-collapse-active",
    leaveTo: "sf-collapse-out",
    beforeEnter: beforeTransition,
    afterEnter: afterTransition,
    beforeLeave: beforeTransition,
    afterLeave: afterTransition,
    className: clsx('sf-collapse', className),
    ref: callbackRef
  }, rest), c);
});

var useCacheLatestNode = function useCacheLatestNode(node) {
  var lastNodeRef = useRef(null);
  return node ? lastNodeRef.current = node : lastNodeRef.current;
};

export { Collapse as C };
