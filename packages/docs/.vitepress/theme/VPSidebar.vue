<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import {
  MemoryLightbulb,
  MemoryFormatBold,
} from '@pictogrammers/memory/src/icons';
import VPSidebarItem from './VPSidebarItem.vue';
import { useData } from './composables';

const props = defineProps<{
  open:boolean
}>()

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
      easing: 'cubic-bezier(0.66, 0, 0, 1)',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  );
};

const isToggledFontFamily = ref(!!sessionStorage.getItem('VPBodyDefaultFont'));
watch(isToggledFontFamily, is => {
  is
    ? sessionStorage.setItem('VPBodyDefaultFont', '1')
    : sessionStorage.removeItem('VPBodyDefaultFont');
});
watch(isToggledFontFamily, is => {
  is
    ? document.body.classList.add('VPBodyDefaultFont')
    : document.body.classList.remove('VPBodyDefaultFont');
});

const sidebarGroups = theme.value.sidebar;

// Volar bug
const _isDark = computed(() => isDark.value);
</script>

<template>
  <aside class="VPSidebar [#]" :class="[props.open && 'open']">
    <div class="QuickAccess">
      <button
        class="mat:dust"
        title="切换深色模式"
        :aria-pressed="_isDark"
        @click="toggleTheme"
      >
        <svg viewBox="0 0 22 22">
          <path :d="MemoryLightbulb" />
        </svg>
      </button>
      <button
        class="mat:dust"
        title="切换默认字体（调试用，思源在相同行高下汉字的位置会偏下一点）"
        :aria-pressed="isToggledFontFamily"
        @click="isToggledFontFamily = !isToggledFontFamily"
      >
        <svg viewBox="0 0 22 22">
          <path :d="MemoryFormatBold" />
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
  </aside>
</template>

<style>
.VPSidebar {
  position: absolute;
  inset: 0;
  width: 300px;
  z-index: 1;
  padding-top: 50px;
  border-right: 1px solid var(--mat-solid-15);
  background-color: var(--mat-solid-0);
  overflow: clip auto;
}

@media not (min-width: 1000px) {
  .VPSidebar:not(.open) {
    display: none;
  }
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
  display: grid;
  grid: auto-flow 1fr / repeat(auto-fill, minmax(60px, 1fr));
  gap: 5px;
  padding: 10px 30px;

  button {
    padding: 10px 20px;
    border-radius: 5px;
    border: 0;

    svg {
      margin: auto;
      display: block;
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  }
}
</style>
