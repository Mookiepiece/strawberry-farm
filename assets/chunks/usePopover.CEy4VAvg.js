const r=`import { computed, reactive, ref, watchEffect } from 'vue';\r
import { applyTransform, fx, levitate, on, trap } from '../shared';\r
import { onClickAway } from '../html/onClickAway';\r
import { bagEffect } from './bagEffect';\r
\r
export type UsePopperProps = {\r
  trigger?: 'click' | 'hover';\r
  anchor: HTMLElement | SVGElement | undefined;\r
  popper: HTMLElement | undefined;\r
  trap?: ((thief?: any) => boolean | void) | boolean;\r
  animated?: boolean;\r
  delay?: [number, number] | number;\r
  dir?: NonNullable<Parameters<typeof levitate>[2]>['dir'];\r
  align?: NonNullable<Parameters<typeof levitate>[2]>['align'];\r
  viewport?: NonNullable<Parameters<typeof levitate>[2]>['viewport'];\r
  plugins?: NonNullable<Parameters<typeof levitate>[2]>['plugins'];\r
};\r
\r
export const usePopper = (props: UsePopperProps) => {\r
  let i: ReturnType<typeof setTimeout>;\r
  const _open = ref(false);\r
  const open = computed({\r
    get: () => _open.value,\r
    set: v => {\r
      clearTimeout(i);\r
      _open.value = v;\r
    },\r
  });\r
  const visible = ref(false);\r
\r
  const trigger = computed(() => props.trigger || 'click');\r
\r
  watchEffect(onCleanup => {\r
    const [$open, $ref, $pop] = [open.value, props.anchor, props.popper];\r
    if ($open && $pop && $ref) {\r
      const { dir, align, viewport, plugins = [applyTransform] } = props;\r
\r
      onCleanup(\r
        levitate.auto($ref, () => {\r
          levitate($ref, $pop, { dir, align, viewport, plugins });\r
          visible.value = true;\r
        }),\r
      );\r
    }\r
  });\r
\r
  watchEffect(onCleanup => {\r
    if (!props?.trap) return;\r
    const [$open, $ref, $pop] = [open.value, props.anchor, props.popper];\r
    // visible: make sure the popper receives focus after [data-pop-box] inited\r
    // open: make sure the reference immediately receive focus when existing\r
    if (!$open || !visible.value || !$pop) return;\r
    onCleanup(\r
      trap(\r
        $pop,\r
        typeof props.trap === 'function' ? props.trap : thief => thief !== $ref,\r
      ),\r
    );\r
  });\r
\r
  watchEffect(onCleanup => {\r
    if (!open.value) return;\r
\r
    const [$ref, $pop] = [props.anchor, props.popper];\r
    if (!$ref || !$pop) return;\r
    onCleanup(onClickAway([$pop, $ref], () => (open.value = false)));\r
  });\r
\r
  watchEffect(() => {\r
    if (!visible.value || !props.popper) return;\r
\r
    if (!props?.animated) {\r
      if (!open.value) {\r
        visible.value = false;\r
      }\r
      return;\r
    }\r
\r
    const $pop = props.popper;\r
\r
    if (!$pop) return;\r
\r
    if (open.value) {\r
      fx.cssTransition($pop, 'v-enter');\r
    } else {\r
      fx.cssTransition($pop, 'v-leave', {\r
        done() {\r
          visible.value = false;\r
        },\r
      });\r
    }\r
  });\r
\r
  const delay = computed(() => {\r
    if (props.delay == null) return [0, 300];\r
    if (Array.isArray(props.delay)) return props.delay;\r
    return [props.delay, props.delay] as [number, number];\r
  });\r
\r
  const play = () => {\r
    clearTimeout(i);\r
    i = setTimeout(() => {\r
      open.value = true;\r
    }, delay.value[0]);\r
  };\r
\r
  const pause = () => {\r
    clearTimeout(i);\r
    i = setTimeout(() => {\r
      open.value = false;\r
    }, delay.value[1]);\r
  };\r
\r
  bagEffect(bag => {\r
    const $anc = props.anchor;\r
    if (!$anc) return;\r
\r
    bag(\r
      on($anc).keydown.exact(e => {\r
        switch (e.key) {\r
          case 'ArrowUp':\r
          case 'ArrowRight':\r
          case 'ArrowDown':\r
          case 'ArrowLeft':\r
          case ' ':\r
            e.preventDefault();\r
            open.value = !open.value;\r
            break;\r
          case 'Escape':\r
            e.preventDefault();\r
            open.value = false;\r
            break;\r
        }\r
      }),\r
    );\r
\r
    if (trigger.value === 'click') {\r
      bag(\r
        on($anc).click.exact.prevent(() => {\r
          open.value = !open.value;\r
        }),\r
      );\r
    } else if (trigger.value === 'hover') {\r
      bag(on($anc).pointerenter.exact.prevent(play));\r
      bag(on($anc).pointerout.exact.prevent(pause));\r
    }\r
  });\r
\r
  bagEffect(bag => {\r
    const $pop = props.popper;\r
    if (!$pop) return;\r
    bag(\r
      on($pop).keydown.exact(e => {\r
        switch (e.key) {\r
          case 'Escape':\r
            e.preventDefault();\r
            open.value = false;\r
            break;\r
        }\r
      }),\r
    );\r
\r
    if (trigger.value === 'hover') {\r
      if ($pop) {\r
        bag(on($pop).pointerenter.exact.prevent(play));\r
        bag(on($pop).pointerout.exact.prevent(pause));\r
      }\r
    }\r
  });\r
\r
  return reactive({\r
    open,\r
    visible,\r
    play,\r
    pause,\r
  });\r
};\r
`;export{r as default};
