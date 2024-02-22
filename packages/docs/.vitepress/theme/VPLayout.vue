<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { on } from '../../../strawberry-farm/functions';
import VPOutline from './VPOutline.vue';
import VPSidebar from './VPSidebar.vue';

// https://github.com/vuejs/vitepress/blob/20511006dba516ca8c06ed1dd3516547af668a0e/src/client/app/router.ts#L161
// Scroll section into view when click hash link (Original code don't work because our doc don't allow body scrolling)
let off = () => {};
onMounted(() => {
  // NOTE: Ctrl key opens the link in new tab.
  off = on(document.body).click.exact(e => {
    const anchor = e.target instanceof HTMLElement && e.target.closest('a');

    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href?.startsWith('#')) {
        const target = document.getElementById(href.slice(1));

        requestAnimationFrame(() => {
          // Don't know why this won't work if we don't schedule it in a callback.
          target?.scrollIntoView({
            behavior: target.contains(anchor) ? 'smooth' : 'auto',
          });
        });
      }
    }
  });
});

onUnmounted(() => off());
</script>

<template>
  <div class="VPLayout">
    <VPSidebar />
    <Content class="VPContent [A] vp-doc p-6 ww:p-8" />
    <VPOutline />
  </div>
</template>

<style>
.VPLayout {
  position: relative;
  display: grid;
  grid-template: 1fr/300px 1fr 166px;
  height: 100vh;
  overflow: hidden;
  transition: all 0.3s;
}

.VPContent {
  overflow: auto;

  > div {
    width: min(800px, 100%);
    margin-inline: auto;
  }
}

@media not (min-width: 1000px) {
  .VPLayout {
    grid-template: 1fr/0 1fr 0;
  }
}
</style>
