// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { Listbox, ListboxInput, useListbox } from '../listbox';
import { computed, reactive, ref } from 'vue';

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

  it('Predicate Current', () => {
    const options = [1, 2, 3, 4];
    expect(useListbox(ref([2, 3]), { options }).current).toBe(1);
    expect(useListbox(ref(2), { options }).current).toBe(1);
  });

  it('Navigates', () => {
    const options = ref<ListboxInput>([1, 2, 3]);
    const listbox = useListbox(ref(), reactive({ options }));
    expect(listbox.current).toBe(0);
    listbox.nav(Number.POSITIVE_INFINITY);
    expect(listbox.current).toBe(2);
    listbox.nav(Number.NEGATIVE_INFINITY);
    expect(listbox.current).toBe(0);
    listbox.nav(-1);
    expect(listbox.current).toBe(2);
    listbox.nav(1);
    expect(listbox.current).toBe(0);

    // Changed options length
    listbox.nav(-1);
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
    listbox.nav(1);
    expect(listbox.current).toBe(-1);
    options.value = [
      { value: 1, disabled: true },
      2,
      3,
      { value: 4, disabled: true },
    ];
    listbox.nav(1);
    expect(listbox.current).toBe(1);
    listbox.nav(Number.POSITIVE_INFINITY);
    expect(listbox.current).toBe(2);
    listbox.nav(1);
    expect(listbox.current).toBe(1);
    listbox.nav(-1);
    expect(listbox.current).toBe(2);
  });

  it('Toggles', () => {
    const model = ref(null);
    const clearable = ref(false);
    const [a, b] = [Symbol(), Symbol()];
    const listbox = useListbox(model, reactive({ options: [a, b], clearable }));
    expect(listbox.current).toBe(0);
    listbox.toggle(listbox);
    expect(model.value).toStrictEqual(a);
    listbox.toggle(b);
    expect(model.value).toStrictEqual(b);

    // Clearable
    listbox.toggle(b);
    expect(model.value).toBe(b);
    clearable.value = true;
    listbox.toggle(b);
    expect(model.value).toBe(null);
  });

  it('Multiple Toggles', () => {
    const model = ref([]);
    const listbox = useListbox(model, {
      options: [{ value: true, disabled: true }, false, Infinity],
    });
    expect(listbox.current).toBe(-1);
    const snapshot = model.value;
    listbox.toggle(listbox);
    expect(model.value === snapshot).toBeTruthy();
    listbox.nav(1);
    listbox.toggle(listbox);
    expect(model.value).toStrictEqual([false]);
    listbox.toggle(true);
    expect(model.value).toStrictEqual([false]);
    listbox.toggle(-Infinity);
    expect(model.value).toStrictEqual([false]);
    listbox.toggle(Infinity);
    expect(model.value).toStrictEqual([false, Infinity]);
  });

  it('Disable', () => {
    const model = ref();
    const listbox = useListbox(model, {
      options: [0, 1],
      disabled: true,
    });
    expect(listbox.disabled).toBe(true);
    listbox.toggle(listbox);
    expect(model.value).toBe(undefined);
    listbox.toggle(0);
    expect(model.value).toBe(undefined);
    listbox.nav(0);
    expect(listbox.current).toBe(0);
  });
});
