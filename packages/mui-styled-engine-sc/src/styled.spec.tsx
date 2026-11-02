import * as React from 'react';
import type { CreateMUIStyled, StyledComponent } from '@mui/styled-engine-sc';

interface Theme {
  palette: {
    primary: string;
  };
}

interface MuiStyledCommonProps {
  theme?: Theme;
  as?: React.ElementType;
  sx?: {
    mt?: number;
  };
}

interface MuiStyledOptions {
  name?: string;
}

declare const styled: CreateMUIStyled<MuiStyledCommonProps, MuiStyledOptions, Theme>;

interface ButtonProps {
  color?: 'primary' | 'secondary';
  variant?: 'text' | 'outlined';
}

function Button(props: ButtonProps) {
  return <button type="button" {...props} />;
}

const StyledButton = styled(Button)({});
const ExtendedButton = styled(StyledButton)({});

<ExtendedButton color="primary" variant="outlined" sx={{ mt: 1 }} />;

// @ts-expect-error invalid variant
<ExtendedButton variant="outline" />;

const FilteredExtendedButton = styled(StyledButton, {
  shouldForwardProp: (prop): prop is 'color' | 'variant' => prop === 'color' || prop === 'variant',
})({});

<FilteredExtendedButton color="primary" variant="outlined" sx={{ mt: 1 }} />;

// @ts-expect-error invalid variant
<FilteredExtendedButton variant="outline" />;

declare const ButtonWithAttrs: StyledComponent<
  'button',
  Theme,
  { requiredByBase: string },
  'requiredByBase'
>;

<ButtonWithAttrs />;

const ExtendedButtonWithAttrs = styled(ButtonWithAttrs)({});

// @ts-expect-error attrs prop must keep its type
<ExtendedButtonWithAttrs requiredByBase={123} />;
