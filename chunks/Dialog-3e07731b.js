import _extends from '@babel/runtime-corejs3/helpers/extends';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import { Transition } from '@headlessui/react';
import React, { useRef } from 'react';
import { F as FocusLock } from './FocusLock-3332d199.js';
import '@babel/runtime-corejs3/helpers/slicedToArray';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/instance/map';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/helpers/toConsumableArray';
import '@babel/runtime-corejs3/core-js-stable/instance/concat';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import { c as createComponentInstancesPool } from './createComponentInstancesPool-c14c1a5e.js';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import '@babel/runtime-corejs3/core-js-stable/instance/filter';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import '@babel/runtime-corejs3/core-js-stable/object/define-property';
import '@babel/runtime-corejs3/helpers/defineProperty';
import '@babel/runtime-corejs3/core-js-stable/object/keys';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/splice';
import '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import { K as Keys } from './keys-73f87561.js';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/helpers/asyncToGenerator';
import '@babel/runtime-corejs3/regenerator';
import '@babel/runtime-corejs3/core-js-stable/promise';
import { P as Portal } from './Portal-2ddabcda.js';
import 'react-dom/client';
import 'zustand';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';
import { n as noop } from './constants-c79091c2.js';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import { B as Box } from './Box-07467764.js';

var DialogBody = function DialogBody(_ref) {
  var _context, _context2;

  var warning = _ref.warning,
      children = _ref.children;
  var speaker = /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: 'pre'
    },
    "aria-hidden": true
  }, [_trimInstanceProperty(_context = "\n\uFF0F \uFFE3\uFFE3 \uFF3C\n|\u3000\u30FC\u3000\u30FC \\\n|\u3000 \u25C9\u3000\u25C9 |\n\\\u3000\u3000 \u25B1\u3000/\n \uFF3C\u3000\u3000 \u30A4\n\uFF0F\u3000\u3000\u3000\\\n/\u3000|\u3000\u3000\u3000 \\\n|\u3000|\u3000\u3000\u3000 | |\n").call(_context), _trimInstanceProperty(_context2 = "\n\uFF0F \uFFE3\uFFE3 \uFF3C\n|\u3000\u4E40\u3000\u221A  \\\n|\u3000 \u25C9\u3000\u25C9 |\n\\\u3000 / \u76BF\\ /\n \uFF3C\u3000\u3000 \u30A4\n\uFF0F\u3000\u3000\u3000\\\n/\u3000|\u3000\u3000\u3000 \\\n|\u3000|\u3000\u3000\u3000 | |\n").call(_context2)][warning ? 1 : 0]);
  return /*#__PURE__*/React.createElement(Box, {
    horizontal: true,
    gap: 20,
    className: "sf-dialog-body",
    align: "start"
  }, speaker, /*#__PURE__*/React.createElement("div", null, children));
};

var _excluded = ["children", "visible", "onClose"];

var _createComponentInsta = createComponentInstancesPool(),
    CollectorMitt = _createComponentInsta.CollectorMitt,
    useCollectComponentInstance = _createComponentInsta.useCollectComponentInstance;

var Dialog = function Dialog(_ref) {
  var children = _ref.children,
      visible = _ref.visible,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? noop : _ref$onClose,
      rest = _objectWithoutProperties(_ref, _excluded);

  var backgroundElRef = useRef(null);
  useCollectComponentInstance({
    active: visible,
    listener: function listener() {
      onClose();
    }
  });

  var handleFocusLockKeyDown = function handleFocusLockKeyDown(e) {
    if (e.key === Keys.ESC) {
      onClose();
    }
  };

  return /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(Transition, {
    show: visible,
    className: "sf-dialog-background",
    enterFrom: "sf-dialog-background-out",
    enter: "sf-dialog-background-active",
    enterTo: "sf-dialog-background-in",
    leaveFrom: "sf-dialog-background-in",
    leave: "sf-dialog-background-active",
    leaveTo: "sf-dialog-background-out",
    onClick: function onClick(e) {
      return e.target === backgroundElRef.current && onClose();
    },
    as: "div",
    ref: backgroundElRef
  }, /*#__PURE__*/React.createElement(Transition, _extends({
    appear: true,
    show: visible,
    className: "sf-dialog",
    enterFrom: "sf-dialog-out",
    enter: "sf-dialog-active",
    enterTo: "sf-dialog-in",
    leaveFrom: "sf-dialog-in",
    leave: "sf-dialog-active",
    leaveTo: "sf-dialog-out"
  }, rest, {
    as: "div"
  }), /*#__PURE__*/React.createElement(FocusLock, {
    disabled: !visible,
    onKeyDown: handleFocusLockKeyDown
  }, children))));
};

Dialog.Mitt = CollectorMitt;
Dialog.Body = DialogBody;

export { Dialog as D };
