import React, { Dispatch, SetStateAction } from 'react';
export type Language = 'zh' | 'en';

export type I18nKeys =
  | 'IndexPageDesc'
  | 'IndexPageGetStarted'
  | 'NavbarHome'
  | 'NavbarSfComponents'
  | 'NavbarStComponents'
  | 'SidebarSfComponentButton'
  | 'SidebarSfComponentDialog'
  | 'SidebarSfComponentFarm'
  | 'SidebarStComponentButton'
  | 'SidebarStComponentDialog'
  | 'SidebarStComponentModal'
  | 'SidebarStComponentCollapse'
  | 'SidebarStComponentForm'
  | 'SidebarStComponentLink'
  | 'SidebarStComponentNotification'
  | 'SidebarStComponentSpin'
  | 'SidebarStComponentScroll'
  | 'SidebarStComponentSlider'
  | 'SidebarStComponentPopper'
  | 'SidebarStComponentSelect'
  | 'SidebarStDesignColor'
  | 'SidebarStDesignLayout';

const a: Record<
  I18nKeys,
  {
    en: string;
    zh: string;
  }
> = {
  IndexPageDesc: {
    en: 'vanilla react.js components.',
    zh: '自然的react.js组件库',
  },
  IndexPageGetStarted: {
    en: 'GET STARTED',
    zh: '开始使用',
  },
  NavbarHome: {
    en: 'Home',
    zh: '家',
  },
  NavbarSfComponents: {
    en: 'Strawberry Fury',
    zh: 'Strawberry Fury',
  },
  NavbarStComponents: {
    en: 'Starfall',
    zh: 'Starfall',
  },
  SidebarSfComponentButton: {
    en: 'Button 按钮',
    zh: 'Button 按钮',
  },
  SidebarSfComponentDialog: {
    en: 'Dialog 对话框',
    zh: 'Dialog 对话框',
  },
  SidebarSfComponentFarm: {
    en: 'Farm 农场',
    zh: 'Farm 农场',
  },
  SidebarStComponentButton: {
    en: 'Button 按钮',
    zh: 'Button 按钮',
  },
  SidebarStComponentDialog: {
    en: 'Dialog 对话框',
    zh: 'Dialog 对话框',
  },
  SidebarStComponentModal: {
    en: 'Modal 模态框',
    zh: 'Modal 模态框',
  },
  SidebarStComponentCollapse: {
    en: 'Collapse 折叠面板',
    zh: 'Collapse 折叠面板',
  },
  SidebarStComponentForm: {
    en: 'Form 表单',
    zh: 'Form 表单',
  },
  SidebarStComponentLink: {
    en: 'Link 链接',
    zh: 'Link 链接',
  },
  SidebarStComponentNotification: {
    en: 'Notification 通知提示',
    zh: 'Notification 通知提示',
  },
  SidebarStComponentSpin: {
    en: 'Spin 加载符',
    zh: 'Spin 加载符',
  },
  SidebarStComponentScroll: {
    en: 'Scroll 滚动',
    zh: 'Scroll 滚动',
  },
  SidebarStComponentSlider: {
    en: 'Slider 滑块',
    zh: 'Slider 滑块',
  },
  SidebarStComponentPopper: {
    en: 'Popper 弹层',
    zh: 'Popper 弹层',
  },
  SidebarStComponentSelect: {
    en: 'Select 选择器',
    zh: 'Select 选择器',
  },
  SidebarStDesignColor: {
    en: 'Color 色彩',
    zh: 'Color 色彩',
  },
  SidebarStDesignLayout: {
    en: 'Layout 布局',
    zh: 'Layout 布局',
  },
};

export const mmm = new Map();

export const getCowboy: (lang: Language) => Record<I18nKeys, string> = lang => {
  if (mmm.has(lang)) {
    return mmm.get(lang) as Record<I18nKeys, string>;
  }
  const r: Record<I18nKeys, string> = Object.keys(a).reduce(
    (r, k) => ({ ...r, [k]: a[k as I18nKeys][lang] }),
    {}
  ) as Record<I18nKeys, string>;
  mmm.set(lang, r);
  return r;
};

export const i18nContext = React.createContext<Record<I18nKeys, string>>(getCowboy('zh'));
export const i18nStateContext = React.createContext<[Language, Dispatch<SetStateAction<Language>>]>(
  ['zh', () => []]
);
