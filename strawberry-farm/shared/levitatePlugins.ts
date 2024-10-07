import { clipMap, Direction, PopConfigs, PopPlugin } from './levitate';

export const margin: (m?: number) => PopPlugin =
  (m = 5) =>
  config => {
    let map = config.map;

    const m2 = 2 * m;
    if (map.width < m2 || map.height < m2) return config;

    const x = map.x + m;
    const y = map.y + m;

    return {
      ...config,
      map: {
        x,
        y,
        top: y,
        right: map.right - m,
        bottom: map.bottom - m,
        left: x,
        width: map.width - m2,
        height: map.height - m2,
        toJSON() {},
      },
    };
  };

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
  (param?: {
    limit?: number;
    fallback?: Direction[];
    margin?: number;
    __flip?: true;
  }) =>
  (popcorn: PopConfigs): PopConfigs => {
    let { anc: ref, map, $pop, viewport, dir } = popcorn;

    const _limit =
      dir === 'left' || dir === 'right'
        ? $pop.offsetWidth - $pop.clientWidth + $pop.scrollWidth
        : $pop.offsetHeight - $pop.clientHeight + $pop.scrollHeight;

    const limit = param?.limit ?? _limit;
    const fallbacks =
      param?.fallback ??
      (param?.__flip ? FLIP_FALLBACKS : AUTO_P_FALLBACKS)[dir];

    const space = dir === 'left' || dir === 'right' ? map.width : map.height;

    if (space < limit) {
      for (const _dir of fallbacks) {
        let _map = clipMap({ dir: _dir, anc: ref, viewport });

        if (param?.margin)
          _map = margin(param.margin)({ ...popcorn, map: _map }).map;

        if (_map.width * _map.height > map.width * map.height) {
          map = _map;
          dir = _dir;
          if (map.height >= limit) break;
        }
      }
    }

    return { ...popcorn, dir, map };
  };

export const flip: typeof autoPlacement = param =>
  autoPlacement({ __flip: true, ...param });

export const sameWidth: PopPlugin = config => {
  const $pop = config.$pop as HTMLElement;
  let width: any = $pop.style.getPropertyValue('width');
  if (!width.endsWith('px')) width = '';
  width = Number(width.slice(0, -2));

  const shouldBe = config.$anc.getBoundingClientRect().width;

  if (width !== shouldBe) {
    $pop.style.setProperty('width', shouldBe + 'px');

    const pop = $pop.getBoundingClientRect();
    return { ...config, pop };
  }
  return config;
};

export const applyTransform: PopPlugin = config => {
  const $ref = config.$anc as HTMLElement;
  const $pop = config.$pop as HTMLElement;

  $pop.setAttribute('data-dir', config.dir);
  $ref.setAttribute('data-dir', config.dir);
  $pop.style.setProperty('--x', config.x + 'px');
  $pop.style.setProperty('--y', config.y + 'px');
  $pop.style.setProperty('left', 'var(--x)');
  $pop.style.setProperty('top', 'var(--y)');
  return config;
};
applyTransform.post = true;

export const maxHeight: PopPlugin = config => {
  const $pop = config.$pop as HTMLElement;
  $pop.style.setProperty('--map-width', config.map.width + 'px');
  $pop.style.setProperty('--map-height', config.map.height + 'px');
  $pop.style.setProperty('max-width', 'var(--map-width)');
  $pop.style.setProperty('max-height', 'var(--map-height)');
  return config;
};
