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

export class SFElement extends HTMLElement {
  emit: SFEmit & { bubbles: SFEmit };
  $: <T extends Element = Element>(query: string) => T | null;
  $$: <T extends Element = Element>(query: string) => T[];

  _cleanup?: () => void;

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
  }

  setup(self: SFElement): (() => void) | void {}

  connectedCallback() {
    const cleanup = this.setup(this);
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
  ) {}
}
