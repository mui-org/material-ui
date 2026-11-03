import type * as React from 'react';
import type { DistributiveOmit } from '@mui/types';
import type { StyledComponentProps } from '../styles';

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<TypeMap extends OverridableTypeMap> {
  // If you make any changes to this interface, please make sure to update the
  // `OverridableComponent` type in `mui-types/index.d.ts` as well.
  // Also, there are types in Base UI that have a similar shape to this interface
  // (for example SelectType, OptionType, etc.).
  <RootComponent extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: RootComponent;
    } & OverrideProps<TypeMap, RootComponent>,
  ): React.JSX.Element | null;
  (props: DefaultComponentProps<TypeMap>): React.JSX.Element | null;
  propTypes?: any;
}

/**
 * Props of the component if `component={Component}` is used.
 */
// prettier-ignore
export type OverrideProps<
  TypeMap extends OverridableTypeMap,
  RootComponent extends React.ElementType
> = (
  & BaseProps<TypeMap>
  & DistributiveOmit<React.ComponentPropsWithRef<RootComponent>, keyof BaseProps<TypeMap>>
);

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
export type DefaultComponentProps<TypeMap extends OverridableTypeMap> =
  & BaseProps<TypeMap>
  & DistributiveOmit<React.ComponentPropsWithRef<TypeMap['defaultComponent']>, keyof BaseProps<TypeMap>>;

/**
 * Props defined on the component (+ common material-ui props).
 */
// prettier-ignore
export type BaseProps<TypeMap extends OverridableTypeMap> =
  & TypeMap['props']
  & CommonProps;

/**
 * Props that are valid for material-ui components.
 */
// each component declares it's classes in a separate interface for proper JSDoc.
export interface CommonProps extends StyledComponentProps<never> {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}
