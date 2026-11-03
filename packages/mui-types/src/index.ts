import type * as React from 'react';

// disable automatic export
export {};

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
export type ConsistentWith<DecorationTargetProps, InjectedProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P];
};

/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
export type PropInjector<InjectedProps, AdditionalProps = {}> = <
  C extends React.JSXElementConstructor<ConsistentWith<React.ComponentProps<C>, InjectedProps>>,
>(
  component: C,
) => React.JSXElementConstructor<
  DistributiveOmit<
    React.JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof InjectedProps
  > &
    AdditionalProps
>;

/**
 * Remove properties `K` from `T`.
 * Distributive for union types.
 *
 * @internal
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

/**
 * Generate a set of string literal types from the default key union `T` and
 * override record `U`.
 *
 * If the property value was `true`, the property key will be added to the
 * string union.
 *
 * @internal
 */
export type OverridableStringUnion<T extends string, U = {}> = GenerateStringUnion<
  Overwrite<Record<T, true>, U>
>;

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */
export type Overwrite<T, U> = DistributiveOmit<T, keyof U> & U;

type GenerateStringUnion<T> = Extract<
  {
    [Key in keyof T]: true extends T[Key] ? Key : never;
  }[keyof T],
  string
>;

// https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same
export type IfEquals<T, U, Y = unknown, N = never> =
  (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? Y : N;

/**
 * Issues a type error if `Expected` is not identical to `Actual`.
 *
 * `Expected` should be declared when invoking `expectType`.
 * `Actual` should almost always we be a `typeof value` statement.
 *
 * @example `expectType<number | string, typeof value>(value)`
 * TypeScript issues a type error since `value is not assignable to never`.
 * This means `typeof value` is not identical to `number | string`
 * @param actual
 */
export declare function expectType<Expected, Actual>(
  actual: IfEquals<Actual, Expected, Actual>,
): void;

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  // If you make any changes to this interface, please make sure to update the
  // `OverridableComponent` type in `mui-material/src/OverridableComponent.d.ts` as well.
  // Also, there are types in Base UI that have a similar shape to this interface
  // (for example SelectType, OptionType, etc.).
  <C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<M, C>,
  ): React.JSX.Element | null;
  (props: DefaultComponentProps<M>): React.JSX.Element | null;
  propTypes?: any;
}

/**
 * Props of the component if `component={Component}` is used.
 */
// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = (
  & BaseProps<M>
  & DistributiveOmit<React.ComponentPropsWithRef<C>, keyof BaseProps<M>>
);

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
export type DefaultComponentProps<M extends OverridableTypeMap> =
  & BaseProps<M>
  & DistributiveOmit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>;

/**
 * Props defined on the component.
 */
// prettier-ignore
export type BaseProps<M extends OverridableTypeMap> = M['props'];

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}

/**
 * Simplifies the display of a type (without modifying it).
 * Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */
export type Simplify<T> = T extends Function ? T : { [K in keyof T]: T[K] };

/**
 * Changes the properties K from T to required
 */
export type PartiallyRequired<T, K extends keyof T> = DistributiveOmit<T, K> & {
  [P in K]-?: T[P];
};
