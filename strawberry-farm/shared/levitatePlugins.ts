import { Direction, PopConfigs, PopPlugin, ClipMap } from './levitate';

type LogicalBox = {
  main: number;
  cross: number;
};

const logicalBoxes: Record<Direction, (rect: DOMRect) => LogicalBox> = {
  top: ({ width, height }) => ({ main: height, cross: width }),
  bottom: ({ width, height }) => ({ main: height, cross: width }),

  left: ({ width, height }) => ({ main: width, cross: height }),
  right: ({ width, height }) => ({ main: width, cross: height }),
};

const scrollInline = (config: PopConfigs) =>
  ((config.$pop as HTMLElement).querySelector('[data-pop-box]') || config.$pop as HTMLElement)[
    ['top', 'bottom'].includes(config.dir) ? 'scrollHeight' : 'scrollWidth'
  ];

const AUTO_P_FALLBACKS: Record<Direction, Direction[]> = {
  top: ['bottom', 'left', 'right'],
  bottom: ['top', 'left', 'right'],
  left: ['right', 'top', 'bottom'],
  right: ['left', 'top', 'bottom'],
};

const FLIP_FALLBACKS: Record<Direction, Direction[]> = {
  top: ['bottom'],
  bottom: ['top'],
  left: ['right'],
  right: ['left'],
};

export const autoPlacement =
  (
    settings?: (config: PopConfigs) => {
      limit?: number;
      fallback?: Direction[];
    },
  ) =>
  (config: PopConfigs): PopConfigs => {
    let { ref, pop, viewport, dir } = config;
    let map = ClipMap[dir]([[ref], viewport]);

    const _settings = settings?.(config);
    const $scrollInline = scrollInline(config);
    const limit = _settings?.limit ?? $scrollInline;
    const fallbacks = _settings?.fallback ?? AUTO_P_FALLBACKS[dir];

    if (logicalBoxes[dir](map).main < limit) {
      for (const _dir of fallbacks) {
        let _map = ClipMap[_dir]([[ref], viewport]);
        if (_map.width * _map.height > map.width * map.height) {
          map = _map;
          dir = _dir;
          if (map.height >= limit) {
            break;
          }
        }
      }
    }

    return { ...config, dir, map };
  };

export const flip: typeof autoPlacement = settings =>
  autoPlacement(config => ({
    fallback: FLIP_FALLBACKS[config.dir],
    ...settings?.(config),
  }));

export const sameWidth: PopPlugin = config => {
  const $pop = config.$pop as HTMLElement;
  let width: any = $pop.style.getPropertyValue('width');
  if (!width.endsWith('px')) width = '';
  width = Number(width.slice(0, -2));

  const shouldBe = config.$ref.getBoundingClientRect().width;

  if (width !== shouldBe) {
    $pop.style.setProperty('width', shouldBe + 'px');

    const pop = $pop.getBoundingClientRect();
    return { ...config, pop };
  }
  return config;
};

export const applyTransform: PopPlugin = config => {
  const $ref = config.$ref as HTMLElement;
  const $pop = config.$pop as HTMLElement;

  $pop.setAttribute('data-pop-dir', config.dir);
  $ref.setAttribute('data-pop-dir', config.dir);
  $pop.style.setProperty('--x', config.x + 'px');
  $pop.style.setProperty('--y', config.y + 'px');
  $pop.style.setProperty('max-width', config.map.width + 'px');
  $pop.style.setProperty('max-height', config.map.height + 'px');
  $pop.style.setProperty('transform', 'translate(var(--x), var(--y))');

  return config;
};
applyTransform.post = !0

export const maxHeight: PopPlugin = config => {
  const $pop = config.$pop as HTMLElement;
  const { map } = config;
  $pop.style.setProperty('--max-height', Math.floor(map.height - 20) + 'px');
  return { ...config, pop: $pop.getBoundingClientRect() };
};
