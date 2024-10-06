<script lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import { child } from '../shared';
import { onStepWheel } from '../html';
dayjs.extend(timezone);
dayjs.extend(localeData);

export const useCalendar = (model: Ref<Dayjs>) => {
  const nav = (delta: number) => {
    switch (delta) {
      case -Infinity:
        model.value = model.value.startOf('M');
        break;
      case Infinity:
        model.value = model.value.endOf('M');
        break;
      default:
        model.value = model.value.add(delta, 'd');
    }
  };

  const dates = computed(() => {
    const firstDayOfWeek = model.value.localeData().firstDayOfWeek();
    const days = model.value.daysInMonth();

    const day = model.value.startOf('M').day();
    const prepend = Array((day - firstDayOfWeek + 7) % 7).fill(0);
    const cells = Array(days)
      .fill(0)
      .map((_, i) => i + 1);
    const append = Array(42 - prepend.length - cells.length).fill(0);

    return [...prepend, ...cells, ...append];
  });

  return reactive({
    model,
    nav,
    dates,
  });
};
</script>

<script setup lang="ts">
import {
  cloneVNode,
  computed,
  h,
  reactive,
  Ref,
  ref,
  watch,
  watchEffect,
} from 'vue';

const model = defineModel<Dayjs>({
  default: () => dayjs(),
});

const props = defineProps<{
  calendar?: ReturnType<typeof useCalendar>;
  changeOnWheel?: boolean;
  changeOnKeydown?: boolean;
}>();

const slots = defineSlots<{
  header?(scope: { index: number; name: string }): any;
  default?(scope: { cell: number }): any;
}>();

const firstDayOfWeek = computed(() =>
  model.value.localeData().firstDayOfWeek(),
);

const calendar = props.calendar || useCalendar(model);

const columns = computed(() => {
  const raw = [...model.value.localeData().weekdaysMin()];
  let i = firstDayOfWeek.value;
  while (i--) raw.push(raw.shift()!);
  return raw;
});

const grid = ref<HTMLElement>();

watchEffect(onCleanup => {
  if (!props.changeOnWheel) return;
  const $grid = grid.value;
  if (!$grid) return;

  onCleanup(
    onStepWheel($grid, delta => {
      model.value = model.value.add(delta, 'M');
    }),
  );
});

const handleKeydown = (e: KeyboardEvent) => {
  if (!props.changeOnKeydown) return;

  if (e.target instanceof HTMLElement && e.target.matches('.VCalendar > *')) {
  } else return;

  const nav = (delta: number) => {
    e.preventDefault();
    calendar.nav(delta);
  };
  switch (e.key) {
    case 'Home':
      nav(-Infinity);
      break;
    case 'End':
      nav(Infinity);
      break;
    case 'ArrowUp':
      nav(-7);
      break;
    case 'ArrowDown':
      nav(7);
      break;
    case 'ArrowLeft':
      nav(-1);
      break;
    case 'ArrowRight':
      nav(1);
      break;
  }
};

watch(
  () => model.value,
  () => {
    if (document.activeElement?.matches('.VCalendar > *'))
      grid.value
        ?.querySelector<HTMLElement>('.VCalendar > [tabindex="0"]')
        ?.focus();
  },
  { flush: 'post' },
);

const renderHeader = (index: number, name: string) => {
  const vn = child(
    slots.header?.({ index: (index + firstDayOfWeek.value) % 7, name }) ??
      h('div', name),
  );
  return cloneVNode(vn!, {
    class: 'columnheader',
  });
};

const renderCell = (cell: number) => {
  const vn = child(
    slots.default?.({
      cell,
    }) ?? h('div', cell === 0 ? '·' : cell),
  );
  return cloneVNode(vn!, {
    tabindex: model.value.get('D') === cell ? '0' : '-1',
  });
};
</script>

<template>
  <div class="VCalendar" ref="grid" @keydown.exact="handleKeydown">
    <component
      v-for="(name, index) in columns"
      :key="name"
      :is="renderHeader(index, name)"
    />
    <component
      v-for="(date, index) in calendar.dates"
      :key="index"
      :is="renderCell(date)"
    />
  </div>
</template>

<style>
.VCalendar {
  display: grid;
  grid-template: repeat(7, 35px) / repeat(7, 35px);
}


</style>
