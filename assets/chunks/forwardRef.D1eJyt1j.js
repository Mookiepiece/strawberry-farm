const e=`import { computed, Ref } from 'vue';\r
\r
/**\r
 * Note: \`el\` is preserved for mannually expose \`defineExpose({ el })\`.\r
 */\r
export const forwardRef = (thing: Ref<any>) =>\r
  computed(() => thing.value && (thing.value.el || thing.value.$el || thing.value));\r
`;export{e as default};
