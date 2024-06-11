const r=`<script setup lang="ts">\r
import VCheckboxGroup from '@mookiepiece/strawberry-farm/vue/VCheckboxGroup.vue';\r
import { ref } from 'vue';\r
\r
const v = ref([]);\r
\r
const options = ['Yes', 'No', { value: "I'm not sure", disabled: true }];\r
\r
const optionsPro = [\r
  {\r
    value: 'Minimum',\r
  },\r
  {\r
    value: 'Recommended',\r
  },\r
];\r
\r
const optionsProPlus: Record<\r
  string,\r
  {\r
    description: string;\r
    list: [string, string][];\r
  }\r
> = {\r
  Minimum: {\r
    description: 'Requires a 64-bit processor and operating system',\r
    list: [\r
      [\r
        'OS',\r
        \`Windows VISTA/7\\nDirectX ランタイム (June 2010) 以降の最新版がインストールされていること\`,\r
      ],\r
      ['CPU', \`十分な速度を持ったCPU\`],\r
      [\r
        'ビデオカード',\r
        \`DirectGraphic 対応の高速なビデオカード(推奨 VRAM 256M以上)\`,\r
      ],\r
    ],\r
  },\r
  Recommended: {\r
    description: 'Requires a 64-bit processor and operating system',\r
    list: [\r
      ['サウンド', \`Direct Sound対応のサウンドカード\`],\r
      ['その他', \`パッドコントローラ\\nある程度の弾幕免疫\\n傲慢な心（推奨）\`],\r
    ],\r
  },\r
};\r
<\/script>\r
\r
<template>\r
  <div class="[B] gap-2 pb-6">\r
    <VCheckboxGroup v-model="v" :options="options" />\r
  </div>\r
  <div class="[B] gap-2">\r
    <VCheckboxGroup\r
      v-model="v"\r
      :options="optionsPro"\r
      v-slot="{ option }"\r
    >\r
      <table class="my-2">\r
        <caption>\r
          {{\r
            optionsProPlus[option.value].description\r
          }}\r
        </caption>\r
        <tr v-for="i in optionsProPlus[option.value].list">\r
          <td class="pr-2">{{ i[0] }}</td>\r
          <td>{{ i[1] }}</td>\r
        </tr>\r
      </table>\r
    </VCheckboxGroup>\r
  </div>\r
</template>\r
`;export{r as default};
