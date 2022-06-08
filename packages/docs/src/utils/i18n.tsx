import React, { Dispatch, SetStateAction } from 'react';
export type Language = 'zh' | 'en';

export type I18nKeys =
  | 'IndexPageDesc'
  | 'IndexPageGetStarted'
  | 'NavbarHome'
  | 'NavbarSfComponents'
  | 'SidebarSfComponentButton'
  | 'SidebarComponentLink'
  | 'SidebarComponentBox'
  | 'SidebarComponentSpin'
  | 'SidebarSfComponentDialog'
  | 'SidebarSfComponentFarm'
  | 'SidebarComponentForm'
  | 'SidebarStComponentButton'
  | 'SidebarStComponentDialog'
  | 'SidebarStComponentModal'
  | 'SidebarComponentCollapse'
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
  SidebarComponentLink: {
    en: 'Link 链接',
    zh: 'Link 链接',
  },
  SidebarComponentBox: {
    en: 'Box 波克斯',
    zh: 'Box 波克斯',
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
  SidebarComponentCollapse: {
    en: 'Collapse 折叠面板',
    zh: 'Collapse 折叠面板',
  },
  SidebarComponentForm: {
    en: 'Form 表单',
    zh: 'Form 表单',
  },
  SidebarStComponentNotification: {
    en: 'Notification 通知提示',
    zh: 'Notification 通知提示',
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
