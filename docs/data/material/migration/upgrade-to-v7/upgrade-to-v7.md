# Upgrade to v7

<p class="description">This guide explains how to upgrade from Material UI v6 to v7.</p>

## Why you should upgrade to Material UI v7

### Improved ESM support

The package layout has been updated, and now unambiguously supports both valid ESM and CommonJS through the `exports` field in `package.json`.
You can read more about package exports in the [Node.js documentation](https://nodejs.org/api/packages.html#packages_exports).

This update fixes several issues with popular bundlers like Vite and webpack, and makes it possible to load MUI packages from ES modules under Node.js.

### Quality-of-life improvements

Material UI v7 features other quality-of-life improvements, including:

- Standardization of the slot pattern across all components
- CSS layers support via the `enableCssLayer` prop in `StyledEngineProvider` for client-side apps, and `AppRouterCacheProvider` for Next.js App Router apps
- Removed deprecated APIs to reduce the API surface and make the docs easier to navigate

If you're using any of these packages, you should also update their versions to `"7.0.0"`:

- `@mui/icons-material`
- `@mui/system`
- `@mui/lab`
- `@mui/material-nextjs`
- `@mui/styled-engine`
- `@mui/styled-engine-sc`
- `@mui/utils`

Note that MUI X packages _do not_ follow the same versioning strategy as Material UI.
If you're using any of the following packages, they should remain unchanged during the upgrade process:

- `@mui/x-data-grid`
- `@mui/x-data-grid-pro`
- `@mui/x-data-grid-premium`
- `@mui/x-date-pickers`
- `@mui/x-date-pickers-pro`
- `@mui/x-charts`
- `@mui/x-tree-view`
- `@mui/x-tree-view-pro`

## Minimum TypeScript version

The minimum supported version of TypeScript has been increased from v4.7 to 4.9.

:::info
We align with [support window](https://github.com/DefinitelyTyped/DefinitelyTyped?tab=readme-ov-file#support-window) by [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (published on npm under the `@types` namespace).

We will not change the minimum supported version in a minor version of Material UI.
However, we recommend not using a TypeScript version older than the lowest supported version by DefinitelyTyped.
:::

For `@types/react*` packages, make sure they are the same major version as the `react` you are using.
Use the snippet below to update your project if needed (replace the `<version>` with the major version of `react` you are using):

<codeblock storageKey="package-manager">

```bash npm
npm install @types/react@<version> @types/react-dom@<version>
```

```bash pnpm
pnpm add @types/react@<version> @types/react-dom@<version>
```

```bash yarn
yarn add @types/react@<version> @types/react-dom@<version>
```

</codeblock>

:::warning
Make sure that your application is still running without errors, and commit the changes before continuing to the next step.
:::

## React 18 and below

If you are using React 18 or below, you need to set up a resolution of `react-is` package to the same version as the `react` you are using.

For example, if you are using `react@18.3.1`, do the following steps:

1. Install `react-is@18.3.1`.

<codeblock storageKey="package-manager">

```bash npm
npm install react-is@18.3.1
```

```bash pnpm
pnpm add react-is@18.3.1
```

```bash yarn
yarn add react-is@18.3.1
```

</codeblock>

2. Set the resolutions or overrides in the `package.json`.

<codeblock storageKey="package-manager">

```json npm
{
  …
  "overrides": {
    "react-is": "^18.3.1"
  }
}
```

```json pnpm
{
  …
  "overrides": {
    "react-is": "^18.3.1"
  }
}
```

```json yarn
{
  …
  "resolutions": {
    "react-is": "^18.3.1"
  }
}
```

</codeblock>

### Why is this needed?

Material UI v7 uses `react-is@19`, which changed how React elements are identified.

If you're on React 18 or below, mismatched versions of `react-is` can cause runtime errors in prop type checks.
Forcing `react-is` to match your React version prevents these errors.

## Deprecations

It is not required to immediately go through the deprecations in order to use Material UI v7.

You can do it at your own pace by checking out the [deprecations page](/material-ui/migration/v7/migrating-from-deprecated-apis/).
Those deprecations will be removed in the next major version.

## Breaking changes

Since v7 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v6 to v7 are described below.

### Package layout updated

The package layout has been updated to use the Node.js exports field. This brings several changes:

Deep imports with more than one level are no longer working, at all (they were already considered private API). For example:

```diff
-import createTheme from '@mui/material/styles/createTheme';
+import { createTheme } from '@mui/material/styles';
```

This was never officially supported, but now it will be restricted by bundlers and runtimes.

Modern bundles have also been removed, as the potential for a smaller bundle size is no longer significant.
If you've configured aliases for these bundles, you must remove them now.

```diff
 {
   resolve: {
     alias: {
-      '@mui/material': '@mui/material/modern',
-      '@mui/styled-engine': '@mui/styled-engine/modern',
-      '@mui/system': '@mui/system/modern',
-      '@mui/base': '@mui/base/modern',
-      '@mui/utils': '@mui/utils/modern',
-      '@mui/lab': '@mui/lab/modern',
     }
   }
 }
```

:::info
Earlier versions of this guide mention the existence of a `mui-modern` conditional exports.
This has since been removed.
This is a non-breaking change, and your bundler will fall back to the ESM bundle.
:::

If you are using a Vite alias to force ESM imports for the icons package, you should remove it as it's no longer necessary:

```diff
 // vite.config.js
   resolve: {
     alias: [
-      {
-        find: /^@mui\/icons-material\/(.*)/,
-        replacement: "@mui/icons-material/esm/$1",
-      },
     ],
   },
```

If you are augmenting the theme and using declarations for nested imports, you should replace them with `@mui/material/styles`. You may also have to rename an interface as some are exported from `@mui/material/styles` under a different name:

```diff
-declare module '@mui/material/styles/createTypography' {
+declare module '@mui/material/styles' {
-  interface TypographyOptions {
+  interface TypographyVariantsOptions {
     // ...
   }

-  interface Typography {
+  interface TypographyVariants {
     // ...
   }
 }
```

### Grid and Grid2 renamed

The deprecated `Grid` component has been renamed to `GridLegacy`.
The `Grid2` component has been moved to the `Grid` namespace.
Depending on your project, you may follow one of the following approaches:

1. **If you are using the deprecated grid and wish to upgrade,** run the following codemod:

   <!-- #npm-tag-reference -->

   ```bash
   npx @mui/codemod@next v7.0.0/grid-props <path/to/folder>
   ```

   See the [Grid upgrade guide](/material-ui/migration/upgrade-to-grid-v2/) for more information.

2. **If you are using the deprecated grid and wish to continue using it,** update the `Grid` references as follows:

   ```diff
    // imports
   -import Grid, { gridClasses, GridProps } from '@mui/material/Grid';
   +import Grid, { gridLegacyClasses, GridLegacyProps } from '@mui/material/GridLegacy';

   -import { Grid } from '@mui/material';
   +import { GridLegacy as Grid } from '@mui/material';

    // theme
    const theme = createTheme({
      components: {
   -    MuiGrid: {
   +    MuiGridLegacy: {
          // ...
        },
      },
    });

    // CSS classes
   -.MuiGrid-root
   +.MuiGridLegacy-root
   ```

3. **If you are using Grid2,** update the `Grid2` references as follows:

   ```diff
    // imports
   -import Grid, { grid2Classes as gridClasses, Grid2Props as GridProps } from '@mui/material/Grid2';
   +import Grid, { gridClasses, GridProps } from '@mui/material/Grid';

   -import { Grid2 as Grid } from '@mui/material';
   +import { Grid } from '@mui/material';

    // theme
    const theme = createTheme({
      components: {
   -    MuiGrid2: {
   +    MuiGrid: {
          // ...
        },
      },
    });

    // CSS classes
   -.MuiGrid2-root
   +.MuiGrid-root
   ```

### InputLabel size prop standardized

The `size` prop for `InputLabel` now follows the standard naming convention used across other components like `Button` and `TextField`. `'normal'` has been replaced with `'medium'` for consistency.

If you were using `size="normal"`, update it to `size="medium"`:

```diff
-<InputLabel size="normal">Label</InputLabel>
+<InputLabel size="medium">Label</InputLabel>
```

The default behavior remains unchanged, so no updates are needed unless you explicitly set `size="normal"`.

Use this codemod to automatically update the `size` value:

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/input-label-size-normal-medium <path/to/folder>
```

**Note:** Because the default size of `InputLabel` was changed from `normal` to `medium`, the class `MuiInputLabel‑sizeMedium` is no longer added. If you relied on this class for custom styling, use a different class.

### SvgIcon's data-testid removed

The default `data-testid` prop has been removed from the icons in `@mui/icons-material` in production bundles. This change ensures that the `data-testid` prop is only defined where needed, reducing the potential for naming clashes and removing unnecessary properties in production.

If your test relied on those, add it back in your tests where needed.

### TablePaginationActions types import path changed

The import path for the types has changed from `@mui/material/TablePagination/TablePaginationActions` to `@mui/material/TablePaginationActions`.

```diff
- import type { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
+ import type { TablePaginationActionsProps } from '@mui/material/TablePaginationActions';
```

### Theme behavior changes

When CSS theme variables is enabled with built-in light and dark color schemes, the theme no longer changes between modes.
The snippet below demonstrates this behavior when users toggle the dark mode, the `mode` state from `useColorScheme` changes, but the theme object no longer changes:

```js
import {
  ThemeProvider,
  createTheme,
  useTheme,
  useColorScheme,
} from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});
console.log(theme.palette.mode); // 'light' is the default mode

function ColorModeToggle() {
  const { setMode, mode } = useColorScheme();
  const theme = useTheme();

  React.useEffect(() => {
    console.log(mode); // logged 'light' at first render, and 'dark' after the button click
  }, [mode]);

  React.useEffect(() => {
    // logged 'light' at first render, no log after the button click
    console.log(theme.palette.mode);
  }, [theme]);

  return <button onClick={() => setMode('dark')}>Toggle dark mode</button>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeToggle />
    </ThemeProvider>
  );
}
```

This default behavior was made to improve performance by avoiding unnecessary re-renders when the mode changes.

It's recommended to use the `theme.vars.*` as values in your styles to refer to the CSS variables directly:

```js
const Custom = styled('div')(({ theme }) => ({
  color: theme.vars.palette.text.primary,
  background: theme.vars.palette.primary.main,
}));
```

If you need to do runtime calculations, we recommend using CSS instead of JavaScript whenever possible.
For example, adjusting the alpha channel of a color can be done using the [`color-mix` function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix):

```js
const Custom = styled('div')(({ theme }) => ({
  color: `color-mix(in srgb, ${theme.vars.palette.text.primary}, transparent 50%)`,
}));
```

However, if CSS approach is not possible, you can access the value directly from the `theme.colorSchemes` object, then apply both light and dark styles:

```js
const Custom = styled('div')(({ theme }) => ({
  color: alpha(theme.colorSchemes.light.palette.text.primary, 0.5),
  ...theme.applyStyles('dark', {
    color: alpha(theme.colorSchemes.dark.palette.text.primary, 0.5),
  }),
}));
```

If any of the methods above do not suit your project, you can opt out from this behavior by passing the `forceThemeRerender` prop to the ThemeProvider component:

```js
<ThemeProvider forceThemeRerender />
```

### Deprecated APIs removed

APIs that were deprecated in v5 have been removed in v7.

#### createMuiTheme function

The deprecated `createMuiTheme` function has been removed.
Use `createTheme` instead.

```diff
-import { createMuiTheme } from '@mui/material/styles';
+import { createTheme } from '@mui/material/styles';
```

#### Dialog's onBackdropClick prop

The deprecated `onBackdropClick` prop has been removed from the `Dialog` component.
Please use the [`onClose`](/material-ui/api/dialog/#dialog-prop-onClose) callback instead, which receives the event and the reason for the dialog closing.
Here's an example of how to use it:

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      // Handle the backdrop click
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* Dialog content */}
    </Dialog>
  );
}
```

