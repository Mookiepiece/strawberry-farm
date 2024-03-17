<script setup lang="ts">
import { describeForm } from '@mookiepiece/strawberry-farm/vue/Form';

type LoginFormValue = {
  name: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
  phoneNumber: string;
  code: string;
  subscribe: boolean;
};

const signupForm = describeForm<LoginFormValue>(({ describeField: i }) => {
  i({
    name: 'name',
    type: 'text',
    rules: [['string!', [3, 10]]],
  });

  i({
    name: 'password',
    type: 'text',
    rules: [['string!', [6, 30]]],
  });

  i({
    name: 'confirmPassword',
    type: 'text',
    rules: [
      ['string!', [6, 30]],
      {
        validator(value) {
          // 能不能自动收集依赖？
          if (signupForm.value.code !== value) {
            return 'Passwords are not equal.';
          }
        },
      },
    ],
  });

  i({
    name: 'phoneNumber',
    type: 'text',
    rules: [['string!', 11]],
  });

  i({
    name: 'code',
    type: 'text',
    rules: [['string!', 6]],
  });

  i({
    name: 'agreement',
    type: 'text',
    rules: ['checked!'],
  });

  i({
    name: 'subscribe',
    type: 'any',
  });
});
</script>

<template>
  <v-form>
    <v-form-item />
  </v-form>

  <v-form>
    <v-form-item name="name" />
    <v-form-item name="password" />
    <v-form-item name="confirmPassword" />
    <div>
      <span>Phone number for SMS: </span>
      <v-form-item name="phoneNumber" />
      <button>Send Code</button>
    </div>
    <v-form-item name="code" />
    
  </v-form>
</template>

<style scoped></style>
