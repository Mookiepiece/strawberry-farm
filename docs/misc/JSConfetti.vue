<script setup lang="ts">
import { Bag } from '@mookiepiece/strawberry-farm';
import { onMounted, onUnmounted, ref } from 'vue';

type Fly = {
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  rotateZ: number;
  vx: number;
  vy: number;
  vrotate: number;
  vrotateZ: number;

  /** Add to `x` every tick */
  drift: number;
  /** Add to `y` every tick */
  gravity: number;
  /** Multiply to `velocity` every tick */
  decay: number;
};

const canvas = ref<HTMLCanvasElement>();
const JSConfetti = {};

const bag = Bag();
onMounted(() => {
  const $canvas = canvas.value!;

  const ro = new ResizeObserver(() => {
    $canvas.width = $canvas.offsetWidth;
    $canvas.height = $canvas.offsetHeight;
  });
  ro.observe($canvas);
  bag(() => ro.disconnect());

  const flys: Fly[] = Array(11)
    .fill(10)
    .map(
      (): Fly => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        w: 100,
        h: 100,
        rotate: Math.random() * 360,
        rotateZ: Math.random() * 360,

        decay: 0.4,
        drift: 0,
        gravity: 50,

        vx: Math.random() * 400 - 200,
        vy: Math.random() * 400 - 200,
        vrotate: Math.random() * 0.5 + 0.5,
        vrotateZ: Math.random() * 0.5 + 0.5,
      }),
    );

  const draw = () => {
    const ctx = $canvas.getContext('2d')!;
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    for (const i of flys) {
      const path = new Path2D();
      const _path = new Path2D();
      _path.lineTo(-i.w / 2, -i.h / 2);
      _path.lineTo(-i.w / 2, i.h / 2);
      _path.lineTo(i.w / 2, i.h / 2);
      _path.lineTo(i.w / 2, -i.h / 2);

      const scaleX = Math.sin(i.rotateZ * 7);
      path.addPath(
        _path,
        new DOMMatrix([
          Math.cos(i.rotate) * scaleX,
          Math.sin(i.rotate) * scaleX * 0.5,
          -Math.sin(i.rotate),
          Math.cos(i.rotate) * 0.5,
          200 + i.x,
          200 + i.y,
        ]),
      );

      ctx.fillStyle = '#88a';
      ctx.fill(path);
      debugger;
    }
  };

  let _delta = 0;
  const loop = (delta: number) => {
    flys.forEach(i => {
      i.x += (i.vx + i.drift) * delta;
      i.y += (i.vy + i.gravity) * delta;
      i.rotate += i.vrotate * delta;
      i.rotateZ += i.vrotateZ * delta;
      i.vx = i.vx * i.decay ** delta;
      i.vy = i.vy * i.decay ** delta;
    });
    draw();

    requestAnimationFrame(delta => {
      loop((delta - _delta) / 1000);
      _delta = delta;
    });
  };
  loop(0);
});
onUnmounted(bag);
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 500px;
}
</style>
