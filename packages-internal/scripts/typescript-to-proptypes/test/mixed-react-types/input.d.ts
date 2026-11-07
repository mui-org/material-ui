import * as React from 'react';

export interface Props {
  elementOrType: React.ReactElement | React.ElementType;
  nullableElementOrType: React.ReactElement | React.ElementType | null;
  optionalElementOrType?: React.ReactElement | React.ElementType;
  stringOrElement: string | React.ReactElement | null;
  slots?: {
    elementOrType?: React.ReactElement | React.ElementType | null;
    stringOrElement?: string | React.ReactElement | null;
  };
}

export default function Component(props: Props): React.JSX.Element;
