import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _Object$entries from '@babel/runtime-corejs3/core-js-stable/object/entries';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _keysInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/keys';
import React, { useState, useCallback, useContext, useEffect } from 'react';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import { c as clsx } from './clsx.m-1795d575.js';

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var seed = 0;

var uuid = function uuid() {
  return seed++;
};

var FarmContext = /*#__PURE__*/React.createContext(void 0); // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

var useFarm = function useFarm() {
  var _useState = useState({
    selectedBagItem: null,
    bag: [{
      id: uuid(),
      type: '🍓'
    }, {
      id: uuid(),
      type: '🍓'
    }],
    wallet: 300
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var selectItem = useCallback(function (item) {
    setState(function (state) {
      var _state$selectedBagIte;

      return _objectSpread(_objectSpread({}, state), {}, {
        selectedBagItem: ((_state$selectedBagIte = state.selectedBagItem) === null || _state$selectedBagIte === void 0 ? void 0 : _state$selectedBagIte.id) === item.id ? null : item
      });
    });
  }, []);
  var buy = useCallback(function (type) {
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
  }, []);
  var harvest = useCallback(function (item) {
    setState(function (state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        wallet: state.wallet + SEED_NAME_MAP.get(item.type).value
      });
    });
  }, []);
  var plant = useCallback(function () {
    setState(function (state) {
      var _context2;

      return _objectSpread(_objectSpread({}, state), {}, {
        selectedBagItem: null,
        bag: _filterInstanceProperty(_context2 = state.bag).call(_context2, function (i) {
          var _state$selectedBagIte2;

          return ((_state$selectedBagIte2 = state.selectedBagItem) === null || _state$selectedBagIte2 === void 0 ? void 0 : _state$selectedBagIte2.id) !== i.id;
        })
      });
    });
  }, []);
  return {
    state: state,
    selectItem: selectItem,
    buy: buy,
    harvest: harvest,
    plant: plant
  };
};

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
      harvest = _useContext.harvest,
      plantIt = _useContext.plant;

  var inner = plant ? ohhh ? plant.type : '🌱' : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "sf-field",
    onClick: function onClick() {
      if (plant) {
        if (ohhh) {
          harvest(plant);
          setPlant(null);
          setOhhh(false);
        }
      } else {
        var selectedItem = handleClick();

        if (selectedItem) {
          plantIt();
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

var Farm = function Farm(_ref) {
  var _context, _context2;

  _ref.children;
  useEffect(function () {});
  var farmModel = useFarm();
  var state = farmModel.state,
      buy = farmModel.buy;
  return /*#__PURE__*/React.createElement(FarmContext.Provider, {
    value: farmModel
  }, /*#__PURE__*/React.createElement("div", {
    className: "sf-farm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sf-farm__wallet"
  }, state.wallet), /*#__PURE__*/React.createElement("span", {
    className: clsx('sf-farm__store', state.wallet < 100 && 'sf-farm__store--disabled'),
    onClick: function onClick() {
      if (state.wallet >= 100) {
        var m = {
          '🍓': 30,
          '🍇': 30,
          '🌽': 30,
          '🍟': 10
        };
        var s = Math.random() * 100;

        var e = _toConsumableArray(_Object$entries(m));

        var i;

        while (i = e.shift()) {
          var _i = i,
              _i2 = _slicedToArray(_i, 2),
              seedName = _i2[0],
              weight = _i2[1];

          if (weight >= s) return buy(seedName);
          s -= weight;
        }
      }
    }
  }, "\uD83C\uDFB2"), /*#__PURE__*/React.createElement(FieldSet, null, _mapInstanceProperty(_context = _toConsumableArray(_keysInstanceProperty(_context2 = Array(9)).call(_context2))).call(_context, function (i) {
    return /*#__PURE__*/React.createElement(Field, {
      key: i,
      handleClick: function handleClick() {
        if (state.selectedBagItem) {
          var v = state.selectedBagItem;
          return v;
        }
      }
    });
  }))), /*#__PURE__*/React.createElement(Bag, null));
};

var FieldSet = function FieldSet(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "sf-farm-field-set"
  }, children);
};

var Bag = function Bag() {
  var _useContext = useContext(FarmContext),
      _useContext$state = _useContext.state,
      bag = _useContext$state.bag,
      selectedBagItem = _useContext$state.selectedBagItem,
      selectItem = _useContext.selectItem;

  return /*#__PURE__*/React.createElement("div", {
    className: "sf-farm-bag"
  }, _mapInstanceProperty(bag).call(bag, function (bagItem) {
    var _SEED_NAME_MAP$get;

    var id = bagItem.id,
        type = bagItem.type;
    var active = (selectedBagItem === null || selectedBagItem === void 0 ? void 0 : selectedBagItem.id) === id;
    return /*#__PURE__*/React.createElement("div", {
      className: clsx('st-farm-plant-seed', active && 'st-farm-plant-seed--active'),
      onClick: function onClick() {
        return selectItem(bagItem);
      },
      key: id
    }, /*#__PURE__*/React.createElement("div", {
      className: "st-farm-plant-seed__image"
    }, type), /*#__PURE__*/React.createElement("div", {
      className: "st-farm-plant-seed__title"
    }, (_SEED_NAME_MAP$get = SEED_NAME_MAP.get(type)) === null || _SEED_NAME_MAP$get === void 0 ? void 0 : _SEED_NAME_MAP$get.name));
  }));
};

export { Farm as F };
