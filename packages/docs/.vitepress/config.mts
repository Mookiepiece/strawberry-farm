import { defineConfig } from 'vitepress';
import { mdPlugin } from './mdPlugins';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Strawberry Farm',
  description: 'Web Development Notes',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  markdown: {
    config: mdPlugin,
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement(s) {
          return s.includes('-');
        },
      },
    },
  },
});
