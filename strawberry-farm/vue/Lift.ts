import { Component, createApp, h, onMounted, onUnmounted, ref } from 'vue';

export const Lift = <A = any, B = null>(
  ...params: B extends null
    ? [
        Component<{
          args: A;
          resolve: B extends null ? any : (ans: B) => void;
        }>,
        args?: A,
        signal?: AbortSignal,
      ]
    : [
        Component<{
          args: A;
          resolve: B extends null ? any : (ans: B) => void;
        }>,
        args: A,
        signal?: AbortSignal,
      ]
) => {
  const [as, args, signal] = params;
  const open = ref(false);
  let resolve: any = undefined as any;
  let reject: () => void = undefined as any;
  const promise = new Promise<B>(
    (_resolve, _reject) =>
      ([resolve, reject] = [
        (ans: any) => (_resolve(ans), (open.value = false)),
        () => (
          _reject(new DOMException('', 'AbortError')), (open.value = false)
        ),
      ]),
  );

  signal?.addEventListener('abort', reject);

  const app = createApp({
    name: 'LiftRoot',
    setup: () => {
      onMounted(() => {
        open.value = true;
      });
      onUnmounted(() => {
        div.remove();
      });

      return () =>
        h(as, {
          args: (args || null) as any,
          resolve,
          reject,
          modelValue: open.value,
          'onUpdate:modelValue': reject,
        });
    },
  });
  const div = document.createElement('div');
  app.mount(div);
  document.body.appendChild(div);

  return promise;
};
