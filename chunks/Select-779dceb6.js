import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _startsWithInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/starts-with';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import React, { useState, useEffect, useRef } from 'react';
import { c as clsx } from './clsx.m-1795d575.js';
import { I as Input } from './Input-3e81c307.js';
import { P as Popper, s as shift } from './Popper-ced6c9a6.js';
import { S as ScrollView } from './ScrollView-6433e01c.js';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import '@babel/runtime-corejs3/core-js-stable/object/define-property';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import '@babel/runtime-corejs3/helpers/defineProperty';
import '@babel/runtime-corejs3/core-js-stable/instance/includes';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import '@babel/runtime-corejs3/core-js-stable/array/from';
import '@babel/runtime-corejs3/core-js-stable/instance/for-each';

var defaultFilter = function defaultFilter(options, query) {
  return _filterInstanceProperty(options).call(options, function (_ref) {
    var _context;

    var label = _ref.label,
        value = _ref.value;
    console.log(label || (value ? value.toString() : ''));
    return _startsWithInstanceProperty(_context = label || (value ? value.toString() : '')).call(_context, query);
  });
};

var shift10 = shift({
  padding: 10
});

var Select = function Select(_ref2) {
  var _options$selectedInde, _value$toString;

  var value = _ref2.value,
      onChange = _ref2.onChange,
      options = _ref2.options,
      renderOptions = _ref2.renderOptions,
      placeholder = _ref2.placeholder,
      _ref2$filterable = _ref2.filterable,
      filterable = _ref2$filterable === void 0 ? false : _ref2$filterable,
      _ref2$filter = _filterInstanceProperty(_ref2),
      filter = _ref2$filter === void 0 ? defaultFilter : _ref2$filter;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      pendingIndex = _useState4[0],
      setPendingIndex = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      query = _useState6[0],
      setQuery = _useState6[1];

  var filteredOptions = query ? filter(options, query) : options;

  var select = function select(index) {
    onChange === null || onChange === void 0 ? void 0 : onChange(filteredOptions[index].value);
    setVisible(false);
  };

  useEffect(function () {
    if (visible) setQuery('');
  }, [visible]);
  var scrollViewRef = useRef(null);
  var optionsRefs = useRef([]);

  var scrollToIndex = function scrollToIndex(index) {
    var _scrollViewRef$curren;

    var optionEl = optionsRefs.current[index];
    if (!((_scrollViewRef$curren = scrollViewRef.current) !== null && _scrollViewRef$curren !== void 0 && _scrollViewRef$curren.container) || !optionEl) return;
    scrollViewRef.current.container.scrollTop = optionEl.offsetTop - 30;
  };

  var handleKeyDown = function handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();

        if (pendingIndex > -1 && pendingIndex < options.length) {
          select(pendingIndex);
        }

        break;

      case 'ArrowDown':
        e.preventDefault();

        if (options.length) {
          setVisible(true);
          var nextIndex = (pendingIndex + 1) % options.length;
          setPendingIndex(nextIndex);
          scrollToIndex(nextIndex);
        }

        break;

      case 'ArrowUp':
        e.preventDefault();

        if (options.length) {
          setVisible(true);

          var _nextIndex = (pendingIndex - 1 + options.length) % options.length;

          setPendingIndex(_nextIndex);
          scrollToIndex(_nextIndex);
        }

        break;

      case 'Escape':
        e.preventDefault();
        setVisible(false);
        break;
    }
  };

  var selectedIndex = _findIndexInstanceProperty(options).call(options, function (_ref3) {
    var v = _ref3.value;
    return v === value;
  });

  var currentLabel = ((_options$selectedInde = options[selectedIndex]) === null || _options$selectedInde === void 0 ? void 0 : _options$selectedInde.label) || (value === null || value === void 0 ? void 0 : (_value$toString = value.toString) === null || _value$toString === void 0 ? void 0 : _value$toString.call(value)) || '';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popper, {
    visible: visible,
    popup: /*#__PURE__*/React.createElement(ScrollView, {
      containerStyle: {
        maxHeight: 200
      },
      ref: scrollViewRef
    }, _mapInstanceProperty(filteredOptions).call(filteredOptions, function (item, index) {
      var iValue = item.value,
          label = item.label;
      var pending = pendingIndex === index;
      var selected = value === iValue;
      return /*#__PURE__*/React.createElement("div", {
        key: "".concat(iValue),
        className: clsx('st-option', pending && 'st-option--pending', selected && 'st-option--selected'),
        onMouseMove: function onMouseMove() {
          return setPendingIndex(index);
        },
        onTouchMove: function onTouchMove() {
          return setPendingIndex(index);
        },
        onClick: function onClick() {
          return select(index);
        },
        ref: function ref(el) {
          return optionsRefs.current[index] = el;
        }
      }, renderOptions ? renderOptions(item, {
        pending: pending,
        selected: selected
      }) : /*#__PURE__*/React.createElement("div", {
        className: "st-option__inner"
      }, label || iValue));
    })),
    middleware: [shift10],
    popupClassName: "sf-popper--default sf-popper--zoom-y",
    onClose: function onClose() {
      return setVisible(false);
    }
  }, /*#__PURE__*/React.createElement(Input, {
    readOnly: !filterable || !visible,
    onClick: function onClick() {
      return setVisible(true);
    },
    onKeyDown: handleKeyDown,
    value: visible ? query : currentLabel,
    onChange: setQuery,
    placeholder: visible && currentLabel ? currentLabel : placeholder
  })));
};

export { Select as S };
