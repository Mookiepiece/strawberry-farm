import { Bag, on } from '../shared';
import { SFElement } from './SFElement';


type SFRadioGroupProps = {
  model?: [any, (value: any) => void];
}

class SFRadioGroupElement extends SFElement {
  model?: [any, (value: any) => void];


  static observedAttributes?: ['data-props'];
  constructor() {
    super();
    this.setup = ({ self, emit, observe }) => {
      if (this.getAttribute('role') !== 'radiogroup')
        this.setAttribute('role', 'radiogroup');

      setupRadioGroup(self);

      const props = this.getAttribute('data-props')
      if (props) {
        this.model = SFElement.props[props].model
      }
      observe('data-props', ()=> {

      })

    };
  }
}

const setupRadioGroup = (el: Element) => {
  const bag = Bag();

  const radios = [...el.querySelectorAll('role=["radio"])')].forEach(radio => {
    const checked = radio.getAttribute('aria-checked') === 'true';
    if ((radio.getAttribute('tabindex') === '0') !== checked) {
      radio.setAttribute('tabindex', checked ? '0' : '-1');
    }
  });

  const prev = () => {
    const current = el.querySelector('role=["radio"][aira-checked="true"]');

    const radios = [...el.querySelectorAll('role=["radio"])')];
  };

  const next = () => {};

  const z = on(el).keydown.exact((e: KeyboardEvent) => {
    if (!(e.target instanceof Element)) return;
    if (!e.target.matches('role=["radio"]')) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        prev();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        next();
        break;
      case 'Enter':
        (
          el.closest('form, [role="form"]') as { submit?: () => void }
        )?.submit?.();
        break;
    }
  });

  return () => bag();
};
