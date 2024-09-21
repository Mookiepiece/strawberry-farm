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
      ],
    },
    {
      text: 'Learn',
      items: [
        { text: 'Intro', link: '/learn/Intro' },
        { text: 'Overflow', link: '/learn/Overflow' },
        { text: 'Sizing', link: '/learn/Sizing' },
        { text: 'Form', link: '/learn/Form' },
      ],
    },
    {
      text: 'Patterns',
      items: [{ text: 'Listbox', link: '/patterns/Listbox' }],
    },
    {
      text: 'Components',
      items: [
        { text: 'Radios', link: '/components/Radios' },
        { text: 'Segmented', link: '/components/Segmented' },
        { text: 'Levitate', link: '/components/Levitate' },
        { text: 'Popover', link: '/components/Popover' },
        { text: 'Table', link: '/components/Table' },
      ],
    },
    {
      text: 'Design',
      items: [
        { text: 'Color', link: '/design/Color' },
        { text: 'Typography', link: '/design/Typography' },
        { text: 'Collapse', link: '/design/Collapse' },
        { text: 'Alert', link: '/design/Alert' },
        { text: 'Button', link: '/design/Button' },
        { text: 'Input', link: '/design/Input' },
        { text: 'Select', link: '/design/Select' },
        { text: 'Tree', link: '/design/Tree' },
        { text: 'Switch', link: '/design/Switch' },
        { text: 'Form', link: '/design/Form' },
        { text: 'Farm', link: '/design/Farm' },
        { text: 'Toast', link: '/design/Toast' },
        { text: 'Trap', link: '/design/Trap' },
        { text: 'Modal', link: '/design/Modal' },
        { text: 'Lift', link: '/design/Lift' },
        { text: 'Icon', link: '/design/Icon' },
        { text: 'FX', link: '/design/FX' },
      ],
    },
    {
      text: 'Experiments',
      items: [
        { text: 'Experiments', link: '/experiments/Experiments' },
        { text: 'Swipe', link: '/experiments/Swipe' },
      ],
    },
    {
      text: 'Examples',
      items: [{ text: 'Example', link: '/examples/Example' }],
    },
    {
      text: 'Misc',
      items: [{ text: 'Paints', link: '/misc/Paints' }],
    },
  ],
});

export const useData: typeof useData$ = () => {
  const data = useData$();
  // FIXME: Typescript HACK
  return { ...data, theme: theme as any };
};
