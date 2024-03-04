import { describe, it, expect } from 'vitest';
import { IRuleType, RuleS, validate, defineRule } from '../validator';

const d = defineRule;

describe('vadliator', () => {
  const $ =
    (...rulesss: RuleS<keyof IRuleType>[]) =>
    (...turples: [any, string][]) => {
      rulesss.forEach(rules =>
        turples.forEach(([v, exp]) => {
          expect(rules).toBeTruthy();
          const message = validate(v, rules, 'Dinner') ?? 'ok';
          expect(message).toBe(exp);
        }),
      );
    };

  it('validates any', () => {
    $('any', ['any'], { required: false }, {}, { message: 'foo' })(
      [0, 'ok'],
      [-1.1, 'ok'],
      [NaN, 'ok'],
      [Infinity, 'ok'],
      [() => {}, 'ok'],
      [Symbol.iterator, 'ok'],
      [Date, 'ok'],
      [false, 'ok'],
      [true, 'ok'],
      [String, 'ok'],
      ['111', 'ok'],
      ['', 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
      [JSON, 'ok'],
      [[undefined], 'ok'],
      [{}, 'ok'],
    );
  });

  it('validates any not nullish', () => {
    $('any!', ['any!'], { required: true })(
      [0, 'ok'],
      [false, 'ok'],
      ['', 'ok'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
      [[], 'ok'],
      [[[]], 'ok'],
    );
    $({ required: true, message: 'foo' })(
      [0, 'ok'],
      [false, 'ok'],
      [undefined, 'foo'],
    );
  });

  it('validates string', () => {
    $('string')(
      [0, 'Dinner 必须为字符类型'],
      [[], 'Dinner 必须为字符类型'],
      ['', 'ok'],
      ['  ', 'ok'],
      ['\n', 'ok'],
      ['  zoo', 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
    );

    $('string!')(
      [0, 'Dinner 必须为字符类型'],
      [[], 'Dinner 必须为字符类型'],
      ['', '请输入 Dinner'],
      ['  ', 'ok'],
      ['\n', 'ok'],
      ['  zoo', 'ok'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );
  });

  it('validates number', () => {
    $('number')(
      [0, 'ok'],
      [-1.1, 'ok'],
      [NaN, 'Dinner 必须为数值类型'],
      [Infinity, 'Dinner 必须为数值类型'],
      [() => {}, 'Dinner 必须为数值类型'],
      [Symbol.iterator, 'Dinner 必须为数值类型'],
      [Date, 'Dinner 必须为数值类型'],
      [false, 'Dinner 必须为数值类型'],
      [true, 'Dinner 必须为数值类型'],
      [String, 'Dinner 必须为数值类型'],
      ['111', 'Dinner 必须为数值类型'],
      ['', 'Dinner 必须为数值类型'],
      [null, 'ok'],
      [undefined, 'ok'],
      [JSON, 'Dinner 必须为数值类型'],
      [[undefined], 'Dinner 必须为数值类型'],
      [{}, 'Dinner 必须为数值类型'],
    );

    $('number!')(
      [0, 'ok'],
      [-1.1, 'ok'],
      [NaN, 'Dinner 必须为数值类型'],
      [Infinity, 'Dinner 必须为数值类型'],
      [() => {}, 'Dinner 必须为数值类型'],
      [Symbol.iterator, 'Dinner 必须为数值类型'],
      [Date, 'Dinner 必须为数值类型'],
      [false, 'Dinner 必须为数值类型'],
      [true, 'Dinner 必须为数值类型'],
      [String, 'Dinner 必须为数值类型'],
      ['111', 'Dinner 必须为数值类型'],
      ['', 'Dinner 必须为数值类型'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
      [JSON, 'Dinner 必须为数值类型'],
      [[undefined], 'Dinner 必须为数值类型'],
      [{}, 'Dinner 必须为数值类型'],
    );
  });

  it('validates enum', () => {
    $('enum')(
      [[1], 'Dinner 不在选项范围内'],
      ['1', 'Dinner 不在选项范围内'],
      [1, 'Dinner 不在选项范围内'],
      [3, 'Dinner 不在选项范围内'],
      [null, 'ok'],
      [undefined, 'ok'],
    );

    $(['enum!', []])(
      [[1], 'Dinner 不在选项范围内'],
      ['1', 'Dinner 不在选项范围内'],
      [1, 'Dinner 不在选项范围内'],
      [3, 'Dinner 不在选项范围内'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );

    $(['enum', [1, 2, 3]])(
      [[1], 'Dinner 不在选项范围内'],
      ['1', 'Dinner 不在选项范围内'],
      [1, 'ok'],
      [3, 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
    );

    $(['enum!', [1, 2, 3]])(
      [[1], 'Dinner 不在选项范围内'],
      ['1', 'Dinner 不在选项范围内'],
      [1, 'ok'],
      [3, 'ok'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );
  });

  it('validates boolean', () => {
    $('boolean')(
      ['', 'Dinner 必须为布尔类型'],
      [true, 'ok'],
      [false, 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
    );
    $('boolean!')(
      ['', 'Dinner 必须为布尔类型'],
      [true, 'ok'],
      [false, 'ok'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );
  });

  it('validates checked', () => {
    $('checked')(
      ['1', '请先检阅 Dinner'],
      [true, 'ok'],
      [false, '请先检阅 Dinner'],
      [null, 'ok'],
      [undefined, 'ok'],
    );
    $('checked!')(
      ['1', '请先检阅 Dinner'],
      [true, 'ok'],
      [false, '请先检阅 Dinner'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );
  });

  it('validates email', () => {
    $('email')(
      ['', 'Dinner 不是有效的邮箱地址'],
      ['@@', 'Dinner 不是有效的邮箱地址'],
      ['a@qq.cc', 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
    );
    $('email!')(
      ['', '请输入 Dinner'],
      ['@@', 'Dinner 不是有效的邮箱地址'],
      ['a@qq.cc', 'ok'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );
  });

  it('validates array', () => {
    $('array')(
      [[], 'ok'],
      [[[]], 'ok'],
      [{}, 'Dinner 必须为列表类型'],
      [null, 'ok'],
      [undefined, 'ok'],
    );
    $('array!')(
      [[], 'ok'],
      [[[]], 'ok'],
      [{}, 'Dinner 必须为列表类型'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );
  });

  it('validates type', () => {
    $(['type', Date])(
      [new Date(), 'ok'],
      [100, 'Dinner 不匹配格式'],
      [null, 'ok'],
      [undefined, 'ok'],
    );
    $(['type!', Date])(
      [new Date(), 'ok'],
      [100, 'Dinner 不匹配格式'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );
  });

  it('do range validations', () => {
    $(['string', [3, 3]])(
      ['', 'ok'],
      ['1', 'Dinner 的长度必须等于 3'],
      [null, 'ok'],
      [undefined, 'ok'],
    );

    $(['string!', [3, 3]])(
      ['', '请输入 Dinner'],
      ['1', 'Dinner 的长度必须等于 3'],
      [null, '请输入 Dinner'],
      [undefined, '请输入 Dinner'],
    );

    $(['string!', [3, 10]])(
      ['1', 'Dinner 的长度必须介于 3 - 10'],
      ['123', 'ok'],
      ['123456789abc', 'Dinner 的长度必须介于 3 - 10'],
    );
    $(['string!', 3])(['1', 'Dinner 的长度必须等于 3'], ['123', 'ok']);
    $(['string!', [3]])(['1', 'Dinner 的长度至少为 3'], ['123', 'ok']);
    $(['string!', [, 10]])(
      ['1', 'ok'],
      ['123456789abc', 'Dinner 的长度至多为 10'],
    );

    $(['number!', [3, 10]])(
      ['', 'Dinner 必须为数值类型'],
      [1, 'Dinner 的值必须介于 3 - 10'],
      [3, 'ok'],
      [30, 'Dinner 的值必须介于 3 - 10'],
    );
    $(['number!', 3])([1, 'Dinner 必须等于 3'], [3, 'ok']);
    $(['number!', [3]])([1, 'Dinner 至少为 3'], [3, 'ok']);
    $(['number!', [, 10]])([1, 'ok'], [30, 'Dinner 至多为 10']);

    $(['array', [3]])([[,], 'Dinner 的长度至少为 3'], [[, , ,], 'ok']);
  });

  it('supports config', () => {
    $(['string', /\d\d\d/])(
      ['', 'ok'],
      ['000', 'ok'],
      ['^_^', 'Dinner 不匹配格式'],
    );
  });

  it('supports message', () => {
    $({
      type: 'string',
      required: true,
      config: /\d\d\d/,
      message: 'foo',
    })(['', 'foo'], [null, 'foo'], ['000', 'ok'], ['^_^', 'foo']);
  });

  it('has many shortcuts', () => {
    $(['string', /\d\d\d/])(['', 'ok'], ['^_^', 'Dinner 不匹配格式']);
    $({
      type: 'string',
      required: false,
      config: /\d\d\d/,
    })(['', 'ok'], ['000', 'ok'], ['^_^', 'Dinner 不匹配格式']);
  });

  it('supports custom validators', () => {
    $({
      type: 'string',
      required: false,
      config: /\d\d\d/,
      validator(value) {
        if (value !== '000') return '%s%s%s';
      },
      message: '%s',
    })(['', 'ok'], ['000', 'ok'], ['123', '%s%s%s'], ['^_^', '%s']);
  });

  it('supports only validator was provided', () => {
    $({
      config: /\d\d\d/,
      required:true,
      validator(value) {
        if (value !== '000') return '%s%s%s';
      },
    })(['', '%s%s%s'], ['000', 'ok'], ['123', '%s%s%s'], ['^_^', '%s%s%s']);
  });
});
