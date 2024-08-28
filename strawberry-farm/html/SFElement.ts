import { Bag, Emitter, Mitt, SFEventMap } from '../shared';

interface SFEmit {
  <T extends keyof SFEventMap>(
    ...args: SFEventMap[T] extends undefined
      ? [name: T, detail?: SFEventMap[T]]
      : [name: T, detail: SFEventMap[T]]
  ): void;

  <T extends string>(
    name: T extends keyof SFEventMap ? never : T,
    detail: any,
  ): void;

  (event: Event): void;
}

type AdvancedQuerySelector = <T extends Element = HTMLElement | SVGElement>(
  query: string,
) => T | null;
type AdvancedQuerySelectorAll = <T extends Element = HTMLElement | SVGElement>(
  query: string,
) => T[];
type AdvancedSetup = (ctx: {
  self: SFElement;
  $: AdvancedQuerySelector;
  $$: AdvancedQuerySelectorAll;
  emit: SFEmit & { bubbles: SFEmit };
  observe: AdvancedAttributeChangedCallback;
}) => (() => void) | void;

type AdvancedAttributeChangedCallback = (
  name: string,
  listener: (newValue: string | null, oldValue: string | null) => void,
) => () => void;

export class SFElement extends HTMLElement {
  static props: Record<string, any> = {};
  emit: SFEmit & { bubbles: SFEmit };
  $: AdvancedQuerySelector;
  $$: AdvancedQuerySelectorAll;
  setup: AdvancedSetup;
  /**
   * NOTE: 在组件每次脱离 DOM 后会全部取消监听，这个设计非常主观
   *
   * 之后为了和 on 统一可能支持 getter Proxy
   */
  observe: AdvancedAttributeChangedCallback;
  _attr: Emitter<{
    [k in string]: [string | null, string | null];
  }>;

  bag: ReturnType<typeof Bag>;

  constructor() {
    super();
    const self = this;

    const emitAdvanced: (bubbles?: boolean) => SFEmit =
      (bubbles = false) =>
      (a: any, b?: any) => {
        if (a instanceof Event) {
          return self.dispatchEvent(a);
        }

        self.dispatchEvent(
          new CustomEvent(a as string, { detail: b, bubbles }),
        );
      };
    this.emit = Object.assign(emitAdvanced(), {
      bubbles: emitAdvanced(true),
    });

    this.$ = q => self.querySelector(q);
    this.$$ = <T extends Element = Element>(q: string) => [
      ...self.querySelectorAll<T>(q),
    ];
    this.setup = () => {};
    this.bag = Bag();
    this._attr = Mitt();
    this.observe = (
      name: string,
      listener: (newValue: string | null, oldValue: string | null) => void,
    ) => {
      const off = this._attr.on(name, ([newValue, oldValue]) =>
        listener(newValue, oldValue),
      );
      this.bag(off);
      return off;
    };
  }

  connectedCallback() {
    const bag = Bag();

    const cleanup = this.setup({
      self: this,
      $: this.$,
      $$: this.$$,
      emit: this.emit,
      observe: this.observe,
    });
    cleanup && bag(cleanup);
  }

  disconnectedCallback() {
    this.bag();
  }

  static observedAttributes?: string[];
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    this._attr.emit(name, [newValue, oldValue]);
  }
}
