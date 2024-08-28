// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { Listbox, ListboxInput, useListbox } from '../listbox';
import { computed, reactive, ref } from 'vue';

describe('Listbox', () => {
  const input: ListboxInput = [
    {
      title: 'Group1',
      options: [{ value: 1 }, 2],
    },
    { value: 3, label: '1+2', disabled: false, meta: -1 },
  ];

  it('Flatten options', () => {
    const model = ref(null);
    const { options } = useListbox(model, { options: input });
    expect(options).toEqual([
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '1+2', disabled: false, meta: -1 },
    ]);
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
});
