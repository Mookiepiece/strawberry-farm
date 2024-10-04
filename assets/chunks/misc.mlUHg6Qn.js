const n=`export type CommonOption<T = undefined> = {\r
  label?: string;\r
  value: any;\r
  meta?: T;\r
  disabled?: boolean;\r
};\r
\r
export type CommonOptionInput<T = undefined> =\r
  | string\r
  | number\r
  | boolean\r
  | null\r
  | undefined\r
  | CommonOption<T>;\r
\r
export type CommonOptionGroup<T = undefined> = {\r
  label?: string;\r
  options: CommonOption<T>[];\r
};\r
\r
export type CommonOptionGroupInput<T = undefined> = {\r
  label?: string;\r
  options: CommonOptionInput<T>[];\r
};\r
\r
export type CommonOptionsInput<T = undefined> = (\r
  | CommonOptionInput<T>\r
  | CommonOptionGroupInput<T>\r
)[];\r
\r
export type NormalizedCommonOption<T = undefined> = {\r
  label: any;\r
  value: any;\r
  meta?: T;\r
  disabled: boolean;\r
  index: number;\r
  current: boolean;\r
  selected: boolean;\r
};\r
\r
export const flatCommonOptionsInput = <T = undefined>(\r
  i: CommonOptionsInput<T>,\r
): CommonOption<T>[] =>\r
  i\r
    .flatMap(o =>\r
      o && typeof o === 'object' && 'options' in o ? o.options : o,\r
    )\r
    .map(o =>\r
      o && typeof o === 'object' && 'value' in o\r
        ? o\r
        : { value: o, label: '' + o },\r
    );\r
\r
export type TreeNode<T = undefined> = {\r
  value: any;\r
  label?: string;\r
  meta?: T;\r
  disabled?: boolean;\r
  open?: boolean;\r
  children?: boolean | TreeNode<T>[];\r
};\r
\r
export const flatTree = <T>(\r
  cb: (node: TreeNode<T>) => void,\r
  ...nodes: TreeNode<T>[]\r
): void => {\r
  nodes.forEach(node => {\r
    cb(node);\r
    if (Array.isArray(node.children)) {\r
      flatTree(cb, ...node.children);\r
    }\r
  });\r
};\r
`;export{n as default};
