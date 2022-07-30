import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _Object$fromEntries from '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Object$entries from '@babel/runtime-corejs3/core-js-stable/object/entries';
import { c as clsx } from './clsx.m-1795d575.js';

var bem = function bem(block, modifiers) {
  var _context;

  return clsx(block, _Object$fromEntries(_mapInstanceProperty(_context = _Object$entries(modifiers)).call(_context, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return [block + '--' + k, v];
  })));
};

export { bem as b };
