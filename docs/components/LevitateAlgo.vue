<template>
  <div class="levitate-algo">
    <div class="window">
      ViewPort
      <div class="anchor">Anchor</div>
      <div class="map">Map (Dir: bottom)</div>
      <div class="map map2">Map (Margin: 30)</div>
      <div class="pop">Pop (Margin: 30, Align: start)</div>
    </div>
  </div>
</template>

<style scoped>
.levitate-algo {
  overflow: auto;
  font-weight: 600;

  .window {
    position: relative;
    margin: auto;
    width: 500px;
    height: 300px;
    padding-top: 20px;
    color: #f88;
    background: 0 0 / 20px 20px
      repeating-linear-gradient(
        45deg,
        #f883 0,
        #f883 2px,
        #0000 2px,
        #0000 10px
      );
    background-clip: content-box;
    border: 2px solid #8888;
    box-shadow: var(--shadow);
    overflow: hidden;
    border-radius: 20px;
    &::before {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      background: #8888;
      content: '';
    }
  }

  .anchor {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 40px);
    width: 80px;
    height: 40px;
    color: #88f;
    border: 1px solid;
    background: 0 0 / 20px 20px
      repeating-linear-gradient(
        -45deg,
        #88f3 0,
        #88f3 2px,
        #0000 2px,
        #0000 10px
      );
  }
  .map {
    position: absolute;
    top: calc(50% + 20px);
    left: 0;
    right: 0;
    bottom: 0;
    color: #6a8;
    border: 1px solid;
    background: 0 0 / 20px 30px
      repeating-linear-gradient(
        -45deg,
        #6a83 0,
        #6a83 2px,
        #0000 2px,
        #0000 20px
      );
  }
  .map2 {
    top: calc(50% + 50px);
    left: 30px;
    right: 30px;
    bottom: 30px;
    font-size: 12px;
  }
  .pop {
    position: absolute;
    top: calc(50% + 50px);
    left: calc(50% - 40px);
    width: 200px;
    bottom: 50px;
    font-size: 12px;
    transition: center;
    border: 2px solid;
 
    &::before {
      position: absolute;
      left: -2px;
      top: -25px;
      height: 25px;
      width: 0;
      border-left: 2px dashed currentColor;
      opacity: 0.5;
      content: '';
    }
  }
}
</style>
