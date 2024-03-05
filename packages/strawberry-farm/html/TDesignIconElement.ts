import { SFElement } from './SFElement';

export class TDesignIconElement extends SFElement {
  static credits = `Most of icons are based on TDesign https://github.com/Tencent/tdesign-icons @0.2.2; Optimized with https://svgomg.net/`;

  constructor() {
    super();
    this.setup = () => {
      const svg: HTMLElement = this.$('svg') ?? document.createElement('svg');
      if (!this.contains(svg)) {
        this.appendChild(svg);
      }
    };
  }

  static observedAttributes = ['size'];

  static install() {
    if (!customElements.get('t-icon')) {
      customElements.define('t-icon', TDesignIconElement);
    }
  }
}
