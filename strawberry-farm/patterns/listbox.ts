import { computed, reactive, Ref, ref } from 'vue';
import { wai } from '../shared';

export type ListboxOption<T = any> = {
  value: any;
  label?: string;
  disabled?: boolean;
  meta?: T;
};

export type ListboxOptionSlim<T = any> =
  | ListboxOption<T>
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | symbol
  | object;

export type ListboxGroup<T = any> = {
  title?: string;
  options: ListboxOptionSlim<T>[];
};

export type ListboxInput<T = any> = (ListboxGroup<T> | ListboxOptionSlim<T>)[];

/**
 * Normalize grouped listbox input into options matches sharp `{ value:any; label: string }`
 */
export const flatOptions = <T = any>(i: ListboxInput<T>): ListboxOption<T>[] =>
  i
    .flatMap(o => (typeof o === 'object' && o && 'title' in o ? o.options : o))
    .map(o => {
      if (typeof o === 'object' && o) {
        if (!('label' in o)) {
          return {
            ...(o as { value: any }),
            label: String((o as { value: any }).value),
          };
        }
        return o;
      }
      return { value: o, label: String(o) };
    });

export type ListboxTreeLeaf<T = any> = ListboxOption<T> & {
  index: number;
  selected: boolean;
  current: boolean;
};

export type UseListboxProps<T = any> = {
  disabled?: boolean;
  options?: ListboxInput<T>;
  /**
   * Keyboard navigations `nav()` will update the model in signle selection mode.
   *
   * @default true
   */
  magnetic?: boolean;
  /**
   * Toggle the same option will unselect it in signle selection mode.
   */
  clearable?: boolean;
};
export type Listbox<T = any> = {
  /**
   * The `id` for creating `aria-activedescendant` to indicate current focused option.
   */
  id: string;

  /**
   * model `isArray`
   */
  multi: boolean;
  /**
   * Contains the original (grouped) hierarchy and extra info to rendering the UI.
   */
  tree: (
    | { title?: string; options: ListboxTreeLeaf<T>[] }
    | ListboxTreeLeaf<T>
  )[];
  /**
   * List of options after flatten and normalized, which are objects with `value` property.
   */
  options: ListboxOption<T>[];
  /**
   * Current focuing option index (after options are flatted)
   */
  current: number;
  /**
   * Move focus based on the delta number, skipping `disabled` options.
   *
   * if `magnetic`, movement also toggle target option in single option mode.
   *
   * @example
   * ```js
   * -Infinity // Home
   * -1 // previuse
   * 1  // next
   * Infinity // End
   * ```
   */
  nav(delta: number): void;
  /**
   * Toggle selection for value.
   *
   * This is just manipulating `model.value` with `value`, not affected by `disabled` or `options`
   */
  toggle(value: any): void;
  /**
   * Toggle `current` 's value,
   *
   * Will validate `disabled` state for current option before calling `toggle()`
   *
   */
  toggleCurrent(): void;
  disabled: boolean;
};

export const useListbox = <T = any>(
  model: Ref<any>,
  props: UseListboxProps<T>,
): Listbox<T> => {
  const id = wai();

  const tree = computed<Listbox<T>['tree']>(() => {
    let _index = 0;

    const normalize = (o: ListboxOptionSlim<T>): ListboxTreeLeaf<T> => {
      const value = typeof o === 'object' && o ? (o as any).value : o;
      const index = _index++;

      return {
        label:
          typeof o === 'object' && o
            ? String((o as any).label ?? (o as any).value)
            : String(o),
        value,
        meta: typeof o === 'object' && o ? (o as any).meta : undefined,
        disabled:
          typeof o === 'object' && o ? (o as any).disabled || false : false,
        index,
        selected: multi.value
          ? model.value.includes(value)
          : value === model.value,
        current: current.value === index,
      };
    };

    return (props.options ?? []).map(i => {
      if (typeof i === 'object' && i && 'options' in i)
        return {
          ...i,
          options: i.options.map(normalize),
        };
      return normalize(i);
    });
  });

  const options = computed(() => flatOptions(props.options ?? []));
  const multi = computed(() => Array.isArray(model.value));
  const magnetic = computed(() => props.magnetic ?? true);

  const _current = ref(0);
  const current = computed({
    get() {
      const available = options.value.some(i => !i.disabled);
      if (!available) return -1;
      const i = _current.value;
      if (i < 0 || i >= options.value.length || options.value[i].disabled)
        return options.value[0]?.disabled ? -1 : 0;
      return i;
    },
    set(v) {
      _current.value = v;
    },
  });

  const nav = (delta: number) => {
    const $options = options.value;
    const index = (() => {
      switch (delta) {
        case Number.NEGATIVE_INFINITY:
          return $options.findIndex(o => !o.disabled);
        case Number.POSITIVE_INFINITY:
          return $options.findLastIndex(o => !o.disabled);
        case -1:
        case 1: {
          const before = $options.slice(0, current.value);
          const after = $options.slice(current.value + 1);

          const _index = [...after, ...before][
            delta < 0 ? 'findLastIndex' : 'findIndex'
          ](o => !o.disabled);

          if (_index < 0) return -1;

          return _index < after.length
            ? current.value + 1 + _index
            : _index - after.length;
        }
        default:
          return -1;
      }
    })();
    if (index < 0) return;
    current.value = index;
    scrollCurrentIntoView();
    if (!multi.value && !magnetic) toggle($options[index].value);
  };

  const toggle = (value: any) => {
    if (Array.isArray(model.value))
      model.value = model.value.includes(value)
        ? model.value.toSpliced(model.value.indexOf(value), 1)
        : [...model.value, value];
    else if (props.clearable && model.value === value) model.value = null;
    else model.value = value;
  };

  const toggleCurrent = () => {
    if (current.value < 0) return;
    toggle(options.value[current.value].value);
  };

  const scrollCurrentIntoView = (() => {
    const io = new IntersectionObserver(([entry]) => {
      if ((entry.intersectionRatio || 0) < 1) {
        entry.target.scrollIntoView({ block: 'center', inline: 'center' });
      }
      io.disconnect();
    });
    return () => {
      io.disconnect();
      io.observe(document.getElementById(id + ':' + current.value)!);
    };
  })();

  return reactive({
    id,
    tree,
    multi,
    options,
    current,
    disabled: computed(() => !!props.disabled),
    nav,
    toggle,
    toggleCurrent,
  });
};
