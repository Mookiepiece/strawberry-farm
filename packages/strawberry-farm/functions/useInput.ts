import { on } from './on';

const useInput = <T>(
  model: Ref<any>,
  el: HTMLInputElement | HTMLTextAreaElement,
  parser: (v: string) => boolean,
  formatter: () => string,
) => {
  on(el).input(() => {
    parser(el.value);
  });

  on(el).change(() => {
    el.value = formatter();
  });
};
