<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { Bag, on } from '../../../strawberry-farm/functions';
import VPOutline from './VPOutline.vue';
import VPSidebar from './VPSidebar.vue';
import VPNav from './VPNav.vue';
import { useData } from './composables';

const { site, frontmatter } = useData();

const full = computed(() => frontmatter.value.layout === 'full');

// https://github.com/vuejs/vitepress/blob/20511006dba516ca8c06ed1dd3516547af668a0e/src/client/app/router.ts#L161
// Scroll section into view when click hash link (Original code don't work because our doc don't allow body scrolling)
let bag = Bag();

onMounted(() => {
  document.body.classList.add('tone:rasp');
  bag(() => {
    document.body.classList.remove('tone:rasp');
  });
});
onUnmounted(() => bag());

onMounted(() => {
  // NOTE: Ctrl key opens the link in new tab.
  bag(
    on(document.body).click.exact(e => {
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
    }),
  );
});
</script>

<template>
  <div class="VPLayout">
    <VPNav
      :features="full ? ['sidebar'] : ['sidebar', 'outline']"
      @sidebar=""
    />
    <VPSidebar />
    <div v-if="full" class="VPMain">full</div>
    <div v-else class="VPMain">
      <Content class="VPContent [A] vp-doc" role="article" />
      <VPOutline />
    </div>
  </div>
</template>

<style>
.VPLayout {
  position: relative;
  display: grid;
  grid: 1fr/1fr;
  height: 100vh;
  overflow: hidden;
}

.VPMain {
  overflow: auto;
}

.VPContent {
  overflow: auto;
  padding: 50px 30px;
  padding-inline: calc(300px + 50px) calc(166px + 50px);
  padding-bottom: 100px;
  /* transition: padding 0.3s; */

  > div {
    width: min(800px, 100%);
    margin-inline: auto;
  }
}

@media not (min-width: 1000px) {
  .VPLayout {
    /* grid-template: 1fr/1fr; */
  }
  .VPContent {
    padding-inline: 50px;
  }
}
</style>
