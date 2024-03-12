<script setup lang="ts">
import { Transition, onUnmounted, ref, watch } from 'vue';
import { Bag, levitate } from '../functions';
import { sf7 } from '../html/sf7';

// const random = inc('VLevitated');

const props = withDefaults(
  defineProps<{
    open?: boolean;
    class?: any;
    type?: 'submit' | 'reset' | 'button';
  }>(),
  {
    type: 'button',
  },
);

const show = ref(false);

const button = ref<Element>();
const popper = ref<HTMLDivElement>();

const bag = Bag();
onUnmounted(bag);

watch(show, show => {
  if (show) {
    if (button.value) {
      const ppr = (popper.value = sf7('div', {
        class: 'fixed (///)',
      }) as HTMLDivElement);
      document.body.appendChild(ppr);
      const btn = button.value;

      bag(
        levitate.auto(btn, () => {
          levitate.place(btn, ppr, {
            offset: 10,
          });
        }),
      );

      bag(() => {
        ppr.remove();
        popper.value = undefined;
      });
    }
  } else {
    bag();
  }
});
</script>

<template>
  <button
    ref="button"
    class="sf-button"
    @click="show = !show"
    :class="props.class"
    :type="props.type"
  >
    Nike
  </button>

  <Teleport :disabled="!show || !popper" :to="popper">
    <Transition name="test-popper">
      <div v-if="show && popper" class="levitated">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.test-popper-enter-from {
  transform: scale(0);
}

.test-popper-enter-active {
  transition: all 0.3s;
}

.test-popper-enter-to {
  transform: scale(1);
}
</style>
