const n=`import { computed, reactive, Ref, ref, toRef, watchEffect } from 'vue';\r
import { applyTransform, levitate, on, PopPlugin, trap } from '../shared';\r
import { bagEffect } from '../shared/bagEffect';\r
\r
export type UsePopperProps = {\r
  trigger?: 'click' | 'hover';\r
  anchor: { getBoundingClientRect(): DOMRect } | undefined;\r
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
const useDelayedOpen = (\r
  _delay: Ref<[number, number] | number | undefined>,\r
  _open = ref(false),\r
) => {\r
  const delay = computed(() => {\r
    const $delay = _delay.value;\r
    if ($delay == null) return [0, 300];\r
    if (Array.isArray($delay)) return $delay;\r
    return [$delay, $delay] as [number, number];\r
  });\r
\r
  let i: ReturnType<typeof setTimeout>;\r
  const open = computed({\r
    get: () => _open.value,\r
    set: v => {\r
      clearTimeout(i);\r
      _open.value = v;\r
    },\r
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
  return { open, play, pause };\r
};\r
\r
export const usePopper = (props: UsePopperProps) => {\r
  const { open, play, pause } = useDelayedOpen(toRef(props, 'delay'));\r
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
          levitate($ref, $pop, {\r
            dir,\r
            align,\r
            viewport,\r
            plugins: [...plugins, popoverChain],\r
          });\r
        }),\r
      );\r
    }\r
  });\r
\r
  watchEffect(onCleanup => {\r
    if (!props?.trap) return;\r
    const [$open, $anc, $pop] = [open.value, props.anchor, props.popper];\r
    if (!$open || !$pop) return;\r
    onCleanup(\r
      trap($pop, thief => {\r
        let p: any = thief;\r
        do {\r
          if ($pop.contains(p)) return false;\r
          p = Chain.get(p.closest('[data-pop]') || document.body);\r
        } while (p);\r
\r
        if ($anc instanceof Element && $anc.contains(thief)) return false;\r
        if (typeof props.trap === 'function') return props.trap(thief);\r
      }),\r
    );\r
  });\r
\r
  watchEffect(onCleanup => {\r
    if (!open.value) return;\r
\r
    const [$anc, $pop] = [props.anchor, props.popper];\r
    if (!$anc || !$pop) return;\r
\r
    onCleanup(\r
      on(document).pointerdown.capture(({ target: thief }) => {\r
        if (!(thief instanceof Element)) return;\r
\r
        let p: any = thief;\r
        do {\r
          if ($pop.contains(p)) return;\r
          p = Chain.get(p.closest('[data-pop]') || document.body);\r
        } while (p);\r
\r
        if ($anc instanceof Element && $anc.contains(thief)) return;\r
\r
        open.value = false;\r
      }),\r
    );\r
  });\r
\r
  bagEffect(bag => {\r
    const $anc = props.anchor;\r
    if (!$anc) return;\r
\r
    if (!($anc instanceof Element)) return;\r
\r
    bag(\r
      on($anc).keydown.exact(e => {\r
        switch (e.key) {\r
          case 'ArrowUp':\r
          case 'ArrowRight':\r
          case 'ArrowDown':\r
          case 'ArrowLeft':\r
          case 'Enter':\r
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
      bag(on($anc).click.exact.prevent(() => (open.value = !open.value)));\r
    } else if (trigger.value === 'hover') {\r
      bag(on($anc).pointerenter(play));\r
      bag(on($anc).pointerout(pause));\r
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
        bag(on($pop).pointerenter(play));\r
        bag(on($pop).pointerout(pause));\r
      }\r
    }\r
  });\r
\r
  return reactive({ open, play, pause });\r
};\r
\r
const Chain = new WeakMap<Element, Element>();\r
const popoverChain: PopPlugin = config => {\r
  if (config.$anc instanceof Element) Chain.set(config.$pop, config.$anc);\r
  return config;\r
};\r
popoverChain.post = true;\r
`;export{n as default};
