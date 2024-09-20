<script setup lang="ts">
import { cloneVNode, h, onMounted, reactive, ref, toRefs } from 'vue';
import { usePopper, UsePopperProps } from '../vue/usePopover';
import { child } from '../shared';

defineOptions({ inheritAttrs: false });

const props = defineProps<Omit<UsePopperProps, 'popper' | 'reference'>>();

const slots = defineSlots<{
  default: any;
  popper: any;
}>();

const reference = ref();
const popper = ref();
const pop = usePopper(
  reactive({
    popper,
    reference,
    ...toRefs(props),
  }),
);

const forwardRef = ($attrs: any) =>
  cloneVNode(child(slots.default()) || h('i'), {
    ...$attrs,
    ref: reference,
  });
</script>

<template>
  <component :is="forwardRef($attrs)" />
  {{ pop.open }}
  <Teleport to="body">
    <div data-pop ref="popper" v-if="pop.open || pop.visible">
      <div data-pop-box tabindex="-1" class="VPopper">
        <slot name="popper"></slot>
      </div>
    </div>
  </Teleport>
</template>

<style>
.VPopper {
}
</style>
