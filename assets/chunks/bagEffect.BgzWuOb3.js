const n=`import { watchEffect } from 'vue';\r
import { Bag, IBag } from './collection';\r
\r
export const bagEffect = (cb: (bag: IBag) => void) =>\r
  watchEffect(onCleanup => {\r
    const bag = Bag();\r
    onCleanup(() => bag());\r
    cb(bag);\r
  });\r
`;export{n as default};
