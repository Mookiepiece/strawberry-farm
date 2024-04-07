import { Component, MaybeRef, Ref, computed, reactive } from 'vue';
import { IRuleType, RuleSlim } from '../functions/validator';
import VRadioGroup from './VRadioGroup.vue';
import VInput from './VInput.vue';
import { CommonOption, CommonOptionGroup } from './misc';

/**
 * @license MIT react-hook-form
 */
type Unpathed =
  | number
  | string
  | boolean
  | symbol
  | bigint
  | null
  | undefined
  | Date
  | FileList
  | File
  | Blob;

interface FieldTypes {
  any: any;
  text: InstanceType<typeof VInput>['$props'] & Record<string, any>;
  textarea: number | (number | null | undefined)[] | RegExp;
  number: any;
  checkbox: any;
  switch: any;
  checkboxgroup: {
    options: (CommonOption | CommonOptionGroup)[];
  };
  select: {
    options: (CommonOption | CommonOptionGroup)[];
  };
  radio: {
    options: string[];
  };
  list: any;
  hidden: undefined;
}

export const pathValueGetter = <Objective>(object: Objective, path: string) => {
  const pathes = path.split('.');

  let p: any = object;
  for (const _ of pathes) {
    p = p[_];
    if (!p) return p;
  }

  return p;
};

export const pathValueSetter = <Objective>(
  object: Objective,
  path: string,
  value: any,
) => {
  const pathes = path.split('.');
  const parents = pathes.slice(0, -1);
  const last = pathes[pathes.length - 1];

  let p: any = object;
  for (const _ of parents) {
    p = p[_];
    if (!p) return;
  }

  p[last] = value;
};

export type FormHierarchyDef<T> = {
  label?: string;
  type?: {
    [K in keyof FieldTypes]?: FieldTypes[K] | MaybeRef<FieldTypes[K]>;
  };
  rules?: RuleSlim<keyof IRuleType, T>[];

  _?: {
    [K in keyof T]?: FormHierarchyDef<T[K]>;
  };
};

export type FormHierarchy<T> = {
  // This should paticipate in list key rendering, but dont know how.
  id: string;
  def: FormHierarchyDef<T>;

  model: Ref<T>;
  message: undefined | string;

  _: T extends Unpathed
    ? {
        [K in never]?: FormHierarchy<T[K]>;
      }
    : {
        [K in keyof T]: FormHierarchy<T[K]>;
      };

  focus(): void;
  validate(): Promise<void | string>;
  _validate(): Promise<void | string>;
};

export type FormModel<T> = {
  initialValue: T;
  value: T;

  hierarchy: FormHierarchy<T>;
  defineHierarchy(h: {
    [K in keyof T]?: FormHierarchyDef<T[K]>;
  }): void;

  validate(): Promise<void | string>;
  reset(): void;
  submit(): Promise<void>;
};

export const defineForm = <T extends object>(param: {
  initialValue: T;

  action?: (formValue: T) => void | Promise<void>;
}): FormModel<T> => {
  const value = reactive(param.initialValue) as T;

  const hierarchy = reactive<FormHierarchy<T>>({} as any) as any;

  const _form: FormModel<T> = {
    value: reactive(param.initialValue) as T,
    initialValue: param.initialValue as T,
    hierarchy,
    reset() {},
    validate() {
      throw new Error();
    },
    defineHierarchy(h) {
      const walkHierarchy = <T>(
        path: string,
        t: T,
        k: string,
        v: FormHierarchyDef<T>,
      ) => {
        const h: FormHierarchy<T> = {
          id: 'uuid',
          def: v,
          model: computed({
            get() {
              return pathValueGetter(_form.value, `${path}.${k}`);
            },
            set(v) {
              return pathValueSetter(_form.value, `${path}.${k}`, v);
            },
          }),
          _: {},
          focus() {},
          message: undefined,
          async validate() {},
          async _validate() {},
        };
      };
      Object.entries(h).forEach(([k, v]) => {
        walkHierarchy(k, hierarchy, k as any, v as any);
      });
    },
    async submit() {
      return await param.action?.(value);
    },
  };

  return reactive(_form) as FormModel<T>;
};

export const fieldTypes = new Map<keyof FieldTypes, Component>();

fieldTypes.set('radio', VRadioGroup);
fieldTypes.set('text', VInput);

export const Form = {
  define: defineForm,
  registry: fieldTypes,
};
