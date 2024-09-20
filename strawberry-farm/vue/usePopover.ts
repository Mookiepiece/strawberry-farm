import { computed, reactive, ref, watchEffect } from 'vue';
import { applyTransform, fx, levitate, on, trap } from '../shared';
import { onClickAway } from '../html/onClickAway';
import { bagEffect } from './bagEffect';

export type UsePopperProps = {
  trigger?: 'focus' | 'hover' | 'click';
  reference: HTMLElement | SVGElement | undefined;
  popper: HTMLElement | SVGElement | undefined;
  trap?: boolean;
  animated?: boolean;
  delay?: [number, number] | number;
  dir?: NonNullable<Parameters<typeof levitate>[2]>['dir'];
  align?: NonNullable<Parameters<typeof levitate>[2]>['align'];
  viewport?: NonNullable<Parameters<typeof levitate>[2]>['viewport'];
  plugins?: NonNullable<Parameters<typeof levitate>[2]>['plugins'];
};

export const usePopper = (props: UsePopperProps) => {
  const open = ref(false);
  const visible = ref(false);

  watchEffect(onCleanup => {
    const [$open, $ref, $pop] = [open.value, props.reference, props.popper];
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
    // visible: make sure the popper receives focus after [data-pop-box] inited
    // open: make sure the reference immediately receive focus when existing
    if (!open.value || !visible.value || !props.popper) return;
    onCleanup(trap(props.popper));
  });

  watchEffect(onCleanup => {
    if (!open.value) return;

    const [$ref, $pop] = [props.reference, props.popper];
    if (!$ref || !$pop) return;
    onCleanup(onClickAway([$pop, $ref], () => (open.value = false)));
  });

  watchEffect(() => {
    if (!visible.value || !props.popper) return;

    if (!props?.animated) {
      if (!open.value) {
        visible.value = false;
      }
      return;
    }

    const body = props.popper.querySelector('[data-pop-box]') as
      | HTMLElement
      | undefined;

    if (!body) return;

    if (open.value) {
      fx.cssTransition(body, 'v-enter');
    } else {
      fx.cssTransition(body, 'v-leave', {
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

  let i: ReturnType<typeof setTimeout>;
  const show = () => {
    clearTimeout(i);
    i = setTimeout(() => {
      open.value = true;
    }, delay.value[0]);
  };

  const hide = () => {
    clearTimeout(i);
    i = setTimeout(() => {
      open.value = false;
    }, delay.value[1]);
  };

  bagEffect(bag => {
    const $ref = props.reference;
    if (!$ref) return;

    const trigger = props.trigger || 'click';
    if (trigger === 'click') {
      bag(
        on($ref).keydown.exact(e => {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':
          }
        }),
      );

      bag(
        on($ref).click.exact.prevent(() => {
          open.value = !open.value;
        }),
      );
    } else if (trigger === 'hover') {
      bag(
        on($ref).click.exact.prevent(() => {
          clearTimeout(i);
          open.value = !open.value;
        }),
      );

      bag(
        on($ref).pointerenter.exact.prevent(() => {
          show();
        }),
      );
      bag(
        on($ref).pointerout.exact.prevent(() => {
          hide();
        }),
      );
    }
  });
  bagEffect(bag => {
    const $pop = props.popper;
    if (!$pop) return;
    if ($pop) {
      bag(
        on($pop).pointerenter.exact.prevent(() => {
          show();
        }),
      );
      bag(
        on($pop).pointerout.exact.prevent(() => {
          hide();
        }),
      );
    }
  });

  return reactive({
    open,
    visible,
  });
};
