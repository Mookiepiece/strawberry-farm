<script setup lang="ts" generic="T">
const model = defineModel<T[]>();

defineSlots<{
  default(p: { row: T; index: number }): any;
}>();

</script>

<template>
  <div class="VFormList">
    <template v-for="(item, index) in model">
      <slot :row="item" :index="index">
        hello index #{{ index }}
      </slot>
    </template>
  </div>
</template>
