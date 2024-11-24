<script setup lang="ts">
import { ref } from 'vue';
import { ListboxInput, VListbox } from '@mookiepiece/strawberry-farm';

const model = ref([]);
const options: ListboxInput = [
	1,
	2,
	3,
	4,
	5,
	{ title: 'Symbols', options: [Symbol('Foo')] },
];
</script>

<template>
	<VListbox :options class="Listbox🩷" v-slot="{ option: { label } }">
		<div>- {{ label }}</div>
	</VListbox>
	<br />
	<VListbox v-model="model" :options class="Listbox🩷" />
	<br />
</template>

<style>
.Listbox🩷 {
	border: 1px solid var(--mat-air-15);
	&:focus-visible {
		outline: 0;
	}

	[role='group'] > h6 {
		padding: 10px 10px 0;
		user-select: none;
		pointer-events: none;
		font-weight: 600;
		font-size: 12px;
	}

	[role='option'] {
		padding: 10px;

		&:is(.Listbox🩷:focus-visible *).current {
			outline: 2px solid var(--500);
			outline-offset: -2px;
		}

		&:not([aria-disable='true']) {
			&:hover {
				background-color: var(--mat-air-1);
			}
			&:active {
				background-color: var(--mat-air-2);
			}
		}

		&[aria-selected='true'] {
			background-color: var(--100);

			&:hover {
				background-color: var(--200);
			}
			&:active {
				background-color: var(--300);
			}
		}
	}
}
</style>
