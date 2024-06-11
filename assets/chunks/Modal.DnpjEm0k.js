const r=`<script setup lang="ts">\r
import VModal from '@mookiepiece/strawberry-farm/vue/VModal.vue';\r
import VDialog from '@mookiepiece/strawberry-farm/vue/VDialog.vue';\r
import { onUnmounted } from 'vue';\r
import { ref } from 'vue';\r
\r
const visible = ref(false);\r
\r
const bodyPro = () => {\r
  const app = document.getElementById('app') as HTMLElement;\r
  if (app.style.getPropertyValue('height')) app.style.removeProperty('height');\r
  else app.style.setProperty('height', '200vh');\r
};\r
\r
onUnmounted(() => {\r
  document.body.style.removeProperty('height');\r
});\r
<\/script>\r
\r
<template>\r
  <button class="mat:solid" @click="bodyPro">body pro</button>\r
  <button class="mat:solid" @click="visible = !visible">a</button>\r
  <VDialog title="M" v-model="visible">\r
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, deserunt\r
    autem ipsum voluptatum fugia\r
    <br /><br />\r
    t error est quisquam numquam, quis dolorem atque. Eos, voluptatibus fug\r
    <br /><br />\r
    iat? Saepe doloribus sit iste molestiae laboriosam? Lorem ipsum dolo\r
    <br /><br />\r
    r sit amet consectetur, adipisicing elit. Ut reprehenderit tempore quasi,\r
    <br /><br />\r
    molestiae earum alias dolor quia! Animi eum vero, non, velit error tempo\r
    <br /><br />\r
    ra asperiores quas quam magni, corrupti ipsam. Blanditiis voluptate delectu\r
    <br /><br />\r
    s corporis, quasi eligendi placeat quam dolor tempore ipsam unde, eum eius\r
    <br /><br />\r
    porro error impedit odit accusamus deleniti ducimus distinctio expedita\r
    <br /><br />\r
    quis sapiente, in reprehenderit. Nulla, autem recusandae! Corporis similiq\r
    <br /><br />\r
    ue culpa cumque officiis iure atque itaque. Ab maiores nemo, laudantium ips\r
    <br /><br />\r
    um cum nam consequuntur excepturi dolorum, numquam voluptatum nisi offi\r
    <br /><br />\r
    ciis est, a beatae repellat reiciendis deserunt vitae possimus! Adipisci lau\r
    <br /><br />\r
    dantium architecto, illum ad illo est quaerat corrupti blanditiis facilis\r
    <br /><br />\r
    error ex recusandae, ea magnam! Dolores fugiat eaque facilis ducimus sunt\r
    facere omnis vitae. Maiores est suscipit veritatis quam!\r
  </VDialog>\r
</template>\r
\r
<style scoped>\r
.table {\r
  display: grid;\r
  max-width: 300px;\r
}\r
.tr {\r
  display: grid;\r
  grid: 1fr /1fr 1fr 1fr;\r
}\r
\r
button {\r
  padding: 10px;\r
}\r
</style>\r
`;export{r as default};
