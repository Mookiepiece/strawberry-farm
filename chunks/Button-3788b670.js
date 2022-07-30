import _extends from '@babel/runtime-corejs3/helpers/extends';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import React from 'react';
import { c as clsx } from './clsx.m-1795d575.js';
import { S as Spin } from './Spin-c87dbd38.js';
import { b as bem } from './bem-ed3348cc.js';

var _excluded = ["type", "primary", "textual", "block", "solid", "loading", "disabled", "haircut", "children", "className"];
var Button = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'button' : _ref$type,
      primary = _ref.primary,
      textual = _ref.textual,
      block = _ref.block,
      solid = _ref.solid,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      disabled = _ref.disabled,
      haircut = _ref.haircut,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: clsx(className, bem('sf-button', {
      primary: primary,
      textual: textual,
      "default": !textual && !primary,
      block: block,
      loading: loading,
      solid: solid
    })),
    disabled: disabled || loading,
    ref: ref
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "sf-button__content"
  }, children), /*#__PURE__*/React.createElement(Spin, {
    weight: 1,
    loading: loading
  }), haircut ? /*#__PURE__*/React.createElement("span", {
    className: "sf-haircut"
  }) : null);
});

export { Button as B };
