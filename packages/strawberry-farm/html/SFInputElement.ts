import { on } from '../functions';
import { SFElement } from './SFElement';


// numberic, decimal
class SFInputElement extends SFElement {
  constructor() {
    super();
    this.setup = () => {
      const inner: HTMLInputElement =
        this.$('input') ?? document.createElement('input');
      if (!this.contains(inner)) {
        this.appendChild(inner);
      }

      const off = on(inner).input(ev => {
        inner.value.trim();
      });
    };
  }

  // step: 0.01 (numberic) step 0.1 (numberic)  step 1  (decimal) 
  // precision=""
  static observedAttributes = ['disabled', 'min','max', 'step'];
}
