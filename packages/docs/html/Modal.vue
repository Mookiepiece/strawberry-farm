<script setup lang="ts">
import VModal from '@mookiepiece/strawberry-farm/vue/VModal.vue';
import { onUnmounted } from 'vue';
import { ref } from 'vue';

const visible = ref(false);

const bodyPro = () => {
  const app = document.getElementById('app') as HTMLElement;
  if (app.style.getPropertyValue('height')) app.style.removeProperty('height');
  else app.style.setProperty('height', '200vh');
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
    autem ipsum voluptatum fugia
    <br /><br />
    t error est quisquam numquam, quis dolorem atque. Eos, voluptatibus fug
    <br /><br />
    iat? Saepe doloribus sit iste molestiae laboriosam? Lorem ipsum dolo
    <br /><br />
    r sit amet consectetur, adipisicing elit. Ut reprehenderit tempore quasi,
    <br /><br />
    molestiae earum alias dolor quia! Animi eum vero, non, velit error tempo
    <br /><br />
    ra asperiores quas quam magni, corrupti ipsam. Blanditiis voluptate delectu
    <br /><br />
    s corporis, quasi eligendi placeat quam dolor tempore ipsam unde, eum eius
    <br /><br />
    porro error impedit odit accusamus deleniti ducimus distinctio expedita
    <br /><br />
    quis sapiente, in reprehenderit. Nulla, autem recusandae! Corporis similiq
    <br /><br />
    ue culpa cumque officiis iure atque itaque. Ab maiores nemo, laudantium ips
    <br /><br />
    um cum nam consequuntur excepturi dolorum, numquam voluptatum nisi offi
    <br /><br />
    ciis est, a beatae repellat reiciendis deserunt vitae possimus! Adipisci lau
    <br /><br />
    dantium architecto, illum ad illo est quaerat corrupti blanditiis facilis
    <br /><br />
    error ex recusandae, ea magnam! Dolores fugiat eaque facilis ducimus sunt
    facere omnis vitae. Maiores est suscipit veritatis quam!
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
