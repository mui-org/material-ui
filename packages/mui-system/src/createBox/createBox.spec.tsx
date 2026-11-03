import { createBox } from '@mui/system';

const Box = createBox();

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
