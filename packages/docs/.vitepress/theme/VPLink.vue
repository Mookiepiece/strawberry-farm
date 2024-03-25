<script lang="ts" setup>
import { useRoute, withBase } from 'vitepress';
import { computed } from 'vue';

const props = defineProps<{
  tag?: string;
  href?: string;
  noIcon?: boolean;
  target?: string;
  rel?: string;
  exact?: boolean;
  active?: () => boolean;
}>();

const route = useRoute();

const isActive = computed(() => {
  let pathname = route.path;
  pathname = pathname.endsWith('.html') ? pathname.slice(0, -5) : pathname;

  const to = (props.href && withBase(props.href)) ?? '/404';

  const active =
    typeof props.active === 'function'
      ? props.active()
      : props.exact
        ? pathname === to
        : pathname.startsWith(to);

  return active;
});

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'));
const isExternal = computed(() => props.href && props.href.startsWith('http'));

const href = computed(() => props.href && withBase(props.href));
</script>

<template>
  <component
    :is="tag"
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
