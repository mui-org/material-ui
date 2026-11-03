# CSS theme variables - Usage

<p class="description">Learn how to adopt CSS theme variables.</p>

## Getting started

To use CSS theme variables, create a theme with `cssVariables: true` and wrap your app with `ThemeProvider`.

After rendering, you'll see CSS variables in the `:root` stylesheet of your HTML document.
By default, these variables are flattened and prefixed with `--mui`:

<codeblock>

```jsx JSX
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({ cssVariables: true });

function App() {
  return <ThemeProvider theme={theme}>{/* ...your app */}</ThemeProvider>;
}
```

```css CSS
:root {
  --mui-palette-primary-main: #1976d2;
  --mui-palette-primary-light: #42a5f5;
  --mui-palette-primary-dark: #1565c0;
  --mui-palette-primary-contrastText: #fff;
  /* ...other variables */
}
```

</codeblock>

:::info
If you're using the experimental `CssVarsProvider` API, replace it with `ThemeProvider`.
All features that were previously available to the `CssVarsProvider` are now available with the `ThemeProvider`.
:::

## Light and dark modes

When the [built-in dark color scheme](/material-ui/customization/dark-mode/#built-in-support) and `cssVariables` are enabled, both light and dark CSS variables are generated with the default CSS media `prefers-color-scheme` method.

This method works with server-side rendering without extra configuration. However, users won't be able to toggle between modes because the styles are based on the browser media.

If you want to be able to manually toggle modes, see the guide to [toggling dark mode manually](/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually).

## Applying dark styles

To customize styles for dark mode, use the [`theme.applyStyles()` function](/material-ui/customization/dark-mode/#styling-in-dark-mode).

The example below shows how to customize the Card component for dark mode:

```js
import Card from '@mui/material/Card';

<Card
  sx={[
    (theme) => ({
      backgroundColor: theme.vars.palette.background.default,
    }),
    (theme) =>
      theme.applyStyles('dark', {
        backgroundColor: theme.vars.palette.grey[900],
      }),
  ]}
/>;
```

:::warning
Do not use `theme.palette.mode` to switch between light and dark styles—this produces an [unwanted flickering effect](/material-ui/customization/css-theme-variables/configuration/#preventing-ssr-flickering).
:::

## Using theme variables

When the CSS variables feature is enabled, the `vars` node is added to the theme.
This `vars` object mirrors the structure of a serializable theme, with each value corresponding to a CSS variable.

- `theme.vars` (recommended): an object that refers to the CSS theme variables.

  ```js
  const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.vars.palette.primary.main, // var(--mui-palette-primary-main)
    color: theme.vars.palette.primary.contrastText, // var(--mui-palette-primary-contrastText)
  }));
  ```

  For **TypeScript**, the typings are not enabled by default.
  Follow the [TypeScript setup](#typescript) to enable the typings.

  :::success
  If the components need to render outside of the `CssVarsProvider`, add fallback to the theme object.

  ```js
  backgroundColor: (theme.vars || theme).palette.primary.main;
  ```

  :::

- **Native CSS**: if you can't access the theme object, for example in a pure CSS file, you can use [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/var) directly:

  ```css
  /* external-scope.css */
  .external-section {
    background-color: var(--mui-palette-grey-50);
  }
  ```

## Color channel tokens

Enabling `cssVariables` automatically generates channel tokens which are used to create translucent colors.
These tokens consist of color space channels without the alpha component, separated by spaces.

The colors are suffixed with `Channel`—for example:

```js
const theme = createTheme({ cssVariables: true });

console.log(theme.palette.primary.mainChannel); // '25 118 210'
// This token is generated from `theme.colorSchemes.light.palette.primary.main`.
```

You can use the channel tokens to create a translucent color like this:

```js
const theme = createTheme({
  cssVariables: true,
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          variants: [
            {
              props: { variant: 'outlined', color: 'primary' },
              style: {
                backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`,
              },
            },
          ],
        }),
      },
    },
  },
});
```

:::warning
Don't use a comma (`,`) as a separator because the channel colors use empty spaces to define [transparency](https://www.w3.org/TR/css-color-4/#transparency):

```js
`rgba(${theme.vars.palette.primary.mainChannel}, 0.12)`, // 🚫 this does not work
`rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`, // ✅ always use `/`
```

:::

## Adding new theme tokens

You can add other key-value pairs to the theme input which will be generated as a part of the CSS theme variables:

```js
const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        // The best part is that you can refer to the variables wherever you like 🤩
        gradient:
          'linear-gradient(to left, var(--mui-palette-primary-main), var(--mui-palette-primary-dark))',
        border: {
          subtle: 'var(--mui-palette-neutral-200)',
        },
      },
    },
    dark: {
      palette: {
        gradient:
          'linear-gradient(to left, var(--mui-palette-primary-light), var(--mui-palette-primary-main))',
        border: {
          subtle: 'var(--mui-palette-neutral-600)',
        },
      },
    },
  },
});

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```

Then, you can access those variables from the `theme.vars` object:

```js
const Divider = styled('hr')(({ theme }) => ({
  height: 1,
  border: '1px solid',
  borderColor: theme.vars.palette.border.subtle,
  backgroundColor: theme.vars.palette.gradient,
}));
```

Or use `var()` to refer to the CSS variable directly:

```css
/* global.css */
.external-section {
  background-color: var(--mui-palette-gradient);
}
```

:::warning
If you're using a [custom prefix](/material-ui/customization/css-theme-variables/configuration/#customizing-variable-prefix), make sure to replace the default `--mui`.
:::

For **TypeScript**, you need to augment the [palette interfaces](#palette-interfaces).

## TypeScript

The theme variables type is not enabled by default. You need to import the module augmentation to enable the typings:

```ts
// The import can be in any file that is included in your `tsconfig.json`
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

const StyledComponent = styled('button')(({ theme }) => ({
  // ✅ typed-safe
  color: theme.vars.palette.primary.main,
}));
```

### Palette interfaces

To add new tokens to the theme palette, you need to augment the `PaletteOptions` and `Palette` interfaces:

```ts
declare module '@mui/material/styles' {
  interface PaletteOptions {
    gradient: string;
    border: {
      subtle: string;
    };
  }
  interface Palette {
    gradient: string;
    border: {
      subtle: string;
    };
  }
}
```

## Next steps

If you need to support system preference and manual selection, check out the [advanced configuration](/material-ui/customization/css-theme-variables/configuration/)
