<script setup lang="ts">
import { cloneVNode, h, reactive, ref, toRefs } from 'vue';
import { usePopper, UsePopperProps } from '../vue/usePopover';
import { child } from '../shared';

defineOptions({ inheritAttrs: false });

const props = defineProps<Omit<UsePopperProps, 'popper' | 'anchor'>>();

const slots = defineSlots<{
  default: any;
  popper: any;
}>();

const anchor = ref();
const popper = ref();
const pop = usePopper(reactive({ ...toRefs(props), popper, anchor }));

const forwardRef = ($attrs: any) =>
  cloneVNode(child(slots.default()) || h('i'), {
    ...$attrs,
    ref: anchor,
  });

defineExpose({
  anchor,
  popper,
  pop,
});
</script>

<template>
  <component :is="forwardRef($attrs)" />
  <Teleport to="body">
    <span data-edge tabindex="0" v-if="pop.open"></span>
    <div
      data-pop
      ref="popper"
      v-if="pop.open || pop.visible"
      class="VActionSheet"
    >
      <slot name="popper"></slot>
    </div>
    <span data-edge tabindex="0" v-if="pop.open"></span>
  </Teleport>
</template>

<style>
[data-pop].VActionSheet {
  &:where(:is(.v-enter-from, .v-leave-to)) {
    opacity: 0;

    &:where([data-dir='bottom']) {
      transform: translateY(-10px);
    }
    &:where([data-dir='top']) {
      transform: translateY(10px);
    }
    &:where([data-dir='left']) {
      transform: translateX(-10px);
    }
    &:where([data-dir='right']) {
      transform: translateX(10px);
    }
  }

  &:where(
      :is(
          .v-enter-active:not(.v-enter-from),
          .v-leave-active:not(.v-leave-from)
        )
    ) {
    transition:
      opacity 0.2s var(--curve-wave),
      transform 0.2s var(--curve-wave);
  }
}
</style>
