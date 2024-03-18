<template>
  <div class="good [A] (///)">
    <div v-for="i in 8" class="i f3" :style="`width: var(--${i});`" :aria-label="''+i"></div>
  </div>
</template>

<style scoped>
.good  {
  gap: 2px;
}
.i {
  position: relative;
  height: 30px;
  background: var(--tone-rasp-flame);

  &::after {
    position: absolute;
    right: -10px;
    top: 50%;
    content: attr(aria-label);
    transform: translate(100%, -50%);
  }
}
</style>
