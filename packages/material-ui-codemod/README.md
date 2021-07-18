# @material-ui/codemod

> Codemod scripts for Material-UI

[![npm version](https://img.shields.io/npm/v/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)
[![npm downloads](https://img.shields.io/npm/dm/@material-ui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@material-ui/codemod)

This repository contains a collection of codemod scripts based for use with
[jscodeshift](https://github.com/facebook/jscodeshift) that help update Material-UI APIs.

## Setup & run

<!-- #default-branch-switch -->

```bash
npx @material-ui/codemod@next <codemod> <paths...>

Applies a `@material-ui/codemod` to the specified paths

Positionals:
  codemod  The name of the codemod                                [string]
  paths    Paths forwarded to `jscodeshift`                       [string]

Options:
  --version  Show version number                                 [boolean]
  --help     Show help                                           [boolean]
  --dry      dry run (no changes are made to files)
                                                [boolean] [default: false]
  --print    print transformed files to stdout, useful for development
                                                [boolean] [default: false]
  --jscodeshift                                  [string] [default: false]

Examples:
  npx @material-ui/codemod@next v4.0.0/theme-spacing-api src
  npx @material-ui/codemod@next v5.0.0/component-rename-prop src --
  --component=Grid --from=prop --to=newProp
```

#### jscodeshift options

To pass more options directly to jscodeshift, use `--jscodeshift="..."`. For example:

```sh
npx @material-ui/codemod@next --jscodeshift="--run-in-band --verbose=2"
```

See all available options [here](https://github.com/facebook/jscodeshift#usage-cli).

#### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through jscodeshift's `printOptions` command line argument

```sh
npx @material-ui/codemod@next <transform> <path> --jscodeshift="--printOptions='{\"quote\":\"double\"}'"
```

## Included scripts

### v5.0.0

#### 🚀 `preset-safe`

A combination of all important transformers for migrating v4 to v5. ⚠️ This codemod should be run only once.

```sh
npx @material-ui/codemod@next v5.0.0/preset-safe <path|folder>
```

The list includes these transformers

- [@material-ui/codemod](#material-uicodemod)
  - [Setup & run](#setup--run)
    - [jscodeshift options](#jscodeshift-options)
    - [Recast Options](#recast-options)
  - [Included scripts](#included-scripts)
    - [v5.0.0](#v500)
      - [🚀 `preset-safe`](#-preset-safe)
      - [`adapter-v4`](#adapter-v4)
      - [`autocomplete-rename-closeicon`](#autocomplete-rename-closeicon)
      - [`autocomplete-rename-option`](#autocomplete-rename-option)
      - [`avatar-circle-circular`](#avatar-circle-circular)
      - [`badge-overlap-value`](#badge-overlap-value)
      - [`box-borderradius-values`](#box-borderradius-values)
      - [`box-rename-css`](#box-rename-css)
      - [`box-rename-gap`](#box-rename-gap)
      - [`button-color-prop`](#button-color-prop)
      - [`chip-variant-prop`](#chip-variant-prop)
      - [`circularprogress-variant`](#circularprogress-variant)
      - [`collapse-rename-collapsedheight`](#collapse-rename-collapsedheight)
      - [`component-rename-prop`](#component-rename-prop)
      - [`core-styles-import`](#core-styles-import)
      - [`create-theme`](#create-theme)
      - [`dialog-props`](#dialog-props)
      - [`dialog-title-props`](#dialog-title-props)
      - [`emotion-prepend-cache`](#emotion-prepend-cache)
      - [`expansion-panel-component`](#expansion-panel-component)
      - [`fab-variant`](#fab-variant)
      - [`fade-rename-alpha`](#fade-rename-alpha)
      - [`grid-justify-justifycontent`](#grid-justify-justifycontent)
      - [`grid-list-component`](#grid-list-component)
      - [`icon-button-size`](#icon-button-size)
      - [`jss-to-styled`](#jss-to-styled)
      - [`link-underline-hover`](#link-underline-hover)
      - [`material-ui-styles`](#material-ui-styles)
      - [`material-ui-types`](#material-ui-types)
      - [`modal-props`](#modal-props)
      - [`moved-lab-modules`](#moved-lab-modules)
      - [`pagination-round-circular`](#pagination-round-circular)
      - [`root-ref`](#root-ref)
      - [`skeleton-variant`](#skeleton-variant)
      - [`styled-engine-provider`](#styled-engine-provider)
      - [`table-props`](#table-props)
      - [`tabs-scroll-buttons`](#tabs-scroll-buttons)
      - [`textarea-minmax-rows`](#textarea-minmax-rows)
      - [`theme-augment`](#theme-augment)
      - [`theme-breakpoints`](#theme-breakpoints)
      - [`theme-breakpoints-width`](#theme-breakpoints-width)
      - [`theme-options`](#theme-options)
      - [`theme-palette-mode`](#theme-palette-mode)
      - [`theme-provider`](#theme-provider)
      - [`theme-spacing`](#theme-spacing)
      - [`theme-typography-round`](#theme-typography-round)
      - [`transitions`](#transitions)
      - [`use-autocomplete`](#use-autocomplete)
      - [`use-transitionprops`](#use-transitionprops)
      - [`variant-prop`](#variant-prop)
      - [`with-mobile-dialog`](#with-mobile-dialog)
      - [`with-width`](#with-width)
    - [v4.0.0](#v400)
      - [`theme-spacing-api`](#theme-spacing-api)
      - [`optimal-imports`](#optimal-imports)
      - [`top-level-imports`](#top-level-imports)
    - [v1.0.0](#v100)
      - [`import-path`](#import-path)
      - [`color-imports`](#color-imports)
      - [`svg-icon-imports`](#svg-icon-imports)
    - [v0.15.0](#v0150)
      - [`import-path`](#import-path-1)

#### `adapter-v4`

Imports and inserts `adaptV4Theme` into `createTheme` (or `createMuiTheme`)

```diff
+import { adaptV4Theme } from '@material-ui/core/styles';

-createTheme({ palette: { ... }})
+createTheme(adaptV4Theme({ palette: { ... }}))
```

```sh
npx @material-ui/codemod@next v5.0.0/adapter-v4 <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `autocomplete-rename-closeicon`

Renames `Autocomplete`'s `closeIcon` prop to `clearIcon`.

```diff
-<Autocomplete closeIcon={defaultClearIcon} />
+<Autocomplete clearIcon={defaultClearIcon} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/autocomplete-rename-closeicon  <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#autocomplete).

#### `autocomplete-rename-option`

Renames `Autocomplete`'s `getOptionSelected` to `isOptionEqualToValue`.

```diff
<Autocomplete
- getOptionSelected={(option, value) => option.title === value.title}
+ isOptionEqualToValue={(option, value) => option.title === value.title}
/>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/autocomplete-rename-option  <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#autocomplete).

#### `avatar-circle-circular`

Updates the `Avatar`'s `variant` value and `classes` key from 'circle' to 'circular'.

```diff
-<Avatar variant="circle" />
-<Avatar classes={{ circle: 'className' }} />
+<Avatar variant="circular" />
+<Avatar classes={{ circular: 'className' }} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/avatar-circle-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#avatar).

#### `badge-overlap-value`

Renames the badge's props.

```diff
-<Badge overlap="circle">
-<Badge overlap="rectangle">
+<Badge overlap="circular">
+<Badge overlap="rectangular">
<Badge classes={{
- anchorOriginTopRightRectangle: 'className',
- anchorOriginBottomRightRectangle: 'className',
- anchorOriginTopLeftRectangle: 'className',
- anchorOriginBottomLeftRectangle: 'className',
- anchorOriginTopRightCircle: 'className',
- anchorOriginBottomRightCircle: 'className',
- anchorOriginTopLeftCircle: 'className',
+ anchorOriginTopRightRectangular: 'className',
+ anchorOriginBottomRightRectangular: 'className',
+ anchorOriginTopLeftRectangular: 'className',
+ anchorOriginBottomLeftRectangular: 'className',
+ anchorOriginTopRightCircular: 'className',
+ anchorOriginBottomRightCircular: 'className',
+ anchorOriginTopLeftCircular: 'className',
}}>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/badge-overlap-value <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#badge).

#### `box-borderradius-values`

Updates the Box API from separate system props to `sx`.

```diff
-<Box borderRadius="borderRadius">
-<Box borderRadius={16}>
+<Box borderRadius={1}>
+<Box borderRadius="16px">
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/box-borderradius-values <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#box).

#### `box-rename-css`

Renames the Box `css` prop to `sx`

```diff
-<Box css={{ m: 2 }}>
+<Box sx={{ m: 2 }}>
```

```sh
npx @material-ui/codemod@next v5.0.0/box-rename-css <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#box).

#### `box-rename-gap`

Renames the Box `grid*Gap` props.

```diff
-<Box gridGap={2}>Item 3</Box>
-<Box gridColumnGap={3}>Item 4</Box>
-<Box gridRowGap={4}>Item 5</Box>
+<Box gap={2}>Item 3</Box>
+<Box columnGap={3}>Item 4</Box>
+<Box rowGap={4}>Item 5</Box>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/box-rename-gap <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#box).

#### `button-color-prop`

Removes the outdated `color` prop values.

```diff
-<Button color="default">
+<Button>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/button-color-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#button).

#### `chip-variant-prop`

Removes the Chip `variant` prop if the value is `"default"`.

```diff
-<Chip variant="default">
+<Chip>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/chip-variant-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#chip).

#### `circularprogress-variant`

Renames the CircularProgress `static` variant to `determinate`.

```diff
-<CircularProgress variant="static" classes={{ static: 'className' }} />
+<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/circularprogress-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#circularprogress).

#### `collapse-rename-collapsedheight`

Renames `Collapse`'s `collapsedHeight` prop to `collapsedSize`.

```diff
-<Collapse collapsedHeight={40} />
-<Collapse classes={{ container: 'collapse' }} />
+<Collapse collapsedSize={40} />
+<Collapse classes={{ root: 'collapse' }} />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/collapse-rename-collapsedheight <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#collapse).

#### `component-rename-prop`

A generic codemod to rename any component prop.

```diff
-<Component prop="value" />
-<Component prop />
+<Component newProp="value" />
+<Component newProp />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/component-rename-prop <path> -- --component=Grid --from=prop --to=newProp
```

#### `core-styles-import`

Renames private import from `core/styles/*` to `core/styles`

```diff
-import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
+import { darken, lighten } from '@material-ui/core/styles';
```

```sh
npx @material-ui/codemod@next v5.0.0/core-styles-import <path>
```

#### `create-theme`

Renames the function `createMuiTheme` to `createTheme`

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createTheme } from '@material-ui/core/styles';
```

```sh
npx @material-ui/codemod@next v5.0.0/create-theme <path>
```

#### `dialog-props`

Remove `disableBackdropClick` prop from `<Dialog>`

```diff
-<Dialog disableBackdropClick />
+<Dialog />
```

```sh
npx @material-ui/codemod@next v5.0.0/dialog-props <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#dialog).

#### `dialog-title-props`

Remove `disableTypography` prop from `<DialogTitle>`

```diff
-<DialogTitle disableTypography />
+<DialogTitle />
```

```sh
npx @material-ui/codemod@next v5.0.0/dialog-title-props <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#dialog).

#### `emotion-prepend-cache`

Adds `prepend: true` to emotion `createCache`

```diff
const cache = emotionCreateCache({
  key: 'css',
+ prepend: true,
});
```

```sh
npx @material-ui/codemod@next v5.0.0/create-theme <path>
```

#### `expansion-panel-component`

Renames `ExpansionPanel*` to `Accordion*`

```sh
npx @material-ui/codemod@next v5.0.0/expansion-panel-component <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#expansionpanel).

#### `fab-variant`

```diff
-<Fab variant="round" />
+<Fab variant="circular" />
```

```sh
npx @material-ui/codemod@next v5.0.0/fab-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#fab).

#### `fade-rename-alpha`

Renames the `fade` style utility import and calls to `alpha`.

```diff
-import { fade, lighten } from '@material-ui/core/styles';
+import { alpha, lighten } from '@material-ui/core/styles';

-const foo = fade('#aaa');
+const foo = alpha('#aaa');
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/fade-rename-alpha <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#styles).

#### `grid-justify-justifycontent`

Renames `Grid`'s `justify` prop to `justifyContent`.

```diff
-<Grid justify="left">Item</Grid>
+<Grid item justifyContent="left">Item</Grid>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/grid-justify-justifycontent <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#grid).

#### `grid-list-component`

Renames `GridList*` to `ImageList*`

```sh
npx @material-ui/codemod@next v5.0.0/grid-list-component <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#gridlist).

#### `icon-button-size`

Adds `size="large"` if `size` is not defined to get the same appearance as v4.

```diff
-<IconButton size="medium" />
-<IconButton />
+<IconButton size="medium" />
+<IconButton size="large" />
```

```sh
npx @material-ui/codemod@next v5.0.0/icon-button-size <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#iconbutton).

#### `jss-to-styled`

Replace JSS styling with `makeStyles` or `withStyles` to `styled` API.

```diff
import Typography from '@material-ui/core/Typography';
-import makeStyles from '@material-ui/styles/makeStyles';
+import { styled } from '@material-ui/core/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    backgroundColor: theme.palette.primary.main
-  },
-  cta: {
-    borderRadius: theme.shape.radius.
-  },
-  content: {
-    color: theme.palette.common.white,
-    fontSize: 16,
-    lineHeight: 1.7
-  },
-}))
+const PREFIX = 'MyCard';
+const classes = {
+  root: `${PREFIX}-root`,
+  cta: `${PREFIX}-cta`,
+  content: `${PREFIX}-content`,
+}
+const Root = styled('div')((theme) => ({
+  [`&.${classes.root}`]: {
+    display: 'flex',
+    alignItems: 'center',
+    backgroundColor: theme.palette.primary.main
+  },
+  [`& .${classes.cta}`]: {
+    borderRadius: theme.shape.radius.
+  },
+  [`& .${classes.content}`]: {
+    color: theme.palette.common.white,
+    fontSize: 16,
+    lineHeight: 1.7
+  },
+}))

export const MyCard = () => {
  const classes = useStyles();
  return (
-   <div className={classes.root}>
+   <Root className={classes.root}>
      <Typography className={classes.content}>...</Typography>
      <Button className={classes.cta}>Go</Button>
+   </Root>
-   </div>
  )
}
```

> **Note:** This approach convert the first element in the return statement into styled component but also increase CSS Specificity to override nested children. It is recommended to use this codemod in a big component that is intend to style nested components.
> This codemod should be adopt after handling all breaking changes, [check out the migration documentation](https://next.material-ui.com/guides/migration-v4)

#### `link-underline-hover`

Apply `underline="hover"` to `<Link />` that does not define `underline` prop (to get the same behavior as in v4).

```diff
-<Link />
+<Link underline="hover" />
```

```sh
npx @material-ui/codemod@next v5.0.0/icon-button-size <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#link).

#### `material-ui-styles`

Moves JSS imports to `@material-ui/styles`

```diff
-import {
-  createGenerateClassName,
-  createStyles,
-  jssPreset,
-  makeStyles,
-  ServerStyleSheets,
-  useThemeVariants,
-  withStyles,
-  withTheme,
-  ThemeProvider,
-  styled,
-  getStylesCreator,
-  mergeClasses,
-} from '@material-ui/core/styles';
+import { ThemeProvider, styled } from '@material-ui/core/styles';
+import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
+import createStyles from '@material-ui/styles/createStyles';
+import jssPreset from '@material-ui/styles/jssPreset';
+import makeStyles from '@material-ui/styles/makeStyles';
+import ServerStyleSheets from '@material-ui/styles/ServerStyleSheets';
+import useThemeVariants from '@material-ui/styles/useThemeVariants';
+import withStyles from '@material-ui/styles/withStyles';
+import withTheme from '@material-ui/styles/withTheme';
+import getStylesCreator from '@material-ui/styles/getStylesCreator';
import mergeClasses from '@material-ui/styles/mergeClasses';
```

```sh
npx @material-ui/codemod@next v5.0.0/material-ui-styles <path>
```

#### `material-ui-types`

Renames `Omit` import from `@material-ui/types` to `DistributiveOmit`

```diff
-import { Omit } from '@material-ui/types';
+import { DistributiveOmit } from '@material-ui/types';
```

```sh
npx @material-ui/codemod@next v5.0.0/material-ui-types <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#material-ui-types).

#### `modal-props`

Removes `disableBackdropClick` and `onEscapeKeyDown` from `<Modal>`

```diff
<Modal
- disableBackdropClick
- onEscapeKeyDown={handleEscapeKeyDown}
/>
```

```sh
npx @material-ui/codemod@next v5.0.0/modal-props <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#modal).

#### `moved-lab-modules`

Updates all imports for `@material-ui/lab` components that have moved to `@material-ui/core`.

```diff
-import Skeleton from '@material-ui/lab/Skeleton';
+import Skeleton from '@material-ui/core/Skeleton';
```

or

```diff
-import { SpeedDial } from '@material-ui/lab';
+import { SpeedDial } from '@material-ui/core';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/moved-lab-modules <path>
```

You can find more details about this breaking change in the migration guide.

- [Alert](https://next.material-ui.com/guides/migration-v4/#alert)
- [Autocomplete](https://next.material-ui.com/guides/migration-v4/#autocomplete)
- [AvatarGroup](https://next.material-ui.com/guides/migration-v4/#avatar)
- [Pagination](https://next.material-ui.com/guides/migration-v4/#pagination)
- [Skeleton](https://next.material-ui.com/guides/migration-v4/#skeleton)
- [SpeedDial](https://next.material-ui.com/guides/migration-v4/#speeddial)
- [ToggleButton](https://next.material-ui.com/guides/migration-v4/#togglebutton)

#### `pagination-round-circular`

Renames `Pagination*`'s `shape` values from 'round' to 'circular'.

```diff
-<Pagination shape="round" />
-<PaginationItem shape="round" />
+<Pagination shape="circular" />
+<PaginationItem shape="circular" />
```

```sh
npx @material-ui/codemod@next v5.0.0/pagination-round-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#pagination).

#### `root-ref`

Removes `RootRef` from the codebase.

```sh
npx @material-ui/codemod@next v5.0.0/root-ref <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#rootref).

#### `skeleton-variant`

```diff
-<Skeleton vairiant="circle" />
-<Skeleton vairiant="rect" />
+<Skeleton vairiant="circular" />
+<Skeleton vairiant="rectangular" />
```

```sh
npx @material-ui/codemod@next v5.0.0/skeleton-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#skeleton).

#### `styled-engine-provider`

Applies `StyledEngineProvider` to the files that contains `ThemeProvider`.

```sh
npx @material-ui/codemod@next v5.0.0/styled-engine-provider <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#style-library).

#### `table-props`

Renames props in `Table*` components.

```diff
-<>
-  <TablePagination onChangeRowsPerPage={() => {}} onChangePage={() => {}} />
-  <TablePagination classes={{ input: 'foo' }} />
-  <Table padding="default" />
-  <TableCell padding="default" />
-</>
+<>
+  <TablePagination onRowsPerPageChange={() => {}} onPageChange={() => {}} />
+  <TablePagination classes={{ select: 'foo' }} />
+  <Table padding="normal" />
+  <TableCell padding="normal" />
+</>

```

```sh
npx @material-ui/codemod@next v5.0.0/table-props <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#table).

#### `tabs-scroll-buttons`

Renames the `Tabs`'s `scrollButtons` prop values.

```diff
-<Tabs scrollButtons="on" />
-<Tabs scrollButtons="desktop" />
-<Tabs scrollButtons="off" />
+<Tabs scrollButtons allowScrollButtonsMobile />
+<Tabs scrollButtons />
+<Tabs scrollButtons={false} />
```

```sh
npx @material-ui/codemod@next v5.0.0/tabs-scroll-buttons <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#tabs).

#### `textarea-minmax-rows`

Renames `TextField`'s rows props.

```diff
-<TextField rowsMin={3} rowsMax={6} />
-<TextareaAutosize rows={2} />
-<TextareaAutosize rowsMin={3} rowsMax={6} />
+<TextField minRows={3} maxRows={6} />
+<TextareaAutosize minRows={2} />
+<TextareaAutosize minRows={3} maxRows={6} />
```

```sh
npx @material-ui/codemod@next v5.0.0/textarea-minmax-rows <path>
```

You can find more details about this breaking change in the migration guide.

- [TextareaAutosize](https://next.material-ui.com/guides/migration-v4/#textareaautoresize)
- [TextField](https://next.material-ui.com/guides/migration-v4/#textfield)

#### `theme-augment`

Adds `DefaultTheme` module augmentation to typescript projects.

```sh
npx @material-ui/codemod@next v5.0.0/theme-augment <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#material-ui-styles).

#### `theme-breakpoints`

Updates breakpoint values to match new logic. ⚠️ This mod is not idempotent, it should be run only once.

```diff
-theme.breakpoints.down('sm')
-theme.breakpoints.between('sm', 'md')
+theme.breakpoints.down('md')
+theme.breakpoints.between('sm', 'lg')
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/theme-breakpoints <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `theme-breakpoints-width`

Renames `theme.breakpoints.width('md')` to `theme.breakpoints.values.md`.

```sh
npx @material-ui/codemod@next v5.0.0/theme-breakpoints-width <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `theme-options`

```diff
-import { ThemeOptions } from '@material-ui/core';
+import { DeprecatedThemeOptions } from '@material-ui/core';
```

```sh
npx @material-ui/codemod@next v5.0.0/theme-options <path>
```

#### `theme-palette-mode`

Renames `type` to `mode`.

```diff
- { palette: { type: 'dark' } }
+ { palette: { mode: 'dark' } }
-theme.palette.type === 'dark'
+theme.palette.mode === 'dark'
```

```sh
npx @material-ui/codemod@next v5.0.0/theme-palette-mode <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `theme-provider`

Renames `MuiThemeProvider` to `ThemeProvider`.

```sh
npx @material-ui/codemod@next v5.0.0/theme-provider <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#material-ui-core-styles).

#### `theme-spacing`

Removes the 'px' suffix from some template strings.

```diff
-`${theme.spacing(2)}px`
-`${theme.spacing(2)}px ${theme.spacing(4)}px`
+`${theme.spacing(2)}`
+`${theme.spacing(2)} ${theme.spacing(4)}`
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/theme-spacing <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `theme-typography-round`

Renames `theme.typography.round($number)` to `Math.round($number * 1e5) / 1e5`.

```diff
-`${theme.typography.round($number)}`
+`${Math.round($number * 1e5) / 1e5}`
```

```sh
npx @material-ui/codemod@next v5.0.0/theme-typography-round <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#theme).

#### `transitions`

Renames import `transitions` to `createTransitions`

```sh
npx @material-ui/codemod@next v5.0.0/transitions <path>
```

#### `use-autocomplete`

Renames `useAutocomplete` related import from lab to core

```diff
-import useAutocomplete from '@material-ui/lab/useAutocomplete';
+import useAutocomplete from '@material-ui/core/useAutocomplete';
```

```sh
npx @material-ui/codemod@next v5.0.0/use-autocomplete <path>
```

#### `use-transitionprops`

Updates Dialog, Menu, Popover, and Snackbar to use the `TransitionProps` prop to replace the `onEnter*` and `onExit*` props.

```diff
<Dialog
-  onEnter={onEnter}
-  onEntered={onEntered}
-  onEntering={onEntering}
-  onExit={onExit}
-  onExited={onExited}
-  onExiting={onExiting}
+  TransitionProps={{
+    onEnter,
+    onEntered,
+    onEntering,
+    onExit,
+    onExited,
+    onExiting,
+  }}
/>
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/use-transitionprops <path>
```

You can find more details about this breaking change in [the migration guide](/guides/migration-v4/#dialog).

#### `variant-prop`

> Don't run this codemod if you already set `variant` to `outlined` or `filled` in theme default props.

Adds the TextField, Select, and FormControl's `variant="standard"` prop when `variant` is undefined.
The diff should look like this:

```diff
-<TextField value="Standard" />
+<TextField value="Standard" variant="standard" />
```

```diff
-<Select value="Standard" />
+<Select value="Standard" variant="standard" />
```

```diff
-<FormControl value="Standard" />
+<FormControl value="Standard" variant="standard" />
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v5.0.0/variant-prop <path>
```

#### `with-mobile-dialog`

Removes imported `withMobileDialog`, and inserts hardcoded version to prevent application crash.

```diff
- import withMobileDialog from '@material-ui/core/withMobileDialog';
+ // FIXME checkout https://next.material-ui.com/guides/migration-v4/#dialog
+ const withMobileDialog = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="lg" fullScreen={false} />;
```

```sh
npx @material-ui/codemod@next v5.0.0/with-mobile-dialog <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#dialog).

#### `with-width`

Removes `withWidth` import, and inserts hardcoded version to prevent application crash.

```diff
- import withWidth from '@material-ui/core/withWidth';
+ // FIXME checkout https://material-ui.com/components/use-media-query/#migrating-from-withwidth
+ const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;
```

```sh
npx @material-ui/codemod@next v5.0.0/with-width <path>
```

You can find more details about this breaking change in [the migration guide](https://next.material-ui.com/guides/migration-v4/#material-ui-core-styles).

### v4.0.0

#### `theme-spacing-api`

Updates the `theme-spacing-api` from `theme.spacing.unit x` to `theme.spacing(x)`.
The diff should look like this:

```diff
-const spacing = theme.spacing.unit;
+const spacing = theme.spacing(1);
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v4.0.0/theme-spacing-api <path>
```

This codemod tries to perform a basic expression simplification which can be improved for expressions that use more than one operation.

```diff
-const spacing = theme.spacing.unit / 5;
+const spacing = theme.spacing(0.2);

// Limitation
-const spacing = theme.spacing.unit * 5 * 5;
+const spacing = theme.spacing(5) * 5;
```

#### `optimal-imports`

Converts all `@material-ui/core` imports more than 1 level deep to the optimal form for tree shaking:

```diff
-import withStyles from '@material-ui/core/styles/withStyles';
-import createTheme from '@material-ui/core/styles/createTheme';
+import { withStyles, createTheme } from '@material-ui/core/styles';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v4.0.0/optimal-imports <path>
```

Head to https://material-ui.com/guides/minimizing-bundle-size/ to understand when it's useful.

#### `top-level-imports`

Converts all `@material-ui/core` submodule imports to the root module:

```diff
-import List from '@material-ui/core/List';
-import { withStyles } from '@material-ui/core/styles';
+import { List, withStyles } from '@material-ui/core';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v4.0.0/top-level-imports <path>
```

Head to https://material-ui.com/guides/minimizing-bundle-size/ to understand when it's useful.

### v1.0.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
Material-UI v1.0.0 flatten the import paths.
The diff should look like this:

```diff
-import { MenuItem } from '@material-ui/core/Menu';
+import MenuItem from '@material-ui/core/MenuItem';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v1.0.0/import-path <path>
```

**Notice**: if you are migrating from pre-v1.0, and your imports use `material-ui`, you will need to manually find and replace all references to `material-ui` in your code to `@material-ui/core`. E.g.:

```diff
-import Typography from 'material-ui/Typography';
+import Typography from '@material-ui/core/Typography';
```

Subsequently, you can run the above `find ...` command to flatten your imports.

#### `color-imports`

Updates the `color-imports` for the new location of Material-UI color palettes.
The diff should look like this:

```diff
-import { blue, teal500 } from 'material-ui/styles/colors';
+import blue from '@material-ui/core/colors/blue';
+import teal from '@material-ui/core/colors/teal';
+const teal500 = teal['500'];
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v1.0.0/color-imports <path>
```

**additional options**

<!-- #default-branch-switch -->

```
npx @material-ui/codemod@next v1.0.0/color-imports <path> -- --importPath='mui/styles/colors' --targetPath='mui/colors'
```

#### `svg-icon-imports`

Updates the `svg-icons` import paths from `material-ui/svg-icons/<category>/<icon-name>` to `@material-ui/icons/<IconName>`, to use the new [`@material-ui/icons`](https://github.com/mui-org/material-ui/tree/next/packages/material-ui-icons) package.
The diff should look like this:

```diff
-import AccessAlarmIcon from 'material-ui/svg-icons/device/AccessAlarm';
-import ThreeDRotation from 'material-ui/svg-icons/action/ThreeDRotation';
+import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
+import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v1.0.0/svg-icon-imports <path>
```

### v0.15.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
Material-UI v0.15.0 is reorganizing the folder distribution of the project.
The diff should look like this:

```diff
// From the source
-import FlatButton from 'material-ui/src/flat-button';
+import FlatButton from 'material-ui/src/FlatButton';

// From npm
-import RaisedButton from 'material-ui/lib/raised-button';
+import RaisedButton from 'material-ui/RaisedButton';
```

<!-- #default-branch-switch -->

```sh
npx @material-ui/codemod@next v0.15.0/import-path <path>
```
