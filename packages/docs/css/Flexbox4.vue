<template>
  <div
    style="
      display: grid;
      grid: auto-flow 150px / repeat(auto-fill, minmax(100px,1fr));
      gap: 20px;
    "
  >
    <div class="(///) [B] [SF] [[+S]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [SF] [[+C]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [SF] [[+E]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [2C] [[-0]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [2C] [[-1]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [2C] [[-2]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [2C] [[+F]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [2E] [[+F]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
    <div class="(///) [B] [2F] [[+F]]">
      <div v-for="i of 5" class="🩷">{{ i }}</div>
    </div>
  </div>
</template>
<style scoped>
.🩷 {
  &:not(:last-child) {
    width: 25%;
  }

  &:last-child {
    width: 100%;
  }
}
</style>
