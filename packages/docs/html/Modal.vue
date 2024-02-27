<script setup lang="ts">
import { Bag, trap } from '@mookiepiece/strawberry-farm/functions';
import VModal from '@mookiepiece/strawberry-farm/vue/Vmodal.vue';
import { onUnmounted } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const bag = Bag();
onMounted(() => {
  // return trap(a.value!)
});

const visible = ref(false);

const bodyPro = () => {
  const body = document.body;
  if (body.style.getPropertyValue('height'))
    body.style.removeProperty('height');
  else body.style.setProperty('height', '200vh');
};

onUnmounted(() => {
  document.body.style.removeProperty('height');
});
</script>

<template>
  <button class="mat:solid" @click="bodyPro">body pro</button>
  <button class="mat:solid" @click="visible = !visible">a</button>
  <VModal v-model="visible">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, deserunt
    autem ipsum voluptatum fugiat error est quisquam numquam, quis dolorem
    atque. Eos, voluptatibus fugiat? Saepe doloribus sit iste molestiae
    laboriosam? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
    reprehenderit tempore quasi, molestiae earum alias dolor quia! Animi eum
    vero, non, velit error tempora asperiores quas quam magni, corrupti ipsam.
    Blanditiis voluptate delectus corporis, quasi eligendi placeat quam dolor
    tempore ipsam unde, eum eius porro error impedit odit accusamus deleniti
    ducimus distinctio expedita quis sapiente, in reprehenderit. Nulla, autem
    recusandae! Corporis similique culpa cumque officiis iure atque itaque. Ab
    maiores nemo, laudantium ipsum cum nam consequuntur excepturi dolorum,
    numquam voluptatum nisi officiis est, a beatae repellat reiciendis deserunt
    vitae possimus! Adipisci laudantium architecto, illum ad illo est quaerat
    corrupti blanditiis facilis error ex recusandae, ea magnam! Dolores fugiat
    eaque facilis ducimus sunt facere omnis vitae. Maiores est suscipit
    veritatis quam!
  </VModal>
</template>

<style scoped>
.table {
  display: grid;
  max-width: 300px;
}
.tr {
  display: grid;
  grid: 1fr /1fr 1fr 1fr;
}

button {
  padding: 10px;
}
</style>
