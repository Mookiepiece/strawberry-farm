export class ToastBarElement extends HTMLElement {
  offsetMap = new WeakMap<HTMLDivElement, number>();
  heightCacheMap = new WeakMap<HTMLDivElement, number>();
  sort(startIndex = 0) {
    if (this.getAttribute('fixed') === 'true') return;

    const children = ([...this.children] as HTMLDivElement[]).filter(
      el => !el.classList.contains('leaving'),
    );
    if (!children.length) return;

    let offsetCounter =
      (startIndex &&
        this.offsetMap.get(children[startIndex - 1] as HTMLDivElement)) ||
      0;

    for (const i of children.slice(startIndex)) {
      this.offsetMap.set(i, offsetCounter);
      i.style.setProperty('--toast-offset', offsetCounter + 'px');
      offsetCounter += i.offsetHeight + 10;
      this.heightCacheMap.set(i, i.offsetHeight);
    }
  }

  static install() {
    if (!customElements.get('toast-bar')) {
      customElements.define('toast-bar', ToastBarElement);
    }
  }
}
