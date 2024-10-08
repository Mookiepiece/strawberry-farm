export class IEdgeElement extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
  }

  static install() {
    if (!customElements.get('i-edge')) {
      customElements.define('i-edge', IEdgeElement);
    }
  }
}
