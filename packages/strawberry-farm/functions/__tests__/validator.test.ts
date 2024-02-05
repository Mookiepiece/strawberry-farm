import { describe, it, expect } from 'vitest';
import { IRuleType, RuleS, validate, defineRule } from '../validator';

const d = defineRule;

/**
 * NN: Not Nullish
 *
 * C: Commented
 */
const rr = {
  Any___1: d('any'),
  Any___2: d({}),
  Any___3: d({ message: 'foo' }),
  Any___4: d({ required: false, message: 'foo' }),
  AnyNN_1: d('any!'),
  AnyNN_2: d(['any!']),
  AnyNN_3: d({ required: true }),
  AnyNN_4: d({ type: 'any', required: true }),
  AnyNNC1: d({ required: true, message: 'foo' }),
  //
  // String___1: d('string'),
  // String___2: d(['string']),
  // String___3: d({ type: 'string' }),
  // StringNN_1: d('string!'),
  // StringNN_2: d(['string!']),
  // StringNN_3: d({ type: 'string', required: true }),
  // String__C1: d({ type: 'string', message: 'foo' }),
  // StringNNC1: d({ type: 'string', required: true, message: 'foo' }),
  // StringR__A: d(['string', 3]),
  // StringR__B: d({ type: 'string', config: 3 }),
  // StringR__C: d({ type: 'string', config: [3, 3] }),
  // StringR__D: d({ type: 'string', config: [3] }),
  // StringR__E: d({ type: 'string', config: [, 10] }),
  // StringR__F: d({ type: 'string', config: [3, 10] }),
  // StringRN_1: d(['string!', 3]),
  // StringNN5: ['required', { string: true }],
  // StringC: { type: 'string', message: 'foo' },
  // StringNNC: { type: 'string', required: 'foo' },
  // StringCNNC: { string: 'foo', required: 'bar' },
  // StringExact: { string: 3 },
  // StringExact2: { string: [3, 3] },
  // StringMin: { string: [3] },
  // StringMax: { string: [, 10] },
  // StringRange1: { string: [3, 10] },
  // StringRange2: { string: [-Infinity, Infinity] },
  // StringRangeC1: { string: [3, 10], message: 'foo' },
  // StringRangeC2: [
  //   { string: true, message: 'foo' },
  //   { string: [3, 10], message: 'bar' },
  // ],
  // StringRangeC3: [
  //   { string: 'foo', required: 'duang' },
  //   { string: [3, 10], message: 'bar' },
  // ],
  // //
  // 'Number Nullish Literal': 'number',
  // 'Number Type Required': ['number', 'required'],
  // 'Number Min': { number: [3] },
  // 'Number Max': { number: [, 10] },
  // 'Number Range': { number: [3, 10] },
  // //
  // 'Formats Email': { email: true },
  // 'Formats Email Literal': 'email',
  // 'Formats Email Literal Required': ['email', 'required'],
  // //
  // 'Enum True2': { enum: [true] },
  // 'Enum True Custom Message': { enum: [true], message: 'message' },
  // //
  // 'Type Restriction': { type: Date },
  // //
  // 'Never Enum': { enum: [] },
  // 'Never Enum2': { enum: true },
  // 'Never Empty': {},
  // 'Never Knot': [{ string: true }, { boolean: true }, { required: true }],
  // 'Never Knot2': ['string', 'boolean', 'required'],
  // 'Complex Knot': { string: true, boolean: true, enum: [1, 2, 3] },
};

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
    $(rr.Any___1, rr.Any___2, rr.Any___3)(
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
    $(rr.AnyNN_1, rr.AnyNN_2, rr.AnyNN_3, rr.AnyNN_4)(
      [0, 'ok'],
      [false, 'ok'],
      ['', 'ok'],
      [null, 'Dinner 是必填项'],
      [undefined, 'Dinner 是必填项'],
      [[], 'ok'],
      [[[]], 'ok'],
    );
    $(rr.AnyNNC1)(
      [0, 'ok'],
      [false, 'ok'],
      ['', 'ok'],
      [null, 'foo'],
      [undefined, 'foo'],
      [[], 'ok'],
      [[[]], 'ok'],
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
      ['', 'Dinner 是必填项'],
      ['  ', 'ok'],
      ['\n', 'ok'],
      ['  zoo', 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
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
      // [JSON, 'Dinner 必须为数值类型'],
      // [[undefined], 'Dinner 必须为数值类型'],
      // [{}, 'Dinner 必须为数值类型'],
    );

    // $('number!')(
    //   [0, 'ok'],
    //   [-1.1, 'ok'],
    //   [NaN, 'Dinner 必须为数值类型'],
    //   [Infinity, 'Dinner 必须为数值类型'],
    //   [() => {}, 'Dinner 必须为数值类型'],
    //   [Symbol.iterator, 'Dinner 必须为数值类型'],
    //   [Date, 'Dinner 必须为数值类型'],
    //   [false, 'Dinner 必须为数值类型'],
    //   [true, 'Dinner 必须为数值类型'],
    //   [String, 'Dinner 必须为数值类型'],
    //   ['111', 'Dinner 必须为数值类型'],
    //   ['', 'Dinner 必须为数值类型'],
    //   [null, 'Dinner 必须为数值类型'],
    //   [undefined, 'Dinner 必须为数值类型'],
    //   [JSON, 'Dinner 必须为数值类型'],
    //   [[undefined], 'Dinner 必须为数值类型'],
    //   [{}, 'Dinner 必须为数值类型'],
    // );
  });
});
