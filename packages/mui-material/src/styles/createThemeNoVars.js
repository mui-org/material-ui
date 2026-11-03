import deepmerge from '@mui/utils/deepmerge';
import styleFunctionSx, {
  unstable_defaultSxConfig as defaultSxConfig,
} from '@mui/system/styleFunctionSx';
import systemCreateTheme from '@mui/system/createTheme';
import {
  alpha as systemAlpha,
  lighten as systemLighten,
  darken as systemDarken,
  colorChannel,
  private_safeColorChannel as safeColorChannel,
  hslToRgb,
} from '@mui/system/colorManipulator';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import createMixins from './createMixins';
import createPalette from './createPalette';
import createTypography from './createTypography';
import shadows from './shadows';
import createTransitions from './createTransitions';
import createMotion from './createMotion';
import zIndex from './zIndex';
import { stringifyTheme } from './stringifyTheme';
import { resolveFocusVisible } from './focusVisible';

function coefficientToPercentage(coefficient) {
  if (typeof coefficient === 'number') {
    return `${(coefficient * 100).toFixed(0)}%`;
  }
  return `calc((${coefficient}) * 100%)`;
}

// This can be removed when moved to `color-mix()` entirely.
const parseAddition = (str) => {
  if (!Number.isNaN(+str)) {
    return +str;
  }
  const numbers = str.match(/\d*\.?\d+/g);
  if (!numbers) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i += 1) {
    sum += +numbers[i];
  }
  return sum;
};

// `rgba()` takes rgb channels, so `hsl()` is converted like the theme's `*Channel` tokens.
function toRgb(color) {
  return color.startsWith('hsl') ? hslToRgb(color) : color;
}

// Replaces the `var()` matches in `alpha()`: `var(--x, #1976d2)` -> `var(--xChannel, 25 118 210)`.
// The fallback keeps the color valid when the CSS variables aren't defined (no `ThemeProvider`).
// It's dropped when it isn't a color `colorChannel()` parses, for example `currentColor` or a nested `var()`,
// or when it's a `color()`, whose channels aren't sRGB.
// More than one level of nested parentheses isn't supported: the match ends at the first run of `)`,
// so the rest of the fallback stays in the output.
function toChannelVar(match, name, fallback = '') {
  const color = fallback.trim();
  if (color && !color.startsWith('color(')) {
    try {
      const channel = colorChannel(toRgb(color));
      // Space-separated syntax like `rgb(0 0 0)` doesn't throw but gives a single value, or `NaN`s for `hsl()`.
      if (channel.split(' ').length === 3 && !channel.includes('NaN')) {
        return `var(--${name}Channel, ${channel})`;
      }
    } catch {
      // Not a supported color.
    }
  }
  return `var(--${name}Channel)`;
}

function attachColorManipulators(theme) {
  Object.assign(theme, {
    alpha(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `oklch(from ${color} l c h / ${typeof coefficient === 'string' ? `calc(${coefficient})` : coefficient})`;
      }
      if (obj.vars) {
        // To preserve the behavior of the CSS theme variables
        // In the future, this could be replaced by `color-mix` (when https://caniuse.com/?search=color-mix reaches 95%).
        // Raw colors (for example, `theme.palette.*`) have no channel tokens,
        // so they are converted to channels the same way the theme generates `*Channel` tokens,
        // which keeps a CSS coefficient (for example, `theme.vars.palette.action.hoverOpacity`) in `calc()`.
        const alphaValue = typeof coefficient === 'string' ? `calc(${coefficient})` : coefficient;
        // `color()` channels are not sRGB, so only the alpha is replaced to keep any color space and unit.
        if (color.startsWith('color(')) {
          return color.replace(/\s*(?:\/[^)]*)?\)$/, ` / ${alphaValue})`);
        }
        const channels = color.includes('var(')
          ? color.replace(
              /var\(--([^,\s)]+)(?:,((?:[^()]|\([^()]*\))+)\)|(?:,[^)]+)?\)+)/g,
              toChannelVar,
            )
          : safeColorChannel(toRgb(color));
        return `rgba(${channels} / ${alphaValue})`;
      }
      return systemAlpha(color, parseAddition(coefficient));
    },
    lighten(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `color-mix(in ${obj.colorSpace}, ${color}, #fff ${coefficientToPercentage(coefficient)})`;
      }
      return systemLighten(color, coefficient);
    },
    darken(color, coefficient) {
      const obj = this || theme;
      if (obj.colorSpace) {
        return `color-mix(in ${obj.colorSpace}, ${color}, #000 ${coefficientToPercentage(coefficient)})`;
      }
      return systemDarken(color, coefficient);
    },
  });
}

function createThemeNoVars(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    motion: motionInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    colorSpace,
    ...other
  } = options;

  if (
    options.vars &&
    // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
    // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
    options.generateThemeVars === undefined
  ) {
    throw /* minify-error */ new Error(
      'MUI: `vars` is a private field used for CSS variables support.\n' +
        // #host-reference
        'Please use another name or follow the [docs](https://next.mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature.',
    );
  }

  const palette = createPalette({ ...paletteInput, colorSpace });
  const systemTheme = systemCreateTheme(options);

  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    typography: createTypography(palette, typographyInput),
    motion: createMotion(motionInput),
    transitions: createTransitions(transitionsInput),
    zIndex: { ...zIndex },
  });

  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  // `reducedMotion` is owned by `theme.motion`; remove stale values preserved by systemCreateTheme.
  delete muiTheme.transitions.reducedMotion;

  // Normalize once so components read a resolved object, never the boolean. The color is a hex off
  // this (default) scheme; `createTheme` attaches a per-scheme copy so dark mode stays reactive.
  // Read the palette off `muiTheme` — a merge argument may have recolored it after `palette` was built.
  if (muiTheme.focusVisible != null && muiTheme.focusVisible !== false) {
    muiTheme.focusVisible = resolveFocusVisible(
      muiTheme.focusVisible,
      muiTheme.palette.primary.main,
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // TODO v6: Refactor to use globalStateClassesMapping from @mui/utils once `readOnly` state class is used in Rating component.
    const stateClasses = [
      'active',
      'checked',
      'completed',
      'disabled',
      'error',
      'expanded',
      'focused',
      'focusVisible',
      'required',
      'selected',
    ];

    const traverse = (node, component) => {
      let key;

      // eslint-disable-next-line guard-for-in
      for (key in node) {
        const child = node[key];
        if (stateClasses.includes(key) && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = generateUtilityClass('', key);
            console.error(
              [
                `MUI: The \`${component}\` component increases ` +
                  `the CSS specificity of the \`${key}\` internal state.`,
                'You can not override it like this: ',
                JSON.stringify(node, null, 2),
                '',
                `Instead, you need to use the '&.${stateClass}' syntax:`,
                JSON.stringify(
                  {
                    root: {
                      [`&.${stateClass}`]: child,
                    },
                  },
                  null,
                  2,
                ),
                '',
                'https://mui.com/r/state-classes-guide',
              ].join('\n'),
            );
          }
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };

    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;

      if (styleOverrides && component.startsWith('Mui')) {
        traverse(styleOverrides, component);
      }
    });
  }

  muiTheme.unstable_sxConfig = {
    ...defaultSxConfig,
    ...other?.unstable_sxConfig,
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this,
    });
  };
  muiTheme.toRuntimeSource = stringifyTheme; // for Pigment CSS integration

  attachColorManipulators(muiTheme);

  return muiTheme;
}

export default createThemeNoVars;
