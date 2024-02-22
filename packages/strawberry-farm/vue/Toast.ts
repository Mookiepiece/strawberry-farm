import { Bag, inc, nextFrame, on } from '../functions';
import { SFElement } from '../html/SFElement';

const offsetMap = new WeakMap<HTMLDivElement, number>();
const heightCacheMap = new WeakMap<HTMLDivElement, number>();

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
      heightCacheMap.set(i, i.offsetHeight);
    }
  }
}

type ToastConfig = {
  message: string | Node;
  bar?: ToastBarElement;
  duration?: number;
  className?: string;
};

const renderBody = (
  message: string | Node,
  classNames: string | undefined,
  iconClassName?: string,
) => {
  const toast = document.createElement('div');
  toast.classList.add(
    'toast',
    ...(classNames ?? 'toast--styled').split(' ').filter(Boolean),
  );

  if (iconClassName) {
    toast.classList.add('toast--rich');
    const icon = document.createElement('div');
    icon.classList.add(iconClassName);
    toast.append(icon);
  }
  toast.append(message);

  return toast;
};

const uuid = inc('ToastItem');

const createToast = (body: Node) => {
  const div = document.createElement('div');
  const bar = document.querySelector<ToastBarElement>('toast-bar[main]')!;

  div.id = uuid();
  div.classList.add('f2');
  div.setAttribute('role', 'log');

  div.append(body);

  const onCleanup = Bag();

  let timer: ReturnType<typeof setTimeout>;
  const pause = () => clearTimeout(timer);
  const play = () => {
    timer = setTimeout(() => {
      div.classList.add('leaving');
      on(div).transitionend(() => div.remove());
      onCleanup();
      bar.sort();
    }, 3000);
  };

  const mo = new MutationObserver(() => {
    // If we don't want to get an infinite loop in google chrome
    if (div.offsetHeight !== heightCacheMap.get(div)) {
      bar.sort();
    }
  });
  mo.observe(div, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
  });
  onCleanup(() => mo.disconnect());

  play();
  onCleanup(on(div).pointerenter(() => pause()));
  onCleanup(on(div).pointerleave(play));

  bar.insertBefore(div, bar.firstElementChild);
  div.classList.add('appear');
  nextFrame(() => {
    div.classList.remove('appear');
    bar.sort();
  });

  return { div, pause, play };
};

export const Toast = {
  error: (message: string | Node) =>
    createToast(renderBody(message, undefined, 'toast-i-error')),
  success: (message: string | Node) =>
    createToast(renderBody(message, undefined, 'toast-i-success')),
  info: (message: string | Node) =>
    createToast(renderBody(message, undefined, 'toast-i-info')),
  custom: (message: string | Node) => createToast(renderBody(message, '')),
};
