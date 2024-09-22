# Levitate

Positioning floating(fixed) elements.

Words:

- Anchor: The **Reference** / **Anchor** Element/DOMRect.
- Pop: The **Popper** Element/DOMRect that to be positioned.
- View(viewport): The **Viewport** boundary that will be clipped into Map.
- Dir: four direction `top` | `right` | `bottom` | `left`.
- Map: The **Clipped Viewport** based on direction and margin(if has) and anchor's `getBoundingClientRect()`. which is almost the maximum size of the popper. This concept is used by the built-in `autoPlacement` and `flip` plugins to assess the map's area and decide whether to flip to the largest available space.
- Align: This is the last step that place and align the popper into the Map. output with `x` and `y`. Will uses the popper's `width = el.offsetWidth - clientWidth + scrollWidth` to calc Alignment. Align prop accepts `start` | `center`(default) | `end` .

Note:

Your Popper Element will receive an `max-height` from `applyTransform` to be scrollable when Map is too small. In most case `overflow: auto` is **required**.

<script setup>
import LevitateAlgo from './LevitateAlgo.vue'
</script>

<LevitateAlgo />

## Positioning

### Auto Positioning

`levitate.auto()` is built upon `ResizeObserver` and `onscroll`.

:::demo components/LevitateAuto
:::

### Mannual Positioning

No `levitate.auto()`.

:::demo components/LevitatePassive
:::

## Tooltip

Learn how to conditional rendering.

### Tooltip Basics

:::demo components/LevitateVueSimple
:::

### Tooltip Transition

:::demo components/LevitateVueTransition
:::

### Tooltip Trap

Assign `[tabindex='-1']` and `@keydown.esc` and call `trap()` after the pop opened.

The keyboard focus is trapped inside. 

Anchor is focusable (see how we call `trap()`) to prevent the focus from bling bling when you click upon the anchor, but it is not required.

:::demo components/LevitateVueTransitionTrap
:::

## Plugins

Learn advanced usage of customized positioning.

### ApplyTransform

The `applyTransform` plugin will assign `top` `left` `max-width` `max-height` `[data-pop-dir="bottom"]` etc to your elements.

It is a `post` plugin which will run after `Align`(positioning process).

Here's another example of mannually transform.

:::demo components/LevitatePluginsApplytransform
:::

### Margin

The algo is shown at the top of this page.

`5px` is enough.

### AutoPlacement / Flip

If target direction's main axis length does not satisfies `limit` (default to `pop.width (offsetWidth - clientWidth + scrollWidth)` or `pop.height`), try other directions which has more area `x * y`. `autoPlacement` will try all other directions while `flip` will only try the opposite direction.

If your pop body **contains** other **scrollable elements** which makes it impossible to get the maximum proper width/height by just calculating `offsetWidth - clientWidth + scrollWidth` of the popper body itself, you should assign a fixed number to `limit`. This is required when uses with `applyTransform` which will assign `max-width` / `max-height` to make the popper smaller to stay inside the viewport, otherwise you'll see the popper not flipped because it automatically taken less space when you makes the map smaller thus the `limit` will never reach, if you algorithm does not have conflict with the algorithm shown above, skip this.
