import type { DefaultCssVarsTheme } from './prepareCssVars';
import prepareCssVars from './prepareCssVars';
import { createGetColorSchemeSelector } from './getColorSchemeSelector';
import { DEFAULT_ATTRIBUTE } from '../InitColorSchemeScript/InitColorSchemeScript';

interface Theme extends DefaultCssVarsTheme {
  cssVarPrefix?: string | undefined;
  colorSchemeSelector?: 'media' | string | undefined;
  shouldSkipGeneratingVar?:
    ((objectPathKeys: Array<string>, value: string | number) => boolean) | undefined;
}

function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>({
  colorSchemeSelector = `[${DEFAULT_ATTRIBUTE}="%s"]`,
  ...theme
}: T) {
  const output: any = theme;
  const result = prepareCssVars<Omit<T, 'shouldSkipGeneratingVar' | 'cssVarPrefix'>, ThemeVars>(
    output,
    {
      ...theme,
      prefix: theme.cssVarPrefix,
      colorSchemeSelector,
    },
  );
  output.vars = result.vars;
  output.generateThemeVars = result.generateThemeVars;
  output.generateStyleSheets = result.generateStyleSheets;
  output.colorSchemeSelector = colorSchemeSelector;
  output.getColorSchemeSelector = createGetColorSchemeSelector(colorSchemeSelector);
  output.internal_cache = {};

  return output as T & typeof result;
}

export default createCssVarsTheme;
