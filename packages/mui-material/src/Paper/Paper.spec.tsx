import * as React from 'react';
import { expectType } from '@mui/types';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: PaperProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: PaperProps = {
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props3: PaperProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
};

const props4: PaperProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error CustomComponent does not accept incorrectProp
  incorrectProp: 3,
};

// @ts-expect-error missing props
const props5: PaperProps<typeof CustomComponent> = {
  component: CustomComponent,
};

function PaperTest() {
  return (
    <div>
      <Paper elevation={4} />
      <Paper component="a" href="test" />

      <Paper component={CustomComponent} stringProp="test" numberProp={0} />
      {/* @ts-expect-error missing props */}
      <Paper component={CustomComponent} />
    </div>
  );
}
