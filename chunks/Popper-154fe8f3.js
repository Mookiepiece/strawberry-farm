import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import React, { useState, useRef, useEffect } from 'react';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _objectWithoutProperties from '@babel/runtime-corejs3/helpers/objectWithoutProperties';
import _typeof from '@babel/runtime-corejs3/helpers/typeof';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import '@babel/runtime-corejs3/core-js-stable/instance/sort';
import '@babel/runtime-corejs3/core-js-stable/instance/slice';
import '@babel/runtime-corejs3/core-js-stable/instance/find';
import '@babel/runtime-corejs3/core-js-stable/instance/every';
import '@babel/runtime-corejs3/core-js-stable/instance/some';
import '@babel/runtime-corejs3/core-js-stable/object/from-entries';
import '@babel/runtime-corejs3/core-js-stable/object/entries';
import { c as clsx } from './clsx.m-1795d575.js';
import '@babel/runtime-corejs3/core-js-stable/instance/find-index';
import '@babel/runtime-corejs3/core-js-stable/array/is-array';
import '@babel/runtime-corejs3/core-js-stable/map';
import '@babel/runtime-corejs3/core-js-stable/instance/splice';
import '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import './keys-73f87561.js';
import { u as useClickAway, n as noop, E as EMPTY_ARRAY } from './constants-5032b34b.js';
import '@babel/runtime-corejs3/core-js-stable/promise';
import { P as Portal } from './Portal-2ddabcda.js';
import 'react-use';
import 'react-dom/client';
import 'zustand';
import '@babel/runtime-corejs3/core-js-stable/json/stringify';
import '@babel/runtime-corejs3/core-js-stable/object/is';
import { C as CSSTransition } from './SwitchTransition-3c04c189.js';

var _excluded4 = ["mainAxis", "crossAxis", "limiter"];

function ownKeys$1(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var _context25, _context26; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context25 = ownKeys$1(Object(source), !0)).call(_context25, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context26 = ownKeys$1(Object(source))).call(_context26, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function getSide(placement) {
  return placement.split('-')[0];
}

function getAlignment(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  var _context;

  return _includesInstanceProperty(_context = ['top', 'bottom']).call(_context, getSide(placement)) ? 'x' : 'y';
}

function getLengthFromAxis(axis) {
  return axis === 'y' ? 'height' : 'width';
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  var reference = _ref.reference,
      floating = _ref.floating;
  var commonX = reference.x + reference.width / 2 - floating.width / 2;
  var commonY = reference.y + reference.height / 2 - floating.height / 2;
  var mainAxis = getMainAxisFromPlacement(placement);
  var length = getLengthFromAxis(mainAxis);
  var commonAlign = reference[length] / 2 - floating[length] / 2;
  var side = getSide(placement);
  var isVertical = mainAxis === 'x';
  var coords;

  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;

    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;

    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }

  switch (getAlignment(placement)) {
    case 'start':
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;

    case 'end':
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }

  return coords;
}
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */


