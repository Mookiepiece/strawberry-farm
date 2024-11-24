<script setup lang="ts">
import { ref } from 'vue';
import { applyTransform, levitate } from '@mookiepiece/strawberry-farm';

const anchor = ref<HTMLElement>();
const pop = ref<HTMLElement>();

const visible = ref(false);

const changeDir = (_dir: any) => {
	visible.value = !visible.value;

	levitate(anchor.value!, pop.value!, {
		dir: _dir,
		plugins: [applyTransform],
	});
};
</script>

<template>
	<div ref="anchor" class="reference 🍒" />
	<Teleport to="body">
		<div
			ref="pop"
			class="floating 🍒"
			:style="!visible ? { clipPath: 'circle(0)' } : {}"
		>
			🍓
		</div>
	</Teleport>
	<button @click="changeDir('top')">Top</button>
</template>

<style scoped>
.reference {
	width: 100px;
	height: 100px;
}
.floating {
	position: fixed;
	top: 0;
	left: 0;
	padding: 10px;
	z-index: 1;
}
</style>
