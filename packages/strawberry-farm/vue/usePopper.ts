import { Ref, ref, watch, watchEffect } from 'vue';
import { PopPlugin, fx, levitate, trap } from '../functions';
import { onClickAway } from '../html/onClickAway';

// const reference = ref<HTMLElement>();
// const popper = ref<HTMLElement>();

export const usePopper = ({
  anchor,
  popper,
  configs,
  plugins = [],
}: {
  anchor: Ref<HTMLElement | undefined>;
  popper: Ref<HTMLElement | undefined>;
  configs?: Parameters<typeof levitate>[2];
  plugins?: PopPlugin[];
}) => {
  const open = ref(false);
  const visible = ref(false);

  watch(
    () => [popper.value, open.value] as const,
    ([$pop, open], _, onCleanup) => {
      if (open && $pop) {
        const $ref = anchor.value!;
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
    if (!open.value || !visible.value || !popper.value) return;
    onCleanup(trap(popper.value));
  });

  watchEffect(onCleanup => {
    if (!popper.value || !anchor.value) return;

    const a = popper.value;
    const b = anchor.value;
    onCleanup(onClickAway([a, b], () => (open.value = false)));
  });

  watchEffect(() => {
    if (!visible.value || !popper.value) return;

    const body = popper.value.querySelector('.PopperBody') as
      | HTMLElement
      | undefined;

    if (!body) return;

    if (open.value) {
      fx.transition(body, {
        to(bag) {
          body.classList.add('appear');
          bag(() => body.classList.remove('appear'));
        },
      });
    } else {
      fx.transition(body, {
        to(bag) {
          body.classList.remove('appear');
          bag(() => body.classList.add('appear'));
        },
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
