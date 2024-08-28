<script setup lang="ts">
import { inject } from 'vue';
import { V_FORM_ITEM_LABEL_IN } from './Form';

const _ = inject(V_FORM_ITEM_LABEL_IN) || { id: '', asterisk: false };
const focus = () => document.getElementById(_.id!)?.focus();
</script>

<template>
  <label v-if="_.id && _.label" :for="_.id" tabindex="-1" @focus="focus"
    >{{ _.label }}
    <span class="clr-main" v-if="_.asterisk">*</span>
  </label>
</template>
