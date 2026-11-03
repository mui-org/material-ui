import * as React from 'react';
import { expectType } from '@mui/types';
import type { MenuItemProps } from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: MenuItemProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: MenuItemProps = {
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLLIElement>, typeof event>(event);
  },
};

const props3: MenuItemProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
};

const props4: MenuItemProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error CustomComponent does not accept incorrectProp
  incorrectProp: 3,
};

// @ts-expect-error missing props
const props5: MenuItemProps<typeof CustomComponent> = {
  component: CustomComponent,
};

const TestComponent = () => {
  return (
    <React.Fragment>
      <MenuItem />
      <MenuItem component={'a'} href="/test" />

      <MenuItem component={CustomComponent} stringProp="s" numberProp={1} />
      {
        // @ts-expect-error missing props
        <MenuItem component={CustomComponent} />
      }
      <MenuItem
        onChange={(event) => {
          expectType<React.ChangeEvent<HTMLLIElement>, typeof event>(event);
        }}
      />
      <MenuItem
        component="span"
        onChange={(event) => {
          expectType<React.ChangeEvent<HTMLSpanElement>, typeof event>(event);
        }}
      />
      <MenuItem component={Link} />
    </React.Fragment>
  );
};
