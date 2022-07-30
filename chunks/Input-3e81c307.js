import _extends from '@babel/runtime-corejs3/helpers/extends';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import React from 'react';

var _excluded = ["value", "onChange", "format"];
var Input = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var value = _ref.value,
      _onChange = _ref.onChange;
      _ref.format;
      var rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("input", _extends({
    className: "st-input",
    type: "text",
    value: value,
    onChange: function onChange(e) {
      return _onChange === null || _onChange === void 0 ? void 0 : _onChange(e.target.value);
    }
  }, rest, {
    ref: ref
  }));
});

export { Input as I };
