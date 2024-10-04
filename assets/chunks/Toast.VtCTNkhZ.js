const n=`import { cx } from '../shared/cx';\r
import { sf7 } from '../html/sf7';\r
import {\r
  rawToast,\r
  RawToastConfig,\r
} from './rawToast';\r
\r
type ToastConfig = RawToastConfig | string | Node;\r
type ToastType = 'blank' | 'error' | 'success' | 'loading' | 'custom';\r
\r
const defaultTimeouts: Record<ToastType, number> = {\r
  blank: 4000,\r
  error: 4000,\r
  custom: 4000,\r
  loading: Infinity,\r
  success: 2000,\r
};\r
\r
const icons: Partial<Record<ToastType, string>> = {\r
  success: 'toast-i-success',\r
  error: 'toast-i-error',\r
};\r
\r
const defaultTones: Partial<Record<ToastType, string>> = {\r
  success: 'tone-rasp',\r
  error: 'tone-reimu',\r
};\r
\r
const unpackConfig = (_config: ToastConfig): RawToastConfig =>\r
  _config instanceof Node || typeof _config === 'string'\r
    ? { message: _config }\r
    : _config;\r
\r
const createToast = (_config: ToastConfig, type: ToastType) => {\r
  let { message, bar, duration } = unpackConfig(_config);\r
\r
  switch (type) {\r
    case 'success':\r
    case 'error':\r
    case 'blank':\r
      message = (() => {\r
        const iconName = icons[type];\r
        const toast = sf7(\r
          'div',\r
          {\r
            class: cx(\r
              'toast',\r
              'toast--styled',\r
              iconName && 'toast--rich',\r
              defaultTones[type],\r
            ),\r
          },\r
          [iconName ? sf7('div', { class: iconName }) : undefined, message],\r
        );\r
        return toast;\r
      })();\r
      break;\r
    default:\r
  }\r
\r
  return rawToast({\r
    message,\r
    duration: duration ?? defaultTimeouts[type],\r
    bar,\r
  });\r
};\r
\r
export const Toast = {\r
  defaultTimeouts,\r
  defaultTones,\r
  success: (config: ToastConfig) => createToast(config, 'success'),\r
  error: (config: ToastConfig) => createToast(config, 'error'),\r
  blank: (config: ToastConfig) => createToast(config, 'blank'),\r
  custom: (config: ToastConfig) => rawToast(unpackConfig(config)),\r
};\r
`;export{n as default};
