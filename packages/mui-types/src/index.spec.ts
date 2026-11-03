import { expectType } from '.';
import type { OverridableStringUnion } from '.';

function expectTypeTypes() {
  // it rejects assignability to `any`
  function onClick(event: any) {
    // @ts-expect-error: expectType rejects any when an exact MouseEvent type is required.
    expectType<MouseEvent, typeof event>(event);
  }
}

function overridableStringUnionTests() {
  // @ts-expect-error Numeric values are not valid string-union members.
  type InvalidUnion = OverridableStringUnion<'a' | 1>;
}

declare const base: OverridableStringUnion<'a' | 'b'>;
expectType<'a' | 'b', typeof base>(base);

declare const overridden: OverridableStringUnion<'a' | 'b', { b: false; c: true }>;
expectType<'a' | 'c', typeof overridden>(overridden);
