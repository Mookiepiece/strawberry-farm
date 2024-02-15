<template>
  <div class="good f2" style="">
    <div class="tony tone:pink [-:]">{{ ['山莓','Rasp'].join('\n') }}</div>
    <div class="tony tone:iris [-:]">{{ ['鸢尾', 'Iris'].join('\n') }}</div>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid-template: 100px / repeat(auto-fill, 150px);
  gap: var(--3);
  justify-content: start;
}

.tony {
  background: linear-gradient(
      70deg,
      var(---fore) 40px,
      var(---main) 41px,
      var(---main) 80px,
      var(---foam) 81px,
      var(---foam) 120px,
      transparent 121px
    ),
    linear-gradient(
      10deg,
      var(---fore) 30px,
      var(---main) 32px,
      var(---main) 50px,
      var(---foam) 52px,
      var(---foam) 70px,
      transparent 72px
    );

  border-radius: var(--5);
  color: var(---fore);
  box-shadow: inset 0 0 0 var(--3);

  padding: var(--4);

  &::first-line {
    font-size: var(--font1);
  }
}
</style>
