import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

var starfallModalRoot = null;
var starfallNotificationRoot = null;
var setup = function setup(key) {
  if (!starfallModalRoot || !starfallNotificationRoot) {
    starfallModalRoot = document.createElement('div');
    starfallModalRoot.style.position = 'fixed';
    starfallModalRoot.style.height = '0';
    starfallModalRoot.style.top = '0';
    starfallModalRoot.classList.add('starfallModalRoot');
    document.body.appendChild(starfallModalRoot);
    starfallNotificationRoot = document.createElement('div');
    starfallNotificationRoot.style.position = 'fixed';
    starfallNotificationRoot.style.height = '0';
    starfallNotificationRoot.style.top = '0';
    starfallNotificationRoot.classList.add('starfallNotificationRoot');
    document.body.appendChild(starfallNotificationRoot);
  }

  return {
    BlankChannel: starfallNotificationRoot,
    Modal: starfallModalRoot,
    Notification: starfallNotificationRoot
  }[key];
};
var Portal = function Portal(_ref) {
  var children = _ref.children;
  var isMounted = useMountedStatePlus();
  return isMounted ? /*#__PURE__*/ReactDOM.createPortal(children, setup('Modal')) : null;
};
var NotificationPortal = function NotificationPortal(_ref2) {
  var children = _ref2.children;
  var isMounted = useMountedStatePlus();
  return isMounted ? /*#__PURE__*/ReactDOM.createPortal(children, setup('Notification')) : null;
};
var useMountedStatePlus = function useMountedStatePlus() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  useEffect(function () {
    setState(true);
  }, []);
  return state;
};

export { NotificationPortal as N, Portal as P, setup as s, useMountedStatePlus as u };
