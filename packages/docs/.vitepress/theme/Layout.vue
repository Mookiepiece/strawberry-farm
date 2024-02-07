<script setup lang="ts">
import { useRoute } from 'vitepress'
import {  watch } from 'vue'
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue'
import VPSidebar from 'vitepress/dist/client/theme-default/components/VPSidebar.vue'
import { useData } from 'vitepress/dist/client/theme-default/composables/data'
import { useCloseSidebarOnEscape, useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar'

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar
} = useSidebar()

const route = useRoute()
watch(() => route.path, closeSidebar)

useCloseSidebarOnEscape(isSidebarOpen, closeSidebar)

const { frontmatter } = useData()

</script>

<template>
  <div class="Layout">
    <VPSidebar :open="isSidebarOpen">
    </VPSidebar>
    <VPContent />
  </div>
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
