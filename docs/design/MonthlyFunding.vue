<script setup lang="ts">
import dayjs from 'dayjs';
import {  h, reactive, ref } from 'vue';
import CalendarGrid, { useCalendarGrid } from './CalendarGrid.vue';

const salaDay = ref(15);
const funds = reactive<(number)[]>([1500, 200]);

const __today = ref(dayjs());

const month = ref(dayjs().locale('zh'));
const calendar = useCalendarGrid(month);

const renderCell = (date: number) => {
  const day = month.value.date(date);

  const today = __today.value.isSame(day, 'day');

  const [passed, total] = (() => {
    const season = day.month(day.month() - +(day.date() < salaDay.value));
    const max = season.daysInMonth();
    return [day.diff(season.date(Math.min(max, salaDay.value)), 'day'),max];
  })();

  const percentage = 1 - passed / total;

  if (!date) return h('div');
  return h('div', { class: { today } }, [
    h('span', day.format('D')),
    h('div', { class: 'funds' }, [
      h('span',{class: 'f3-3 clr-3'}, passed + ' / ' + total),
      ...funds.map(v =>
        h(
          'div',
          { 'data-fund-type': 1 },
          (v * percentage).toLocaleString('zh', {
            style: 'currency',
            currency: 'CNY',
            maximumFractionDigits: 0,
            useGrouping: false,
          }),
        ),
      ),
    ]),
  ]);
};
</script>

<template>
  <div class="mb-2">
    <h6>Salary day</h6>
    <input v-model="salaDay" type="number" />
  </div>
  <div class="mb-2">
    <h6>Fundings</h6>
    <input v-for="(_, i) in funds" v-model="funds[i]" type="number" />
    <button @click="funds.pop()">Remove</button>
    <button @click="funds.push(0)">Add</button>
  </div>

  <CalendarGrid
    class="MonthlyFunding"
    v-model="month"
    :calendar
    change-on-keydown
  >
    <template #header="{ index, name }">
      <div :style="index === 6 || index === 0 ? { color: '#f35e' } : undefined">
        {{ name }}
      </div>
    </template>
    <template #default="{ cell }">
      <component :is="renderCell(cell)" />
    </template>
  </CalendarGrid>
</template>

<style scoped>
input[type='number'] {
  width: 80px;
}
</style>

<style>
.MonthlyFunding {
  grid-template: 20px repeat(6, 100px) / repeat(7, 1fr);

  > * {
    display: grid;
    padding: 10px;
  }

  .columnheader {
    display: grid;
    align-content: end;
    padding: 0 10px;
  }

  .funds {
    margin-top: auto;
  }

  [data-fund-type]::before {
    display: inline-block;
    width: 8px;
    aspect-ratio: 1;
    border-radius: 999px;
    background: pink;
    content: '';
  }
  [data-fund-type]:nth-child(3)::before {
    background: cadetblue;
  }
  [data-fund-type] {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .today {
    box-shadow: inset 0 0 0 2px wheat;
  }
}
</style>
