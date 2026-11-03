import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import type { Breakpoint, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type BreakpointOrNull = Breakpoint | null;

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://legacy.reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  const theme: Theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- useMediaQuery is called inside callback
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

function MyComponent() {
  const width = useWidth();
  return <span>{`width: ${width}`}</span>;
}

const theme = createTheme();

export default function UseWidth() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
    // @focus-end
  );
}
