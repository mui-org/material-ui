# @mui/codemod

> Codemod scripts for Material UI, Base UI, MUI System, Joy UI.

[![npm version](https://img.shields.io/npm/v/@mui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@mui/codemod)
[![npm downloads](https://img.shields.io/npm/dm/@mui/codemod.svg?style=flat-square)](https://www.npmjs.com/package/@mui/codemod)

This repository contains a collection of codemod scripts based for use with
[jscodeshift](https://github.com/facebook/jscodeshift) that help update the APIs.
Some of the codemods also run [postcss](https://github.com/postcss/postcss) plugins to update CSS files.

## Setup & run

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next <codemod> <paths...>

Applies a `@mui/codemod` to the specified paths

Positionals:
  codemod  The name of the codemod                                [string]
  paths    Paths forwarded to `jscodeshift`                       [string]

Options:
  --version  Show version number                                 [boolean]
  --help     Show help                                           [boolean]
  --dry      dry run (no changes are made to files)
                                                [boolean] [default: false]
  --parser   which parser for jscodeshift to use.
                                                [string] [default: 'tsx']
  --print    print transformed files to stdout, useful for development
                                                [boolean] [default: false]
  --jscodeshift                                  [string] [default: false]

Examples:
  npx @mui/codemod@next v4.0.0/theme-spacing-api src
  npx @mui/codemod@next v5.0.0/component-rename-prop src --
  --component=Grid --from=prop --to=newProp
  npx @mui/codemod@next v5.0.0/preset-safe src --parser=flow
```

### package name

Use this flag if you have a custom package name that reexports Material UI components. For example:

```bash
npx @mui/codemod@next --packageName="@org/ui"
```

The snippet above will look for `@org/ui` instead of `@mui/material` in the codemod.

### jscodeshift options

To pass more options directly to jscodeshift, use `--jscodeshift="..."`. For example:

```bash
npx @mui/codemod@next --jscodeshift="--run-in-band --verbose=2"
```

See all available options [here](https://github.com/facebook/jscodeshift#usage-cli).

### Recast Options

Options to [recast](https://github.com/benjamn/recast)'s printer can be provided
through jscodeshift's `printOptions` command line argument

```bash
npx @mui/codemod@next <transform> <path> --jscodeshift="--printOptions='{\"quote\":\"double\"}'"
```

## Included scripts

- [Deprecations](#deprecations)
- [v7](#v700)
- [v6](#v600)
- [v5](#v500)
- [v4](#v400)
- [v1](#v100)
- [v0.15](#v0150)

### Deprecations

```bash
npx @mui/codemod@next deprecations/all <path>
```

#### `all`

A combination of all deprecations.

#### `accordion-props`

```diff
 <Accordion
-  TransitionComponent={CustomTransition}
-  TransitionProps={{ unmountOnExit: true }}
+  slots={{ transition: CustomTransition }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

```bash
npx @mui/codemod@next deprecations/accordion-props <path>
```

#### `accordion-summary-classes`

JS transforms:

```diff
 import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

 MuiAccordionSummary: {
   styleOverrides: {
     root: {
-      [`& .${accordionSummaryClasses.contentGutters}`]: {
+      [`&.${accordionSummaryClasses.gutters} .${accordionSummaryClasses.content}`]: {
         color: 'red',
       },
     },
   },
 },
```

```diff
 MuiAccordionSummary: {
   styleOverrides: {
     root: {
-      '& .MuiAccordionSummary-contentGutters': {
+      '&.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiAccordionSummary-root .MuiAccordionSummary-contentGutters
+.MuiAccordionSummary-root.MuiAccordionSummary-gutters .MuiAccordionSummary-content
```

```bash
npx @mui/codemod@next deprecations/accordion-summary-classes <path>
```

#### `alert-classes`

JS transforms:

```diff
 import { alertClasses } from '@mui/material/PaginationItem';

 MuiPaginationItem: {
   styleOverrides: {
     root: {
-      [`&.${alertClasses.standardSuccess}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.standardInfo}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.standardWarning}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.standardError}`]: {
+      [`&.${alertClasses.standard}.${alertClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedSuccess}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedInfo}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedWarning}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.outlinedError}`]: {
+      [`&.${alertClasses.outlined}.${alertClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledSuccess}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledInfo}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledWarning}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${alertClasses.filledError}`]: {
+      [`&.${alertClasses.filled}.${alertClasses.colorError}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiAlert-standardSuccess
+.MuiAlert-standard.MuiAlert-colorSuccess
-.MuiAlert-standardInfo
+.MuiAlert-standard.MuiAlert-colorInfo
-.MuiAlert-standardWarning
+.MuiAlert-standard.MuiAlert-colorWarning
-.MuiAlert-standardError
+.MuiAlert-standard.MuiAlert-colorError
-.MuiAlert-outlinedSuccess
+.MuiAlert-outlined.MuiAlert-colorSuccess
-.MuiAlert-outlinedInfo
+.MuiAlert-outlined.MuiAlert-colorInfo
-.MuiAlert-outlinedWarning
+.MuiAlert-outlined.MuiAlert-colorWarning
-.MuiAlert-outlinedError
+.MuiAlert-outlined.MuiAlert-colorError
-.MuiAlert-filledSuccess
+.MuiAlert-filled.MuiAlert-colorSuccess
-.MuiAlert-filledInfo
+.MuiAlert-filled.MuiAlert-colorInfo
-.MuiAlert-filledWarning
+.MuiAlert-filled.MuiAlert-colorWarning
-.MuiAlert-filledError
+.MuiAlert-filled.MuiAlert-colorError
```

```bash
npx @mui/codemod@next deprecations/alert-classes <path>
```

#### `alert-props`

```diff
 <Alert
-  components={{ CloseButton: CustomButton }}
-  componentsProps={{ closeButton: { testid: 'test-id' } }}
+  slots={{ closeButton: CustomButton }}
+  slotProps={{ closeButton: { testid: 'test-id' } }}
 />
