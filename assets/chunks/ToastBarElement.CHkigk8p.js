const e=`export class ToastBarElement extends HTMLElement {\r
  offsetMap = new WeakMap<HTMLDivElement, number>();\r
  heightCacheMap = new WeakMap<HTMLDivElement, number>();\r
  sort(startIndex = 0) {\r
    if (this.getAttribute('fixed') === 'true') return;\r
\r
    const children = ([...this.children] as HTMLDivElement[]).filter(\r
      el => !el.classList.contains('leaving'),\r
    );\r
    if (!children.length) return;\r
\r
    let offsetCounter =\r
      (startIndex &&\r
        this.offsetMap.get(children[startIndex - 1] as HTMLDivElement)) ||\r
      0;\r
\r
    for (const i of children.slice(startIndex)) {\r
      this.offsetMap.set(i, offsetCounter);\r
      i.style.setProperty('--toast-offset', offsetCounter + 'px');\r
      offsetCounter += i.offsetHeight + 10;\r
      this.heightCacheMap.set(i, i.offsetHeight);\r
    }\r
  }\r
\r
  static install() {\r
    if (!customElements.get('toast-bar')) {\r
      customElements.define('toast-bar', ToastBarElement);\r
    }\r
  }\r
}\r
`;export{e as default};
