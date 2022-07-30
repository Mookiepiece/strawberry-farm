import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import React, { useState } from 'react';
import { useMount } from 'react-use';
import ReactDOM from 'react-dom/client';

var createPortalChannel = function createPortalChannel(_ref) {
  var ConsumerComponent = _ref.ConsumerComponent,
      displayName = _ref.displayName;
  var id = 0;
  var BoxMounted = false;
  var cache = [];

  var _push = function _push(v) {
    cache.push(v);
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
          var model = useState([]);

          var _model = _slicedToArray(model, 2),
              setItems = _model[1];

          useMount(function () {
            setItems(cache);

            _push = function _push(v) {
              return setItems(function (a) {
                var _context;

                return _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(a), [v]);
              });
            };
          });
          return /*#__PURE__*/React.createElement(ConsumerComponent, {
            model: model
          });
        };

        if (displayName) PortalChannelComponent.displayName = displayName;
        var starfallBlankChannelRoot = document.createElement('div');
        starfallBlankChannelRoot.style.display = 'none';
        starfallBlankChannelRoot.classList.add(displayName !== null && displayName !== void 0 ? displayName : 'st-channel');
        document.body.appendChild(starfallBlankChannelRoot);
        ReactDOM.createRoot(starfallBlankChannelRoot).render( /*#__PURE__*/React.createElement(PortalChannelComponent, null));
      }
    }
  };
  return Channel;
};

export { createPortalChannel as c };
