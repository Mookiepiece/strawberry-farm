<script setup lang="ts">
import { computed } from 'vue'
import { LinkGroup, LinkItem } from './composables';
import VPLink from './VPLink.vue'

const props = defineProps<{
  item: LinkGroup | LinkItem
  depth: number
}>()

const textTag = computed(() => {
  if (props.depth > 4) throw new Error()
  return `h${props.depth + 2}`
})

</script>

<template>
  <div v-if="!('items' in item)" class="VPSidebarItem">
    <VPLink v-if="item.link" class="link" :href="item.link" :rel="item.rel" :target="item.target">
      <span class="text" v-html="item.text" />
    </VPLink>
    <span v-else class="text" v-html="item.text" />
  </div>

  <div v-if="'items' in item && item.items?.length" class="VPSidebarItem--Group">
    <span>{{ item.text }}</span>
    <VPSidebarItem v-for="i in item.items" :key="i.text" :item="i" :depth="depth + 1" />
  </div>
</template>

<style scoped>
.VPSidebarItem {
  display: flex;
  flex-direction: column;

  .link {
    outline: 0;
    color: var(--VPFC2);
    line-height: 30px;

    &:hover {
      background: var(--VPCisP);
    }

    &:active {
      background: var(--VPCisC);
    }

    &:focus-visible {
      outline: 2px solid var(--VPCStrawberry1);
      outline-offset: -1px;
      box-shadow: 0 0 0 3px var(--VPCStrawberry3S);
    }
  }
}

.VPSidebarItem--Group {
  font-size: var(--VPF2);
  font-weight: 600;

  &:not(:last-child) {
    border-bottom: 1px solid var(--VPBDC1);
  }
}
</style>
