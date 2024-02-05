import { describe, it, expect } from 'vitest';
import { Rules, validate } from '../validator';

/**
 * NN: Not Nullish
 */
const cc: Record<string, any> = {
  Any1: [],
  Any2: {},
  Any3: { message: 'foo' },
  Any4: { required: false, message: 'foo' },
  Any5: 'foo',
  Any6: ['foo', 'bar'],
  AnyNN1: 'required',
  AnyNN2: ['required'],
  AnyNN3: { required: true },
  AnyNN4: [{ required: true }, 'required', 'required'],
  AnyNNC1: { required: 'foo' },
  AnyNNC2: { required: true, message: 'foo' },
  AnyNNC3: [{ required: true, message: 'foo' }, 'required', 'required'],
  //
  String1: 'string',
  String2: ['string'],
  String3: { type: 'string' },
  String4: [{ type: 'string' }, 'string'],
  StringNN1: ['string', 'required'],
  StringNN2: [{ type: 'string', required: true }],
  StringNN3: [{ type: 'string', required: true }, 'string', 'required'],
  StringNN4: [{ required: true }, 'string'],
  StringNN5: ['required', { type: 'string' }],
  StringC1: { type: 'string', message: 'foo' },
  StringC2: [{ type: 'string' }, 'foo'],
  StringC3: [{ type: 'string' }, { message: 'foo' }],
  StringNNC: { type: 'string', required: 'foo' },
  StringCNNC: { string: 'foo', required: 'bar' },
  StringExact: { type: 'string', config: 3 },
  StringExact2: { type: 'string', config: [3, 3] },
  StringExactNN1: { type: 'string', config: [3, 3], required: true },
  StringExactNN2: [{ type: 'string' }, { config: [3, 3] }, { required: true }],
  StringExactNNC1: [
    { type: 'string' },
    { config: [3, 3] },
    { required: true },
    'foo',
  ],
  StringExactNNC2: [
    { type: 'string' },
    { config: [3, 3] },
    { required: true },
    { message: 'foo' },
  ],
  StringExactNNC3: ['string', 'required', [3, 3], 'foo'],
  StringMin: { type: 'string', config: [3] },
  StringMax: { type: 'string', config: [, 10] },
  StringRange1: { type: 'string', config: [3, 10] },
  StringRange2: { type: 'string', config: [-Infinity, Infinity] },
  StringRangeC1: { type: 'string', config: [3, 10], message: 'foo' },
  StringRangeC2: [
    { type: 'string', config: true, message: 'foo' },
    { type: 'string', config: [3, 10], message: 'bar' },
  ],
  StringRangeC3: [
    { string: 'foo', required: 'duang' },
    { string: [3, 10], message: 'bar' },
  ],
  //
  'Number Nullish Literal': 'number',
  'Number Type Required': ['number', 'required'],
  'Number Min': { number: [3] },
  'Number Max': { number: [, 10] },
  'Number Range': { number: [3, 10] },
  //
  'Formats Email': { email: true },
  'Formats Email Literal': 'email',
  'Formats Email Literal Required': ['email', 'required'],
  //
  'Enum True2': { enum: [true] },
  'Enum True Custom Message': { enum: [true], message: 'message' },
  //
  'Type Restriction': { type: Date },
  //
  'Never Enum': { enum: [] },
  'Never Enum2': { enum: true },
  'Never Empty': {},
  'Never Knot': [{ string: true }, { boolean: true }, { required: true }],
  'Never Knot2': ['string', 'boolean', 'required'],
  'Complex Knot': { string: true, boolean: true, enum: [1, 2, 3] },
};

/**
 * NN: Not Nullish
 */
