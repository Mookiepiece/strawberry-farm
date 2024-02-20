import { signal } from '../functions/signal';

type Toast = {
  el: HTMLDivElement;
  offset: number;
};

const sig = signal<{
  toasts: Toast[];
}>({
  toasts: [],
});

const Toast = {};
