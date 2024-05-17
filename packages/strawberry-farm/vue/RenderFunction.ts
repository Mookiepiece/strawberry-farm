import { Ref, VNode, cloneVNode, defineComponent, ref, watchEffect } from 'vue';

export const RenderFunction = defineComponent<{
  forwardRef?(r: Ref<any>): void;
  render(): any;
}>(
  props => {
    if (!props.forwardRef) return () => props.render();

    const el = ref();
    watchEffect(() => {
      props.forwardRef!(el);
    });

    return () => {
      const _vn = props.render();
      const _vn0: VNode = Array.isArray(_vn) ? _vn[0] : _vn;

      if (_vn0.props?.ref) console.warn('[StrawberryFarm] refs are forwarded.');

      return cloneVNode(_vn0, { ref: el });
    };
  },
  {
    name: 'RenderFunction',
    props: ['forwardRef','render'],
  },
);
