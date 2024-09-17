<script setup lang="ts">
import { VListbox } from '@mookiepiece/strawberry-farm';
import { ref } from 'vue';

const model = ref(['Grapes']);

const options = [
  { value: 'Grapes', label: '🍇' },
  { value: 'Party Popper', label: '🎉' },
];
</script>

<template>
  <VListbox v-model="model" :options class="Listbox🎉" />
</template>

<style >
.Listbox🎉 {
  /* border: 1px solid var(--mat-air-15); */

  &:focus-visible {
    outline: 0;
  }

  [role='group'] > h6 {
    padding: 10px 10px 0;
  }

  [role='option'] {
    padding: 10px;

    &:is(.Listbox🎉:focus-visible *).current {
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
