import { computed, reactive, ref, watchEffect } from 'vue';
import { applyTransform, fx, levitate, on, trap } from '../shared';
import { bagEffect } from '../shared/bagEffect';

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

  const trigger = computed(() => props.trigger || 'click');

  watchEffect(onCleanup => {
    const [$open, $ref, $pop] = [open.value, props.anchor, props.popper];
    if ($open && $pop && $ref) {
      const { dir, align, viewport, plugins = [applyTransform] } = props;

      onCleanup(
        levitate.auto($ref, () => {
          levitate($ref, $pop, {
            dir,
            align,
            viewport,
            plugins,
          });
        }),
      );
    }
  });

  watchEffect(onCleanup => {
    if (!props?.trap) return;
    const [$open, $ref, $pop] = [open.value, props.anchor, props.popper];
    if (!$open || !$pop) return;
    onCleanup(
      trap($pop, thief => {
        if ($ref instanceof Element && $ref.contains(thief)) return false;
        if (typeof props.trap === 'function') return props.trap(thief);
      }),
    );
  });

  watchEffect(onCleanup => {
    if (!open.value) return;

    const [$anc, $pop] = [props.anchor, props.popper];
    if (!$anc || !$pop) return;

    const _anc = $anc instanceof Element ? [$anc] : [];
    onCleanup(
      on(document).pointerdown.capture(({ target }) => {
        if (target instanceof Node)
          if ([$pop, ..._anc].every(el => el.contains(target) === false))
            open.value = false;
      }),
    );
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
          case 'Enter':
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
      bag(on($anc).pointerenter.exact(play));
      bag(on($anc).pointerout.exact(pause));
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
        bag(on($pop).pointerenter.exact(play));
        bag(on($pop).pointerout.exact(pause));
      }
    }
  });

  return reactive({
    open,
    play,
    pause,
  });
};
