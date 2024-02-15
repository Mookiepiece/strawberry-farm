export interface SFCustomEventMap {
  sfvoid: { void: string };
}

export type SFEventMap = HTMLElementEventMap & SFCustomEventMap;
type SFEvents = SFEventMap & Record<string, any>;

type EventModifiers =
  | 'stop'
  | 'prevent'
  | 'self'
  | 'capture'
  | 'once'
  | 'passive';
type SystemKeyModifiers = 'ctrl' | 'alt' | 'shift' | 'meta' | 'exact';
type KeyReconizerModifiers = 'key';
type Modifiers = EventModifiers | SystemKeyModifiers | KeyReconizerModifiers;

const systemModifiers = ['ctrl', 'shift', 'alt', 'meta'] as const;

type KeyedEvent = MouseEvent | KeyboardEvent | TouchEvent;
/**
 * https://github.com/vuejs/core/blob/ee4cd78a06e6aa92b12564e527d131d1064c2cd0/packages/runtime-dom/src/directives/vOn.ts#L14
 */
const modifierGuards: Record<
  string,
  (e: Event, set: Set<string>) => void | boolean
> = {
  stop: e => e.stopPropagation(),
  prevent: e => e.preventDefault(),
  self: e => e.target !== e.currentTarget,
  ctrl: e => !(e as KeyedEvent).ctrlKey,
  shift: e => !(e as KeyedEvent).shiftKey,
  alt: e => !(e as KeyedEvent).altKey,
  meta: e => !(e as KeyedEvent).metaKey,
  exact: (e, set) =>
    systemModifiers.some(m => (e as KeyedEvent)[`${m}Key`] && !set.has(m)),
};

export type ON<T extends EventTarget> = (target: T) => ON2;

export type ON2 = {
  [N in keyof SFEvents]: ON3<N, SFEvents[N]>;
};

export type ON3<N extends keyof SFEvents, E extends SFEvents[N]> = ((
  listener: (ev: E) => void,
) => () => void) & {
  [K in Modifiers]: ON3<N, E>;
} & (E extends KeyboardEvent
    ? {
        [K in string]: ON3<N, E>;
      }
    : void);

export const on = <T extends EventTarget>(el: T) => {
  let _modifiers: string[] = [];

  const polaris = new Proxy(() => {}, {
    get(_, p) {
      _modifiers.push(p as string);
      return polaris;
    },
    apply(_, __, argArray) {
      const [type, ...m] = _modifiers;
      const set = new Set<Modifiers>(m as any[]);

      const capture = set.has('capture');
      const once = set.has('once');
      const passive = set.has('passive');
      set.delete('capture');
      set.delete('once');
      set.delete('passive');

      const codeVsKey: 'code' | 'key' = set.has('key') ? 'key' : 'code';
      set.delete('key');
      let keyCode = '';

      const fn = (e: Event) => {
        for (const modifier of set) {
          if (!modifierGuards[modifier]) keyCode = modifier;
          else if (modifierGuards[modifier](e, set)) return;
        }
        if (keyCode && keyCode !== (e as KeyboardEvent)[codeVsKey]) return;

        argArray[0](e instanceof CustomEvent ? e.detail : e);
      };

      el.addEventListener(type, fn, { capture, once, passive });
      return () => el.removeEventListener(type, fn);
    },
  }) as any as ON2;
  return polaris;
};

on(document.body).keydown(keyboardevt => {});
on(document.body).keydown.exact(keyboardevt => {});
on(document.body).keydown.ctrl(keyboardevt => {});
on(document.body).keydown.KeyK(keyboardevt => {});
on(document.body).keypress.ctrl.KeyK(keyboardevt => {});

on(document.body).click.ctrl(mouse => {});
on(document.body).click(mouse => {});
on(document.body).pointercancel(pointer => {});
on(document.body).wheel(wheel => {});
on(document.body).touchmove(wheel => {});
on(document.body).transitioncancel(po => {});
on(document.body).exact(keyboardevt => {});
on(document.body).customevents(keyboardevt => {});
on(document.body).sfvoid(voidevent => {});
