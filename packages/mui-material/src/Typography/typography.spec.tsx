import * as React from 'react';
import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';

const typographyTest = () => {
  const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
    return <div />;
  };

  const CustomComponent2 = ({
    maxLines,
    ...props
  }: TypographyProps & {
    maxLines?: number;
  }): React.JSX.Element => {
    return (
      <Typography
        {...props}
        sx={{
          display: maxLines === 0 ? 'block' : '-webkit-box',
        }}
      />
    );
  };

  return (
    <div>
      <Typography />
      <CustomComponent2 component="span" />
      <CustomComponent2 component="div" />
      <Typography align="inherit" sx={{ color: 'inherit' }} />
      <Typography align="left" sx={{ color: 'initial' }} />
      <Typography align="right" color="primary" sx={{ display: 'initial' }} />
      <Typography align="justify" color="secondary" sx={{ display: 'initial' }} />
      <Typography align="inherit" sx={{ color: 'text.primary' }} />
      <Typography align="inherit" color="textSecondary" />
      <Typography align="inherit" color="textDisabled" />
      <Typography align="inherit" color="error" />
      <Typography sx={{ display: 'block' }} />
      <Typography component="a" href="url" sx={{ display: 'block' }} />
      <Typography component="label" htmlFor="html" sx={{ display: 'block' }} />
      {/* @ts-expect-error: Anchor elements do not support incorrectAttribute. */}
      <Typography component="a" incorrectAttribute="url" />
      {/* @ts-expect-error: incorrectComponent is not a valid intrinsic element. */}
      <Typography component="incorrectComponent" href="url" />
      {/* @ts-expect-error: The div root does not support href. */}
      <Typography component="div" href="url" />
      {/* @ts-expect-error: The default root does not support href. */}
      <Typography href="url" />
      <Typography component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error: CustomComponent does not declare an id prop. */}
      <Typography component={CustomComponent} prop1="1" prop2={12} id="1" />
      {/* @ts-expect-error: CustomComponent requires prop2. */}
      <Typography component={CustomComponent} prop1="1" />
      {/* @ts-expect-error: CustomComponent requires a numeric prop2. */}
      <Typography component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};
