import type { DefineComponent } from 'vue';
import { IFeatherElement } from './html/IFeatherElement';

type IFeatherProps = {
	/** The icon name. */
	i: keyof typeof IFeatherElement.names;
};

export type CustomElements = {
	'toast-bar': DefineComponent;
	'i-feather': DefineComponent<IFeatherProps>;
	'i-edge': DefineComponent;
};

declare module 'vue' {
	interface GlobalComponents extends CustomElements {}
}

declare global {
	namespace JSX {
		interface IntrinsicElements extends CustomElements {}
	}
}
