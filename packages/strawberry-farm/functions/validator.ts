class ValidationError extends Error {}

const validator = () => {};

const descriptor = {
  address: 'string',
  name: {
    string: true,
    required: true,
  },
  order: {
    number: [, 5],
    number2: [5, null],
  },
  negative: {
    number: [0, 1],
  },
  type: {
    enum: ['a', 'b', 'c'],
    validator() {
      return Promise.resolve(true);
    },
  },
  nesting: {
    fields: {},
    validator(value: Object) {
      return typeof value === 'object';
    },
  },
};
