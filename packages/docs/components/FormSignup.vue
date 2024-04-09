<script setup lang="ts">
import { Form } from '@mookiepiece/strawberry-farm/vue/Form';
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';
import VForm from '@mookiepiece/strawberry-farm/vue/VForm.vue';
import VFormItem from '@mookiepiece/strawberry-farm/vue/VFormItem.vue';
import { computed } from 'vue';

type LoginFormValue = {
  name: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;

  dateRange: [Date, Date];

  chara: {
    name: string;
    weapon: string;
    shot: string;
    spellCard: string;
  };

  charas: {
    name: string;
    weapon: string;
    shot: string;
    spellCard: string;
  }[];
};

const signupForm = Form.define<LoginFormValue>({
  initialValue: () => ({
    name: '霧雨魔理沙',
    password: '',
    repeatPassword: '',
    phoneNumber: '',

    dateRange: [new Date(), new Date()],

    chara: {
      name: '',
      weapon: '',
      shot: '',
      spellCard: '',
    },

    charas: [],
  }),
  action: alert,
});

signupForm.hierarchy(({ i }) => {
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
    rules: [
      {
        validator(password) {
          if (
            password.includes(' ') ||
            password.length < 6 ||
            password.length > 12 ||
            password === '123456'
          )
            return '';
        },
      },
    ],
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

  i({
    name: 'chara.name',
    label:'Character',
    type: 'radio',
    props: {
      options: ['博麗霊夢', '霧雨魔理沙'],
    },
  });

  i({
    name: 'charas',
    type: 'list',

    childInit() {
      return {
        name: '',
        shot: '',
        spellCard: '',
        weapon: '',
      };
    },
    children: row => [
      {
        name: 'name',
        rules: [
          'string!',
          {
            validator(value) {
              if (
                row.name.startsWith('a') &&
                value.length >
                  signupForm.value.charas.reduce((a, b) => a + b, '').length / 2
              ) {
                return 'An item which starts with letter [a] cannot participate more than 50% characters inside the list.';
              }
            },
          },
        ],
      },
      {
        name: 'spellCard',
        visible: computed(() => !!row.name),
      },
    ],
  });
});

const v = signupForm.value;
</script>

<template>
  <VForm :form="signupForm">
    <VFormItem :name="signupForm.name('name')" />
    <VFormItem name="password">
      <template #description>
        <div class="[A]">
          <div class="[B] gap-1">
            <i-feather
              v-if="v.password.includes(' ')"
              i="x"
              class="clr-main tone:reimu"
            />
            <i-feather v-else i="check" class="clr-1" />
            Password cannot contain spaces.
          </div>
          <div class="[B] gap-1">
            <i-feather
              v-if="v.password.length < 6 || v.password.length > 12"
              i="x"
              class="clr-main tone:reimu"
            />
            <i-feather v-else i="check" class="clr-1" />
            Password should between 6 - 12 characters.
          </div>
          <div class="[B] gap-1">
            <i-feather
              v-if="v.password === '123456'"
              i="x"
              class="clr-main tone:reimu"
            />
            <i-feather v-else i="check" class="clr-1" />
            Password cannot be 123456 because that's the admin's password.
          </div>
        </div>
      </template>
    </VFormItem>
    <VFormItem name="repeatPassword" />
    <VFormItem name="phoneNumber" />
    <VFormItem :name="signupForm.name('chara.name')" />
    <VFormItem :name="signupForm.name('charas')" />
    <VButton class="mat:air">
      <template #prefix>
        <i-feather i="message-circle" />
      </template>
    </VButton>
  </VForm>
</template>

<style scoped></style>
