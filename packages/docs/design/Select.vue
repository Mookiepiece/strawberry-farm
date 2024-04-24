<script lang="ts" setup>
import VSelect from '@mookiepiece/strawberry-farm/vue/VSelect.vue';
</script>

<template>
  <div class="good">
    <VSelect
      placeholder="Spell Card"
      :options="[
        {
          value: 0,
          label: '魔符「ミルキーウェイ」',
        },
        {
          value: 1,
          label: '恋符「マスタースパーク」',
        },
      ]"
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
      style="max-width: 200px"
      :options="
        [
          [
            '游戏',
            '东方灵异传\n东方封魔录\n东方梦时空\n东方幻想乡\n东方怪绮谈\n东方红魔乡\n东方妖妖梦\n东方萃梦想\n东方永夜抄\n东方文花帖\n东方花映塚\n东方风神录\n东方绯想天\n东方地灵殿\n东方星莲船\n东方文花帖DS\n东方神灵庙\n东方心绮楼\n东方辉针城\n东方深秘录\n东方绀珠传\n东方凭依华\n东方天空璋\n东方鬼形兽\n东方刚欲异闻\n东方虹龙洞\n东方兽王园',
          ],
          [
            '出版物',
            '东方香霖堂\n东方三月精\n东方儚月抄\n东方求闻史纪\n东方茨歌仙\n东方铃奈庵\n东方智灵奇传\n东方醉蝶华',
          ],
          ['CD', '莲台野夜行\n蓬莱人形'],
        ].map(([label, _]) => ({
          label,
          options: _.split('\n'),
        }))
      "
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
