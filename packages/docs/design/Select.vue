<script lang="ts" setup>
import VSelect from '@mookiepiece/strawberry-farm/vue/VSelect.vue';
</script>

<template>
  <div class="good">
    <VSelect
      placeholder="Choose your favourite option"
      :options="['Yes', 'No', 'I\'m not sure']"
    />
    <VSelect
      :options="[
        '名誉「十二階の色彩」	Easy / Normal',
        '名誉「十二階の冠位」	Hard / Lunatic',
        '仙符「日出ずる処の道士」	Easy / Normal',
        '仙符「日出ずる処の天子」	Hard / Lunatic',
        '召喚「豪族乱舞」	Easy / Normal / Hard / Lunatic',
        '秘宝「斑鳩寺の天球儀」	Easy / Normal / Hard',
        '秘宝「聖徳太子のオーパーツ」	Lunatic',
        '光符「救世観音の光後光」	Easy / Normal',
        '光符「グセフラッシュ」	Hard / Lunatic',
        '眼光「十七条のレーザー」	Easy / Normal',
        '神光「逆らう事なきを宗とせよ」	Hard / Lunatic',
        '「星降る神霊廟」	Easy / Normal',
        '「生まれたての神霊」	Hard / Lunatic',
        '「神霊大宇宙」	OverDrive',
      ]"
      clearable
    >
      <template #prefix>
        <i-feather i="airplay" />
      </template>
      <template #suffix>
        <i-feather i="airplay" />
      </template>
    </VSelect>

    <VSelect
      style="max-width: 200px;"
      :options="[
        '名誉「十二階の色彩」	Easy / Normal',
        '名誉「十二階の冠位」	Hard / Lunatic',
        '仙符「日出ずる処の道士」	Easy / Normal',
        '仙符「日出ずる処の天子」	Hard / Lunatic',
        '召喚「豪族乱舞」	Easy / Normal / Hard / Lunatic',
        '秘宝「斑鳩寺の天球儀」	Easy / Normal / Hard',
        '秘宝「聖徳太子のオーパーツ」	Lunatic',
        '光符「救世観音の光後光」	Easy / Normal',
        '光符「グセフラッシュ」	Hard / Lunatic',
        '眼光「十七条のレーザー」	Easy / Normal',
        '神光「逆らう事なきを宗とせよ」	Hard / Lunatic',
        '「星降る神霊廟」	Easy / Normal',
        '「生まれたての神霊」	Hard / Lunatic',
        '「神霊大宇宙」	OverDrive',
      ]"
      clearable
    />
  </div>
</template>

<style scoped>
.good {
  display: grid;
  gap: 100px;
}
</style>
