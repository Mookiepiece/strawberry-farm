const n=`import { computed, reactive, Ref, ref, toRef, watchEffect } from 'vue';
import { applyTransform, levitate, on, trap } from '../shared';
import { bagEffect } from '../shared/bagEffect';

export type UsePopperProps = {
	trigger?: 'click' | 'hover';
	anchor: { getBoundingClientRect(): DOMRect } | undefined;
	popper: HTMLElement | undefined;
	trap?: boolean;
	animated?: boolean;
	delay?: [number, number] | number;
	dir?: NonNullable<Parameters<typeof levitate>[2]>['dir'];
	align?: NonNullable<Parameters<typeof levitate>[2]>['align'];
	viewport?: NonNullable<Parameters<typeof levitate>[2]>['viewport'];
	plugins?: NonNullable<Parameters<typeof levitate>[2]>['plugins'];
};

const useDelayedOpen = (
	_delay: Ref<[number, number] | number | undefined>,
	_open = ref(false),
) => {
	const delay = computed(() => {
		const $delay = _delay.value;
		if ($delay == null) return [0, 300];
		if (Array.isArray($delay)) return $delay;
		return [$delay, $delay] as [number, number];
	});

	let i: ReturnType<typeof setTimeout>;
	const open = computed({
		get: () => _open.value,
		set: v => {
			clearTimeout(i);
			_open.value = v;
		},
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

	return { open, play, pause };
};

export const usePopper = (props: UsePopperProps) => {
	const { open, play, pause } = useDelayedOpen(toRef(props, 'delay'));

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
						plugins: [...plugins],
					});
				}),
			);
		}
	});

	watchEffect(onCleanup => {
		if (!props?.trap) return;
		const [$open, $anc, $pop] = [open.value, props.anchor, props.popper];
		if (!$open || !$pop) return;
		onCleanup(
			trap($pop, thief => {
				if ($pop.contains(thief)) return false;
				if ($anc instanceof Element && $anc.contains(thief)) return false;
			}),
		);
	});

	watchEffect(onCleanup => {
		if (!open.value) return;

		const [$anc, $pop] = [props.anchor, props.popper];
		if (!$anc || !$pop) return;

		onCleanup(
			on(document).pointerdown.capture(({ target: thief }) => {
				if (!(thief instanceof Element)) return;

				if ($pop.contains(thief)) return;
				if ($anc instanceof Element && $anc.contains(thief)) return;

				open.value = false;
			}),
		);
	});

	bagEffect(bag => {
		const $anc = props.anchor;
		if (!$anc) return;

		if (!($anc instanceof Element)) return;

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
			bag(on($anc).click.exact.prevent(() => (open.value = !open.value)));
		} else if (trigger.value === 'hover') {
			bag(on($anc).pointerenter(play));
			bag(on($anc).pointerout(pause));
		}
	});

	bagEffect(bag => {
		const $pop = props.popper;
		if (!$pop) return;
		bag(on($pop).keydown.exact.Escape.prevent(() => (open.value = false)));

		if (trigger.value === 'hover') {
			if ($pop) {
				bag(on($pop).pointerenter(play));
				bag(on($pop).pointerout(pause));
			}
		}
	});

	return reactive({ open, play, pause });
};
`;export{n as default};
