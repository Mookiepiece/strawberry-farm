<script setup lang="ts">
import { Lift } from '@mookiepiece/strawberry-farm/vue/Lift';
import VButton from '@mookiepiece/strawberry-farm/vue/VButton.vue';
import VDialog from '@mookiepiece/strawberry-farm/vue/VDialog.vue';
import { defineComponent, h } from 'vue';

const Lifted = defineComponent<{
  modelValue: any;
  args: {
    a: string;
    b: number;
  };
  resolve(b: string): void;
}>(
  (props, { emit }) => {
    return () =>
      h(
        VDialog,
        {
          title: 'Foo',
          modelValue: props.modelValue,
          'onUpdate:modelValue': v => emit('update:modelValue', v),
        },
        {
          default() {
            return h(
              'div',
              {
                class: '[B] gap-2',
              },
              [
                h(
                  VButton,
                  {
                    class: 'GhostButton',
                    onClick: () => props.resolve('a'),
                  },
                  'Resolve',
                ),
                h(
                  VButton,
                  {
                    class: 'GhostButton',
                    onClick: () => emit('update:modelValue', false),
                  },
                  'Reject',
                ),
                h('span', {}, JSON.stringify(props.args)),
              ],
            );
          },
        },
      );
  },
  {
    props: ['modelValue', 'args', 'resolve'],
  },
);

const click = () => {
  Lift(Lifted, { a: '', b: 3 }).then(
    ans => console.log('ans', ans),
    err => console.error('err', err),
  );
};
</script>

<template>
  <button @click="click">foo</button>
</template>
