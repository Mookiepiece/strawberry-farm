# Levitate

Positioning floating(fixed) elements.

Words:

- Ref: The **reference** Element/DOMRect.
- Pop: The **popper** Element/DOMRect that to be positioned.
- View(viewport): The **viewport** boundary that will contains the pop.
- Map: The **clipped viewport** output by direction and padding(if has). which will be the maximum size of the popper.

- `[data-pop-box]`: this attr will make `flip` and `autoPlacement` plugins to measure the `scrollHeight` in order to judge whether to perform the flip. and if the map is too small, `[data-pop-box]` will accept an `--max-height` from `applyTransform` to be scrollable, other directions are vice versa. In most case it is **required**.

### Auto Positioning

`levitate.auto()` is built upon `ResizeObserver` and `onscroll`.

:::demo components/LevitateAuto
:::

### Mannual Positioning

If you don't use `levitate.auto()`.

:::demo components/LevitatePassive
:::

### Vue

:::demo components/LevitateVueSimple
:::

### Animated

:::demo components/LevitateVueAnimated
:::
