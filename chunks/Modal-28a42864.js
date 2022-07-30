import _extends from '@babel/runtime-corejs3/helpers/extends';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import React, { useState, useCallback, useRef, useImperativeHandle, useEffect } from 'react';
import { C as CSSTransition } from './SwitchTransition-3c04c189.js';
import { c as clsx } from './clsx.m-1795d575.js';
import { B as Button } from './Button-3788b670.js';
import { F as FocusLock } from './FocusLock-7fcb3833.js';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/helpers/typeof';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import { M as Mitt } from './mitt-640f195b.js';
import { u as useEventCallback, K as Keys } from './keys-73f87561.js';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/helpers/asyncToGenerator';
import '@babel/runtime-corejs3/regenerator';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import { P as Portal } from './Portal-2ddabcda.js';
import { useMount } from 'react-use';
import 'react-dom/client';
import 'zustand';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/splice';
import '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import 'react-dom';
import { c as createPortalChannel } from './createPortalChannel-5a757611.js';

var createLiteModal = function createLiteModal(Component) {
  var LiteModal = _Object$assign( /*#__PURE__*/React.forwardRef(function LiteModal(_, ref) {
    var _useState = useState(),
        _useState2 = _slicedToArray(_useState, 2),
        args = _useState2[0],
        setArgs = _useState2[1];

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        visible = _useState4[0],
        setVisible = _useState4[1];

    var close = useCallback(function () {
      var _optionsRef$current, _optionsRef$current$o;

      if (((_optionsRef$current = optionsRef.current) === null || _optionsRef$current === void 0 ? void 0 : (_optionsRef$current$o = _optionsRef$current.onClose) === null || _optionsRef$current$o === void 0 ? void 0 : _optionsRef$current$o.call(_optionsRef$current)) !== false) {
        setVisible(false);
      }
    }, []);
    var optionsRef = useRef();
    var resolveRef = useRef(function () {});
    var rejectRef = useRef(function () {});
    var resolve = useCallback(function (v) {
      resolveRef.current(v);
      close();
    }, [close]);
    var reject = useCallback(function (e) {
      rejectRef.current(e);
      close();
    }, [close]);
    useImperativeHandle(ref, function () {
      return {
        open: function open(args, options) {
          setArgs(args);
          setVisible(true);
          optionsRef.current = options;
          return new _Promise(function (resolve, reject) {
            var _ref;

            return _ref = [resolve, reject], resolveRef.current = _ref[0], rejectRef.current = _ref[1], _ref;
          });
        },
        close: close
      };
    }, [close]);
    return /*#__PURE__*/React.createElement(Component, {
      visible: visible,
      resolve: resolve,
      reject: reject,
      close: close,
      args: args
    });
  }), {
    instantiate: function instantiate(args) {
      return new _Promise(function (resolve, reject) {
        Modalfication.push({
          Component: LiteModal,
          args: args,
          resolve: resolve,
          reject: reject
        });
      });
    }
  });

  return LiteModal;
};
var useModals = function useModals() {
  var _context;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var refs = useRef(_mapInstanceProperty(args).call(args, function () {
    return {
      current: {
        open: undefined
      }
    };
  }));
  var modals = /*#__PURE__*/React.createElement(React.Fragment, null, _mapInstanceProperty(args).call(args, function (M, index) {
    return /*#__PURE__*/React.createElement(M, {
      ref: function ref(current) {
        return refs.current[index].current.open = current === null || current === void 0 ? void 0 : current.open;
      },
      key: index
    });
  }));
  return [_mapInstanceProperty(_context = refs.current).call(_context, function (_ref2) {
    var current = _ref2.current;
    return current;
  }), modals];
};

var EXComponent = function EXComponent(_ref3) {
  var _ref3$payload = _ref3.payload,
      Component = _ref3$payload.Component,
      args = _ref3$payload.args,
      resolve = _ref3$payload.resolve,
      reject = _ref3$payload.reject,
      onClose = _ref3.onClose;
  var ref = useRef(null);
  useMount(function () {
    if (ref.current) {
      ref.current.open(args, {
        onClose: function (_onClose) {
          function onClose() {
            return _onClose.apply(this, arguments);
          }

          onClose.toString = function () {
            return _onClose.toString();
          };

          return onClose;
        }(function () {
          onClose();
        })
      }).then(function (v) {
        resolve(v);
      })["catch"](reject);
    }
  });
  return /*#__PURE__*/React.createElement(Component, {
    ref: ref
  });
};

