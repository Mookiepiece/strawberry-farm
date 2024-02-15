<script lang="ts" setup>
import { useRoute } from 'vitepress';
import { computed } from 'vue';
import { useData } from './composables';

const props = defineProps<{
  tag?: string;
  href?: string;
  noIcon?: boolean;
  target?: string;
  rel?: string;

  exact?: boolean;
}>();
const route = useRoute();

const { page } = useData();

const isActive = computed(() => {
  let pathname = new URL(window.location.origin + route.path).pathname;
  pathname = pathname.endsWith('.html') ? pathname.slice(0, -5) : pathname;

  const to = new URL(window.location.origin + (props.href ?? '/404')).pathname;

  return props.exact ? pathname === to : pathname.startsWith(to);
});

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'));
const isExternal = computed(
  () => props.href && props.href.startsWith('http'),
);
</script>

<template>
  <component
    :is="tag"
    class="VPLink"
    :class="{
      link: href,
      active: isActive,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon,
    }"
    :href="href"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>
