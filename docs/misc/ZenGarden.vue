<!-- 
Inspired By:

Plants VS Zombies

-->

<template>
  <div class="ZenGarden">
    <div class="bin">
      <span class="plant">🌻</span>
      <span class="quote">💧</span>
    </div>
    <div class="bin">
      <span class="plant">🌻</span>
    </div>
    <div class="bin">
      <span class="plant">🌼</span>
    </div>
    <div class="bull">🐌</div>

    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="320"
      height="86"
      src="//music.163.com/outchain/player?type=2&id=3019806&auto=0&height=66"
    ></iframe>
  </div>
</template>

<style>
.ZenGarden {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-gap: 10px;

  padding: 50px 10px 150px;
  font-size: 35px;
  line-height: 1.1;

  .bin {
    width: max-content;

    position: relative;

    .plant {
      display: block;
      animation: ZenGardenPlant 1s linear alternate-reverse infinite;
      transform-origin: bottom center;
    }

    .plant::before {
      position: absolute;
      top: 5px;
      left: 50%;
      font-size: 55%;
      content: '🙂';
      transform: translateX(-50%);
    }

    .quote {
      position: absolute;
      top: -30px;
      right: -40px;
      width: 50px;
      display: block;

      padding: 10px;
      font-size: 15px;
      line-height: 1;
      text-align: center;
      border: 1px solid #9996;
      box-shadow: 0 1px 2px 0 #9994;
      border-radius: 10px;
      border-bottom-left-radius: 0;
    }

    &::after {
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: -10px;
      height: 12px;
      background: #942;
      content: '';
      clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
    }
  }

  .bull {
    position: absolute;
    bottom: 110px;
    font-size: 25px;
    left: 0;
    animation: ZenGardenDrive 5s infinite linear;
  }

  iframe {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
}

@keyframes ZenGardenPlant {
  from {
    transform: skewX(10deg);
  }
  50% {
    transform: scaleY(0.8);
  }
  to {
    transform: skewX(-10deg);
  }
}
@keyframes ZenGardenDrive {
  0% {
    transform: scaleX(-1);
  }
  45% {
    transform: translateX(calc(300px - 1em)) scaleX(-1);
  }
  50% {
    transform: translateX(calc(300px - 1em)) scaleX(1);
  }
  95% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(-1);
  }
}
</style>
