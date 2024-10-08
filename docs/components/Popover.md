# Popover

An opinionated way to use `levitate`.

### DOM

```html
<body>
  <div data-pop><slot name="popper" /></div>
</body>
```

### Command List

| Command List                                                                                                |        |
| ----------------------------------------------------------------------------------------------------------- | ------ |
| <vp-kbd k="up" /> / <vp-kbd k="left" /> / <vp-kbd k="down" /> / <vp-kbd k="right" /> / <vp-kbd k="Space" /> | Open.  |
| <vp-kbd k="Esc" />                                                                                          | Close. |

## Basics

`<slot name="default" />` is used:

| Trigger | DOM Event Listener                                                 |
| ------- | ------------------------------------------------------------------ |
| click   | anc.click                                                          |
| hover   | anc.pointerenter, anc.pointerout, pop.pointerenter, pop.pointerout |

:::demo components/Popover
:::

## Chain

Not Supported, here's why.

:::demo components/PopoverChain
:::
