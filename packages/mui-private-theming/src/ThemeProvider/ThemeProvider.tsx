import * as React from 'react';
import PropTypes from 'prop-types';
import exactProp from '@mui/utils/exactProp';
import type { DefaultTheme } from '../defaultTheme';
import ThemeContext from '../useTheme/ThemeContext';
import useTheme from '../useTheme';

export interface ThemeProviderProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

// To support composition of theme.
function mergeOuterLocalTheme(outerTheme: any, localTheme: any) {
  if (typeof localTheme === 'function') {
    const mergedTheme = localTheme(outerTheme);

    if (process.env.NODE_ENV !== 'production') {
      if (!mergedTheme) {
        console.error(
          [
            'MUI: You should return an object from your theme function, i.e.',
            '<ThemeProvider theme={() => ({})} />',
          ].join('\n'),
        );
      }
    }

    return mergedTheme;
  }

  return { ...outerTheme, ...localTheme };
}

/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
function ThemeProvider<T = DefaultTheme>(
  props: ThemeProviderProps<T>,
): React.ReactElement<ThemeProviderProps<T>> {
  const { children, theme: localTheme } = props;
  const outerTheme: T | null = useTheme<T>();

  if (process.env.NODE_ENV !== 'production') {
    if (outerTheme === null && typeof localTheme === 'function') {
      console.error(
        [
          'MUI: You are providing a theme function prop to the ThemeProvider component:',
          '<ThemeProvider theme={outerTheme => outerTheme} />',
          '',
          'However, no outer theme is present.',
          'Make sure a theme is already injected higher in the React tree ' +
            'or provide a theme object.',
        ].join('\n'),
      );
    }
  }

  const theme = React.useMemo(
    () => (outerTheme === null ? { ...localTheme } : mergeOuterLocalTheme(outerTheme, localTheme)),
    [localTheme, outerTheme],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

(ThemeProvider as any).propTypes /* remove-proptypes */ = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  (ThemeProvider as any).propTypes = exactProp((ThemeProvider as any).propTypes);
}

export default ThemeProvider;
