import { Bag, inc, nextFrame, on } from '../functions';
import { type ToastBarElement } from '../html/ToastBarElement';

const uuid = inc('ToastItem');

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

  const onClose = Bag();
  const bag = Bag();

  const close = () => {
    onClose();
    div.classList.add('leaving');
    on(div).transitionend.once(() => {
      bag();
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

  return { div, pause, play, close, bag };
};
