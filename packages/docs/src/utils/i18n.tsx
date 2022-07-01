import React, { Dispatch, SetStateAction } from 'react';
export type Language = 'zh' | 'en';

export type I18nKeys =
  | 'IndexPageDesc'
  | 'IndexPageGetStarted'
  | 'NavbarHome'
  | 'NavbarSfComponents'
  | 'SidebarComponentButton'
  | 'SidebarComponentBox'
  | 'SidebarComponentCollapse'
  | 'SidebarComponentDialog'
  | 'SidebarSfComponentFarm'
  | 'SidebarComponentForm'
  | 'SidebarUtilsVersionedStorage'
  | 'SidebarUtilsZustand'
  | 'SidebarAboutDevelopmentGuide'
  | 'SidebarAboutGuide'
  | 'SidebarComponentSpin'
  | 'SidebarStComponentDialog'
  | 'SidebarStComponentModal'
  | 'SidebarStComponentNotification'
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
    en: 'Unobtrusive park.',
    zh: '开垦乐园',
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
    en: 'Strawberry Farm',
    zh: 'Strawberry Farm',
  },
  SidebarComponentBox: {
    en: 'Box 波克斯',
    zh: 'Box 波克斯',
  },
  SidebarComponentButton: {
    en: 'Button 按钮',
    zh: 'Button 按钮',
  },
  SidebarComponentCollapse: {
    en: 'Collapse 折叠面板',
    zh: 'Collapse 折叠面板',
  },
  SidebarComponentDialog: {
    en: 'Dialog 对话框',
    zh: 'Dialog 对话框',
  },
  SidebarSfComponentFarm: {
    en: 'Farm 农场',
    zh: 'Farm 农场',
  },
  SidebarComponentForm: {
    en: 'Form 表单',
    zh: 'Form 表单',
  },
  SidebarUtilsVersionedStorage: {
    en: 'VersionedStorage 版本储存',
    zh: 'VersionedStorage 版本储存',
  },
  SidebarUtilsZustand: {
    en: 'Zustand 状态',
    zh: 'Zustand 状态',
  },
  SidebarAboutGuide: {
    en: 'Guide 指南',
    zh: 'Guide 指南',
  },
  SidebarAboutDevelopmentGuide: {
    en: 'DevelopmentGuide 开发指南',
    zh: 'DevelopmentGuide 开发指南',
  },
  SidebarComponentSpin: {
    en: 'Spin 加载符',
    zh: 'Spin 加载符',
  },
  SidebarStComponentDialog: {
    en: 'Dialog 对话框',
    zh: 'Dialog 对话框',
  },
  SidebarStComponentModal: {
    en: 'Modal 模态框',
    zh: 'Modal 模态框',
  },
  SidebarStComponentNotification: {
    en: 'Notification 通知',
    zh: 'Notification 通知',
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
