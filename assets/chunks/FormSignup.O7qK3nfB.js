const r=`<script setup lang="ts">\r
import { Form } from '@mookiepiece/strawberry-farm/vue/Form';\r
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';\r
import VForm from '@mookiepiece/strawberry-farm/vue/VForm.vue';\r
import VFormItem from '@mookiepiece/strawberry-farm/vue/VFormItem.vue';\r
\r
type LoginFormValue = {\r
  name: string;\r
  password: string;\r
  repeatPassword: string;\r
  phoneNumber: string;\r
};\r
\r
const signupForm = Form.describe<LoginFormValue>(\r
  {\r
    name: '霧雨魔理沙',\r
    password: '',\r
    repeatPassword: '',\r
    phoneNumber: '',\r
  },\r
  ({ describeField: i }) => {\r
    i({\r
      name: 'name',\r
      label: 'Name',\r
      rules: [\r
        {\r
          type: 'string',\r
          required: true,\r
          config: [3, 10],\r
        },\r
      ],\r
    });\r
\r
    i({\r
      name: 'password',\r
      label: 'Password',\r
    });\r
\r
    i({\r
      name: 'repeatPassword',\r
      label: 'Repeat Password',\r
      rules: [\r
        {\r
          validator(value) {\r
            if (value !== signupForm.value.password)\r
              return 'Passwords are not equal';\r
          },\r
        },\r
      ],\r
    });\r
\r
    i({\r
      name: 'phoneNumber',\r
      props: {\r
        placeholder: 'Phone Number',\r
        clearable: true,\r
      },\r
    });\r
\r
    // i({\r
    //   name: 'phoneNumber',\r
    //   type: 'text',\r
    //   rules: [['string!', 11]],\r
    // });\r
\r
    // i({\r
    //   name: 'code',\r
    //   type: 'text',\r
    //   rules: [['string!', 6]],\r
    // });\r
\r
    // i({\r
    //   name: 'agreement',\r
    //   type: 'text',\r
    //   rules: ['checked!'],\r
    // });\r
\r
    // i({\r
    //   name: 'subscribe',\r
    //   type: 'any',\r
    // });\r
\r
    // i({\r
    //   name: 'luckyNumber',\r
    //   type: 'number',\r
    //   rules: [\r
    //     {\r
    //       validator(value) {\r
    //         if (value < 1000) {\r
    //           throw 'Value cannot be less than 1000';\r
    //         }\r
    //       },\r
    //     },\r
    //   ],\r
    // });\r
\r
    // i({\r
    //   name: 'interests',\r
    //   type: 'list',\r
    //   rules: [\r
    //     ['array!', [0, 1]],\r
    //     {\r
    //       validator(value) {\r
    //         if (value.join('').length > 10)\r
    //           throw 'Total length of strings cannot be greater than 10';\r
    //       },\r
    //     },\r
    //   ],\r
    // });\r
\r
    // i({\r
    //   name: 'ratings',\r
    //   type: 'list',\r
    //   rules: [\r
    //     ['array!', [0, 1]],\r
    //     {\r
    //       validator(value) {\r
    //         if (value.join('').length > 10)\r
    //           throw 'Total length of strings cannot be greater than 10';\r
    //       },\r
    //     },\r
    //   ],\r
    // });\r
  },\r
);\r
const v = signupForm.value;\r
<\/script>\r
\r
<template>\r
  <VForm :form="signupForm">\r
    <template v-slot="{ i }">\r
      <VFormItem :name="i('name')" />\r
      <VFormItem name="password">\r
        <template #description>\r
          <div class="[A]">\r
            <div class="[B] gap-1">\r
              <i-feather\r
                v-if="v.password.includes(' ')"\r
                i="x"\r
                class="clr-main tone:reimu"\r
                data-invalid\r
              />\r
              <i-feather v-else i="check" class="clr-1" />\r
              Password cannot contain spaces.\r
            </div>\r
            <div class="[B] gap-1">\r
              <i-feather\r
                v-if="v.password.length < 6 || v.password.length > 12"\r
                i="x"\r
                class="clr-main tone:reimu"\r
                data-invalid\r
              />\r
              <i-feather v-else i="check" class="clr-1" />\r
              Password should between 6 - 12 characters.\r
            </div>\r
            <div class="[B] gap-1">\r
              <i-feather\r
                v-if="v.password === '123456'"\r
                i="x"\r
                class="clr-main tone:reimu"\r
                data-invalid\r
              />\r
              <i-feather v-else i="check" class="clr-1" />\r
              Password cannot be 123456 because that's the admin's password.\r
            </div>\r
          </div>\r
        </template>\r
      </VFormItem>\r
      <VFormItem name="repeatPassword" />\r
      <VFormItem name="phoneNumber" />\r
      <VButton class="mat:air">\r
        <template #icon>\r
          <i-feather i="message-circle" />\r
        </template>\r
      </VButton>\r
    </template>\r
  </VForm>\r
</template>\r
\r
<style scoped></style>\r
`;export{r as default};
