<script lang="ts">
export type TableColumn<T = any> = {
  name: keyof T | `remix${string}`;
  title?: string;

  width?: number;
  minWidth?: number;
};

type UnArray<T = any> =
  NonNullable<UnwrapRef<T>> extends Array<infer I>
    ? NonNullable<UnwrapRef<I>>
    : NonNullable<UnwrapRef<T>>;

export type TableColumns<T = any> = TableColumn<UnArray<T>>[];
</script>
<script setup lang="ts" generic="T = any">
import { ref, UnwrapRef } from 'vue';

const props = defineProps<{
  columns: TableColumn<T>[];
  data?: T[];
}>();

const data = [
  [
    'a.m.',
    'Clean room',
    'Football training',
    'Dance Course',
    'History Class',
    'Buy drinks',
    'Study hour',
    'Free time',
  ],
  [
    'p.m.',
    'Yoga',
    'Chess Club',
    'Meet friends',
    'Gymnastics',
    'Birthday party',
    'Fishing trip',
    'Free time',
  ],
];
</script>

<template>
  <div class="VTable"></div>
</template>

<style>
.VTable {
}
</style>
