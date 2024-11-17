const n=`<script setup lang="ts">\r
import { Bag } from '@mookiepiece/strawberry-farm';\r
import { onMounted, onUnmounted, ref } from 'vue';\r
\r
type Fly = {\r
  x: number;\r
  y: number;\r
  w: number;\r
  h: number;\r
  rotate: number;\r
  rotateZ: number;\r
  vx: number;\r
  vy: number;\r
  vrotate: number;\r
  vrotateZ: number;\r
\r
  /** Add to \`x\` every tick */\r
  drift: number;\r
  /** Add to \`y\` every tick */\r
  gravity: number;\r
  /** Multiply to \`velocity\` every tick */\r
  decay: number;\r
};\r
\r
const canvas = ref<HTMLCanvasElement>();\r
const JSConfetti = {};\r
\r
const bag = Bag();\r
onMounted(() => {\r
  const $canvas = canvas.value!;\r
\r
  const ro = new ResizeObserver(() => {\r
    $canvas.width = $canvas.offsetWidth;\r
    $canvas.height = $canvas.offsetHeight;\r
  });\r
  ro.observe($canvas);\r
  bag(() => ro.disconnect());\r
\r
  const flys: Fly[] = Array(11)\r
    .fill(10)\r
    .map(\r
      (): Fly => ({\r
        x: Math.random() * 100,\r
        y: Math.random() * 100,\r
        w: 100,\r
        h: 100,\r
        rotate: Math.random() * 360,\r
        rotateZ: Math.random() * 360,\r
\r
        decay: 0.4,\r
        drift: 0,\r
        gravity: 50,\r
\r
        vx: Math.random() * 400 - 200,\r
        vy: Math.random() * 400 - 200,\r
        vrotate: Math.random() * 0.5 + 0.5,\r
        vrotateZ: Math.random() * 0.5 + 0.5,\r
      }),\r
    );\r
\r
  const draw = () => {\r
    const ctx = $canvas.getContext('2d')!;\r
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);\r
\r
    for (const i of flys) {\r
      const path = new Path2D();\r
      const _path = new Path2D();\r
      _path.lineTo(-i.w / 2, -i.h / 2);\r
      _path.lineTo(-i.w / 2, i.h / 2);\r
      _path.lineTo(i.w / 2, i.h / 2);\r
      _path.lineTo(i.w / 2, -i.h / 2);\r
\r
      const scaleX = Math.sin(i.rotateZ * 7);\r
      path.addPath(\r
        _path,\r
        new DOMMatrix([\r
          Math.cos(i.rotate) * scaleX,\r
          Math.sin(i.rotate) * scaleX * 0.5,\r
          -Math.sin(i.rotate),\r
          Math.cos(i.rotate) * 0.5,\r
          200 + i.x,\r
          200 + i.y,\r
        ]),\r
      );\r
\r
      ctx.fillStyle = '#88a';\r
      ctx.fill(path);\r
      debugger;\r
    }\r
  };\r
\r
  let _delta = 0;\r
  const loop = (delta: number) => {\r
    flys.forEach(i => {\r
      i.x += (i.vx + i.drift) * delta;\r
      i.y += (i.vy + i.gravity) * delta;\r
      i.rotate += i.vrotate * delta;\r
      i.rotateZ += i.vrotateZ * delta;\r
      i.vx = i.vx * i.decay ** delta;\r
      i.vy = i.vy * i.decay ** delta;\r
    });\r
    draw();\r
\r
    requestAnimationFrame(delta => {\r
      loop((delta - _delta) / 1000);\r
      _delta = delta;\r
    });\r
  };\r
  loop(0);\r
});\r
onUnmounted(bag);\r
<\/script>\r
\r
<template>\r
  <canvas ref="canvas"></canvas>\r
</template>\r
\r
<style scoped>\r
canvas {\r
  width: 100%;\r
  height: 500px;\r
}\r
</style>\r
`;export{n as default};
