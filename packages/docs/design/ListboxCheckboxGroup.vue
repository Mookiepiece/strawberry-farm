<script setup lang="ts">
import VCheckboxGroup from '@mookiepiece/strawberry-farm/vue/VCheckboxGroup.vue';
import { ref } from 'vue';

const v = ref([]);

const options = ['Yes', 'No', { value: "I'm not sure", disabled: true }];

const optionsPro = [
  {
    value: 'Minimum',
  },
  {
    value: 'Recommended',
  },
];

const optionsProPlus: Record<
  string,
  {
    description: string;
    list: [string, string][];
  }
> = {
  Minimum: {
    description: 'Requires a 64-bit processor and operating system',
    list: [
      [
        'OS',
        `Windows VISTA/7\nDirectX ランタイム (June 2010) 以降の最新版がインストールされていること`,
      ],
      ['CPU', `十分な速度を持ったCPU`],
      [
        'ビデオカード',
        `DirectGraphic 対応の高速なビデオカード(推奨 VRAM 256M以上)`,
      ],
    ],
  },
  Recommended: {
    description: 'Requires a 64-bit processor and operating system',
    list: [
      ['サウンド', `Direct Sound対応のサウンドカード`],
      ['その他', `パッドコントローラ\nある程度の弾幕免疫\n傲慢な心（推奨）`],
    ],
  },
};
</script>

<template>
  <div class="[B] gap-2 pb-6">
    <VCheckboxGroup v-model="v" :options="options" />
  </div>
  <div class="[B] gap-2">
    <VCheckboxGroup
      v-model="v"
      :options="optionsPro"
      v-slot="{ option }"
    >
      <table class="my-2">
        <caption>
          {{
            optionsProPlus[option.value].description
          }}
        </caption>
        <tr v-for="i in optionsProPlus[option.value].list">
          <td class="pr-2">{{ i[0] }}</td>
          <td>{{ i[1] }}</td>
        </tr>
      </table>
    </VCheckboxGroup>
  </div>
</template>
