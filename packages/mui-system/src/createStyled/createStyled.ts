import type * as React from 'react';
import styledEngineStyled, {
  internal_mutateStyles as mutateStyles,
  internal_serializeStyles as serializeStyles,
} from '@mui/styled-engine';
import type {
  CreateMUIStyled as CreateMUIStyledStyledEngine,
  CSSInterpolation,
} from '@mui/styled-engine';
import isObjectEmpty from '@mui/utils/isObjectEmpty';
import { isPlainObject } from '@mui/utils/deepmerge';
import capitalize from '@mui/utils/capitalize';
import getDisplayName from '@mui/utils/getDisplayName';
import createTheme from '../createTheme';
import type { Theme as DefaultTheme } from '../createTheme';
import styleFunctionSx from '../styleFunctionSx';
import type { SxProps } from '../styleFunctionSx';
import preprocessStyles from '../preprocessStyles';

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-labels */
/* eslint-disable no-lone-blocks */

export interface MUIStyledCommonProps<Theme extends object = DefaultTheme> {
  theme?: Theme | undefined;
  as?: React.ElementType | undefined;
  sx?: SxProps<Theme> | undefined;
}

export interface MuiStyledOptions {
  name?: string | undefined;
  slot?: string | undefined;
  // The difference between Interpolation and CSSInterpolation is that the former supports functions based on props
  // If we want to support props in the overrides, we will need to change the CSSInterpolation to Interpolation<Props>
  overridesResolver?:
    ((props: any, styles: Record<string, CSSInterpolation>) => CSSInterpolation) | undefined;
  skipVariantsResolver?: boolean | undefined;
  skipSx?: boolean | undefined;
}

export type CreateMUIStyled<Theme extends object = DefaultTheme> = CreateMUIStyledStyledEngine<
  MUIStyledCommonProps<Theme>,
  MuiStyledOptions,
  Theme
>;

export const systemDefaultTheme = createTheme();

