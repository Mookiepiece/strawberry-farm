import { useData as useData$ } from 'vitepress';
import { shallowRef } from 'vue';

export type LinkItem = {
  text: string;
  link: string;
  exact?: boolean;
  target?: string;
  rel?: string;
};
export type LinkGroup = {
  text: string;
  items: (LinkItem | LinkGroup)[];
};

export type ThemeConfig = {
  sidebar: LinkGroup[];
};

const theme = shallowRef<ThemeConfig>({
  sidebar: [
    {
      text: 'Intro',
      items: [
        { text: 'Home', link: '/', exact: true },
        { text: 'Guide', link: '/Guide' },
      ],
    },
    {
      text: 'CSS',
      items: [
        { text: 'Intro', link: '/css/Intro' },
        { text: 'Reset', link: '/css/Reset' },
        { text: 'Breakpoints', link: '/css/Breakpoints' },
        { text: 'Flexbox', link: '/css/Flexbox' },
        { text: 'Typography', link: '/css/Typography' },
        { text: 'Box', link: '/css/Box' },
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
      text: 'Design',
      items: [
        { text: 'Color', link: '/design/Color' },
        { text: 'Typography', link: '/design/Typography' },
        { text: 'Sizing', link: '/design/Sizing' },
        { text: 'Interaction', link: '/design/Interaction' },
        { text: 'Collapse', link: '/design/Collapse' },
      ],
    },
    {
      text: 'Components',
      items: [
        { text: 'Button', link: '/components/Button' },
        { text: 'Input', link: '/components/Input' },
        { text: 'Select', link: '/components/Select' },
        { text: 'RadioGroup', link: '/components/RadioGroup' },
        { text: 'Form', link: '/components/Form' },
        { text: 'Table', link: '/components/Table' },
        { text: 'Toast', link: '/components/Toast' },
        { text: 'Trap', link: '/components/Trap' },
        { text: 'Modal', link: '/components/Modal' },
        { text: 'Levitate', link: '/components/Levitate' },
        { text: 'Icon', link: '/components/Icon' },
        { text: 'FX', link: '/components/FX' },
      ],
    },
    {
      text: 'Experiments',
      items: [{ text: 'Swipe', link: '/experiments/Swipe' }],
    },
    {
      text: 'Examples',
      items: [{ text: 'Example', link: '/examples/Example' }],
    },
  ],
});

export const useData: typeof useData$ = () => {
  const data = useData$();
  // FIXME: Typescript HACK
  return { ...data, theme: theme as any };
};
