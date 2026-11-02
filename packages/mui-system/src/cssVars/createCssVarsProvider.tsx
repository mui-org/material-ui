'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles, internal_useNonce as useNonce } from '@mui/styled-engine';
import { useTheme as muiUseTheme } from '@mui/private-theming';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import type InitColorSchemeScript from '../InitColorSchemeScript';
import ThemeProvider from '../ThemeProvider';
import {
  buildInitColorSchemeScript,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  DEFAULT_MODE_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import useCurrentColorScheme from './useCurrentColorScheme';
import type { Result } from './useCurrentColorScheme';
import type { StorageManager } from './localStorageManager';

export interface ColorSchemeContextValue<
  SupportedColorScheme extends string,
> extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export interface CssVarsProviderConfig<ColorScheme extends string> {
  /**
   * DOM attribute for applying color scheme
   * @default 'data-color-scheme'
   */
  attribute?: string | undefined;
  /**
   * localStorage key used to store application `mode`
   * @default 'mode'
   */
  modeStorageKey?: string | undefined;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string | undefined;
  /**
   * Design system default color scheme.
   * - provides string if the design system has one default color scheme (either light or dark)
   * - provides object if the design system has default light & dark color schemes
   */
  defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme };
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean | undefined;
  /**
   * If `true`, theme values are recalculated when the mode changes.
   * The `theme.colorSchemes.{mode}.*` nodes will be shallow merged to the top-level of the theme.
   * @default false
   */
  forceThemeRerender?: boolean | undefined;
}

type Identify<I extends string | undefined, T> = I extends string ? T | { [k in I]: T } : T;

export interface CreateCssVarsProviderResult<
  ColorScheme extends string,
  Identifier extends string | undefined = undefined,
> {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      Partial<CssVarsProviderConfig<ColorScheme>> & {
        theme?:
          | Identify<
              Identifier,
              {
                cssVariables?: false | undefined;
                cssVarPrefix?: string | undefined;
                colorSchemes: Partial<Record<ColorScheme, any>>;
                colorSchemeSelector?: 'media' | 'class' | 'data' | string | undefined;
              }
            >
          | undefined;
        /**
         * The default mode when the storage is empty,
         * require the theme to have `colorSchemes` with light and dark.
         * @default 'system'
         */
        defaultMode?: 'light' | 'dark' | 'system' | undefined;
        /**
         * The document used to perform `disableTransitionOnChange` feature
         * @default document
         */
        documentNode?: Document | null | undefined;
        /**
         * The node used to attach the color-scheme attribute
         * @default document
         */
        colorSchemeNode?: Element | null | undefined;
        /**
         * The storage manager to be used for storing the mode and color scheme.
         * @default using `window.localStorage`
         */
        storageManager?: StorageManager | null | undefined;
        /**
         * The window that attaches the 'storage' event listener
         * @default window
         */
        storageWindow?: Window | null | undefined;
        /**
         * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
         */
        disableNestedContext?: boolean | undefined;
        /**
         * If `true`, the style sheet won't be generated.
         *
         * This is useful for controlling nested CssVarsProvider behavior.
         * @default false
         */
        disableStyleSheetGeneration?: boolean | undefined;
      }
    >,
  ) => React.JSX.Element;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme>;
  getInitColorSchemeScript: typeof InitColorSchemeScript;
}

/**
 * @internal
 */
export const DISABLE_CSS_TRANSITION =
  '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';

export default function createCssVarsProvider<
  ColorScheme extends string,
  Identifier extends string | undefined = undefined,
