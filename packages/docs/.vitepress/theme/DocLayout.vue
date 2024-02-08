<script setup lang="ts">
import { useRoute } from 'vitepress'
import VPSidebar from './VPSidebar.vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'

const route = useRoute()

const { frontmatter } = useData()

</script>

<template>
  <div class="DocLayout">
    <VPSidebar />
    <!-- <Content /> -->
  </div>
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
