const e=`export class IEdgeElement extends HTMLElement {\r
  connectedCallback() {\r
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');\r
  }\r
\r
  static install() {\r
    if (!customElements.get('i-edge')) {\r
      customElements.define('i-edge', IEdgeElement);\r
    }\r
  }\r
}\r
`;export{e as default};
