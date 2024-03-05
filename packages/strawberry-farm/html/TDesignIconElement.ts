          import { SFElement } from './SFElement';

export class TDesignIconElement extends SFElement {
  static credits = `Most of icons are based on TDesign https://github.com/Tencent/tdesign-icons @0.2.2; Optimized with https://svgomg.net/`;

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

  static install() {
    if (!customElements.get('t-icon')) {
      customElements.define('t-icon', TDesignIconElement);
    }
  }
}
