const n=`import { Component, createApp, h, onMounted, onUnmounted, ref } from 'vue';\r
\r
export const Lift = <A = any, B = null>(\r
  ...params: B extends null\r
    ? [\r
        Component<{\r
          args: A;\r
          resolve: B extends null ? any : (ans: B) => void;\r
        }>,\r
        args?: A,\r
        signal?: AbortSignal,\r
      ]\r
    : [\r
        Component<{\r
          args: A;\r
          resolve: B extends null ? any : (ans: B) => void;\r
        }>,\r
        args: A,\r
        signal?: AbortSignal,\r
      ]\r
) => {\r
  const [as, args, signal] = params;\r
  const open = ref(false);\r
  let resolve: any = undefined as any;\r
  let reject: () => void = undefined as any;\r
  const promise = new Promise<B>(\r
    (_resolve, _reject) =>\r
      ([resolve, reject] = [\r
        (ans: any) => (_resolve(ans), (open.value = false)),\r
        () => (\r
          _reject(new DOMException('', 'AbortError')), (open.value = false)\r
        ),\r
      ]),\r
  );\r
\r
  signal?.addEventListener('abort', reject);\r
\r
  const app = createApp({\r
    name: 'LiftRoot',\r
    setup: () => {\r
      onMounted(() => {\r
        open.value = true;\r
      });\r
      onUnmounted(() => {\r
        div.remove();\r
      });\r
\r
      return () =>\r
        h(as, {\r
          args: (args || null) as any,\r
          resolve,\r
          reject,\r
          modelValue: open.value,\r
          'onUpdate:modelValue': reject,\r
        });\r
    },\r
  });\r
  const div = document.createElement('div');\r
  app.mount(div);\r
  document.body.appendChild(div);\r
\r
  return promise;\r
};\r
`;export{n as default};
