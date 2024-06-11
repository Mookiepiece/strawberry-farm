const r=`<script setup lang="ts">\r
import { Lift } from '@mookiepiece/strawberry-farm/vue/Lift';\r
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';\r
import VDialog from '@mookiepiece/strawberry-farm/vue/VDialog.vue';\r
import { defineComponent, h } from 'vue';\r
\r
const Lifted = defineComponent<{\r
  modelValue: any;\r
  args: {\r
    a: string;\r
    b: number;\r
  };\r
  resolve(b: string): void;\r
}>(\r
  (props, { emit }) => {\r
    return () =>\r
      h(\r
        VDialog,\r
        {\r
          title: 'Foo',\r
          modelValue: props.modelValue,\r
          'onUpdate:modelValue': v => emit('update:modelValue', v),\r
        },\r
        {\r
          default() {\r
            return h(\r
              'div',\r
              {\r
                class: '[B] gap-2',\r
              },\r
              [\r
                h(\r
                  VButton,\r
                  {\r
                    class: 'GhostButton',\r
                    onClick: () => props.resolve('a'),\r
                  },\r
                  ()=>'Resolve',\r
                ),\r
                h(\r
                  VButton,\r
                  {\r
                    class: 'GhostButton',\r
                    onClick: () => emit('update:modelValue', false),\r
                  },\r
                  ()=>'Reject',\r
                ),\r
                h('span', {}, JSON.stringify(props.args)),\r
              ],\r
            );\r
          },\r
        },\r
      );\r
  },\r
  {\r
    props: ['modelValue', 'args', 'resolve'],\r
  },\r
);\r
\r
const click = () => {\r
  Lift(Lifted, { a: '', b: 3 }).then(\r
    ans => console.log('ans', ans),\r
    err => console.error('err', err),\r
  );\r
};\r
<\/script>\r
\r
<template>\r
  <button @click="click">foo</button>\r
</template>\r
`;export{r as default};
