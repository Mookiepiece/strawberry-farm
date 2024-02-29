import { Bin, inc, nextFrame, on } from '../functions';

const offsetMap = new WeakMap<HTMLDivElement, number>();
const heightCacheMap = new WeakMap<HTMLDivElement, number>();

export class ToastBarElement extends HTMLElement {
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

if (!customElements.get('toast-bar')) {
  customElements.define('toast-bar', ToastBarElement);
}

type ToastConfig = {
  message: string | Node;
  bar?: string;
  duration?: number;
  className?: string;
};

type ToastConfigLoosy = ToastConfig | string | Node;

type ToastType = 'blank' | 'error' | 'success' | 'info' | 'loading' | 'custom';

const defaultTimeouts: Record<ToastType, number> = {
  blank: 4000,
  info: 4000,
  error: 4000,
  custom: 4000,
  loading: Infinity,
  success: 2000,
};

const withDefaults =
  <T>(type: ToastType, fn: (c: ToastConfig) => T) =>
  (c: ToastConfigLoosy) =>
    fn(
      c instanceof Node || typeof c === 'string'
        ? { message: c, duration: Toast.defaultTimeouts[type] }
        : { duration: Toast.defaultTimeouts[type], ...c },
    );

const renderBody = (
  { message }: ToastConfig,
  classNames: string | undefined,
  iconClassName?: string,
) => {
  const toast = document.createElement('div');
  toast.classList.add(
    'toast',
    ...(classNames || '').split(' ').filter(Boolean),
  );

  if (iconClassName) {
    toast.classList.add('toast--rich');
    const icon = document.createElement('div');
    icon.classList.add(...iconClassName?.split(' ').filter(Boolean));
    toast.append(icon);
  }
  toast.append(message);

  return toast;
};

const uuid = inc('ToastItem');

const createToast = ({ message, duration, bar: _bar }: ToastConfig) => {
  const bar = !_bar
    ? document.querySelector<ToastBarElement>('toast-bar[main]')!
    : (document.getElementById(_bar) as ToastBarElement);

  const div = document.createElement('div');
  div.id = uuid();
  div.classList.add('f2');
  div.setAttribute('role', 'log');

  div.append(message);

  const onCleanup = Bin();

  let timer: ReturnType<typeof setTimeout>;
  const pause = () => clearTimeout(timer);
  const play = () => {
    if (Number.isFinite(duration)) {
      timer = setTimeout(() => {
        div.classList.add('leaving');
        on(div).transitionend.once(() => div.remove());
        onCleanup();
        bar.sort();
      }, duration);
    }
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
  defaultTimeouts,
  error: withDefaults('error', config =>
    createToast({
      ...config,
      message: renderBody(config, 'toast--styled', 'toast-i-error'),
    }),
  ),
  success: withDefaults('success', config =>
    createToast({
      ...config,
      message: renderBody(config, 'toast--styled', 'toast-i-success'),
    }),
  ),
  info: withDefaults('info', config =>
    createToast({
      ...config,
      message: renderBody(config, 'toast--styled', 'toast-i-info tone:rasp'),
    }),
  ),
  blank: withDefaults('blank', config =>
    createToast({ ...config, message: renderBody(config, 'toast--styled') }),
  ),
  custom: withDefaults('custom', config =>
    createToast({ ...config, message: renderBody(config, '') }),
  ),
};
