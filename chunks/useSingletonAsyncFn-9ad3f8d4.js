import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _typeof from '@babel/runtime-corejs3/helpers/typeof';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import { u as useEventCallback } from './keys-73f87561.js';

var createRegistry = function createRegistry() {
  var RegistryContext = /*#__PURE__*/React.createContext(function () {
    return function () {};
  });

  var RegistryProvider = function RegistryProvider(_ref) {
    var items = _ref.itemsRef,
        children = _ref.children;
    var register = useCallback(function (i) {
      var _context;

      items.current = _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(items.current), [i]);
      return function () {
        var _context2;

        var index = _findIndexInstanceProperty(_context2 = items.current).call(_context2, function (k) {
          return k === i;
        });

        if (index !== -1) {
          var _context3, _context4, _context5;

          items.current = _concatInstanceProperty(_context3 = []).call(_context3, _toConsumableArray(_sliceInstanceProperty(_context4 = items.current).call(_context4, 0, index)), _toConsumableArray(_sliceInstanceProperty(_context5 = items.current).call(_context5, index + 1)));
        } else {
          throw new Error('[strawberry-farm] ');
        }
      };
    }, [items]);
    return /*#__PURE__*/React.createElement(RegistryContext.Provider, {
      value: register
    }, children);
  };

  var useRegistry = function useRegistry(i) {
    var register = useContext(RegistryContext);
    useEffect(function () {
      if (i !== undefined) {
        return register(i);
      }
    }, [i, register]);
  };

  return [RegistryProvider, useRegistry];
};
var createStateModeRegistry = function createStateModeRegistry() {
  var RegistryContext = /*#__PURE__*/React.createContext(function () {
    return function () {};
  });
  var RegistrySelectorContext = /*#__PURE__*/React.createContext([]);

  var RegistryProvider = function RegistryProvider(_ref2) {
    var _ref2$model = _slicedToArray(_ref2.model, 2),
        items = _ref2$model[0],
        setItems = _ref2$model[1],
        children = _ref2.children;

    var register = useCallback(function (i) {
      setItems(function (items) {
        var _context6;

        return _concatInstanceProperty(_context6 = []).call(_context6, _toConsumableArray(items), [i]);
      });
      return function () {
        setItems(function (items) {
          var index = _findIndexInstanceProperty(items).call(items, function (k) {
            return k === i;
          });

          if (index !== -1) {
            var _context7;

            return _concatInstanceProperty(_context7 = []).call(_context7, _toConsumableArray(_sliceInstanceProperty(items).call(items, 0, index)), _toConsumableArray(_sliceInstanceProperty(items).call(items, index + 1)));
          }

          return items;
        });
      };
    }, [setItems]);
    var registerSelectorContextValue = items;
    return /*#__PURE__*/React.createElement(RegistryContext.Provider, {
      value: register
    }, /*#__PURE__*/React.createElement(RegistrySelectorContext.Provider, {
      value: registerSelectorContextValue
    }, children));
  };

  var useRegistry = function useRegistry(i) {
    var register = useContext(RegistryContext);
    useEffect(function () {
      if (i !== undefined) {
        return register(i);
      }
    }, [i, register]);
  };

  var useRegistrySelector = function useRegistrySelector() {
    return useContext(RegistrySelectorContext);
  };

  return [RegistryProvider, useRegistry, useRegistrySelector];
};

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context7, _context8; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(source), !0)).call(_context7, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context8 = ownKeys(Object(source))).call(_context8, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable @typescript-eslint/no-explicit-any */
function set(obj, nameOrPath, value) {
  var pathes = toPathArray(nameOrPath);
  if (!pathes.length) return value;

  var ans = _objectSpread({}, obj); // answer


  var curr = ans; // an cursor to walk deep into the obj

  var i = 0;

  for (; i < pathes.length - 1; i++) {
    var path = pathes[i];
    var next = curr[path];

    if (_Array$isArray(next)) {
      curr = curr[path] = _toConsumableArray(next);
    } else if (_typeof(next) === 'object') {
      curr = curr[path] = _objectSpread({}, next);
    } else {
      var _context, _context2, _context3;

      throw new Error(_concatInstanceProperty(_context = _concatInstanceProperty(_context2 = _concatInstanceProperty(_context3 = "[strawberry-farm] cannot set prop on ".concat(obj, " by [")).call(_context3, pathes.join(' '), "], typeof obj is ")).call(_context2, _typeof(obj), " ")).call(_context, _typeof(obj) === 'object' && obj ? "with keys ".concat(_Object$keys(obj).join(','), ".") : '.'));
    }
  }

  curr[pathes[i]] = value;
  return ans;
}
function unset(obj, nameOrPath) {
  var pathes = toPathArray(nameOrPath);
  if (!pathes.length) return obj;

  var ans = _objectSpread({}, obj); // answer


  var curr = ans; // an cursor to walk deep into the obj

  var i = 0;

  for (; i < pathes.length - 1; i++) {
    var path = pathes[i];
    var next = curr[path];

    if (_Array$isArray(next)) {
      curr = curr[path] = _toConsumableArray(next);
    } else if (_typeof(next) === 'object') {
      curr = curr[path] = _objectSpread({}, next);
    } else {
      var _context4, _context5, _context6;

      throw new Error(_concatInstanceProperty(_context4 = _concatInstanceProperty(_context5 = _concatInstanceProperty(_context6 = "[strawberry-farm] cannot unset prop on ".concat(obj, " by [")).call(_context6, pathes.join(' '), "], typeof obj is ")).call(_context5, _typeof(obj), " ")).call(_context4, _typeof(obj) === 'object' && obj ? "with keys ".concat(_Object$keys(obj).join(','), ".") : '.'));
    }
  }

  delete curr[pathes[i]];
  return ans;
}

var toPathArray = function toPathArray(nameOrPath) {
  return _Array$isArray(nameOrPath) ? nameOrPath : nameOrPath.split('.');
};

function get(obj, nameOrPath) {
  var pathes = _toConsumableArray(toPathArray(nameOrPath));

  var t = obj;

  while (pathes.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    var p = pathes.shift();

    if (p in t) {
      t = t[p];
    } else {
      return undefined;
    }
  }

  return t;
}
function has(obj, nameOrPath) {
  var pathes = _toConsumableArray(toPathArray(nameOrPath));

  var t = obj;

  while (pathes.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    var p = pathes.shift();

    if (p in t) {
      t = t[p];
    } else {
      return false;
    }
  }

  return true;
}

var useSingletonAsyncFn = function useSingletonAsyncFn(fn) {
  var lock = useRef(null);
  var key = useRef(0);
  var nextTask = useRef(null);
  var cancel = useCallback(function () {
    ++key.current;
    nextTask.current = null;
    lock.current = null;
  }, []);
  var excute = useEventCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _len,
        args,
        _key2,
        _key,
        stillAlive,
        ans,
        _nextTask$current,
        _args,
        listener,
        _args2 = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args2.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
              args[_key2] = _args2[_key2];
            }

            if (!lock.current) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", new _Promise(function (resolve, reject) {
              nextTask.current = {
                args: args,
                listener: function listener(p) {
                  return p.then(resolve)["catch"](reject);
                }
              };
            }));

          case 3:
            _key = ++key.current;

            stillAlive = function stillAlive() {
              return _key === key.current;
            };

            _context.prev = 5;
            _context.next = 8;
            return lock.current = fn.apply(void 0, args);

          case 8:
            ans = _context.sent;

            if (!stillAlive()) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", ans);

          case 11:
            return _context.abrupt("return", new _Promise(function () {}));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](5);

            if (!stillAlive()) {
              _context.next = 18;
              break;
            }

            throw _context.t0;

          case 18:
            return _context.abrupt("return", new _Promise(function () {}));

          case 19:
            _context.prev = 19;

            if (stillAlive()) {
              lock.current = null;

              if (nextTask.current) {
                _nextTask$current = nextTask.current, _args = _nextTask$current.args, listener = _nextTask$current.listener;
                nextTask.current = null;
                listener(excute.apply(void 0, _toConsumableArray(_args)));
              }
            }

            return _context.finish(19);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 14, 19, 22]]);
  })));
  return [excute, cancel];
};

export { createStateModeRegistry as a, useSingletonAsyncFn as b, createRegistry as c, get as g, has as h, set as s, unset as u };
