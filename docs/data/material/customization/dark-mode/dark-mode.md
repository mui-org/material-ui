# Dark mode

<p class="description">Material UI comes with two palette modes: light (the default) and dark.</p>

:::success
Use the [Material UI theming agent skill](https://github.com/mui/material-ui/tree/master/skills/material-ui-theming) to give your AI coding assistant full context on dark mode, color schemes, and SSR behavior.
:::

## Dark mode only

You can make your application use the dark theme as the default—regardless of the user's preference—by adding `mode: 'dark'` to the `createTheme()` helper:

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>This app is using the dark mode</main>
    </ThemeProvider>
  );
}
```

Adding `mode: 'dark'` to the `createTheme()` helper modifies several palette values, as shown in the following demo:

{{"component": "file://./demos/dark-theme/index.ts", "bg": "inline", "hideToolbar": true}}

Adding `<CssBaseline />` inside of the `<ThemeProvider>` component will also enable dark mode for the app's background.

:::warning
Setting the dark mode this way only works if you are using [the default palette](/material-ui/customization/default-theme/). If you have a custom palette, make sure that you have the correct values based on the `mode`. The next section explains how to do this.
:::

### Overriding the dark palette

To override the default palette, provide a [palette object](/material-ui/customization/palette/#default-colors) with custom colors in hex, RGB, or HSL format:

```jsx
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5252',
    },
  },
});
```

Learn more about palette structure in the [Palette documentation](/material-ui/customization/palette/).

## System preference

Some users set a preference for light or dark mode through their operating system—either systemwide, or for individual user agents.
The following sections explain how to apply these preferences to an app's theme.

### Built-in support

Use the `colorSchemes` node to build an application with multiple color schemes.
The built-in color schemes are `light` and `dark` which can be enabled by setting the value to `true`.

The light color scheme is enabled by default, so you only need to set the dark color scheme:

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```

When `colorSchemes` is provided, the following features are activated:

