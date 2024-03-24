<script setup lang="ts">
import { computed, reactive } from 'vue';

type SeedString = '🍓' | '🍇' | '🌽' | '🍟';

const SEED_NAME_MAP = new Map<
  SeedString,
  { name: string; value: number; rate: number }
>([
  ['🍓', { name: '草莓', value: 200, rate: 30 }],
  ['🍇', { name: '葡萄', value: 100, rate: 30 }],
  ['🌽', { name: '玉米', value: 50, rate: 30 }],
  ['🍟', { name: '薯条', value: 300, rate: 10 }],
]);

let counter = 0;
class Fruit {
  id: number;
  type: SeedString;
  constructor(type: SeedString) {
    this.id = ++counter;
    this.type = type;
  }
}

type Field = {
  seed?: Fruit;
  done?: boolean;
};

type FarmState = {
  current: Fruit | null;
  bag: Fruit[];
  fields: Field[];
  wallet: number;
};

const state = reactive<FarmState>({
  wallet: 300,
  bag: [new Fruit('🍓'), new Fruit('🍓')],
  current: null,
  fields: Array(9)
    .fill(0)
    .map(() => ({})),
});

const select = (item: Fruit) => {
  state.current = state.current?.id === item.id ? null : item;
};

const storeAvailable = computed(() => state.wallet >= 100);
const buy = () => {
  const candidates = [...SEED_NAME_MAP.entries()].map(
    ([type, { rate }]): [SeedString, number] => [type, rate],
  );

  let s = Math.random() * 100 - Number.EPSILON;
  while (s > candidates[0][1]) {
    s -= candidates[0][1];
    candidates.shift();
  }

  state.wallet -= 100;
  state.bag.push(new Fruit(candidates[0][0]));
};

const plant = (field: Field) => {
  if (!state.current) return;

  const index = state.bag.indexOf(state.current!);
  state.bag.splice(index, 1);
  [field.seed, state.current] = [state.current, null];
  setTimeout(() => (field.done = true), 3000);
};

const harvest = (field: Field) => {
  if (!field.done) return;
  const { type } = field.seed!;
  field.seed = undefined;
  field.done = false;

  state.wallet += SEED_NAME_MAP.get(type)!.value;
};

const handleFieldClick = (field: Field) => {
  if (field.seed) {
    harvest(field);
  } else {
    plant(field);
  }
};
</script>

<template>
  <div id="TheStrawberryFarm">
    <div>
      <div class="wallet">{{ state.wallet }}</div>
      <div
        class="store"
        role="button"
        :aria-disabled="!storeAvailable"
        @click="storeAvailable && buy()"
      >
        🎲
      </div>
    </div>
    <div class="Fieldset">
      <div
        class="Field"
        v-for="field of state.fields"
        @click="handleFieldClick(field)"
      >
        <div :class="field.done ? 'Available' : ''">
          {{ field.seed ? (field.done ? field.seed.type : '🌱') : null }}
        </div>
      </div>
    </div>
    <div class="TheBag">
      <div
        v-for="seed in state.bag"
        :key="seed.id"
        :aria-pressed="seed.id === state.current?.id"
        class="Seed"
        role="button"
        tabindex="0"
        @click="select(seed)"
        @keydown.space="select(seed)"
      >
        <div class="SeedImage">{{ seed.type }}</div>
        <div class="SeedTitle">
          {{ SEED_NAME_MAP.get(seed.type)?.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#TheStrawberryFarm {
  display: grid;
  grid-template: auto 115px / minmax(100px, 100fr) 400fr minmax(100px, 100fr);
  position: relative;
  overflow: auto;

  .wallet {
    display: inline-block;
    padding: 5px;
    padding-right: 10px;
    color: white;
    font-weight: 600;
    background: #815513;
    border: 2px solid #c07d18;
    user-select: none;

    &::before {
      content: '💰 ';
    }
  }

  .store {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-top: 30px;
    margin-bottom: -120px;
    font-size: 24px;
    background: #815513;
    border: 2px solid #c07d18;
    user-select: none;

    &:not([aria-disabled='true']) {
      &:hover {
        filter: brightness(0.9);
      }

      &:active {
        filter: brightness(0.75);
      }
    }

    &[aria-disabled='true'] {
      filter: brightness(0.5);
    }
  }

  .Fieldset {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    gap: 0;
    width: 384px;
    height: 364px;
    margin: 0 auto;
    padding: 20px;
    background:
      no-repeat radial-gradient(rgb(153 231 172) 33%, transparent 70%) 80px 80px,
      #5fcf5f;
    border-radius: 8px;
    transform: scaleY(0.6) rotate(45deg);
    filter: drop-shadow(1px 1px 0 #489748) drop-shadow(1px 1px 0 #489748);
  }

  .Field {
    display: inline-block;
    box-sizing: border-box;
    background: #966216
      repeating-linear-gradient(
        0deg,
        #0001 0,
        transparent 6px,
        transparent 14px,
        #0001 20px
      );
    border: 3px solid #966216;
    border-radius: 2px;
    box-shadow: inset 5px 5px 25px 10px #815513;
    filter: drop-shadow(2px 2px 0 #966216);

    &:hover {
      border-color: #ddc;
    }

    > div {
      position: relative;
      font-size: 48px;
      transform: rotate(-45deg) scaleY(1.6667);
      filter: drop-shadow(2px 2px rgb(255 253 127));
      user-select: none;

      &.Available::before {
        position: absolute;
        margin: auto;
        inset: 0;
        width: 100%;
        aspect-ratio: 1;
        display: block;
        border-radius: 999px;
        animation: TheStrawberryFarmSuperSweetAnimation .3s ;
        content: '';
      }
    }
  }

  .TheBag {
    position: relative;
    grid-area: 2/1/3/4;
    display: flex;
    gap: 5px;
    padding: 5px 10px;
    overflow: auto;
    height: 115px;

    &::before {
      position: absolute;
      inset: 0;
      top: auto;
      height: 95px;
      background: #815513;
      border: 2px solid #c07d18;
      content: '';
    }
  }

  .Seed {
    position: relative;
    flex-shrink: 0;
    width: 80px;
    height: 105px;
    overflow: hidden;
    background: linear-gradient(30deg, blanchedalmond, rgb(250 244 189));
    border: 2px solid rgb(238 219 193);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.1s;
    user-select: none;

    &:not(.Seed[aria-pressed='true']):hover {
      transform: translateY(-3px);
    }

    &.Seed[aria-pressed='true'] {
      transform: translateY(-6px);
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 24px;
      font-size: 17px;
      background: linear-gradient(90deg, #fff 30%, transparent);
      content: '🌱';
    }

    .SeedImage {
      position: relative;
      top: 12px;
      z-index: 1;
      height: 60px;
      font-size: 40px;
      text-align: center;
    }

    .SeedTitle {
      position: absolute;
      bottom: 3px;
      min-width: calc(100% - 6px);
      margin: 3px;
      font-size: 13px;
      line-height: 1.35;
      letter-spacing: 0.4px;
      text-align: center;
      color: #456;
      background: #fff;
      border: 1px solid #04a3;
      border-radius: 6px;
    }
  }
}

@keyframes TheStrawberryFarmSuperSweetAnimation {
  from {
    border: solid 50px pink;
    background: white;
    transform: scale(0.6);
  }
  to {
    border: solid 0px white;
    background: transparent;
    transform: scale(1);
  }
}
</style>
