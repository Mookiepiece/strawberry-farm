<script setup lang="ts">
import { ListboxInput, VListbox } from '@mookiepiece/strawberry-farm';

const options: ListboxInput = [
  1,
  2,
  { title: 'Symbols', options: [Symbol('Foo')] },
];
</script>

<template>
  <VListbox :options class="Listbox🩷" />
</template>

<style>
.Listbox🩷 {
  &:focus-visible {
    outline: 0;
  }
  [role='option'] {
    padding: 10px;

    &:is(.Listbox🩷:focus-visible *).current {
      outline: 2px solid var(--5);
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
      background-color: var(--1);

      &:hover {
        background-color: var(--2);
      }
      &:active {
        background-color: var(--3);
      }
    }
  }
}
</style>
