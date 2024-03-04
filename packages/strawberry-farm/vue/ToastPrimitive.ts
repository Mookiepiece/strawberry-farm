import { Bin, inc, nextFrame, on } from '../functions';

const uuid = inc('ToastItem');

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

export type ToastPrimitiveConfig = {
  message: string | Node;
  bar?: string;
  duration?: number;
};

export const toastPrimitive = ({
  message,
  duration = 4000,
  bar: _bar = 'ToastBarTopCenter',
}: ToastPrimitiveConfig) => {
  const bar = document.getElementById(_bar) as ToastBarElement;
  const div = document.createElement('div');
  div.id = uuid();
  div.classList.add('f2');
  div.setAttribute('role', 'log');
  div.append(message);

  const onClose = Bin();
  const bin = Bin();

  const close = () => {
    onClose();
    div.classList.add('leaving');
    on(div).transitionend.once(() => {
      bin();
      div.remove();
    });
    bar.sort();
  };

  const mo = new MutationObserver(() => {
    // This excutes many times, e.g. adding entering class name
    // If we don't want to get an infinite loop in google chrome
    if (div.offsetHeight !== bar.heightCacheMap.get(div)) {
      bar.sort();
    }
  });
  mo.observe(div, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  });
  onClose(() => mo.disconnect());

  let timer: ReturnType<typeof setTimeout>;
  const pause = () => clearTimeout(timer);
  const play = () => {
    if (Number.isFinite(duration)) {
      timer = setTimeout(close, duration);
    }
  };
  play();
  onClose(on(div).pointerenter(pause));
  onClose(on(div).pointerleave(play));

  bar.insertBefore(div, bar.firstElementChild);
  div.classList.add('entering');
  nextFrame(() => {
    div.classList.remove('entering');
    bar.sort();
  });

  return { div, pause, play, close, bin };
};
