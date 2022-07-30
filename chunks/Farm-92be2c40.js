import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Object$entries from '@babel/runtime-corejs3/core-js-stable/object/entries';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _keysInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/keys';
import React, { useState, useContext, useEffect, useMemo } from 'react';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import { c as clsx } from './clsx.m-1795d575.js';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import { M as Mitt } from './mitt-640f195b.js';
import './keys-73f87561.js';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/helpers/asyncToGenerator';
import '@babel/runtime-corejs3/regenerator';
import '@babel/runtime-corejs3/core-js-stable/promise';
import 'react-dom';
import 'react-use';
import 'react-dom/client';
import 'zustand';
import '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';

var seed = 0;
var uuid = function uuid() {
  return seed++;
};
var SEED_NAME_MAP = new _Map([['🍓', {
  name: '草莓',
  value: 200
}], ['🍇', {
  name: '葡萄',
  value: 100
}], ['🌽', {
  name: '玉米',
  value: 50
}], ['🍟', {
  name: '薯条',
  value: 300
}]]);
var FarmContext = /*#__PURE__*/React.createContext({
  farmMitt: {
    on: function on() {
      return function () {};
    },
    off: function off() {},
    emit: function emit() {}
  }
});

var Field = /*#__PURE__*/React.memo(function (_ref) {
  var handleClick = _ref.handleClick;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      plant = _useState2[0],
      setPlant = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      ohhh = _useState4[0],
      setOhhh = _useState4[1];

  var _useContext = useContext(FarmContext),
      farmMitt = _useContext.farmMitt;

  var inner = plant ? ohhh ? plant.type : '🌱' : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "sf-field",
    onClick: function onClick() {
      if (plant) {
        if (ohhh) {
          farmMitt.emit('HARVEST', plant);
          setPlant(null);
          setOhhh(false);
        }
      } else {
        var selectedItem = handleClick();

        if (selectedItem) {
          farmMitt.emit('PLANT');
          setPlant(selectedItem);

          _setTimeout(function () {
            setOhhh(true);
          }, 3000);
        }
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sf-field__inner"
  }, inner));
});

