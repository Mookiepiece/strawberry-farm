import { computed, Ref } from 'vue';

/**
 * `defineExpose({ el })` > `componentRef.$el` > `elementRef.value`.
 */
export const forwardRef = (_: Ref<any>) =>
	computed(
		() => _.value && (_.value.el || _.value.$el || _.value),
	);
