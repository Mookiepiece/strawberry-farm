// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { ListboxInput, useListbox } from '../listbox';
import { reactive, ref } from 'vue';

describe('Listbox', () => {
  it('Flatten options', () => {
    const input: ListboxInput = [
      {
        title: 'Group1',
        options: [{ value: 1 }, 2],
      },
      { value: 3, label: '1+2', disabled: false, meta: -1 },
    ];

    const model = ref(null);
    const { options } = useListbox(model, { options: input });
    expect(options).toEqual([
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '1+2', disabled: false, meta: -1 },
    ]);
  });

  it('Predicate current by initial value', () => {
    const options = [1, 2, 3, 4];
    expect(useListbox(ref([2, 3]), { options }).current).toBe(1);
    expect(useListbox(ref(2), { options }).current).toBe(1);
  });

  it('Navigates', () => {
    const circular = true;
    const options = ref<ListboxInput>([1, 2, 3]);
    const listbox = useListbox(ref(), reactive({ options }));
    expect(listbox.current).toBe(0);
    listbox.nav(Number.POSITIVE_INFINITY);
    expect(listbox.current).toBe(2);
    listbox.nav(Number.NEGATIVE_INFINITY);
    expect(listbox.current).toBe(0);
    listbox.nav(-1, circular);
    expect(listbox.current).toBe(2);
    listbox.nav(1, circular);
    expect(listbox.current).toBe(0);
    listbox.nav(-1);
    expect(listbox.current).toBe(0);

    // Changed options length
    listbox.nav(-1, circular);
    options.value = [1, 2];
    expect(listbox.current).toBe(0);

    options.value = [];
    expect(listbox.current).toBe(-1);

    options.value = [1, 2, 3];
    expect(listbox.current).toBe(2);

    // Skip disabled options
    options.value = [
      { value: 1, disabled: true },
      { value: 2, disabled: true },
      { value: 3, disabled: true },
    ];
    expect(listbox.current).toBe(-1);
    listbox.nav(1, circular);
    expect(listbox.current).toBe(-1);
    options.value = [
      { value: 1, disabled: true },
      2,
      3,
      { value: 4, disabled: true },
    ];
    listbox.nav(1, circular);
    expect(listbox.current).toBe(1);
    listbox.nav(Number.POSITIVE_INFINITY, circular);
    expect(listbox.current).toBe(2);
    listbox.nav(1, circular);
    expect(listbox.current).toBe(1);
    listbox.nav(-1, circular);
    expect(listbox.current).toBe(2);
  });

  it('Toggles', () => {
    const model = ref(null);
    const clearable = ref(false);
    const [a, b] = [Symbol(), Symbol()];
    const listbox = useListbox(model, reactive({ options: [a, b], clearable }));
    expect(listbox.current).toBe(0);
    listbox.input(listbox);
    expect(model.value).toStrictEqual(a);
    listbox.input(b);
    expect(model.value).toStrictEqual(b);

    // Clearable
    listbox.input(b);
    expect(model.value).toBe(b);
    clearable.value = true;
    listbox.input(b);
    expect(model.value).toBe(null);
  });

  it('Multiple toggles', () => {
    const model = ref([]);
    const listbox = useListbox(model, {
      options: [{ value: true, disabled: true }, false, Infinity],
    });
    expect(listbox.current).toBe(-1);
    const snapshot = model.value;
    listbox.input(listbox);
    expect(model.value === snapshot).toBeTruthy();
    listbox.nav(1);
    listbox.input(listbox);
    expect(model.value).toStrictEqual([false]);
    listbox.input(true);
    expect(model.value).toStrictEqual([false]);
    listbox.input(-Infinity);
    expect(model.value).toStrictEqual([false]);
    listbox.input(Infinity);
    expect(model.value).toStrictEqual([false, Infinity]);
  });

  it('Disable', () => {
    const model = ref();
    const listbox = useListbox(model, {
      options: [0, 1],
      disabled: true,
    });
    expect(listbox.disabled).toBe(true);
    listbox.input(listbox);
    expect(model.value).toBe(undefined);
    listbox.input(0);
    expect(model.value).toBe(undefined);
    listbox.nav(0);
    expect(listbox.current).toBe(0);
  });

  it('Tree hierarchy', () => {
    const listbox = useListbox(ref(2), {
      options: [
        { label: '', value: 1, meta: 1 },
        { title: 'A', options: [2] },
      ],
    });
    expect(listbox.tree).toStrictEqual([
      {
        value: 1,
        label: '',
        meta: 1,

        disabled: false,
        index: 0,
      },
      {
        title: 'A',
        options: [
          {
            value: 2,
            label: '2',
            meta: undefined,

            disabled: false,
            index: 1,
          },
        ],
      },
    ]);
  });
});
