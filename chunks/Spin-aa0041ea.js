import { Transition } from '@headlessui/react';
import { c as clsx } from './clsx.m-1795d575.js';
import React, { useState, useRef, useEffect } from 'react';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';

var useLazyLoading = function useLazyLoading(loading, lazy) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      innerLoading = _useState2[0],
      setInnerLoading = _useState2[1];

  var timeout = useRef();
  useEffect(function () {
    if (!lazy) {
      setInnerLoading(loading);
    } else {
      if (loading) {
        timeout.current = _setTimeout(function () {
          setInnerLoading(true);
        }, lazy);
      } else {
        if (timeout.current !== undefined) {
          clearTimeout(timeout.current);
        }

        setInnerLoading(false);
      }
    }
  }, [loading, lazy]);
  return innerLoading;
};

var Spin = function Spin(_ref) {
  var _loading = _ref.loading,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? 2 : _ref$weight,
      lazy = _ref.lazy;
  var loading = useLazyLoading(_loading, lazy);
  return /*#__PURE__*/React.createElement(Transition, {
    show: loading === true || loading === undefined,
    className: "st-spin",
    enterFrom: "st-spin-out",
    enter: "st-spin-active",
    enterTo: "st-spin-in",
    leaveFrom: "st-spin-in",
    leave: "st-spin-active",
    leaveTo: "st-spin-out",
    style: {
      '--st-spin-border': weight + 'px'
    }
  });
};

var SpinContainer = function SpinContainer(_ref2) {
  var children = _ref2.children,
      _loading = _ref2.loading,
      weight = _ref2.weight,
      lazy = _ref2.lazy;
  var loading = useLazyLoading(_loading, lazy);
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('st-spin-container', loading && 'st-spin-container--loading')
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-spin-container__inner"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "st-spin-container__overlay"
  }, /*#__PURE__*/React.createElement(Spin, {
    loading: loading,
    weight: weight
  })));
};

Spin.Container = SpinContainer;

export { Spin as S };
