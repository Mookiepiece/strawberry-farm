<template>
  <div class="[A]">
    <div class="t" v-for="i of 3" :class="[`h${i}`]">
      Head {{ i }} <span class="(B)">Head</span>
    </div>
    <div class="t" v-for="i of 3" :class="[`f${i}`]">
      Text {{ i }} <span class="(B)">Text</span>
    </div>
    <div class="t" v-for="i of 3" :class="[`f${i}i`]">Text inline {{ i }}</div>
  </div>
</template>
<style scoped>
.t {
  box-shadow: 0 1px 0 0 var(--DVD);
}
</style>
