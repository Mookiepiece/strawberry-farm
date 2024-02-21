import { inc } from '../functions';
import { store } from '../functions/store';

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
};

export const Toast =  {
  error(message:string, more?: string) {
    stro.set(s=>({...s, toasts: [...s.toasts, ]}))
  }
};