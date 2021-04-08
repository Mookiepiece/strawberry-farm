import React, { Dispatch, SetStateAction } from 'react';
export type Language = 'zh' | 'en';

export type I18nKeys =
  | 'IndexPageDesc'
  | 'IndexPageGetStarted'
  | 'NavbarHome'
  | 'NavbarSfComponents'
  | 'NavbarStComponents'
  | 'SidebarStComponentButton'
  | 'SidebarStComponentDialog'
  | 'SidebarStComponentModal'
  | 'SidebarStComponentCollapse'
  | 'SidebarStComponentForm'
  | 'SidebarStComponentLink'
  | 'SidebarStComponentNotification'
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
