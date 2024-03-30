<script setup lang="ts">
import VRadioGroup from '@mookiepiece/strawberry-farm/vue/VRadioGroup.vue';
import { ref } from 'vue';

const v = ref();

const options = ['Yes', 'No', { value: "I'm not sure", disabled: true }];
</script>

<template>
  <div class="[B] gap-2">
    <div>
      <VRadioGroup clearable v-model="v" :options="options" />
    </div>
    <div>
      <VRadioGroup v-model="v" :options="options" />
    </div>
    <div>
      <VRadioGroup disabled clearable v-model="v" :options="options" />
    </div>
  </div>
</template>
