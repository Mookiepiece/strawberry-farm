import { Bag, inc, nextFrame, on } from '../functions';
import { SFElement } from '../html/SFElement';

const offsetMap = new WeakMap<HTMLDivElement, number>();

export class ToastBarElement extends SFElement {
  sort(startIndex = 0) {
    const children = ([...this.children] as HTMLDivElement[]).filter(
      el => !el.classList.contains('leaving'),
    );
    if (!children.length) return;

    let offsetCounter =
      (startIndex &&
        offsetMap.get(children[startIndex - 1] as HTMLDivElement)) ||
      0;

    for (const i of children.slice(startIndex)) {
      offsetMap.set(i, offsetCounter);
      i.style.setProperty('--toast-offset', offsetCounter + 'px');
      offsetCounter += i.offsetHeight + 10;
      console.log(i.id, offsetCounter);
    }
  }
}

const disappearTimers = new WeakMap<
  HTMLElement,
  ReturnType<typeof setTimeout>
>();

const uuid = inc('ToastItem');

export const Toast = {
  error(message: string | Node) {
    const div = document.createElement('div');
    const bar = document.querySelector<ToastBarElement>('toast-bar');
    if (!bar) {
      console.warn('[strawberry-farm] Bar Not Found');
      return div;
    }

    div.id = uuid();
    div.setAttribute('role', 'log');
    div.append(message);

    const pauseDisappear = () => {
      if (disappearTimers.has(div)) {
        clearTimeout(disappearTimers.get(div));
        disappearTimers.delete(div);
      }
    };

    const onCleanup = Bag();

    const startDisappear = () => {
      pauseDisappear();
      disappearTimers.set(
        div,
        setTimeout(() => {
          div.classList.add('leaving');
          on(div).transitionend(() => div.remove());
          onCleanup();
          bar.sort();
        }, 3000),
      );
    };

    const mo = new MutationObserver(() => {
      bar.sort();
    });
    mo.observe(div, {
      subtree: true,
      childList: true,
      attributes: true,
    });
    onCleanup(() => mo.disconnect());

    startDisappear();
    onCleanup(on(div).pointerenter(pauseDisappear));
    onCleanup(on(div).pointerleave(startDisappear));

    bar.insertBefore(div, bar.firstElementChild);
    div.classList.add('appear');
    nextFrame(() => {
      div.classList.remove('appear');
      bar.sort();
    });

    return div;
  },
};
