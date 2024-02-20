<script lang="ts" setup>
import { nextTick } from 'vue';
import { MemoryLightbulb as path } from '@pictogrammers/memory/src/icons';
import VPSidebarItem from './VPSidebarItem.vue';
import { useData } from './composables';

const { theme, isDark } = useData();

// https://github.com/vuejs/vitepress/blob/20511006dba516ca8c06ed1dd3516547af668a0e/docs/zh/guide/extending-default-theme.md?plain=1#L236
const enableTransitions =
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

const toggleTheme = async (e: MouseEvent) => {
  if (!enableTransitions) {
    isDark.value = !isDark.value;
    return;
  }

  const [x, y] = [e.clientX, e.clientY];

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  await (document as any).startViewTransition?.(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  );
};

const sidebarGroups = theme.value.sidebar;
</script>

<template>
  <aside class="VPSidebar [#]">
    <div class="VPSidebarBody">
      <div class="QuickAccess">
        <button
          id="VPAppearanceToggle"
          class="mat:ruby"
          :aria-pressed="isDark"
          @click="toggleTheme"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path :d="path" />
          </svg>
        </button>
      </div>
      <nav
        class="nav"
        id="VPSidebarNav"
        aria-label="Sidebar Navigation"
        tabindex="-1"
      >
        <VPSidebarItem
          v-for="item in sidebarGroups"
          :key="item.text"
          :item="item"
          :depth="0"
        />
      </nav>
    </div>
  </aside>
</template>

<style>
.VPSidebar {
  z-index: 1;
  padding-top: 50px;
  border-right: 1px solid var(--DVD);
  overflow: clip auto;
  transition: transform 0.3s;
}

/* No Shrink when collapsing in small screen */
.VPSidebarBody{
  width: 300px;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.QuickAccess {
  padding: 10px 30px;
  button {
    padding: 10px 20px;
    border-radius: 10px;
  }
}

#VPAppearanceToggle {
  border: 2px solid var(--DVD);

  svg {
    display: block;
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
}
/* 
@media not (min-width: 1300px) {
  .VPSidebar {
    transform: translateX(-100%);
  }
} */
</style>
