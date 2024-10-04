const r=`import { Fragment, isVNode, VNode } from 'vue';\r
\r
/**\r
 *\r
 * @license MIT element-plus \`findFirstLegitChild()\`\r
 */\r
export function child(node: any): VNode | null {\r
  // prettier-ignore\r
  dev: { if (Array.isArray(node) && node.length > 1) console.warn('[strawberry-farm] \`child()\` received array of nodes, only first node is rendered') }\r
\r
  const i = Array.isArray(node) ? node[0] : node;\r
\r
  if (isVNode(i)) {\r
    if (i.type === Fragment) return child(i.children);\r
    return i;\r
  }\r
\r
  return null;\r
}\r
`;export{r as default};
