import { inc } from '../functions';
import { store } from '../functions/store';

const uuid = inc();

type Toast = {
  el: HTMLDivElement;
  offset: number;
};

const sig = store<{
  toasts: Toast[];
}>({
  toasts: [],
});

const Toast = () => {};
