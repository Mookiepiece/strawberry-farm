<template>
  <div
    style="
      display: grid;
      grid: auto-flow 150px / repeat(auto-fill, minmax(100px,1fr));
      gap: 20px;
    "
  >
    <div class="(///) [B] [FS] [[+S]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [FS] [[+C]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [FS] [[+E]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [C2] [[-0]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [C2] [[-1]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [C2] [[-2]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [C2] [[+F]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [E2] [[+F]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
    <div class="(///) [B] [F2] [[+F]]">
      <div v-for="i of 5" class="💖">{{ i }}</div>
    </div>
  </div>
</template>
<style scoped>
.💖 {
  &:not(:last-child) {
    width: 25%;
  }

  &:last-child {
    width: 100%;
  }
}
</style>
