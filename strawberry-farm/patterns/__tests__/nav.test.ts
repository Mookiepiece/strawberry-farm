import { ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { useNav } from '../nav';

describe('nav', () => {
	it('init', () => {
		expect(useNav(undefined, ref([1, 2, 3])).current.value).toBe(0);
		expect(useNav(2, ref([1, 2, 3])).current.value).toBe(2);
		expect(useNav(2, ref([])).current.value).toBe(-1);
		expect(useNav(2, ref([-2, -2, -2])).current.value).toBe(-1);
	});
	it('nav', () => {
		const options = ref([1, 2, 3]);
		const { current, nav } = useNav(1, options);
		nav(-1);
		expect(current.value).toBe(0);
		nav(-1);
		expect(current.value).toBe(0);
		nav(-1, true);
		expect(current.value).toBe(2);
		nav(-Infinity, true);
		expect(current.value).toBe(0);
	});
});
