import { Bag, fx, nextFrame, on } from '../shared';

const div = (props: { class: any | any[] }, children: any[] = []) => {
  const div = document.createElement('div');
  div.className = Array.isArray(props.class)
    ? props.class.filter(Boolean).join(' ')
    : props.class;
  div.append(...children.filter(Boolean));
  return div;
};

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
      (startIndex && this.offsetMap.get(children[startIndex - 1])) || 0;

    for (const i of children.slice(startIndex)) {
      this.offsetMap.set(i, offsetCounter);
      i.style.setProperty('--toast-offset', offsetCounter + 'px');
      offsetCounter += i.offsetHeight + 10;
      this.heightCacheMap.set(i, i.offsetHeight);
    }
  }
}

if (globalThis.window) {
  customElements.define('toast-bar', ToastBarElement);
}

export type RawToastConfig = {
  message: string | Node;
  bar?: string;
  duration?: number;
};

export const rawToast = ({
  message,
  duration = 4000,
  bar: _bar = 'ToastBarTopCenter',
}: RawToastConfig) => {
  const bar = document.getElementById(_bar) as ToastBarElement;
  const div = document.createElement('div');
  div.append(message);

  const onClose = Bag();
  const bag = Bag();

  const close = () => {
    onClose();

    fx.transition(div, {
      from() {
        div.classList.add('leaving');
      },
      done() {
        div.remove();
        bar.sort();
        bag();
      },
    });
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

type ToastConfig = RawToastConfig | string | Node;
type ToastType = 'blank' | 'error' | 'success' | 'loading' | 'custom';

const defaultTimeouts: Record<ToastType, number> = {
  blank: 4000,
  error: 4000,
  custom: 4000,
  loading: Infinity,
  success: 2000,
};

const icons: Partial<Record<ToastType, string>> = {
  success: 'toast-i-success',
  error: 'toast-i-error',
};

const defaultTones: Partial<Record<ToastType, string>> = {
  success: 'tone-rasp',
  error: 'tone-reimu',
};

const unpackConfig = (_config: ToastConfig): RawToastConfig =>
  _config instanceof Node || typeof _config === 'string'
    ? { message: _config }
    : _config;

const createToast = (_config: ToastConfig, type: ToastType) => {
  let { message, bar, duration } = unpackConfig(_config);

  switch (type) {
    case 'success':
    case 'error':
    case 'blank':
      message = (() => {
        const iconName = icons[type];
        return div(
          {
            class: [
              'toast',
              'toast--styled',
              iconName && 'toast--rich',
              defaultTones[type],
            ],
          },
          [iconName ? div({ class: iconName }) : undefined, message],
        );
      })();
      break;
    default:
  }

  return rawToast({
    message,
    duration: duration ?? defaultTimeouts[type],
    bar,
  });
};

export const Toast = {
  defaultTimeouts,
  defaultTones,
  success: (config: ToastConfig) => createToast(config, 'success'),
  error: (config: ToastConfig) => createToast(config, 'error'),
  blank: (config: ToastConfig) => createToast(config, 'blank'),
  custom: (config: ToastConfig) => rawToast(unpackConfig(config)),
};
