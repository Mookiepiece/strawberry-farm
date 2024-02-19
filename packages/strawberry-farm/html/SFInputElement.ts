import { SFElement } from './SFElement';

class SFInputElement extends SFElement {
  constructor() {
    super();
  }

  submit() {}

  connectedCallback() {
    this.classList.add('sf-input');

    const inner = this.$('input') ?? document.createElement('input');
    if (this.contains(inner)) {
      this.appendChild(inner);
    }
  }

  disconnectedCallback() {}

  static observedAttributes?: string[];
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {}
}