var 帚 = {
  remove: function remove(arr, cb) {
    var index = _findIndexInstanceProperty(arr).call(arr, cb);

    if (index !== -1) {
      var _context;

      return _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(_sliceInstanceProperty(arr).call(arr, 0, index)), _toConsumableArray(_sliceInstanceProperty(arr).call(arr, index + 1, arr.length)));
    }

    return arr;
  }
};

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context4, _context5; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context4 = ownKeys(Object(source), !0)).call(_context4, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context5 = ownKeys(Object(source))).call(_context5, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var Farm = function Farm(_ref) {
  var _context2, _context3;

  _ref.children;
  useEffect(function () {});

  var _useState = useState(function () {
    return {
      fields: new _Map(),
      selectedBagItem: null,
      bag: [{
        id: uuid(),
        type: '🍓'
      }, {
        id: uuid(),
        type: '🍓'
      }],
      wallet: 300
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = useState(function () {
    var farmMitt = Mitt();
    farmMitt.on('SELECT_BAG_ITEM', function (bagItem) {
      return setState(function (state) {
        var _state$selectedBagIte;

        return _objectSpread(_objectSpread({}, state), {}, {
          selectedBagItem: ((_state$selectedBagIte = state.selectedBagItem) === null || _state$selectedBagIte === void 0 ? void 0 : _state$selectedBagIte.id) === bagItem.id ? null : bagItem
        });
      });
    });
    farmMitt.on('PLANT', function () {
      return setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          selectedBagItem: null,
          bag: 帚.remove(state.bag, function (i) {
            var _state$selectedBagIte2;

            return ((_state$selectedBagIte2 = state.selectedBagItem) === null || _state$selectedBagIte2 === void 0 ? void 0 : _state$selectedBagIte2.id) === i.id;
          })
        });
      });
    });
    farmMitt.on('HARVEST', function (item) {
      setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          wallet: state.wallet + SEED_NAME_MAP.get(item.type).value
        });
      });
    });
    return farmMitt;
  }),
      _useState4 = _slicedToArray(_useState3, 1),
      farmMitt = _useState4[0];

  var farmContextValue = useMemo(function () {
    return {
      farmMitt: farmMitt
    };
  }, [farmMitt]);
  return /*#__PURE__*/React.createElement(FarmContext.Provider, {
    value: farmContextValue
  }, /*#__PURE__*/React.createElement("div", {
    className: "sf-farm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sf-farm__wallet"
  }, state.wallet), /*#__PURE__*/React.createElement("span", {
    className: clsx('sf-farm__store', state.wallet < 100 && 'sf-farm__store--disabled'),
    onClick: function onClick() {
      if (state.wallet >= 100) {
        var create = function create(type) {
          setState(function (state) {
            var _context;

            return _objectSpread(_objectSpread({}, state), {}, {
              bag: _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(state.bag), [{
                id: uuid(),
                type: type
              }]),
              wallet: state.wallet - 100
            });
          });
        };

        var m = {
          '🍓': 30,
          '🍇': 30,
          '🌽': 30,
          '🍟': 10
        };
        var s = Math.random() * 100;
        console.log(s);

        var e = _toConsumableArray(_Object$entries(m));

        for (var i = 0; i < e.length; i++) {
          var _e$, _e;

          e[i][1] = e[i][1] + ((_e$ = (_e = e[i - 1]) === null || _e === void 0 ? void 0 : _e[1]) !== null && _e$ !== void 0 ? _e$ : 0);

          if (e[i][1] >= s) {
            return create(e[i][0]);
          }
        }
      }
    }
  }, "\uD83C\uDFB2"), /*#__PURE__*/React.createElement(FieldSet, null, _mapInstanceProperty(_context2 = _toConsumableArray(_keysInstanceProperty(_context3 = Array(9)).call(_context3))).call(_context2, function (i) {
    return /*#__PURE__*/React.createElement(Field, {
      key: i,
      handleClick: function handleClick() {
        if (state.selectedBagItem) {
          var v = state.selectedBagItem;
          return v;
        }
      }
    });
  }))), /*#__PURE__*/React.createElement(Bag, {
    selectedBagItem: state.selectedBagItem,
    bag: state.bag
  }));
};

var FieldSet = function FieldSet(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "sf-farm-field-set"
  }, children);
};

var Bag = /*#__PURE__*/React.memo(function (_ref3) {
  var bag = _ref3.bag,
      selectedBagItem = _ref3.selectedBagItem;
  return /*#__PURE__*/React.createElement("div", {
    className: "sf-farm-bag"
  }, _mapInstanceProperty(bag).call(bag, function (_ref4) {
    var id = _ref4.id,
        type = _ref4.type;
    return /*#__PURE__*/React.createElement(BagItem, {
      key: id,
      id: id,
      type: type,
      active: (selectedBagItem === null || selectedBagItem === void 0 ? void 0 : selectedBagItem.id) === id
    });
  }));
});
var BagItem = /*#__PURE__*/React.memo(function (_ref5) {
  var _SEED_NAME_MAP$get;

  var id = _ref5.id,
      type = _ref5.type,
      active = _ref5.active;
  var farmContext = useContext(FarmContext);
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('st-farm-plant-seed', active && 'st-farm-plant-seed--active'),
    onClick: function onClick() {
      return farmContext.farmMitt.emit('SELECT_BAG_ITEM', {
        id: id,
        type: type
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-farm-plant-seed__image"
  }, type), /*#__PURE__*/React.createElement("div", {
    className: "st-farm-plant-seed__title"
  }, (_SEED_NAME_MAP$get = SEED_NAME_MAP.get(type)) === null || _SEED_NAME_MAP$get === void 0 ? void 0 : _SEED_NAME_MAP$get.name));
});

export { Farm as F };
