<template>
  <div
    style="
      display: grid;
      grid-template: 100px 100px 100px / 1fr 1fr 1fr;
      gap: 20px;
    "
    class="f2i"
  >
    <div></div>
    <div class="(///) [Y]">
      <div v-for="i of 3" class="🩷">{{ i }}</div>
    </div>
    <div></div>

    <div class="(///) [X]">
      <div v-for="i of 3" class="🩷">{{ i }}</div>
    </div>
    <div></div>
    <div class="(///) [B]">
      <div v-for="i of 3" class="🩷">{{ i }}</div>
    </div>

    <div>
      <div class="(///) [y]">
        <div v-for="i of 3" class="🩷">{{ i }}</div>
      </div>
      <div class="(///) [x]">
        <div v-for="i of 3" class="🩷">{{ i }}</div>
      </div>
      <div class="(///) [a]">
        <div v-for="i of 3" class="🩷">{{ i }}</div>
      </div>
      <div class="(///) [b]">
        <div v-for="i of 3" class="🩷">{{ i }}</div>
      </div>
    </div>
    <div class="(///) [A]">
      <div v-for="i of 3" class="🩷">{{ i }}</div>
    </div>
    <div></div>
  </div>
</template>