>(
  options: CssVarsProviderConfig<ColorScheme> & {
    /**
     * The design system's unique id for getting the corresponded theme when there are multiple design systems.
     */
    themeId?: Identifier | undefined;
    /**
     * Design system default theme
     *
     * - The structure inside `theme.colorSchemes[colorScheme]` should be exactly the same in all color schemes because
     * those object of the color scheme will be used when the color scheme is active.
     *
     *  {
     *    colorSchemes: {
     *      light: { ...lightColorSchemeValues },
     *      dark: { ...darkColorSchemeValues }
     *    }
     *  }
     *
     * - If colorScheme is 'light', the `lightColorSchemeValues` will be merged to theme as `{ ...theme, ...lightColorSchemeValues }`
     *   likewise, if colorScheme is 'dark', the `darkColorSchemeValues` will be merged to theme as `{ ...theme, ...darkColorSchemeValues }`
     *
     * - If the theme contains the same keys as the color scheme, their values will be merged.
     *  Ex. {
     *    colorSchemes: {
     *      light: { palette: { primary: { ... } } },
     *      dark: { palette: { primary: { ...} } }
     *    },
     *    palette: { shared: { ... } }
     *  }
     *
     *  becomes: {
     *    colorSchemes: { ... },
     *    palette: { shared: { ... }, primary: { ... } }
     *  }
     */
    theme: any;
    /**
     * A function to be called after the CSS variables are attached. The result of this function will be the final theme pass to ThemeProvider.
     *
     * The example usage is the variant generation in Joy. We need to combine the token from user-input and the default theme first, then generate
     * variants from those tokens.
     */
    resolveTheme?: ((theme: any) => any) | undefined; // the type is any because it depends on the design system.
  },
): CreateCssVarsProviderResult<ColorScheme, Identifier> {
  const {
    themeId,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: defaultTheme = {},
    modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    defaultColorScheme,
    resolveTheme,
  } = options;

  const defaultContext = {
    allColorSchemes: [],
    colorScheme: undefined,
    darkColorScheme: undefined,
    lightColorScheme: undefined,
    mode: undefined,
    setColorScheme: () => {},
    setMode: () => {},
    systemMode: undefined,
  };

  const ColorSchemeContext = React.createContext<any>(undefined);

  if (process.env.NODE_ENV !== 'production') {
    ColorSchemeContext.displayName = 'ColorSchemeContext';
  }

  const useColorScheme = () => React.useContext(ColorSchemeContext) || defaultContext;

  const defaultColorSchemes = {};
  const defaultComponents = {};

  function CssVarsProvider(props: any) {
    const {
      children,
      theme: themeProp,
      modeStorageKey = defaultModeStorageKey,
      colorSchemeStorageKey = defaultColorSchemeStorageKey,
      disableTransitionOnChange = designSystemTransitionOnChange,
      storageManager,
      storageWindow = typeof window === 'undefined' ? undefined : window,
      documentNode = typeof document === 'undefined' ? undefined : document,
      colorSchemeNode = typeof document === 'undefined' ? undefined : document.documentElement,
      disableNestedContext = false,
      disableStyleSheetGeneration = false,
      defaultMode: initialMode = 'system',
      forceThemeRerender = false,
      noSsr,
    } = props;
    const hasMounted = React.useRef(false);
    const nonce = useNonce();
    const upperTheme = muiUseTheme();
    const ctx = React.useContext(ColorSchemeContext);
    const nested = !!ctx && !disableNestedContext;

    const initialTheme = React.useMemo(() => {
      if (themeProp) {
        return themeProp;
      }
      return typeof defaultTheme === 'function' ? defaultTheme() : defaultTheme;
    }, [themeProp]);
    const scopedTheme = initialTheme[themeId];
    const restThemeProp = scopedTheme || initialTheme;
    const {
      colorSchemes = defaultColorSchemes,
      components = defaultComponents,
      cssVarPrefix,
    } = restThemeProp;
    const joinedColorSchemes = Object.keys(colorSchemes)
      .filter((k) => !!colorSchemes[k])
      .join(',');
    const allColorSchemes = React.useMemo(
      () => joinedColorSchemes.split(','),
      [joinedColorSchemes],
    );
    const defaultLightColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme =
      typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;
    const defaultMode =
      colorSchemes[defaultLightColorScheme] && colorSchemes[defaultDarkColorScheme]
        ? initialMode
        : colorSchemes[restThemeProp.defaultColorScheme]?.palette?.mode ||
          restThemeProp.palette?.mode;

    // 1. Get the data about the `mode`, `colorScheme`, and setter functions.
    const {
      mode: stateMode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme: stateColorScheme,
      setColorScheme,
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageManager,
      storageWindow,
      noSsr,
    });

    let mode = stateMode;
    let colorScheme = stateColorScheme;

    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (forceThemeRerender && !restThemeProp.vars) {
        console.warn(
          [
            'MUI: The `forceThemeRerender` prop should only be used with CSS theme variables.',
            'Note that it will slow down the app when changing between modes, so only do this when you cannot find a better solution.',
          ].join('\n'),
        );
      }
    }

    // `colorScheme` is undefined on the server and hydration phase
    let calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;
    if (restThemeProp.vars && !forceThemeRerender) {
      calculatedColorScheme = restThemeProp.defaultColorScheme;
    }

    const memoTheme = React.useMemo(() => {
      // 2. get the `vars` object that refers to the CSS custom properties
      const themeVars = restThemeProp.generateThemeVars?.() || restThemeProp.vars;

      // 3. Start composing the theme object
      const theme = {
        ...restThemeProp,
        components,
        colorSchemes,
        cssVarPrefix,
        vars: themeVars,
      };
      if (typeof theme.generateSpacing === 'function') {
        theme.spacing = theme.generateSpacing();
      }

      // 4. Resolve the color scheme and merge it to the theme
      if (calculatedColorScheme) {
        const scheme = colorSchemes[calculatedColorScheme];
        if (scheme && typeof scheme === 'object') {
          // 4.1 Merge the selected color scheme to the theme
          Object.keys(scheme).forEach((schemeKey) => {
            if (scheme[schemeKey] && typeof scheme[schemeKey] === 'object') {
              // shallow merge the 1st level structure of the theme.
              theme[schemeKey] = {
                ...theme[schemeKey],
                ...scheme[schemeKey],
              };
            } else {
              theme[schemeKey] = scheme[schemeKey];
            }
          });
        }
      }

      return resolveTheme ? resolveTheme(theme) : theme;
    }, [restThemeProp, calculatedColorScheme, components, colorSchemes, cssVarPrefix]);

    // 5. Declaring effects
    // 5.1 Updates the selector value to use the current color scheme which tells CSS to use the proper stylesheet.
    const colorSchemeSelector = restThemeProp.colorSchemeSelector;
    useEnhancedEffect(() => {
      if (
        colorScheme &&
        colorSchemeNode &&
        colorSchemeSelector &&
        colorSchemeSelector !== 'media'
      ) {
        const selector = colorSchemeSelector;
        let rule = colorSchemeSelector;
        if (selector === 'class') {
          rule = `.%s`;
        }
        if (selector === 'data') {
          rule = `[data-%s]`;
        }
        if (selector?.startsWith('data-') && !selector.includes('%s')) {
          // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
          rule = `[${selector}="%s"]`;
        }
        if (rule.startsWith('.')) {
          colorSchemeNode.classList.remove(
            ...allColorSchemes.map((scheme) => rule.substring(1).replace('%s', scheme)),
          );
          colorSchemeNode.classList.add(rule.substring(1).replace('%s', colorScheme));
        } else {
          const matches = rule.replace('%s', colorScheme).match(/\[([^\]]+)\]/);
          if (matches) {
            const [attr, value] = matches[1].split('=');
            if (!value) {
              // for attributes like `data-theme-dark`, `data-theme-light`
              // remove all the existing data attributes before setting the new one
              allColorSchemes.forEach((scheme) => {
                colorSchemeNode.removeAttribute(attr.replace(colorScheme, scheme));
              });
            }
            colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, '') : '');
          } else {
            colorSchemeNode.setAttribute(rule, colorScheme);
          }
        }
      }
    }, [colorScheme, colorSchemeSelector, colorSchemeNode, allColorSchemes]);

    // 5.2 Remove the CSS transition when color scheme changes to create instant experience.
    // credit: https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx#L313
    React.useEffect(() => {
      let timer: any;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        const css = documentNode.createElement('style');
        if (nonce) {
          css.setAttribute('nonce', nonce);
        }
        css.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css);

        // Force browser repaint
        (() => window.getComputedStyle(documentNode.body))();

        timer = setTimeout(() => {
          documentNode.head.removeChild(css);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode, nonce]);
    React.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);

    const contextValue = React.useMemo(
      () => ({
        allColorSchemes,
        colorScheme,
        darkColorScheme,
        lightColorScheme,
        mode,
        setColorScheme,
        setMode:
          process.env.NODE_ENV === 'production'
            ? setMode
            : (newMode: any) => {
                if (memoTheme.colorSchemeSelector === 'media') {
                  // #host-reference
                  console.error(
                    [
                      'MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).',
                      'To toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.',
                      'To learn more, visit https://next.mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually',
                    ].join('\n'),
                  );
                }
                setMode(newMode);
              },
        systemMode,
      }),
      [
        allColorSchemes,
        colorScheme,
        darkColorScheme,
        lightColorScheme,
        mode,
        setColorScheme,
        setMode,
        systemMode,
        memoTheme.colorSchemeSelector,
      ],
    );

    let shouldGenerateStyleSheet = true;
    if (
      disableStyleSheetGeneration ||
      restThemeProp.cssVariables === false ||
      (nested && (upperTheme as any)?.cssVarPrefix === cssVarPrefix)
    ) {
      shouldGenerateStyleSheet = false;
    }

    const element = (
      <React.Fragment>
        <ThemeProvider themeId={scopedTheme ? themeId : undefined} theme={memoTheme}>
          {children}
        </ThemeProvider>
        {shouldGenerateStyleSheet && (
          <GlobalStyles styles={memoTheme.generateStyleSheets?.() || []} />
        )}
      </React.Fragment>
    );

    if (nested) {
      return element;
    }

    return (
      <ColorSchemeContext.Provider value={contextValue}>{element}</ColorSchemeContext.Provider>
    );
  }

  CssVarsProvider.propTypes = {
    /**
     * The component tree.
     */
    children: PropTypes.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: PropTypes.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: PropTypes.string,
    /**
     * The default mode when the storage is empty,
     * require the theme to have `colorSchemes` with light and dark.
     */
    defaultMode: PropTypes.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: PropTypes.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: PropTypes.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: PropTypes.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: PropTypes.any,
    /**
     * If `true`, theme values are recalculated when the mode changes.
     */
    forceThemeRerender: PropTypes.bool,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: PropTypes.string,
    /**
     * If `true`, the mode will be the same value as the storage without an extra rerendering after the hydration.
     * You should use this option in conjunction with `InitColorSchemeScript` component.
     */
    noSsr: PropTypes.bool,
    /**
     * The storage manager to be used for storing the mode and color scheme
     * @default using `window.localStorage`
     */
    storageManager: PropTypes.func,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: PropTypes.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object,
  };

  const defaultLightColorScheme =
    typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
  const defaultDarkColorScheme =
    typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;

  const getInitColorSchemeScript = (params: any) =>
    buildInitColorSchemeScript({
      colorSchemeStorageKey: defaultColorSchemeStorageKey,
      defaultLightColorScheme,
      defaultDarkColorScheme,
      modeStorageKey: defaultModeStorageKey,
      ...params,
    });

  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript,
  } as unknown as CreateCssVarsProviderResult<ColorScheme, Identifier>;
}
