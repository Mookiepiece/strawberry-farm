/* eslint-disable react/display-name */
import React from 'react';
import loadable from '@loadable/component';
import type { DocRoute } from '@docs/utils/RouterView';

import Index from '@docs/pages';
import DocLayout from '@docs/layouts/DocLayout';

import SfIndex from '@docs/pages/components';
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
        path: '/components',
        component: () => (
          <DocLayout
            nav={{
              Components: {
                '/components/box': 'SidebarComponentBox',
                '/components/button': 'SidebarSfComponentButton',
                '/components/collapse': 'SidebarComponentCollapse',
                '/components/dialog': 'SidebarSfComponentDialog',
                '/components/farm': 'SidebarSfComponentFarm',
                '/components/form': 'SidebarComponentForm',
              },
            }}
          />
        ),
        children: [
          {
            path: '/components',
            exact: true,
            component: SfIndex,
          },
          {
            path: '/components/box',
            component: loadable(() => import('@docs/pages/components/Box')),
          },
          {
            path: '/components/button',
            component: loadable(() => import('@docs/pages/components/Button')),
          },
          {
            path: '/components/collapse',
            component: loadable(() => import('@docs/pages/components/Collapse')),
          },
          {
            path: '/components/dialog',
            component: loadable(() => import('@docs/pages/components/Dialog')),
          },
          {
            path: '/components/farm',
            component: loadable(() => import('@docs/pages/components/Farm')),
          },
          {
            path: '/components/form',
            component: loadable(() => import('@docs/pages/components/Form')),
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
