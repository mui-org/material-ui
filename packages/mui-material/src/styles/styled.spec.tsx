/* eslint-disable mui/material-ui-no-empty-box */
import * as React from 'react';
import MuiPaper from '@mui/material/Paper';
import { styled, css, ThemeProvider, createTheme } from '@mui/material/styles';

const Box = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const SimpleBox = styled('div')``;

function SxTestSimpleBox() {
  <SimpleBox sx={{ p: [2, 3, 4] }} />;
}

function SxTest() {
  <Box sx={{ p: [2, 3, 4] }} />;
}

function WorksWithNoTheme() {
  <Box />;
}

const StyledToolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const StyledSpan = styled('span')(({ theme }) => ({
  ...theme.typography.body1,
}));

const Container = styled('div')<{ $heightLimit: boolean }>`
  min-width: 0;

  ${({ $heightLimit }) =>
    $heightLimit &&
    css`
      background: red;
      height: 10vh;
    `}
`;

// https://github.com/mui/material-ui/issues/28844
interface PropsFooVariant {
  variant: 'foo';
}
interface PropsBarVariant {
  variant: 'bar';
}
function Component(props: PropsFooVariant | PropsBarVariant) {
  return <div />;
}
const StyledComponent = styled(Component)(({ theme }) => ({}));
const rendered = (
  <React.Fragment>
    <StyledComponent variant="foo" />
    <StyledComponent variant="bar" />
  </React.Fragment>
);
/**
 * ===================================================================
 */

/**
 * Test styleOverrides callback types
 */
interface ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: 'primary';
  variant?: 'contained';
}

const ButtonRoot = styled('button', {
  name: 'MuiButton',
  slot: 'Root',
})<{ ownerState: ButtonProps }>({});

const ButtonIcon = styled('span', {
  name: 'MuiButton',
  slot: 'Icon',
})<{ ownerState: ButtonProps }>({});

function Button({
  children,
  startIcon,
  endIcon,
  color = 'primary',
  variant = 'contained',
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  const ownerState = { startIcon, endIcon, color, variant, ...props };
  return (
    <ButtonRoot ownerState={ownerState}>
      {startIcon && <ButtonIcon ownerState={ownerState}>{startIcon}</ButtonIcon>}
      {children}
      {endIcon && <ButtonIcon ownerState={ownerState}>{endIcon}</ButtonIcon>}
    </ButtonRoot>
  );
}

<ThemeProvider
  theme={createTheme({
    typography: {
      button: {
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const { color, variant } = ownerState;
            const styles = [];
            if (color === 'primary') {
              styles.push({
                width: 120,
                height: 48,
              });
            }
            if (variant === 'contained') {
              styles.push(theme.typography.button);
            }
            return styles;
          },
          startIcon: ({ ownerState: { startIcon, endIcon } }) => [
            !!startIcon && { marginRight: 8 },
            !!endIcon && { marginLeft: 8 },
          ],
        },
      },
      MuiSlider: {
        styleOverrides: {
          mark: (props) => ({
            ...(props['data-index'] === 0 && {}),
          }),
          thumb: ({ theme }) =>
            theme.unstable_sx({
              p: 1,
            }),
          track: ({ ownerState, theme }) => [
            theme.unstable_sx({ height: 10 }),
            ownerState.orientation === 'vertical' &&
              theme.unstable_sx({
                my: 2,
              }),
          ],
        },
      },
    },
  })}
>
  <Button color="primary" variant="contained" startIcon="foo">
    Hello
  </Button>
</ThemeProvider>;

function variantsAPI() {
  const ObjectSyntax = styled('div')<{ foo?: string; bar?: number }>({
    variants: [
      {
        props: { foo: 'a' },
        style: { color: 'blue' },
      },
    ],
  });

  const FunctionSyntax = styled('div')<{ foo?: string; bar?: number }>(() => ({
    variants: [
      {
        props: { foo: 'a' },
        style: { color: 'blue' },
      },
    ],
  }));

  const WrongUsage = styled('div')<{ foo?: string; bar?: number }>({
    // @ts-expect-error the API is not valid for CSS properties
    color: [
      {
        props: { foo: 'a' },
        style: { color: 'blue' },
      },
    ],
  });
}

type PickerOrientation = 'portrait' | 'landscape';

type PickerVariant = 'mobile' | 'desktop';

interface PickerOwnerState {
  isPickerValueEmpty: boolean;
  isPickerOpen: boolean;
  isPickerDisabled: boolean;
  isPickerReadOnly: boolean;
  pickerVariant: PickerVariant;
  pickerOrientation: PickerOrientation;
}

interface PickerToolbarOwnerState extends PickerOwnerState {
  toolbarDirection: 'ltr' | 'rtl';
}

const DateTimePickerToolbarTimeContainer = styled('div', {
  name: 'MuiDateTimePickerToolbar',
  slot: 'TimeContainer',
})<{ ownerState: PickerToolbarOwnerState; toolbarVariant: PickerVariant }>({
  display: 'flex',
  flexDirection: 'row',
  variants: [
    {
      props: { toolbarDirection: 'rtl' },
      style: {
        flexDirection: 'row-reverse',
      },
    },
    {
      props: { toolbarVariant: 'desktop', pickerOrientation: 'portrait' },
      style: {
        gap: 9,
        marginRight: 4,
        alignSelf: 'flex-end',
      },
    },
    {
      props: ({ pickerOrientation, toolbarVariant }) =>
        pickerOrientation === 'landscape' && toolbarVariant !== 'desktop',
      style: {
        flexDirection: 'column',
      },
    },
    {
      props: ({ pickerOrientation, toolbarVariant, toolbarDirection }) =>
        pickerOrientation === 'landscape' &&
        toolbarVariant !== 'desktop' &&
        toolbarDirection === 'rtl',
      style: {
        flexDirection: 'column-reverse',
      },
    },
  ],
});

interface PickerPopperOwnerState extends PickerOwnerState {
  popperPlacement:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end'
    | 'auto'
    | 'auto-start'
    | 'auto-end';
}

const PickerPopperPaper = styled(MuiPaper, {
  name: 'MuiPickerPopper',
  slot: 'Paper',
})<{
  ownerState: PickerPopperOwnerState;
}>({
  outline: 0,
  transformOrigin: 'top center',
  variants: [
    {
      props: ({ popperPlacement }) => new Set(['top', 'top-start', 'top-end']).has(popperPlacement),
      style: {
        transformOrigin: 'bottom center',
      },
    },
  ],
});
