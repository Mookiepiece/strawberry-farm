<script setup lang="ts">
import { Transition, onUnmounted, ref, watch } from 'vue';
import { Bag, levitate } from '../functions';
import { sf7 } from '../html/sf7';

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

const autoBag = Bag();
onUnmounted(autoBag);

watch(show, show => {
  autoBag();
  if (show) {
    if (button.value) {
      const ppr = (popper.value = sf7('div', {
        class: 'fixed (///)',
      }) as HTMLDivElement);
      document.body.appendChild(ppr);
      const btn = button.value;

      autoBag(
        levitate.auto(btn, () => {
          levitate(btn, ppr, {
            offset: 10,
          });
        }),
      );
    }
  }
});

const remove = () => {
  popper.value?.remove();
  popper.value = undefined;
};

onUnmounted(remove);
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

  <Teleport :disabled="!popper" :to="popper">
    <Transition name="test-popper" @after-leave="() => remove()">
      <div v-if="show && popper" class="levitated">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.test-popper-enter-from,
.test-popper-leave-to {
  transform: scale(0);
}

.test-popper-enter-active,
.test-popper-leave-active {
  transition: all 3s;
}

.test-popper-enter-to,
.test-popper-leave-from {
  transform: scale(1);
}
</style>
