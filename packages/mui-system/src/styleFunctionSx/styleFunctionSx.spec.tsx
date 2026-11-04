import type { SxProps } from '@mui/system';

interface Theme {
  color: string;
}

function Text(props: { sx?: SxProps<Theme> }) {
  return null;
}

// object
<Text sx={{ color: '#121212' }} />;

// function
<Text sx={(theme) => ({ color: theme.color })} />;

// array
<Text sx={[(theme) => ({ color: theme.color }), { m: 2 }]} />;

// null
<Text sx={{ m: null, transform: null, typography: undefined }} />;

// array contains boolean
// eslint-disable-next-line no-constant-binary-expression
<Text sx={[false && { p: 2 }, { m: 2 }]} />;