- Automatic switching between light and dark color schemes based on the user's preference
- Synchronization between window tabs—changes to the color scheme in one tab are applied to all other tabs
- An option to [disable transitions](#disable-transitions) when the color scheme changes

:::info
The `colorSchemes` API is an enhanced version of the earlier and more limited `palette` API—the aforementioned features are only accessible with the `colorSchemes` API, so we recommend using it over the `palette` API.
If both `colorSchemes` and `palette` are provided, `palette` will take precedence.
:::

:::success
To test the system preference feature, follow the guide on [emulating the CSS media feature `prefers-color-scheme`](https://developer.chrome.com/docs/devtools/rendering/emulate-css#emulate_css_media_feature_prefers-color-scheme).
:::

### Accessing media prefers-color-scheme

You can make use of this preference with the [`useMediaQuery`](/material-ui/react-use-media-query/) hook and the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme) media query.

The following demo shows how to check the user's preference in their OS or browser settings:

```jsx
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return <div>prefersDarkMode: {prefersDarkMode.toString()}</div>;
}
```

## Toggling color mode

To give your users a way to toggle between modes for [built-in support](#built-in-support), use the `useColorScheme` hook to read and update the mode.

:::info
The `mode` is always `undefined` on first render, so make sure to handle this case as shown in the demo below—otherwise you may encounter a hydration mismatch error.
:::

{{"component": "file://./demos/toggle-color-mode/index.ts", "collapseToEmpty": true}}

## Storage manager

By default, the [built-in support](#built-in-support) for color schemes uses the browser's `localStorage` API to store the user's mode and scheme preference.

To use a different storage manager, create a custom function with this signature:

```ts
type Unsubscribe = () => void;

function storageManager(params: { key: string }): {
  get: (defaultValue: any) => any;
  set: (value: any) => void;
  subscribe: (handler: (value: any) => void) => Unsubscribe;
};
```

Then pass it to the `storageManager` prop of the `ThemeProvider` component:

```tsx
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { StorageManager } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function storageManager(params): StorageManager {
  return {
    get: (defaultValue) => {
      // Your implementation
    },
    set: (value) => {
      // Your implementation
    },
    subscribe: (handler) => {
      // Your implementation
      return () => {
        // cleanup
      };
    },
  };
}

function App() {
  return (
    <ThemeProvider theme={theme} storageManager={storageManager}>
      ...
    </ThemeProvider>
  );
}
```

:::warning
If you are using the `InitColorSchemeScript` component to [prevent SSR flickering](/material-ui/customization/css-theme-variables/configuration/#preventing-ssr-flickering), you have to include the `localStorage` implementation in your custom storage manager.
:::

### Disable storage

To disable the storage manager, pass `null` to the `storageManager` prop:

```tsx
<ThemeProvider theme={theme} storageManager={null}>
  ...
</ThemeProvider>
```

:::warning
Disabling the storage manager will cause the app to reset to its default mode whenever the user refreshes the page.
:::

## Disable transitions

To instantly switch between color schemes with no transition, apply the `disableTransitionOnChange` prop to the `ThemeProvider` component:

```jsx
<ThemeProvider theme={theme} disableTransitionOnChange>
  ...
</ThemeProvider>
```

## Disable double rendering

By default, the `ThemeProvider` rerenders when the theme contains light **and** dark color schemes to prevent SSR hydration mismatches.

To disable this behavior, use the `noSsr` prop:

```jsx
<ThemeProvider theme={theme} noSsr>
```

`noSsr` is useful if you are building:

- A client-only application, such as a single-page application (SPA). This prop will optimize the performance and prevent the dark mode flickering when users refresh the page.
- A server-rendered application with [Suspense](https://react.dev/reference/react/Suspense). However, you must ensure that the server render output matches the initial render output on the client.

## Setting the default mode

When `colorSchemes` is provided, the default mode is `system`, which means the app uses the system preference when users first visit the site.

To set a different default mode, pass the `defaultMode` prop to the ThemeProvider component:

```js
<ThemeProvider theme={theme} defaultMode="dark">
```

:::info
The `defaultMode` value can be `'light'`, `'dark'`, or `'system'`.
:::

### InitColorSchemeScript component

If you are using the `InitColorSchemeScript` component to [prevent SSR flicker](/material-ui/customization/css-theme-variables/configuration/#preventing-ssr-flickering), you have to set the `defaultMode` with the same value you passed to the `ThemeProvider` component:

```js
<InitColorSchemeScript defaultMode="dark">
```

## Styling in dark mode

Use the `theme.applyStyles()` utility to apply styles for a specific mode.

We recommend using this function over checking `theme.palette.mode` to switch between styles as it has more benefits:

<!-- #target-branch-reference -->

- It can be used with [Pigment CSS](https://github.com/mui/material-ui/tree/master/packages/pigment-css-react), our in-house zero-runtime CSS-in-JS solution.
- It is generally more readable and maintainable.
- It is slightly more performant as it doesn't require to do style recalculation but the bundle size of SSR generated styles is larger.

### Usage

With the `styled` function:

```jsx
import { styled } from '@mui/material/styles';

const MyComponent = styled('div')(({ theme }) => [
  {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  theme.applyStyles('dark', {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
]);
```

With the `sx` prop:

```jsx
import Button from '@mui/material/Button';

<Button
  sx={[
    (theme) => ({
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    (theme) =>
      theme.applyStyles('dark', {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
        },
      }),
  ]}
>
  Submit
</Button>;
```

:::warning
When `cssVariables: true`, styles applied with `theme.applyStyles()` have higher specificity than those defined outside of it.
So if you need to override styles, you must also use `theme.applyStyles()` as shown below:

```jsx
const BaseButton = styled('button')(({ theme }) =>
  theme.applyStyles('dark', {
    backgroundColor: 'white',
  }),
);

const AliceblueButton = styled(BaseButton)({
  backgroundColor: 'aliceblue', // In dark mode, backgroundColor will be white as theme.applyStyles() has higher specificity
});

const PinkButton = styled(BaseButton)(({ theme }) =>
  theme.applyStyles('dark', {
    backgroundColor: 'pink', // In dark mode, backgroundColor will be pink
  }),
);
```

:::

### API

`theme.applyStyles(mode, styles) => CSSObject`

Apply styles for a specific mode.

#### Arguments

- `mode` (`'light' | 'dark'`) - The mode for which the styles should be applied.
- `styles` (`CSSObject`) - An object that contains the styles to be applied for the specified mode.

#### Overriding applyStyles

You can override `theme.applyStyles()` with a custom function to gain complete control over the values it returns.
Please review the [source code](https://github.com/mui/material-ui/blob/HEAD/packages/mui-system/src/createTheme/applyStyles.ts) to understand how the default implementation works before overriding it.
For instance, if you need the function to return a string instead of an object so it can be used inside template literals:

```js
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: '.mode-%s',
  },
  colorSchemes: {
    dark: {},
    light: {},
  },
  applyStyles: function (key: string, styles: any) {
    // return a string instead of an object
    return `*:where(.mode-${key}) & {${styles}}`;
  },
});

const StyledButton = styled('button')`
  ${theme.applyStyles(
    'dark', `
      background: white;
    `
  )}
`;
```

### Codemod

We provide codemods to migrate your codebase from using `theme.palette.mode` to use `theme.applyStyles()`.
You can run each codemod below or all of them at once.

```bash
npx @mui/codemod@latest v6.0.0/styled <path/to/folder-or-file>
npx @mui/codemod@latest v6.0.0/sx-prop <path/to/folder-or-file>
npx @mui/codemod@latest v6.0.0/theme-v6 <path/to/theme-file>
```

> Run `v6.0.0/theme-v6` against the file that contains the custom `styleOverrides`. Ignore this codemod if you don't have a custom theme.

## Dark mode flicker

### The problem

Server-rendered apps are built before they reach the user's device.
This means they can't automatically adjust to the user's preferred color scheme when first loaded.

Here's what typically happens:

1. You load the app and set it to dark mode.
2. You refresh the page.
3. The app briefly appears in light mode (the default).
4. Then it switches back to dark mode once the app fully loads.

This "flash" of light mode happens every time you open the app, as long as your browser remembers your dark mode preference.

This sudden change can be jarring, especially in low-light environments.
It can strain your eyes and disrupt your experience, particularly if you interact with the app during this transition.

To better understand this issue, take a look at the animated image below:

<img src="/static/material-ui/dark-mode/dark-mode-flicker.gif" style="width: 814px; border-radius: 8px;" alt="An example video that shows a page that initially loads correctly in dark mode but quickly flickers to light mode." width="1628" height="400" />

### The solution: CSS variables

Solving this problem requires a novel approach to styling and theming.
(See this [RFC on CSS variables support](https://github.com/mui/material-ui/issues/27651) to learn more about the implementation of this feature.)

For applications that need to support light and dark mode using CSS media `prefers-color-scheme`, enabling the [CSS variables feature](/material-ui/customization/css-theme-variables/usage/#light-and-dark-modes) fixes the issue.

But if you want to be able to toggle between modes manually, avoiding the flicker requires a combination of CSS variables and the `InitColorSchemeScript` component.
Check out the [Preventing SSR flicker](/material-ui/customization/css-theme-variables/configuration/#preventing-ssr-flickering) section for more details.
