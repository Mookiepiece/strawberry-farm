<script lang="ts" setup>
// import { useScrollLock } from '@vueuse/core'
import { inBrowser } from 'vitepress'
import { ref, watch } from 'vue'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'
import VPSidebarItem from './VPSidebarItem.vue'

const { sidebarGroups } = useSidebar()

// const props = defineProps<{
//   open: boolean
// }>()

// // a11y: focus Nav element when menu has opened
// const navEl = ref<HTMLElement | null>(null)
// // const isLocked = useScrollLock(inBrowser ? document.body : null)

// watch(
//   [props, navEl],
//   () => {
//     if (props.open) {
//       // isLocked.value = true
//       navEl.value?.focus()
//     } else {
//       //  isLocked.value = false
//     }
//   },
//   { immediate: true, flush: 'post' }
// )
</script>

<template>
  <aside class="VPSidebar">
    <nav class="nav" id="VPSidebarNav" aria-label="Sidebar Navigation" tabindex="-1">
      <VPSidebarItem v-for="item in sidebarGroups" :key="item.text" :item="item" :depth="0" />
    </nav>
  </aside>
</template>

<style>
.VPSidebar {
  /* position: fixed; */
  /* top: var(--vp-layout-top-height, 0px); */
  /* bottom: 0; */
  /* left: 0; */
  z-index: 1;
  /* padding: 32px 32px 96px; */
  width: calc(100vw - 64px);
  max-width: 320px;
  /* background-color: var(--vp-sidebar-bg-color); */
  /* box-shadow: var(--vp-c-shadow-3); */
  overflow-x: hidden;
  overflow-y: auto;
}

/* .VPSidebar.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  transition: opacity 0.25s,
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.dark .VPSidebar {
  box-shadow: var(--vp-shadow-1);
}

@media (min-width: 960px) {
  .VPSidebar {
    padding-top: var(--vp-nav-height);
    width: var(--vp-sidebar-width);
    max-width: 100%;
    background-color: var(--vp-sidebar-bg-color);
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    transform: translateX(0);
  }
}

@media (min-width: 1440px) {
  .VPSidebar {
    padding-left: max(32px, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
    width: calc((100% - (var(--vp-layout-max-width) - 64px)) / 2 + var(--vp-sidebar-width) - 32px);
  }
} */

/* @media (min-width: 960px) {
  .curtain {
    position: sticky;
    top: -64px;
    left: 0;
    z-index: 1;
    margin-top: calc(var(--vp-nav-height) * -1);
    margin-right: -32px;
    margin-left: -32px;
    height: var(--vp-nav-height);
    background-color: var(--vp-sidebar-bg-color);
  }
} */
</style>