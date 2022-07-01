/* eslint-disable react/display-name */
import React from 'react';
import loadable from '@loadable/component';
import type { DocRoute } from '@docs/utils/RouterView';

import DocLayout from '@docs/layouts/DocLayout';

import AppLayout from '@docs/layouts/AppLayout';

export default [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/home',
        exact: true,
        component: loadable(() => import('@docs/pages/home')),
      },
      {
        path: '/docs',
        component: () => (
          <DocLayout
            nav={{
              Components: {
                '/docs/box': 'SidebarComponentBox',
                '/docs/button': 'SidebarComponentButton',
                '/docs/collapse': 'SidebarComponentCollapse',
                '/docs/dialog': 'SidebarComponentDialog',
                '/docs/farm': 'SidebarSfComponentFarm',
                '/docs/form': 'SidebarComponentForm',
              },
              Utils: {
                '/docs/versionedStorage': 'SidebarUtilsVersionedStorage',
                '/docs/zustand': 'SidebarUtilsZustand',
              },
              About: {
                '/docs/about/guide': 'SidebarAboutGuide',
                '/docs/about/contribute': 'SidebarAboutDevelopmentGuide',

              },
            }}
          />
        ),
        children: [
          {
            path: '/docs',
            exact: true,
            redirect: '/docs/box',
          },
          {
            path: '/docs/box',
            component: loadable(() => import('@docs/pages/docs/Box')),
          },
          {
            path: '/docs/button',
            component: loadable(() => import('@docs/pages/docs/Button')),
          },
          {
            path: '/docs/collapse',
            component: loadable(() => import('@docs/pages/docs/Collapse')),
          },
          {
            path: '/docs/dialog',
            component: loadable(() => import('@docs/pages/docs/Dialog')),
          },
          {
            path: '/docs/farm',
            component: loadable(() => import('@docs/pages/docs/Farm')),
          },
          {
            path: '/docs/form',
            component: loadable(() => import('@docs/pages/docs/Form')),
          },
          {
            path: '/docs/versionedStorage',
            component: loadable(() => import('@docs/pages/docs/VersionedStorage')),
          },
          {
            path: '/docs/zustand',
            component: loadable(() => import('@docs/pages/docs/Zustand')),
          },
          {
            path: '/docs/about/guide',
            component: loadable(() => import('@docs/pages/about/guide')),
          },
          {
            path: '/docs/about/contribute',
            component: loadable(() => import('@docs/pages/about/contribute')),
          },
        ],
      },
      {
        path: '/',
        exact: true,
        redirect: '/home',
      },
    ],
  },
] as DocRoute[];
