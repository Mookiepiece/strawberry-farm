const n=`<script lang="ts" setup>\r
import VSelect from '@mookiepiece/strawberry-farm/vue/VSelect.vue';\r
<\/script>\r
\r
<template>\r
  <div class="good">\r
    <VSelect\r
      placeholder="Spell Card"\r
      :options="[\r
        {\r
          value: 0,\r
          label: '魔符「ミルキーウェイ」',\r
        },\r
        {\r
          value: 1,\r
          label: '恋符「マスタースパーク」',\r
        },\r
      ]"\r
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
      style="max-width: 200px"\r
      :options="\r
        [\r
          [\r
            '游戏',\r
            '东方灵异传\\n东方封魔录\\n东方梦时空\\n东方幻想乡\\n东方怪绮谈\\n东方红魔乡\\n东方妖妖梦\\n东方萃梦想\\n东方永夜抄\\n东方文花帖\\n东方花映塚\\n东方风神录\\n东方绯想天\\n东方地灵殿\\n东方星莲船\\n东方文花帖DS\\n东方神灵庙\\n东方心绮楼\\n东方辉针城\\n东方深秘录\\n东方绀珠传\\n东方凭依华\\n东方天空璋\\n东方鬼形兽\\n东方刚欲异闻\\n东方虹龙洞\\n东方兽王园',\r
          ],\r
          [\r
            '出版物',\r
            '东方香霖堂\\n东方三月精\\n东方儚月抄\\n东方求闻史纪\\n东方茨歌仙\\n东方铃奈庵\\n东方智灵奇传\\n东方醉蝶华',\r
          ],\r
          ['CD', '莲台野夜行\\n蓬莱人形'],\r
        ].map(([label, _]) => ({\r
          label,\r
          options: _.split('\\n'),\r
        }))\r
      "\r
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
`;export{n as default};
