import { describe, it, expect } from 'vitest';
import { Rules, validate } from '../validator';

const rr: Record<string, Rules> = {
  any: [],
  AnyNN: 'required',
  AnyNN2: ['required'],
  AnyNN3: { required: true },
  //
  'String Nullish Literal': 'string',
  'String Literal': ['string', 'required'],
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
  const $ = (rules: Rules, ...turples: [any, string][]) => {
    expect(rules).toBeTruthy();
    turples.forEach(([v, exp]) => {
      const [, message] = validate(v, rules, 'Dinner');
      expect(message ?? 'ok').toBe(exp);
    });
  };

  it('validates any', () => {
    $(
      rr['any'],
      //
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

  it('Validates Any Not Nullish', () => {
    const [ok] = validate(null, ['required'], 'Dinner');

    $(
      rr['AnyNN'],
      //
      [0, 'ok'],
      [false, 'ok'],
      ['', 'Dinner 必填'],
      [null, 'Dinner 必填'],
      [undefined, 'Dinner 必填'],
      [[], 'Dinner 必填'],
      [[[]], 'ok'],
    );
    $(
      rr['AnyNN2'],
      //
      [0, 'ok'],
      [false, 'ok'],
      ['', 'Dinner 必填'],
      [null, 'Dinner 必填'],
      [undefined, 'Dinner 必填'],
      [[], 'Dinner 必填'],
      [[[]], 'ok'],
    );
    $(
      rr['AnyNN3'],
      //
      [0, 'ok'],
      [false, 'ok'],
      ['', 'Dinner 必填'],
      [null, 'Dinner 必填'],
      [undefined, 'Dinner 必填'],
      [[], 'Dinner 必填'],
      [[[]], 'ok'],
    );
  });
});
