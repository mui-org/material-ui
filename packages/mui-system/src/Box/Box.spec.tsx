import { Box, styled } from '@mui/system';

interface TestProps {
  test?: string;
}

function Test(props: TestProps) {
  const { test, ...other } = props;
  return <span {...other}>{test}</span>;
}

function ResponsiveTest() {
  <Box sx={{ p: [2, 3, 4] }} />;
  <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }} />;
  <Box sx={{ fontSize: [12, 18, 24] }}>Array API</Box>;
  <Box
    sx={{
      fontSize: {
        xs: 12,
        sm: 18,
        md: 24,
      },
    }}
  >
    Object API
  </Box>;
}

function GapTest() {
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flex: '1 0',
      gap: '16px',
    }}
  >
    Gap
  </Box>;
}

function ComponentPropTest() {
  <Box component="img" src="https://mui.com/" alt="Material UI" />;
  <Box component={Test} test="Test string" />;
}

function ThemeCallbackTest() {
  <Box sx={{ background: (theme) => theme.palette.primary.main }} />;
  <Box sx={{ '&:hover': (theme) => ({ background: theme.palette.primary.main }) }} />;
  <Box sx={{ '& .some-class': (theme) => ({ background: theme.palette.primary.main }) }} />;
  <Box sx={{ maxWidth: (theme) => theme.breakpoints.values.sm }} />;
}

function CssVariablesWithNestedSelectors() {
  <Box
    sx={(theme) => ({
      '--mui-palette-primary-main': '#FF0000',
    })}
  />;
  <Box
    sx={(theme) => ({
      '--mui-palette-primary-main': '#FF0000',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        '--mui-palette-primary-main': (t) => theme.palette.primary.main,
        '--mui-spacing': (t) => theme.shape.borderRadius,
      },
    })}
  />;
  <Box
    sx={{
      '--mui-palette-primary-main': '#FF0000',
      '&:hover': {
        backgroundColor: '#EE0000',
      },
    }}
  />;
  <Box
    sx={{
      '--mui-palette-primary-main': '#FF0000',
      '& .foo-bar': {
        backgroundColor: '#EE0000',
      },
    }}
  />;
}

// The fill prop conflicts with the Array's fill function.
// This test ensures that the callback value inside the sx prop
// can be used without conflicting with the Array's fill function
function TestFillPropCallback() {
  <Box
    sx={{
      fill: (theme) => theme.palette.primary.main,
    }}
  />;
  <Box
    sx={[
      {
        fill: (theme) => theme.palette.primary.main,
      },
    ]}
  />;
}

// eslint-disable-next-line mui/material-ui-no-styled-box
const StyledBox = styled(Box)`
  color: white;
` as typeof Box;

function StyledBoxWithSx() {
  return (
    <StyledBox component="span" sx={{ width: 300 }}>
      Box
    </StyledBox>
  );
}

function LogicalPropertiesTest() {
  <Box sx={{ marginInline: 1, paddingBlockEnd: '10px' }} />;
}
