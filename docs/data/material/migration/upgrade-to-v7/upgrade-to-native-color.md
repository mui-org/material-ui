# Upgrade to native color

<p class="description">This guide explains how to upgrade from JavaScript color manipulation to native color.</p>

Native color is an opt-in feature that replaces the JavaScript color manipulation with CSS `color-mix()` and relative colors.
Check out the [native color documentation](/material-ui/customization/css-theme-variables/native-color/) for more details.

## Prerequisites

Update Material UI to the latest version (or at least v7.3.0).

<!-- #npm-tag-reference -->

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material@next
```

```bash pnpm
pnpm add @mui/material@next
```

```bash yarn
yarn add @mui/material@next
```

</codeblock>

## Enable native color

Set the `cssVariables.nativeColor` option to `true` in the `createTheme()` function.

```js
const theme = createTheme({
  cssVariables: { nativeColor: true },
});
```

Once you've enabled native color, Material UI will start using CSS `color-mix()` and relative colors to manipulate colors.

To check that it's working, open the browser's developer tools. On the Elements tab, click the Styles panel and search for "color-mix".
You should see the Material UI color tokens appear as CSS variables.

## Handling JavaScript color manipulation

Your application might break if you're using the `alpha`, `lighten`, and `darken` functions from `@mui/*` to manipulate colors that have been updated to use native color.

For example, manipulating the `contrastText` token will break the application:

```js
import { alpha } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: { nativeColor: true },
});

// ❌ This will break because `alpha` does not support relative colors.
console.log(alpha(theme.palette.primary.contrastText, 0.3));
```

To fix this, you can use the `theme.alpha()` adapter function to manipulate colors.

```js
const theme = createTheme({
  cssVariables: { nativeColor: true },
});

// ✅ This will work because `theme.alpha` supports relative colors.
console.log(theme.alpha(theme.palette.primary.contrastText, 0.3));
```

The same applies to the `lighten` and `darken` functions.
Follow the codemod below to update multiple files at once.

## Remove usage of channel tokens

After enabling the native color, you **should not** rely on the `*Channel` tokens anymore because their values are not guaranteed to be channels (numbers separated by a white space).

Instead, use the theme color functions to manipulate colors like this:

```diff
- `rgba(${theme.vars.palette.primary.mainChannel} / 0.3)`
+ `theme.alpha((theme.vars || theme).palette.primary.main, 0.3)`
```

## Codemod

The codemod replaces the `alpha()`, `lighten()`, and `darken()` functions from `@mui/system/colorManipulator` or `@mui/material/styles` with theme color functions.

```bash
npx @mui/codemod@latest v7.0.0/theme-color-functions <path>
```

The following transformation example shows what the codemod does:

```diff
- import { alpha } from '@mui/system/colorManipulator';
- // or import { alpha } from '@mui/material/styles';

 styled('div')(({ theme }) => ({
   width: '100%',
   height: '100%',
   '&.good': {
-    backgroundColor: theme.vars
-      ? `rgba(${theme.vars.palette.success.mainChannel} /  0.3)`
-      : alpha(theme.palette.success.main, 0.3),
+    backgroundColor: theme.alpha((theme.vars || theme).palette.success.main, 0.3),
   },
   '&.bad': {
-    backgroundColor: theme.vars
-      ? `rgba(${theme.vars.palette.error.mainChannel} /  0.3)`
-      : alpha(theme.palette.error.main, 0.3),
+    backgroundColor: theme.alpha((theme.vars || theme).palette.error.main, 0.3),
   },
 }));
```
