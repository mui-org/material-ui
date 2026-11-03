# CSS theme variables - Configuration

<p class="description">A guide for configuring CSS theme variables in Material UI.</p>

## Customizing variable prefix

To change the default variable prefix (`--mui`), provide a string to `cssVarPrefix` property, as shown below:

```js
createTheme({ cssVariables: { cssVarPrefix: 'any' } });

// generated stylesheet:
// --any-palette-primary-main: ...;
```

To remove the prefix, use an empty string as a value:

```js
createTheme({ cssVariables: { cssVarPrefix: '' } });

// generated stylesheet:
// --palette-primary-main: ...;
```

## Toggling dark mode manually

To toggle between modes manually, set the `colorSchemeSelector` with one of the following selectors:

- `class`: adds a class to the `<html>` element.

  ```js class
  createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'class'
    }
  });

  // CSS Result
  .light { ... }
  .dark { ... }
  ```

- `data`: adds a data attribute to the `<html>` element.

  ```js data
  createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'data'
    }
  });

  // CSS Result
  [data-light] { ... }
  [data-dark] { ... }
  ```

- `string`: adds a custom selector to the `<html>` element.

  ```js string
  // The value must start with dot (.) for class or square brackets ([]) for data
  createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: '.theme-%s'
    }
  });

  // CSS Result
  .theme-light { ... }
  .theme-dark { ... }
  ```

Then, use `useColorScheme` hook to switch between modes:

```jsx
import { useColorScheme } from '@mui/material/styles';

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <select
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
        // For TypeScript, cast `event.target.value as 'light' | 'dark' | 'system'`:
      }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

:::success
After React hydrates the tree, the mode is set to `system` to follow the user's preference.
:::

### Determining the system mode

To determine if the system mode is `light` or `dark`, use the `systemMode` property:

```js
const { mode, systemMode } = useColorScheme();

console.log(mode); // 'system'
console.log(systemMode); // 'light' | 'dark'
```

However, if the mode is **not** `system`, the `systemMode` will be `undefined`.

```js
const { mode, systemMode } = useColorScheme();

console.log(mode); // 'light' | 'dark'
console.log(systemMode); // undefined
```

### Preventing SSR flickering

For SSR (server-side rendering) applications, Material UI cannot detect the user-selected mode on the server, causing the screen to flicker from light to dark during the hydration phase on the client.

To prevent the issue, you need to ensure that there is no usage of `theme.palette.mode === 'dark'` in your code base.

If you have such a condition, replace it with the [`theme.applyStyles()` function](/material-ui/customization/dark-mode/#styling-in-dark-mode):

```diff
 import Card from '@mui/material/Card';

 function App() {
   return (
     <Card
-      sx={(theme) => ({
-        backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
-        '&:hover': {
-          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
-        },
-      })}
+      sx={[
+        {
+          backgroundColor: '#fff',
+          '&:hover': {
+            backgroundColor: '#f5f5f5',
+          },
+        },
+        (theme) =>
+          theme.applyStyles('dark', {
+            backgroundColor: '#000',
+            '&:hover': {
+              backgroundColor: '#333',
+            },
+          }),
+      ]}
     />
   );
 }
```

Next, if you have a custom selector that is **not** `media`, add the [`InitColorSchemeScript`](/material-ui/react-init-color-scheme-script/) component based on the framework that you are using:

:::success
The `attribute` has to be the same as the one you set in the `colorSchemeSelector` property:

```js
createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  }
})

<InitColorSchemeScript attribute="class" />
```

:::

### Next.js App Router

Add the following code to the [root layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts) file:

```jsx title="app/layout.js"
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout(props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* must come before the <main> element */}
        <InitColorSchemeScript attribute="class" />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

:::warning
If you don't add `suppressHydrationWarning` to your `<html>` tag, you will see warnings about `"Extra attributes from the server"` because `InitColorSchemeScript` updates that element.
:::

### Next.js Pages Router

Add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/pages/building-your-application/routing/custom-document) file:

```jsx title="pages/_document.js"
import Document, { Html, Head, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>...</Head>
        <body>
          {/* must come before the <Main> element */}
          <InitColorSchemeScript attribute="class" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Gatsby

Place the script in your [`gatsby-ssr.js`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) file:

```jsx
import * as React from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([<InitColorSchemeScript attribute="class" />]);
}
```

## Forcing a specific color scheme

To force a specific color scheme for some part of your application, set the selector to the component or HTML element directly.

In the example below, all the components inside the `div` will always be dark:

<codeblock>

```js class
// if the selector is '.mode-%s'
<div className=".mode-dark">
  <Paper sx={{ p: 2 }}>
    <TextField label="Email" type="email" margin="normal" />
    <TextField label="Password" type="password" margin="normal" />
    <Button>Sign in</Button>
  </Paper>
  {/* other components */}
</div>
```

```js data-attribute
// if the selector is '[data-mode-%s]'
<div data-mode-dark>
  <Paper sx={{ p: 2 }}>
    <TextField label="Email" type="email" margin="normal" />
    <TextField label="Password" type="password" margin="normal" />
    <Button>Sign in</Button>
  </Paper>
  {/* other components */}
</div>
```

</codeblock>

## Disabling CSS color scheme

By default, `createTheme()` attaches a [CSS `color-scheme` property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme) based on the palette mode.
You can disable this by setting `disableCssColorScheme` to `true`:

```js
createTheme({
  cssVariables: { disableCssColorScheme: true },
});
```

The generated CSS will not include the `color-scheme` property:

```diff
 @media (prefers-color-scheme: dark) {
   :root {
-    color-scheme: dark;
     --mui-palette-primary-main: #90caf9;
     ...
   }
 }
```

## Instant transition between color schemes

To disable CSS transitions when switching between modes, apply the `disableTransitionOnChange` prop:

```js
<ThemeProvider disableTransitionOnChange />
```

{{"component": "file://./demos/disable-transition-on-change/index.ts"}}

## Force theme recalculation between modes

By default, the `ThemeProvider` does not re-render when switching between light and dark modes when `cssVariables: true` is set in the theme.

If you want to opt-out from this behavior, use the `forceThemeRerender` prop in the ThemeProvider:

```js
<ThemeProvider forceThemeRerender />
```
