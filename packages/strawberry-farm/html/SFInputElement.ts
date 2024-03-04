import { on } from '../functions';
import { SFElement } from './SFElement';

// numberic, decimal
class SFInputElement extends SFElement {
  constructor() {
    super();
    this.setup = () => {
      const input: HTMLInputElement =
        this.$('input') ?? document.createElement('input');
      if (!this.contains(input)) {
        this.appendChild(input);
      }

      const off = on(input).input(ev => {
        this.emit('Input', input.value.trim());
      });
    };
  }

  // step: 0.01 (numberic) step 0.1 (numberic)  step 1  (decimal)
  // fraction=""
  static observedAttributes = ['disabled', 'min', 'max', 'step', 'fraction'];
}

class SFInputNumberElement extends SFElement {
  constructor() {
    super();
    this.setup = self => {
      const isTextarea =this.getAttribute('textarea') !== 'false'

      const input: HTMLInputElement | HTMLTextAreaElement =
        isTextarea ? 
        (self.$('textarea') ?? document.createElement('textarea') ):
        (self.$('input') ?? document.createElement('input'));
      
        if (!self.contains(input)) {
        self.appendChild(input);
      }

      const off = on(input).input(() => {
        const input.value.trim();
      });

      const fraction = Number(self.getAttribute('fraction') || '0');
      const min = Number(self.getAttribute('min') || Number.NEGATIVE_INFINITY);
      const max = Number(self.getAttribute('max') || Number.POSITIVE_INFINITY);

      let inputMode: '' | 'decimal' | 'numeric' = '';
      if (min === 0) {
        if (fraction) {
          inputMode = 'decimal';
        } else {
          inputMode = 'numeric';
        }
      }
    };
  }

  static observedAttributes = ['disabled', 'min', 'max', 'step', 'fraction'];

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
      
  }
}
