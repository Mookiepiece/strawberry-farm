import _extends from '@babel/runtime-corejs3/helpers/extends';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import React, { useContext, useState, useMemo, useRef } from 'react';
import { B as Button } from './Button-3788b670.js';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import { c as createRegistry, h as has, g as get, b as useSingletonAsyncFn, s as set, u as unset } from './useSingletonAsyncFn-9ad3f8d4.js';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import { useUpdateEffect } from 'react-use';
import { c as clsx } from './clsx.m-1795d575.js';
import { C as Collapse } from './Collapse-95401147.js';
import { v as validator } from './keys-73f87561.js';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _spliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/splice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _fillInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/fill';
import _someInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/some';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _AggregateError from '@babel/runtime-corejs3/core-js/aggregate-error';
import _findIndexInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import _everyInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/every';
import zustand from 'zustand';

var _createRegistry = createRegistry(),
    _createRegistry2 = _slicedToArray(_createRegistry, 2),
    FormItemsRegistryProvider = _createRegistry2[0],
    useFormItemsRegistry = _createRegistry2[1];
var FormContext = /*#__PURE__*/React.createContext(undefined);
FormContext.displayName = 'FormContext';
var FormValueContext = /*#__PURE__*/React.createContext(undefined);
FormValueContext.displayName = 'FormValueContext';

var FormErrorMessage = function FormErrorMessage(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("span", {
    className: clsx('sf-error-message', children && 'sf-error-message--active')
  }, /*#__PURE__*/React.createElement(Collapse, {
    active: !!children,
    unmountOnExit: true
  }, children));
};

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }
var FormItem = function FormItem(_ref) {
  var _context2;

  var rules = _ref.rules,
      label = _ref.label,
      name = _ref.name,
      children = _ref.children;
  var form = useContext(FormContext);
  var formValue = useContext(FormValueContext);
  var has$1 = has(formValue, name);
  var value = get(formValue, name);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useSingletonAsyncFn = useSingletonAsyncFn( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var value, _e$errors$0$message;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_Array$isArray(rules) ? !rules.length : !rules)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            value = get(form.value, name);
            if (typeof value === 'string') value = _trimInstanceProperty(value).call(value);
            _context.prev = 4;
            _context.next = 7;
            return validator.validate(label || name, value, rules);

          case 7:
            setError(null);
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);

            if (validator.isAsyncValidateError(_context.t0)) {
              setError((_e$errors$0$message = _context.t0.errors[0].message) !== null && _e$errors$0$message !== void 0 ? _e$errors$0$message : null);
            } else {
              console.error('[strawberry-farm] Unexpected error during validation:', _context.t0);
            }

            throw _context.t0;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 10]]);
  }))),
      _useSingletonAsyncFn2 = _slicedToArray(_useSingletonAsyncFn, 2),
      validate = _useSingletonAsyncFn2[0],
      cancelValidate = _useSingletonAsyncFn2[1];

  useUpdateEffect(function () {
    if (form.silent) return;
    validate()["catch"](function () {
      return void 0;
    });
  }, [value]);
  useFormItemsRegistry(useMemo(function () {
    return {
      name: name,
      setError: setError,
      validate: function (_validate) {
        function validate() {
          return _validate.apply(this, arguments);
        }

        validate.toString = function () {
          return _validate.toString();
        };

        return validate;
      }(function () {
        cancelValidate();
        return validate();
      }),
      cancelValidate: cancelValidate,
      focus: function focus() {
        var control = inputRef.current;

        if (control) {
          if (isInViewport(control)) {
            control.focus();
          } else {
            control.scrollIntoView({
              behavior: 'smooth'
            });

            _setTimeout(function () {
              return control.focus();
            }, 300);
          }
        }
      }
    };
  }, [cancelValidate, name, validate]));
  var inputRef = useRef(null);
  var asterisk = _findInstanceProperty(_context2 = rules ? _Array$isArray(rules) ? rules : [rules] : []).call(_context2, function (r) {
    return r.required;
  }) && 'sf-label-asterisk';
  return useMemo(function () {
    var render = function render() {
      var control = {
        value: value,
        onChange: function onChange(value) {
          form.setField(name, value);
        },
        ref: inputRef
      };
      var errorMessageGetterTriggered = false;
      var childNode = null;

      if ( /*#__PURE__*/React.isValidElement(children)) {
        if ('value' in children.props) {
          throw new Error('[strawberry-farm] remove prop `value` from input inside a form item');
        }

        childNode = /*#__PURE__*/React.cloneElement(children, _objectSpread(_objectSpread(_objectSpread({}, children.props), control), {}, {
          onChange: function onChange(value) {
            var _children$props$onCha, _children$props;

            control.onChange(value);
            (_children$props$onCha = (_children$props = children.props).onChange) === null || _children$props$onCha === void 0 ? void 0 : _children$props$onCha.call(_children$props, value);
          }
        }));
      } else if (typeof children === 'function') {
        childNode = children(control, {
          validate: validate,
          error: error,
          setError: setError,
          cancelValidate: cancelValidate,

          get alert() {
            errorMessageGetterTriggered = true;
            return function (node) {
              return /*#__PURE__*/React.createElement(FormErrorMessage, null, node);
            };
          }

        });
      }

      var errorMessageNode = errorMessageGetterTriggered ? null : /*#__PURE__*/React.createElement(FormErrorMessage, null, error);
      return /*#__PURE__*/React.createElement(React.Fragment, null, childNode, errorMessageNode);
    };

    return has$1 ? /*#__PURE__*/React.createElement("div", {
      className: clsx(typeof error === 'string' && 'st-form-item--error')
    }, /*#__PURE__*/React.createElement("span", {
      className: clsx('sf-label', asterisk)
    }, label), render()) : null;
  }, [has$1, error, asterisk, label, value, children, form, name, validate, cancelValidate]);
};
/**
 * @see https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
 */

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

