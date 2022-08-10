import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _everyInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/every';
import { useEffect } from 'react';
import { u as useEventCallback } from './keys-73f87561.js';

var useClickAway = function useClickAway(_ref, callback) {
  var _context, _context2, _context3;

  var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'click';

  var refs = _filterInstanceProperty(_context = _mapInstanceProperty(_context2 = _filterInstanceProperty(_context3 = _Array$isArray(_ref) ? _toConsumableArray(_ref) : [_ref]).call(_context3, Boolean)).call(_context2, function (el) {
    return 'current' in el ? el.current : el;
  })).call(_context, Boolean);

  var handler = useEventCallback(function (event) {
    var target = event.target;

    if (target instanceof Element) {
      if (_everyInstanceProperty(refs).call(refs, function (el) {
        return !el.contains(target);
      })) callback(event);
    }
  });
  useEffect(function () {
    if (refs.length) {
      document.addEventListener(eventName, handler);
      return function () {
        return document.removeEventListener(eventName, handler);
      };
    }
  }, [eventName, handler, refs.length]);
};

export { useClickAway as u };
