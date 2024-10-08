import { watchEffect } from 'vue';
import { Bag, IBag } from './collection';

export const bagEffect = (cb: (bag: IBag) => void) =>
  watchEffect(onCleanup => {
    const bag = Bag();
    onCleanup(() => bag());
    cb(bag);
  });
