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
  initialValue: {
    name: '霧雨魔理沙',
    password: '',
    repeatPassword: '',
    phoneNumber: '',

    chara: {
      name: '',
      weapon: '',
      shot: '',
      spellCard: '',
    },

    charas: [],
  },
});

signupForm.defineHierarchy({
  name: {
    label: 'Name',
    rules: [
      {
        type: 'string',
        required: true,
        config: [3, 10],
      },
    ],
  },
  password: {
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
  },
  repeatPassword: {
    label: 'Repeat Password',
    rules: [
      {
        validator(value) {
          if (value !== signupForm.value.password)
            return 'Passwords are not equal';
        },
      },
    ],
  },

  phoneNumber: {
    type: {
      text: {
        placeholder: 'Phone Number',
        clearable: true,
      },
    },
  },
  chara: {
    type: {
      hidden: undefined,
    },
    _: {
      name: {},
    },
  },

  charas: {
    type: {
      list: {
        add: () => ({
          name: '',
          weapon: '',
          shot: '',
          spellCard: '',
        }),
      },
    },
  },
});

const v = signupForm.value;
</script>

<template>
  <VForm :form="signupForm">
    <template>
      <VFormItem name="name" />
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
      <VFormItem name="charas"> </VFormItem>
      <VButton class="mat:air">
        <template #prefix>
          <i-feather i="message-circle" />
        </template>
      </VButton>
    </template>
  </VForm>
</template>

<style scoped></style>
