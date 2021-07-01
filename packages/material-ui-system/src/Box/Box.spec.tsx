import * as React from 'react';
import { Box, Theme } from '@material-ui/system';

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
  // @ts-expect-error value for the breakpoint should be valid
  <Box sx={{ p: { xs: 2, sm: { you: "are dealing with 'any' here" }, md: 4 } }} />;
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
  <Box component="img" src="https://material-ui.com/" alt="Material UI" />;
  <Box component={Test} test="Test string" />;
  <Box maxWidth={(theme: Theme) => theme.breakpoints.values.sm} />;
}
