import { Ref, ref, watch, watchEffect } from 'vue';
import { PopPlugin, fx, levitate, trap } from '../functions';
import { onClickAway } from '../html/onClickAway';

export const usePopper = ({
  reference,
  popper,
  configs,
  plugins = [],
}: {
  reference: Ref<HTMLElement | SVGElement | undefined>;
  popper: Ref<HTMLElement | SVGElement | undefined>;
  configs?: Parameters<typeof levitate>[2] & {
    trap?: boolean;
    clickAway?: boolean;
    animated?: boolean;
  };
  plugins?: PopPlugin[];
}) => {
  const open = ref(false);
  const visible = ref(false);

  watch(
    () => [popper.value, open.value] as const,
    ([$pop, open], _, onCleanup) => {
      if (open && $pop) {
        const $ref = reference.value!;
        onCleanup(
          levitate.auto($ref, () => {
            levitate($ref, $pop, configs, ...plugins);
            visible.value = true;
          }),
        );
      }
    },
  );

  watchEffect(onCleanup => {
    if (!configs?.trap) return;
    // visible: make sure the popper receives focus after body inited
    // open: make sure the reference immediately receive focus when existing
    if (!open.value || !visible.value || !popper.value) return;
    onCleanup(trap(popper.value));
  });

  watchEffect(onCleanup => {
    if (!configs?.clickAway) return;
    if (!popper.value || !reference.value) return;
    if (!open.value) return;

    const $ref = reference.value;
    const $pop = popper.value;
    onCleanup(
      onClickAway([$pop, $ref], () => {
        open.value = false;
      }),
    );
  });

  watchEffect(() => {
    if (!visible.value || !popper.value) return;

    if (!configs?.animated) {
      if (!open.value) {
        visible.value = false;
      }
      return;
    }

    const body = popper.value.querySelector('.VPopperBody') as
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

  return {
    open,
    visible,
  };
};
