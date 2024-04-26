import { InjectionKey, createApp, h, provide } from 'vue';

export const LIFT_IN: InjectionKey<{
  resolve: (args: any) => void;
  reject: (args: any) => void;
}> = Symbol('LIFT_IN');

export const Lift = <A = undefined, B = undefined>(payload: A) => {
  let resolve: (res: B) => void = () => {};
  let reject: (err?: any) => void = () => {};
  const promise = new Promise<B>((_, __) => ([resolve, reject] = [_, __]));

  const complex = () => {
    const span = document.createElement('span');
    const app = createApp({
      setup() {
        provide(LIFT_IN, {
          resolve,
          reject,
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
    app.mount(span);

    // span.innerHTML =
    //   `<details><summary>Click To expand</summary>
    //   <ul><li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quisquam cum excepturi dolor impedit a ex, voluptatibus laborum fugit necessitatibus, illum ab minima deserunt aliquid, veniam rem debitis. Incidunt, assumenda?` +
    //   `</li></ul>
    //   </details>`;
    const { bag } = Toast.error(span);
    bag(app.unmount);
  };
};
