import { Direction, PopConfigs, PopPlugin, availableSpace4 } from './levitate';

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

const allFlipFallbacks: Record<Direction, Direction[]> = {
  top: ['bottom', 'left', 'right'],
  bottom: ['top', 'left', 'right'],
  left: ['right', 'top', 'bottom'],
  right: ['left', 'top', 'bottom'],
};

const mainAxisFlipFallbacks: Record<Direction, Direction[]> = {
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
    let { ref, pop, viewport, dir, offset } = config;
    let map = availableSpace4[dir]([[ref], viewport], offset);

    const _settings = settings?.(config);
    const limit = _settings?.limit ?? logicalBoxes[dir](pop).main;
    const fallbacks = _settings?.fallback ?? allFlipFallbacks[dir];

    if (logicalBoxes[dir](map).main < limit) {
      for (const _dir of fallbacks) {
        let _map = availableSpace4[_dir]([[ref], viewport], offset);
        if (_map.width * _map.height > map.width * map.height) {
          map = _map;
          dir = _dir;
          break;
        }
      }
    }

    return { ...config, dir, map };
  };

export const flip: typeof autoPlacement = settings =>
  autoPlacement(config => ({
    fallback: mainAxisFlipFallbacks[config.dir],
    ...settings?.(config),
  }));

export const sameWidth: PopPlugin = config => {
  let width: any = config.$pop.style.getPropertyValue('width');
  if (!width.endsWith('px')) width = '';
  width = Number(width.slice(0, -2));

  const shouldBe = config.$ref.getBoundingClientRect().width;

  if (width !== shouldBe) {
    config.$pop.style.setProperty('width', shouldBe + 'px');

    const pop = config.$pop.getBoundingClientRect();
    return { ...config, pop };
  }
  return config;
};

export const applyTransform: PopPlugin = config => {
  const $pop = config.$pop as HTMLElement;

  $pop.style.setProperty('--x', config.x + 'px');
  $pop.style.setProperty('--y', config.y + 'px');
  $pop.style.setProperty('transform', 'translate(var(--x), var(--y))');
  $pop.setAttribute('data-pop-dir', dir);
  
  return config;
};

export const dataAttr: PopPlugin = config => {
  const $pop = config.$pop as HTMLElement;
  const { dir } = config;
  return config;
};

export const maxHeight: PopPlugin = config => {
  const $pop = config.$pop as HTMLElement;
  const { map } = config;
  $pop.style.setProperty('--max-height', Math.floor(map.height - 20) + 'px');
  return { ...config, pop: $pop.getBoundingClientRect() };
};
