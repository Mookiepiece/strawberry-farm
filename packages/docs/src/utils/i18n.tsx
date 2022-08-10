import React, { Dispatch, SetStateAction } from 'react';
export type Language = 'zh' | 'en';

export type I18nKeys = `🗺️${string}`;

const a: Record<
  string,
  {
    en: string;
    zh: string;
  }
> = {
  IndexPageDesc: {
    en: '🍓🌱🌱🌱',
    zh: '🍓🌱🌱🌱',
  },
  IndexPageGetStarted: {
    en: 'GET STARTED',
    zh: '开始使用',
  },
  SidebarComponentBox: {
    en: 'Box',
    zh: 'Box 波克斯',
  },
  SidebarComponentButton: {
    en: 'Button',
    zh: 'Button 按钮',
  },
  SidebarComponentCollapse: {
    en: 'Collapse',
    zh: 'Collapse 折叠面板',
  },
  SidebarComponentDialog: {
    en: 'Dialog',
    zh: 'Dialog 对话框',
  },
  SidebarSfComponentFarm: {
    en: 'Farm',
    zh: 'Farm 农场',
  },
  SidebarComponentForm: {
    en: 'Form',
    zh: 'Form 表单',
  },
  SidebarComponentPopper: {
    en: 'Popper',
    zh: 'Popper 弹层',
  },
  SidebarComponentPopover: {
    en: 'Popover',
    zh: 'Popover 弹出',
  },
  SidebarComponentSelect: {
    en: 'Select',
    zh: 'Select 选择器',
  },
  SidebarComponentNotification: {
    en: 'Notification 通知',
    zh: 'Notification 通知',
  },
  SidebarUtilsVersionedStorage: {
    en: 'Versioned Storage',
    zh: 'Versioned Storage',
  },
  SidebarUtilsZustand: {
    en: 'Zustand',
    zh: 'Zustand',
  },
  SidebarUtilsMitt: {
    en: 'Mitt',
    zh: 'Mitt',
  },
  SidebarUtilsUseSingletonAsyncFn: {
    en: 'useSingletonAsyncFn',
    zh: 'useSingletonAsyncFn',
  },
  SidebarUtilsUseEventCallback: {
    en: 'useEventCallback',
    zh: 'useEventCallback',
  },
  SidebarUtilsUseClickAway: {
    en: 'useClickAway',
    zh: 'useClickAway',
  },
  SidebarAboutGuide: {
    en: 'Guide',
    zh: '指南',
  },
  SidebarAboutDevelopmentGuide: {
    en: 'Development Guide',
    zh: '开发指南',
  },
  SidebarComponentSpin: {
    en: 'Spin 加载符',
    zh: 'Spin 加载符',
  },
  // SidebarStComponentDialog: {
  //   en: 'Dialog 对话框',
  //   zh: 'Dialog 对话框',
  // },

  // SidebarStComponentScroll: {
  //   en: 'Scroll 滚动',
  //   zh: 'Scroll 滚动',
  // },
  // SidebarStComponentSlider: {
  //   en: 'Slider 滑块',
  //   zh: 'Slider 滑块',
  // },

  // SidebarStDesignColor: {
  //   en: 'Color 色彩',
  //   zh: 'Color 色彩',
  // },
  // SidebarStDesignLayout: {
  //   en: 'Layout 布局',
  //   zh: 'Layout 布局',
  // },
};

export const loadedLang = new Map();

export const loadLang: (lang: Language) => Record<I18nKeys, string> = lang => {
  if (loadedLang.has(lang)) {
    return loadedLang.get(lang) as Record<I18nKeys, string>;
  }
  const rec: Record<I18nKeys, string> = Object.keys(a).reduce(
    (r, k) => ({ ...r, ['🗺️' + k]: a[k as I18nKeys][lang] }),
    {}
  ) as Record<I18nKeys, string>;
  const rec2 = new Proxy(rec, {
    get(target, p, receiver) {
      if (typeof p === 'string') {
        if (p.startsWith('🗺️')) {
          return target[p as any];
        }
        return p;
      }
    },
  });
  loadedLang.set(lang, rec2);
  return rec2;
};

export const i18nContext = React.createContext<Record<string, string>>(loadLang('zh'));
export const i18nStateContext = React.createContext<[Language, Dispatch<SetStateAction<Language>>]>(
  ['zh', () => []]
);
