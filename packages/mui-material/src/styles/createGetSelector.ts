import excludeVariablesFromRoot from './excludeVariablesFromRoot';

export default <
    T extends {
      rootSelector?: string | undefined;
      colorSchemeSelector?: 'media' | 'class' | 'data' | string | undefined;
      colorSchemes?: Record<string, any> | undefined;
      defaultColorScheme?: string | undefined;
      cssVarPrefix?: string | undefined;
    },
  >(
    theme: T,
  ) =>
  (colorScheme: keyof T['colorSchemes'] | undefined, css: Record<string, any>) => {
    const root = theme.rootSelector || ':root';
    const selector = theme.colorSchemeSelector;
    let rule = selector;
    if (selector === 'class') {
      rule = '.%s';
    }
    if (selector === 'data') {
      rule = '[data-%s]';
    }
    if (selector?.startsWith('data-') && !selector.includes('%s')) {
      // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
      rule = `[${selector}="%s"]`;
    }
    if (theme.defaultColorScheme === colorScheme) {
      if (colorScheme === 'dark') {
        const excludedVariables: typeof css = {};
        excludeVariablesFromRoot(theme.cssVarPrefix).forEach((cssVar) => {
          excludedVariables[cssVar] = css[cssVar];
          delete css[cssVar];
        });
        if (rule === 'media') {
          return {
            [root]: css,
            [`@media (prefers-color-scheme: dark)`]: {
              [root]: excludedVariables,
            },
          };
        }
        if (rule) {
          return {
            [rule.replace('%s', colorScheme)]: excludedVariables,
            [`${root}, ${rule.replace('%s', colorScheme)}`]: css,
          };
        }
        return { [root]: { ...css, ...excludedVariables } };
      }
      if (rule && rule !== 'media') {
        return `${root}, ${rule.replace('%s', String(colorScheme))}`;
      }
    } else if (colorScheme) {
      if (rule === 'media') {
        return {
          [`@media (prefers-color-scheme: ${String(colorScheme)})`]: {
            [root]: css,
          },
        };
      }
      if (rule) {
        return rule.replace('%s', String(colorScheme));
      }
    }
    return root;
  };
