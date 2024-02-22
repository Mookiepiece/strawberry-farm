import { Bag, inc, nextFrame } from '../functions';
import { store } from '../functions/store';
import { SFElement } from '../html/SFElement';

export class ToastBarElement extends SFElement {
  constructor() {
    super();
    this.setup = () => {
      const onCleanup = Bag();

      const sort = (startIndex = 0) => {
        const toasts = stro.get().toasts;
        const firstEl = toasts[startIndex];

        let offsetCounter = firstEl.offset;

        for (const i of toasts.slice(startIndex + 1)) {
          offsetCounter += i.el.offsetHeight + 10;
          i.offset = offsetCounter;
          i.el.style.setProperty('--toast-offset', i.offset + 'px');
        }
      };

      const mo = new MutationObserver(entries => {
        for (const e of entries) {
          if (e.target instanceof HTMLElement) {
          }
        }
      });
      mo.observe(this, {
        subtree: true,
        attributes: true,
      });
      onCleanup(mo.disconnect);

      onCleanup(
        stro.subscribe(({ toasts }) => {
          toasts
            .filter(({ el }) => !this.contains(el))
            .forEach(({ el }) => {
              this.insertBefore(el, this.firstElementChild);
              el.animate(
                [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
                { duration: 500 },
              );
            });

          sort();
        }),
      );

      return () => onCleanup();
    };
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
    const div = document.createElement('div');
    div.innerText = message;

    stro.set(s => ({
      ...s,
      toasts: [
        {
          el: div,
          offset: 0,
        },
        ...s.toasts,
      ],
    }));
  },
};
