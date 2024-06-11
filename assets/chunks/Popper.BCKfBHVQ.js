const r=`<script lang="ts" setup>\r
import VSelect from '@mookiepiece/strawberry-farm/vue/VSelect.vue';\r
<\/script>\r
\r
<template>\r
  <div class="good">\r
    <VSelect\r
      placeholder="Spell Card"\r
      :options="['Yes', 'No', 'I\\'m not sure']"\r
    />\r
    <VSelect\r
      :options="[\r
        '名誉「十二階の色彩」	Easy / Normal',\r
        '名誉「十二階の冠位」	Hard / Lunatic',\r
        '仙符「日出ずる処の道士」	Easy / Normal',\r
        '仙符「日出ずる処の天子」	Hard / Lunatic',\r
        '召喚「豪族乱舞」	Easy / Normal / Hard / Lunatic',\r
        '秘宝「斑鳩寺の天球儀」	Easy / Normal / Hard',\r
        '秘宝「聖徳太子のオーパーツ」	Lunatic',\r
        '光符「救世観音の光後光」	Easy / Normal',\r
        '光符「グセフラッシュ」	Hard / Lunatic',\r
        '眼光「十七条のレーザー」	Easy / Normal',\r
        '神光「逆らう事なきを宗とせよ」	Hard / Lunatic',\r
        '「星降る神霊廟」	Easy / Normal',\r
        '「生まれたての神霊」	Hard / Lunatic',\r
        '「神霊大宇宙」	OverDrive',\r
      ]"\r
      clearable\r
    >\r
      <template #prefix>\r
        <i-feather i="airplay" />\r
      </template>\r
      <template #suffix>\r
        <i-feather i="airplay" />\r
      </template>\r
    </VSelect>\r
\r
    <VSelect\r
      style="max-width: 200px;"\r
      :options="[\r
        '名誉「十二階の色彩」	Easy / Normal',\r
        '名誉「十二階の冠位」	Hard / Lunatic',\r
        '仙符「日出ずる処の道士」	Easy / Normal',\r
        '仙符「日出ずる処の天子」	Hard / Lunatic',\r
        '召喚「豪族乱舞」	Easy / Normal / Hard / Lunatic',\r
        '秘宝「斑鳩寺の天球儀」	Easy / Normal / Hard',\r
        '秘宝「聖徳太子のオーパーツ」	Lunatic',\r
        '光符「救世観音の光後光」	Easy / Normal',\r
        '光符「グセフラッシュ」	Hard / Lunatic',\r
        '眼光「十七条のレーザー」	Easy / Normal',\r
        '神光「逆らう事なきを宗とせよ」	Hard / Lunatic',\r
        '「星降る神霊廟」	Easy / Normal',\r
        '「生まれたての神霊」	Hard / Lunatic',\r
        '「神霊大宇宙」	OverDrive',\r
      ]"\r
      clearable\r
    />\r
  </div>\r
</template>\r
\r
<style scoped>\r
.good {\r
  display: grid;\r
  gap: 100px;\r
}\r
</style>\r
`;export{r as default};
