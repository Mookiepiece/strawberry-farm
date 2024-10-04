const t=`import { on } from '../shared';\r
import { SFElement } from './SFElement';\r
\r
// numberic, decimal\r
class SFInputElement extends SFElement {\r
  constructor() {\r
    super();\r
    this.setup = () => {\r
      const input: HTMLInputElement =\r
        this.$('input') ?? document.createElement('input');\r
      if (!this.contains(input)) {\r
        this.appendChild(input);\r
      }\r
\r
      const off = on(input).input(ev => {\r
        this.emit('Input', input.value.trim());\r
      });\r
    };\r
  }\r
\r
  // step: 0.01 (numberic) step 0.1 (numberic)  step 1  (decimal)\r
  // fraction=""\r
  static observedAttributes = ['disabled', 'min', 'max', 'step', 'fraction'];\r
}\r
\r
class SFInputNumberElement extends SFElement {\r
  constructor() {\r
    super();\r
    this.setup = self => {\r
      const isTextarea =this.getAttribute('textarea') !== 'false'\r
\r
      const input: HTMLInputElement | HTMLTextAreaElement =\r
        isTextarea ? \r
        (self.$('textarea') ?? document.createElement('textarea') ):\r
        (self.$('input') ?? document.createElement('input'));\r
      \r
        if (!self.contains(input)) {\r
        self.appendChild(input);\r
      }\r
\r
      const off = on(input).input(() => {\r
        const input.value.trim();\r
      });\r
\r
      const fraction = Number(self.getAttribute('fraction') || '0');\r
      const min = Number(self.getAttribute('min') || Number.NEGATIVE_INFINITY);\r
      const max = Number(self.getAttribute('max') || Number.POSITIVE_INFINITY);\r
\r
      let inputMode: '' | 'decimal' | 'numeric' = '';\r
      if (min === 0) {\r
        if (fraction) {\r
          inputMode = 'decimal';\r
        } else {\r
          inputMode = 'numeric';\r
        }\r
      }\r
    };\r
  }\r
\r
  static observedAttributes = ['disabled', 'min', 'max', 'step', 'fraction'];\r
\r
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {\r
      \r
  }\r
}\r
`;export{t as default};
