import type * as React from 'react';
import type { DistributiveOmit, OverridableTypeMap } from '@mui/types';

/**
 * A component whose root component can be controlled explicitly with a generic type parameter.
 * Adjusts valid props based on the type of `RootComponent`.
 *
 * @template TypeMap The interface the defines the props and a default root element of the component.
 */
export type PolymorphicComponent<TypeMap extends OverridableTypeMap> = {
  <RootComponent extends React.ElementType = TypeMap['defaultComponent']>(
    props: PolymorphicProps<TypeMap, RootComponent>,
  ): React.JSX.Element | null;
  propTypes?: any;
  displayName?: string | undefined;
};

/**
 * Own props of the component augmented with props of the root component.
 */
export type PolymorphicProps<
  TypeMap extends OverridableTypeMap,
  RootComponent extends React.ElementType,
> = TypeMap['props'] &
  DistributiveOmit<React.ComponentPropsWithRef<RootComponent>, keyof TypeMap['props']>;
