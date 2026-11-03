import type { CSSInterpolation } from '@mui/styled-engine';
import preprocessStyles from './preprocessStyles';

/* eslint-disable @typescript-eslint/naming-convention */

type ThemeStyleFunction<T> = (props: { theme: T }) => CSSInterpolation;

// We need to pass an argument as `{ theme }` for PigmentCSS, but we don't want to
// allocate more objects.
const arg = { theme: undefined as any };

/**
 * Memoize style function on theme.
 * Intended to be used in styled() calls that only need access to the theme.
 */
export default function unstable_memoTheme<T>(styleFn: ThemeStyleFunction<T>) {
  let lastValue: CSSInterpolation;
  let lastTheme: T;

  return function styleMemoized(props: { theme: T }) {
    let value = lastValue;
    if (value === undefined || props.theme !== lastTheme) {
      arg.theme = props.theme;

      value = preprocessStyles(styleFn(arg));

      lastValue = value;
      lastTheme = props.theme;
    }

    return value;
  };
}