// Update /system/styled/#api in case if this changes
export function shouldForwardProp(prop: PropertyKey): boolean {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

function shallowLayer(serialized: any, layerName: any) {
  if (
    layerName &&
    serialized &&
    typeof serialized === 'object' &&
    serialized.styles &&
    !serialized.styles.startsWith('@layer') // only add the layer if it is not already there.
  ) {
    serialized.styles = `@layer ${layerName}{${String(serialized.styles)}}`;
  }
  return serialized;
}

function defaultOverridesResolver(slot: any) {
  if (!slot) {
    return null;
  }
  return (_props: any, styles: any) => styles[slot];
}

function attachTheme(props: any, themeId: any, defaultTheme: any) {
  props.theme = isObjectEmpty(props.theme) ? defaultTheme : props.theme[themeId] || props.theme;
}

function processStyle(props: any, style: any, layerName?: any): any {
  /*
   * Style types:
   *  - null/undefined
   *  - string
   *  - CSS style object: { [cssKey]: [cssValue], variants }
   *  - Processed style object: { style, variants, isProcessed: true }
   *  - Array of any of the above
   */

  const resolvedStyle = typeof style === 'function' ? style(props) : style;

  if (Array.isArray(resolvedStyle)) {
    return resolvedStyle.flatMap((subStyle) => processStyle(props, subStyle, layerName));
  }

  if (Array.isArray(resolvedStyle?.variants)) {
    let rootStyle;
    if (resolvedStyle.isProcessed) {
      rootStyle = layerName ? shallowLayer(resolvedStyle.style, layerName) : resolvedStyle.style;
    } else {
      const { variants, ...otherStyles } = resolvedStyle;
      rootStyle = layerName ? shallowLayer(serializeStyles(otherStyles), layerName) : otherStyles;
    }

    return processStyleVariants(props, resolvedStyle.variants, [rootStyle], layerName);
  }

  if (resolvedStyle?.isProcessed) {
    return layerName
      ? shallowLayer(serializeStyles(resolvedStyle.style), layerName)
      : resolvedStyle.style;
  }

  return layerName ? shallowLayer(serializeStyles(resolvedStyle), layerName) : resolvedStyle;
}

function processStyleVariants(
  props: any,
  variants: any,
  results: any[] = [],
  layerName: any = undefined,
) {
  let mergedState: any; // We might not need it, initialized lazily

  variantLoop: for (let i = 0; i < variants.length; i += 1) {
    const variant = variants[i];

    if (typeof variant.props === 'function') {
      mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
      if (!variant.props(mergedState)) {
        continue;
      }
    } else {
      for (const key in variant.props) {
        if (props[key] !== variant.props[key] && props.ownerState?.[key] !== variant.props[key]) {
          continue variantLoop;
        }
      }
    }

    if (typeof variant.style === 'function') {
      mergedState ??= { ...props, ...props.ownerState, ownerState: props.ownerState };
      results.push(
        layerName
          ? shallowLayer(serializeStyles(variant.style(mergedState)), layerName)
          : variant.style(mergedState),
      );
    } else {
      results.push(
        layerName ? shallowLayer(serializeStyles(variant.style), layerName) : variant.style,
      );
    }
  }

  return results;
}

export default function createStyled<Theme extends object = DefaultTheme>(
  input: {
    themeId?: string | undefined;
    defaultTheme?: Theme | undefined;
    rootShouldForwardProp?: ((prop: PropertyKey) => boolean) | undefined;
    slotShouldForwardProp?: ((prop: PropertyKey) => boolean) | undefined;
    styleFunctionSx?: typeof styleFunctionSx | undefined;
  } = {},
): CreateMUIStyled<Theme> {
  const {
    themeId,
    defaultTheme = systemDefaultTheme,
    rootShouldForwardProp = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
  } = input;

  function styleAttachTheme(props: any) {
    attachTheme(props, themeId, defaultTheme);
  }

  const styled = (tag: any, inputOptions: any = {}) => {
    // If `tag` is already a styled component, filter out the `sx` style function
    // to prevent unnecessary styles generated by the composite components.
    mutateStyles(tag, (styles: any) => styles.filter((style: any) => style !== styleFunctionSx));

    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
      ...options
    } = inputOptions;

    const layerName =
      (componentName && componentName.startsWith('Mui')) || !!componentSlot
        ? 'components'
        : 'custom';

    // if skipVariantsResolver option is defined, take the value, otherwise, true for root and false for other slots.
    const skipVariantsResolver =
      inputSkipVariantsResolver !== undefined
        ? inputSkipVariantsResolver
        : // TODO v6: remove `Root` in the next major release
          // For more details: https://github.com/mui/material-ui/pull/37908
          (componentSlot && componentSlot !== 'Root' && componentSlot !== 'root') || false;

    const skipSx = inputSkipSx || false;

    let shouldForwardPropOption: ((prop: PropertyKey) => boolean) | undefined = shouldForwardProp;

    // TODO v6: remove `Root` in the next major release
    // For more details: https://github.com/mui/material-ui/pull/37908
    if (componentSlot === 'Root' || componentSlot === 'root') {
      shouldForwardPropOption = rootShouldForwardProp;
    } else if (componentSlot) {
      // any other slot specified
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      // for string (html) tag, preserve the behavior in emotion & styled-components.
      shouldForwardPropOption = undefined;
    }

    const defaultStyledResolver = styledEngineStyled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label: generateStyledLabel(componentName, componentSlot),
      ...options,
    });

    const transformStyle = (style: any) => {
      // - On the server Emotion doesn't use React.forwardRef for creating components, so the created
      //   component stays as a function. This condition makes sure that we do not interpolate functions
      //   which are basically components used as a selectors.
      // - `style` could be a styled component from a babel plugin for component selectors, This condition
      //   makes sure that we do not interpolate them.
      if (style.__emotion_real === style) {
        return style;
      }
      if (typeof style === 'function') {
        return function styleFunctionProcessor(props: any) {
          return processStyle(props, style, props.theme.modularCssLayers ? layerName : undefined);
        };
      }
      if (isPlainObject(style)) {
        const serialized = preprocessStyles(style);
        return function styleObjectProcessor(props: any) {
          if (!serialized.variants) {
            return props.theme.modularCssLayers
              ? shallowLayer(serialized.style, layerName)
              : serialized.style;
          }
          return processStyle(
            props,
            serialized,
            props.theme.modularCssLayers ? layerName : undefined,
          );
        };
      }
      return style;
    };

    const muiStyledResolver = (...expressionsInput: any[]) => {
      const expressionsHead: any[] = [];
      const expressionsBody = expressionsInput.map(transformStyle);
      const expressionsTail: any[] = [];

      // Preprocess `props` to set the scoped theme value.
      // This must run before any other expression.
      expressionsHead.push(styleAttachTheme);

      if (componentName && overridesResolver) {
        expressionsTail.push(function styleThemeOverrides(props: any) {
          const theme = props.theme;
          const styleOverrides = theme.components?.[componentName]?.styleOverrides;
          if (!styleOverrides) {
            return null;
          }

          const resolvedStyleOverrides: any = {};

          // TODO: v7 remove iteration and use `resolveStyleArg(styleOverrides[slot])` directly
          // eslint-disable-next-line guard-for-in
          for (const slotKey in styleOverrides) {
            resolvedStyleOverrides[slotKey] = processStyle(
              props,
              styleOverrides[slotKey],
              props.theme.modularCssLayers ? 'theme' : undefined,
            );
          }

          return overridesResolver(props, resolvedStyleOverrides);
        });
      }

      if (componentName && !skipVariantsResolver) {
        expressionsTail.push(function styleThemeVariants(props: any) {
          const theme = props.theme;
          const themeVariants = theme?.components?.[componentName]?.variants;
          if (!themeVariants) {
            return null;
          }
          return processStyleVariants(
            props,
            themeVariants,
            [],
            props.theme.modularCssLayers ? 'theme' : undefined,
          );
        });
      }

      if (!skipSx) {
        expressionsTail.push(styleFunctionSx);
      }

      // This function can be called as a tagged template, so the first argument would contain
      // CSS `string[]` values.
      if (Array.isArray(expressionsBody[0])) {
        const inputStrings = expressionsBody.shift();

        // We need to add placeholders in the tagged template for the custom functions we have
        // possibly added (attachTheme, overrides, variants, and sx).
        const placeholdersHead = new Array(expressionsHead.length).fill('');
        const placeholdersTail = new Array(expressionsTail.length).fill('');

        let outputStrings: any;
        // prettier-ignore
        {
          outputStrings     = [...placeholdersHead, ...inputStrings,     ...placeholdersTail];
          outputStrings.raw = [...placeholdersHead, ...inputStrings.raw, ...placeholdersTail];
        }

        // The only case where we put something before `attachTheme`
        expressionsHead.unshift(outputStrings);
      }

      const expressions = [...expressionsHead, ...expressionsBody, ...expressionsTail];

      const Component: any = defaultStyledResolver(...expressions);
      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }
      if (process.env.NODE_ENV !== 'production') {
        Component.displayName = generateDisplayName(componentName, componentSlot, tag);
      }

      return Component;
    };

    if ((defaultStyledResolver as any).withConfig) {
      (muiStyledResolver as any).withConfig = (defaultStyledResolver as any).withConfig;
    }

    return muiStyledResolver;
  };

  return styled as unknown as CreateMUIStyled<Theme>;
}

function generateDisplayName(componentName: any, componentSlot: any, tag: any) {
  if (componentName) {
    return `${componentName}${capitalize(componentSlot || '')}`;
  }
  return `Styled(${getDisplayName(tag)})`;
}

function generateStyledLabel(componentName: any, componentSlot: any) {
  let label: string | undefined;

  if (process.env.NODE_ENV !== 'production') {
    if (componentName) {
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      label = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
    }
  }

  return label;
}

// https://github.com/emotion-js/emotion/blob/26ded6109fcd8ca9875cc2ce4564fee678a3f3c5/packages/styled/src/utils.js#L40
function isStringTag(tag: any) {
  return (
    typeof tag === 'string' &&
    // 96 is one less than the char code
    // for "a" so this is checking that
    // it's a lowercase character
    tag.charCodeAt(0) > 96
  );
}

function lowercaseFirstLetter(string: any) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
}
