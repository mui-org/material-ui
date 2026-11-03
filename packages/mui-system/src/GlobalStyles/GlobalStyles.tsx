'use client';
import PropTypes from 'prop-types';
import type { Interpolation } from '@mui/styled-engine';
import {
  GlobalStyles as MuiGlobalStyles,
  internal_serializeStyles as serializeStyles,
} from '@mui/styled-engine';
import useTheme from '../useTheme';
import type { Theme as SystemTheme } from '../createTheme';

export interface GlobalStylesProps<Theme = SystemTheme> {
  styles: Interpolation<Theme>;
  defaultTheme?: object | undefined;
  themeId?: string | undefined;
}

function wrapGlobalLayer(styles: any) {
  const serialized = serializeStyles(styles) as { styles?: string | undefined };
  if (styles !== serialized && serialized.styles) {
    if (!serialized.styles.match(/^@layer\s[^{]*$/)) {
      // If the styles are not already wrapped in a layer, wrap them in a global layer.
      serialized.styles = `@layer global{${serialized.styles}}`;
    }
    return serialized;
  }
  return styles;
}

function GlobalStyles<Theme = SystemTheme>({
  styles,
  themeId,
  defaultTheme = {},
}: GlobalStylesProps<Theme>) {
  const upperTheme = useTheme(defaultTheme);
  const resolvedTheme = themeId ? (upperTheme as any)[themeId] || upperTheme : upperTheme;

  let globalStyles = typeof styles === 'function' ? styles(resolvedTheme) : styles;
  if (resolvedTheme.modularCssLayers) {
    if (Array.isArray(globalStyles)) {
      globalStyles = globalStyles.map((styleArg) => {
        if (typeof styleArg === 'function') {
          return wrapGlobalLayer(styleArg(resolvedTheme));
        }
        return wrapGlobalLayer(styleArg);
      });
    } else {
      globalStyles = wrapGlobalLayer(globalStyles);
    }
  }

  return <MuiGlobalStyles styles={globalStyles as any} />;
}

GlobalStyles.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: PropTypes.object,
  /**
   * @ignore
   */
  styles: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * @ignore
   */
  themeId: PropTypes.string,
} as any;

export default GlobalStyles;
