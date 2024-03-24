import { defineConfig } from 'vitepress';
import { mdPlugin } from './mdPlugins';
import path from 'node:path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Strawberry Farm',
  description: 'Web Development Notes',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  srcDir: './examples',
  markdown: {
    config: mdPlugin,
  },
  vite: {
    resolve: {
      alias: {
        '@mookiepiece/strawberry-farm': path.resolve(__dirname, '../../strawberry-farm'),
      },
    },
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
