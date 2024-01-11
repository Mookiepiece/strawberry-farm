import { defineConfig } from 'vitepress';
import { mdPlugin } from './mdPlugins';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/css/Intro' },
    ],
    outline: 'deep',

    sidebar: [
      {
        text: 'CSS',
        items: [
          { text: 'Intro', link: '/css/Intro' },
          { text: 'Reset', link: '/css/Reset' },
          { text: 'Breakpoints', link: '/css/Breakpoints' },
          { text: 'Flexbox', link: '/css/Flexbox' },
          { text: 'Typography', link: '/css/Typography' },
          { text: 'Spacing', link: '/css/Spacing' },
          { text: 'Positioning', link: '/css/Positioning' },
        ],
      },
      {
        text: 'Learn',
        items: [
          { text: 'Intro', link: '/learn/Intro' },
          { text: 'BoxModel', link: '/learn/BoxModel' },
          { text: 'Overflow', link: '/learn/Overflow' },
          { text: 'Sizing', link: '/learn/Sizing' },
          { text: 'Background', link: '/learn/Background' },
          { text: 'Form', link: '/learn/Form' },
        ],
      },
      {
        text: 'Experiments',
        items: [
          { text: 'Swipe', link: '/Swipe' },
        ],
      },
      {
        text: 'Untitled',
        items: [
          { text: 'Hello', link: '/Hello' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  markdown: {
    config: mdPlugin
  },
  vue :{
    template: {
      compilerOptions: {
        isCustomElement(s) {
          return s.includes('-')
        }
      }
    }
  }
});
