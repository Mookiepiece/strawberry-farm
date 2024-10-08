import 'vitepress/dist/client/theme-default/styles/vars.css';
import '../../../strawberry-farm/design/index.css';
import '../../../strawberry-farm/css/index.scss';

import Layout from './VPLayout.vue';
import VPDemo from '../VPDemo.vue';
import VPSource from '../VPSource.vue';
import { Theme } from 'vitepress';

import './vp-doc.css';
import './custom.css';
import './VPKbdElement.css';

if (!import.meta.env.SSR) {
  import('@mookiepiece/strawberry-farm/html/IFeatherElement').then(
    ({ IFeatherElement }) => IFeatherElement.install(),
  );

  import('@mookiepiece/strawberry-farm/html/ToastBarElement').then(
    ({ ToastBarElement }) => {
      ToastBarElement.install();
    },
  );

  import('@mookiepiece/strawberry-farm/html/IEdgeElement').then(
    ({ IEdgeElement }) => {
      IEdgeElement.install();
    },
  );

  import('./VPKbdElement').then(({ VPKbdElement }) => {
    customElements.define('vp-kbd', VPKbdElement);
  });
}

const theme: Theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component('VPDemo', VPDemo);
    app.component('VPSource', VPSource);
  },
};
export default theme;
