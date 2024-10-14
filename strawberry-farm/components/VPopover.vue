<script lang="ts">
export type VPopoverProps = Omit<UsePopperProps, 'popper' | 'anchor'> & {
  unmount?: boolean;
};
</script>
<script setup lang="ts">
import { cloneVNode, h, reactive, ref, toRefs } from 'vue';
import { usePopper, UsePopperProps } from './VPopover';
import { child, forwardRef } from '../shared';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<VPopoverProps>(), { unmount: true });

const slots = defineSlots<{
  default: (scope: ReturnType<typeof usePopper>) => any;
  popper: (scope: ReturnType<typeof usePopper>) => any;
}>();

const _anchor = ref();
const _popper = ref();
const anchor = forwardRef(_anchor);
const popper = forwardRef(_popper);
const pop = usePopper(reactive({ ...toRefs(props), popper, anchor }));

const renderDefault = ($attrs: any) =>
  cloneVNode(child(slots.default(pop)) || h('i'), {
    ...$attrs,
  });

const renderPopper = ($attrs: any) =>
  cloneVNode(child(slots.popper(pop)) || h('i'), {
    ...$attrs,
    'data-pop': '',
  });

defineExpose({
  anchor,
  popper,
  pop,
});
</script>

<template>
  <component ref="_anchor" :is="renderDefault($attrs)" />
  <Teleport to="body">
    <i-edge v-if="pop.open" />
    <Transition v-if="animated">
      <!-- prettier-ignore -->
      <component ref="_popper" v-if="unmount && pop.open" v-show="unmount || pop.open" :is="renderPopper($attrs)" />
    </Transition>
    <template v-else>
      <!-- prettier-ignore -->
      <component ref="_popper" v-if="unmount && pop.open" v-show="unmount || pop.open" :is="renderPopper($attrs)" />
    </template>
    <i-edge v-if="pop.open" />
  </Teleport>
</template>

<style>
[data-pop].VActionSheet {
  box-shadow:
    var(--shadow),
    0 0 0 1px var(--mat-air-15);

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
