import styledEngineStyled from '@material-ui/styled-engine';
import createTheme from './createTheme';
import styleFunctionSx, { extendSxProp } from './styleFunctionSx';
import propsToClassKey from './propsToClassKey';
import { propToStyleFunction } from './getThemeValue';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};

  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });

  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  const { styleProps = {} } = props;
  let variantsStyles = {};
  const themeVariants = theme?.components?.[name]?.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles = { ...variantsStyles, ...styles[propsToClassKey(themeVariant.props)] };
      }
    });
  }

  return variantsStyles;
};

export const shouldForwardProp = (prop) => {
  return prop !== 'styleProps' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
};

export const systemDefaultTheme = createTheme();

const lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export function createPrimitiveStyled(defaultTheme = systemDefaultTheme) {
  function shouldPrimitiveForwardProp(prop) {
    return prop !== 'theme' && prop !== 'sx' && prop !== 'as' && !propToStyleFunction[prop];
  }
  function styled(tag) {
    return () =>
      styledEngineStyled(tag, {
        shouldForwardProp: shouldPrimitiveForwardProp,
      })((props) => {
        const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
        const { sx } = extendSxProp(props);
        return styleFunctionSx({ ...props, sx, theme });
      });
  }

  styled.htmlTags = Object.keys(styledEngineStyled);

  return styled;
}

export default function createStyled(input = {}) {
  const {
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver,
      ...options
    } = inputOptions;

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : (componentSlot && componentSlot !== 'Root') || false;

    const skipSx = inputSkipSx || false;

    let displayName;
    let className;

    if (componentName) {
      displayName = `${componentName}${componentSlot || ''}`;
      className = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
    }

    const defaultStyledResolver = styledEngineStyled(tag, {
      ...(!componentSlot || componentSlot === 'Root'
        ? { shouldForwardProp: rootShouldForwardProp }
        : { shouldForwardProp: slotShouldForwardProp }),
      label: className || componentName || '',
      ...options,
    });
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions
        ? expressions.map((stylesArg) => {
            return typeof stylesArg === 'function'
              ? ({ theme: themeInput, ...other }) => {
                  return stylesArg({
                    theme: isEmpty(themeInput) ? defaultTheme : themeInput,
                    ...other,
                  });
                }
              : stylesArg;
          })
        : [];

      let transformedStyleArg = styleArg;

      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);

          if (styleOverrides) {
            return overridesResolver(props, styleOverrides);
          }

          return null;
        });
      }

      if (componentName && overridesResolver && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return variantsResolver(
            props,
            getVariantStyles(componentName, theme),
            theme,
            componentName,
          );
        });
      }

      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty(props.theme) ? defaultTheme : props.theme;
          return styleFunctionSx({ ...props, theme });
        });
      }

      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill('');
        // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles.
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === 'function') {
        // If the type is function, we need to define the default theme.
        transformedStyleArg = ({ theme: themeInput, ...other }) =>
          styleArg({ theme: isEmpty(themeInput) ? defaultTheme : themeInput, ...other });
      }

      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

      if (displayName) {
        Component.displayName = displayName;
      }

      return Component;
    };
    return muiStyledResolver;
  };
}
