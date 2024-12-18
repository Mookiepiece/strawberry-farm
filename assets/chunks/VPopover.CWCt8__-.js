const t=`<script lang="ts">
export type VPopoverProps = Omit<UsePopperProps, 'popper' | 'anchor'>;
<\/script>
<script setup lang="ts">
import {
	cloneVNode,
	defineComponent,
	h,
	reactive,
	toRefs,
	useTemplateRef,
} from 'vue';
import { usePopper, UsePopperProps } from './VPopover';
import { child, forwardRef } from '../shared';

defineOptions({ inheritAttrs: false });

const props = defineProps<VPopoverProps>();

const slots = defineSlots<{
	default: (scope: ReturnType<typeof usePopper>) => any;
	popper: (scope: ReturnType<typeof usePopper>) => any;
}>();

const anchor = forwardRef(useTemplateRef('_anchor'));
const popper = forwardRef(useTemplateRef('_popper'));
const pop = usePopper(reactive({ ...toRefs(props), popper, anchor }));

const renderDefault = ($attrs: any) =>
	cloneVNode(child(slots.default(pop)) || h('i'), {
		...$attrs,
	});

const Popover = defineComponent(
	() => () =>
		cloneVNode(child(slots.popper(pop)) || h('i'), {
			'data-pop': '',
		}),
);

defineExpose({
	anchor,
	popper,
	pop,
});
<\/script>

<template>
	<component ref="_anchor" :is="renderDefault($attrs)" />
	<Teleport to="body" :disabled="!(pop.open || popper)">
		<i-edge v-if="pop.open" />
		<!-- prettier-ignore -->
		<Transition v-if="animated">
      <component ref="_popper" v-if="pop.open" :is="Popover" />
    </Transition>
		<template v-else>
			<component ref="_popper" v-if="pop.open" :is="Popover" />
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
`;export{t as default};
