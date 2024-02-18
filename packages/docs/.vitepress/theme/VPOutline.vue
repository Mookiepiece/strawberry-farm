<script lang="ts" setup>
import { onContentUpdated } from 'vitepress';
import { computed, onMounted, ref, shallowRef } from 'vue';
import { debounce, on } from '../../../strawberry-farm/functions';
import VPLink from './VPLink.vue';

const metaHeaders = shallowRef<
  { text: string; link: string; offset: number; level: number }[]
>([]);

const offset = ref(0);

let off = () => {};
let ac = new AbortController();

const handleContentUpdated = () => {
  off();
  ac.abort();
  ac = new AbortController();
  let _VPContentEl = document.querySelector<HTMLDivElement>('.VPContent');
  if (!_VPContentEl) return;
  let VPContentEl = _VPContentEl;

  VPContentEl.scrollTop = 0;
  offset.value = VPContentEl.scrollTop;

  off = on(VPContentEl).scroll(
    debounce(
      () => {
        // If scroll to the end, highlight the last element
        // It is not a promise that clicking an anchor will let the window scroll to the target header.
        // Because there are some sections that cannot reach at the top of the window even if scroll to the end.
        // Because they are at the bottom of a page.
        // Those sections are "un-highlight-able".
        offset.value =
          VPContentEl.scrollTop + VPContentEl.clientHeight ===
            VPContentEl.scrollHeight &&
          VPContentEl.clientHeight !== VPContentEl.scrollHeight
            ? Number.POSITIVE_INFINITY
            : VPContentEl.scrollTop;
      },
      100,
      ac.signal,
    ),
  );

  metaHeaders.value = [
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
  }));
};

onMounted(() => {
  handleContentUpdated();
});
onContentUpdated(handleContentUpdated);

const activeIndex = computed(() => {
  if (offset.value === Number.POSITIVE_INFINITY)
    return metaHeaders.value.length - 1;

  const index = metaHeaders.value.findIndex(i => i.offset >= offset.value);
  if (index === -1) return metaHeaders.value.length - 1;
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
      '--vp-outline-times': activeIndex,
    }"
  >
    <div class="title px-4">Outline</div>
    <template v-if="!empty">
      <VPLink
        v-for="(item, index) in metaHeaders"
        :key="index"
        class="[...] [A] [CF] link px-4 tone:rasp mat:airy"
        :active="activeIndex === index"
        :style="{
          '--vp-outline-level': item.level - 1,
        }"
        :href="item.link"
      >
        <span>{{ item.text }}</span></VPLink
      >
    </template>
  </aside>
</template>

<style>
.VPOutline {
  position: absolute;
  grid-area: 1/2/2/3;
  top: 0;
  right: 20px;
  width: 250px;
  max-height: 100%;
  padding-top: 50px;
  z-index: 1;
  overflow-y: auto;

  .title {
    font-weight: 600;
    height: var(--6);
    line-height: var(--6);
  }

  &.empty .title {
    display: none;
  }

  &:not(.empty) {
    box-shadow: inset 1px 0 0 0 var(--tone-demi-idle);
  }

  &:not(.empty)::after {
    position: absolute;
    top: 80px;
    left: 0;
    display: block;
    height: var(--6);
    width: 2px;
    background-color: var(--tone-rasp);
    opacity: var(--vp-outline-opacity);
    transform: translateY(calc(var(--6) * var(--vp-outline-times)));
    content: '';
    transition: all 0.1s;
  }

  .link {
    flex: 0 0 var(--6);
    padding-left: calc(5px + calc(10px * var(--vp-outline-level)));
  }
}
</style>
