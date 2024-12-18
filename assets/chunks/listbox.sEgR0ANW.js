const n=`import { computed, MaybeRef, reactive, Ref, ref } from 'vue';
import { wai } from '../shared';

export type ListboxOption<T = any> = {
	value: any;
	label?: string;
	disabled?: boolean;
	meta?: T;
};

export type ListboxOptionSlim<T = any> =
	| ListboxOption<T>
	| string
	| number
	| bigint
	| boolean
	| null
	| undefined
	| symbol
	| object;

export type ListboxGroup<T = any> = {
	title?: string;
	options: ListboxOptionSlim<T>[];
	meta?: T;
};

export type ListboxInput<T = any> = (ListboxGroup<T> | ListboxOptionSlim<T>)[];

/**
 * Normalize grouped listbox input into options matches sharp \`{ value:any; label: string }\`
 */
export const flatOptions = <T = any>(i: ListboxInput<T>): ListboxOption<T>[] =>
	i
		.flatMap(o => (typeof o === 'object' && o && 'title' in o ? o.options : o))
		.map(o => {
			if (typeof o === 'object' && o) {
				if (!('label' in o)) {
					return {
						...(o as { value: any }),
						label: String((o as { value: any }).value),
					};
				}
				return o;
			}
			return { value: o, label: String(o) };
		});


/**
 * Navigator for listbox.
 *
 * @param __current Initial value. default to 0.
 * @param options The linear dungeon, 0 repesents disabled, otherwise represents the index of the option.
 */
export const useNav = (
	__current: MaybeRef<number> = 0,
	options: Ref<number[]>,
) => {
	const _current = ref(__current);
	const current = computed({
		get() {
			const i = _current.value;
			if (i < 0 || i >= options.value.length || options.value[i] < 0)
				return options.value.findIndex(i => i >= 0);
			return _current.value;
		},
		set: v => (_current.value = v),
	});

	const nav = (delta: number, circular = false) => {
		const $options = options.value;
		const index = (() => {
			switch (delta) {
				case -Infinity:
					return $options.findIndex(o => o >= 0);
				case Infinity:
					return $options.findLastIndex(o => o >= 0);
				case -1:
				case 1: {
					const before =
						!circular && delta === 1 ? [] : $options.slice(0, current.value);
					const after =
						!circular && delta === -1 ? [] : $options.slice(current.value + 1);

					const _index = [...after, ...before][
						delta < 0 ? 'findLastIndex' : 'findIndex'
					](o => o >= 0);

					if (_index < 0) return -1;

					return _index < after.length
						? current.value + 1 + _index
						: _index - after.length;
				}
				default:
					return -1;
			}
		})();
		if (index < 0) return;
		return (current.value = index);
	};

	return {
		current,
		nav,
	};
};

export type ListboxLeaf<T = any> = ListboxOption<T> & {
	index: number;
};

export type UseListboxProps<T = any> = {
	disabled?: boolean;
	options?: ListboxInput<T>;
	/**
	 * Toggle the same option will unselect it in signle selection mode.
	 */
	clearable?: boolean;
};
export type Listbox<T = any> = {
	model: any;

	/**
	 * The \`id\` for creating \`aria-activedescendant\` to indicate current focused option.
	 */
	id: string;

	/**
	 * model \`Array.isArray()\`
	 */
	multi: boolean;
	/**
	 * Contains the original (grouped) hierarchy and extra info to rendering the UI.
	 */
	tree: ({ title?: string; options: ListboxLeaf<T>[] } | ListboxLeaf<T>)[];
	/**
	 * List of options after flatten and normalized, which are objects with \`value\` property.
	 */
	options: ListboxOption<T>[];
	/**
	 * Current focuing option index (after options are flatted)
	 */
	current: number;
	/**
	 * Move focus based on the delta number, skipping \`disabled\` options.
	 *
	 * If \`circular\`, \`nav()\` will across two edges if receives \`1\` | \`-1\` like radios.
	 *
	 * @example
	 * \`\`\`js
	 * -Infinity // Home
	 * -1 // previuse
	 * 1  // next
	 * Infinity // End
	 * \`\`\`
	 */
	nav(delta: number, circular?: boolean): void;
	/**
	 * Toggle selection for value(s).
	 *
	 * Will validate \`disabled\` state.
	 *
	 * Passing \`listbox\` will toggle current value.
	 */
	input(...values: any[]): void;
	disabled: boolean;
};

export const useListbox = <T = any>(
	model: Ref<any>,
	props: UseListboxProps<T>,
): Listbox<T> => {
	const id = wai();
	const options = computed(() => flatOptions(props.options ?? []));
	const multi = computed(() => Array.isArray(model.value));
	const disabled = computed(() => !!props.disabled);

	const tree = computed<Listbox<T>['tree']>(() => {
		let _index = 0;

		const normalize = (o: ListboxOptionSlim<T>): ListboxLeaf<T> => {
			const value = typeof o === 'object' && o ? (o as any).value : o;
			return {
				value,
				// prettier-ignore
				label: typeof o === 'object' && o ? String((o as any).label ?? (o as any).value) : String(o),
				meta: typeof o === 'object' && o ? (o as any).meta : undefined,
				// prettier-ignore
				disabled: typeof o === 'object' && o  &&  (o as any).disabled || false,
				index: _index++,
			};
		};

		return (props.options ?? []).map(i => {
			if (typeof i === 'object' && i && 'options' in i)
				return {
					...i,
					options: i.options.map(normalize),
				};
			return normalize(i);
		});
	});

	const map = computed(() =>
		options.value.map((i, index) => (i.disabled ? -1 : index)),
	);

	const { current, nav: _nav } = useNav(
		Math.max(
			0,
			options.value.findIndex(
				o =>
					!o.disabled &&
					(Array.isArray(model.value)
						? model.value.includes(o.value)
						: model.value === o.value),
			),
		),
		map,
	);

	const nav = (delta: number, circular?: boolean) => {
		if (disabled.value) return;
		const i = _nav(delta, circular);
		if (i === undefined) return;
		scrollCurrentIntoView();
	};

	const input = (..._values: any[]) => {
		if (disabled.value) return;

		let $model = model.value;

		_values.forEach(_value => {
			let value = _value;
			if (value === listbox) {
				if (current.value < 0) return;
				value = options.value[current.value].value;
			}

			const index = options.value.findIndex(i => i.value === value);
			if (index < 0) return;
			const option = options.value[index];
			if (option?.disabled) return;

			if (Array.isArray($model))
				$model = $model.includes(value)
					? $model.toSpliced($model.indexOf(value), 1)
					: [...$model, value];
			else if (props.clearable && $model === value) $model = null;
			else $model = value;
		});

		model.value = $model;
	};

	const scrollCurrentIntoView = (() => {
		const io = new IntersectionObserver(([entry]) => {
			if ((entry.intersectionRatio || 0) < 1) {
				entry.target.scrollIntoView({ block: 'center', inline: 'center' });
			}
			io.disconnect();
		});
		return () => {
			io.disconnect();
			io.observe(document.getElementById(id + ':' + current.value)!);
		};
	})();

	const listbox: Listbox<T> = reactive({
		model,
		id,
		tree,
		multi,
		options,
		current,
		disabled,
		nav,
		input,
	});

	return listbox;
};
`;export{n as default};
