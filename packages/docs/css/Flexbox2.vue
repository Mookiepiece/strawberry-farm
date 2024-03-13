<template>
  <div class="(///) [B] [SS]">
    <div v-for="i of 3" :style="{ '--i': i }" class="💖">{{ i }}</div>
  </div>
  <div class="(///) [B] [CS]">
    <div v-for="i of 3" :style="{ '--i': i }" class="💖">{{ i }}</div>
  </div>
  <div class="(///) [B] [ES]">
    <div v-for="i of 3" :style="{ '--i': i }" class="💖">{{ i }}</div>
  </div>
  <div class="(///) [B] [FS]">
    <div v-for="i of 3" :style="{ '--i': i }" class="💖">{{ i }}</div>
  </div>
  <div class="(///) [B] [BS]">
    <div v-for="i of 3" :style="{ '--i': i }" class="💖">{{ i }}</div>
  </div>
</template>
<style scoped>
.\(\/\/\/\) + .\(\/\/\/\) {
  margin-top: 10px;
}

.💖 {
  font-size: calc(1.2em * var(--i));
  line-height: 1;
}

.💖 {
  min-width: 50px;
  min-height: 50px;
}
</style>
