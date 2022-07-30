import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';

function mitt (n) {
  return {
    all: n = n || new _Map(),
    on: function on(t, e) {
      var i = n.get(t);
      i && i.push(e) || n.set(t, [e]);
    },
    off: function off(t, e) {
      var i = n.get(t);
      i && _spliceInstanceProperty(i).call(i, _indexOfInstanceProperty(i).call(i, e) >>> 0, 1);
    },
    emit: function emit(t, e) {
      var _context, _context2, _context3, _context4;

      _mapInstanceProperty(_context = _sliceInstanceProperty(_context2 = n.get(t) || []).call(_context2)).call(_context, function (n) {
        n(e);
      }), _mapInstanceProperty(_context3 = _sliceInstanceProperty(_context4 = n.get("*") || []).call(_context4)).call(_context3, function (n) {
        n(t, e);
      });
    }
  };
}

var Mitt = function Mitt() {
  var _ref = mitt(),
      on = _ref.on,
      off = _ref.off,
      emit = _ref.emit;

  return {
    on: function (_on) {
      function on(_x, _x2) {
        return _on.apply(this, arguments);
      }

      on.toString = function () {
        return _on.toString();
      };

      return on;
    }(function (type, handler) {
      on(type, handler);
      return function () {
        return off(type, handler);
      };
    }),
    off: off,
    emit: emit
  };
};

export { Mitt as M };
