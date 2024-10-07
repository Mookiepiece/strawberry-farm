<!-- 
Inspired By:

CodePen Home
3D Emoji Town (Pure CSS)
George W. Park
https://codepen.io/GeorgePark/pen/MqVoYP
-->
<script setup lang="ts">
import { useData } from 'vitepress';
import { nextTick } from 'vue';

const { isDark } = useData();

let loading = false;
const toggleTheme = async (e: MouseEvent) => {
  if (loading) return;
  loading = true;
  // https://github.com/vuejs/vitepress/blob/20511006dba516ca8c06ed1dd3516547af668a0e/docs/zh/guide/extending-default-theme.md?plain=1#L236
  const enableTransitions =
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  if (!enableTransitions) {
    isDark.value = !isDark.value;
    loading = false;
    return;
  }

  const [x, y] = [e.clientX, e.clientY];

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  const r = document.querySelector('.sun,.moon');
  r?.setAttribute('aria-hidden', 'true');
  await new Promise(_ => setTimeout(_, 300));

  document.documentElement.classList.add('sunrise');
  document.documentElement.style.setProperty('view-transition-name', 'sunrise');
  await (document as any).startViewTransition?.(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  const ani = document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'cubic-bezier(0.66, 0, 0, 1)',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(sunrise)`,
    },
  );
  await ani.finished;
  document.documentElement.style.removeProperty('view-transition-name');
  document.documentElement.classList.remove('sunrise');
  await new Promise(_ => setTimeout(_, 300));
  document
    .querySelectorAll('.sun,.moon')
    .forEach(_ => _.removeAttribute('aria-hidden'));
  loading = false;
};
</script>

<template>
  <div class="Sunrise" @click="toggleTheme">
    <div class="city">
      <div class="building" v-for="i in '🏨 🏢 🏪 🌴 🌳'.split(' ')">
        {{ i }}
      </div>
      <div>
        <div class="car" v-for="i in '🚗 🚕 🛺 🚙 🚌 🚚 🚛 🚜'.split(' ')">
          {{ i }}
        </div>
      </div>
    </div>
    <div class="sun" v-if="!isDark">🌞</div>
    <div class="moon" v-else>🌜</div>
  </div>
</template>

<style scoped>
.Sunrise {
  position: relative;
  width: 600px;
  height: 250px;

  outline: 5px solid #8893;
  cursor: pointer;

  &:hover {
    background: #8891;
  }

  border-radius: 25px;

  font-size: 28px;
  line-height: 1;

  overflow: clip;
  user-select: none;

  .city {
    position: absolute;
    height: 1px;
    bottom: 50px;

    width: 100%;
    box-shadow: 0 1px 0 0 #8893;
  }

  .car {
    position: absolute;
    width: 1em;
    aspect-ratio: 1;
    left: 0;
    bottom: 0;
    animation: Drive 5s infinite linear;
  }

  .car:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 5.5s;
  }
  .car:nth-child(3) {
    animation-delay: -7s;
    animation-duration: 5.55s;
  }
  .car:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 5.7s;
  }
  .car:nth-child(5) {
    animation-delay: -13s;
    animation-duration: 5.6s;
  }
  .car:nth-child(6) {
    animation-delay: -15s;
    animation-duration: 5.1s;
  }
  .car:nth-child(7) {
    animation-delay: -17s;
    animation-duration: 5.2s;
  }
  .car:nth-child(8) {
    animation-delay: -19s;
    animation-duration: 5.3s;
  }

  .building {
    position: absolute;
    width: 1em;
    aspect-ratio: 1;
    left: 40px;
    bottom: 0;
    font-size: 50px;
  }

  .building:nth-child(2) {
    left: 335px;
  }
  .building:nth-child(3) {
    left: 175px;
  }
  .building:nth-child(4) {
    left: 225px;
  }
  .building:nth-child(5) {
    left: 405px;
  }

  .sun,
  .moon {
    position: absolute;
    top: 0;
    left: 27%;

    font-size: 100px;
    width: 100px;
    aspect-ratio: 1;

    animation: SunDrive 0.3s;

    &[aria-hidden] {
      transform: translateY(300px) scale(0);
      transition: transform 0.3s;
    }
  }
}

@keyframes SunDrive {
  from {
    transform: translateY(300px) scale(0);
  }
  to {
    transform: translateY(0px);
  }
}

.sunrise .car {
  animation-play-state: paused;
}

@keyframes Drive {
  0% {
    transform: scaleX(-1);
  }
  45% {
    transform: translateX(calc(600px - 1em)) scaleX(-1);
  }
  50% {
    transform: translateX(calc(600px - 1em)) scaleX(1);
  }
  95% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(-1);
  }
}
</style>
<style>
::view-transition-old(sunrise),
::view-transition-new(sunrise) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(sunrise),
.dark::view-transition-new(sunrise) {
  z-index: 1;
}

::view-transition-new(sunrise),
.dark::view-transition-old(sunrise) {
  z-index: 9999;
}
</style>
