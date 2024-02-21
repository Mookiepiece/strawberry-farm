<script setup lang="ts">
import { LinkGroup, LinkItem } from './composables';
import VPLink from './VPLink.vue';

defineProps<{
  item: LinkGroup | LinkItem;
  depth: number;
}>();
</script>

<template>
  <div v-if="!('items' in item)" class="VPSidebarItem [#]">
    <VPLink
      v-if="item.link"
      class="[...] [A] [FC] link px-6 f2 mat:air"
      :href="item.link"
      :rel="item.rel"
      :target="item.target"
      :exact="item.exact"
    >
      <span class="text" v-html="item.text" />
    </VPLink>
    <span v-else class="text" v-html="item.text" />
  </div>

  <div v-else class="VPSidebarItem--Group f2 py-4" :aria-label="item.text">
    <VPSidebarItem
      v-for="i in item.items"
      :key="i.text"
      :item="i"
      :depth="depth + 1"
    />
  </div>
</template>

<style>
.VPSidebarItem {
  height: var(--7);
  font-weight: normal;
}

.VPSidebarItem--Group {
  &::before {
    display: block;
    height: var(--7);
    padding-left: var(--6);
    font-weight: 600;
    line-height: var(--7);

    content: attr(aria-label);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--DVD);
  }
}
</style>
