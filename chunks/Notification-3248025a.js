import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { C as CSSTransition } from './SwitchTransition-3c04c189.js';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
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
import { N as NotificationPortal } from './Portal-2ddabcda.js';
import { c as createPortalChannel } from './createPortalChannel-5a757611.js';
import 'zustand';
import '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';
import { C as Collapse } from './Collapse-95401147.js';

var NotificationItem = function NotificationItem(_ref) {
  var value = _ref.value,
      remove = _ref.remove;

  var _useState = useState([true, false]),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var mouseLeaveToRemoveRef = useRef();
  var close = useEventCallback(function () {
    setVisible([false, false]);

    _setTimeout(function () {
      return remove(value.id);
    }, 300);
  });
  var handleMouseEnter = useEventCallback(function () {
    mouseLeaveToRemoveRef.current !== undefined && clearTimeout(mouseLeaveToRemoveRef.current);
  });
  var handleMouseLeave = useEventCallback(function () {
    mouseLeaveToRemoveRef.current = _setTimeout(function () {
      close();
    }, 3000);
  });
  useLayoutEffect(function () {
    setVisible([true, true]);
    handleMouseLeave();
  }, [handleMouseLeave]);
  return /*#__PURE__*/React.createElement(CSSTransition, {
    "in": visible[1],
    timeout: 300,
    classNames: "st-notification-item"
  }, /*#__PURE__*/React.createElement(Collapse, {
    active: visible[0],
    className: "st-notification-item"
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, value.payload)));
};

var Notification = createPortalChannel({
  displayName: 'NotificationPortalChannel',
  ConsumerComponent: function NotificationConsumerComponent(_ref2) {
    var _ref2$model = _slicedToArray(_ref2.model, 2),
        notis = _ref2$model[0],
        setNotis = _ref2$model[1];

    var remove = useEventCallback(function (id) {
      setNotis(function (notis) {
        var index = _findIndexInstanceProperty(notis).call(notis, function (v) {
          return v.id === id;
        });

        if (index !== -1) {
          var _context;

          return _concatInstanceProperty(_context = _sliceInstanceProperty(notis).call(notis, 0, index)).call(_context, _sliceInstanceProperty(notis).call(notis, index + 1));
        }

        return notis;
      });
    });
    return /*#__PURE__*/React.createElement(NotificationPortal, null, /*#__PURE__*/React.createElement("div", null, _mapInstanceProperty(notis).call(notis, function (value) {
      return /*#__PURE__*/React.createElement(NotificationItem, {
        key: value.id,
        value: value,
        remove: remove
      });
    })));
  }
});

export { Notification as N };
