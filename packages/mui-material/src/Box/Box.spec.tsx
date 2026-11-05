import type { Box as SystemBox, BoxProps as SystemBoxProps } from '@mui/system';
import { createBox } from '@mui/system';
import { expectType } from '@mui/types';
import type { BoxProps as MaterialBoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';

function ThemeValuesCanBeSpread() {
  <Box
    sx={(theme) => ({
      ...theme.typography.body1,
      color: theme.palette.primary.main,
    })}
  />;
  <Box
    sx={(theme) => ({
      ...theme.mixins.toolbar,
      color: theme.palette.primary.main,
    })}
  />;
  <Box
    sx={(theme) => ({
      ...theme.mixins.toolbar,
      color: 'primary.main',
    })}
  />;
}

// Compatibility with Material UI's Box
const defaultTheme = createTheme({});
const CustomBox = createBox({ defaultTheme });
expectType<typeof Box, typeof CustomBox>(CustomBox);

expectType<typeof SystemBox, typeof CustomBox>(CustomBox);

function ColorTest() {
  <Box
    sx={(theme) => ({
      color: theme.vars.palette.common.black,
      backgroundColor: theme.vars.palette.background.default,
    })}
  />;
}

function ComponentTest() {
  return <span />;
}

expectType<SystemBoxProps['component'], MaterialBoxProps['component']>('span');
expectType<SystemBoxProps['component'], MaterialBoxProps['component']>(ComponentTest);
