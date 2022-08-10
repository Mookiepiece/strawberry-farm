import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import React, { useCallback, useRef, useLayoutEffect } from 'react';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import { c as clsx } from './clsx.m-1795d575.js';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/splice';
import '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import { u as useEventCallback } from './keys-73f87561.js';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/helpers/asyncToGenerator';
import '@babel/runtime-corejs3/regenerator';
import '@babel/runtime-corejs3/core-js-stable/promise';
import { N as NotificationPortal } from './Portal-2ddabcda.js';
import { c as createPortalChannel } from './createPortalChannel-d343cd12.js';
import 'zustand';
import '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context5, _context6; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context5 = ownKeys(Object(source), !0)).call(_context5, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context6 = ownKeys(Object(source))).call(_context6, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var NotificationItem = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var value = _ref.value,
      remove = _ref.remove;
  var ourRef = useRef(null);
  var mouseLeaveToRemoveRef = useRef();
  var stopTimer = useEventCallback(function () {
    mouseLeaveToRemoveRef.current !== undefined && clearTimeout(mouseLeaveToRemoveRef.current);
  });
  var startTimer = useEventCallback(function () {
    mouseLeaveToRemoveRef.current = _setTimeout(function () {
      remove(value.id);
    }, 3000);
  });
  useLayoutEffect(function () {
    startTimer();
  }, [startTimer]);
  console.log(value.payload.offset);
  return /*#__PURE__*/React.createElement("div", {
    className: "sf-notification-item",
    onMouseEnter: stopTimer,
    onMouseLeave: startTimer,
    style: {
      '--y': value.payload.offset + 'px'
    },
    ref: useEventCallback(function (el) {
      ref ? typeof ref === 'function' ? ref(el) : ref.current = el : void 0;
      ourRef.current = el;
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx('sf-notification-item__content', value.payload.leaving ? 'sf-notification-item__content-out' : 'sf-notification-item__content-in')
  }, value.payload.content));
});
var NotificationInner = createPortalChannel({
  displayName: 'NotificationPortalChannel',
  ConsumerComponent: function NotificationConsumerComponent(_ref2) {
    var _notis$, _notis$2;

    var _ref2$model = _slicedToArray(_ref2.model, 2),
        notis = _ref2$model[0],
        setNotis = _ref2$model[1];

    var remove = useCallback(function (id) {
      setNotis(function (notis) {
        var index = _findIndexInstanceProperty(notis).call(notis, function (v) {
          return v.id === id;
        });

        if (index !== -1) {
          var _context;

          return _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(_sliceInstanceProperty(notis).call(notis, 0, index)), [_objectSpread(_objectSpread({}, notis[index]), {}, {
            payload: _objectSpread(_objectSpread({}, notis[index].payload), {}, {
              leaving: true
            })
          })], _toConsumableArray(_sliceInstanceProperty(notis).call(notis, index + 1)));
        }

        return notis;
      });

      _setTimeout(function () {
        setNotis(function (notis) {
          var index = _findIndexInstanceProperty(notis).call(notis, function (v) {
            return v.id === id;
          });

          if (index !== -1) {
            var _context2;

            return _concatInstanceProperty(_context2 = []).call(_context2, _toConsumableArray(_sliceInstanceProperty(notis).call(notis, 0, index)), _toConsumableArray(_sliceInstanceProperty(notis).call(notis, index + 1)));
          }

          return notis;
        });
      }, 300);
    }, [setNotis]);

    var offsets = _mapInstanceProperty(notis).call(notis, function (noti, index) {
      var _context3;

      return _reduceInstanceProperty(_context3 = _sliceInstanceProperty(notis).call(notis, index + 1)).call(_context3, function (a, b) {
        return a + (b.payload.leaving ? 0 : b.payload.offset);
      }, 0);
    });

    console.log(offsets[0], (_notis$ = notis[0]) === null || _notis$ === void 0 ? void 0 : _notis$.payload.offset, (_notis$2 = notis[0]) === null || _notis$2 === void 0 ? void 0 : _notis$2.payload.leaving);
    return /*#__PURE__*/React.createElement(NotificationPortal, null, /*#__PURE__*/React.createElement("div", null, _mapInstanceProperty(notis).call(notis, function (value, index) {
      return /*#__PURE__*/React.createElement(NotificationItem, {
        ref: function ref(el) {
          return el && (setNotis(function (notis) {
            var _context4;

            return _concatInstanceProperty(_context4 = []).call(_context4, _toConsumableArray(_sliceInstanceProperty(notis).call(notis, 0, index)), [_objectSpread(_objectSpread({}, notis[index]), {}, {
              payload: _objectSpread(_objectSpread({}, notis[index].payload), {}, {
                el: el,
                offset: el.clientHeight
              })
            })], _toConsumableArray(_sliceInstanceProperty(notis).call(notis, index + 1)));
          }), console.log(el, el.clientHeight));
        },
        key: value.id,
        value: _objectSpread(_objectSpread({}, value), {}, {
          payload: _objectSpread(_objectSpread({}, value.payload), {}, {
            offset: offsets[index]
          })
        }),
        remove: remove
      });
    })));
  }
});
var Notification = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  push: function push(content) {
    NotificationInner.push({
      content: content,
      leaving: false,
      offset: 0,
      el: null
    });
  }
};

export { Notification as N };