const rr: Record<string, Rules> = {
  Any1: [],
  Any2: {},
  Any3: { message: 'foo' },
  AnyNN1: 'required',
  AnyNN2: ['required'],
  AnyNN3: { required: true },
  AnyNN4: [{ required: true }, 'required', 'required'],
  AnyNNC1: { required: 'foo' },
  AnyNNC2: { required: true, message: 'foo' },
  AnyNNC3: [{ required: true, message: 'foo' }, 'required', 'required'],
  //
  String1: 'string',
  String2: ['string'],
  String3: { string: true },
  String4: [{ string: true }, 'string'],
  StringNN1: ['string', 'required'],
  StringNN2: [{ string: true, required: true }],
  StringNN3: [{ string: true, required: true }, 'string', 'required'],
  StringNN4: [{ required: true }, 'string'],
  StringNN5: ['required', { string: true }],
  StringC: { string: true, message: 'foo' },
  StringNNC: { string: true, required: 'foo' },
  StringCNNC: { string: 'foo', required: 'bar' },
  StringExact: { string: 3 },
  StringExact2: { string: [3, 3] },
  StringMin: { string: [3] },
  StringMax: { string: [, 10] },
  StringRange1: { string: [3, 10] },
  StringRange2: { string: [-Infinity, Infinity] },
  StringRangeC1: { string: [3, 10], message: 'foo' },
  StringRangeC2: [
    { string: true, message: 'foo' },
    { string: [3, 10], message: 'bar' },
  ],
  StringRangeC3: [
    { string: 'foo', required: 'duang' },
    { string: [3, 10], message: 'bar' },
  ],
  //
  'Number Nullish Literal': 'number',
  'Number Type Required': ['number', 'required'],
  'Number Min': { number: [3] },
  'Number Max': { number: [, 10] },
  'Number Range': { number: [3, 10] },
  //
  'Formats Email': { email: true },
  'Formats Email Literal': 'email',
  'Formats Email Literal Required': ['email', 'required'],
  //
  'Enum True2': { enum: [true] },
  'Enum True Custom Message': { enum: [true], message: 'message' },
  //
  'Type Restriction': { type: Date },
  //
  'Never Enum': { enum: [] },
  'Never Enum2': { enum: true },
  'Never Empty': {},
  'Never Knot': [{ string: true }, { boolean: true }, { required: true }],
  'Never Knot2': ['string', 'boolean', 'required'],
  'Complex Knot': { string: true, boolean: true, enum: [1, 2, 3] },
};

describe('vadliator', () => {
  const $ =
    (...rulesss: Rules[]) =>
    (...turples: [any, string][]) => {
      rulesss.forEach(rules =>
        turples.forEach(([v, exp]) => {
          expect(rules).toBeTruthy();
          const { ok, message } = validate(v, rules, 'Dinner');
          expect(ok ? 'ok' : message).toBe(exp);
        }),
      );
    };

  it('validates any', () => {
    $(rr['Any1'], rr['Any2'], rr['Any3'])(
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

  it('validates not nullish', () => {
    $(rr['AnyNN1'], rr['AnyNN2'], rr['AnyNN3'], rr['AnyNN4'])(
      [0, 'ok'],
      [false, 'ok'],
      ['', 'ok'],
      [null, 'Dinner 是必填项'],
      [undefined, 'Dinner 是必填项'],
      [[], 'ok'],
      [[[]], 'ok'],
    );
    $(rr['AnyNNC1'], rr['AnyNNC2'], rr['AnyNNC3'])(
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
    $(rr['String1'], rr['String2'], rr['String3'], rr['String4'])(
      [0, 'Dinner 必须为字符类型'],
      [[], 'Dinner 必须为字符类型'],
      ['', 'ok'],
      ['  ', 'ok'],
      ['\n', 'ok'],
      ['  zoo', 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
    );

    $(
      rr['StringNN1'],
      // rr['StringNN2'],
      // rr['StringNN3'],
      // rr['StringNN4'],
      // rr['StringNN5'],
    )(
      [0, 'Dinner 必须为字符类型'],
      [[], 'Dinner 必须为字符类型'],
      ['', 'Dinner 是必填项'],
      // ['  ', 'ok'],
      // ['\n', 'ok'],
      // ['  zoo', 'ok'],
      // [null, 'ok'],
      // [undefined, 'ok'],
    );
    // $(
    //   rr['StringNN1'],
    //   rr['StringNN2'],
    //   rr['StringNN3'],
    //   rr['StringNN4'],
    //   rr['StringNN5'],
    // )(
    //   [0, 'Dinner 必须为字符类型'],
    //   [[], 'Dinner 必须为字符类型'],
    //   ['', 'Dinner 是必填项'],
    //   ['  zoo', 'ok'],
    //   [null, 'Dinner 是必填项'],
    //   [undefined, 'Dinner 是必填项'],
    // );

    // $(rr['StringC'])(
    //   [0, 'foo'],
    //   [[], 'foo'],
    //   ['', 'Dinner 是必填项'],
    //   ['  zoo', 'ok'],
    //   [null, 'Dinner 是必填项'],
    //   [undefined, 'Dinner 是必填项'],
    // );
  });
});
