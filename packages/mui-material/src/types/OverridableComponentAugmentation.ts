import type * as React from 'react';
import type { DistributiveOmit } from '@mui/types';

declare module '@mui/material/OverridableComponent' {
  /**
   * A component whose root component can be controlled via a `component` prop.
   *
   * Adjusts valid props based on the type of `component`.
   */
  interface OverridableComponent<TypeMap extends OverridableTypeMap> {
    <DefaultComponent extends React.ElementType>(
      props: {
        /**
         * The component used for the root node.
         * Either a string to use a HTML element or a component.
         */
        component: DefaultComponent;
      } & OverridePropsVer2<TypeMap, DefaultComponent>,
    ): React.JSX.Element;
    (props: DefaultComponentPropsVer2<TypeMap>): React.JSX.Element;
  }

  /**
   * Props of the component if `component={Component}` is used.
   */
  // prettier-ignore
  type OverridePropsVer2<
    TypeMap extends OverridableTypeMap,
    RootComponent extends React.ElementType,
  > = (
    & BaseProps<TypeMap>
    & DistributiveOmit<React.ComponentPropsWithoutRef<RootComponent>, keyof BaseProps<TypeMap>>
    & { ref?: (React.Ref<Element>) | undefined }
  );

  /**
   * Props if `component={Component}` is NOT used.
   */
  // prettier-ignore
  type DefaultComponentPropsVer2<TypeMap extends OverridableTypeMap> = 
    & BaseProps<TypeMap>
    & DistributiveOmit<React.ComponentPropsWithoutRef<TypeMap['defaultComponent']>, keyof BaseProps<TypeMap>>
    & { ref?: (React.Ref<Element>) | undefined };
}
