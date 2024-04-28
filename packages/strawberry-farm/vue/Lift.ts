import {
  Component,
  InjectionKey,
  Ref,
  cloneVNode,
  createApp,
  defineComponent,
  h,
  provide,
} from 'vue';

export const LIFT_IN: InjectionKey<{
  resolve: (args: any) => void;
  reject: (args: any) => void;
  open?: Ref<boolean>;
}> = Symbol('LIFT_IN');

const LiftProvider = defineComponent<{
  as: Component;
  resolve: (args: any) => void;
  reject: (args: any) => void;
  open?: Ref<boolean>;
}>({
  setup(props) {
    provide(LIFT_IN, {
      resolve: props.resolve,
      reject: props.reject,
      open: props.open,
    });

    cloneVNode(h(props.as), {
      modelValue: props.open,
      'update:modelValue': () => void (props.open = false),
    });

    return () =>
      h('details', {}, [
        h('summary', {}, 'Click To expand'),
        h('ul', {}, [
          h(
            'li',
            {},
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?',
          ),
        ]),
      ]);
  },
});

export const Lift = <A = undefined, B = undefined>(payload: A) => {
  let resolve: (res: B) => void = () => {};
  let reject: (err?: any) => void = () => {};
  const promise = new Promise<B>((_, __) => ([resolve, reject] = [_, __]));

  const complex = () => {
    const app = createApp(LiftProvider, { resolve, reject });
    app.mount(document.body);
  };

  return {
    reject,
  };
};
