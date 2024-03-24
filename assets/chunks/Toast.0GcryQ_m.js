const r=`<script setup lang="ts">\r
import { Toast } from '@mookiepiece/strawberry-farm/vue/Toast';\r
\r
import { h } from 'vue';\r
import { createApp } from 'vue';\r
import { ref } from 'vue';\r
\r
const complex = () => {\r
  const span = document.createElement('span');\r
  const app = createApp({\r
    beforeUnmount() {\r
      console.log('wa');\r
    },\r
    unmounted() {\r
      console.log('sei');\r
    },\r
    render() {\r
      return h('details', {}, [\r
        h('summary', {}, 'Click To expand'),\r
        h('ul', {}, [\r
          h(\r
            'li',\r
            {},\r
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?',\r
          ),\r
        ]),\r
      ]);\r
    },\r
  });\r
  app.mount(span);\r
\r
  // span.innerHTML =\r
  //   \`<details><summary>Click To expand</summary>\r
  //   <ul><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?\` +\r
  //   \`</li></ul>\r
  //   </details>\`;\r
  const { bag } = Toast.error(span);\r
  bag(app.unmount);\r
};\r
\r
const cll = () => {\r
  setTimeout(() => {\r
    Toast.error('123');\r
  }, 200);\r
\r
  setTimeout(() => {\r
    const span = document.createElement('span');\r
    span.textContent = '123';\r
    Toast.error(span);\r
    setTimeout(() => {\r
      span.innerHTML =\r
        \`<div><ul><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?\` +\r
        \`</li></ul></div>\`;\r
    }, 500);\r
  }, 500);\r
\r
  setTimeout(() => {\r
    Toast.error('123');\r
  }, 700);\r
};\r
const infinityToast = ref<ReturnType<typeof Toast.error>>();\r
\r
const a = ref(false);\r
<\/script>\r
\r
<template>\r
  <div class="[A]" style="gap: 10px">\r
    <button @click="() => Toast.success('Strawberry Farm')" class="p-4 mat:air">\r
      Success Toast\r
    </button>\r
    <button @click="() => Toast.error('Strawberry Farm')" class="p-4 mat:air">\r
      Error Toast\r
    </button>\r
    <button\r
      @click="() => Toast.error({ message: 'Strawberry Farm', duration: 2000 })"\r
      class="p-4 mat:air"\r
    >\r
      Error Toast (2000ms)\r
    </button>\r
    <button\r
      @click="\r
        () =>\r
          infinityToast\r
            ? (infinityToast = void infinityToast.close())\r
            : (infinityToast = Toast.error({\r
                message: 'Strawberry Farm',\r
                duration: Infinity,\r
              }))\r
      "\r
      class="p-4 mat:air"\r
    >\r
      Error Toast (Infinity)\r
    </button>\r
    <button @click="complex" class="p-4 mat:air">Complex Error Toast</button>\r
    <button @click="() => Toast.blank('Strawberry Farm')" class="p-4 mat:air">\r
      Blank Toast\r
    </button>\r
    <button @click="() => Toast.custom('Strawberry Farm')" class="p-4 mat:air">\r
      Custom Toast\r
    </button>\r
    <button @click="cll" class="p-4 mat:air">Many Toasts</button>\r
    <button @click="a = !a" class="p-4 mat:air">Icon</button>\r
    <div v-show="a" class="toast-i-error"></div>\r
    <div v-show="a" class="toast-i-success"></div>\r
    <div v-show="a" class="toast-i-info"></div>\r
    <Teleport to="body">\r
      <toast-bar id="ToastBarTopCenter" />\r
    </Teleport>\r
  </div>\r
</template>\r
\r
<style scoped></style>\r
`;export{r as default};
