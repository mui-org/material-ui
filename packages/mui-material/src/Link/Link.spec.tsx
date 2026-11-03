import * as React from 'react';
import { expectType } from '@mui/types';
import type { LinkProps } from '@mui/material/Link';
import Link from '@mui/material/Link';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: LinkProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: LinkProps = {
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLAnchorElement>, typeof event>(event);
  },
};

const props3: LinkProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '1',
  numberProp: 2,
};

const props4: LinkProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error CustomComponent does not accept incorrectProp
  incorrectProp: 3,
};

// @ts-expect-error missing props
const props5: LinkProps<typeof CustomComponent> = {
  component: CustomComponent,
};

<Link
  ref={(elem) => {
    expectType<HTMLAnchorElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;

<Link
  component="button"
  ref={(elem) => {
    expectType<HTMLButtonElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;

<Link
  component="button"
  ref={(elem: HTMLButtonElement | null) => {
    expectType<HTMLButtonElement | null, typeof elem>(elem);
  }}
>
  Home
</Link>;