```

```diff
 MuiAlert: {
   defaultProps: {
-    components: { CloseButton: CustomButton }
-    componentsProps: { closeButton: { testid: 'test-id' }}
+    slots: { closeButton: CustomButton },
+    slotProps: { closeButton: { testid: 'test-id' } },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/alert-props <path>
```

#### `autocomplete-props`

```diff
 <Autocomplete
-  ChipProps={{ height: 10 }}
-  PaperComponent={CustomPaper}
-  PopperComponent={CustomPopper}
-  ListboxComponent={CustomListbox}
-  ListboxProps={{ height: 12 }}
-  renderTags={(value, getTagProps, ownerState) =>
-    value.map((option, index) => (
-      <Chip label={option.label} {...getTagProps({ index })} />
-    ))
-  }
-  componentsProps={{
-    clearIndicator: { width: 10 },
-    paper: { width: 12 },
-    popper: { width: 14 },
-    popupIndicator: { width: 16 },
-  }}
+  slots={{
+    paper: CustomPaper,
+    popper: CustomPopper
+  }}
+  slotProps={{
+    chip: { height: 10 },
+    listbox: {
+        component: CustomListbox,
+        ...{ height: 12 },
+    },
+    clearIndicator: { width: 10 },
+    paper: { width: 12 },
+    popper: { width: 14 },
+    popupIndicator: { width: 16 },
+  }}
+  renderValue={(value, getItemProps, ownerState) =>
+    value.map((option, index) => (
+      <Chip label={option.label} {...getItemProps({ index })} />
+    ))
+  }
 />
```

```diff
 MuiAutocomplete: {
   defaultProps: {
-    ChipProps: { height: 10 },
-    PaperComponent: CustomPaper,
-    PopperComponent: CustomPopper,
-    ListboxComponent: CustomListbox,
-    ListboxProps: { height: 12 },
-    renderTags: (value, getTagProps, ownerState) =>
-      value.map((option, index) => (
-        <Chip label={option.label} {...getTagProps({ index })} />
-      )),
-    componentsProps: {
-       clearIndicator: { width: 10 },
-       paper: { width: 12 },
-       popper: { width: 14 },
-       popupIndicator: { width: 16 },
-     }
+    slots: {
+      paper: CustomPaper,
+      popper: CustomPopper,
+    },
+    slotProps: {
+      chip: { height: 10 },
+      listbox: {
+        component: CustomListbox,
+        ...{ height: 12 },
+      },
+      clearIndicator: { width: 10 },
+      paper: { width: 12 },
+      popper: { width: 14 },
+      popupIndicator: { width: 16 },
+    },
+    renderValue: (value, getItemProps, ownerState) =>
+      value.map((option, index) => (
+        <Chip label={option.label} {...getItemProps({ index })} />
+      )),
   },
 },
```

```diff
 <Autocomplete
  renderInput={(params) => (
    <TextField
      {...params}
-      InputProps={{
-        ...params.InputProps,
-        endAdornment: (
-          <React.Fragment>
-            {params.InputProps.endAdornment}
-          </React.Fragment>
-        ),
-      }}
+      slotProps={{
+        ...params.slotProps,
+        input: {
+          ...params.slotProps.input,
+          endAdornment: (
+            <React.Fragment>
+              {params.slotProps.input.endAdornment}
+            </React.Fragment>
+          ),
+        },
+      }}
    />
  )}
 />
```

```diff
 const {
-  getTagProps,
-  focusedTag,
+  getItemProps,
+  focusedItem,
 } = useAutocomplete(props);
```

```bash
npx @mui/codemod@next deprecations/autocomplete-props <path>
```

#### `avatar-group-props`

```diff
 <AvatarGroup
-  componentsProps={{
-    additionalAvatar: { color: 'red' },
+  slotProps={{
+    surplus: { color: 'red' },
   }}
 />
```

```diff
 <AvatarGroup
   slotProps={{
-    additionalAvatar: { color: 'red' },
+    surplus: { color: 'red' },
   }}
 />
```

```diff
 MuiAvatarGroup: {
   defaultProps: {
-    componentsProps: {
-      additionalAvatar: { color: 'red' },
+    slotProps: {
+      surplus: { color: 'red' },
     },
   },
 },
```

```diff
 MuiAvatarGroup: {
   defaultProps: {
     slotProps: {
-      additionalAvatar: { color: 'red' },
+      surplus: { color: 'red' },
     },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/avatar-group-props <path>
```

#### `avatar-props`

```diff
 <Avatar
-  imgProps={{
-    onError: () => {},
-    onLoad: () => {},
+  slotProps={{
+    img: {
+      onError: () => {},
+      onLoad: () => {},
+    },
   }}
 />
```

```bash
npx @mui/codemod@next deprecations/avatar-props <path>
```

#### `backdrop-props`

```diff
 <Backdrop
-  components={{ Root: CustomRoot }}
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slots={{ root: CustomRoot }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

```diff
 MuiBackdrop: {
   defaultProps: {
-    components: { Root: CustomRoot }
-    componentsProps: { root: { testid: 'root-id' } }
+    slots: { root: CustomRoot },
+    slotProps: { root: { testid: 'root-id' } },
  },
 },
```

```diff
 <Backdrop
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
 />
```

```bash
npx @mui/codemod@next deprecations/backdrop-props <path>
```

#### `badge-props`

```diff
 <Badge
-  components={{ Root: CustomRoot }}
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slots={{ root: CustomRoot }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

```diff
 MuiBadge: {
   defaultProps: {
-    components: { Root: CustomRoot }
-    componentsProps: { root: { testid: 'test-id' }}
+    slots: { root: CustomRoot },
+    slotProps: { root: { testid: 'test-id' } },
  },
 },
```

```bash
npx @mui/codemod@next deprecations/badge-props <path>
```

#### `button-classes`

JS transforms:

```diff
 import { buttonClasses } from '@mui/material/Button';

 MuiButton: {
   styleOverrides: {
     root: {
-      [`&.${buttonClasses.textInherit}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorInherit}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textPrimary}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSecondary}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSuccess}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textError}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textInfo}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textWarning}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedInherit}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorInherit}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedPrimary}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSecondary}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSuccess}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedError}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedInfo}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedWarning}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedInherit}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorInherit}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedPrimary}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSecondary}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSuccess}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorSuccess}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedError}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorError}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedInfo}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorInfo}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedWarning}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.colorWarning}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSizeSmall}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSizeMedium}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.containedSizeLarge}`]: {
+      [`&.${buttonClasses.contained}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSizeSmall}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSizeMedium}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.textSizeLarge}`]: {
+      [`&.${buttonClasses.text}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSizeSmall}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeSmall}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSizeMedium}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeMedium}`]: {
         color: 'red',
       },
-      [`&.${buttonClasses.outlinedSizeLarge}`]: {
+      [`&.${buttonClasses.outlined}.${buttonClasses.sizeLarge}`]: {
         color: 'red',
       },
-      [`& .${buttonClasses.iconSizeSmall}`]: {
+      [`&.${buttonClasses.sizeSmall} > .${buttonClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${buttonClasses.iconSizeMedium}`]: {
+      [`&.${buttonClasses.sizeMedium} > .${buttonClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${buttonClasses.iconSizeLarge}`]: {
+      [`&.${buttonClasses.sizeLarge} > .${buttonClasses.icon}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiButton-textInherit
+.MuiButton-text.MuiButton-colorInherit
-.MuiButton-textPrimary
+.MuiButton-text.MuiButton-colorPrimary
-.MuiButton-textSecondary
+.MuiButton-text.MuiButton-colorSecondary
-.MuiButton-textSuccess
+.MuiButton-text.MuiButton-colorSuccess
-.MuiButton-textError
+.MuiButton-text.MuiButton-colorError
-.MuiButton-textInfo
+.MuiButton-text.MuiButton-colorInfo
-.MuiButton-textWarning
+.MuiButton-text.MuiButton-colorWarning
-.MuiButton-outlinedInherit
+.MuiButton-outlined.MuiButton-colorInherit
-.MuiButton-outlinedPrimary
+.MuiButton-outlined.MuiButton-colorPrimary
-.MuiButton-outlinedSecondary
+.MuiButton-outlined.MuiButton-colorSecondary
-.MuiButton-outlinedSuccess
+.MuiButton-outlined.MuiButton-colorSuccess
-.MuiButton-outlinedError
+.MuiButton-outlined.MuiButton-colorError
-.MuiButton-outlinedInfo
+.MuiButton-outlined.MuiButton-colorInfo
-.MuiButton-outlinedWarning
+.MuiButton-outlined.MuiButton-colorWarning
-.MuiButton-containedInherit
+.MuiButton-contained.MuiButton-colorInherit
-.MuiButton-containedPrimary
+.MuiButton-contained.MuiButton-colorPrimary
-.MuiButton-containedSecondary
+.MuiButton-contained.MuiButton-colorSecondary
-.MuiButton-containedSuccess
+.MuiButton-contained.MuiButton-colorSuccess
-.MuiButton-containedError
+.MuiButton-contained.MuiButton-colorError
-.MuiButton-containedInfo
+.MuiButton-contained.MuiButton-colorInfo
-.MuiButton-containedWarning
+.MuiButton-contained.MuiButton-colorWarning
-.MuiButton-textSizeSmall
+.MuiButton-text.MuiButton-sizeSmall
-.MuiButton-textSizeMedium
+.MuiButton-text.MuiButton-sizeMedium
-.MuiButton-textSizeLarge
+.MuiButton-text.MuiButton-sizeLarge
-.MuiButton-outlinedSizeSmall
+.MuiButton-outlined.MuiButton-sizeSmall
-.MuiButton-outlinedSizeMedium
+.MuiButton-outlined.MuiButton-sizeMedium
-.MuiButton-outlinedSizeLarge
+.MuiButton-outlined.MuiButton-sizeLarge
-.MuiButton-containedSizeSmall
+.MuiButton-contained.MuiButton-sizeSmall
-.MuiButton-containedSizeMedium
+.MuiButton-contained.MuiButton-sizeMedium
-.MuiButton-containedSizeLarge
+.MuiButton-contained.MuiButton-sizeLarge
-.MuiButton-root .MuiButton-iconSizeSmall
+.MuiButton-root.MuiButton-sizeSmall > .MuiButton-icon
-.MuiButton-root .MuiButton-iconSizeMedium
+.MuiButton-root.MuiButton-sizeMedium > .MuiButton-icon
-.MuiButton-root .MuiButton-iconSizeLarge
+.MuiButton-root.MuiButton-sizeLarge > .MuiButton-icon
```

```bash
npx @mui/codemod@next deprecations/button-classes <path>
```

#### `button-group-classes`

JS transforms:

```diff
 import { buttonGroupClasses } from '@mui/material/ButtonGroup';

 MuiButtonGroup: {
   styleOverrides: {
     root: {
-      [`& .${buttonGroupClasses.groupedHorizontal}`]: {
+      [`&.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedVertical}`]: {
+      [`&.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedText}`]: {
+      [`&.${buttonGroupClasses.text} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedTextHorizontal}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedTextVertical}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedTextPrimary}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedTextSecondary}`]: {
+      [`&.${buttonGroupClasses.text}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedOutlined}`]: {
+      [`&.${buttonGroupClasses.outlined} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedOutlinedHorizontal}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedOutlinedVertical}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedOutlinedPrimary}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedOutlinedSecondary}`]: {
+      [`&.${buttonGroupClasses.outlined}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedContained}`]: {
+      [`&.${buttonGroupClasses.contained} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedContainedHorizontal}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.horizontal} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedContainedVertical}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.vertical} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedContainedPrimary}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.colorPrimary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
-      [`& .${buttonGroupClasses.groupedContainedSecondary}`]: {
+      [`&.${buttonGroupClasses.contained}.${buttonGroupClasses.colorSecondary} > .${buttonGroupClasses.grouped}`]: {
          color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiButtonGroup-root .MuiButtonGroup-groupedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedVertical
+.MuiButtonGroup-root.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedText
+.MuiButtonGroup-root.MuiButtonGroup-text > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextVertical
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextPrimary
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedTextSecondary
+.MuiButtonGroup-root.MuiButtonGroup-text.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlined
+.MuiButtonGroup-root.MuiButtonGroup-outlined > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedVertical
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedPrimary
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedOutlinedSecondary
+.MuiButtonGroup-root.MuiButtonGroup-outlined.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContained
+.MuiButtonGroup-root.MuiButtonGroup-contained > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedHorizontal
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-horizontal > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedVertical
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-vertical > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedPrimary
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-colorPrimary > .MuiButtonGroup-grouped
-.MuiButtonGroup-root .MuiButtonGroup-groupedContainedSecondary
+.MuiButtonGroup-root.MuiButtonGroup-contained.MuiButtonGroup-colorSecondary > .MuiButtonGroup-grouped
```

```bash
npx @mui/codemod@next deprecations/button-group-classes <path>
```

#### `card-header-props`

```diff
 <CardHeader
-  titleTypographyProps={{ variant: 'h6' }}
-  subheaderTypographyProps={{ variant: 'body2' }}
+  slotProps={{
+    title: { variant: 'h6' },
+    subheader: { variant: 'body2' }
+  }}
 />
```

```diff
 MuiCardHeader: {
   defaultProps: {
-    titleTypographyProps: { variant: 'h6' },
-    subheaderTypographyProps: { variant: 'body2' },
+    slotProps: {
+      title: { variant: 'h6' },
+      subheader: { variant: 'body2' },
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/card-header-props <path>
```

#### `checkbox-props`

```diff
 <Checkbox
-  inputProps={{ 'aria-label': 'Checkbox' }}
-  inputRef={ref}
+  slotProps={{ input: { 'aria-label': 'Checkbox', ref } }}
 />
```

```bash
npx @mui/codemod@next deprecations/checkbox-props <path>
```

#### `chip-classes`

JS transforms:

```diff
 import { chipClasses } from '@mui/material/Chip';

  MuiChip: {
   styleOverrides: {
     root: {
-      [`&.${chipClasses.clickableColorPrimary}`]: {
+      [`&.${chipClasses.clickable}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.clickableColorSecondary}`]: {
+      [`&.${chipClasses.clickable}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.deletableColorPrimary}`]: {
+      [`&.${chipClasses.deletable}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.deletableColorSecondary}`]: {
+      [`&.${chipClasses.deletable}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.outlinedPrimary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.outlinedSecondary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.filledPrimary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${chipClasses.filledSecondary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.avatarColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.avatar}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.iconColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.labelSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.label}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.labelMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.label}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconSmall}`]: {
+      [`&.${chipClasses.sizeSmall} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconMedium}`]: {
+      [`&.${chipClasses.sizeMedium} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconColorPrimary}`]: {
+      [`&.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconColorSecondary}`]: {
+      [`&.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconOutlinedColorPrimary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconOutlinedColorSecondary}`]: {
+      [`&.${chipClasses.outlined}.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconFilledColorPrimary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorPrimary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
-      [`& .${chipClasses.deleteIconFilledColorSecondary}`]: {
+      [`&.${chipClasses.filled}.${chipClasses.colorSecondary} > .${chipClasses.deleteIcon}`]: {
         color: 'red',
       },
     },
   },
  },

```

CSS transforms:

```diff
-.MuiChip-clickableColorPrimary
+.MuiChip-clickable.MuiChip-colorPrimary
-.MuiChip-clickableColorSecondary
+.MuiChip-clickable.MuiChip-colorSecondary
-.MuiChip-deletableColorPrimary
+.MuiChip-deletable.MuiChip-colorPrimary
-.MuiChip-deletableColorSecondary
+.MuiChip-deletable.MuiChip-colorSecondary
-.MuiChip-outlinedPrimary
+.MuiChip-outlined.MuiChip-colorPrimary
-.MuiChip-outlinedSecondary
+.MuiChip-outlined.MuiChip-colorSecondary
-.MuiChip-filledPrimary
+.MuiChip-filled.MuiChip-colorPrimary
-.MuiChip-filledSecondary
+.MuiChip-filled.MuiChip-colorSecondary
-.MuiChip-root .MuiChip-avatarSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-avatar
-.MuiChip-root .MuiChip-avatarColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-avatar
-.MuiChip-root .MuiChip-iconSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-icon
-.MuiChip-root .MuiChip-iconMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-icon
-.MuiChip-root .MuiChip-iconColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-icon
-.MuiChip-root .MuiChip-iconColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-icon
-.MuiChip-root .MuiChip-labelSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-label
-.MuiChip-root .MuiChip-labelMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-label
-.MuiChip-root .MuiChip-deleteIconSmall
+.MuiChip-root.MuiChip-sizeSmall > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconMedium
+.MuiChip-root.MuiChip-sizeMedium > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconColorPrimary
+.MuiChip-root.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconColorSecondary
+.MuiChip-root.MuiChip-colorSecondary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconOutlinedColorPrimary
+.MuiChip-root.MuiChip-outlined.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconOutlinedColorSecondary
+.MuiChip-root.MuiChip-outlined.MuiChip-colorSecondary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconFilledColorPrimary
+.MuiChip-root.MuiChip-filled.MuiChip-colorPrimary > .MuiChip-deleteIcon
-.MuiChip-root .MuiChip-deleteIconFilledColorSecondary
+.MuiChip-root.MuiChip-filled.MuiChip-colorSecondary > .MuiChip-deleteIcon
```

```bash
npx @mui/codemod@next deprecations/chip-classes <path>
```

#### `circular-progress-classes`

JS transforms:

```diff
 import { circularProgressClasses } from '@mui/material/CircularProgress';

 MuiCircularProgress: {
   styleOverrides: {
     root: {
-      [`& .${circularProgressClasses.circleDeterminate}`]: {
+      [`&.${circularProgressClasses.determinate} .${circularProgressClasses.circle}`]: {
         color: 'red',
       },
-      [`& .${circularProgressClasses.circleIndeterminate}`]: {
+      [`&.${circularProgressClasses.indeterminate} .${circularProgressClasses.circle}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiCircularProgress-circleDeterminate
+.MuiCircularProgress-determinate .MuiCircularProgress-circle
```

```diff
-.MuiCircularProgress-circleIndeterminate
+.MuiCircularProgress-indeterminate .MuiCircularProgress-circle
```

```bash
npx @mui/codemod@next deprecations/circular-progress-classes <path>
```

#### `divider-props`

```diff
 <Divider
-  light
+  sx={{ opacity: 0.6 }}
 />
```

```bash
npx @mui/codemod@next deprecations/divider-props <path>
```

#### `dialog-classes`

JS transforms:

```diff
 import { dialogClasses } from '@mui/material/Dialog';

 MuiDialog: {
   styleOverrides: {
     root: {
-      [`& .${dialogClasses.paperScrollBody}`]: {
+      [`& .${dialogClasses.scrollBody} > .${dialogClasses.paper}`]: {
         color: 'red',
       },
-      [`& .${dialogClasses.paperScrollPaper}`]: {
+      [`& .${dialogClasses.scrollPaper} > .${dialogClasses.paper}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiDialog-root .MuiDialog-paperScrollBody
+.MuiDialog-root .MuiDialog-scrollBody > .MuiDialog-paper
-.MuiDialog-root .MuiDialog-paperScrollPaper
+.MuiDialog-root .MuiDialog-scrollPaper > .MuiDialog-paper
```

```bash
npx @mui/codemod@next deprecations/dialog-classes <path>
```

#### `dialog-props`

JS transforms:

```diff
 <Dialog
-  PaperProps={paperProps}
+  slotProps={{ paper: paperProps }}
- TransitionComponent={CustomTransition}
+ slots={{ transition: CustomTransition }}
- TransitionProps={CustomTransitionProps}
+ slotProps={{ transition: CustomTransitionProps }}
 />
     },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/dialog-props <path>
```

#### `drawer-classes`

JS transforms:

```diff
 import { drawerClasses } from '@mui/material/Drawer';

 MuiDrawer: {
   styleOverrides: {
     root: {
-      [`.${drawerClasses.paperAnchorBottom}`]: {
+      [`&.${drawerClasses.anchorBottom} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
-      [`.${drawerClasses.paperAnchorLeft}`]: {
+      [`&.${drawerClasses.anchorLeft} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
-      [`.${drawerClasses.paperAnchorRight}`]: {
+      [`&.${drawerClasses.anchorRight} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
-      [`.${drawerClasses.paperAnchorTop}`]: {
+      [`&.${drawerClasses.anchorTop} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
-      [`.${drawerClasses.paperAnchorDockedBottom}`]: {
+      [`&.${drawerClasses.docked}.${drawerClasses.anchorBottom} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
-      [`.${drawerClasses.paperAnchorDockedLeft}`]: {
+      [`&.${drawerClasses.docked}.${drawerClasses.anchorLeft} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
-      [`.${drawerClasses.paperAnchorDockedRight}`]: {
+      [`&.${drawerClasses.docked}.${drawerClasses.anchorRight} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
-      [`.${drawerClasses.paperAnchorDockedTop}`]: {
+      [`&.${drawerClasses.docked}.${drawerClasses.anchorTop} > .${drawerClasses.paper}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiDrawer-paperAnchorBottom
+.MuiDrawer-anchorBottom > .MuiDrawer-paper
-.MuiDrawer-paperAnchorLeft
+.MuiDrawer-anchorLeft > .MuiDrawer-paper
-.MuiDrawer-paperAnchorRight
+.MuiDrawer-anchorRight > .MuiDrawer-paper
-.MuiDrawer-paperAnchorTop
+.MuiDrawer-anchorTop > .MuiDrawer-paper
-.MuiDrawer-paperAnchorDockedBottom
+.MuiDrawer-docked.MuiDrawer-anchorBottom > .MuiDrawer-paper
-.MuiDrawer-paperAnchorDockedLeft
+.MuiDrawer-docked.MuiDrawer-anchorLeft > .MuiDrawer-paper
-.MuiDrawer-paperAnchorDockedRight
+.MuiDrawer-docked.MuiDrawer-anchorRight > .MuiDrawer-paper
-.MuiDrawer-paperAnchorDockedTop
+.MuiDrawer-docked.MuiDrawer-anchorTop > .MuiDrawer-paper
```

```bash
npx @mui/codemod@next deprecations/drawer-classes <path>
```

#### `drawer-props`

```diff
 <Drawer
-  BackdropComponent={CustomBackdrop}
-  BackdropProps={{ transitionDuration: 300 }}
-  PaperProps={{ elevation: 20 }}
-  SlideProps={{ direction: 'right' }}
+  slots={{ backdrop: CustomBackdrop }}
+  slotProps={{
+    backdrop: { transitionDuration: 300 },
+    paper: { elevation: 20 },
+    transition: { direction: 'right' },
+  }}
 />
```

The same applies to `SwipeableDrawer`.

```diff
 MuiDrawer: {
   defaultProps: {
-    BackdropComponent: CustomBackdrop,
-    BackdropProps: { transitionDuration: 300 },
-    PaperProps: { elevation: 20 },
-    SlideProps: { direction: 'right' },
+    slots: { backdrop: CustomBackdrop },
+    slotProps: {
+      backdrop: { transitionDuration: 300 },
+      paper: { elevation: 20 },
+      transition: { direction: 'right' },
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/drawer-props <path>
```

#### `filled-input-props`

```diff
 <FilledInput
-  components={{ Input: CustomInput, Root: CustomRoot }}
-  componentsProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
+  slots={{ input: CustomInput, root: CustomRoot }}
+  slotProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
 />
```

```diff
 MuiFilledInput: {
   defaultProps: {
-    components: { Input: CustomInput, Root: CustomRoot }
-    componentsProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }
+    slots: { input: CustomInput, root: CustomRoot },
+    slotProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/filled-input-props <path>
```

#### `form-control-label-props`

```diff
 <FormControlLabel
-  componentsProps={{ typography: typographyProps }}
+  slotProps={{ typography: typographyProps }}
 />
```

```diff
 MuiFormControlLabel: {
   defaultProps: {
-    componentsProps={{ typography: typographyProps }}
+    slotProps={{ typography: typographyProps }}
   },
 },
```

```bash
npx @mui/codemod@next deprecations/form-control-label-props <path>

```

#### `list-item-props`

```diff
 <ListItem
-  components={{ Root: CustomRoot }}
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slots={{ root: CustomRoot }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

```diff
 MuiListItem: {
   defaultProps: {
-    components: { Root: CustomRoot }
-    componentsProps: { root: { testid: 'test-id' }}
+    slots: { root: CustomRoot },
+    slotProps: { root: { testid: 'test-id' } },
  },
 },
```

```bash
npx @mui/codemod@next deprecations/list-item-props <path>
```

#### `list-item-text-props`

```diff
 <ListItemText
-  primaryTypographyProps={primaryTypographyProps}
+  slotProps={{ primary: primaryTypographyProps }}
-  secondaryTypographyProps={secondaryTypographyProps}
+  slotProps={{ secondary: secondaryTypographyProps }}
 />
```

```diff
 MuiListItemText: {
   defaultProps: {
-  primaryTypographyProps:primaryTypographyProps
+  slotProps:{ primary: primaryTypographyProps }
-  secondaryTypographyProps:secondaryTypographyProps
+  slotProps:{ secondary: secondaryTypographyProps }
  },
 },
```

```bash
npx @mui/codemod@next deprecations/list-item-text-props <path>
```

#### `image-list-item-bar-classes`

JS transforms:

```diff
 import { imageListItemBarClasses } from '@mui/material/ImageListItemBar';

 MuiImageListItemBar: {
   styleOverrides: {
     root: {
-      [`& .${imageListItemBarClasses.titleWrapBelow}`]: {
+      [`&.${imageListItemBarClasses.positionBelow} > .${imageListItemBarClasses.titleWrap}`]: {
         color: 'red',
       },
-      [`& .${imageListItemBarClasses.titleWrapActionPosLeft}`]: {
+      [`&.${imageListItemBarClasses.actionPositionLeft} > .${imageListItemBarClasses.titleWrap}`]: {
         color: 'red',
       },
-      [`& .${imageListItemBarClasses.titleWrapActionPosRight}`]: {
+      [`&.${imageListItemBarClasses.actionPositionRight} > .${imageListItemBarClasses.titleWrap}`]: {
         color: 'red',
       },
-      [`& .${imageListItemBarClasses.actionIconActionPosLeft}`]: {
+      [`&.${imageListItemBarClasses.actionPositionLeft} > .${imageListItemBarClasses.actionIcon}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
- .MuiImageListItemBar-titleWrapBelow
+.MuiImageListItemBar-positionBelow > .MuiImageListItemBar-titleWrap
```

```diff
- .MuiImageListItemBar-titleWrapActionPosLeft
+.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-titleWrap
```

```diff
- .MuiImageListItemBar-titleWrapActionPosRight
+.MuiImageListItemBar-actionPositionRight > .MuiImageListItemBar-titleWrap
```

```diff
- .MuiImageListItemBar-actionIconActionPosLeft
+.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-actionIcon
```

```bash
npx @mui/codemod@next deprecations/image-list-item-bar-classes <path>
```

#### `input-base-props`

```diff
 <InputBase
-  components={{ Input: CustomInput, Root: CustomRoot }}
-  componentsProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
+  slots={{ input: CustomInput, root: CustomRoot }}
+  slotProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
 />
```

```diff
 MuiInputBase: {
   defaultProps: {
-    components: { Input: CustomInput, Root: CustomRoot }
-    componentsProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }
+    slots: { input: CustomInput, root: CustomRoot },
+    slotProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/input-base-props <path>
```

#### `input-base-classes`

JS transforms:

```diff
 import { inputBaseClasses } from '@mui/material/InputBase';

 MuiInputBase: {
   styleOverrides: {
     root: {
-      [`& .${inputBaseClasses.inputSizeSmall}`]: {
+      [`&.${inputBaseClasses.sizeSmall} > .${inputBaseClasses.input}`]: {
         color: 'red',
       },
-      [`& .${inputBaseClasses.inputMultiline}`]: {
+      [`&.${inputBaseClasses.multiline} > .${inputBaseClasses.input}`]: {
         color: 'red',
       },
-      [`& .${inputBaseClasses.inputAdornedStart}`]: {
+      [`&.${inputBaseClasses.adornedStart} > .${inputBaseClasses.input}`]: {
         color: 'red',
       },
-      [`& .${inputBaseClasses.inputAdornedEnd}`]: {
+      [`&.${inputBaseClasses.adornedEnd} > .${inputBaseClasses.input}`]: {
         color: 'red',
       },
-      [`& .${inputBaseClasses.inputHiddenLabel}`]: {
+      [`&.${inputBaseClasses.hiddenLabel} > .${inputBaseClasses.input}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiInputBase-root .MuiInputBase-inputSizeSmall
+.MuiInputBase-root.MuiInputBase-sizeSmall > .MuiInputBase-input
-.MuiInputBase-root .MuiInputBase-inputMultiline
+.MuiInputBase-root.MuiInputBase-multiline > .MuiInputBase-input
-.MuiInputBase-root .MuiInputBase-inputAdornedStart
+.MuiInputBase-root.MuiInputBase-adornedStart > .MuiInputBase-input
-.MuiInputBase-root .MuiInputBase-inputAdornedEnd
+.MuiInputBase-root.MuiInputBase-adornedEnd > .MuiInputBase-input
-.MuiInputBase-root .MuiInputBase-inputHiddenLabel
+.MuiInputBase-root.MuiInputBase-hiddenLabel > .MuiInputBase-input
```

```bash
npx @mui/codemod@next deprecations/input-base-classes <path>
```

#### `input-props`

```diff
 <Input
-  components={{ Input: CustomInput, Root: CustomRoot }}
-  componentsProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
+  slots={{ input: CustomInput, root: CustomRoot }}
+  slotProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
 />
```

```diff
 MuiInput: {
   defaultProps: {
-    components: { Input: CustomInput, Root: CustomRoot }
-    componentsProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }
+    slots: { input: CustomInput, root: CustomRoot },
+    slotProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/input-props <path>
```

#### `linear-progress-classes`

JS transforms:

```diff
 import { linearProgressClasses } from '@mui/material/LinearProgress';

 MuiLinearProgress: {
   styleOverrides: {
     root: {
-      [`&.${linearProgressClasses.bar1Buffer}`]: {},
+      [`&.${linearProgressClasses.buffer} > .${linearProgressClasses.bar1}`]: {},
-      [`&.${linearProgressClasses.bar1Determinate}`]: {},
+      [`&.${linearProgressClasses.determinate} > .${linearProgressClasses.bar1}`]: {},
-      [`&.${linearProgressClasses.bar1Indeterminate}`]: {},
+      [`&.${linearProgressClasses.indeterminate} > .${linearProgressClasses.bar1}`]: {},
-      [`&.${linearProgressClasses.bar2Buffer}`]: {},
+      [`&.${linearProgressClasses.buffer} > .${linearProgressClasses.bar2}`]: {},
-      [`&.${linearProgressClasses.bar2Indeterminate}`]: {},
+      [`&.${linearProgressClasses.indeterminate} > .${linearProgressClasses.bar2}`]: {},
-      [`&.${linearProgressClasses.barColorPrimary}`]: {},
+      [`&.${linearProgressClasses.colorPrimary} > .${linearProgressClasses.bar}`]: {},
-      [`&.${linearProgressClasses.barColorSecondary}`]: {},
+      [`&.${linearProgressClasses.colorSecondary} > .${linearProgressClasses.bar}`]: {},
-      [`&.${linearProgressClasses.dashedColorPrimary}`]: {},
+      [`&.${linearProgressClasses.colorPrimary} > .${linearProgressClasses.dashed}`]: {},
-      [`&.${linearProgressClasses.dashedColorSecondary}`]: {},
+      [`&.${linearProgressClasses.colorSecondary} > .${linearProgressClasses.dashed}`]: {},
     },
   },
  }
```

CSS transforms:

```diff
-.MuiLinearProgress-bar1Buffer
+.MuiLinearProgress-buffer > .MuiLinearProgress-bar1
-.MuiLinearProgress-bar1Determinate
+.MuiLinearProgress-determinate > .MuiLinearProgress-bar1
-.MuiLinearProgress-bar1Indeterminate
+.MuiLinearProgress-indeterminate > .MuiLinearProgress-bar1
-.MuiLinearProgress-bar2Buffer
+.MuiLinearProgress-buffer > .MuiLinearProgress-bar2
-.MuiLinearProgress-bar2Indeterminate
+.MuiLinearProgress-indeterminate > .MuiLinearProgress-bar2
-.MuiLinearProgress-barColorPrimary
+.MuiLinearProgress-colorPrimary > .MuiLinearProgress-bar
-.MuiLinearProgress-barColorSecondary
+.MuiLinearProgress-colorSecondary > .MuiLinearProgress-bar
-.MuiLinearProgress-dashedColorPrimary
+.MuiLinearProgress-colorPrimary > .MuiLinearProgress-dashed
-.MuiLinearProgress-dashedColorSecondary
+.MuiLinearProgress-colorSecondary > .MuiLinearProgress-dashed
```

```bash
npx @mui/codemod@next deprecations/linear-progress-classes <path>
```

#### `modal-props`

```diff
 <Modal
-  components={{ Root: CustomRoot, Backdrop: CustomBackdrop }}
-  componentsProps={{ root: { testid: 'root-id' }, backdrop: { testid: 'backdrop-id' } }}
+  slots={{ root: CustomRoot, backdrop: CustomBackdrop }}
+  slotProps={{ root: { testid: 'root-id' }, backdrop: { testid: 'backdrop-id' } }}
 />
```

```diff
 MuiModal: {
   defaultProps: {
-    components: { Root: CustomRoot, Backdrop: CustomBackdrop }
-    componentsProps: { root: { testid: 'root-id' }, backdrop: { testid: 'backdrop-id' }}
+    slots: { root: CustomRoot, backdrop: CustomBackdrop },
+    slotProps: { root: { testid: 'root-id' }, backdrop: { testid: 'backdrop-id' } },
  },
 },
```

```bash
npx @mui/codemod@next deprecations/modal-props <path>
```

#### `mobile-stepper-props`

```diff
 <MobileStepper
-  LinearProgressProps={{ color: 'primary' }}
+  slotProps={{ progress: { color: 'primary' } }}
 />
```

```bash
npx @mui/codemod@next deprecations/mobile-stepper-props <path>
```

#### `menu-props`

```diff
 <Menu
-  TransitionComponent={CustomTransition}
-  MenuListProps={{ disablePadding: true }}
-  TransitionProps={{ timeout: 200 }}
+  slots={{ transition: CustomTransition }}
+  slotProps={{
+    list: { disablePadding: true },
+    transition: { timeout: 200 },
+  }}
 />
```

```diff
 MuiMenu: {
   defaultProps: {
-    TransitionComponent: CustomTransition,
-    MenuListProps: { disablePadding: true },
-    TransitionProps: { timeout: 200 },
+    slots: { transition: CustomTransition },
+    slotProps: {
+      list: { disablePadding: true },
+      transition: { timeout: 200 },
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/menu-props <path>
```

#### `pagination-item-classes`

JS transforms:

```diff
 import { paginationItemClasses } from '@mui/material/PaginationItem';

 MuiPaginationItem: {
   styleOverrides: {
     root: {
-      [`&.${paginationItemClasses.textPrimary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.textSecondary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.outlinedPrimary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.outlinedSecondary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
       },
-      '&.MuiPaginationItem-textPrimary': {
+      '&.MuiPaginationItem-text.MuiPaginationItem-colorPrimary': {
         color: 'red',
       },
-      '&.MuiPaginationItem-textSecondary': {
+      '&.MuiPaginationItem-text.MuiPaginationItem-colorSecondary': {
         color: 'red',
       },
-      '&.MuiPaginationItem-outlinedPrimary': {
+      '&.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary': {
         color: 'red',
       },
-      '&.MuiPaginationItem-outlinedSecondary': {
+      '&.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary': {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiPaginationItem-textPrimary
+.MuiPaginationItem-text.MuiPaginationItem-primary
-.MuiPaginationItem-textSecondary
+.MuiPaginationItem-text.MuiPaginationItem-secondary
-.MuiPaginationItem-outlinedPrimary
+.MuiPaginationItem-outlined.MuiPaginationItem-primary
-.MuiPaginationItem-outlinedSecondary
+.MuiPaginationItem-outlined.MuiPaginationItem-secondary
```

```bash
npx @mui/codemod@next deprecations/pagination-item-classes <path>
```

#### `pagination-item-props`

```diff
 <PaginationItem
-  components={{ first: FirstIcon, last: LastIcon, next: NextIcon, previous: PreviousIcons }}
+  slots={{ first: FirstIcon, last: LastIcon, next: NextIcon, previous: PreviousIcons }}
 />
```

```diff
 MuiPaginationItem: {
   defaultProps: {
-    components: { first: FirstIcon, last: LastIcon, next: NextIcon, previous: PreviousIcons }
+    slots: { first: FirstIcon, last: LastIcon, next: NextIcon, previous: PreviousIcons }
  },
 },
```

```bash
npx @mui/codemod@next deprecations/pagination-item-props <path>
```

#### `popover-props`

```diff
 <Popover
-  BackdropComponent={CustomBackdrop}
-  BackdropProps={{ timeout: 200 }}
-  PaperProps={{ elevation: 4 }}
-  TransitionComponent={CustomTransition}
-  TransitionProps={{ timeout: 200 }}
+  slots={{ backdrop: CustomBackdrop, transition: CustomTransition }}
+  slotProps={{
+    backdrop: { timeout: 200 },
+    paper: { elevation: 4 },
+    transition: { timeout: 200 },
+  }}
 />
```

```diff
 MuiPopover: {
   defaultProps: {
-    BackdropComponent: 'div',
-    BackdropProps: { timeout: 200 },
-    PaperProps: { elevation: 8 },
-    TransitionComponent: 'em',
-    TransitionProps: { timeout: 200 },
+    slots: { backdrop: 'div', transition: 'em' },
+    slotProps: {
+      backdrop: { timeout: 200 },
+      paper: { elevation: 8 },
+      transition: { timeout: 200 },
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/popover-props <path>
```

#### `popper-props`

```diff
 <Popper
-  components={{ Root: CustomRoot }}
-  componentsProps={{ root: { testid: 'test-id' } }}
+  slots={{ root: CustomRoot }}
+  slotProps={{ root: { testid: 'test-id' } }}
 />
```

```diff
 MuiPopper: {
   defaultProps: {
-    components: { Root: CustomRoot }
-    componentsProps: { root: { testid: 'test-id' }}
+    slots: { root: CustomRoot },
+    slotProps: { root: { testid: 'test-id' } },
  },
 },
```

```bash
npx @mui/codemod@next deprecations/popper-props <path>
```

#### `outlined-input-props`

```diff
 <OutlinedInput
-  components={{ Input: CustomInput, Root: CustomRoot }}
-  componentsProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
+  slots={{ input: CustomInput, root: CustomRoot }}
+  slotProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
 />
```

```diff
 MuiOutlinedInput: {
   defaultProps: {
-    components: { Input: CustomInput, Root: CustomRoot }
-    componentsProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }
+    slots: { input: CustomInput, root: CustomRoot },
+    slotProps: { input: { id: 'test-input-id' }, root: { id: 'test-root-id' } },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/outlined-input-props <path>
```

#### `rating-props`

```diff
 <Rating
-  IconContainerComponent={CustomContainer}
+  slots={{
+    icon: { component: CustomContainer }
+  }}
 />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next deprecations/rating-props <path>
```

#### `radio-props`

```diff
 <Radio
-  inputProps={{ 'aria-label': 'Radio' }}
-  inputRef={ref}
+  slotProps={{ input: { 'aria-label': 'Radio', ref } }}
 />
```

```bash
npx @mui/codemod@next deprecations/radio-props <path>
```

#### `select-classes`

JS transforms:

```diff
 import { selectClasses } from '@mui/material/Select';

 MuiSelect: {
   styleOverrides: {
     root: {
-      [`& .${selectClasses.iconFilled}`]: {
+      [`& .${selectClasses.filled} ~ .${selectClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${selectClasses.iconOutlined}`]: {
+      [`& .${selectClasses.outlined} ~ .${selectClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${selectClasses.iconStandard}`]: {
+      [`& .${selectClasses.standard} ~ .${selectClasses.icon}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
- .MuiSelect-iconFilled
+ .MuiSelect-filled ~ .MuiSelect-icon
```

```diff
- .MuiSelect-iconOutlined
+ .MuiSelect-outlined ~ .MuiSelect-icon
```

```diff
- .MuiSelect-iconStandard
+ .MuiSelect-standard ~ .MuiSelect-icon
```

```bash
npx @mui/codemod@next deprecations/select-classes <path>
```

#### `slider-props`

```diff
 <Slider
-  components={{ Track: CustomTrack }}
-  componentsProps={{ track: { testid: 'test-id' } }}
+  slots={{ track: CustomTrack }}
+  slotProps={{ track: { testid: 'test-id' } }}
 />
```

```diff
 MuiSlider: {
   defaultProps: {
-    components: { Track: CustomTrack }
-    componentsProps: { track: { testid: 'test-id' }}
+    slots: { track: CustomTrack },
+    slotProps: { track: { testid: 'test-id' } },
  },
 },
```

```bash
npx @mui/codemod@next deprecations/slider-props <path>
```

#### `snackbar-props`

```diff
 <Snackbar
-    ClickAwayListenerProps={CustomClickAwayListenerProps}
-    ContentProps={CustomContentProps}
-    TransitionComponent={CustomTransition}
-    TransitionProps={CustomTransitionProps}
+    slots={{ transition: CustomTransition }}
+    slotProps={{
+        clickAwayListener: CustomClickAwayListenerProps,
+        content: CustomContentProps,
+        transition: CustomTransitionProps
+    }}
 />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next deprecations/snackbar-props <path>
```

#### `speed-dial-props`

```diff
 <SpeedDial
-  FabProps={CustomFabProps}
-  TransitionComponent={CustomTransition}
-  TransitionProps={CustomTransitionProps}
+  slots={{ transition: CustomTransition }}
+  slotProps={{
+    fab: CustomFabProps,
+    transition: CustomTransitionProps,
+  }}
 />
```

```diff
 MuiSpeedDial: {
   defaultProps: {
-    FabProps: CustomFabProps,
-    TransitionComponent: CustomTransition,
-    TransitionProps: CustomTransitionProps,
+    slots: { transition: CustomTransition },
+    slotProps: {
+      fab: CustomFabProps,
+      transition: CustomTransitionProps,
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/speed-dial-props <path>
```

#### `speed-dial-action-props`

```diff
 <SpeedDialAction
-  FabProps={FabProps}
-  TooltipClasses={TooltipClasses}
-  tooltipOpen={true}
-  tooltipPlacement="top"
-  tooltipTitle="test"
+  slotProps={{
+    fab: FabProps,
+    tooltip: {
+      classes: TooltipClasses,
+      open: true,
+      placement: 'top',
+      title: 'test',
+    },
+  }}
 />
```

```diff
 MuiSpeedDialAction: {
   defaultProps: {
-    FabProps: { id: 'test' },
-    TooltipClasses: classes,
-    tooltipOpen: true,
-    tooltipPlacement: 'top',
-    tooltipTitle: 'test',
+    slotProps: {
+      fab: { id: 'test' },
+      tooltip: {
+        classes: classes,
+        open: true,
+        placement: 'top',
+        title: 'test',
+      },
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/speed-dial-action-props <path>
```

#### `slider-classes`

JS transforms:

```diff
 import { sliderClasses } from '@mui/material/Slider';

 MuiSlider: {
   styleOverrides: {
     root: {
-      [`& .${sliderClasses.thumbSizeSmall}`]: {
+      [`&.${sliderClasses.sizeSmall} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
-      [`& .${sliderClasses.thumbSizeMedium}`]: {
+      [`&.${sliderClasses.sizeMedium} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
-      [`& .${sliderClasses.thumbColorPrimary}`]: {
+      [`&.${sliderClasses.colorPrimary} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
-      [`& .${sliderClasses.thumbColorSecondary}`]: {
+      [`&.${sliderClasses.colorSecondary} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
-      [`& .${sliderClasses.thumbColorError}`]: {
+      [`&.${sliderClasses.colorError} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
-      [`& .${sliderClasses.thumbColorInfo}`]: {
+      [`&.${sliderClasses.colorInfo} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
-      [`& .${sliderClasses.thumbColorSuccess}`]: {
+      [`&.${sliderClasses.colorSuccess} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
-      [`& .${sliderClasses.thumbColorWarning}`]: {
+      [`&.${sliderClasses.colorWarning} > .${sliderClasses.thumb}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiSlider-root .MuiSlider-thumbSizeSmall
+.MuiSlider-root.MuiSlider-sizeSmall > .MuiSlider-thumb
-.MuiSlider-root .MuiSlider-thumbSizeMedium
+.MuiSlider-root.MuiSlider-sizeMedium > .MuiSlider-thumb
-.MuiSlider-root .MuiSlider-thumbColorPrimary
+.MuiSlider-root.MuiSlider-colorPrimary > .MuiSlider-thumb
-.MuiSlider-root .MuiSlider-thumbColorSecondary
+.MuiSlider-root.MuiSlider-colorSecondary > .MuiSlider-thumb
-.MuiSlider-root .MuiSlider-thumbColorError
+.MuiSlider-root.MuiSlider-colorError > .MuiSlider-thumb
-.MuiSlider-root .MuiSlider-thumbColorInfo
+.MuiSlider-root.MuiSlider-colorInfo > .MuiSlider-thumb
-.MuiSlider-root .MuiSlider-thumbColorSuccess
+.MuiSlider-root.MuiSlider-colorSuccess > .MuiSlider-thumb
-.MuiSlider-root .MuiSlider-thumbColorWarning
+.MuiSlider-root.MuiSlider-colorWarning > .MuiSlider-thumb
```

```bash
npx @mui/codemod@next deprecations/slider-classes <path>
```

#### `tabs-props`

```diff
 <Tabs
-  ScrollButtonComponent={CustomScrollButton}
-  TabIndicatorProps={{ className: 'indicator' }}
-  TabScrollButtonProps={{ disableRipple: true }}
+  slots={{ scrollButtons: CustomScrollButton }}
+  slotProps={{
+    indicator: { className: 'indicator' },
+    scrollButtons: { disableRipple: true },
+  }}
 />
```

```diff
 <Tabs
-  slots={{ StartScrollButtonIcon: CustomIcon, EndScrollButtonIcon: CustomIcon2 }}
+  slots={{ startScrollButtonIcon: CustomIcon, endScrollButtonIcon: CustomIcon2 }}
 />
```

```diff
 MuiTabs: {
   defaultProps: {
-    ScrollButtonComponent: CustomScrollButton,
-    TabScrollButtonProps: { disableRipple: true },
-    TabIndicatorProps: { className: 'indicator' },
+    slots: {
+      scrollButtons: CustomScrollButton,
+    },
+    slotProps: {
+      scrollButtons: { disableRipple: true },
+      indicator: { className: 'indicator' },
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/tabs-props <path>
```

#### `tooltip-props`

```diff
 <Tooltip
-  components={{ Arrow: CustomArrow, Tooltip: CustomTooltip }}
-  componentsProps={{ arrow: { testid: 'test-id' }, tooltip: { className: 'custom' } }}
-  PopperComponent={CustomPopperComponent}
-  TransitionComponent={CustomTransitionComponent}
-  PopperProps={CustomPopperProps}
-  TransitionProps={CustomTransitionProps}
+  slots={{
+    arrow: CustomArrow,
+    tooltip: CustomTooltip,
+    popper: CustomPopperComponent,
+    transition: CustomTransitionComponent,
+  }}
+  slotProps={{
+    arrow: { testid: 'test-id' },
+    tooltip: { className: 'custom' },
+    popper: CustomPopperProps,
+    transition: CustomTransitionProps,
+  }}
 />
```

```diff
 MuiTooltip: {
   defaultProps: {
-    PopperComponent: CustomPopperComponent,
-    TransitionComponent: CustomTransitionComponent,
-    PopperProps: CustomPopperProps,
-    TransitionProps: CustomTransitionProps,
-    components: { Arrow: CustomArrow, Tooltip: CustomTooltip }
+    slots: {
+      arrow: CustomArrow,
+      tooltip: CustomTooltip,
+      popper: CustomPopperComponent,
+      transition: CustomTransitionComponent,
+    },
-    componentsProps: { arrow: { testid: 'test-id' }, tooltip: { className: 'custom' } }
+    slotProps: {
+      arrow: { testid: 'test-id' },
+      tooltip: { className: 'custom' },
+      popper: CustomPopperProps,
+      transition: CustomTransitionProps,
+    },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/tooltip-props <path>
```

#### `step-connector-classes`

JS transforms:

```diff
 import { stepConnectorClasses } from '@mui/material/StepConnector';

 MuiStepConnector: {
   styleOverrides: {
     root: {
-      [`& .${stepConnectorClasses.lineHorizontal}`]: {
+      [`&.${stepConnectorClasses.horizontal} > .${stepConnectorClasses.line}`]: {
         color: 'red',
       },
-      [`& .${stepConnectorClasses.lineVertical}`]: {
+      [`&.${stepConnectorClasses.vertical} > .${stepConnectorClasses.line}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiStepConnector-lineHorizontal
+.MuiStepConnector-horizontal > .MuiStepConnector-line
```

```diff
-.MuiStepConnector-lineVertical
+.MuiStepConnector-vertical > .MuiStepConnector-line
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next deprecations/step-connector-classes <path>
```

#### `step-content-props`

```diff
 <StepContent
-  TransitionComponent={CustomTransition}
-  TransitionProps={{ unmountOnExit: true }}
+  slots={{ transition: CustomTransition }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

```bash
npx @mui/codemod@next deprecations/step-content-props <path>
```

#### `step-label-props`

```diff
 <StepLabel
-  componentsProps={{ label: labelProps }}
+  slotProps={{ label: labelProps }}
-  StepIconComponent={StepIconComponent}
+  slots={{ stepIcon: StepIconComponent }}
-  StepIconProps={StepIconProps}
+  slotProps={{ stepIcon: StepIconProps }}
 />
```

```diff
 MuiStepLabel: {
   defaultProps: {
-  componentsProps:{ label: labelProps }
+  slotProps:{ label: labelProps }
-  StepIconComponent:StepIconComponent
+  slots:{ stepIcon: StepIconComponent }
-  StepIconProps:StepIconProps
+  slotProps:{ stepIcon: StepIconProps }
  },
 },
```

```bash
npx @mui/codemod@next deprecations/step-label-props <path>
```

#### `switch-props`

```diff
 <Switch
-  inputProps={{ 'aria-label': 'Switch' }}
-  inputRef={ref}
+  slotProps={{ input: { 'aria-label': 'Switch', ref } }}
 />
```

```bash
npx @mui/codemod@next deprecations/switch-props <path>
```

#### `text-field-props`

```diff
 <TextField
-  InputProps={CustomInputProps}
-  inputProps={CustomHtmlInputProps}
-  SelectProps={CustomSelectProps}
-  InputLabelProps={CustomInputLabelProps}
-  FormHelperTextProps={CustomFormHelperProps}
+  slotProps={{
+    input: CustomInputProps,
+    htmlInput: CustomHtmlInputProps,
+    select: CustomSelectProps,
+    inputLabel: CustomInputLabelProps,
+    formHelper: CustomFormHelperProps,
+  }}
 />
```

```bash
npx @mui/codemod@next deprecations/text-field-props <path>
```

#### `toggle-button-group-classes`

JS transforms:

```diff
 import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';

 MuiToggleButtonGroup: {
   styleOverrides: {
     root: {
-      [`& .${toggleButtonGroupClasses.groupedHorizontal}`]: {
+      [`&.${toggleButtonGroupClasses.horizontal} > .${toggleButtonGroupClasses.grouped}`]: {
         color: 'red',
       },
-      [`& .${toggleButtonGroupClasses.groupedVertical}`]: {
+      [`&.${toggleButtonGroupClasses.vertical} > .${toggleButtonGroupClasses.grouped}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedHorizontal
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-horizontal > .MuiToggleButtonGroup-grouped
```

```diff
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedVertical
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-vertical > .MuiToggleButtonGroup-grouped
```

```bash
npx @mui/codemod@next deprecations/toggle-button-group-classes <path>
```

#### `tab-classes`

JS transforms:

```diff
 import { tabClasses } from '@mui/material/Tab';

 MuiTab: {
   styleOverrides: {
     root: {
-      [`& .${tabClasses.iconWrapper}`]: {
+      [`& .${tabClasses.icon}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiTab-iconWrapper
+.MuiTab-icon
```

```bash
npx @mui/codemod@next deprecations/tab-classes <path>
```

#### `table-sort-label-classes`

JS transforms:

```diff
 import { tableSortLabelClasses } from '@mui/material/TableSortLabel';

 MuiTableSortLabel: {
   styleOverrides: {
     root: {
-      [`& .${tableSortLabelClasses.iconDirectionDesc}`]: {
+      [`&.${tableSortLabelClasses.directionDesc} > .${tableSortLabelClasses.icon}`]: {
         color: 'red',
       },
-      [`& .${tableSortLabelClasses.iconDirectionAsc}`]: {
+      [`&.${tableSortLabelClasses.directionAsc} > .${tableSortLabelClasses.icon}`]: {
         color: 'red',
       },
     },
   },
 },
```

CSS transforms:

```diff
-.MuiTableSortLabel-iconDirectionDesc
+.MuiTableSortLabel-directionDesc > .MuiTableSortLabel-icon
```

```diff
-.MuiTableSortLabel-iconDirectionAsc
+.MuiTableSortLabel-directionAsc > .MuiTableSortLabel-icon
```

```bash
npx @mui/codemod@next deprecations/table-sort-label-classes <path>
```

#### `typography-props`

```diff
 <Typography
-  paragraph
+  sx={{ marginBottom: '16px' }}
 />
```

```diff
 <Typography
-  paragraph={isTypographyParagraph}
+  sx={isTypographyParagraph ? { marginBottom: '16px' } : undefined}
 />
```

```diff
 MuiTypography: {
   defaultProps: {
-    paragraph: true
+    sx: { marginBottom: '16px' },
   },
 },
```

```bash
npx @mui/codemod@next deprecations/typography-props <path>
```

### v9.0.0

#### `system-props`

```bash
npx @mui/codemod@next v9.0.0/system-props <path>
```

Remove system props from Box, Stack, Typography, Link, Grid, DialogContentText, TimelineContent, and TimelineOppositeContent components and move them to the `sx` prop.

Compared to the v6 codemod, the v9 version also handles:

- `color="inherit"` on Typography (moved to `sx`)
- `color="text.secondary"` on Link (moved to `sx`, while keeping named colors like `"primary"` and `"inherit"` as component props)
- DialogContentText, TimelineContent, and TimelineOppositeContent components

```diff
-<Typography color="inherit" />
+<Typography sx={{ color: "inherit" }} />

-<Link color="text.secondary" href="#" />
+<Link href="#" sx={{ color: "text.secondary" }} />
```

You can also pass `--jsx` to specify JSX element names directly, bypassing import detection.
This is useful for projects using auto-import plugins (for example `unplugin-auto-import`) where Material UI components are available without explicit import statements:

```bash
npx @mui/codemod@next v9.0.0/system-props <path> -- --jsx=Box,Typography,Stack,Link,Grid,DialogContentText
```

### v7.0.0

#### `theme-color-functions`

```bash
npx @mui/codemod@next v7.0.0/theme-color-functions <path>
```

Replace the usage of the `alpha()`, `lighten()`, and `darken()` functions from `@mui/system/colorManipulator` to use the `theme` object instead.

```diff
- import { alpha, lighten, darken } from '@mui/system/colorManipulator';

- alpha(theme.palette.primary.main, 0.8)
+ theme.alpha((theme.vars || theme).palette.primary.main, 0.8)

- lighten(theme.palette.primary.main, 0.1)
+ theme.lighten(theme.palette.primary.main, 0.1)

- darken(theme.palette.primary.main, 0.3)
+ theme.darken(theme.palette.primary.main, 0.3)
```

#### `grid-props`

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/grid-props <path>
```

Updates the usage of the `@mui/material/Grid`, `@mui/system/Grid`, and `@mui/joy/Grid` components to their updated APIs.

```diff
 <Grid
-   xs={12}
-   sm={6}
-   xsOffset={2}
-   smOffset={3}
+   size={{ xs: 12, sm: 6 }}
+   offset={{ xs: 2, sm: 3 }}
 />
```

You can provide the theme breakpoints via options, for example, `--jscodeshift='--muiBreakpoints=mobile,desktop'`, to use your custom breakpoints in the transformation.

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/grid-props <path> --jscodeshift='--muiBreakpoints=mobile,desktop'
```

```diff
- <Grid mobile={12} mobileOffset={2} desktop={6} desktopOffset={4} >
+ <Grid size={{ mobile: 12, desktop: 6 }} offset={{ mobile: 2, desktop: 4 }} >
```

#### `lab-removed-components`

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/lab-removed-components <path>
```

Update the import of the following components and hook moved from `@mui/lab` to `@mui/material`:

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

It updates named imports from top-level `@mui/lab`:

```diff
- import { Alert } from '@mui/lab';
+ import { Alert } from '@mui/material';
```

As well as default and named imports from component-level files:

```diff
- import Alert, { alertClasses } from '@mui/lab/Alert';
+ import Alert, { alertClasses } from '@mui/material/Alert';
```

#### `input-label-size-normal-medium`

Updates the `InputLabel`'s `size` value from `normal` to `medium`.

```diff
-<InputLabel size="normal">Label</InputLabel>
+<InputLabel size="medium">Label</InputLabel>
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v7.0.0/input-label-size-normal-medium <path>
```

<!-- #host-reference -->

You can find more details about this breaking change in [the migration guide](https://next.mui.com/material-ui/migration/upgrade-to-v7/#inputlabel).

### v6.0.0

#### `sx-prop`

```bash
npx @mui/codemod@next v6.0.0/sx-prop <path>
```

Update the usage of the `sx` prop to be compatible with `@pigment-css/react`.

```diff
 <Box
-  sx={{
-    backgroundColor: (theme) =>
-      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
-  }}
+  sx={theme => ({
+    backgroundColor: theme.palette.grey[900],
+    ...theme.applyStyles("light", {
+      backgroundColor: theme.palette.grey[100]
+    })
+  })}
 />
```

#### `system-props`

```bash
npx @mui/codemod@next v6.0.0/system-props <path>
```

Remove system props and add them to the `sx` prop.

```diff
-<Box ml="2px" py={1} color="primary.main" />
+<Box sx={{ ml: '2px', py: 1, color: 'primary.main' }} />
```

#### `theme-v6`

```bash
npx @mui/codemod@next v6.0.0/theme-v6 <path>
```

Update the theme creation from `@mui/system@v5` to be compatible with `@pigment-css/react`.

- replace palette mode conditional with `theme.applyStyles()`
- replace `ownerState` with `variants`
- move theme variants to the root slot

```diff
  createTheme({
    components: {
      MuiButton: {
-       variants: [
-         {
-           props: { color: 'primary' },
-           style: {
-             color: 'red',
-           },
-         },
-       ],
        styleOverrides: {
-          root: ({ theme, ownerState }) => ({
+          root: ({ theme }) => ({
            ...ownerState.variant === 'contained' && {
              backgroundColor: alpha(theme.palette.primary.main, 0.8),
              ...theme.palette.mode === 'dark' && {
                backgroundColor: alpha(theme.palette.primary.light, 0.9),
              }
            },
+           variants: [
+             {
+               prop: { variant: 'contained' },
+               style: {
+                 backgroundColor: alpha(theme.palette.primary.main, 0.8),
+               },
+             },
+             {
+               prop: { variant: 'contained' },
+               style: {
+                 ...theme.applyStyles('dark', {
+                   backgroundColor: alpha(theme.palette.primary.light, 0.9),
+                 })
+               },
+             },
+             {
+               prop: { color: 'primary' },
+               style: {
+                 color: 'red',
+               },
+             },
+           ],
          })
        }
      }
    }
  })
```

#### `styled`

```bash
npx @mui/codemod@next v6.0.0/styled <path>
```

Updates the usage of `styled` from `@mui/system@v5` to be compatible with `@pigment-css/react`.

This codemod transforms the styles based on props to `variants` by looking for `styled` calls:

```diff
 styled('div')(({ theme, disabled }) => ({
   color: theme.palette.primary.main,
-  ...(disabled && {
-    opacity: 0.5,
-  }),
+  variants: [
+    {
+      prop: 'disabled',
+      style: {
+        opacity: 0.5,
+      },
+    },
+  ],
 }));
```

This codemod can handle complex styles with spread operators, ternary operators, and nested objects.

However, it has some **limitations**:

- It does not transform dynamic values as shown below:

  ```js
  const ResizableContainer = styled('div')(({ ownerState, theme }) => ({
    width: ownerState.width ?? '100%',
    height: ownerState.height ?? '100%',
  }));
  ```

  You need to manually declare a CSS variable and set the values using inline styles:

  ```js
  // ✅ Recommended way
  const ResizableContainer = styled('div')({
    width: 'var(--ResizableContainer-width, 100%)',
    height: 'var(--ResizableContainer-height, 100%)',
  });
  ```

- It does not transform dynamic reference from the theme, for example color palette.

  ```js
  const Test = styled('div')(({ ownerState, theme }) => ({
    backgroundColor: (theme.vars || theme).palette[ownerState.color]?.main,
  }));
  ```

  You need to manually iterate the theme object and create `variants` for each color.

  ```js
  // ✅ Recommended way
  const Test = styled('div')(({ theme }) => ({
    variants: Object.entries(theme.palette)
      .filter(([color, value]) => value.main)
      .map(([color, value]) => ({
        props: { color },
        style: {
          backgroundColor: value.main,
        },
      })),
  }));
  ```

#### `grid-v2-props`

```bash
npx @mui/codemod@next v6.0.0/grid-v2-props <path>
```

Updates the usage of the `@mui/material/Grid2`, `@mui/system/Grid`, and `@mui/joy/Grid` components to their updated APIs.

```diff
 <Grid
-   xs={12}
-   sm={6}
-   xsOffset={2}
-   smOffset={3}
+   size={{ xs: 12, sm: 6 }}
+   offset={{ xs: 2, sm: 3 }}
 />
```

You can provide the theme breakpoints via options, for example, `--jscodeshift='--muiBreakpoints=mobile,desktop'`, to use your custom breakpoints in the transformation.

```bash
npx @mui/codemod@next v6.0.0/grid-v2-props <path> --jscodeshift='--muiBreakpoints=mobile,desktop'
```

```diff
- <Grid mobile={12} mobileOffset={2} desktop={6} desktopOffset={4} >
+ <Grid size={{ mobile: 12, desktop: 6 }} offset={{ mobile: 2, desktop: 4 }} >
```

### v5.0.0

#### `base-use-named-exports`

Base UI default exports were changed to named ones. Previously we had a mix of default and named ones.
This was changed to improve consistency and avoid problems some bundlers have with default exports.
See https://github.com/mui/material-ui/issues/21862 for more context.

This codemod updates the import and re-export statements.

```diff
-import BaseButton from '@mui/base/Button';
-export { default as BaseSlider } from '@mui/base/Slider';
+import { Button as BaseButton } from '@mui/base/Button';
+export { Slider as BaseSlider } from '@mui/base/Slider';
```

```bash
npx @mui/codemod@next v5.0.0/base-use-named-exports <path>
```

#### `base-remove-unstyled-suffix`

The `Unstyled` suffix has been removed from all Base UI component names, including names of types and other related identifiers.

```diff
-<Input component='a' href='url' />;
+<Input slots={{ root: 'a' }} href='url' />;
```

```bash
npx @mui/codemod@next v5.0.0/base-remove-unstyled-suffix <path>
```

#### `base-remove-component-prop`

Remove `component` prop from all Base UI components by transferring its value into `slots.root`.

This change only affects Base UI components.

```diff
-<Input component={CustomRoot} />
+<Input slots={{ root: CustomRoot }} />
```

```bash
npx @mui/codemod@next v5.0.0/base-remove-component-prop <path>
```

#### `rename-css-variables`

Updates the names of the CSS variables of the Joy UI components to adapt to the new naming standards of the CSS variables for components.

```diff
-<List sx={{ py: 'var(--List-divider-gap)' }}>
-<Switch sx={{ '--Switch-track-width': '40px' }}>
+<List sx={{ py: 'var(--ListDivider-gap)' }}>
+<Switch sx={{ '--Switch-trackWidth': '40px' }}>
```

```bash
npx @mui/codemod@next v5.0.0/rename-css-variables <path>
```

#### `base-hook-imports`

Updates the sources of the imports of the Base UI hooks to adapt to the new directories of the hooks.

```diff
-import { useBadge } from '@mui/base/BadgeUnstyled';
+import useBadge from '@mui/base/useBadge';
```

```bash
npx @mui/codemod@next v5.0.0/base-hook-imports <path>
```

#### `joy-rename-classname-prefix`

Renames the classname prefix from `'Joy'` to `'Mui'` for Joy UI components.

```diff
 <Button
-  sx={{ '& .JoyButton-root': { '& .JoyButton-button': {} } }}
+  sx={{ '& .MuiButton-root': { '& .MuiButton-button': {} } }}
 />;
```

```bash
npx @mui/codemod@next v5.0.0/joy-rename-classname-prefix <path>
```

#### `joy-rename-row-prop`

Transforms `row` prop to `orientation` prop across `Card`, `List` and `RadioGroup` components.

```diff
 <Card
-  row
+  orientation="horizontal"
 />;
```

```bash
npx @mui/codemod@next v5.0.0/joy-rename-row-prop <path>
```

#### `joy-avatar-remove-imgProps`

Remove `imgProps` prop by transferring its value into `slotProps.img`

This change only affects Joy UI Avatar component.

```diff
 <Avatar
-  imgProps={{ ['data-id']: 'imageId' }}
-  slotProps={{ root: { ['data-id']: 'rootId' }}}
+  slotProps={{ root: { ['data-id']: 'rootId' }, img: { ['data-id']: 'imageId' } }}
 />;
```

```bash
npx @mui/codemod@next v5.0.0/joy-avatar-remove-imgProps <path>
```

#### `joy-text-field-to-input`

Replace `<TextField>` with a composition of input components:

This change only affects Joy UI components.

```diff
-import TextField from '@mui/joy/TextField';
+import FormControl from '@mui/joy/FormControl';
+import FormLabel from '@mui/joy/FormLabel';
+import FormHelperText from '@mui/joy/FormHelperText';
+import Input from '@mui/joy/Input';

-<TextField
-  id="Id"
-  label="Label"
-  placeholder="Placeholder"
-  helperText="Help!"
-  name="Name"
-  type="tel"
-  autoComplete="on"
-  autoFocus
-  error
-  required
-  fullWidth
-  defaultValue="DefaultValue"
-  size="sm"
-  color="primary"
-  variant="outlined"
-/>
+<FormControl
+  id="Id"
+  required
+  size="sm"
+  color="primary">
+  <FormLabel>
+    Label
+  </FormLabel>
+  <JoyInput
+    placeholder="Placeholder"
+    name="Name"
+    type="tel"
+    autoComplete="on"
+    autoFocus
+    error
+    fullWidth
+    defaultValue="DefaultValue"
+    variant="outlined" />
+  <FormHelperText id="Id-helper-text">
+    Help!
+  </FormHelperText>
+</FormControl>
```

```bash
npx @mui/codemod@next v5.0.0/joy-text-field-to-input <path>
```

#### `joy-rename-components-to-slots`

Renames the `components` and `componentsProps` props to `slots` and `slotProps`, respectively.

This change only affects Joy UI components.

```diff
 <Autocomplete
-  components={{ listbox: CustomListbox }}
-  componentsProps={{ root: { className: 'root' }, listbox: { 'data-testid': 'listbox' } }}
+  slots={{ listbox: CustomListbox }}
+  slotProps={{ root: { className: 'root' }, listbox: { 'data-testid': 'listbox' } }}
 />;
```

```bash
npx @mui/codemod@next v5.0.0/joy-rename-components-to-slots <path>
```

The associated breaking change was done in [#34997](https://github.com/mui/material-ui/pull/34997).

#### `date-pickers-moved-to-x`

Rename the imports of Date and Time Pickers from `@mui/lab` to `@mui/x-date-pickers` and `@mui/x-date-pickers-pro`.

```bash
npx @mui/codemod@next v5.0.0/date-pickers-moved-to-x <path>
```

#### `tree-view-moved-to-x`

Rename the imports of Tree View from `@mui/lab` to `@mui/x-tree-view`.

```bash
npx @mui/codemod@next v5.0.0/tree-view-moved-to-x <path>
```

#### 🚀 `preset-safe`

A combination of all important transformers for migrating v4 to v5. ⚠️ This codemod should be run only once.

```bash
npx @mui/codemod@next v5.0.0/preset-safe <path|folder>
```

The list includes these transformers

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
- [`material-ui-styles`](#material-ui-styles)
- [`material-ui-types`](#material-ui-types)
- [`modal-props`](#modal-props)
- [`moved-lab-modules`](#moved-lab-modules)
- [`pagination-round-circular`](#pagination-round-circular)
- [`optimal-imports`](#optimal-imports)
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
- [`with-mobile-dialog`](#with-mobile-dialog)
- [`with-width`](#with-width)
- [`mui-replace`](#mui-replace)

#### `adapter-v4`

Imports and inserts `adaptV4Theme` into `createTheme()` (or `createMuiTheme`)

```diff
+import { adaptV4Theme } from '@material-ui/core/styles';

-createTheme({ palette: { ... }})
+createTheme(adaptV4Theme({ palette: { ... }}))
```

```bash
npx @mui/codemod@next v5.0.0/adapter-v4 <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `autocomplete-rename-closeicon`

Renames `Autocomplete`'s `closeIcon` prop to `clearIcon`.

```diff
-<Autocomplete closeIcon={defaultClearIcon} />
+<Autocomplete clearIcon={defaultClearIcon} />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/autocomplete-rename-closeicon  <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#autocomplete).

#### `autocomplete-rename-option`

Renames `Autocomplete`'s `getOptionSelected` to `isOptionEqualToValue`.

```diff
 <Autocomplete
-  getOptionSelected={(option, value) => option.title === value.title}
+  isOptionEqualToValue={(option, value) => option.title === value.title}
 />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/autocomplete-rename-option  <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#autocomplete).

#### `avatar-circle-circular`

Updates the `Avatar`'s `variant` value and `classes` key from 'circle' to 'circular'.

```diff
-<Avatar variant="circle" />
-<Avatar classes={{ circle: 'className' }} />
+<Avatar variant="circular" />
+<Avatar classes={{ circular: 'className' }} />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/avatar-circle-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#avatar).

#### `badge-overlap-value`

Renames the badge's props.

```diff
-<Badge overlap="circle">
-<Badge overlap="rectangle">
+<Badge overlap="circular">
+<Badge overlap="rectangular">
 <Badge classes={{
-  anchorOriginTopRightRectangle: 'className',
-  anchorOriginBottomRightRectangle: 'className',
-  anchorOriginTopLeftRectangle: 'className',
-  anchorOriginBottomLeftRectangle: 'className',
-  anchorOriginTopRightCircle: 'className',
-  anchorOriginBottomRightCircle: 'className',
-  anchorOriginTopLeftCircle: 'className',
+  anchorOriginTopRightRectangular: 'className',
+  anchorOriginBottomRightRectangular: 'className',
+  anchorOriginTopLeftRectangular: 'className',
+  anchorOriginBottomLeftRectangular: 'className',
+  anchorOriginTopRightCircular: 'className',
+  anchorOriginBottomRightCircular: 'className',
+  anchorOriginTopLeftCircular: 'className',
 }}>
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/badge-overlap-value <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#badge).

#### `base-rename-components-to-slots`

Renames the `components` and `componentsProps` props to `slots` and `slotProps`, respectively.
Also, changes `slots`' fields names to camelCase.

This change only affects Base UI components.

```diff
 <BadgeUnstyled
-  components={{ Root, Badge: CustomBadge }}
-  componentsProps={{ root: { className: 'root' }, badge: { 'data-testid': 'badge' } }}
+  slots={{ root: Root, badge: CustomBadge }}
+  slotProps={{ root: { className: 'root' }, badge: { 'data-testid': 'badge' } }}
 />;
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/base-rename-components-to-slots <path>
```

The associated breaking change was done in [#34693](https://github.com/mui/material-ui/pull/34693).

#### `box-sx-prop`

Moves supported Box system props into the `sx` prop.

```diff
-<Box border="1px dashed grey" p={2} />
+<Box sx={{ border: '1px dashed grey', p: 2 }} />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/box-sx-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#box).

#### `box-borderradius-values`

Updates Box `borderRadius` values for the v5 sizing behavior.

```diff
-<Box borderRadius="borderRadius">
-<Box borderRadius={16}>
+<Box borderRadius={1}>
+<Box borderRadius="16px">
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/box-borderradius-values <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#box).

#### `box-rename-css`

Renames the Box `css` prop to `sx`

```diff
-<Box css={{ m: 2 }}>
+<Box sx={{ m: 2 }}>
```

```bash
npx @mui/codemod@next v5.0.0/box-rename-css <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#box).

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

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/box-rename-gap <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#box).

#### `button-color-prop`

Removes the outdated `color` prop values.

```diff
-<Button color="default">
+<Button>
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/button-color-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#button).

#### `chip-variant-prop`

Removes the Chip `variant` prop if the value is `"default"`.

```diff
-<Chip variant="default">
+<Chip>
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/chip-variant-prop <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#chip).

#### `circularprogress-variant`

Renames the CircularProgress `static` variant to `determinate`.

```diff
-<CircularProgress variant="static" classes={{ static: 'className' }} />
+<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/circularprogress-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#circularprogress).

#### `collapse-rename-collapsedheight`

Renames `Collapse`'s `collapsedHeight` prop to `collapsedSize`.

```diff
-<Collapse collapsedHeight={40} />
-<Collapse classes={{ container: 'collapse' }} />
+<Collapse collapsedSize={40} />
+<Collapse classes={{ root: 'collapse' }} />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/collapse-rename-collapsedheight <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#collapse).

#### `component-rename-prop`

A generic codemod to rename any component prop.

```diff
-<Component prop="value" />
-<Component prop />
+<Component newProp="value" />
+<Component newProp />
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/component-rename-prop <path> -- --component=Grid --from=prop --to=newProp
```

#### `core-styles-import`

Renames private import from `core/styles/*` to `core/styles`

```diff
-import { darken, lighten } from '@material-ui/core/styles/colorManipulator';
+import { darken, lighten } from '@material-ui/core/styles';
```

```bash
npx @mui/codemod@next v5.0.0/core-styles-import <path>
```

#### `create-theme`

Renames the function `createMuiTheme()` to `createTheme()`

```diff
-import { createMuiTheme } from '@material-ui/core/styles';
+import { createTheme } from '@material-ui/core/styles';
```

```bash
npx @mui/codemod@next v5.0.0/create-theme <path>
```

#### `dialog-props`

Remove `disableBackdropClick` prop from `<Dialog>`

```diff
-<Dialog disableBackdropClick />
+<Dialog />
```

```bash
npx @mui/codemod@next v5.0.0/dialog-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#dialog).

#### `dialog-title-props`

Remove `disableTypography` prop from `<DialogTitle>`

```diff
-<DialogTitle disableTypography />
+<DialogTitle />
```

```bash
npx @mui/codemod@next v5.0.0/dialog-title-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#dialog).

#### `emotion-prepend-cache`

Adds `prepend: true` to Emotion `createCache`

```diff
 const cache = emotionCreateCache({
   key: 'css',
+  prepend: true,
 });
```

```bash
npx @mui/codemod@next v5.0.0/create-theme <path>
```

#### `expansion-panel-component`

Renames `ExpansionPanel*` to `Accordion*`

```bash
npx @mui/codemod@next v5.0.0/expansion-panel-component <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#expansionpanel).

#### `fab-variant`

```diff
-<Fab variant="round" />
+<Fab variant="circular" />
```

```bash
npx @mui/codemod@next v5.0.0/fab-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#fab).

#### `fade-rename-alpha`

Renames the `fade` style utility import and calls to `alpha()`.

```diff
-import { fade, lighten } from '@material-ui/core/styles';
+import { alpha, lighten } from '@material-ui/core/styles';

-const foo = fade('#aaa');
+const foo = alpha('#aaa');
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/fade-rename-alpha <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#styles).

#### `grid-justify-justifycontent`

Renames `Grid`'s `justify` prop to `justifyContent`.

```diff
-<Grid justify="left">Item</Grid>
+<Grid item justifyContent="left">Item</Grid>
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/grid-justify-justifycontent <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#grid).

#### `grid-list-component`

Renames `GridList*` to `ImageList*`

```bash
npx @mui/codemod@next v5.0.0/grid-list-component <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#gridlist).

#### `icon-button-size`

Adds `size="large"` if `size` is not defined to get the same appearance as v4.

```diff
-<IconButton size="medium" />
-<IconButton />
+<IconButton size="medium" />
+<IconButton size="large" />
```

```bash
npx @mui/codemod@next v5.0.0/icon-button-size <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#iconbutton).

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
-    borderRadius: theme.shape.radius
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
+    borderRadius: theme.shape.radius
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
-    <div className={classes.root}>
+    <Root className={classes.root}>
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
-    </div>
+    </Root>
   )
 }
```

```bash
npx @mui/codemod@next v5.0.0/jss-to-styled <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#1-use-styled-or-sx-api).

> **Note:** This approach converts the first element in the return statement into styled component but also increases CSS specificity to override nested children.
> This codemod should be adopted after handling all breaking changes, [check out the migration documentation](https://mui.com/material-ui/migration/migration-v4/).

#### `jss-to-tss-react`

Migrate JSS styling with `makeStyles` or `withStyles` to the corresponding `tss-react` API.

```diff
-import clsx from 'clsx';
-import {makeStyles, createStyles} from '@material-ui/core/styles';
+import { makeStyles } from 'tss-react/mui';

-const useStyles = makeStyles((theme) => createStyles<
-  'root' | 'small' | 'child', {color: 'primary' | 'secondary', padding: number}
->
-({
-  root: ({color, padding}) => ({
+const useStyles = makeStyles<{color: 'primary' | 'secondary', padding: number}, 'child' | 'small'>({name: 'App'})((theme, { color, padding }, classes) => ({
+  root: {
     padding: padding,
-    '&:hover $child': {
+    [`&:hover .${classes.child}`]: {
       backgroundColor: theme.palette[color].main,
     }
-  }),
+  },
   small: {},
   child: {
     border: '1px solid black',
     height: 50,
-    '&$small': {
+    [`&.${classes.small}`]: {
       height: 30
     }
   }
-}), {name: 'App'});
+}));

 function App({classes: classesProp}: {classes?: any}) {
-  const classes = useStyles({color: 'primary', padding: 30, classes: classesProp});
+  const { classes, cx } = useStyles({
+    color: 'primary',
+    padding: 30
+  }, {
+    props: {
+      classes: classesProp
+    }
+  });

   return (
     <div className={classes.root}>
       <div className={classes.child}>
         The Background take the primary theme color when the mouse hovers the parent.
       </div>
-      <div className={clsx(classes.child, classes.small)}>
+      <div className={cx(classes.child, classes.small)}>
         The Background take the primary theme color when the mouse hovers the parent.
         I am smaller than the other child.
       </div>
     </div>
   );
 }

 export default App;
```

```bash
npx @mui/codemod@next v5.0.0/jss-to-tss-react <path>
```

The following scenarios are not currently handled by this codemod and will be marked with a
"TODO jss-to-tss-react codemod" comment:

- If the hook returned by `makeStyles` (for example `useStyles`) is exported and used in another file,
  the usages in other files will not be converted.
- Arrow functions as the value for a CSS prop will not be converted. Arrow functions **are**
  supported at the rule level, though with some caveats listed below.
- In order for arrow functions at the rule level to be converted, the parameter must use object
  destructuring (for example `root: ({color, padding}) => (...)`). If the parameter is not destructured
  (for example `root: (props) => (...)`), it will not be converted.
- If an arrow function at the rule level contains a code block (that is contains an explicit `return`
  statement) rather than just an object expression, it will not be converted.

You can find more details about migrating from JSS to tss-react in [the migration guide](https://mui.com/material-ui/migration/migrating-from-jss/#2-use-tss-react).

#### `link-underline-hover`

Apply `underline="hover"` to `<Link />` that does not define `underline` prop (to get the same behavior as in v4).

```diff
-<Link />
+<Link underline="hover" />
```

```bash
npx @mui/codemod@next v5.0.0/link-underline-hover <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#link).

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

```bash
npx @mui/codemod@next v5.0.0/material-ui-styles <path>
```

#### `material-ui-types`

Renames `Omit` import from `@material-ui/types` to `DistributiveOmit`

```diff
-import { Omit } from '@material-ui/types';
+import { DistributiveOmit } from '@material-ui/types';
```

```bash
npx @mui/codemod@next v5.0.0/material-ui-types <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#material-ui-types).

#### `modal-props`

Removes `disableBackdropClick` and `onEscapeKeyDown` from `<Modal>`

```diff
 <Modal
-  disableBackdropClick
-  onEscapeKeyDown={handleEscapeKeyDown}
 />
```

```bash
npx @mui/codemod@next v5.0.0/modal-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#modal).

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

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/moved-lab-modules <path>
```

You can find more details about this breaking change in the migration guide.

- [Alert](https://mui.com/material-ui/migration/v5-component-changes/#alert)
- [Autocomplete](https://mui.com/material-ui/migration/v5-component-changes/#autocomplete)
- [AvatarGroup](https://mui.com/material-ui/migration/v5-component-changes/#avatar)
- [Pagination](https://mui.com/material-ui/migration/v5-component-changes/#pagination)
- [Skeleton](https://mui.com/material-ui/migration/v5-component-changes/#skeleton)
- [SpeedDial](https://mui.com/material-ui/migration/v5-component-changes/#speeddial)
- [ToggleButton](https://mui.com/material-ui/migration/v5-component-changes/#togglebutton)

#### `pagination-round-circular`

Renames `Pagination*`'s `shape` values from 'round' to 'circular'.

```diff
-<Pagination shape="round" />
-<PaginationItem shape="round" />
+<Pagination shape="circular" />
+<PaginationItem shape="circular" />
```

```bash
npx @mui/codemod@next v5.0.0/pagination-round-circular <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#pagination).

#### `path-imports`

Converts all `@mui/material` & `@mui/icons-material` top-level imports to path imports (essentially the reverse of `top-level-imports`, with the addition of `@mui/icons-material`):

```diff
-import { List, Grid } from '@mui/material';
+import List from '@mui/material/List';
+import Grid from '@mui/material/Grid';

-import { Delete, People as PeopleIcon } from '@mui/icons-material';
+import Delete from '@mui/icons-material/Delete';
+import PeopleIcon from '@mui/icons-material/People';
```

```bash
npx @mui/codemod@next v5.0.0/path-imports <path>
```

Head to https://mui.com/material-ui/guides/minimizing-bundle-size/ to understand when it's useful.

#### `optimal-imports`

Fix private import paths.

```diff
-import red from '@material-ui/core/colors/red';
-import createTheme from '@material-ui/core/styles/createTheme';
+import { red } from '@material-ui/core/colors';
+import { createTheme } from '@material-ui/core/styles';
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/optimal-imports <path>
```

#### `root-ref`

Removes `RootRef` from the codebase.

```bash
npx @mui/codemod@next v5.0.0/root-ref <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#rootref).

#### `skeleton-variant`

```diff
-<Skeleton variant="circle" />
-<Skeleton variant="rect" />
+<Skeleton variant="circular" />
+<Skeleton variant="rectangular" />
```

```bash
npx @mui/codemod@next v5.0.0/skeleton-variant <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#skeleton).

#### `styled-engine-provider`

Applies `StyledEngineProvider` to the files that contains `ThemeProvider`.

```bash
npx @mui/codemod@next v5.0.0/styled-engine-provider <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-style-changes/#style-library).

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

```bash
npx @mui/codemod@next v5.0.0/table-props <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#table).

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

```bash
npx @mui/codemod@next v5.0.0/tabs-scroll-buttons <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#tabs).

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

```bash
npx @mui/codemod@next v5.0.0/textarea-minmax-rows <path>
```

You can find more details about this breaking change in the migration guide.

- [TextareaAutosize](https://mui.com/material-ui/migration/v5-component-changes/#textareaautoresize)
- [TextField](https://mui.com/material-ui/migration/v5-component-changes/#textfield)

#### `theme-augment`

Adds `DefaultTheme` module augmentation to TypeScript projects.

```bash
npx @mui/codemod@next v5.0.0/theme-augment <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#material-ui-styles).

#### `theme-breakpoints`

Updates breakpoint values to match new logic. ⚠️ This mod is not idempotent, it should be run only once.

```diff
-theme.breakpoints.down('sm')
-theme.breakpoints.between('sm', 'md')
+theme.breakpoints.down('md')
+theme.breakpoints.between('sm', 'lg')
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/theme-breakpoints <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-breakpoints-width`

Renames `theme.breakpoints.width('md')` to `theme.breakpoints.values.md`.

```bash
npx @mui/codemod@next v5.0.0/theme-breakpoints-width <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-options`

```diff
-import { ThemeOptions } from '@material-ui/core';
+import { DeprecatedThemeOptions } from '@material-ui/core';
```

```bash
npx @mui/codemod@next v5.0.0/theme-options <path>
```

#### `theme-palette-mode`

Renames `type` to `mode`.

```diff
 {
   palette: {
-    type: 'dark',
+    mode: 'dark',
   },
 }
```

```diff
-theme.palette.type === 'dark'
+theme.palette.mode === 'dark'
```

```bash
npx @mui/codemod@next v5.0.0/theme-palette-mode <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-provider`

Renames `MuiThemeProvider` to `ThemeProvider`.

```bash
npx @mui/codemod@next v5.0.0/theme-provider <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#material-ui-core-styles).

#### `theme-spacing`

Removes the 'px' suffix from some template strings.

```diff
-`${theme.spacing(2)}px`
-`${theme.spacing(2)}px ${theme.spacing(4)}px`
+`${theme.spacing(2)}`
+`${theme.spacing(2)} ${theme.spacing(4)}`
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/theme-spacing <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `theme-typography-round`

Renames `theme.typography.round($number)` to `Math.round($number * 1e5) / 1e5`.

```diff
-`${theme.typography.round($number)}`
+`${Math.round($number * 1e5) / 1e5}`
```

```bash
npx @mui/codemod@next v5.0.0/theme-typography-round <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#theme).

#### `top-level-imports`

Converts all `@mui/material` submodule imports to the root module:

```diff
-import List from '@mui/material/List';
-import Grid from '@mui/material/Grid';
+import { List, Grid } from '@mui/material';
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/top-level-imports <path>
```

Head to https://mui.com/material-ui/guides/minimizing-bundle-size/ to understand when it's useful.

#### `transitions`

Renames import `transitions` to `createTransitions`

```bash
npx @mui/codemod@next v5.0.0/transitions <path>
```

#### `use-autocomplete`

Renames `useAutocomplete` related import from lab to core

```diff
-import useAutocomplete from '@material-ui/lab/useAutocomplete';
+import useAutocomplete from '@material-ui/core/useAutocomplete';
```

```bash
npx @mui/codemod@next v5.0.0/use-autocomplete <path>
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

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/use-transitionprops <path>
```

You can find more details about this breaking change in [the migration guide](/material-ui/migration/v5-component-changes/#dialog).

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

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v5.0.0/variant-prop <path>
```

#### `with-mobile-dialog`

Removes imported `withMobileDialog`, and inserts hardcoded version to prevent application crash.

```diff
-import withMobileDialog from '@material-ui/core/withMobileDialog';
+// FIXME checkout https://mui.com/material-ui/migration/v5-component-changes/#dialog
+const withMobileDialog = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="lg" fullScreen={false} />;
```

```bash
npx @mui/codemod@next v5.0.0/with-mobile-dialog <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-component-changes/#dialog).

#### `with-width`

Removes `withWidth` import, and inserts hardcoded version to prevent application crash.

```diff
-import withWidth from '@material-ui/core/withWidth';
+// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
+const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;
```

```bash
npx @mui/codemod@next v5.0.0/with-width <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/v5-style-changes/#material-ui-core-styles).

#### `mui-replace`

Replace every occurrence of `material-ui` related package with the new package names (listed below) except these packages (`@material-ui/pickers`, `@material-ui/data-grid`, `@material-ui/x-grid` & `@material-ui/x-grid-data-generator`). [More details about why package names are changed](https://github.com/mui/material-ui/issues/27666)

**Material Design components**

```diff
-import Alert from '@material-ui/core/Alert';
+import Alert from '@mui/material/Alert';
```

**JSS styles package**

```diff
-import { makeStyles } from '@material-ui/styles';
+import { makeStyles } from '@mui/styles';
```

**System package**

```diff
-import { SxProps } from '@material-ui/system';
+import { SxProps } from '@mui/system';
```

**Utilities package**

```diff
-import { deepmerge } from '@material-ui/utils';
+import { deepmerge } from '@mui/utils';
```

**Lab**

```diff
-import Mansory from '@material-ui/lab/Mansory';
+import Mansory from '@mui/lab/Mansory';
```

**Dependencies**

```diff
  // package.json
-"@material-ui/core": "next",
-"@material-ui/icons": "next",
-"@material-ui/lab": "next",
-"@material-ui/unstyled": "next",
-"@material-ui/styled-engine-sc": "next",
+"@mui/material": "next",
+"@mui/icons-material": "next",
+"@mui/lab": "next",
+"@mui/base": "next",
+"@mui/styled-engine-sc": "next",
```

```bash
npx @mui/codemod@next v5.0.0/mui-replace <path>
```

You can find more details about this breaking change in [the migration guide](https://mui.com/material-ui/migration/migration-v4/#update-material-ui-version).

### v4.0.0

#### `theme-spacing-api`

Updates the `theme-spacing-api` from `theme.spacing.unit x` to `theme.spacing(x)`.
The diff should look like this:

```diff
-const spacing = theme.spacing.unit;
+const spacing = theme.spacing(1);
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v4.0.0/theme-spacing-api <path>
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

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v4.0.0/optimal-imports <path>
```

Head to https://mui.com/guides/minimizing-bundle-size/ to understand when it's useful.

#### `top-level-imports`

Converts all `@material-ui/core` submodule imports to the root module:

```diff
-import List from '@material-ui/core/List';
-import { withStyles } from '@material-ui/core/styles';
+import { List, withStyles } from '@material-ui/core';
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v4.0.0/top-level-imports <path>
```

Head to https://mui.com/guides/minimizing-bundle-size/ to understand when it's useful.

### v1.0.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
Material UI v1.0.0 flatten the import paths.
The diff should look like this:

```diff
-import { MenuItem } from '@material-ui/core/Menu';
+import MenuItem from '@material-ui/core/MenuItem';
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v1.0.0/import-path <path>
```

**Notice**: if you are migrating from pre-v1.0, and your imports use `material-ui`, you will need to manually find and replace all references to `material-ui` in your code to `@material-ui/core`. E.g.:

```diff
-import Typography from 'material-ui/Typography';
+import Typography from '@material-ui/core/Typography';
```

Subsequently, you can run the above `find ...` command to flatten your imports.

#### `color-imports`

Updates the `color-imports` for the new location of Material UI color palettes.
The diff should look like this:

```diff
-import { blue, teal500 } from 'material-ui/styles/colors';
+import blue from '@material-ui/core/colors/blue';
+import teal from '@material-ui/core/colors/teal';
+const teal500 = teal['500'];
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v1.0.0/color-imports <path>
```

**additional options**

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v1.0.0/color-imports <path> -- --importPath='mui/styles/colors' --targetPath='mui/colors'
```

#### `svg-icon-imports`

Updates the `svg-icons` import paths from `material-ui/svg-icons/<category>/<icon-name>` to `@material-ui/icons/<IconName>`, to use the new `@material-ui/icons` package.
The diff should look like this:

```diff
-import AccessAlarmIcon from 'material-ui/svg-icons/device/AccessAlarm';
-import ThreeDRotation from 'material-ui/svg-icons/action/ThreeDRotation';
+import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
+import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v1.0.0/svg-icon-imports <path>
```

#### `menu-item-primary-text`

Updates `MenuItem` with `primaryText` property making its value tag's child.
The diff should look like this:

```diff
-<MenuItem primaryText="Profile" />
-<MenuItem primaryText={"Profile" + "!"} />
+<MenuItem>Profile</MenuItem>
+<MenuItem>{"Profile" + "!"}</MenuItem>
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v1.0.0/menu-item-primary-text <path>
```

### v0.15.0

#### `import-path`

Updates the `import-paths` for the new location of the components.
Material UI v0.15.0 is reorganizing the folder distribution of the project.
The diff should look like this:

```diff
 // From the source
-import FlatButton from 'material-ui/src/flat-button';
+import FlatButton from 'material-ui/src/FlatButton';

 // From npm
-import RaisedButton from 'material-ui/lib/raised-button';
+import RaisedButton from 'material-ui/RaisedButton';
```

<!-- #npm-tag-reference -->

```bash
npx @mui/codemod@next v0.15.0/import-path <path>
```
