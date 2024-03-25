import { cx } from '../functions/cx';
import { sf7 } from '../html/sf7';
import {
  toastPrimitive,
  ToastPrimitiveConfig,
} from './ToastPrimitive';

type ToastConfig = ToastPrimitiveConfig | string | Node;
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
  success: 'tone:rasp',
  error: 'tone:reimu',
};

const unpackConfig = (_config: ToastConfig): ToastPrimitiveConfig =>
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
        const toast = sf7(
          'div',
          {
            class: cx(
              'toast',
              'toast--styled',
              iconName && 'toast--rich',
              defaultTones[type],
            ),
          },
          [iconName ? sf7('div', { class: iconName }) : undefined, message],
        );
        return toast;
      })();
      break;
    default:
  }

  return toastPrimitive({
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
  custom: (config: ToastConfig) => toastPrimitive(unpackConfig(config)),
};
