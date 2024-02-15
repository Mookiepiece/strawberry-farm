import 'vitepress/dist/client/theme-default/styles/vars.css';
import '../../../strawberry-farm/css/index.scss';
import '../../../strawberry-farm/design/index.css';

import Layout from './Layout.vue';
import VPDemo from '../VPDemo.vue';
import { Theme } from 'vitepress';

import './vp-doc.css';
import './custom.css';
const theme: Theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component('VPDemo', VPDemo);
  },
};
export default theme;
