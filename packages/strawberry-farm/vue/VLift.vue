<script setup lang="ts">
import { useLift } from './Lift';
import VButton from './VButton.vue';
import VDialog from './VDialog.vue';

const { resolve, reject } = useLift();
</script>

<template>
  <VDialog title="Foo">
    <div class="[B] gap-1">
      <VButton @click="resolve(1)">Resolve</VButton>
      <VButton @reject="reject(2)">Reject</VButton>
    </div>
  </VDialog>
</template>
