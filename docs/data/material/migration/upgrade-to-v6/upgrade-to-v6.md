# Upgrade to v6

<p class="description">This guide explains why and how to upgrade from Material UI v5 to v6.</p>

## Why you should upgrade to Material UI v6

### React Server Component support

Material UI v6 introduces Pigment CSS, a zero-runtime CSS-in-JS styling engine to replace Emotion and styled-components as a more future-proof solution for writing styles in React 19 and beyond.
With Pigment CSS, styles are extracted at build time rather than runtime, avoiding client-side recalculations and unlocking React Server Component (RSC) compatibility.
This also leads to significant reductions in bundle sizes for Material UI apps.

**In v6, Pigment CSS is opt-in.**
Future major versions of Material UI will likely use Pigment CSS as the default styling solution.
Though optional, it's encouraged to try Pigment CSS out in your Material UI app.
If you wish to do so, refer to the guide for [migrating to Pigment CSS](/material-ui/migration/migrating-to-pigment-css/) once you're done upgrading to Material UI v6.

### Quality-of-life improvements

Material UI v6 features several other quality-of-life improvements, including:

- `ThemeProvider` now supports all of the `CssVarsProvider` features
- support for [container queries](/material-ui/customization/container-queries/)
- a [new theme utility](#color-mode-theme-utility) for adding styles to specific color modes

If you're using any of these packages, you can also change their version to `"6.0.0"`:

- `@mui/icons-material`
- `@mui/system`
- `@mui/lab`
- `@mui/material-nextjs`
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

## Supported browsers and versions

The default bundle targets have changed in v6.

The exact versions will be pinned on release from the browserslist query: `"> 0.5%, last 2 versions, Firefox ESR, not dead, safari >= 15.4, iOS >= 15.4"`.

<!-- #stable-snapshot -->

- Node.js 14 (up from 12)
- Chrome 109 (up from 90)
- Edge 121 (up from 91)
- Firefox 115 (up from 78)
- Safari 15.4 in both macOS and iOS (up from 14 in macOS and 12.5 in iOS)
- and more (see [.browserslistrc `stable` entry](https://github.com/mui/material-ui/blob/v6.0.0/.browserslistrc#L11))

### Removed support for IE 11

Support for IE 11－the legacy bundle and all IE 11-related code－has been completely removed in v6.
This decreases Material UI's bundle size and eases future development.

If you need to support IE 11, you can use v5's [legacy bundle](https://v5.mui.com/material-ui/guides/minimizing-bundle-size/#legacy-bundle).
Note that it will not receive updates or bug fixes in the future.

### Minimum React version

The minimum supported version of React is v17.0.0 (the same as v5).
Use the snippet below to update your project (replace the `<version>` with the one you want):

<codeblock storageKey="package-manager">

```bash npm
npm install react@<version> react-dom@<version>
```

```bash pnpm
pnpm add react@<version> react-dom@<version>
```

```bash yarn
yarn add react@<version> react-dom@<version>
```

</codeblock>

### React 18 and below

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

#### Why is this needed?

Material UI v6 uses `react-is@19`, which changed how React elements are identified.

If you're on React 18 or below, mismatched versions of `react-is` can cause runtime errors in prop type checks.
Forcing `react-is` to match your React version prevents these errors.

### Minimum TypeScript version

The minimum supported version of TypeScript has been increased from v3.5 to 4.7.

:::info
We align with types released by [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (published on npm under the `@types` namespace).

We will not change the minimum supported version in a minor version of Material UI.
However, we recommend not using a TypeScript version older than the lowest supported version by DefinitelyTyped.
:::

If your project includes these packages, you'll need to update them:

- `@types/react`
- `@types/react-dom`

:::warning
Make sure that your application is still running without errors, and commit the changes before continuing to the next step.
:::

## Breaking changes

Material UI v6 was designed to introduce minimal breaking changes when upgrading from v5.
These include browser support updates, a Node.js version bump, and the removal of the UMD bundle.
These updates reduce the Material UI package size by 2.5MB—nearly 25% of the total size in v5.

Codemods are provided to handle the majority of these breaking changes.

:::info
This list is a work in progress.
Expect updates as new breaking changes are introduced.
:::

### UMD bundle removed

To align with React 19's removal of UMD builds, Material UI has also removed its UMD bundle.
This results in a reduction of the `@mui/material` package size by 2.5MB, or 25% of the total package size.
See [Package Phobia](https://packagephobia.com/result?p=@mui/material) for more details.

For alternative installation methods, refer to the [installation documentation](/material-ui/getting-started/installation/).

### Accordion

#### Summary wrapped in a heading

To meet the [W3C Accordion Pattern standard](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), the Accordion Summary is now wrapped with a default `<h3>` heading element.
This change may affect customizations relying on the previous DOM structure and CSS specificity.
Additionally, the default heading element might conflict with existing heading structures on your page.

If your styles or DOM manipulations depend on the old structure, you will need to update them to accommodate the new heading element.
If the default heading element conflicts with your existing structure, you can change the heading element using the `slotProps.heading.component` prop.

```jsx
<Accordion slotProps={{ heading: { component: 'h4' } }}>
  <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1-content"
    id="panel1-header"
  >
    Accordion
  </AccordionSummary>
  <AccordionDetails>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
    lacus ex, sit amet blandit leo lobortis eget.
  </AccordionDetails>
</Accordion>
```

#### Summary as a button (from v6.3.0)

- The Accordion Summary HTML structure has been updated to fix invalid HTML introduced by wrapping it with a heading shown above:
  - The root element is now a `button`.
  - Summary content and the icon wrapper are rendered as `span`.
- Developers using the previous `div` element for styling in the `AccordionSummary` should update their styling. Additionally, those using `Typography` for text, which defaults to rendering a `p` tag, should replace it with a `span`. You can use the `component` prop to replace the HTML tag (`<Typography component="span" />`), as shown in the [Accordion demos](https://mui.com/material-ui/react-accordion/).

### Autocomplete

Three new values have been introduced to the `reason` argument in the `onInputChange` callback of the Autocomplete component.
These values offer more granular options for three specific use cases previously covered by `"reset"`:

- `"blur"`: similar to `"reset"` but triggered when the focus moves away from the input. `clearOnBlur` must be `true`.
- `"selectOption"`: triggered when the input value changes after an option is selected.
- `"removeOption"`: triggered in multiple selection mode when a chip is removed as a result of its corresponding option being selected.

These are available in addition to the existing `"input"`, `"reset"`, and `"clear"` values.

### Chip

In earlier versions, the Chip component would lose focus when the user pressed the <kbd class="key">esc</kbd> key, which differs from how other button-like components work.
In v6, the Chip now retains focus as expected.

To preserve the previous behavior, add a custom `onKeyUp` handler as shown below:

```js
import * as React from 'react';
import Chip from '@mui/material/Chip';

export default function ChipExample() {
  const chipRef = React.useRef(null);
  const keyUpHandler = (event) => {
    if (event.key === 'Escape' && chipRef.current) {
      chipRef.current.blur();
    }
  };
  return (
    <Chip
      label="Chip Outlined"
      variant="outlined"
      ref={chipRef}
      onKeyUp={keyUpHandler}
    />
  );
}
```

### Divider

When using vertical orientation, the Divider now renders a `<div>` with the corresponding accessibility attributes instead of `<hr>` to adhere to [the WAI-ARIA spec](https://www.w3.org/TR/wai-aria-1.2/#separator). You might need to adjust your styles accordingly if you are targeting `hr` tags in your CSS.

```diff
-import Divider from '@mui/material/Divider';
+import Divider, { dividerClasses } from '@mui/material/Divider';

 const Main = styled.main({
-  '& hr': {
+  [`& .${dividerClasses.root}`]: {
     marginTop: '16px',
   },
 });
```

### Grid2

The `Grid2` (previously `Unstable_Grid2`) was updated and stabilized:

- The previous size (`xs`, `sm`, `md`, ...) and offset (`xsOffset`, `smOffset`, `mdOffset`, ...) props, which were named after the theme's breakpoints, were replaced with the `size` and `offset` props.
- The spacing mechanism was reworked to use the `gap` CSS property.

This brings some breaking changes described in the following sections.

#### Unstable prefix removed

The `Grid2` component API was stabilized, so its import no longer contains the `Unstable_` prefix:

```diff
-import { Unstable_Grid2 as Grid2 } from '@mui/material';
+import { Grid2 } from '@mui/material';
```

```diff
-import Grid from '@mui/material/Unstable_Grid2';
+import Grid from '@mui/material/Grid2';
```

#### Size and offset props renamed

In v5, the size and offset props were named to correspond with the theme's breakpoints.
For the default theme, these were:

- Size: `xs`, `sm`, `md`, `lg`, `xl`
- Offset: `xsOffset`, `smOffset`, `mdOffset`, `lgOffset`, `xlOffset`

In v6, these props are renamed to `size` and `offset`:

```diff
 <Grid
-  xs={12}
-  sm={6}
-  xsOffset={2}
-  smOffset={3}
+  size={{ xs: 12, sm: 6 }}
+  offset={{ xs: 2, sm: 3 }}
 >
```

If the size or offset is the same for all breakpoints, then you can use a single value:

```diff
-<Grid xs={6} xsOffset={2}>
+<Grid size={6} offset={2}>
```

Additionally, the `true` value for the `size` prop was renamed to `"grow"`:

```diff
-<Grid xs>
+<Grid size="grow">
```

Use this codemod to migrate your project to the new `size` and `offset` props:

```bash
npx @mui/codemod@latest v6.0.0/grid-v2-props <path/to/folder>
```

:::warning
You need to modify the import from `@mui/material/Unstable_Grid2` to `@mui/material/Grid2` before running the codemod.
:::

##### Using custom breakpoints

The usage described above also applies to custom breakpoints:

```diff
-<Grid mobile={12} mobileOffset={2} desktop={6} desktopOffset={4}>
+<Grid size={{ mobile: 12, desktop: 6 }} offset={{ mobile: 2, desktop: 4 }}>
```

You can use the same codemod for custom breakpoints by providing the breakpoints as an argument:

```bash
npx @mui/codemod@latest v6.0.0/grid-v2-props <path/to/folder> --jscodeshift='--muiBreakpoints=mobile,desktop'
```

#### disableEqualOverflow prop removed

In v5, the Grid overflowed its parent.
In v6, the Grid is correctly contained within its parent's padding:

<img src="/static/material-ui/migration-v5/grid-overflow-change.png" style="width: 814px;" alt="Before and after of the Grid no longer overflowing its parent in v6." width="1628" height="400" />

This eliminates the need for the `disableEqualOverflow` prop:

```diff
-<Grid disableEqualOverflow>
+<Grid>
```

#### Grid item spacing change

In v5, Grid items included spacing in their boxes.
In v6, Grid items no longer include spacing in their boxes by using the [CSS gap property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap).

Note that the item position doesn't change.

<img src="/static/material-ui/migration-v5/grid-spacing-change.png" style="width: 814px;" alt="Before and after of the Grid items no longer including spacing in their boxes." width="1628" height="400" />

:::warning
These updates may lead to unexpected changes to your app's layout.
Still, we strongly recommend adopting this new behavior rather than trying to replicate the old pattern, as the new version is more predictable and modern.
:::

#### Container width

The updated Grid component doesn't grow to the full width of the container by default.
If you need the grid to grow to the full width, you can use the `sx` prop:

```diff
-<Grid container>
+<Grid container sx={{ width: '100%' }}>

 // alternatively, if the Grid's parent is a flex container:
-<Grid container>
+<Grid container sx={{ flexGrow: 1 }}>
```

### ListItem

`ListItem`'s props `autoFocus`, `button`, `disabled`, and `selected`, deprecated in v5, have been removed. To replace the `button` prop, use `ListItemButton` instead. The other removed props are available in the `ListItemButton` component as well.

```diff
-<ListItem button />
+<ListItemButton />
```

Use this codemod to migrate your project to the `ListItemButton` component:

```bash
npx @mui/codemod@latest v6.0.0/list-item-button-prop <path/to/folder>
```

As the `ListItem` no longer supports these props, the class names related to these props were removed. You should use the `listItemButtonClasses` object instead.

```diff
-import { listItemClasses } from '@mui/material/ListItem';
+import { listItemButtonClasses } from '@mui/material/ListItemButton';

-listItemClasses.button
+listItemButtonClasses.root

-listItemClasses.focusVisible
+listItemButtonClasses.focusVisible

-listItemClasses.disabled
+listItemButtonClasses.disabled

-listItemClasses.selected
+listItemButtonClasses.selected
```

### Button with Loading State

As of `@mui/material` **v6.4.0**, the `LoadingButton` from Lab has been removed. Loading functionality is now part of the standard `Button` component. Update your import as follows:

```diff
-import { LoadingButton } from '@mui/lab';
+import { Button } from '@mui/material';
```

```diff
-import LoadingButton from '@mui/lab/LoadingButton';
+import Button from '@mui/material/Button';
```

For more details, see the [Loading section](/material-ui/react-button/#loading-2) in the [Material UI `Button` documentation](/material-ui/react-button/).

### Typography

The `color` prop in the `Typography` component is not a [system prop](https://mui.com/system/properties/) anymore. You can use the `sx` prop instead:

```diff
-<Typography color={(theme) => theme.palette.primary.main}>
+<Typography sx={{ color: (theme) => theme.palette.primary.main }}>
```

:::info
System props have been deprecated in favor of the `sx` prop. Check the [migration guide](/material-ui/migration/migrating-from-deprecated-apis/#system-props) for more information.
:::

You still can access some theme colors directly using the `color` prop. Check the [Typography component API page](/material-ui/api/typography/#typography-prop-color) for the whole list of colors.

```jsx
<Typography color="textSecondary">Secondary text</Typography>
```

### useMediaQuery types

The following deprecated types are removed in v6:

- `MuiMediaQueryList`: use `MediaQueryList` (from lib.dom.d.ts) instead.
- `MuiMediaQueryListEvent`: use `MediaQueryListEvent` (from lib.dom.d.ts) instead.
- `MuiMediaQueryListListener`: use `(event: MediaQueryListEvent) => void` instead.

## Breaking changes affecting testing

### Ripple effect

The ripple effect's performance has been improved in v6.
Because of this, you might need to update tests involving components with the ripple effect.
If you are using `fireEvent` from `@testing-library/react` to simulate user interactions, you will need to wrap these inside `act` and `await` to avoid React warnings:

```diff
- fireEvent.click(button);
+ await act(async () => fireEvent.mouseDown(button));
```

The components affected by this change are:

- All buttons
- Checkbox
- Chip
- Radio Group
- Switch
- Tabs

## Breaking changes affecting types

### Box

The `component` prop has been removed from the `BoxOwnProps` as it is already included in the `Box` type.
This might affect your code if you are using the `styled` function with the `Box` component.
If this is the case, use a `div` element instead of `Box`:

```diff
-const StyledBox = styled(Box)`
+const StyledDiv = styled('div')`
   color: white;
 `;
```

This yields the same end result.
If this doesn't work for you, you can also cast the `styled` returned value to `typeof Box`:

```diff
 const StyledBox = styled(Box)`
   color: white;
-`;
+` as typeof Box;
```

## Stabilized APIs

### CssVarsProvider and extendTheme

The `CssVarsProvider` and `extendTheme` APIs are now stable.
If you're already using them in v5 you can now drop the experimental prefix:

```diff
-import { experimental_extendTheme as extendTheme, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
+import { extendTheme, CssVarsProvider } from '@mui/material/styles';
```

See [CSS theme variables](/material-ui/customization/css-theme-variables/overview/) for more details about working with these APIs.

### Color mode theme utility

Material UI v6 introduces a new utility for adding styles to specific color modes called `theme.applyStyles()`, designed to replace `theme.palette.mode` when applying light or dark styles:

```diff
 const MyComponent = styled('button')(({ theme }) => ({
   padding: '0.5rem 1rem',
   border: '1px solid,
-  borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
+  borderColor: '#000',
+  ...theme.applyStyles('dark', {
+    borderColor: '#fff',
+  })
 }))
```

Use these codemods to migrate your project to `theme.applyStyles()`:

```bash
npx @mui/codemod@latest v6.0.0/styled <path/to/folder-or-file>
npx @mui/codemod@latest v6.0.0/sx-prop <path/to/folder-or-file>
npx @mui/codemod@latest v6.0.0/theme-v6 <path/to/theme-file>
```

:::info
If you have a custom theme, run `v6.0.0/theme-v6` against the file that contains your custom `styleOverrides`.
Otherwise you can ignore this codemod.
:::

## Deprecations

It is not required to immediately go through the deprecations in order to use Material UI v6.

You can do it at your own pace by checking out the [deprecations page](/material-ui/migration/migrating-from-deprecated-apis/).
Those deprecations will be removed in the next major version.

## Pigment CSS integration (optional)

Once you've finished upgrading your app to v6, you'll be ready to start [migrating to Pigment CSS](/material-ui/migration/migrating-to-pigment-css/) for RSC support and a smaller bundle size.
