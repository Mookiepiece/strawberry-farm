<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { trap } from '../shared';

defineOptions({
	inheritAttrs: false,
});

const model = defineModel();

const props = defineProps<{
	strong?: boolean;
}>();

const curtain = ref<HTMLElement>();
watchEffect(onCleanup => {
	const $ = curtain.value;
	$ && onCleanup(trap($));
});

const close = () => void (!props.strong && (model.value = false));
</script>

<template>
	<Teleport to="body">
		<Transition>
			<div
				v-if="model"
				class="VCurtain"
				@keydown.esc.prevent="close"
				@click.self.prevent="close"
				tabindex="-1"
				ref="curtain"
			>
				<div class="VModal" v-bind="$attrs">
					<slot />
				</div>
			</div>
		</Transition>
	</Teleport>
</template>
