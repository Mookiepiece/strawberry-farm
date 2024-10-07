import {
  computed,
  InjectionKey,
  provide,
  reactive,
  ref,
  watchEffect,
} from 'vue';
import { applyTransform, fx, levitate, on, trap } from '../shared';
import { onClickAway } from '../html/onClickAway';
import { bagEffect } from './bagEffect';

export type UsePopperProps = {
  trigger?: 'click' | 'hover';
  anchor: { getBoundingClientRect(): DOMRect } | undefined;
  popper: HTMLElement | undefined;
  trap?: ((thief?: any) => boolean | void) | boolean;
  animated?: boolean;
  delay?: [number, number] | number;
  dir?: NonNullable<Parameters<typeof levitate>[2]>['dir'];
  align?: NonNullable<Parameters<typeof levitate>[2]>['align'];
  viewport?: NonNullable<Parameters<typeof levitate>[2]>['viewport'];
  plugins?: NonNullable<Parameters<typeof levitate>[2]>['plugins'];
};

export const usePopper = (props: UsePopperProps) => {
  let i: ReturnType<typeof setTimeout>;
  const _open = ref(false);
  const open = computed({
    get: () => _open.value,
    set: v => {
      clearTimeout(i);
      _open.value = v;
    },
  });
  const visible = ref(false);

  const trigger = computed(() => props.trigger || 'click');

  watchEffect(onCleanup => {
    const [$open, $ref, $pop] = [open.value, props.anchor, props.popper];
    if ($open && $pop && $ref) {
      const { dir, align, viewport, plugins = [applyTransform] } = props;

      onCleanup(
        levitate.auto($ref, () => {
          levitate($ref, $pop, { dir, align, viewport, plugins });
          visible.value = true;
        }),
      );
    }
  });

  watchEffect(onCleanup => {
    if (!props?.trap) return;
    const [$open, $ref, $pop] = [open.value, props.anchor, props.popper];
    // visible: make sure the popper receives focus after [data-pop-box] inited
    // open: make sure the reference immediately receive focus when existing
    if (!$open || !visible.value || !$pop) return;
    onCleanup(
      trap(
        $pop,
        typeof props.trap === 'function' ? props.trap : thief => thief !== $ref,
      ),
    );
  });

  watchEffect(onCleanup => {
    if (!open.value) return;

    const [$anc, $pop] = [props.anchor, props.popper];
    if (!$anc || !$pop) return;

    const _anc =
      $anc instanceof HTMLElement || $anc instanceof SVGElement ? [$anc] : [];

    onCleanup(onClickAway([$pop, ..._anc], () => (open.value = false)));
  });

  watchEffect(() => {
    if (!visible.value || !props.popper) return;

    if (!props?.animated) {
      if (!open.value) {
        visible.value = false;
      }
      return;
    }

    const $pop = props.popper;

    if (!$pop) return;

    if (open.value) {
      fx.cssTransition($pop, 'v-enter');
    } else {
      fx.cssTransition($pop, 'v-leave', {
        done() {
          visible.value = false;
        },
      });
    }
  });

  const delay = computed(() => {
    if (props.delay == null) return [0, 300];
    if (Array.isArray(props.delay)) return props.delay;
    return [props.delay, props.delay] as [number, number];
  });

  const play = () => {
    clearTimeout(i);
    i = setTimeout(() => {
      open.value = true;
    }, delay.value[0]);
  };

  const pause = () => {
    clearTimeout(i);
    i = setTimeout(() => {
      open.value = false;
    }, delay.value[1]);
  };

  bagEffect(bag => {
    const $anc = props.anchor;
    if (!$anc) return;

    if (!($anc instanceof HTMLElement || $anc instanceof SVGElement)) return;

    bag(
      on($anc).keydown.exact(e => {
        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowRight':
          case 'ArrowDown':
          case 'ArrowLeft':
          case ' ':
            e.preventDefault();
            open.value = !open.value;
            break;
          case 'Escape':
            e.preventDefault();
            open.value = false;
            break;
        }
      }),
    );

    if (trigger.value === 'click') {
      bag(
        on($anc).click.exact.prevent(() => {
          open.value = !open.value;
        }),
      );
    } else if (trigger.value === 'hover') {
      bag(on($anc).pointerenter.exact.prevent(play));
      bag(on($anc).pointerout.exact.prevent(pause));
    }
  });

  bagEffect(bag => {
    const $pop = props.popper;
    if (!$pop) return;
    bag(
      on($pop).keydown.exact(e => {
        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            open.value = false;
            break;
        }
      }),
    );

    if (trigger.value === 'hover') {
      if ($pop) {
        bag(on($pop).pointerenter.exact.prevent(play));
        bag(on($pop).pointerout.exact.prevent(pause));
      }
    }
  });

  return reactive({
    open,
    visible,
    play,
    pause,
  });
};

const POP_CHAIN_IK: InjectionKey<{
  chain: Set<Element>;
}> = Symbol();

const _trap = trap;
export const usePopperTrapChain = () => {
  const chain = new Set<Element>();

  const trap: typeof _trap = (el, details) =>
    _trap(el, theif => {
      if ([...chain].some(node => node !== el && node.contains(theif)))
        return false;
      return details?.(theif);
    });

  const onClickAway = (cb: () => void) => {
    return on(document).pointerdown.capture(e => {
      if ([...chain].every(node => node?.contains(e.target as Node) === false))
        cb();
    });
  };

  provide(POP_CHAIN_IK, { chain });

  return {
    chain,
    trap,
    onClickAway,
  };
};
