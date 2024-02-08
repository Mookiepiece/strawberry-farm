<script lang="ts" setup>
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { EXTERNAL_URL_RE } from 'vitepress/dist/client/shared'
import { useData } from './composables'

const props = defineProps<{
  tag?: string
  href?: string
  noIcon?: boolean
  target?: string
  rel?: string
}>()
const route =useRoute()


const { page } = useData()

const isActive = computed(() => {


//   props.href && (new URL(
// window.location.origin +   
//   route.path).pathname
//     === new URL(window.location.origin + props.href).pathname)
})

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'))
const isExternal = computed(() => props.href && EXTERNAL_URL_RE.test(props.href))
</script>

<template>
  <component :is="tag" class="VPLink" :class="{
    link: href,
    active: isActive,
    'vp-external-link-icon': isExternal,
    'no-icon': noIcon
  }" :href="href" :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)">
    <slot />
  </component>
</template>
