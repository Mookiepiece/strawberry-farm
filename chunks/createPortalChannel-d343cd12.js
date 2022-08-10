import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import React from 'react';
import ReactDOM from 'react-dom/client';
import zustand$1 from 'zustand';

/** Copy */

/**
 * `Strawberry Farm Zustand` VS `Vanilla Zustand`
 *
 * - setState always runs in `replace` mode
 */
var zustand = function zustand(_initializer) {
  var initializer = _initializer;

  if (typeof _initializer === 'function') {
    initializer = function initializer(_set) {
      var _context;

      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      return _initializer.apply(void 0, _concatInstanceProperty(_context = [function set(value) {
        var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _set(value, replace);
      }]).call(_context, rest));
    };
  }

  var store = zustand$1(initializer);
  var _setState = store.setState;

  store.setState = function (value) {
    var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return _setState(value, replace);
  };

  return store;
};

var createPortalChannel = function createPortalChannel(_ref) {
  var ConsumerComponent = _ref.ConsumerComponent,
      displayName = _ref.displayName;
  var id = 0;
  var BoxMounted = false;
  var useStore = zustand(function () {
    return [];
  });

  var _push = function push(item) {
    return useStore.setState(function (s) {
      var _context;

      return _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(s), [item]);
    });
  };

  var Channel = {
    push: function push(payload) {
      this.setup();

      _push({
        id: id++,
        payload: payload
      });
    },
    setup: function setup() {
      if (!BoxMounted) {
        BoxMounted = true;

        var PortalChannelComponent = function PortalChannelComponent() {
          var model = useStore();
          return /*#__PURE__*/React.createElement(ConsumerComponent, {
            model: [model, useStore.setState]
          });
        };

        if (displayName) PortalChannelComponent.displayName = displayName;
        var strawberryFarmBlankChannelRoot = document.createElement('div');
        strawberryFarmBlankChannelRoot.style.display = 'none';
        strawberryFarmBlankChannelRoot.classList.add(displayName !== null && displayName !== void 0 ? displayName : 'sf-channel');
        document.body.appendChild(strawberryFarmBlankChannelRoot);
        ReactDOM.createRoot(strawberryFarmBlankChannelRoot).render( /*#__PURE__*/React.createElement(PortalChannelComponent, null));
      }
    }
  };
  return Channel;
};

export { createPortalChannel as c, zustand as z };
