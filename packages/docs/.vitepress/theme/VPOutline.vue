<script lang="ts" setup>
import { onContentUpdated } from 'vitepress';
import { computed, onMounted, ref, shallowRef } from 'vue';
import VPLink from './VPLink.vue';
import { Bag, debounce, on } from '@mookiepiece/strawberry-farm/functions';

const metaHeaders = shallowRef<
  { text: string; link: string; offset: number; level: number }[]
>([]);

const offset = ref(0);

const bag = Bag();
const handleContentUpdated = () => {
  getHeaders();
  bag();

  const VPMain = document.querySelector<HTMLDivElement>('.VPMain');
  if (!VPMain) return;

  VPMain.scrollTop = 0;

  const limit = 150;
  offset.value = VPMain.scrollTop + limit;

  bag(
    on(VPMain).scroll(
      debounce(
        () => {
          getHeaders();

          // If scroll to the end, highlight the last element
          // It is not a promise that clicking an anchor will let the window scroll to the target header.
          // Because there are some sections that cannot reach at the top of the window even if scroll to the end.
          // Because they are at the bottom of a page.
          // Those sections are "un-highlight-able".
          // UPDATE: this hack has been removed

          offset.value = VPMain.scrollTop + limit;
        },
        100,
        bag(new AbortController()).signal,
      ),
    ),
  );
};
const getHeaders = () =>
  (metaHeaders.value = [
    ...document.querySelectorAll<HTMLHeadingElement>(
      '.vp-doc > div > :where(h2,h3)',
    ),
  ].map(el => ({
    text: el.textContent?.trim() || '',
    link:
      el
        .querySelector<HTMLAnchorElement>('.header-anchor')
        ?.getAttribute('href') || '',
    offset: el.offsetTop,
    level: Number(el.tagName.slice(-1)),
  })));

onMounted(() => {
  handleContentUpdated();
  getHeaders();
});
onContentUpdated(handleContentUpdated);

const activeIndex = computed(() => {
  const index = metaHeaders.value.findLastIndex(i => i.offset < offset.value);
  if (index === -1) return 0;
  return index;
});

const empty = computed(() => (metaHeaders.value?.length ?? 0) <= 1);
</script>

<template>
  <aside
    class="VPOutline [A] f2"
    :class="{ empty }"
    :style="{
      '--vp-outline-opacity': activeIndex >= 0 ? 1 : 0,
      '--vp-outline-curr': activeIndex,
      '--vp-outline-sum': metaHeaders.length,
    }"
  >
    <div class="title px-4">Outline</div>
    <template v-if="!empty">
      <VPLink
        v-for="(item, index) in metaHeaders"
        :key="index"
        class="[A] [FC] link px-4 tone:rasp mat:airy"
        :active="activeIndex === index"
        :style="{
          '--vp-outline-level': item.level - 1,
        }"
        :href="item.link"
        :title="item.text"
      >
        <div class="[...]">{{ item.text }}</div></VPLink
      >
    </template>
  </aside>
</template>

<style>
.VPOutline {
  position: absolute;
  top: 50px;
  right: 50px;
  width: 166px;
  max-height: 100%;
  padding-left: 5px;
  z-index: 1;
  overflow-y: auto;
}

@media not (min-width: 1000px) {
  .VPOutline:not(.open) {
    display: none;
  }
}

.VPOutline {
  .title {
    font-weight: 600;
    height: var(--6);
    line-height: var(--6);
  }

  &.empty .title {
    display: none;
  }

  &:not(.empty)::before {
    position: absolute;
    top: 0;
    height: calc(30px + calc(var(--6) * var(--vp-outline-sum)));
    left: 5px;
    width: 1px;
    display: block;
    background-color: var(--mat-air-15);
    content: '';
  }

  &:not(.empty)::after {
    position: absolute;
    top: 30px;
    left: 5px;
    display: block;
    height: var(--6);
    width: 2px;
    background-color: var(--tone-rasp);
    opacity: var(--vp-outline-opacity);
    transform: translateY(calc(var(--6) * var(--vp-outline-curr)));
    content: '';
    transition: all 0.1s;
  }

  .link {
    flex: 0 0 var(--6);
    padding-left: calc(5px + calc(10px * var(--vp-outline-level)));
  }
}
</style>
