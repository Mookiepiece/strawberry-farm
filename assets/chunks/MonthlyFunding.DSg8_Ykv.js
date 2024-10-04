const n=`<script setup lang="ts">\r
import dayjs from 'dayjs';\r
import {  h, reactive, ref } from 'vue';\r
import CalendarGrid, { useCalendarGrid } from './CalendarGrid.vue';\r
\r
const salaDay = ref(15);\r
const funds = reactive<(number)[]>([1500, 200]);\r
\r
const __today = ref(dayjs());\r
\r
const month = ref(dayjs().locale('zh'));\r
const calendar = useCalendarGrid(month);\r
\r
const renderCell = (date: number) => {\r
  const day = month.value.date(date);\r
\r
  const today = __today.value.isSame(day, 'day');\r
\r
  const [passed, total] = (() => {\r
    const season = day.month(day.month() - +(day.date() < salaDay.value));\r
    const max = season.daysInMonth();\r
    return [day.diff(season.date(Math.min(max, salaDay.value)), 'day'),max];\r
  })();\r
\r
  const percentage = 1 - passed / total;\r
\r
  if (!date) return h('div');\r
  return h('div', { class: { today } }, [\r
    h('span', day.format('D')),\r
    h('div', { class: 'funds' }, [\r
      h('span',{class: 'f3-3 clr-3'}, passed + ' / ' + total),\r
      ...funds.map(v =>\r
        h(\r
          'div',\r
          { 'data-fund-type': 1 },\r
          (v * percentage).toLocaleString('zh', {\r
            style: 'currency',\r
            currency: 'CNY',\r
            maximumFractionDigits: 0,\r
            useGrouping: false,\r
          }),\r
        ),\r
      ),\r
    ]),\r
  ]);\r
};\r
<\/script>\r
\r
<template>\r
  <div class="mb-2">\r
    <h6>Salary day</h6>\r
    <input v-model="salaDay" type="number" />\r
  </div>\r
  <div class="mb-2">\r
    <h6>Fundings</h6>\r
    <input v-for="(_, i) in funds" v-model="funds[i]" type="number" />\r
    <button @click="funds.pop()">Remove</button>\r
    <button @click="funds.push(0)">Add</button>\r
  </div>\r
\r
  <CalendarGrid\r
    class="MonthlyFunding"\r
    v-model="month"\r
    :calendar\r
    change-on-keydown\r
  >\r
    <template #header="{ index, name }">\r
      <div :style="index === 6 || index === 0 ? { color: '#f35e' } : undefined">\r
        {{ name }}\r
      </div>\r
    </template>\r
    <template #default="{ cell }">\r
      <component :is="renderCell(cell)" />\r
    </template>\r
  </CalendarGrid>\r
</template>\r
\r
<style scoped>\r
input[type='number'] {\r
  width: 80px;\r
}\r
</style>\r
\r
<style>\r
.MonthlyFunding {\r
  grid-template: 20px repeat(6, 100px) / repeat(7, 1fr);\r
\r
  > * {\r
    display: grid;\r
    padding: 10px;\r
  }\r
\r
  .columnheader {\r
    display: grid;\r
    align-content: end;\r
    padding: 0 10px;\r
  }\r
\r
  .funds {\r
    margin-top: auto;\r
  }\r
\r
  [data-fund-type]::before {\r
    display: inline-block;\r
    width: 8px;\r
    aspect-ratio: 1;\r
    border-radius: 999px;\r
    background: pink;\r
    content: '';\r
  }\r
  [data-fund-type]:nth-child(3)::before {\r
    background: cadetblue;\r
  }\r
  [data-fund-type] {\r
    font-size: 12px;\r
    display: flex;\r
    align-items: center;\r
    gap: 2px;\r
  }\r
\r
  .today {\r
    box-shadow: inset 0 0 0 2px wheat;\r
  }\r
}\r
</style>\r
`;export{n as default};