var Modalfication = createPortalChannel({
  displayName: 'ModalPortalChannel',
  ConsumerComponent: function ModalficationConsumerComponent(_ref4) {
    var _ref4$model = _slicedToArray(_ref4.model, 2),
        modals = _ref4$model[0],
        setModals = _ref4$model[1];

    useEffect(function () {}, [modals]);

    var handleClose = function handleClose(id) {
      _setTimeout(function () {
        setModals(function (modals) {
          return _filterInstanceProperty(modals).call(modals, function (m) {
            return m.id !== id;
          });
        });
      }, 300);
    };

    return /*#__PURE__*/React.createElement("div", null, _mapInstanceProperty(modals).call(modals, function (_ref5) {
      var id = _ref5.id,
          payload = _ref5.payload;
      return /*#__PURE__*/React.createElement(EXComponent, {
        key: id,
        payload: payload,
        onClose: function onClose() {
          return handleClose(id);
        }
      });
    }));
  }
});

var _excluded = ["visible", "title", "onClose", "noHeader", "closable", "maskClosable", "width", "maxWidth", "style", "children", "mountOnEnter", "unmountOnExit", "onVisibilityChange"];

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var registry = [];
var ModalMitt = Mitt();
ModalMitt.on('REGISTER', function (id) {
  var _context;

  return Modal.registry = registry = _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(registry), [id]);
});
ModalMitt.on('UNREGISTER', function (id) {
  return Modal.registry = registry = _filterInstanceProperty(registry).call(registry, function (i) {
    return i !== id;
  });
});
var uuid = 1;

var noop = function noop() {};

var Modal = function Modal(props) {
  var visible = props.visible,
      title = props.title,
      _onClose = props.onClose;
      props.noHeader;
      var _props$closable = props.closable,
      closable = _props$closable === void 0 ? true : _props$closable,
      _props$maskClosable = props.maskClosable,
      maskClosable = _props$maskClosable === void 0 ? true : _props$maskClosable,
      width = props.width,
      maxWidth = props.maxWidth,
      style = props.style,
      children = props.children,
      mountOnEnter = props.mountOnEnter,
      _props$unmountOnExit = props.unmountOnExit,
      unmountOnExit = _props$unmountOnExit === void 0 ? true : _props$unmountOnExit,
      onVisibilityChange = props.onVisibilityChange,
      rest = _objectWithoutProperties(props, _excluded);

  var onClose = useEventCallback(_onClose || noop);

  var _useState = useState(function () {
    return uuid++;
  }),
      _useState2 = _slicedToArray(_useState, 1),
      id = _useState2[0];

  useEffect(function () {
    if (visible) {
      ModalMitt.emit('REGISTER', id);
    } else {
      ModalMitt.emit('UNREGISTER', id);
    }
  }, [id, visible]);
  useEffect(function () {
    var cb = function cb(i) {
      if (i == id) onClose();
    };

    ModalMitt.on('REMOTE_CLOSE', cb);
    return function () {
      return ModalMitt.off('REMOTE_CLOSE', cb);
    };
  }, [onClose, id]);

  var handleFocusLockKeyDown = function handleFocusLockKeyDown(e) {
    if (e.key === Keys.ESC) {
      onClose();
    }
  };

  return /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(CSSTransition, {
    timeout: 300,
    "in": visible,
    classNames: "st-modal-wrap",
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: true,
    onEnter: onVisibilityChange && function () {
      return onVisibilityChange(true);
    },
    onExit: onVisibilityChange && function () {
      return onVisibilityChange(false);
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('st-modal-wrap', !visible && 'st-not-interactive'),
    "aria-hidden": !visible,
    style: _objectSpread({
      width: width,
      maxWidth: maxWidth
    }, style)
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "st-modal__mask",
    onClick: maskClosable && visible ? onClose : undefined
  }), /*#__PURE__*/React.createElement(FocusLock, {
    disabled: !visible,
    onKeyDown: handleFocusLockKeyDown
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-modal__header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "st-modal__title"
  }, title), closable ? /*#__PURE__*/React.createElement(Button, {
    textual: true,
    className: "st-modal__close",
    onClick: visible ? onClose : undefined
  }, "\xD7") : null), /*#__PURE__*/React.createElement("div", {
    className: "st-modal__body"
  }, children))))));
};

Modal.Mitt = ModalMitt;
Modal.registry = registry;
Modal.createLiteModal = createLiteModal;
Modal.useModals = useModals;

export { Modal as M };
