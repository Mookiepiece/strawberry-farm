import React from 'react';
import _Reflect$construct from '@babel/runtime-corejs3/core-js-stable/reflect/construct';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _inherits from '@babel/runtime-corejs3/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime-corejs3/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime-corejs3/helpers/getPrototypeOf';
import _wrapNativeSuper from '@babel/runtime-corejs3/helpers/wrapNativeSuper';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import AsyncValidator from 'async-validator';

// useEventCallback issue: https://github.com/facebook/react/issues/14099
// Copy from
// https://github.com/formium/formik/blob/34a11422bf1619236bc9fdb1b7c4f0d285638702/packages/formik/src/Formik.tsx#L1182-L1205

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? React.useLayoutEffect : React.useEffect; // eslint-disable-next-line @typescript-eslint/no-explicit-any

function useEventCallback(fn) {
  var ref = React.useRef(fn); // we copy a ref to the callback scoped to the current state/props on each render

  useIsomorphicLayoutEffect(function () {
    ref.current = fn;
  });
  return React.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ref.current.apply(void 0, args);
  }, []);
}

var _excluded = ["validator", "asyncValidator"];

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context4, _context5; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context4 = ownKeys(Object(source), !0)).call(_context4, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context5 = ownKeys(Object(source))).call(_context5, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * AsyncValidationError is not exported by async-validator
 *
 * thus we override the original
 *
 * @see https://github.com/yiminghe/async-validator/blob/cc126d62084bfce8b0a84dff652348d5ec72d03f/src/util.ts#L173-L185
 */
var AsyncValidationError = /*#__PURE__*/function (_Error) {
  _inherits(AsyncValidationError, _Error);

  var _super = _createSuper(AsyncValidationError);

  function AsyncValidationError(errors, fields) {
    var _this;

    _classCallCheck(this, AsyncValidationError);

    _this = _super.call(this, 'Async Validation Error');
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }

  return _createClass(AsyncValidationError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var validator = {
  validate: function validate(name, value) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var _context;

      var rules;
      return _regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              rules = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : [];
              _context3.next = 3;
              return new AsyncValidator(_defineProperty({}, name, _mapInstanceProperty(_context = _Array$isArray(rules) ? rules : [rules]).call(_context, function (_ref) {
                var validator = _ref.validator,
                    asyncValidator = _ref.asyncValidator,
                    r = _objectWithoutProperties(_ref, _excluded);

                var a = _objectSpread(_objectSpread({}, r), {}, {
                  validator: validator ? function (_, v) {
                    var ans = validator(v);

                    if (typeof ans === 'string') {
                      return new Error(ans);
                    }

                    return [];
                  } : undefined,
                  asyncValidator: asyncValidator ? /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_, v) {
                      var r;
                      return _regeneratorRuntime.wrap(function _callee$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.next = 2;
                              return asyncValidator(v);

                            case 2:
                              r = _context2.sent;

                              if (!(typeof r === 'string')) {
                                _context2.next = 5;
                                break;
                              }

                              throw new Error(r);

                            case 5:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x, _x2) {
                      return _ref2.apply(this, arguments);
                    };
                  }() : undefined
                }); // NOTE: If validator/asyncValidator is undefined value, async-validator
                // will throw [field] is not a string if we input numbers.
                // This is a bug to us


                if (!a.validator) delete a.validator;
                if (!a.asyncValidator) delete a.asyncValidator;
                return a;
              }))).validate(_defineProperty({}, name, value), {
                firstFields: true
              })["catch"](function (e) {
                if (e instanceof Error && e.message === 'Async Validation Error') {
                  throw new AsyncValidationError(e.errors, e.fields);
                }

                console.error('[strawberry-farm]: Unexpected error during validation: ', e);
                throw e;
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    }))();
  },
  isAsyncValidateError: function isAsyncValidateError(e) {
    return e instanceof AsyncValidationError;
  }
};

AsyncValidator.warning = function () {};

var Keys;

(function (Keys) {
  Keys["ESC"] = "Escape";
})(Keys || (Keys = {}));

export { AsyncValidationError as A, Keys as K, useEventCallback as u, validator as v };
