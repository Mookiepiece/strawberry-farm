const r=`import { nextFrame, on } from '../shared';\r
import { SFElement } from './SFElement';\r
\r
class SFModalElement extends SFElement {\r
  constructor() {\r
    super();\r
\r
    this.setup = () => {\r
      this.classList.add('SFModal-enter-from');\r
      nextFrame(() => {\r
        this.classList.add('SFModal-enter-active');\r
        this.classList.remove('SFModal-enter-from');\r
        on(this).transitionend(() => {\r
          this.classList.remove('SFModal-enter-active');\r
        });\r
      });\r
    };\r
  }\r
}\r
`;export{r as default};
