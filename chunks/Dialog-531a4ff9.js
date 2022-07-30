import _trimInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/trim';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import React from 'react';

var Dialog = function Dialog(_ref) {
  var _context, _context2, _context3, _context4;

  var title = _ref.title,
      children = _ref.children,
      warning = _ref.warning;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: 'pre'
    }
  }, [_trimInstanceProperty(_context = _concatInstanceProperty(_context2 = "\n\uFF0F \uFFE3\uFFE3 \uFF3C\u3000\n|\u3000\u30FC\u3000\u30FC \\\u3000 \uFF0F\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFF3C\n|\u3000 \u25C9\u3000\u25C9 |   |\u3000   ".concat(title, "    \\\n\\\u3000\u3000 \u25B1\u3000/ \u2220     ")).call(_context2, children, "   /\n \uFF3C\u3000\u3000 \u30A4\u3000 \\ ________________/\n\uFF0F\u3000\u3000\u3000\\\n/\u3000|\u3000\u3000\u3000 \\\n|\u3000|\u3000\u3000\u3000 | |\n")).call(_context), _trimInstanceProperty(_context3 = _concatInstanceProperty(_context4 = "\n\uFF0F \uFFE3\uFFE3 \uFF3C\u3000\n|\u3000\u4E40\u3000\u221A   \\\u3000 \uFF0F\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFFE3\uFF3C\n|\u3000 \u25C9\u3000\u25C9 |   |\u3000   ".concat(title, "    \\\n\\\u3000  / \u76BF\\  / \u2220    ")).call(_context4, children, "  /\n \uFF3C\u3000\u3000 \u30A4\u3000 \\ ________________/\n\uFF0F\u3000\u3000\u3000\\\n/\u3000|\u3000\u3000\u3000 \\\n|\u3000|\u3000\u3000\u3000 | |\n")).call(_context3)][warning ? 1 : 0]);
};

export { Dialog as D };
