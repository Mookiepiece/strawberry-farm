<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
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
          levitate.place(btn, ppr);
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

  <Teleport v-if="show && popper" :to="popper">
    <div class="levitated">
      <slot />
    </div>
  </Teleport>
</template>
