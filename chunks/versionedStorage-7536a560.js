import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$entries from '@babel/runtime-corejs3/core-js-stable/object/entries';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import _typeof from '@babel/runtime-corejs3/helpers/typeof';
import _Object$is from '@babel/runtime-corejs3/core-js-stable/object/is';
import { z as zustand } from './createPortalChannel-d343cd12.js';

function shallow(objA, objB) {
  if (_Object$is(objA, objB)) {
    return true;
  }

  if (_typeof(objA) !== "object" || objA === null || _typeof(objB) !== "object" || objB === null) {
    return false;
  }

  var keysA = _Object$keys(objA);

  if (keysA.length !== _Object$keys(objB).length) {
    return false;
  }

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !_Object$is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var _excluded = ["meta"];

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var versionedStorage = function versionedStorage(_ref) {
  var root = _ref.root,
      initialValue = _ref.initialValue,
      version = _ref.version,
      _ref$upgradeFn = _ref.upgradeFn,
      upgradeFn = _ref$upgradeFn === void 0 ? {} : _ref$upgradeFn,
      storage = _ref.storage;

  var _obj;

  var versionBeforeUpgrade;

  try {
    _obj = JSON.parse(storage.getItem(root) || 'throws an error');

    if (_obj) {
      var _Object$keys$, _context, _context2;

      if (typeof _obj.meta.version !== 'number' || _obj.meta.version > version) throw new Error();
      versionBeforeUpgrade = _obj.meta.version; // stale version

      if (Number((_Object$keys$ = _Object$keys(upgradeFn)[0]) !== null && _Object$keys$ !== void 0 ? _Object$keys$ : version) > _obj.meta.version) throw new Error();

      _forEachInstanceProperty(_context = _filterInstanceProperty(_context2 = _Object$entries(upgradeFn)).call(_context2, function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            ver = _ref3[0];

        return Number(ver) < version || Number(ver) > _obj.meta.version;
      })).call(_context, function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            fn = _ref5[1];

        _obj = fn(_obj);
      });
    }
  } catch (e) {
    _obj = _objectSpread({
      meta: {
        version: version
      }
    }, initialValue);
  }

  if (_JSON$stringify(_obj) !== storage.getItem(root)) {
    storage.setItem(root, _JSON$stringify(_obj));
  }

  var _ref6 = _obj;
      _ref6.meta;
      var _objRaw = _objectWithoutProperties(_ref6, _excluded);

  var objRaw = _objRaw;
  var useStore = zustand(function () {
    return objRaw;
  });
  useStore.subscribe(function (t) {
    storage.setItem(root, _JSON$stringify(_objectSpread({
      meta: {
        version: version
      }
    }, t)));
  });
  return {
    meta: {
      version: version,
      versionBeforeUpgrade: versionBeforeUpgrade
    },
    useStore: useStore,
    get: useStore.getState,
    set: useStore.setState,
    subscribe: useStore.subscribe
  };
};
var useStorage = function useStorage(storageModel, selector, equals) {
  var value = storageModel.useStore(selector, selector ? equals !== null && equals !== void 0 ? equals : shallow : undefined);
  return [value, storageModel.set];
};

export { useStorage as u, versionedStorage as v };
