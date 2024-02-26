<template>
  <div class="good f2" style="">
    <div class="tony tone:rasp [-:]">{{ ['山莓', 'Rasp'].join('\n') }}</div>
    <div class="tony tone:iris [-:]">{{ ['鸢尾', 'Iris'].join('\n') }}</div>
    <div class="tony tone:citrus [-:]">{{ ['枳果', 'Citrus'].join('\n') }}</div>
    <div class="tony tone:reimu [-:]">{{ ['灵梦', 'Reimu'].join('\n') }}</div>
  </div>
</template>

<style scoped>
.good {
  display: grid;
  grid: auto-flow 150px / repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--3);
  justify-content: start;
}

.tony {
  background: linear-gradient(
      70deg,
      var(---fore) 40px,
      var(---main) 41px,
      var(---main) 80px,
      var(---flame) 81px,
      var(---flame) 120px,
      var(---foam) 121px,
      var(---foam) 160px,
      transparent 161px
    ),
    linear-gradient(
      10deg,
      var(---fore) 50px,
      var(---main) 52px,
      var(---main) 70px,
      var(---foam) 72px,
      var(---foam) 90px,
      transparent 92px
    );

  border-radius: var(--5);
  color: var(---fore);
  box-shadow: inset 0 0 0 var(--3);

  padding: var(--4);

  &::first-line {
    font-size: var(--f1);
  }
}
</style>
