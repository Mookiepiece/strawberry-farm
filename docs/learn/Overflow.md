# Overflow

<script setup>
import Overflow from './Overflow.vue';
</script>

## CSS Scroll Snap

就目前的观察 Chrome 如果不加 margin 就没有越界滚动效果，到边缘就会突然停下，如果加 margin 反而火狐会粘在起点。

```css {4,9}
.a {
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
  border: 5px solid #8883;
}

.b {
  scroll-snap-align: center;
  flex: 0 0 100%;
  height: 300px;
}
```

<Overflow :i="1" />

### No Scrollbar

```css
.noscrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
```

<Overflow :i="2" />
