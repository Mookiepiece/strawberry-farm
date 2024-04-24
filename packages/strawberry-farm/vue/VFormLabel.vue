<script setup lang="ts">
import { inject } from 'vue';
import { V_FORM_ITEM_LABEL_IN } from './Form';

const { id, label, asterisk } = inject(V_FORM_ITEM_LABEL_IN) || {};
const focus = () => document.getElementById(id!)?.focus();
</script>

<template>
  <label v-if="id && label" :for="id" tabindex="-1" @focus="focus"
    >{{ label }}
    <span class="clr-main" v-if="asterisk">*</span>
  </label>
</template>
