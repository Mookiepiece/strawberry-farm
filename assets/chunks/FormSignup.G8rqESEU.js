const r=`<script setup lang="ts">\r
import { Form } from '@mookiepiece/strawberry-farm/vue/Form';\r
import { Toast } from '@mookiepiece/strawberry-farm/vue/Toast';\r
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';\r
import VForm from '@mookiepiece/strawberry-farm/vue/VForm.vue';\r
import VFormItem from '@mookiepiece/strawberry-farm/vue/VFormItem.vue';\r
import VFormLabel from '@mookiepiece/strawberry-farm/vue/VFormLabel.vue';\r
import VInput from '@mookiepiece/strawberry-farm/vue/VInput.vue';\r
import VRadioGroup from '@mookiepiece/strawberry-farm/vue/VRadioGroup.vue';\r
import { h } from 'vue';\r
\r
type LoginFormValue = {\r
  name: string;\r
  password: string;\r
  repeatPassword: string;\r
  phoneNumber: string;\r
\r
  dateRange: [Date, Date];\r
\r
  chara: {\r
    name: string;\r
    weapon: string;\r
    shot: string;\r
    spellCard: string;\r
  };\r
\r
  charaDel?: {\r
    name: string;\r
    weapon: string;\r
    shot: string;\r
    spellCard: string;\r
  };\r
\r
  charas: {\r
    name: string;\r
    weapon: string;\r
    shot: string;\r
    spellCard: string;\r
  }[];\r
};\r
\r
const signupForm = Form.init<LoginFormValue>(\r
  () => ({\r
    name: '霧雨魔理沙',\r
    password: '',\r
    repeatPassword: '',\r
    phoneNumber: '',\r
\r
    dateRange: [new Date(), new Date()],\r
\r
    chara: {\r
      name: '',\r
      weapon: '',\r
      shot: '',\r
      spellCard: '',\r
    },\r
\r
    charas: [],\r
  }),\r
  {\r
    action: v => {\r
      Toast.success(JSON.stringify(v, null, 2));\r
    },\r
  },\r
);\r
\r
signupForm.hierarchy({\r
  name: {\r
    label: 'Name',\r
    rules: [\r
      {\r
        type: 'string',\r
        required: true,\r
        config: [3, 10],\r
      },\r
    ],\r
  },\r
  password: {\r
    label: 'Password',\r
    rules: [\r
      {\r
        validator(password) {\r
          if (\r
            password.includes(' ') ||\r
            password.length < 6 ||\r
            password.length > 12 ||\r
            password === '123456'\r
          )\r
            return '';\r
        },\r
      },\r
    ],\r
  },\r
  dateRange: {},\r
  phoneNumber: {\r
    label: 'Phone',\r
  },\r
  repeatPassword: {\r
    label: 'Repeat Password',\r
    rules: [\r
      {\r
        validator(value) {\r
          if (value !== signupForm.value.password)\r
            return 'Passwords are not equal';\r
        },\r
      },\r
    ],\r
  },\r
  chara: {\r
    children: {\r
      name: {\r
        label: 'Character',\r
        render() {\r
          return h(VRadioGroup, {\r
            options: ['博麗霊夢', '霧雨魔理沙'],\r
          });\r
        },\r
      },\r
      shot: {},\r
      spellCard: {},\r
      weapon: {},\r
    },\r
  },\r
  charaDel: {},\r
  charas: {\r
    init() {\r
      return {\r
        name: '',\r
        shot: '',\r
        spellCard: '',\r
        weapon: '',\r
      };\r
    },\r
    children: {\r
      children: {\r
        name: {},\r
        shot: {},\r
        spellCard: {},\r
        weapon: {},\r
      },\r
    },\r
  },\r
});\r
\r
//   i({\r
//     name: 'chara.name',\r
//     label: 'Character',\r
//     type: [\r
//       'radio',\r
//       {\r
//         options: ['博麗霊夢', '霧雨魔理沙'],\r
//       },\r
//     ],\r
//   });\r
\r
//   i({\r
//     name: 'charas',\r
//     type: ['list'],\r
//     childInit() {\r
//       return {\r
//         name: '',\r
//         shot: '',\r
//         spellCard: '',\r
//         weapon: '',\r
//       };\r
//     },\r
//     children: row => [\r
//       i({\r
//         name: 'name',\r
//         rules: [\r
//           'string!',\r
//           {\r
//             validator(value) {\r
//               if (\r
//                 row.name.startsWith('a') &&\r
//                 value.length >\r
//                   signupForm.value.charas.reduce((a, b) => a + b, '').length / 2\r
//               ) {\r
//                 return 'An item which starts with letter [a] cannot participate more than 50% characters inside the list.';\r
//               }\r
//             },\r
//           },\r
//         ],\r
//       }),\r
//       {\r
//         name: 'spellCard',\r
//         visible: computed(() => !!row.name),\r
//       },\r
//     ],\r
//   });\r
\r
const v = signupForm.value;\r
\r
signupForm.items['name'];\r
signupForm.items['dateRange.0'];\r
signupForm.items['charas.0.name'];\r
<\/script>\r
\r
<template>\r
  <VForm :form="signupForm">\r
    <VFormItem :name="signupForm.i('name')">\r
      <template #title>\r
        <div class="[B] gap-1">\r
          <VFormLabel />\r
          <i-feather i="arrow-right-circle" />\r
        </div>\r
      </template>\r
    </VFormItem>\r
    <VFormItem :name="signupForm.i('password')">\r
      <template #extra>\r
        <div class="[A]">\r
          <div class="[B] gap-1">\r
            <i-feather\r
              v-if="v.password.includes(' ')"\r
              i="x"\r
              class="clr-main tone:reimu"\r
            />\r
            <i-feather v-else i="check" class="clr-1" />\r
            Password cannot contain spaces.\r
          </div>\r
          <div class="[B] gap-1">\r
            <i-feather\r
              v-if="v.password.length < 6 || v.password.length > 12"\r
              i="x"\r
              class="clr-main tone:reimu"\r
            />\r
            <i-feather v-else i="check" class="clr-1" />\r
            Password should between 6 - 12 characters.\r
          </div>\r
          <div class="[B] gap-1">\r
            <i-feather\r
              v-if="v.password === '123456'"\r
              i="x"\r
              class="clr-main tone:reimu"\r
            />\r
            <i-feather v-else i="check" class="clr-1" />\r
            Password cannot be 123456 because that's the admin's password.\r
          </div>\r
        </div>\r
      </template>\r
    </VFormItem>\r
    <VFormItem name="repeatPassword" />\r
    <VFormItem name="phoneNumber">\r
      <VInput placehholder="666" clearable />\r
    </VFormItem>\r
    <VFormItem :name="'chara.name'" />\r
    <VButton type="submit" class="mat:air">\r
      <template #prefix>\r
        <i-feather i="message-circle" />\r
      </template>\r
    </VButton>\r
  </VForm>\r
</template>\r
\r
<style scoped></style>\r
`;export{r as default};
