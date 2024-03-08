import { SFEventMap } from '../functions';

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

type AdvancedQuerySelector = <T extends Element = HTMLElement>(
  query: string,
) => T | null;
type AdvancedQuerySelectorAll = <T extends Element = HTMLElement>(
  query: string,
) => T[];
type AdvancedSetup = (ctx: {
  self: SFElement;
  $: AdvancedQuerySelector;
  $$: AdvancedQuerySelectorAll;
  emit: SFEmit & { bubbles: SFEmit };
  updated: AdvancedAttributeChangedCallback;
}) => (() => void) | void;
type AdvancedAttributeChangedCallback = (
  name: string,
  oldValue: string | null,
  newValue: string | null,
) => void;

export class SFElement extends HTMLElement {
  emit: SFEmit & { bubbles: SFEmit };
  $: AdvancedQuerySelector;
  $$: AdvancedQuerySelectorAll;
  setup: AdvancedSetup;
  updated: AdvancedAttributeChangedCallback;

  _cleanup?: () => void;
  // _onUpdated?: () => void;

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
    this.updated = () => {};
  }

  connectedCallback() {
    const cleanup = this.setup({
      self: this,
      $: this.$,
      $$: this.$$,
      emit: this.emit,
      updated: this.updated,
    });
    cleanup && (this._cleanup = cleanup);
  }

  disconnectedCallback() {
    this._cleanup?.();
  }

  static observedAttributes?: string[];
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    // TODO: MITT or on pattern ???
    //  onUpdated.i(()=>{})
    this.updated(name, oldValue, newValue);
  }
}
