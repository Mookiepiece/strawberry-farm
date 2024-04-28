import {
  Component,
  InjectionKey,
  Ref,
  cloneVNode,
  createApp,
  defineComponent,
  h,
  inject,
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

    return () =>
      cloneVNode(h(props.as), {
        modelValue: props.open,
        'update:modelValue': () =>
          void props.reject(new DOMException('', 'AbortError')),
      });
  },
});

export const Lift = <A = undefined, B = undefined>(
  payload: A,
  signal?: AbortSignal,
) => {
  let resolve: (res: B) => void = () => {};
  let reject: (err?: any) => void = () => {};
  const promise = new Promise<B>((_, __) => ([resolve, reject] = [_, __]));

  signal?.addEventListener('abort', () =>
    reject(new DOMException('', 'AbortError')),
  );

  const up = () => {
    const app = createApp(LiftProvider, { resolve, reject });
    app.mount(document.body);
  };

  return promise;
};

export const useLift = () =>
  inject(LIFT_IN, {
    resolve(args) {},
    reject(args) {},
  });
