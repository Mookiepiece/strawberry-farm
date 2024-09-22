import { clipMap, Direction, PopConfigs, PopPlugin } from './levitate';

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
    let { ref, map, $pop, viewport, dir } = config;

    const _settings = settings?.(config);

    const _limit =
      dir === 'left' || dir === 'right'
        ? $pop.offsetWidth - $pop.clientWidth + $pop.scrollWidth
        : $pop.offsetHeight - $pop.clientHeight + $pop.scrollHeight;

    const limit = _settings?.limit ?? _limit;
    const fallbacks = _settings?.fallback ?? AUTO_P_FALLBACKS[dir];

    const space = dir === 'left' || dir === 'right' ? map.width : map.height;

    if (space < limit) {
      for (const _dir of fallbacks) {
        let _map = clipMap({ dir: _dir, ref, viewport });
        if (_map.width * _map.height > map.width * map.height) {
          map = _map;
          dir = _dir;
          if (map.height >= limit) break;
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
  $pop.style.setProperty('--map-width', config.map.width + 'px');
  $pop.style.setProperty('--map-height', config.map.height + 'px');
  $pop.style.setProperty('max-width', 'var(--map-width)');
  $pop.style.setProperty('max-height', 'var(--map-height)');
  $pop.style.setProperty('left', 'var(--x)');
  $pop.style.setProperty('top', 'var(--y)');
  return config;
};
applyTransform.post = true;

export const maxHeight: PopPlugin = config => {
  // const $pop = config.$pop as HTMLElement;
  // const { map } = config;
  // $pop.style.setProperty('--max-height', Math.floor(map.height - 20) + 'px');
  // return { ...config, pop: $pop.getBoundingClientRect() };
  return config;
};