var computePosition$1 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(reference, floating, config) {
    var _config$placement, placement, _config$strategy, strategy, _config$middleware, middleware, platform, rtl, rects, _computeCoordsFromPla, x, y, statefulPlacement, middlewareData, resetCount, i, _middleware$i, name, fn, _yield$fn, nextX, nextY, data, reset, _computeCoordsFromPla2;

    return _regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _config$placement = config.placement, placement = _config$placement === void 0 ? 'bottom' : _config$placement, _config$strategy = config.strategy, strategy = _config$strategy === void 0 ? 'absolute' : _config$strategy, _config$middleware = config.middleware, middleware = _config$middleware === void 0 ? [] : _config$middleware, platform = config.platform;
            _context2.next = 3;
            return platform.isRTL == null ? void 0 : platform.isRTL(floating);

          case 3:
            rtl = _context2.sent;

            if (!(process.env.NODE_ENV !== "production")) {
              _context2.next = 8;
              break;
            }

            if (platform == null) {
              console.error(['Floating UI: `platform` property was not passed to config. If you', 'want to use Floating UI on the web, install @floating-ui/dom', 'instead of the /core package. Otherwise, you can create your own', '`platform`: https://floating-ui.com/docs/platform'].join(' '));
            }

            if (!(_filterInstanceProperty(middleware).call(middleware, function (_ref) {
              var name = _ref.name;
              return name === 'autoPlacement' || name === 'flip';
            }).length > 1)) {
              _context2.next = 8;
              break;
            }

            throw new Error(['Floating UI: duplicate `flip` and/or `autoPlacement`', 'middleware detected. This will lead to an infinite loop. Ensure only', 'one of either has been passed to the `middleware` array.'].join(' '));

          case 8:
            _context2.next = 10;
            return platform.getElementRects({
              reference: reference,
              floating: floating,
              strategy: strategy
            });

          case 10:
            rects = _context2.sent;
            _computeCoordsFromPla = computeCoordsFromPlacement(rects, placement, rtl), x = _computeCoordsFromPla.x, y = _computeCoordsFromPla.y;
            statefulPlacement = placement;
            middlewareData = {};
            resetCount = 0;
            i = 0;

          case 16:
            if (!(i < middleware.length)) {
              _context2.next = 50;
              break;
            }

            _middleware$i = middleware[i], name = _middleware$i.name, fn = _middleware$i.fn;
            _context2.next = 20;
            return fn({
              x: x,
              y: y,
              initialPlacement: placement,
              placement: statefulPlacement,
              strategy: strategy,
              middlewareData: middlewareData,
              rects: rects,
              platform: platform,
              elements: {
                reference: reference,
                floating: floating
              }
            });

          case 20:
            _yield$fn = _context2.sent;
            nextX = _yield$fn.x;
            nextY = _yield$fn.y;
            data = _yield$fn.data;
            reset = _yield$fn.reset;
            x = nextX != null ? nextX : x;
            y = nextY != null ? nextY : y;
            middlewareData = _objectSpread$1(_objectSpread$1({}, middlewareData), {}, _defineProperty({}, name, _objectSpread$1(_objectSpread$1({}, middlewareData[name]), data)));

            if (process.env.NODE_ENV !== "production") {
              if (resetCount > 50) {
                console.warn(['Floating UI: The middleware lifecycle appears to be running in an', 'infinite loop. This is usually caused by a `reset` continually', 'being returned without a break condition.'].join(' '));
              }
            }

            if (!(reset && resetCount <= 50)) {
              _context2.next = 47;
              break;
            }

            resetCount++;

            if (!(_typeof(reset) === 'object')) {
              _context2.next = 45;
              break;
            }

            if (reset.placement) {
              statefulPlacement = reset.placement;
            }

            if (!reset.rects) {
              _context2.next = 42;
              break;
            }

            if (!(reset.rects === true)) {
              _context2.next = 40;
              break;
            }

            _context2.next = 37;
            return platform.getElementRects({
              reference: reference,
              floating: floating,
              strategy: strategy
            });

          case 37:
            _context2.t0 = _context2.sent;
            _context2.next = 41;
            break;

          case 40:
            _context2.t0 = reset.rects;

          case 41:
            rects = _context2.t0;

          case 42:
            _computeCoordsFromPla2 = computeCoordsFromPlacement(rects, statefulPlacement, rtl);
            x = _computeCoordsFromPla2.x;
            y = _computeCoordsFromPla2.y;

          case 45:
            i = -1;
            return _context2.abrupt("continue", 47);

          case 47:
            i++;
            _context2.next = 16;
            break;

          case 50:
            return _context2.abrupt("return", {
              x: x,
              y: y,
              placement: statefulPlacement,
              strategy: strategy,
              middlewareData: middlewareData
            });

          case 51:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));

  return function computePosition(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

function expandPaddingObject(padding) {
  return _objectSpread$1({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, padding);
}

function getSideObjectFromPadding(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}

function rectToClientRect(rect) {
  return _objectSpread$1(_objectSpread$1({}, rect), {}, {
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */


function detectOverflow(_x4, _x5) {
  return _detectOverflow.apply(this, arguments);
}

function _detectOverflow() {
  _detectOverflow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(middlewareArguments, options) {
    var _await$platform$isEle, x, y, platform, rects, elements, strategy, _options7, _options7$boundary, boundary, _options7$rootBoundar, rootBoundary, _options7$elementCont, elementContext, _options7$altBoundary, altBoundary, _options7$padding, padding, paddingObject, altContext, element, clippingClientRect, elementClientRect;

    return _regeneratorRuntime.wrap(function _callee10$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            if (options === void 0) {
              options = {};
            }

            x = middlewareArguments.x, y = middlewareArguments.y, platform = middlewareArguments.platform, rects = middlewareArguments.rects, elements = middlewareArguments.elements, strategy = middlewareArguments.strategy;
            _options7 = options, _options7$boundary = _options7.boundary, boundary = _options7$boundary === void 0 ? 'clippingAncestors' : _options7$boundary, _options7$rootBoundar = _options7.rootBoundary, rootBoundary = _options7$rootBoundar === void 0 ? 'viewport' : _options7$rootBoundar, _options7$elementCont = _options7.elementContext, elementContext = _options7$elementCont === void 0 ? 'floating' : _options7$elementCont, _options7$altBoundary = _options7.altBoundary, altBoundary = _options7$altBoundary === void 0 ? false : _options7$altBoundary, _options7$padding = _options7.padding, padding = _options7$padding === void 0 ? 0 : _options7$padding;
            paddingObject = getSideObjectFromPadding(padding);
            altContext = elementContext === 'floating' ? 'reference' : 'floating';
            element = elements[altBoundary ? altContext : elementContext];
            _context22.t0 = rectToClientRect;
            _context22.t1 = platform;
            _context22.next = 10;
            return platform.isElement == null ? void 0 : platform.isElement(element);

          case 10:
            _context22.t2 = _await$platform$isEle = _context22.sent;

            if (!(_context22.t2 != null)) {
              _context22.next = 15;
              break;
            }

            _context22.t3 = _await$platform$isEle;
            _context22.next = 16;
            break;

          case 15:
            _context22.t3 = true;

          case 16:
            if (!_context22.t3) {
              _context22.next = 20;
              break;
            }

            _context22.t4 = element;
            _context22.next = 26;
            break;

          case 20:
            _context22.t5 = element.contextElement;

            if (_context22.t5) {
              _context22.next = 25;
              break;
            }

            _context22.next = 24;
            return platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating);

          case 24:
            _context22.t5 = _context22.sent;

          case 25:
            _context22.t4 = _context22.t5;

          case 26:
            _context22.t6 = _context22.t4;
            _context22.t7 = boundary;
            _context22.t8 = rootBoundary;
            _context22.t9 = strategy;
            _context22.t10 = {
              element: _context22.t6,
              boundary: _context22.t7,
              rootBoundary: _context22.t8,
              strategy: _context22.t9
            };
            _context22.next = 33;
            return _context22.t1.getClippingRect.call(_context22.t1, _context22.t10);

          case 33:
            _context22.t11 = _context22.sent;
            clippingClientRect = (0, _context22.t0)(_context22.t11);
            _context22.t12 = rectToClientRect;

            if (!platform.convertOffsetParentRelativeRectToViewportRelativeRect) {
              _context22.next = 49;
              break;
            }

            _context22.t14 = platform;
            _context22.t15 = elementContext === 'floating' ? _objectSpread$1(_objectSpread$1({}, rects.floating), {}, {
              x: x,
              y: y
            }) : rects.reference;
            _context22.next = 41;
            return platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating);

          case 41:
            _context22.t16 = _context22.sent;
            _context22.t17 = strategy;
            _context22.t18 = {
              rect: _context22.t15,
              offsetParent: _context22.t16,
              strategy: _context22.t17
            };
            _context22.next = 46;
            return _context22.t14.convertOffsetParentRelativeRectToViewportRelativeRect.call(_context22.t14, _context22.t18);

          case 46:
            _context22.t13 = _context22.sent;
            _context22.next = 50;
            break;

          case 49:
            _context22.t13 = rects[elementContext];

          case 50:
            _context22.t19 = _context22.t13;
            elementClientRect = (0, _context22.t12)(_context22.t19);
            return _context22.abrupt("return", {
              top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
              bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
              left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
              right: elementClientRect.right - clippingClientRect.right + paddingObject.right
            });

          case 53:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee10);
  }));
  return _detectOverflow.apply(this, arguments);
}

var min$1 = Math.min;
var max$1 = Math.max;

function within(min$1$1, value, max$1$1) {
  return max$1(min$1$1, min$1(value, max$1$1));
}

function getCrossAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
/**
 * Shifts the floating element in order to keep it in view when it will overflow
 * a clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */


var shift = function shift(options) {
  if (options === void 0) {
    options = {};
  }

  return {
    name: 'shift',
    options: options,
    fn: function fn(middlewareArguments) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7() {
        var _objectSpread3;

        var x, y, placement, _options3, _options3$mainAxis, checkMainAxis, _options3$crossAxis, checkCrossAxis, _options3$limiter, limiter, detectOverflowOptions, coords, overflow, mainAxis, crossAxis, mainAxisCoord, crossAxisCoord, minSide, maxSide, _min, _max, _minSide, _maxSide, _min2, _max2, limitedCoords;

        return _regeneratorRuntime.wrap(function _callee7$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                x = middlewareArguments.x, y = middlewareArguments.y, placement = middlewareArguments.placement;
                _options3 = options, _options3$mainAxis = _options3.mainAxis, checkMainAxis = _options3$mainAxis === void 0 ? true : _options3$mainAxis, _options3$crossAxis = _options3.crossAxis, checkCrossAxis = _options3$crossAxis === void 0 ? false : _options3$crossAxis, _options3$limiter = _options3.limiter, limiter = _options3$limiter === void 0 ? {
                  fn: function fn(_ref) {
                    var x = _ref.x,
                        y = _ref.y;
                    return {
                      x: x,
                      y: y
                    };
                  }
                } : _options3$limiter, detectOverflowOptions = _objectWithoutProperties(_options3, _excluded4);
                coords = {
                  x: x,
                  y: y
                };
                _context16.next = 5;
                return detectOverflow(middlewareArguments, detectOverflowOptions);

              case 5:
                overflow = _context16.sent;
                mainAxis = getMainAxisFromPlacement(getSide(placement));
                crossAxis = getCrossAxis(mainAxis);
                mainAxisCoord = coords[mainAxis];
                crossAxisCoord = coords[crossAxis];

                if (checkMainAxis) {
                  minSide = mainAxis === 'y' ? 'top' : 'left';
                  maxSide = mainAxis === 'y' ? 'bottom' : 'right';
                  _min = mainAxisCoord + overflow[minSide];
                  _max = mainAxisCoord - overflow[maxSide];
                  mainAxisCoord = within(_min, mainAxisCoord, _max);
                }

                if (checkCrossAxis) {
                  _minSide = crossAxis === 'y' ? 'top' : 'left';
                  _maxSide = crossAxis === 'y' ? 'bottom' : 'right';
                  _min2 = crossAxisCoord + overflow[_minSide];
                  _max2 = crossAxisCoord - overflow[_maxSide];
                  crossAxisCoord = within(_min2, crossAxisCoord, _max2);
                }

                limitedCoords = limiter.fn(_objectSpread$1(_objectSpread$1({}, middlewareArguments), {}, (_objectSpread3 = {}, _defineProperty(_objectSpread3, mainAxis, mainAxisCoord), _defineProperty(_objectSpread3, crossAxis, crossAxisCoord), _objectSpread3)));
                return _context16.abrupt("return", _objectSpread$1(_objectSpread$1({}, limitedCoords), {}, {
                  data: {
                    x: limitedCoords.x - x,
                    y: limitedCoords.y - y
                  }
                }));

              case 14:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee7);
      }))();
    }
  };
};

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context11, _context12; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context11 = ownKeys(Object(source), !0)).call(_context11, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context12 = ownKeys(Object(source))).call(_context12, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (!isWindow(node)) {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function getNodeName(node) {
  return isWindow(node) ? '' : node ? (node.nodeName || '').toLowerCase() : '';
}

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    var _context;

    return _mapInstanceProperty(_context = uaData.brands).call(_context, function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}

function isElement(value) {
  return value instanceof getWindow(value).Element;
}

function isNode(value) {
  return value instanceof getWindow(value).Node;
}

function isShadowRoot(node) {
  // Browsers without `ShadowRoot` support
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

function isOverflowElement(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle$ = getComputedStyle$1(element),
      overflow = _getComputedStyle$.overflow,
      overflowX = _getComputedStyle$.overflowX,
      overflowY = _getComputedStyle$.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function isTableElement(element) {
  var _context2;

  return _includesInstanceProperty(_context2 = ['table', 'td', 'th']).call(_context2, getNodeName(element));
}

function isContainingBlock(element) {
  var _context3;

  // TODO: Try and use feature detection here instead
  var isFirefox = /firefox/i.test(getUAString());
  var css = getComputedStyle$1(element); // This is non-exhaustive but covers the most common CSS properties that
  // create a containing block.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

  return css.transform !== 'none' || css.perspective !== 'none' || // @ts-ignore (TS 4.1 compat)
  css.contain === 'paint' || _includesInstanceProperty(_context3 = ['transform', 'perspective']).call(_context3, css.willChange) || isFirefox && css.willChange === 'filter' || isFirefox && (_filterInstanceProperty(css) ? _filterInstanceProperty(css) !== 'none' : false);
}

function isLayoutViewport() {
  // Not Safari
  return !/^((?!chrome|android).)*safari/i.test(getUAString()); // Feature detection for this fails in various ways
  // • Always-visible scrollbar or not
  // • Width of <html>, etc.
  // const vV = win.visualViewport;
  // return vV ? Math.abs(win.innerWidth / vV.scale - vV.width) < 0.5 : true;
}

var min = Math.min;
var max = Math.max;
var round = Math.round;

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;

  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var win = isElement(element) ? getWindow(element) : window;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}

function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }

  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

function isScaled(element) {
  var rect = getBoundingClientRect(element);
  return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(element, // @ts-ignore - checked above (TS 4.1 compat)
  isOffsetParentAnElement && isScaled(offsetParent), strategy === 'fixed');
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      var offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // @ts-ignore
    node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    node.parentNode || ( // DOM Element detected
    isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
    getDocumentElement(node) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
}

function getContainingBlock(element) {
  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && !_includesInstanceProperty(_context4 = ['html', 'body']).call(_context4, getNodeName(currentNode))) {
    var _context4;

    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }

  var rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  var rect = _ref.rect,
      offsetParent = _ref.offsetParent,
      strategy = _ref.strategy;
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var documentElement = getDocumentElement(offsetParent);

  if (offsetParent === documentElement) {
    return rect;
  }

  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      var offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } // This doesn't appear to be need to be negated.
    // else if (documentElement) {
    //   offsets.x = getWindowScrollBarX(documentElement);
    // }

  }

  return _objectSpread(_objectSpread({}, rect), {}, {
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  });
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
} // of the `<html>` and `<body>` rect bounds if horizontally scrollable


