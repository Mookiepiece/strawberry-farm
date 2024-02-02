# Validator

一个简化的 `yiminghe/async-validator`。

以下为 [Angular 的默认校验器](https://angular.io/api/forms/Validators)

```ts
class Validators {
  static min(min: number): ValidatorFn
  static max(max: number): ValidatorFn
  static required(control: AbstractControl<any, any>): ValidationErrors | null
  static requiredTrue(control: AbstractControl<any, any>): ValidationErrors | null
  static email(control: AbstractControl<any, any>): ValidationErrors | null
  static minLength(minLength: number): ValidatorFn
  static maxLength(maxLength: number): ValidatorFn
  static pattern(pattern: string | RegExp): ValidatorFn
  static nullValidator(control: AbstractControl<any, any>): ValidationErrors | null
  static compose(validators: ValidatorFn[]): ValidatorFn | null
  static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
}
```

### Type

- `string`: Must be of type `string`. `This is the default type.`
  - `string`: Custom error message.
  - `number`: same as `[number, number]` below.
  - `[number, number]`: Turple that repesents min(or minLength) and max(or minLength), passing undefined to skip one of them.
  - `RegExp`: Match pattern.
- `number`: Must be of type `number`.
  - `string`: Custom error message.
  - `number`: same as `[number, number]` below.
  - `[number, number]`: Turple that repesents min(or minLength) and max(or minLength), passing undefined to skip one of them.
- `boolean`: Must be of type `boolean`.
  - `string`: Custom error message.
- `array`: Must be an array as determined by `Array.isArray`.
- `object`: Must be of type `object` and not   `Array.isArray`.
- `enum`: Value must exist in the `enum`.
  - `any[]`: 
- `date`: Value must be valid as determined by `Date`
- `url`: Must be of type `url`.
- `hex`: Must be of type `hex`.
- `email`: Must be of type `email`.
- `any`: Can be any type.

