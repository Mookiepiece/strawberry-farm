<template>
  <label class="[SF]">
    <input type="radio" name="1" value="1" class="my-radio" />
    <div>description</div>
  </label>
  <label class="[SF]" style="height: 100px;">
    <input type="radio" name="1" value="2" class="my-radio" />
    <div>description</div>
  </label>
  <label class="[SF]">
    <input type="radio" disabled name="1" value="3" class="my-radio" />
    <div>description</div>
  </label>
</template>

<style scoped>

:where(.my-radio:focus-visible + div, .my-radio:not(:disabled) + div:hover) {
  background: var(--vp-c-gray-3);
}

:where(.my-radio:checked + div) {
  background: var(--vp-c-gray-1);
}
</style>
