<script setup lang="ts">
import { computed, provide } from 'vue';
import { Form } from '@mookiepiece/strawberry-farm/vue/Form';
import VForm from '@mookiepiece/strawberry-farm/vue/VForm.vue';
import VFormItem from '@mookiepiece/strawberry-farm/vue/VFormItem.vue';

type LoginFormValue = {
  usage: 'Good' | 'Bad' | 'other';
  name: string;
  password: string;
  // confirmPassword: string;
  // agreement: boolean;
  // phoneNumber: string;
  // code: string;
  // luckyNumber: number;
  // subscribe: boolean;
  // interests: string[];
  // ratings: { name: string; rating: number }[];
};

const signupForm = Form.describe<LoginFormValue>(
  {
    usage: 'Good',
    name: '1',
    password: '2',
  },
  ({ describeField: i }) => {
    i({
      name: 'usage',
      label: 'Usage',
      type: 'radio',
      props: computed(() => ({
        options: ['Good', 'Bad', 'other'],
      })),
    });

    i({
      name: 'name',
      label: 'Name',
      type: 'text',
      rules: [
        'string',
        {
          type: 'string',
          required: true,
          config: [3, 10],
        },
      ],
    });

    i({
      name: 'password',
      label: 'Password',
      type: 'text',
      rules: [['string!', [6, 30]]],
    });

    // i({
    //   name: 'confirmPassword',
    //   type: 'text',
    //   rules: [
    //     ['string!', [6, 30]],
    //     {
    //       validator(value) {
    //         // 能不能自动收集依赖？
    //         if (signupForm.value.code !== value) {
    //           return 'Passwords are not equal.';
    //         }
    //       },
    //     },
    //   ],
    // });

    // i({
    //   name: 'phoneNumber',
    //   type: 'text',
    //   rules: [['string!', 11]],
    // });

    // i({
    //   name: 'code',
    //   type: 'text',
    //   rules: [['string!', 6]],
    // });

    // i({
    //   name: 'agreement',
    //   type: 'text',
    //   rules: ['checked!'],
    // });

    // i({
    //   name: 'subscribe',
    //   type: 'any',
    // });

    // i({
    //   name: 'luckyNumber',
    //   type: 'number',
    //   rules: [
    //     {
    //       validator(value) {
    //         if (value < 1000) {
    //           throw 'Value cannot be less than 1000';
    //         }
    //       },
    //     },
    //   ],
    // });

    // i({
    //   name: 'interests',
    //   type: 'list',
    //   rules: [
    //     ['array!', [0, 1]],
    //     {
    //       validator(value) {
    //         if (value.join('').length > 10)
    //           throw 'Total length of strings cannot be greater than 10';
    //       },
    //     },
    //   ],
    // });

    // i({
    //   name: 'ratings',
    //   type: 'list',
    //   rules: [
    //     ['array!', [0, 1]],
    //     {
    //       validator(value) {
    //         if (value.join('').length > 10)
    //           throw 'Total length of strings cannot be greater than 10';
    //       },
    //     },
    //   ],
    // });
  },
);

provide('VForm', signupForm);
</script>

<template>
  <VForm :form="signupForm">
    <VFormItem name="usage" />
    <VFormItem name="name">
      <template #subtitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi adipisci
        nam commodi, recusandae cupiditate possimus ut quam sapiente mollitia
        fuga temporibus iure illo vitae at sed facilis fugit, explicabo
        officiis!
      </template>
      <template #description>
        <div class="clr-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </template>
    </VFormItem>
    <VFormItem name="password" />
  </VForm>
  <!-- </v-form>

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
  </v-form> -->
</template>

<style scoped></style>
