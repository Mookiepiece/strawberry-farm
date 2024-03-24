const r=`<script setup lang="ts">\r
import { computed, provide } from 'vue';\r
import { Form } from '@mookiepiece/strawberry-farm/vue/Form';\r
import VForm from '@mookiepiece/strawberry-farm/vue/VForm.vue';\r
import VFormItem from '@mookiepiece/strawberry-farm/vue/VFormItem.vue';\r
\r
type LoginFormValue = {\r
  usage: 'Good' | 'Bad' | 'other';\r
  name: string;\r
  password: string;\r
  // confirmPassword: string;\r
  // agreement: boolean;\r
  // phoneNumber: string;\r
  // code: string;\r
  // luckyNumber: number;\r
  // subscribe: boolean;\r
  // interests: string[];\r
  // ratings: { name: string; rating: number }[];\r
};\r
\r
const signupForm = Form.describe<LoginFormValue>(\r
  {\r
    usage: 'Good',\r
    name: '1',\r
    password: '2',\r
  },\r
  ({ describeField: i }) => {\r
    i({\r
      name: 'usage',\r
      label: 'Usage',\r
      type: 'radio',\r
      props: computed(() => ({\r
        options: ['Good', 'Bad', 'other'],\r
      })),\r
    });\r
\r
    i({\r
      name: 'name',\r
      label: 'Name',\r
      type: 'text',\r
      rules: [\r
        'string',\r
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
      type: 'text',\r
      rules: [['string!', [6, 30]]],\r
    });\r
\r
    // i({\r
    //   name: 'confirmPassword',\r
    //   type: 'text',\r
    //   rules: [\r
    //     ['string!', [6, 30]],\r
    //     {\r
    //       validator(value) {\r
    //         // 能不能自动收集依赖？\r
    //         if (signupForm.value.code !== value) {\r
    //           return 'Passwords are not equal.';\r
    //         }\r
    //       },\r
    //     },\r
    //   ],\r
    // });\r
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
\r
provide('VForm', signupForm);\r
<\/script>\r
\r
<template>\r
  <VForm :form="signupForm">\r
    <VFormItem name="usage" />\r
    <VFormItem name="name">\r
      <template #subtitle>\r
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi adipisci\r
        nam commodi, recusandae cupiditate possimus ut quam sapiente mollitia\r
        fuga temporibus iure illo vitae at sed facilis fugit, explicabo\r
        officiis!\r
      </template>\r
      <template #description>\r
        <div class="clr-3">\r
          Lorem ipsum dolor sit amet consectetur adipisicing elit.\r
        </div>\r
      </template>\r
    </VFormItem>\r
    <VFormItem name="password" />\r
  </VForm>\r
  <!-- </v-form>\r
\r
  <v-form>\r
    <v-form-item name="name" />\r
    <v-form-item name="password" />\r
    <v-form-item name="confirmPassword" />\r
    <div>\r
      <span>Phone number for SMS: </span>\r
      <v-form-item name="phoneNumber" />\r
      <button>Send Code</button>\r
    </div>\r
    <v-form-item name="code" />\r
  </v-form> -->\r
</template>\r
\r
<style scoped></style>\r
`;export{r as default};
