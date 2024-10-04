const r=`import { Bag, on } from '../shared';\r
import { SFElement } from './SFElement';\r
\r
\r
type SFRadioGroupProps = {\r
  model?: [any, (value: any) => void];\r
}\r
\r
class SFRadioGroupElement extends SFElement {\r
  model?: [any, (value: any) => void];\r
\r
\r
  static observedAttributes?: ['data-props'];\r
  constructor() {\r
    super();\r
    this.setup = ({ self, emit, observe }) => {\r
      if (this.getAttribute('role') !== 'radiogroup')\r
        this.setAttribute('role', 'radiogroup');\r
\r
      setupRadioGroup(self);\r
\r
      const props = this.getAttribute('data-props')\r
      if (props) {\r
        this.model = SFElement.props[props].model\r
      }\r
      observe('data-props', ()=> {\r
\r
      })\r
\r
    };\r
  }\r
}\r
\r
const setupRadioGroup = (el: Element) => {\r
  const bag = Bag();\r
\r
  const radios = [...el.querySelectorAll('role=["radio"])')].forEach(radio => {\r
    const checked = radio.getAttribute('aria-checked') === 'true';\r
    if ((radio.getAttribute('tabindex') === '0') !== checked) {\r
      radio.setAttribute('tabindex', checked ? '0' : '-1');\r
    }\r
  });\r
\r
  const prev = () => {\r
    const current = el.querySelector('role=["radio"][aira-checked="true"]');\r
\r
    const radios = [...el.querySelectorAll('role=["radio"])')];\r
  };\r
\r
  const next = () => {};\r
\r
  const z = on(el).keydown.exact((e: KeyboardEvent) => {\r
    if (!(e.target instanceof Element)) return;\r
    if (!e.target.matches('role=["radio"]')) return;\r
\r
    switch (e.key) {\r
      case 'ArrowUp':\r
      case 'ArrowLeft':\r
        prev();\r
        break;\r
      case 'ArrowDown':\r
      case 'ArrowRight':\r
        next();\r
        break;\r
      case 'Enter':\r
        (\r
          el.closest('form, [role="form"]') as { submit?: () => void }\r
        )?.submit?.();\r
        break;\r
    }\r
  });\r
\r
  return () => bag();\r
};\r
`;export{r as default};
