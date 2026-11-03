# Building extensible themes

<p class="description">Learn how to build extensible themes with Material UI.</p>

## Introduction

This guide describes recommendations for building a brand-specific theme with Material UI that can be easily extended and customized across multiple apps that consume it.

## Branded theme

This is the source of truth for the brand-specific theme.
It represents the brand's visual identity through colors, typography, spacing, and more.

In general, it's recommended to export tokens, components, and the branded theme from a file, as shown here:

```js title="brandedTheme.ts"
import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const brandedTokens: ThemeOptions = {
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: 'rgb(229, 229, 234)',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily:
      'var(--font-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
  },
};

export const brandedComponents: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        minWidth: 'unset',
        textTransform: 'capitalize',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
};

const brandedTheme = createTheme({
  ...brandedTokens,
  components: brandedComponents,
});

export default brandedTheme;
```

For a more optimized approach, you can split the branded components into multiple files.
This way, consumers of the theme can choose to import only what they need at the application level.

```js title="brandedButtons.ts"
import type { ThemeOptions } from "@mui/material/styles";

export const buttonTheme: ThemeOptions["components"] = {
  MuiButtonBase: {},
  MuiButton: {},
  MuiIconButton: {},
};
```

```js title="brandedTheme.ts"
import { buttonTheme } from './brandedButtons';
// import other branded components as needed

export const brandedTokens: ThemeOptions = {}

export default createTheme({
  ...brandedTokens,
  components: {
    ...buttonTheme,
    // other branded components
  },
});
```

## Application theme

Consumers of the branded theme may choose to use it directly in their applications, or extend it to better suit their specific use cases.
Using the branded button as an example, a consumer could customize its hover styles as shown below:

```js title="appTheme.ts"
import { createTheme } from '@mui/material/styles';
import { brandedTokens, brandedComponents } from './brandedTheme'; // or from an npm package.

const appTheme = createTheme({
  ...brandedTokens,
  palette: {
    ...brandedTokens.palette,
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    ...brandedComponents,
    MuiButton: {
      styleOverrides: {
        root: [
          // Use array syntax to preserve the branded theme styles.
          brandedComponents?.MuiButton?.styleOverrides?.root,
          {
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        ],
      },
    },
  },
});
```

### Merging branded theme

When merging the branded theme with the application theme, it's recommended to use the object spread syntax for tokens like palette, typography, and shape.

For components, use the array syntax to ensure that the [variants](/material-ui/customization/theme-components/#variants), states, and pseudo-class styles from the branded theme are preserved.

:::warning
We don't recommend JavaScript functions or any utilities to do a deep merge between the branded and the application theme.

Doing so will introduce performance overhead on the first render of the application. The impact depends on the size of the themes.
:::

## Full example

{{"component": "file://./demos/extensible-themes/index.ts", "initialExpanded": true}}
