import { describe, it, expect } from 'vitest';
import { Rules, validate } from '../validator';

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
  'String Custom Message': { string: true, message: 'message' },
  'String Custom Message Short': { string: 'true' },
  'String Not Nullish': { string: true, required: true },
  'String Not Nullish2': [{ string: true }, { required: true }],
  'String Not Nullish Custom Message': { string: 'true', required: 'required' },
  'String Min': { string: [3] },
  'String Max': { string: [, 10] },
  'String Range': { string: [3, 10] },
  'String Range With Custom Message': [{ string: [3, 10], message: 'message' }],
  'String Individual Custom Message For Type And Range Not Supported': [
    { string: true, message: 'S' },
    { string: [3, 10], message: 'OOM' },
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
      ['', 'Dinner 是必填项'],
      [null, 'Dinner 是必填项'],
      [undefined, 'Dinner 是必填项'],
      [[], 'ok'],
      [[[]], 'ok'],
    );
    $(rr['AnyNNC1'], rr['AnyNNC2'], rr['AnyNNC3'])(
      [0, 'ok'],
      [false, 'ok'],
      ['', 'foo'],
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
      ['  zoo', 'ok'],
      [null, 'ok'],
      [undefined, 'ok'],
    );
    $(
      rr['StringNN1'],
      rr['StringNN2'],
      rr['StringNN3'],
      rr['StringNN4'],
      rr['StringNN5'],
    )(
      [0, 'Dinner 必须为字符类型'],
      [[], 'Dinner 必须为字符类型'],
      ['', 'Dinner 是必填项'],
      ['  zoo', 'ok'],
      [null, 'Dinner 是必填项'],
      [undefined, 'Dinner 是必填项'],
    );
  });
});
