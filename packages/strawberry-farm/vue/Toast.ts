import { Bag, inc } from '../functions';
import { store } from '../functions/store';
import { SFElement } from '../html/SFElement';

class ToastBarElement extends SFElement {
  setup(self: ToastBarElement): void | (() => void) {
    const bag = Bag();


    const toasts = new Set();
    
    bag(stro.subscribe(({ toasts }) => {
      this.appendChild(toasts)
    }));

    return () => bag();
  }
}

const uuid = inc('SFToastBar');

type Toast = {
  el: HTMLDivElement;
  offset: number;
};

const stro = store<{
  toasts: Toast[];
}>({
  toasts: [],
});

const ToastBar = () => {
  new MutationObserver(entries => {}).observe(document.documentElement, {
    subtree: true,
    attributes: true,
  });
};

export const Toast = {
  error(message: string, more?: string) {
    stro.set(s => ({
      ...s,
      toasts: [
        {
          el: document.createElement('div'),
          offset: 0,
        },
        ...s.toasts,
      ],
    }));
  },
};
