<script setup lang="ts">
import { inject } from 'vue';

const { id, label }: { id?: string; label?: string } =
  inject('VFormItemLabel') || {};
const focus = () => document.getElementById(id as string)?.focus();
</script>

<template>
  <label v-if="id && label" :for="id" tabindex="-1" @focus="focus">{{
    label
  }}</label>
</template>
