<template>
  <div class="😊">
    <nav>
      <div class="[-:] sc w0" style="--w: 393; --r: 0.55">393</div>
      <div class="[-:] bk w1" style="--w: 444">444</div>
      <div class="[-:] bk w2" style="--w: 700">700</div>
      <div class="[-:] sc w2" style="--w: 768; --r: 0.75">768</div>
      <div class="[-:] bk w3" style="--w: 1000; -">1000</div>
      <div class="[-:] sc w3" style="--w: 1024; --r: 1.33">1024</div>
      <div class="[-:] bk w4" style="--w: 1300">1300</div>
      <div class="[-:] sc w4" style="--w: 1366; --r: 1.77">1366</div>
      <div class="[-:] bk w5" style="--w: 1700">1700</div>
      <div class="[-:] sc w5" style="--w: 1920; --r: 1.77">1920</div>
      <div class="[-:] sc w5" style="--w: 2560; --r: 1.77">2560</div>
      <div class="[-:] bk" style="--w: 2560"></div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.😊 {
  position: relative;
  margin: 25px 0;
  aspect-ratio: 1.77;
  user-select: none;

  nav div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(100% / 2560 * var(--w));
    aspect-ratio: var(--r);
    font: 600 12px/20px sans-serif;
    white-space: nowrap;
    box-shadow: 0 0 0 2px inset;
    padding: 4px;
    line-height: 1;

    &.bk {
      height: 20px;
    }

    // &.w0 {
    //   color: #555;
    // }
    // &.w1 {
    //   color: #aaa;
    // }
    &.w2 {
      color: #85e;
    }
    &.w3 {
      color: #85e;
    }
    &.w4 {
      color: #c24;
    }
    &.w5 {
      color: #c24;
    }
  }
}
</style>
