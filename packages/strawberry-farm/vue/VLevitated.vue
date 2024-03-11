<script setup lang="ts">
import { ref, watch } from 'vue';
import { levitate } from '../functions';

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

watch(show, show => {
  if (show) {
    if (button.value && popper.value) {
      levitate.place(button.value, popper.value);
    }
  }
});

// const a =
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

  <Teleport to="#VLV" disabled>
    <div v-if="show" class="levitated" ref="popper">
      <slot />
    </div>
  </Teleport>
</template>
