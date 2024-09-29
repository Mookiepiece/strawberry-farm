const n=`<script setup lang="ts">\r
import { useData } from 'vitepress';\r
import { nextTick } from 'vue';\r
\r
const { isDark } = useData();\r
\r
let loading = false;\r
const toggleTheme = async (e: MouseEvent) => {\r
  if (loading) return;\r
  loading = true;\r
  // https://github.com/vuejs/vitepress/blob/20511006dba516ca8c06ed1dd3516547af668a0e/docs/zh/guide/extending-default-theme.md?plain=1#L236\r
  const enableTransitions =\r
    'startViewTransition' in document &&\r
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches;\r
\r
  if (!enableTransitions) {\r
    isDark.value = !isDark.value;\r
    loading = false;\r
    return;\r
  }\r
\r
  const [x, y] = [e.clientX, e.clientY];\r
\r
  const clipPath = [\r
    \`circle(0px at \${x}px \${y}px)\`,\r
    \`circle(\${Math.hypot(\r
      Math.max(x, window.innerWidth - x),\r
      Math.max(y, window.innerHeight - y),\r
    )}px at \${x}px \${y}px)\`,\r
  ];\r
\r
  const r = document.querySelector('.sun,.moon');\r
  r?.setAttribute('aria-hidden', 'true');\r
  await new Promise(_ => setTimeout(_, 300));\r
\r
  document.documentElement.classList.add('sunrise');\r
  document.documentElement.style.setProperty('view-transition-name', 'sunrise');\r
  await (document as any).startViewTransition?.(async () => {\r
    isDark.value = !isDark.value;\r
    await nextTick();\r
  }).ready;\r
\r
  const ani = document.documentElement.animate(\r
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },\r
    {\r
      duration: 300,\r
      easing: 'cubic-bezier(0.66, 0, 0, 1)',\r
      pseudoElement: \`::view-transition-\${isDark.value ? 'old' : 'new'}(sunrise)\`,\r
    },\r
  );\r
  await ani.finished;\r
  document.documentElement.style.removeProperty('view-transition-name');\r
  document.documentElement.classList.remove('sunrise');\r
  await new Promise(_ => setTimeout(_, 300));\r
  document\r
    .querySelectorAll('.sun,.moon')\r
    .forEach(_ => _.removeAttribute('aria-hidden'));\r
  loading = false;\r
};\r
<\/script>\r
\r
<template>\r
  <div class="Sunrise" @click="toggleTheme">\r
    <div class="city">\r
      <div class="building" v-for="i in '🏨 🏢 🏪 🌴 🌳'.split(' ')">\r
        {{ i }}\r
      </div>\r
      <div>\r
        <div class="car" v-for="i in '🚗 🚕 🛺 🚙 🚌 🚚 🚛 🚜'.split(' ')">\r
          {{ i }}\r
        </div>\r
      </div>\r
    </div>\r
    <div class="sun" v-if="!isDark">🌞</div>\r
    <div class="moon" v-else>🌜</div>\r
  </div>\r
</template>\r
\r
<style scoped>\r
.Sunrise {\r
  position: relative;\r
  width: 600px;\r
  height: 250px;\r
\r
  outline: 5px solid #8893;\r
  cursor: pointer;\r
\r
  &:hover {\r
    background: #8891;\r
  }\r
\r
  border-radius: 25px;\r
\r
  font-size: 28px;\r
  line-height: 1;\r
\r
  overflow: clip;\r
  user-select: none;\r
\r
  .city {\r
    position: absolute;\r
    height: 1px;\r
    bottom: 50px;\r
\r
    width: 100%;\r
    box-shadow: 0 1px 0 0 #8893;\r
  }\r
\r
  .car {\r
    position: absolute;\r
    width: 1em;\r
    aspect-ratio: 1;\r
    left: 0;\r
    bottom: 0;\r
    animation: Drive 5s infinite linear;\r
  }\r
\r
  .car:nth-child(2) {\r
    animation-delay: -3s;\r
    animation-duration: 5.5s;\r
  }\r
  .car:nth-child(3) {\r
    animation-delay: -7s;\r
    animation-duration: 5.55s;\r
  }\r
  .car:nth-child(4) {\r
    animation-delay: -5s;\r
    animation-duration: 5.7s;\r
  }\r
  .car:nth-child(5) {\r
    animation-delay: -13s;\r
    animation-duration: 5.6s;\r
  }\r
  .car:nth-child(6) {\r
    animation-delay: -15s;\r
    animation-duration: 5.1s;\r
  }\r
  .car:nth-child(7) {\r
    animation-delay: -17s;\r
    animation-duration: 5.2s;\r
  }\r
  .car:nth-child(8) {\r
    animation-delay: -19s;\r
    animation-duration: 5.3s;\r
  }\r
\r
  .building {\r
    position: absolute;\r
    width: 1em;\r
    aspect-ratio: 1;\r
    left: 40px;\r
    bottom: 0;\r
    font-size: 50px;\r
  }\r
\r
  .building:nth-child(2) {\r
    left: 335px;\r
  }\r
  .building:nth-child(3) {\r
    left: 175px;\r
  }\r
  .building:nth-child(4) {\r
    left: 225px;\r
  }\r
  .building:nth-child(5) {\r
    left: 405px;\r
  }\r
\r
  .sun,\r
  .moon {\r
    position: absolute;\r
    top: 0;\r
    left: 27%;\r
\r
    font-size: 100px;\r
    width: 100px;\r
    aspect-ratio: 1;\r
\r
    animation: SunDrive 0.3s;\r
\r
    &[aria-hidden] {\r
      transform: translateY(300px) scale(0);\r
      transition: transform 0.3s;\r
    }\r
  }\r
}\r
\r
@keyframes SunDrive {\r
  from {\r
    transform: translateY(300px) scale(0);\r
  }\r
  to {\r
    transform: translateY(0px);\r
  }\r
}\r
\r
.sunrise .car {\r
  animation-play-state: paused;\r
}\r
\r
@keyframes Drive {\r
  0% {\r
    transform: scaleX(-1);\r
  }\r
  45% {\r
    transform: translateX(calc(600px - 1em)) scaleX(-1);\r
  }\r
  50% {\r
    transform: translateX(calc(600px - 1em)) scaleX(1);\r
  }\r
  95% {\r
    transform: scaleX(1);\r
  }\r
  100% {\r
    transform: scaleX(-1);\r
  }\r
}\r
</style>\r
<style>\r
::view-transition-old(sunrise),\r
::view-transition-new(sunrise) {\r
  animation: none;\r
  mix-blend-mode: normal;\r
}\r
\r
::view-transition-old(sunrise),\r
.dark::view-transition-new(sunrise) {\r
  z-index: 1;\r
}\r
\r
::view-transition-new(sunrise),\r
.dark::view-transition-old(sunrise) {\r
  z-index: 9999;\r
}\r
</style>\r
`;export{n as default};
