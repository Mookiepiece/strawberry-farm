const r=`import { Ref, VNode, cloneVNode, defineComponent, ref, watchEffect } from 'vue';\r
\r
export const RenderFunction = defineComponent<{\r
  forwardRef?(r: Ref<any>): void;\r
  render(): any;\r
}>(\r
  props => {\r
    if (!props.forwardRef) return () => props.render();\r
\r
    const el = ref();\r
    watchEffect(() => {\r
      props.forwardRef!(el);\r
    });\r
\r
    return () => {\r
      const _vn = props.render();\r
      const _vn0: VNode = Array.isArray(_vn) ? _vn[0] : _vn;\r
\r
      if (_vn0.props?.ref) console.warn('[StrawberryFarm] refs are forwarded.');\r
\r
      return cloneVNode(_vn0, { ref: el });\r
    };\r
  },\r
  {\r
    name: 'RenderFunction',\r
    props: ['forwardRef','render'],\r
  },\r
);\r
`;export{r as default};
