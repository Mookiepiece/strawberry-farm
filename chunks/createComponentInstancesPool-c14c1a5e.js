import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import { useState, useEffect } from 'react';
import { M as Mitt } from './mitt-640f195b.js';
import { u as useEventCallback } from './keys-73f87561.js';

var createComponentInstancesPool = function createComponentInstancesPool() {
  var uuid = 1;
  var CollectorMitt = Mitt();

  var useCollectComponentInstance = function useCollectComponentInstance(_ref) {
    var active = _ref.active,
        listener = _ref.listener;

    var _useState = useState(uuid++),
        _useState2 = _slicedToArray(_useState, 1),
        id = _useState2[0];

    var _listener = useEventCallback(listener);

    useEffect(function () {
      if (!active) return;
      var off = CollectorMitt.on('SINGAL', function (i) {
        return i.id === id && _listener(i.data);
      });
      CollectorMitt.emit('REGISTER', id);
      return function () {
        off();
        CollectorMitt.emit('UNREGISTER', id);
      };
    }, [id, _listener, active]);
  };

  return {
    CollectorMitt: CollectorMitt,
    useCollectComponentInstance: useCollectComponentInstance
  };
};

export { createComponentInstancesPool as c };
