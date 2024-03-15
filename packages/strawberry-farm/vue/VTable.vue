<script setup lang="ts">
import { computed, ref } from 'vue';

const _header = ref([
  '<<Period',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat>>',
  'Sun>>',
]);

type TableColumn = {
  name: string;
  classes: string[];
};

const columns = computed(() =>
  _header.value.map(h => {
    const fixedStart = h.startsWith('<<');
    const fixedEnd = h.endsWith('>>');
    const name = fixedStart
      ? h.substring(2)
      : fixedEnd
        ? h.substring(0, h.length - 2)
        : h;

    const column: TableColumn = { name, classes: [] };

    fixedStart && column.classes.push('--start');
    fixedEnd && column.classes.push('--end');

    return column;
  }),
);

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
  <div class="sf-table">
    <table>
      <colgroup>
        <col style="    width:500px; " />
        <col style="    width:20px ; "/>
        <col style="    width:10px; " />
        <col style="    width:10px; " />
        <col style="    width:10px; " />
        <col style="    width:40px ; "/>
        <col style="    width:40px ; "/>
        <col style="    min-width:40px ; " />
      </colgroup>
      <tr>
        <th v-for="h in columns" :key="h.name">
          <div class="__cell" :class="h.classes">
            {{ h.name }}
          </div>
        </th>
      </tr>
      <tr v-for="row in data">
        <component
          v-for="(cell, index) in row"
          :key="index"
          :is="index === 0 ? 'th' : 'td'"
          > <div class="__cell" :class="columns[index].classes">
            {{ cell }}
          </div></component
        >
      </tr>
    </table>
  </div>
</template>

<style>
.sf-table {
  position: relative;
  overflow: auto;

  table {
    --count: 8;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  th {
    font-size: var(--f2);
    color: var(--text2);
    font-weight: 600;
  }

  th,
  td {
    padding: 0;
    border-top: 1px solid rgb(160 160 160);
    border-bottom: 1px solid rgb(160 160 160);
    text-align: center;
  }

  td {
    width: calc(100% / var(--count));
    max-width: 40px;
  }

  .--end {
    position: sticky;
    right: 0;
  }

  .weekdays {
    background-color: #d7d9f2;
  }

  .weekend {
    background-color: #ffe8d4;
  }

  table {
    font-family: sans-serif;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
}
</style>
