const r=`<script setup lang="ts">\r
import { computed, reactive } from 'vue';\r
\r
type SeedString = '🍓' | '🍇' | '🌽' | '🍟';\r
\r
const SEED_NAME_MAP = new Map<\r
  SeedString,\r
  { name: string; value: number; rate: number }\r
>([\r
  ['🍓', { name: '草莓', value: 200, rate: 30 }],\r
  ['🍇', { name: '葡萄', value: 100, rate: 30 }],\r
  ['🌽', { name: '玉米', value: 50, rate: 30 }],\r
  ['🍟', { name: '薯条', value: 300, rate: 10 }],\r
]);\r
\r
let counter = 0;\r
class Fruit {\r
  id: number;\r
  type: SeedString;\r
  constructor(type: SeedString) {\r
    this.id = ++counter;\r
    this.type = type;\r
  }\r
}\r
\r
type Field = {\r
  seed?: Fruit;\r
  done?: boolean;\r
};\r
\r
type FarmState = {\r
  current: Fruit | null;\r
  bag: Fruit[];\r
  fields: Field[];\r
  wallet: number;\r
};\r
\r
const state = reactive<FarmState>({\r
  wallet: 300,\r
  bag: [new Fruit('🍓'), new Fruit('🍓')],\r
  current: null,\r
  fields: Array(9)\r
    .fill(0)\r
    .map(() => ({})),\r
});\r
\r
const select = (item: Fruit) => {\r
  state.current = state.current?.id === item.id ? null : item;\r
};\r
\r
const storeAvailable = computed(() => state.wallet >= 100);\r
const buy = () => {\r
  const candidates = [...SEED_NAME_MAP.entries()].map(\r
    ([type, { rate }]): [SeedString, number] => [type, rate],\r
  );\r
\r
  let s = Math.random() * 100 - Number.EPSILON;\r
  while (s > candidates[0][1]) {\r
    s -= candidates[0][1];\r
    candidates.shift();\r
  }\r
\r
  state.wallet -= 100;\r
  state.bag.push(new Fruit(candidates[0][0]));\r
};\r
\r
const plant = (field: Field) => {\r
  if (!state.current) return;\r
\r
  const index = state.bag.indexOf(state.current!);\r
  state.bag.splice(index, 1);\r
  [field.seed, state.current] = [state.current, null];\r
  setTimeout(() => (field.done = true), 3000);\r
};\r
\r
const harvest = (field: Field) => {\r
  if (!field.done) return;\r
  const { type } = field.seed!;\r
  field.seed = undefined;\r
  field.done = false;\r
\r
  state.wallet += SEED_NAME_MAP.get(type)!.value;\r
};\r
\r
const handleFieldClick = (field: Field) => {\r
  if (field.seed) {\r
    harvest(field);\r
  } else {\r
    plant(field);\r
  }\r
};\r
<\/script>\r
\r
<template>\r
  <div id="TheStrawberryFarm">\r
    <div>\r
      <div class="wallet">{{ state.wallet }}</div>\r
      <div\r
        class="store"\r
        role="button"\r
        :aria-disabled="!storeAvailable"\r
        @click="storeAvailable && buy()"\r
      >\r
        🎲\r
      </div>\r
    </div>\r
    <div class="Fieldset">\r
      <div\r
        class="Field"\r
        v-for="field of state.fields"\r
        @click="handleFieldClick(field)"\r
      >\r
        <div :class="field.done ? 'Available' : ''">\r
          {{ field.seed ? (field.done ? field.seed.type : '🌱') : null }}\r
        </div>\r
      </div>\r
    </div>\r
    <div class="TheBag">\r
      <div\r
        v-for="seed in state.bag"\r
        :key="seed.id"\r
        :aria-pressed="seed.id === state.current?.id"\r
        class="Seed"\r
        role="button"\r
        tabindex="0"\r
        @click="select(seed)"\r
        @keydown.space="select(seed)"\r
      >\r
        <div class="SeedImage">{{ seed.type }}</div>\r
        <div class="SeedTitle">\r
          {{ SEED_NAME_MAP.get(seed.type)?.name }}\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style>\r
#TheStrawberryFarm {\r
  display: grid;\r
  grid-template: auto 115px / minmax(100px, 100fr) 400fr minmax(100px, 100fr);\r
  position: relative;\r
  overflow: auto;\r
\r
  .wallet {\r
    display: inline-block;\r
    padding: 5px;\r
    padding-right: 10px;\r
    color: white;\r
    font-weight: 600;\r
    background: #815513;\r
    border: 2px solid #c07d18;\r
    user-select: none;\r
\r
    &::before {\r
      content: '💰 ';\r
    }\r
  }\r
\r
  .store {\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    width: 50px;\r
    height: 50px;\r
    margin-top: 30px;\r
    margin-bottom: -120px;\r
    font-size: 24px;\r
    background: #815513;\r
    border: 2px solid #c07d18;\r
    user-select: none;\r
\r
    &:not([aria-disabled='true']) {\r
      &:hover {\r
        filter: brightness(0.9);\r
      }\r
\r
      &:active {\r
        filter: brightness(0.75);\r
      }\r
    }\r
\r
    &[aria-disabled='true'] {\r
      filter: brightness(0.5);\r
    }\r
  }\r
\r
  .Fieldset {\r
    display: grid;\r
    grid-template-rows: 100px 100px 100px;\r
    grid-template-columns: 100px 100px 100px;\r
    gap: 0;\r
    width: 384px;\r
    height: 364px;\r
    margin: 0 auto;\r
    padding: 20px;\r
    background:\r
      no-repeat radial-gradient(rgb(153 231 172) 33%, transparent 70%) 80px 80px,\r
      #5fcf5f;\r
    border-radius: 8px;\r
    transform: scaleY(0.6) rotate(45deg);\r
    filter: drop-shadow(1px 1px 0 #489748) drop-shadow(1px 1px 0 #489748);\r
  }\r
\r
  .Field {\r
    display: inline-block;\r
    box-sizing: border-box;\r
    background: #966216\r
      repeating-linear-gradient(\r
        0deg,\r
        #0001 0,\r
        transparent 6px,\r
        transparent 14px,\r
        #0001 20px\r
      );\r
    border: 3px solid #966216;\r
    border-radius: 2px;\r
    box-shadow: inset 5px 5px 25px 10px #815513;\r
    filter: drop-shadow(2px 2px 0 #966216);\r
\r
    &:hover {\r
      border-color: #ddc;\r
    }\r
\r
    > div {\r
      position: relative;\r
      font-size: 48px;\r
      transform: rotate(-45deg) scaleY(1.6667);\r
      filter: drop-shadow(2px 2px rgb(255 253 127));\r
      user-select: none;\r
\r
      &.Available::before {\r
        position: absolute;\r
        margin: auto;\r
        inset: 0;\r
        width: 100%;\r
        aspect-ratio: 1;\r
        display: block;\r
        border-radius: 999px;\r
        animation: TheStrawberryFarmSuperSweetAnimation .3s ;\r
        content: '';\r
      }\r
    }\r
  }\r
\r
  .TheBag {\r
    position: relative;\r
    grid-area: 2/1/3/4;\r
    display: flex;\r
    gap: 5px;\r
    padding: 5px 10px;\r
    overflow: auto;\r
    height: 115px;\r
\r
    &::before {\r
      position: absolute;\r
      inset: 0;\r
      top: auto;\r
      height: 95px;\r
      background: #815513;\r
      border: 2px solid #c07d18;\r
      content: '';\r
    }\r
  }\r
\r
  .Seed {\r
    position: relative;\r
    flex-shrink: 0;\r
    width: 80px;\r
    height: 105px;\r
    overflow: hidden;\r
    background: linear-gradient(30deg, blanchedalmond, rgb(250 244 189));\r
    border: 2px solid rgb(238 219 193);\r
    border-radius: 4px;\r
    cursor: pointer;\r
    transition: all 0.1s;\r
    user-select: none;\r
\r
    &:not(.Seed[aria-pressed='true']):hover {\r
      transform: translateY(-3px);\r
    }\r
\r
    &.Seed[aria-pressed='true'] {\r
      transform: translateY(-6px);\r
    }\r
\r
    &::before {\r
      position: absolute;\r
      top: 0;\r
      left: 0;\r
      width: 36px;\r
      height: 24px;\r
      font-size: 17px;\r
      background: linear-gradient(90deg, #fff 30%, transparent);\r
      content: '🌱';\r
    }\r
\r
    .SeedImage {\r
      position: relative;\r
      top: 12px;\r
      z-index: 1;\r
      height: 60px;\r
      font-size: 40px;\r
      text-align: center;\r
    }\r
\r
    .SeedTitle {\r
      position: absolute;\r
      bottom: 3px;\r
      min-width: calc(100% - 6px);\r
      margin: 3px;\r
      font-size: 13px;\r
      line-height: 1.35;\r
      letter-spacing: 0.4px;\r
      text-align: center;\r
      color: #456;\r
      background: #fff;\r
      border: 1px solid #04a3;\r
      border-radius: 6px;\r
    }\r
  }\r
}\r
\r
@keyframes TheStrawberryFarmSuperSweetAnimation {\r
  from {\r
    border: solid 50px pink;\r
    background: white;\r
    transform: scale(0.6);\r
  }\r
  to {\r
    border: solid 0px white;\r
    background: transparent;\r
    transform: scale(1);\r
  }\r
}\r
</style>\r
`;export{r as default};
