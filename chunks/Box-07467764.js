import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _extends from '@babel/runtime-corejs3/helpers/extends';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import _reverseInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reverse';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import React from 'react';
import { c as clsx } from './clsx.m-1795d575.js';
import { b as bem } from './bem-ed3348cc.js';

var _excluded = ["grid", "stretched", "horizontal", "reverse", "justify", "align", "wrap", "gap", "grow", "shrink", "basis", "children", "className", "style"];

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var Box = function Box(_ref) {
  var _bem;

  var grid = _ref.grid,
      stretched = _ref.stretched,
      horizontal = _ref.horizontal,
      reverse = _reverseInstanceProperty(_ref),
      justify = _ref.justify,
      align = _ref.align,
      wrap = _ref.wrap,
      gap = _ref.gap,
      grow = _ref.grow,
      shrink = _ref.shrink,
      basis = _ref.basis,
      children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(className, bem('sf-box', (_bem = {
      grid: !!grid,
      horizontal: horizontal,
      stretched: stretched,
      reverse: reverse,
      wrap: wrap
    }, _defineProperty(_bem, "justify-".concat(justify), justify), _defineProperty(_bem, "align-".concat(align), align), _bem))),
    style: _objectSpread({
      gap: gap,
      flexGrow: typeof grow === 'boolean' ? grow ? 1 : 0 : grow,
      flexShrink: typeof shrink === 'boolean' ? shrink ? 1 : 0 : shrink,
      flexBasis: basis,
      gridTemplateColumns: _Array$isArray(grid) ? grid.join(' ') : typeof grid === 'string' ? grid : undefined
    }, style)
  }, rest), children);
};

export { Box as B };
