import * as React from 'react';
import { expectType } from '@mui/types';
import type { FormHelperTextProps } from '@mui/material/FormHelperText';
import FormHelperText from '@mui/material/FormHelperText';

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

const props1: FormHelperTextProps<'div'> = {
  component: 'div',
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLDivElement>, typeof event>(event);
  },
};

const props2: FormHelperTextProps = {
  onChange: (event) => {
    expectType<React.ChangeEvent<HTMLParagraphElement>, typeof event>(event);
  },
};

const props3: FormHelperTextProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
};

const props4: FormHelperTextProps<typeof CustomComponent> = {
  component: CustomComponent,
  stringProp: '2',
  numberProp: 2,
  // @ts-expect-error CustomComponent does not accept incorrectProp
  incorrectProp: 3,
};

// @ts-expect-error missing props
const props5: FormHelperTextProps<typeof CustomComponent> = {
  component: CustomComponent,
};

const TestComponent = () => {
  return (
    <React.Fragment>
      <FormHelperText />
      <FormHelperText component={'a'} href="/test" />

      <FormHelperText component={CustomComponent} stringProp="s" numberProp={1} />
      {
        // @ts-expect-error missing props
        <FormHelperText component={CustomComponent} />
      }
      <FormHelperText
        component="span"
        onChange={(event) => {
          expectType<React.ChangeEvent<HTMLSpanElement>, typeof event>(event);
        }}
      />
    </React.Fragment>
  );
};
