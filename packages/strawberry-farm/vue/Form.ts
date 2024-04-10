import {
  Component,
  MaybeRef,
  Ref,
  reactive,
  shallowReactive,
  toRaw,
} from 'vue';
import { IRuleType, RuleSlim } from '../functions/validator';
import VRadioGroup from './VRadioGroup.vue';
import VInput from './VInput.vue';
import { CommonOption, CommonOptionGroup } from './misc';
import { inc } from '../functions';

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
  radio: InstanceType<typeof VRadioGroup>['$props'] & Record<string, any>;
  list: any;
  hidden: undefined;
}

type FiledTypesTurple = {
  [K in keyof FieldTypes]: [K, FieldTypes[K]] | [K];
}[keyof FieldTypes];

type FieldDescriptor<T, K extends keyof T> = {
  label?: string;
  name: K;
  visible?: Ref<boolean>;

  type?: MaybeRef<FiledTypesTurple>;

  rules?: RuleSlim<keyof IRuleType, T[K]>[];

  childInit?: T[K] extends Array<infer I> ? () => I : undefined;
  children?: T[K] extends Array<infer I>
    ?
        | ((row: I, index: number) => FieldDescriptor<I, keyof I>[])
        | FieldDescriptor<I, keyof I>[]
    : undefined;
};

type FormHierarchy<T> =
  {
    descriptor: FieldDescriptor<T, keyof T>;
    model: T;
    message: string | undefined;
    focus(): void;
    reset(): void;
    validate(): Promise<string | void>;
  } & T extends Array<infer I>
    ? Record<
        number,
        {
          [K in keyof I]: FormHierarchy<I[K]>;
        }
      >
    : {
        [K in keyof T]: FormHierarchy<T[K]>;
      };

export type FormModel<T> = {
  value: T;
  setInitialValue(cb: () => T): void;
  submitting: boolean;
  submit(): Promise<void>;
  reset(): void;
  // reject(name: Path<T>, message?: string): void;
  // focus(name: Path<T>): void;
  validate(): Promise<string | void>;

  descriptors: {
    [P in Path<T>]: FieldDescriptor<T, P>;
  };

  hierarchy(
    cb: (payload: {
      i: <O = T, P extends Path<O> = Path<O>>(
        f: FieldDescriptor<O, P>,
      ) => FieldDescriptor<O, P>;
    }) => void,
  ): void;

  items: {
    [P in Path<T>]?: {
      focus(): void;
      validate(): Promise<string | void>;
      message: Ref<string | undefined>;
    };
  };
};

export const define = <T extends object>(param: {
  initialValue: () => T;
  action?(value: T): void | Promise<void>;
}): FormModel<T> => {
  const descriptors = shallowReactive<FormModel<T>['descriptors']>({} as any);

  const i = <O = T, P extends Path<O>>(
    f: FieldDescriptor<O, P>,
  ): FieldDescriptor<O, P> => {
    (descriptors as any)[f.name] = f;
    return f;
  };

  let initialValue = param.initialValue;

  //   defineHierarchy(h) {
  //     const walkHierarchy = <T>(
  //       path: string,
  //       t: T,
  //       k: string,
  //       v: FormHierarchyDef<T>,
  //     ) => {
  //       const h: FormHierarchy<T> = {
  //         id: 'uuid',
  //         def: v,
  //         model: computed({
  //           get() {
  //             return pathValueGetter(_form.value, `${path}.${k}`);
  //           },
  //           set(v) {
  //             return pathValueSetter(_form.value, `${path}.${k}`, v);
  //           },
  //         }),
  //         _: {},
  //         focus() {},
  //         message: undefined,
  //         async validate() {},
  //         async _validate() {},
  //       };
  //     };
  //     Object.entries(h).forEach(([k, v]) => {
  //       walkHierarchy(k, hierarchy, k as any, v as any);
  //     });
  //   },
  //   async submit() {
  //     return await param.action?.(value);
  //   },
  // };

  const form = reactive<FormModel<T>>({
    value: param.initialValue(),
    descriptors,
    focus(name) {
      form.items[name]?.focus();
    },
    reject(name, message) {
      const m = form.items[name]?.message;
      if (m) m.value = message;
    },
    setInitialValue(cb) {
      initialValue = cb;
    },
    reset() {
      form.value = initialValue();
    },
    submitting: false,
    async submit() {
      form.submitting = true;
      try {
        const v = toRaw(form.value);
        if (typeof (await form.validate()) !== 'string')
          return await param.action?.(v);
        throw new DOMException('', 'AbortError');
      } finally {
        form.submitting = false;
      }
    },
    async validate(names) {
      const filter = ([k]: [string, any]) => !names || names.includes(k);

      const tasks = Object.entries(form.items)
        .filter(filter)
        .map(
          ([k, i]) =>
            [
              k,
              (i as NonNullable<(typeof form.items)[Path<T>]>).validate(),
            ] as [Path<T>, Promise<string | void>],
        );

      const ans = await Promise.all(tasks.map(([, t]) => t));

      const index = ans.findIndex(a => typeof a === 'string');
      if (index !== -1) {
        const name = tasks[index][0];
        form.items[name]?.focus();
        return ans[index];
      }
    },

    items: {},

    hierarchy(cb) {
      cb({ i });
    },
  }) as FormModel<T>;

  return form;
};

export const fieldTypes = new Map<keyof FieldTypes, Component>();

fieldTypes.set('radio', VRadioGroup);
fieldTypes.set('text', VInput);

export const Form = {
  uuid: inc('FORM'),
  pathValueGetter,
  pathValueSetter,
  define,
  registry: fieldTypes,
};
