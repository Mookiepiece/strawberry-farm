<script setup lang="ts">
import { Form } from '@mookiepiece/strawberry-farm/vue/Form';
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';
import VForm from '@mookiepiece/strawberry-farm/vue/VForm.vue';
import VFormItem from '@mookiepiece/strawberry-farm/vue/VFormItem.vue';

type LoginFormValue = {
  name: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
};

const signupForm = Form.describe<LoginFormValue>(
  {
    name: '霧雨魔理沙',
    password: '',
    repeatPassword: '',
    phoneNumber: '',
  },
  ({ describeField: i }) => {
    i({
      name: 'name',
      label: 'Name',
      rules: [
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
    });

    i({
      name: 'repeatPassword',
      label: 'Repeat Password',
      rules: [
        {
          validator(value) {
            if (value !== signupForm.value.password)
              return 'Passwords are not equal';
          },
        },
      ],
    });

    i({
      name: 'phoneNumber',
      props: {
        placeholder: 'Phone Number',
        clearable: true,
      },
    });

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
const v = signupForm.value;
</script>

<template>
  <VForm :form="signupForm">
    <template v-slot="{ i }">
      <VFormItem :name="i('name')" />
      <VFormItem name="password">
        <template #description>
          <div class="[A]">
            <div class="[B] gap-1">
              <i-feather
                v-if="v.password.includes(' ')"
                i="x"
                class="clr-main tone:reimu"
                data-invalid
              />
              <i-feather v-else i="check" class="clr-1" />
              Password cannot contain spaces.
            </div>
            <div class="[B] gap-1">
              <i-feather
                v-if="v.password.length < 6 || v.password.length > 12"
                i="x"
                class="clr-main tone:reimu"
                data-invalid
              />
              <i-feather v-else i="check" class="clr-1" />
              Password should between 6 - 12 characters.
            </div>
            <div class="[B] gap-1">
              <i-feather
                v-if="v.password === '123456'"
                i="x"
                class="clr-main tone:reimu"
                data-invalid
              />
              <i-feather v-else i="check" class="clr-1" />
              Password cannot be 123456 because that's the admin's password.
            </div>
          </div>
        </template>
      </VFormItem>
      <VFormItem name="repeatPassword" />
      <VFormItem name="phoneNumber" />
      <VButton class="mat:air">
        <template #prefix>
          <i-feather i="message-circle" />
        </template>
      </VButton>
    </template>
  </VForm>
</template>

<style scoped></style>
