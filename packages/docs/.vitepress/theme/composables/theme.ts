import { useData as useData$ } from 'vitepress';

export type LinkItem = {
  text: string;
  link: string;
  target?: string
  rel?: string
};
export type LinkGroup = {
  text: string;
  items: (LinkItem | LinkGroup)[];
};

export type ThemeConfig = {
  nav: LinkItem;
  sidebar: LinkGroup[];
};

export const useData: typeof useData$<ThemeConfig> = useData$;
