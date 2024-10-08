import type { DefineComponent } from 'vue';
import { IFeatherElement } from './html/IFeatherElement';

// TSD copy from https://shoelace.style/ for test use.

type ToastBarProps = {
  /** The path to the image to load. */
  src?: SlAnimatedImage['src'];
  /** A description of the image used by assistive devices. */
  alt?: SlAnimatedImage['alt'];
  /** Plays the animation. When this attribute is remove, the animation will pause. */
  play?: SlAnimatedImage['play'];
  /**  */
  animatedImage?: SlAnimatedImage['animatedImage'];
  /**  */
  frozenFrame?: SlAnimatedImage['frozenFrame'];
  /**  */
  isLoaded?: SlAnimatedImage['isLoaded'];
  /** Emitted when the image loads successfully. */
  onSlLoad?: (e: CustomEvent<never>) => void;
  /** Emitted when the image fails to load. */
  onSlError?: (e: CustomEvent<never>) => void;
};

type IFeatherProps = {
  /** The icon name. */
  i: keyof typeof IFeatherElement.names;
};

export type CustomElements = {
  /**
   * A component for displaying animated GIFs and WEBPs that play and pause on interaction.
   * ---
   *
   *
   * ### **Events:**
   *  - **sl-load** - Emitted when the image loads successfully.
   * - **sl-error** - Emitted when the image fails to load.
   *
   * ### **Slots:**
   *  - **play-icon** - Optional play icon to use instead of the default. Works best with `<sl-icon>`.
   * - **pause-icon** - Optional pause icon to use instead of the default. Works best with `<sl-icon>`.
   *
   * ### **CSS Properties:**
   *  - **--control-box-size** - The size of the icon box. _(default: undefined)_
   * - **--icon-size** - The size of the play/pause icons. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **control-box** - The container that surrounds the pause/play icons and provides their background.
   */
  'toast-bar': DefineComponent<ToastBarProps>;
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