var FormSubscription = function FormSubscription(_ref) {
  var _context;

  var _names = _ref.names,
      render = _ref.render,
      greedy = _ref.greedy;
  var names = _Array$isArray(_names) ? _names : [_names];
  var pathes = useMemo(function () {
    return _mapInstanceProperty(names).call(names, function (name) {
      return name.replace(/\[(\w+)\]/g, '.$1').split('.');
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  names);
  var formValue = useContext(FormValueContext);

  var badget = _someInstanceProperty(pathes).call(pathes, function (path) {
    return !has(formValue, path);
  });

  var models = _mapInstanceProperty(pathes).call(pathes, function (path) {
    return get(formValue, path);
  });

  return useMemo(function () {
    if (badget && !greedy) return null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, render(_Array$isArray(_names) ? models : models[0])); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, _concatInstanceProperty(_context = [render, badget]).call(_context, _toConsumableArray(models)));
};

var FormList = function FormList(_ref) {
  var _name = _ref.name,
      children = _ref.children;
  var name = _name + '.length';
  var form = useContext(FormContext);
  var uuidRef = useRef(0);
  var keysRef = useRef([]);
  var render = useMemo(function () {
    var onChange = function onChange(value) {
      return form.setField(_name, value);
    };

    var add = function add(item) {
      var _context;

      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : keysRef.current.length;

      var arr = _toConsumableArray(get(form.value, name));

      _spliceInstanceProperty(_context = keysRef.current).call(_context, index, 0, uuidRef.current++);

      _spliceInstanceProperty(arr).call(arr, index, 0, item);

      onChange(arr);
    };

    var remove = function remove() {
      var _context2;

      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : keysRef.current.length;

      var arr = _toConsumableArray(get(form.value, name));

      _spliceInstanceProperty(_context2 = keysRef.current).call(_context2, index, 1);

      _spliceInstanceProperty(arr).call(arr, index, 1);

      onChange(arr);
    };

    var swap = function swap(a, b) {
      var arr = _toConsumableArray(get(form.value, name));

      var _ref2 = [keysRef.current[a], keysRef.current[b]];
      keysRef.current[b] = _ref2[0];
      keysRef.current[a] = _ref2[1];
      var _ref3 = [arr[b], arr[a]];
      arr[a] = _ref3[0];
      arr[b] = _ref3[1];
      onChange(arr);
    };

    return function (n) {
      var _context3, _context4, _context5;

      var a = _mapInstanceProperty(_context3 = _mapInstanceProperty(_context4 = _fillInstanceProperty(_context5 = Array(n)).call(_context5, 0)).call(_context4, function (_, index) {
        var _keysRef$current$inde;

        return (_keysRef$current$inde = keysRef.current[index]) !== null && _keysRef$current$inde !== void 0 ? _keysRef$current$inde : keysRef.current[index] = uuidRef.current++;
      })).call(_context3, String);

      return /*#__PURE__*/React.createElement(React.Fragment, null, children(a, {
        add: add,
        remove: remove,
        swap: swap
      }));
    };
  }, [form, _name, name, children]);
  return /*#__PURE__*/React.createElement(FormSubscription, {
    names: name,
    render: render
  });
};

var project = function project(name, render, meta) {
  return /*#__PURE__*/React.createElement(FormSubscription, _extends({
    names: name
  }, meta, {
    render: render
  }));
};

var CreateFormModel = function CreateFormModel(_ref) {
  var _initialValue = _ref.initialValue,
      action = _ref.action;
  var initialValue = _initialValue;
  var store = zustand(function () {
    return initialValue;
  });
  var statusStore = zustand(function () {
    return {
      submitting: false
    };
  });
  var items = {
    current: []
  };
  var silent = false;

  var set$1 = function set(t) {
    silent = false;
    store.setState(t, true);
  };

  var setSilently = function setSilently(t) {
    silent = true;
    store.setState(t, true);
  };

  var _updateField = function _updateField(name, t) {
    var fieldValue;

    if (typeof t === 'function') {
      fieldValue = t(get(store.getState(), name));
    } else {
      fieldValue = t;
    }

    return set(store.getState(), name, fieldValue);
  };

  var setField = function setField(name, t) {
    set$1(_updateField(name, t));
  };

  var setFieldSilently = function setFieldSilently(name, t) {
    setSilently(_updateField(name, t));
  };

  var deleteField = function deleteField(name) {
    set$1(unset(store.getState(), name));
  };

  var _validate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_names) {
      var _context;

      var names, value, i, array, _context2, _error, firstItem;

      return _regeneratorRuntime.wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              names = _names ? _Array$isArray(_names) ? _names : [_names] : undefined;
              value = store.getState();
              i = _filterInstanceProperty(_context = items.current).call(_context, function (item) {
                return !names || (names === null || names === void 0 ? void 0 : _includesInstanceProperty(names).call(names, item.name));
              });

              if (!i.length) {
                _context3.next = 11;
                break;
              }

              _context3.next = 6;
              return _Promise.allSettled(_mapInstanceProperty(i).call(i, function (item) {
                return item.validate();
              }));

            case 6:
              array = _context3.sent;

              if (!_someInstanceProperty(array).call(array, function (i) {
                return i.status === 'rejected';
              })) {
                _context3.next = 11;
                break;
              }

              _error = new _AggregateError(_mapInstanceProperty(_context2 = _filterInstanceProperty(array).call(array, function (i) {
                return i.status === 'rejected';
              })).call(_context2, function (i) {
                return i.reason;
              }));
              firstItem = i[_findIndexInstanceProperty(array).call(array, function (i) {
                return i.status === 'rejected';
              })];
              return _context3.abrupt("return", {
                status: 'rejected',
                reason: _error,
                firstItem: firstItem
              });

            case 11:
              return _context3.abrupt("return", {
                status: 'fulfilled',
                value: value
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee);
    }));

    return function _validate(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var validate = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(names) {
      var result;
      return _regeneratorRuntime.wrap(function _callee2$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _validate(names);

            case 2:
              result = _context4.sent;

              if (!(result.status === 'rejected')) {
                _context4.next = 5;
                break;
              }

              throw result.reason;

            case 5:
              return _context4.abrupt("return", result.value);

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee2);
    }));

    return function validate(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var setError = function setError(name, error) {
    var _items$current$find, _context5;

    (_items$current$find = _findInstanceProperty(_context5 = items.current).call(_context5, function (i) {
      return i.name === name;
    })) === null || _items$current$find === void 0 ? void 0 : _items$current$find.setError(error);
  };

  var reset = function reset() {
    var _context6;

    setSilently(initialValue);

    _forEachInstanceProperty(_context6 = items.current).call(_context6, function (i) {
      i.cancelValidate();
      i.setError(null);
    });
  };

  var submit = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var handleSubmit, handleValidateFailed, result, _context7;

      return _regeneratorRuntime.wrap(function _callee3$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!statusStore.getState().submitting) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return");

            case 2:
              statusStore.setState({
                submitting: true
              });
              handleSubmit = _Array$isArray(action) ? action[0] : action;
              handleValidateFailed = _Array$isArray(action) ? action[1] : undefined;
              _context8.prev = 5;
              _context8.next = 8;
              return _validate();

            case 8:
              result = _context8.sent;

              if (!(result.status === 'rejected')) {
                _context8.next = 12;
                break;
              }

              result.firstItem.focus();
              throw result.reason;

            case 12:
              if (!handleSubmit) {
                _context8.next = 15;
                break;
              }

              _context8.next = 15;
              return handleSubmit(result.value);

            case 15:
              _context8.next = 25;
              break;

            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8["catch"](5);

              if (!(_context8.t0 instanceof _AggregateError && _everyInstanceProperty(_context7 = _context8.t0.errors).call(_context7, function (i) {
                return validator.isAsyncValidateError(i);
              }))) {
                _context8.next = 23;
                break;
              }

              handleValidateFailed === null || handleValidateFailed === void 0 ? void 0 : handleValidateFailed(_context8.t0);
              _context8.next = 25;
              break;

            case 23:
              console.error('[starwberry-farm][Form] Unexpected error during validating / submitting');
              throw _context8.t0;

            case 25:
              statusStore.setState({
                submitting: false
              });

            case 26:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee3, null, [[5, 17]]);
    }));

    return function submit() {
      return _ref4.apply(this, arguments);
    };
  }();

  return {
    get silent() {
      return silent;
    },

    set: set$1,

    get initialValue() {
      return initialValue;
    },

    setInitialValue: function setInitialValue(i) {
      initialValue = i;
    },

    get value() {
      return store.getState();
    },

    setSilently: setSilently,
    setField: setField,
    setFieldSilently: setFieldSilently,
    deleteField: deleteField,
    items: items,
    validate: validate,
    setError: setError,
    reset: reset,
    submit: submit,
    subscribe: store.subscribe,
    useStatusStore: statusStore,
    useStore: store
  };
};

