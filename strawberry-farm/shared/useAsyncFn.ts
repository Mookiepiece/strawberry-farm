import { reactive } from 'vue';

/**
 * @license MIT FunctionReturningPromise https://github.com/streamich/react-use
 */
export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

/**
 * @license MIT AsyncState https://github.com/streamich/react-use
 */
export type AsyncState<T> = {
	loading: boolean;
	error?: any;
	data?: T;
};

/**
 * @license MIT https://github.com/streamich/react-use/blob/ade8d3905f544305515d010737b4ae604cc51024/src/useAsyncFn.ts#L36 useAsyncFn
 */
export const useAsyncFn = <T extends FunctionReturningPromise>(fn: T) => {
	const state = reactive<AsyncState<Awaited<ReturnType<T>>>>({
		loading: false,
	});

	let key = 0;
	const abort = () => void ++key;

	const trigger = ((...args: Parameters<T>) => {
		const _key = ++key;
		delete state.error;
		state.loading = true;
		return fn(...args)
			.then(v => {
				if (_key !== key) throw new DOMException('', 'AbortError');
				return (state.data = v);
			})
			.catch(e => {
				if (_key !== key) throw new DOMException('', 'AbortError');
				state.error = e;
				throw e;
			})
			.finally(() => {
				if (_key !== key) return;
				state.loading = false;
			});
	}) as T;

	return { state, trigger, abort };
};
