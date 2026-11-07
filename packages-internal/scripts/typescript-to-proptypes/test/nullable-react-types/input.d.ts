import * as React from 'react';

export interface Props {
  optionalConstructor?: React.JSXElementConstructor<any> | null | undefined;
  optionalComponent?: React.ComponentType | null | undefined;
  optionalElementType?: React.ElementType | null | undefined;
  optionalElement?: React.ReactElement | null | undefined;
  nullableConstructor: React.JSXElementConstructor<any> | null;
  nullableComponent: React.ComponentType | null;
  nullableElementType: React.ElementType | null;
  nullableElement: React.ReactElement | null;
  requiredConstructor: React.JSXElementConstructor<any>;
  requiredComponent: React.ComponentType;
  requiredElementType: React.ElementType;
  requiredElement: React.ReactElement;
  undefinedConstructor: React.JSXElementConstructor<any> | undefined;
  undefinedComponent: React.ComponentType | undefined;
  undefinedElementType: React.ElementType | undefined;
  undefinedElement: React.ReactElement | undefined;
  slots?: {
    constructor?: React.JSXElementConstructor<any> | null | undefined;
    component?: React.ComponentType | null | undefined;
    elementType?: React.ElementType | null | undefined;
    element?: React.ReactElement | null | undefined;
  };
}

export default function Component(props: Props): React.JSX.Element;
