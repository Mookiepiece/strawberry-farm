<template>
  <div class="Chiikawa" title="https://x.com/ngnchiikawa"></div>
</template>

<style>
.Chiikawa {
  position: relative;
  width: 100px;
  height: 100px;
  --blue: rgb(94, 154, 189);
  background:
    no-repeat calc(50% + 23px) calc(50% + 6px) / 2px 7px
      radial-gradient(ellipse, black 0px, transparent 1px),
    no-repeat calc(50% + 26px) calc(50% + 6px) / 2px 7px
      radial-gradient(ellipse, black 0px, transparent 1px),
    no-repeat calc(50% - 23px) calc(50% + 6px) / 2px 7px
      radial-gradient(ellipse, black 0px, transparent 1px),
    no-repeat calc(50% - 26px) calc(50% + 6px) / 2px 7px
      radial-gradient(ellipse, black 0px, transparent 1px),
    no-repeat calc(50% - 24px) calc(50% + 6px) / 13px 7px
      radial-gradient(ellipse, pink 4px, transparent 6px),
    no-repeat calc(50% + 24px) calc(50% + 6px) / 13px 7px
      radial-gradient(ellipse, pink 4px, transparent 6px),
    linear-gradient(
      white 0px,
      white 12px,
      transparent 12px,
      transparent 70px,
      white 71px
    ),
    no-repeat center / 100px 80px
      radial-gradient(transparent 45px, black 46px, black 47px, white 48px),
    no-repeat calc(50%) calc(50% - 32px) / 50px 22px
      radial-gradient(ellipse, var(--blue) 15px, transparent 16px),
    no-repeat calc(50% + 20px) calc(50% - 30px) / 50px 22px
      radial-gradient(
        ellipse,
        var(--blue) 20px,
        black 21px,
        black 22px,
        transparent 23px
      ),
    no-repeat calc(50% - 20px) calc(50% - 30px) / 50px 22px
      radial-gradient(
        ellipse,
        var(--blue) 20px,
        black 21px,
        black 22px,
        transparent 23px
      ),
    no-repeat center / 100px 78px
      radial-gradient(
        transparent 45px,
        black 46px,
        black 47px,
        transparent 48px
      ),
    no-repeat calc(50% - 11px) calc(50% - 15px) / 7px 3px
      radial-gradient(ellipse, black 2px, transparent 3px),
    no-repeat calc(50% + 11px) calc(50% - 15px) / 7px 3px
      radial-gradient(ellipse, black 2px, transparent 3px),
    no-repeat calc(50%) calc(50% + 13px) / 5px 2px
      radial-gradient(ellipse at top, black 1px, transparent 2px),
    no-repeat calc(50% + 4px) calc(50% + 7px) / 9px 7px
      radial-gradient(
        ellipse at 6px 1px,
        transparent 3px,
        black 4px,
        black 4px,
        transparent 6px
      ),
    no-repeat calc(50% - 3px) calc(50% + 7px) / 9px 7px
      radial-gradient(
        ellipse at 3px 1px,
        transparent 3px,
        black 4px,
        black 4px,
        transparent 6px
      ),
    no-repeat calc(50% - 14px) calc(50% - 7px) / 15px 9px
      radial-gradient(white 3px, transparent 4px),
    no-repeat calc(50% + 13px) calc(50% - 7px) / 15px 9px
      radial-gradient(white 3px, transparent 4px),
    no-repeat calc(50% - 12px) calc(50% - 2px) / 5px 2px
      radial-gradient(ellipse at 40% 40%, white 2px, transparent 3px),
    no-repeat calc(50% + 15px) calc(50% - 2px) / 5px 2px
      radial-gradient(ellipse at 40% 40%, white 2px, transparent 3px),
    no-repeat -14px -5px radial-gradient(black 5px, transparent 6px),
    no-repeat 14px -5px radial-gradient(black 5px, transparent 6px),
    white;

  &::before,
  &::after {
    display: block;
    position: absolute;
    top: 7px;
    left: 19px;
    width: 25px;
    height: 25px;
    border-radius: 6px;
    transform: scaleX(0.9) rotate(28deg);
    border: 2px solid black;
    background: var(--blue);
    content: '';
    clip-path: circle(85% at 0 0);
  }

  &::after {
    left: unset;
    top: 7px;
    right: 19px;
    transform: scaleX(0.9) rotate(62deg);
  }
}
</style>
