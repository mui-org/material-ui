# CSS theme variables

<p class="description">An overview of adopting CSS theme variables in Material UI.</p>

[CSS variables](https://www.w3.org/TR/css-variables-1/) are a modern cross-browser feature that let you declare variables in CSS and reuse them in other properties.

:::info
If this is your first time encountering CSS variables, you should check out [the MDN Web Docs on CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) before continuing here.
:::

## Introduction

CSS theme variable support is a new feature in MUI System added in [`v5.0.5`](https://github.com/mui/material-ui/releases/tag/v5.0.5) as an experimental export. It tells the underlying Material UI or even custom UI library components to use the generated CSS theme variables instead of raw values. This provides significant improvements in developer experience related to theming and customization.
With these variables, you can inject a theme into your app's stylesheet _at build time_ to apply the user's selected settings before the whole app is rendered.
Learn more about the [advantages](/material-ui/customization/css-theme-variables/overview/#advantages) and [trade-offs](/material-ui/customization/css-theme-variables/overview/#trade-offs) of using CSS theme variables.

### Advantages

- It lets you prevent [dark-mode SSR flickering](https://github.com/mui/material-ui/issues/27651).
- You can create unlimited color schemes beyond `light` and `dark`.
- It offers a better debugging experience not only for developers but also designers on your team.
- The color scheme of your website is automatically synced between browser tabs.
- It simplifies integration with third-party tools because CSS theme variables are available globally.
- It reduces the need for a nested theme when you want to apply dark styles to a specific part of your application.

## Trade-offs

For server-side applications, there are some trade-offs to consider:

|                                                              | Compare to the default method | Reason                                                                                                         |
| :----------------------------------------------------------- | :---------------------------- | :------------------------------------------------------------------------------------------------------------- |
| HTML size                                                    | Bigger                        | CSS variables are generated for both light and dark mode at build time.                                        |
| [First Contentful Paint (FCP)](https://web.dev/articles/fcp) | Longer                        | Since the HTML size is bigger, the time to download the HTML before showing the content is bit longer.         |
| [Time to Interactive (TTI)](https://web.dev/articles/tti)    | Shorter (for dark mode)       | Stylesheets are not regenerated between light and dark mode, a lot less time is spent running JavaScript code. |

:::warning
The comparison described in the table above may not be applicable to large and complex applications since there are so many factors that can impact performance metrics.
:::

## Usage

The CSS variables API usage is exposed as a higher order function called `unstable_createCssVarsProvider` which can be called to create a theme provider and other utilities to share the theme config throughout your app. This is a very low-level function and has a lot of moving parts.
If you're using [Material UI](/material-ui/customization/css-theme-variables/overview/), it exposes its own `CssVarsProvider` component that you can use directly without configuring your theme.

We'll first define a minimal theme palette for light and dark modes.

```js
// extendTheme.js
import {
  unstable_createGetCssVar as systemCreateGetCssVar,
  unstable_prepareCssVars as prepareCssVars,
} from '@mui/system';

const lightColorScheme = {
  palette: {
    mode: 'light',
    primary: {
      default: '#3990FF',
      dark: '#02367D',
    },
    text: {
      default: '#111111',
    },
    // ... other colors
  },
};

const darkColorScheme = {
  palette: {
    mode: 'dark',
    primary: {
      default: '#265D97',
      dark: '#132F4C',
      main: '#5090D3',
    },
    text: {
      default: '#ffffff',
    },
    // ... other colors
  },
};

const createGetCssVar = (cssVarPrefix = 'my-app') =>
  systemCreateGetCssVar(cssVarPrefix);

function extendTheme({ cssVarPrefix = 'my-app' } = {}) {
  const getCssVar = createGetCssVar(cssVarPrefix);
  const theme = {
    colorSchemes: {
      light: lightColorScheme,
      dark: darkColorScheme,
    },
    // ... any other objects independent of color-scheme,
    // like fontSizes, spacing tokens, etc
  };

  const { vars: themeVars, generateCssVars } = prepareCssVars(
    { colorSchemes: theme.colorSchemes },
    {
      prefix: cssVarPrefix,
    },
  );
  theme.vars = themeVars;
  theme.generateCssVars = generateCssVars;
  theme.palette = {
    ...theme.colorSchemes.light.palette,
    colorScheme: 'light',
  };

  return theme;
}

const myCustomDefaultTheme = extendTheme();

export default myCustomDefaultTheme;
```

Here, the returned `theme` object needs to follow a certain structure to be used correctly by the final `CssVarsProvider`. It should have a `colorSchemes` key with the light and dark (and any other) palette. `prepareCssVars` import from `@mui/system` is used to create CSS variable names which can then be easily accessed using the returned `vars`. This is also added to the `theme` object. Finally, `myCustomDefaultTheme` theme object is created that can now be passed to the `createCssVarsProvider` to get a `CssVarsProvider`.

```js
// CssVarsProvider.js
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
  theme: myCustomDefaultTheme,
});

export { CssVarsProvider, useColorScheme };
```

Now wrap your top level app component with this `CssVarsProvider` component and then you can access the passed theme value to any of the components rendered inside the provider.

Example of a component using the CSS variable -

```js
// Button.js
import { styled } from '@mui/system';

const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.vars.palette.primary.default,
  border: `1px solid ${theme.vars.palette.primary.dark}`,
  color: theme.vars.palette.text.default,
}));

export default Button;
```

The hook, `useColorScheme` can be used to get the current `mode` (light or dark) and can also update the mode like:

```js
// App.js
function App() {
  const { setMode, mode } = useColorScheme();
  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <div>
      <h1>Current Mode: {mode}</h1>
      <Button onClick={toggleMode}>Toggle Mode</Button>
    </div>
  );
}

// main.js
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { CssVarsProvider } from './CssVarsProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider>
    <App />
  </CssVarsProvider>,
);
```

Now, the Button's `backgroundColor`, `borderColor` and text `color` values will correctly use the colors based on the selected `mode`.

### Demo

{{"component": "file://./demos/create-css-vars-provider/index.ts"}}

For framework- or language-specific setup instructions, see [CSS theme variables—Usage—Server-side rendering](/material-ui/customization/css-theme-variables/usage/).
For framework or language specific setup, see [this](/material-ui/customization/css-theme-variables/usage/)

<!-- #target-branch-reference -->

See the complete usage of `createCssVarsProvider` in [Material UI](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/ThemeProviderWithVars.tsx).

## API

### `createCssVarsProvider` options

- `modeStorageKey?`: localStorage key used to store application `mode` (`mode` by default)
- `colorSchemeStorageKey?`: localStorage key used to store `colorScheme`
- `defaultColorScheme`: Design system default color scheme (string or object depending on if the design system has 1 or more themes, can be `light` or `dark`)
- `defaultMode?`: Design system default mode (`light` by default)
- `disableTransitionOnChange?`: Disable CSS transitions when switching between modes or color schemes (`false` by default)
- `themeId?`: The design system's unique id for getting the corresponded theme when there are multiple design systems.
- `theme`: Design system default theme. It's structure, besides the minimum requirements by `createCssVarsProvider`, is upto the design system to implement.
- `resolveTheme(theme: Theme) => Theme`: A function to be called after the CSS variables are attached. The result of this function will be the final theme pass to `ThemeProvider`.

`createCssVarsProvider` returns 3 items.

### `<CssVarsProvider>` props

- `defaultMode?: 'light' | 'dark' | 'system'` - Application's default mode (`light` by default)
- `disableTransitionOnChange : boolean` - Disable CSS transitions when switching between modes
- `theme: ThemeInput` - The theme provided to React's context. It should have these fields:
  - `colorSchemes: { [key: string]: ColorScheme }` - The color schemes for the application
  - `colorSchemeSelector: 'media' | 'class' | 'data' | string`: - The method to apply CSS theme variables and component styles
  - `generateStyleSheets: () => Record<string, string>` - Function to generate CSS variables
  - `generateThemeVars: () => Record<string, any>` - Function to generate CSS variables reference for the `theme.vars`
- `modeStorageKey?: string` - localStorage key used to store application `mode`

### `useColorScheme: () => ColorSchemeContextValue`

- `mode: string` - The user's selected mode
- `setMode: mode => {…}` - Function for setting the `mode`. The `mode` is saved to internal state and local storage; if `mode` is null, it will be reset to the default mode

### `getInitColorSchemeScript: (options) => React.ReactElement`

**options**

- `defaultMode?: 'light' | 'dark' | 'system'`: - Application's default mode before React renders the tree (`light` by default)
- `modeStorageKey?: string`: - localStorage key used to store application `mode`
- `attribute?: string` - DOM attribute for applying color scheme