#### experimentalStyled function

The deprecated `experimentalStyled` function has been removed.
Use `styled` instead.

```diff
-import { experimentalStyled as styled } from '@mui/material/styles';
+import { styled } from '@mui/material/styles';
```

#### Hidden and PigmentHidden components

The deprecated `Hidden` and `PigmentHidden` components have been removed.

Use the `sx` prop to replace `implementation="css"`:

```diff
-<Hidden implementation="css" xlUp><Paper /></Hidden>
+<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
```

```diff
-<Hidden implementation="css" mdDown><Paper /></Hidden>
+<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
```

Use the `useMediaQuery` hook to replace `implementation="js"`:

```diff
-<Hidden implementation="js" xlUp><Paper /></Hidden>
+const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
+return hidden ? null : <Paper />;
```

#### Modal's onBackdropClick prop

The deprecated `onBackdropClick` prop has been removed from the `Modal` component.
Please use the [`onClose`](/material-ui/api/modal/#modal-prop-onClose) callback instead, which receives the event and the reason for the modal closing.
Here's an example of how to use it:

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      // Handle the backdrop click
    }
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {/* Modal content */}
    </Modal>
  );
}
```

#### Rating's MuiRating-readOnly CSS class

The deprecated `MuiRating-readOnly` class was removed in favor of `Mui-readOnly` global class.

```diff
-.MuiRating-readOnly
+.Mui-readOnly
```

#### StepButtonIcon type

The deprecated `StepButtonIcon` type has been removed. Use `StepButtonProps['icon']` instead.

```diff
-import { StepButtonIcon } from '@mui/material/StepButton';
+import { StepButtonProps } from '@mui/material/StepButton';

-StepButtonIcon
+StepButtonProps['icon']
```

#### StyledEngineProvider import path

Importing `StyledEngineProvider` from `'@mui/material'` was deprecated and now has been removed.
Import it from `'@mui/material/styles'` instead:

```diff
-import { StyledEngineProvider } from '@mui/material';
+import { StyledEngineProvider } from '@mui/material/styles';
```

#### Lab components moved to the main package

The following `@mui/lab` components and hook have been moved to `@mui/material`:

- Alert
- AlertTitle
- Autocomplete
- AvatarGroup
- Pagination
- PaginationItem
- Rating
- Skeleton
- SpeedDial
- SpeedDialAction
- SpeedDialIcon
- ToggleButton
- ToggleButtonGroup
- usePagination

To keep using these components and hook, import them from `@mui/material` instead of `@mui/lab`.

```diff
-import Alert from '@mui/lab/Alert';
+import Alert from '@mui/material/Alert';

-import { Alert } from '@mui/lab';
+import { Alert } from '@mui/material';
```

Use this codemod to automatically update the imports:

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/lab-removed-components <path/to/folder>
```

:::warning
The codemod doesn't cover type imports associated with the components.
:::
