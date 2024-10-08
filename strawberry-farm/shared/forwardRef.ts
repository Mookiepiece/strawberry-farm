import { computed, Ref } from 'vue';

/**
 * Note: `el` is preserved for mannually expose `defineExpose({ el })`.
 */
export const forwardRef = (thing: Ref<any>) =>
  computed(() => thing.value && (thing.value.el || thing.value.$el || thing.value));
