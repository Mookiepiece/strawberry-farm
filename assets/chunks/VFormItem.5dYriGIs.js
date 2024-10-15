const r=`<script setup lang="ts">\r
import {\r
  cloneVNode,\r
  computed,\r
  h,\r
  inject,\r
  provide,\r
  reactive,\r
  watchEffect,\r
} from 'vue';\r
import { Form, FormModel, V_FORM_IN, V_FORM_ITEM_LABEL_IN } from './Form';\r
import { RuleSlim, validate } from '../shared/validator';\r
import { Bag } from '../shared';\r
import { unref } from 'vue';\r
import VFormLabel from './VFormLabel.vue';\r
import VInput from './VInput.vue';\r
\r
const props = withDefaults(\r
  defineProps<{\r
    name?: string;\r
    label?: string;\r
    rules?: RuleSlim[];\r
    visible?: boolean;\r
  }>(),\r
  {\r
    visible: undefined,\r
  },\r
);\r
\r
const slots = defineSlots<{\r
  default?(): any;\r
  title: any;\r
  extra: any;\r
  alert(props: { message: string }): any;\r
}>();\r
\r
const form: FormModel<any> = inject(V_FORM_IN)!;\r
const id = Form.inc();\r
const descriptor = computed(() =>\r
  props.name ? form._h(props.name) : undefined,\r
);\r
\r
const label = computed(() => unref(descriptor.value?.label) ?? props.label);\r
\r
const rules = computed(() => [\r
  ...(unref(descriptor.value?.rules) ?? []),\r
  ...(props.rules ?? []),\r
]);\r
\r
const asterisk = computed(\r
  () =>\r
    !!rules.value?.some(r => {\r
      if (typeof r === 'string') return r.endsWith('!');\r
      else if (Array.isArray(r)) return r[0].endsWith('!');\r
      else return r.required;\r
    }),\r
);\r
\r
const visible = computed(() =>\r
  typeof props.visible === 'boolean'\r
    ? props.visible\r
    : descriptor.value?.visible?.value !== false,\r
);\r
\r
provide(V_FORM_ITEM_LABEL_IN, reactive({ id, label, asterisk }));\r
\r
const model = computed({\r
  get() {\r
    if (!props.name) return;\r
    return Form.getter(form.value, props.name);\r
  },\r
  set(value: any) {\r
    if (!props.name) return;\r
    Form.setter(form.value, props.name, value);\r
    validateLocked().then(v => (state.message = v));\r
  },\r
});\r
\r
const _validate = async () => {\r
  const value = model.value;\r
  const $rules = rules.value;\r
  const $label = label.value;\r
  if ($rules.length) {\r
    let ans: void | string;\r
    for (const rule of $rules) {\r
      ans = await validate(value, rule, $label);\r
      if (typeof ans === 'string') {\r
        return ans;\r
      }\r
    }\r
  }\r
};\r
\r
const bag = Bag();\r
const validateLocked = async () => {\r
  bag();\r
  const signal = bag(new AbortController()).signal;\r
  const ans = await _validate();\r
  if (signal.aborted) return new Promise<never>(() => Infinity);\r
  return ans;\r
};\r
\r
const focus = () => document.getElementById(id)?.focus?.();\r
\r
const state = reactive({\r
  focus,\r
  validate: () => {\r
    bag();\r
    return _validate();\r
  },\r
  _visible: visible,\r
  message: undefined as string | undefined,\r
});\r
\r
watchEffect(onCleanup => {\r
  const name = props.name;\r
  if (!name || !descriptor.value) return;\r
  form.items[name] = state;\r
  onCleanup(() => delete form.items[name]);\r
});\r
\r
const message = computed(() => state.message);\r
\r
const render = () =>\r
  cloneVNode(\r
    slots.default?.()[0] ?? descriptor.value?.render?.() ?? h(VInput),\r
    {\r
      id,\r
      modelValue: model.value,\r
      'onUpdate:modelValue': (v: any) => {\r
        model.value = v;\r
      },\r
    },\r
  );\r
<\/script>\r
\r
<template>\r
  <div\r
    class="VFormItem"\r
    :class="{ invalid: typeof message === 'string' }"\r
    v-if="name && visible"\r
  >\r
    <div class="VFormItemTitle">\r
      <slot name="title">\r
        <VFormLabel />\r
      </slot>\r
    </div>\r
\r
    <component :is="render" />\r
\r
    <div v-if="$slots.extra" class="f3">\r
      <slot name="extra" />\r
    </div>\r
\r
    <div v-if="$slots.alert">\r
      <slot v-if="message" name="alert" :message="message" />\r
    </div>\r
    <div v-else-if="message" class="[B] f2 tone:reimu Alert">\r
      <i-feather i="x-octagon" />\r
      <div class="px-1">{{ message }}</div>\r
    </div>\r
  </div>\r
</template>\r
`;export{r as default};
