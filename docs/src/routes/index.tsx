/* eslint-disable react/display-name */
import React from 'react';
import loadable from '@loadable/component';
import type { DocRoute } from '@docs/utils/RouterView';

import Index from '@docs/pages';
import DocLayout from '@docs/layouts/DocLayout';

import SfIndex from '@docs/pages/sf-components';
import StIndex from '@docs/pages/st-components';
import AppLayout from '@docs/layouts/AppLayout';

export default [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/index',
        exact: true,
        component: Index,
      },
      {
        path: '/sf-components',
        component: () => (
          <DocLayout
            nav={{
              Components: {
                '/sf-components/button': 'SidebarSfComponentButton',
                '/sf-components/dialog': 'SidebarSfComponentDialog',
                '/sf-components/farm': 'SidebarSfComponentFarm',
              },
            }}
          />
        ),
        children: [
          {
            path: '/sf-components',
            exact: true,
            component: SfIndex,
          },
          {
            path: '/sf-components/button',
            component: loadable(() => import('@docs/pages/sf-components/Button')),
          },
          {
            path: '/sf-components/dialog',
            component: loadable(() => import('@docs/pages/sf-components/Dialog')),
          },
          {
            path: '/sf-components/farm',
            component: loadable(() => import('@docs/pages/sf-components/Farm')),
          },
        ],
      },
      {
        path: '/st-components',
        component: () => (
          <DocLayout
            nav={{
              Design: {
                '/st-components/color': 'SidebarStDesignColor',
                '/st-components/layout': 'SidebarStDesignLayout',
              },
              Components: {
                '/st-components/button': 'SidebarStComponentButton',
                '/st-components/collapse': 'SidebarStComponentCollapse',
                '/st-components/form': 'SidebarStComponentForm',
                '/st-components/link': 'SidebarStComponentLink',
                '/st-components/modal': 'SidebarStComponentModal',
                '/st-components/notification': 'SidebarStComponentNotification',
                '/st-components/spin': 'SidebarStComponentSpin',
                '/st-components/scroll-view': 'SidebarStComponentScroll',
                '/st-components/slider': 'SidebarStComponentSlider',
                '/st-components/popper': 'SidebarStComponentPopper',
                '/st-components/select': 'SidebarStComponentSelect',
              },
            }}
          />
        ),
        children: [
          {
            path: '/st-components',
            exact: true,
            component: StIndex,
          },
          {
            path: '/st-components/color',
            component: loadable(() => import('@docs/pages/st-components/Color')),
          },
          {
            path: '/st-components/layout',
            component: loadable(() => import('@docs/pages/st-components/Layout')),
          },
          {
            path: '/st-components/collapse',
            component: loadable(() => import('@docs/pages/st-components/Collapse')),
          },
          {
            path: '/st-components/form',
            component: loadable(() => import('@docs/pages/st-components/Form')),
          },
          {
            path: '/st-components/button',
            component: loadable(() => import('@docs/pages/st-components/Button')),
          },
          {
            path: '/st-components/link',
            component: loadable(() => import('@docs/pages/st-components/Link')),
          },
          {
            path: '/st-components/modal',
            component: loadable(() => import('@docs/pages/st-components/Modal')),
          },
          {
            path: '/st-components/notification',
            component: loadable(() => import('@docs/pages/st-components/Notification')),
          },
          {
            path: '/st-components/spin',
            component: loadable(() => import('@docs/pages/st-components/Spin')),
          },
          {
            path: '/st-components/scroll-view',
            component: loadable(() => import('@docs/pages/st-components/ScrollView')),
          },
          {
            path: '/st-components/slider',
            component: loadable(() => import('@docs/pages/st-components/Slider')),
          },
          {
            path: '/st-components/popper',
            component: loadable(() => import('@docs/pages/st-components/Popper')),
          },
          {
            path: '/st-components/select',
            component: loadable(() => import('@docs/pages/st-components/Select')),
          },
        ],
      },
      {
        path: '/',
        exact: true,
        redirect: '/index',
      },
    ],
  },
] as DocRoute[];
