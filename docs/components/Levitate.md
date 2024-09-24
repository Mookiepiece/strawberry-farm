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

Anchor is focusable to prevent the focus from bling bling when you click upon the anchor to close it, but it is not required. an alt way to do this is `onClickAway([$pop, $anc]); trap($pop, undefined)`

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

To make a gap, make the map smaller, The algo is shown at the top of this page.

`5px` is enough to use.

:::demo components/LevitatePluginsMargin
:::

### AutoPlacement / Flip

If target direction's main axis length does not satisfies `limit`, try other directions which has more area `x * y`. `autoPlacement` will try all other directions while `flip` will only try the opposite direction.

`limit` default to `pop.width (offsetWidth - clientWidth + scrollWidth)`

:::demo components/LevitatePluginsFlip
:::

### Max Height

Assign `max-width` / `max-height` with the map's dimension to keep the pop in view.

Place it after `autoPlacement` thus get the right map before align.

Useful on Select / Dropdown.

Because `max-width` / `max-height` property is used by this plugin, you'll have to assign your max size limit to it's inner children.

The following example shows `max-width` at initial 100 items. Input 1000 to see how both `max-width` / `max-height` take into effect.

:::demo components/LevitatePluginsMaxHeight
:::

Note on using with `limit`: Is there any situation where `scrollWidth` cannot repesents the actually maximum size (e.g. contains scrollable elements inside) so that you have to assign `limit` a `number`? In the following example, adding more and more items will makes it's children scroll and overflow other than it self, so the limit never reach, only scale the browser window to make the map bottom minus `1px` will the pop flip.

:::demo components/LevitatePluginsMaxHeightD
:::