var useForm = function useForm(_ref) {
  var initialValue = _ref.initialValue,
      FormWatcher = _ref.FormWatcher,
      action = _ref.action;

  var _useState = useState(function () {
    return CreateFormModel({
      initialValue: initialValue,
      action: action
    });
  }),
      _useState2 = _slicedToArray(_useState, 1),
      form = _useState2[0];

  form.FormWatcher = FormWatcher;
  form.action = action;
  return form;
};

var _Form = function _Form(_ref) {
  var form = _ref.form,
      children = _ref.children;
  var value = form.useStore();
  var FormWatcher = form.FormWatcher;
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      form.submit();
    },
    onReset: function onReset(e) {
      e.preventDefault();
      e.stopPropagation();
      form.reset();
    }
  }, /*#__PURE__*/React.createElement(FormItemsRegistryProvider, {
    itemsRef: form.items
  }, /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: form
  }, /*#__PURE__*/React.createElement(FormValueContext.Provider, {
    value: value
  }, children, FormWatcher ? /*#__PURE__*/React.createElement(FormValueContext.Consumer, null, function (formValue) {
    return /*#__PURE__*/React.createElement(FormWatcher, {
      form: form,
      formValue: formValue
    });
  }) : null))));
};

_Form.displayName = 'Form';
var FormSubmitButton = /*#__PURE__*/React.forwardRef(function FormSubmitButton(props, ref) {
  var form = useContext(FormContext);

  var _form$useStatusStore = form.useStatusStore(),
      submitting = _form$useStatusStore.submitting;

  return /*#__PURE__*/React.createElement(Button, _extends({
    type: "submit"
  }, props, {
    loading: props.loading || submitting,
    ref: ref
  }));
});

var defineRules = function defineRules(a) {
  return a;
};

var Form = _Object$assign(_Form, {
  Item: FormItem,
  List: FormList,
  SubmitButton: FormSubmitButton,
  useForm: useForm,
  defineRules: defineRules,
  project: project,
  FormContext: FormContext,
  FormValueContext: FormValueContext
});

export { Form as F };
