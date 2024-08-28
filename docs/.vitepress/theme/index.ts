import 'vitepress/dist/client/theme-default/styles/vars.css';
import '../../../strawberry-farm/design/index.css';
import '../../../strawberry-farm/css/index.scss';

import Layout from './VPLayout.vue';
import VPDemo from '../VPDemo.vue';
import { onContentUpdated, Theme } from 'vitepress';

import './vp-doc.css';
import './custom.css';
import './VPKbd.css';

if (!import.meta.env.SSR) {
  import('@mookiepiece/strawberry-farm/html/IFeatherElement').then(
    ({ IFeatherElement }) => IFeatherElement.install(),
  );

  import('@mookiepiece/strawberry-farm/html/ToastBarElement').then(
    ({ ToastBarElement }) => {
      ToastBarElement.install();
    },
  );

  import('./VPKbd').then(({ VPKbdElement }) => {
    customElements.define('vp-kbd', VPKbdElement);
  });
}

const theme: Theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component('VPDemo', VPDemo);
  },
};
export default theme;
