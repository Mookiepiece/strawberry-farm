const n=`<script lang="ts">\r
import dayjs, { Dayjs } from 'dayjs';\r
import timezone from 'dayjs/plugin/timezone';\r
import localeData from 'dayjs/plugin/localeData';\r
import 'dayjs/locale/zh';\r
import 'dayjs/locale/ja';\r
import { child, onStepWheel } from '@mookiepiece/strawberry-farm';\r
dayjs.extend(timezone);\r
dayjs.extend(localeData);\r
\r
export const useCalendarGrid = (model: Ref<Dayjs>) => {\r
  const nav = (delta: number) => {\r
    switch (delta) {\r
      case -Infinity:\r
        model.value = model.value.startOf('M');\r
        break;\r
      case Infinity:\r
        model.value = model.value.endOf('M');\r
        break;\r
      default:\r
        model.value = model.value.add(delta, 'd');\r
    }\r
  };\r
\r
  const dates = computed(() => {\r
    const firstDayOfWeek = model.value.localeData().firstDayOfWeek();\r
    const days = model.value.daysInMonth();\r
\r
    const day = model.value.startOf('M').day();\r
    const prepend = Array((day - firstDayOfWeek + 7) % 7).fill(0);\r
    const cells = Array(days)\r
      .fill(0)\r
      .map((_, i) => i + 1);\r
    const append = Array(42 - prepend.length - cells.length).fill(0);\r
\r
    return [...prepend, ...cells, ...append];\r
  });\r
\r
  return reactive({\r
    model,\r
    nav,\r
    dates,\r
  });\r
};\r
<\/script>\r
\r
<script setup lang="ts">\r
import {\r
  cloneVNode,\r
  computed,\r
  h,\r
  reactive,\r
  Ref,\r
  ref,\r
  watch,\r
  watchEffect,\r
} from 'vue';\r
\r
const model = defineModel<Dayjs>({\r
  default: () => dayjs(),\r
});\r
\r
const props = defineProps<{\r
  calendar?: ReturnType<typeof useCalendarGrid>;\r
  changeOnWheel?: boolean;\r
  changeOnKeydown?: boolean;\r
}>();\r
\r
const slots = defineSlots<{\r
  header?(scope: { index: number; name: string }): any;\r
  default?(scope: { cell: number }): any;\r
}>();\r
\r
const firstDayOfWeek = computed(() =>\r
  model.value.localeData().firstDayOfWeek(),\r
);\r
\r
const calendar = props.calendar || useCalendarGrid(model);\r
\r
const columns = computed(() => {\r
  const raw = [...model.value.localeData().weekdaysMin()];\r
  let i = firstDayOfWeek.value;\r
  while (i--) raw.push(raw.shift()!);\r
  return raw;\r
});\r
\r
const grid = ref<HTMLElement>();\r
\r
watchEffect(onCleanup => {\r
  if (!props.changeOnWheel) return;\r
  const $grid = grid.value;\r
  if (!$grid) return;\r
\r
  onCleanup(\r
    onStepWheel($grid, delta => {\r
      model.value = model.value.add(delta, 'M');\r
    }),\r
  );\r
});\r
\r
const handleKeydown = (e: KeyboardEvent) => {\r
  if (!props.changeOnKeydown) return;\r
\r
  if (\r
    e.target instanceof HTMLElement &&\r
    e.target.matches('.VCalendarGrid > *')\r
  ) {\r
  } else return;\r
\r
  const nav = (delta: number) => {\r
    e.preventDefault();\r
    calendar.nav(delta);\r
  };\r
  switch (e.key) {\r
    case 'Home':\r
      nav(-Infinity);\r
      break;\r
    case 'End':\r
      nav(Infinity);\r
      break;\r
    case 'ArrowUp':\r
      nav(-7);\r
      break;\r
    case 'ArrowDown':\r
      nav(7);\r
      break;\r
    case 'ArrowLeft':\r
      nav(-1);\r
      break;\r
    case 'ArrowRight':\r
      nav(1);\r
      break;\r
  }\r
};\r
\r
watch(\r
  () => model.value,\r
  () => {\r
    if (document.activeElement?.matches('.VCalendarGrid > *'))\r
      grid.value\r
        ?.querySelector<HTMLElement>('.VCalendarGrid > [tabindex="0"]')\r
        ?.focus();\r
  },\r
  { flush: 'post' },\r
);\r
\r
const renderHeader = (index: number, name: string) => {\r
  const vn = child(\r
    slots.header?.({ index: (index + firstDayOfWeek.value) % 7, name }) ??\r
      h('div', name),\r
  );\r
  return cloneVNode(vn!, {\r
    class: 'columnheader',\r
  });\r
};\r
\r
const renderCell = (cell: number) => {\r
  const vn = child(\r
    slots.default?.({\r
      cell,\r
    }) ?? h('div', cell === 0 ? '·' : cell),\r
  );\r
  return cloneVNode(vn!, {\r
    tabindex: model.value.get('D') === cell ? '0' : '-1',\r
  });\r
};\r
<\/script>\r
\r
<template>\r
  <div class="VCalendarGrid" ref="grid" @keydown.exact="handleKeydown">\r
    <component\r
      v-for="(name, index) in columns"\r
      :key="name"\r
      :is="renderHeader(index, name)"\r
    />\r
    <component\r
      v-for="(date, index) in calendar.dates"\r
      :key="index"\r
      :is="renderCell(date)"\r
    />\r
  </div>\r
</template>\r
\r
<style>\r
.VCalendarGrid {\r
  display: grid;\r
  grid-template: repeat(7, 35px) / repeat(7, 35px);\r
}\r
\r
.VCalendarGrid > * {\r
  /* place-content: center; */\r
  /* outline: 1px solid;\r
  outline-offset: -1px;\r
\r
  &[tabindex='0'] {\r
    outline: 2px solid #f94;\r
    outline-offset: -2px;\r
  } */\r
}\r
\r
.columnheader {\r
  font-size: 12px;\r
}\r
</style>\r
`;export{n as default};