function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var scroll = getNodeScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -scroll.scrollLeft + getWindowScrollBarX(element);
  var y = -scroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function getNearestOverflowAncestor(node) {
  var _context5;

  var parentNode = getParentNode(node);

  if (_includesInstanceProperty(_context5 = ['html', 'body', '#document']).call(_context5, getNodeName(parentNode))) {
    // @ts-ignore assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }

  return getNearestOverflowAncestor(parentNode);
}

function getOverflowAncestors(node, list) {
  var _context6;

  var _node$ownerDocument;

  if (list === void 0) {
    list = [];
  }

  var scrollableAncestor = getNearestOverflowAncestor(node);
  var isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  var win = getWindow(scrollableAncestor);
  var target = isBody ? _concatInstanceProperty(_context6 = [win]).call(_context6, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;

  var updatedList = _concatInstanceProperty(list).call(list, target);

  return isBody ? updatedList : // @ts-ignore: isBody tells us target will be an HTMLElement here
  _concatInstanceProperty(updatedList).call(updatedList, getOverflowAncestors(target));
}

function contains(parent, child) {
  var rootNode = child.getRootNode == null ? void 0 : child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;

    do {
      // use `===` replace node.isSameNode()
      if (next && parent === next) {
        return true;
      } // @ts-ignore: need a better way to handle this...


      next = next.parentNode || next.host;
    } while (next);
  }

  return false;
}

function getInnerBoundingClientRect(element, strategy) {
  var clientRect = getBoundingClientRect(element, false, strategy === 'fixed');
  var top = clientRect.top + element.clientTop;
  var left = clientRect.left + element.clientLeft;
  return {
    top: top,
    left: left,
    x: left,
    y: top,
    right: left + element.clientWidth,
    bottom: top + element.clientHeight,
    width: element.clientWidth,
    height: element.clientHeight
  };
}

function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
  if (clippingParent === 'viewport') {
    return rectToClientRect(getViewportRect(element, strategy));
  }

  if (isElement(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent, strategy);
  }

  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping ancestor" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingAncestors(element) {
  var _context7;

  var clippingAncestors = getOverflowAncestors(element);

  var canEscapeClipping = _includesInstanceProperty(_context7 = ['absolute', 'fixed']).call(_context7, getComputedStyle$1(element).position);

  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // @ts-ignore isElement check ensures we return Array<Element>


  return _filterInstanceProperty(clippingAncestors).call(clippingAncestors, function (clippingAncestors) {
    return isElement(clippingAncestors) && contains(clippingAncestors, clipperElement) && getNodeName(clippingAncestors) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping ancestors


function getClippingRect(_ref) {
  var _context8, _context9;

  var element = _ref.element,
      boundary = _ref.boundary,
      rootBoundary = _ref.rootBoundary,
      strategy = _ref.strategy;
  var mainClippingAncestors = boundary === 'clippingAncestors' ? getClippingAncestors(element) : _concatInstanceProperty(_context8 = []).call(_context8, boundary);

  var clippingAncestors = _concatInstanceProperty(_context9 = []).call(_context9, _toConsumableArray(mainClippingAncestors), [rootBoundary]);

  var firstClippingAncestor = clippingAncestors[0];

  var clippingRect = _reduceInstanceProperty(clippingAncestors).call(clippingAncestors, function (accRect, clippingAncestor) {
    var rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));

  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

var platform = {
  getClippingRect: getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect: convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement: isElement,
  getDimensions: getDimensions,
  getOffsetParent: getOffsetParent,
  getDocumentElement: getDocumentElement,
  getElementRects: function getElementRects(_ref) {
    var reference = _ref.reference,
        floating = _ref.floating,
        strategy = _ref.strategy;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: _objectSpread(_objectSpread({}, getDimensions(floating)), {}, {
        x: 0,
        y: 0
      })
    };
  },
  getClientRects: function getClientRects(element) {
    return _Array$from(element.getClientRects());
  },
  isRTL: function isRTL(element) {
    return getComputedStyle$1(element).direction === 'rtl';
  }
};
/**
 * Automatically updates the position of the floating element when necessary.
 * @see https://floating-ui.com/docs/autoUpdate
 */

function autoUpdate(reference, floating, update, options) {
  var _context10;

  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$ancestorScro = _options.ancestorScroll,
      _ancestorScroll = _options$ancestorScro === void 0 ? true : _options$ancestorScro,
      _options$ancestorResi = _options.ancestorResize,
      _ancestorResize = _options$ancestorResi === void 0 ? true : _options$ancestorResi,
      _options$elementResiz = _options.elementResize,
      elementResize = _options$elementResiz === void 0 ? true : _options$elementResiz,
      _options$animationFra = _options.animationFrame,
      animationFrame = _options$animationFra === void 0 ? false : _options$animationFra;

  var ancestorScroll = _ancestorScroll && !animationFrame;
  var ancestorResize = _ancestorResize && !animationFrame;
  var ancestors = ancestorScroll || ancestorResize ? _concatInstanceProperty(_context10 = []).call(_context10, _toConsumableArray(isElement(reference) ? getOverflowAncestors(reference) : []), _toConsumableArray(getOverflowAncestors(floating))) : [];

  _forEachInstanceProperty(ancestors).call(ancestors, function (ancestor) {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });

  var observer = null;

  if (elementResize) {
    var initialUpdate = true;
    observer = new ResizeObserver(function () {
      if (!initialUpdate) {
        update();
      }

      initialUpdate = false;
    });
    isElement(reference) && !animationFrame && observer.observe(reference);
    observer.observe(floating);
  }

  var frameId;
  var prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;

  if (animationFrame) {
    frameLoop();
  }

  function frameLoop() {
    var nextRefRect = getBoundingClientRect(reference);

    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }

    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }

  update();
  return function () {
    var _observer;

    _forEachInstanceProperty(ancestors).call(ancestors, function (ancestor) {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });

    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;

    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
 */


var computePosition = function computePosition(reference, floating, options) {
  return computePosition$1(reference, floating, _objectSpread({
    platform: platform
  }, options));
};

var Popper = function Popper(_ref) {
  var children = _ref.children,
      popup = _ref.popup,
      visible = _ref.visible,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? noop : _ref$onClose,
      popupClassName = _ref.popupClassName,
      popupStyle = _ref.popupStyle,
      placement = _ref.placement,
      _ref$closeOnClickOuts = _ref.closeOnClickOutside,
      closeOnClickOutside = _ref$closeOnClickOuts === void 0 ? true : _ref$closeOnClickOuts,
      _ref$middleware = _ref.middleware,
      middleware = _ref$middleware === void 0 ? EMPTY_ARRAY : _ref$middleware;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      referenceElement = _useState2[0],
      setReferenceElement = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      popperElement = _useState4[0],
      setPopperElement = _useState4[1];

  var middlewareRef = useRef(middleware);
  middlewareRef.current = middleware;

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      positionCalculated = _useState6[0],
      setPositionCalculated = _useState6[1];

  useEffect(function () {
    if (!visible || !referenceElement || !popperElement) {
      return setPositionCalculated(false);
    }

    return autoUpdate(referenceElement, popperElement, function () {
      computePosition(referenceElement, popperElement, {
        middleware: middlewareRef.current,
        placement: placement
      }).then(function (_ref2) {
        var x = _ref2.x,
            y = _ref2.y;
            _ref2.middlewareData;
            var placement = _ref2.placement;
        popperElement.style.setProperty('--x', x + 'px');
        popperElement.style.setProperty('--y', y + 'px');

        if (popperElement.getAttribute('data-popper-placement') !== placement) {
          popperElement.setAttribute('data-popper-placement', placement);
        }

        setPositionCalculated(true);
      });
    });
  }, [placement, popperElement, referenceElement, visible]);
  useClickAway(closeOnClickOutside && visible ? [referenceElement, popperElement] : [], onClose);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(children, {
    ref: setReferenceElement
  }), /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(CSSTransition, {
    "in": visible && positionCalculated,
    timeout: 100,
    classNames: "sf-popper"
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx('sf-popper', popupClassName),
    style: popupStyle,
    ref: setPopperElement
  }, popup))));
};

export { Popper as P, shift as s };
