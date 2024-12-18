const t=`<script setup lang="ts">
import { ref } from 'vue';
import { VRadios } from '@mookiepiece/strawberry-farm';

const model = ref(3);
<\/script>

<template>
	<VRadios
		v-model="model"
		:options="['Grapes', 'Melon', { value: 'Strawberry', disabled: true }]"
	/>
</template>
`;export{t as default};
