<script setup lang="ts"></script>

<template>
  <div>
    <div class="vpx-card mat:air">
      <div class="f1 ">Title</div>
      <div class="f2">description • description • description</div>
    </div>
    <div class="vpx-card mat:air">
      <div class="f2 ">Title</div>
      <div class="f3">description • description • description</div>
    </div>

    <div class="vpx-action-panel-a">
      <div class="[B] [CC] f1  py-3 pt-4">
        <span>Confirm Removal</span>
      </div>
      <div class="vpx-body"></div>
      <button class="vpx-action [B] [CC] mat:air p-2 px-2 f2 ">
        <span style="color: var(--tone-reimu-ink)">Remove</span>
      </button>
      <div class="vpx-body"></div>
      <button class="vpx-action [B] [CC] mat:air p-2 px-2 f2 ">
        <span style="color: var(--text-1)">Cancel</span>
      </button>
    </div>

    <div class="vpx-action-panel-a" style="border-radius: 20px">
      <div class="[B] [CC] f1  py-3 pt-4">
        <span>Confirm Removal</span>
      </div>
      <div class="vpx-body"></div>
      <div class="[B]">
        <button
          class="vpx-action [B] [CC] mat:air p-2 px-2 f2 "
          style="flex: 1 1 50%"
        >
          <span style="color: var(--text-1)">Cancel</span>
        </button>
        <div
          style="height: 40px; width: 1px; background-color: var(--mat-air-15)"
        ></div>
        <button
          class="vpx-action [B] [CC] mat:air p-2 px-2 f2 "
          style="flex: 1 1 50%"
        >
          <span style="color: var(--tone-rasp-ink)">Confirm</span>
        </button>
      </div>
    </div>

    <div class="vpx-action-panel-a" style="border-radius: 20px">
      <div class="[B] [CC] f1  py-3 pt-4">
        <span>Confirm Removal</span>
      </div>
      <div class="vpx-body"></div>
      <button class="vpx-action [B] [CC] mat:air p-2 px-2 f2 ">
        <span style="color: var(--tone-rasp-ink)">Confirm</span>
      </button>
      <div class="vpx-body"></div>
      <button class="vpx-action [B] [CC] mat:air p-2 px-2 f2 ">
        <span style="color: var(--text-1)">Cancel</span>
      </button>
    </div>

    <div class="vpx-action-panel">
      <div class="[B] [CC] f1 ">
        <span>Confirm Removal</span>
      </div>
      <div class="vpx-body"></div>
      <div class="vpx-action [B] [CC] mat:dust p-1 px-2 f2-1 ">
        <span>Confirm</span>
      </div>
      <div class="vpx-action [B] [CC] mat:dust p-1 px-2 f2-1 ">
        <span>Cancel</span>
      </div>
    </div>

    <div class="vpx-action-panel">
      <div class="[B] [CC] f1 ">
        <span>Confirm Removal</span>
      </div>
      <div class="vpx-body"></div>
      <div
        class="vpx-action [B] [CC] mat:ruby p-1 px-2 f2-1 "
        aria-selected="true"
      >
        <span>Confirm</span>
      </div>
      <div class="vpx-action [B] [CC] mat:air p-1 px-2 f2-1 ">
        <span>Cancel</span>
      </div>
    </div>
  </div>
</template>

<style>
.vpx-card {
  margin: 15px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px var(--mat-air-15);
}

.vpx-action-panel-a {
  margin: auto;
  max-width: 300px;
  box-shadow: inset 0 0 0 1px var(--mat-air-15);

  > .vpx-body {
    position: relative;
    height: 1px;

    &::after {
      display: block;
      position: absolute;
      inset: 20px;
      top: auto;
      bottom: 0;
      height: 1px;
      background-color: var(--mat-air-15);
      content: '';
    }
  }

  > button {
    width: 100%;
    height: 40px;
  }

  margin-top: 100px;
  margin-bottom: 100px;
}

.vpx-action-panel {
  overflow: hidden;
  margin: auto;
  max-width: 300px;
  padding-top: 20px;
  padding-bottom: 5px;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px var(--mat-air-15);

  > .vpx-body {
    height: 20px;
  }
  > .vpx-action {
    border-radius: 10px;
    margin: 5px 10px;
    height: 40px;
  }

  margin-top: 100px;
  margin-bottom: 100px;
}
</style>
