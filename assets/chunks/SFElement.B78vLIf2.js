const n=`import { Bag, Emitter, Mitt, SFEventMap } from '../shared';\r
\r
interface SFEmit {\r
  <T extends keyof SFEventMap>(\r
    ...args: SFEventMap[T] extends undefined\r
      ? [name: T, detail?: SFEventMap[T]]\r
      : [name: T, detail: SFEventMap[T]]\r
  ): void;\r
\r
  <T extends string>(\r
    name: T extends keyof SFEventMap ? never : T,\r
    detail: any,\r
  ): void;\r
\r
  (event: Event): void;\r
}\r
\r
type AdvancedQuerySelector = <T extends Element = HTMLElement | SVGElement>(\r
  query: string,\r
) => T | null;\r
type AdvancedQuerySelectorAll = <T extends Element = HTMLElement | SVGElement>(\r
  query: string,\r
) => T[];\r
type AdvancedSetup = (ctx: {\r
  self: SFElement;\r
  $: AdvancedQuerySelector;\r
  $$: AdvancedQuerySelectorAll;\r
  emit: SFEmit & { bubbles: SFEmit };\r
  observe: AdvancedAttributeChangedCallback;\r
}) => (() => void) | void;\r
\r
type AdvancedAttributeChangedCallback = (\r
  name: string,\r
  listener: (newValue: string | null, oldValue: string | null) => void,\r
) => () => void;\r
\r
export class SFElement extends HTMLElement {\r
  static props: Record<string, any> = {};\r
  emit: SFEmit & { bubbles: SFEmit };\r
  $: AdvancedQuerySelector;\r
  $$: AdvancedQuerySelectorAll;\r
  setup: AdvancedSetup;\r
  /**\r
   * NOTE: 在组件每次脱离 DOM 后会全部取消监听，这个设计非常主观\r
   *\r
   * 之后为了和 on 统一可能支持 getter Proxy\r
   */\r
  observe: AdvancedAttributeChangedCallback;\r
  _attr: Emitter<{\r
    [k in string]: [string | null, string | null];\r
  }>;\r
\r
  bag: ReturnType<typeof Bag>;\r
\r
  constructor() {\r
    super();\r
    const self = this;\r
\r
    const emitAdvanced: (bubbles?: boolean) => SFEmit =\r
      (bubbles = false) =>\r
      (a: any, b?: any) => {\r
        if (a instanceof Event) {\r
          return self.dispatchEvent(a);\r
        }\r
\r
        self.dispatchEvent(\r
          new CustomEvent(a as string, { detail: b, bubbles }),\r
        );\r
      };\r
    this.emit = Object.assign(emitAdvanced(), {\r
      bubbles: emitAdvanced(true),\r
    });\r
\r
    this.$ = q => self.querySelector(q);\r
    this.$$ = <T extends Element = Element>(q: string) => [\r
      ...self.querySelectorAll<T>(q),\r
    ];\r
    this.setup = () => {};\r
    this.bag = Bag();\r
    this._attr = Mitt();\r
    this.observe = (\r
      name: string,\r
      listener: (newValue: string | null, oldValue: string | null) => void,\r
    ) => {\r
      const off = this._attr.on(name, ([newValue, oldValue]) =>\r
        listener(newValue, oldValue),\r
      );\r
      this.bag(off);\r
      return off;\r
    };\r
  }\r
\r
  connectedCallback() {\r
    const bag = Bag();\r
\r
    const cleanup = this.setup({\r
      self: this,\r
      $: this.$,\r
      $$: this.$$,\r
      emit: this.emit,\r
      observe: this.observe,\r
    });\r
    cleanup && bag(cleanup);\r
  }\r
\r
  disconnectedCallback() {\r
    this.bag();\r
  }\r
\r
  static observedAttributes?: string[];\r
  attributeChangedCallback(\r
    name: string,\r
    oldValue: string | null,\r
    newValue: string | null,\r
  ) {\r
    this._attr.emit(name, [newValue, oldValue]);\r
  }\r
}\r
`;export{n as default};
