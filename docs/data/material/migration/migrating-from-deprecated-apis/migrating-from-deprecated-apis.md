# Migrating from deprecated APIs

<p class="description">Learn how to migrate away from recently deprecated APIs before they become breaking changes.</p>

## Why you should migrate

Features become deprecated over time as maintainers make improvements to the APIs.
Migrating to these improved APIs results in a better developer experience, so it's in your best interest to stay up to date.
Deprecated APIs often become breaking changes in subsequent major versions, so the sooner you migrate, the smoother the next major update will be.

## Migrating

Material UI provides the `deprecations/all` codemod to help you stay up to date with minimal effort.

```bash
npx @mui/codemod@latest deprecations/all <path>
```

This command runs all the current [deprecations codemods](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#deprecations), automatically migrating to the updated API.
You can run this codemod as often as necessary to keep up with the latest changes.

:::info

If you need to manually migrate from a deprecated API, you can find examples below for all deprecations that have been added in Material UI v5.
If you need to run a specific codemod, those are also linked below.

:::

## Package-wide deprecated APIs

### Inner element overrides

The `slots` and `slotProps` APIs are in the process of being standardized.
The analogous APIs—`components`, `componentsProps`, `<SlotName>Component`, and `<SlotName>Props`—are going to be deprecated and eventually removed.
This improves the developer experience through consistency, predictability, and reduced cognitive load.

### Composed CSS classes

The composed CSS classes are going to be deprecated and eventually removed in favor of atomic class alternatives.
For example, the `.MuiAccordionSummary-contentGutters` class was deprecated in favor of the `.MuiAccordionSummary-gutters` and `.MuiAccordionSummary-content` classes.
This improves the developer experience by reducing bloat and cognitive load.

### System props

MUI System props (such as `mt={*}`, `bgcolor={*}`, and more) have been deprecated in the Box, Typography, Link, Grid, and Stack components.
Use the codemod below to move all System props to the `sx` prop:

```bash
npx @mui/codemod@latest v6.0.0/system-props <path/to/folder>
```

You can also manually update your components as shown in the snippet below:

```diff
-<Button mr={2}>
+<Button sx={{ mr: 2 }}>
```

The `sx` prop supports all features of system props: callbacks with access to the theme, responsive values, direct access to theme values, shorthands, etc.

### Theme component variants

Custom component variants defined in the theme are now merged with the theme style overrides, defined within the `root` slot of the component.

Use this codemod to update your project's theme file:

```bash
npx @mui/codemod@latest v6.0.0/theme-v6 <path/to/theme>
```

You can also manually update your theme as shown in the snippet below:

```diff
 createTheme({
   components: {
     MuiButton: {
-      variants: [ ... ],
+      styleOverrides: {
+        root: {
+          variants: [ ... ],
+        },
+      },
     },
   },
 });
```

This reduces the API surface and lets you define variants in other slots of the component.

## Accordion

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/accordion-props <path>
```

### TransitionComponent

The Accordion's `TransitionComponent` prop was deprecated in favor of `slots.transition`:

```diff
 <Accordion
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
 />
```

### TransitionProps

The Accordion's `TransitionProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <Accordion
-  TransitionProps={{ unmountOnExit: true }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

## AccordionSummary

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#accordion-summary-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/accordion-summary-classes <path>
```

### .MuiAccordionSummary-contentGutters

The AccordionSummary's `.MuiAccordionSummary-contentGutters` class was deprecated in favor of the `.MuiAccordionSummary-gutters` and `.MuiAccordionSummary-content` classes.
Bear in mind that the `.MuiAccordionSummary-gutters` class is applied to the component's root, whereas the `.MuiAccordionSummary-contentGutters` and `.MuiAccordionSummary-content` classes are applied to the content element.

```diff
-.MuiAccordionSummary-root .MuiAccordionSummary-contentGutters
+.MuiAccordionSummary-root.MuiAccordionSummary-gutters .MuiAccordionSummary-content
```

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

## Alert

Use the [alert-props](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-props) and [alert-classes](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#alert-classes) codemods below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/alert-props <path>
npx @mui/codemod@latest deprecations/alert-classes <path>
```

### components

The Alert's `components` prop was deprecated in favor of `slots`:

```diff
 <Alert
-  components={{ CloseButton: CustomButton }}
+  slots={{ closeButton: CustomButton }}
 />
```

### componentsProps

The Alert's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Alert
-  componentsProps={{ closeButton: { id: 'close-id' } }}
+  slotProps={{ closeButton: { id: 'close-id' } }}
 />
```

### Composed CSS classes

The CSS classes that composed the `severity` (or `variant`) and `color` prop values were removed.

Here's how to migrate:

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

```diff
 import { alertClasses } from '@mui/material/Alert';

 MuiAlert: {
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

## Autocomplete

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#autocomplete-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/autocomplete-props <path>
```

### \*Component props

All of the Autocomplete's slot (`*Component`) props were deprecated in favor of equivalent `slots` and `slotProps` entries:

```diff
 <Autocomplete
-  PaperComponent={CustomPaperComponent}
-  PopperComponent={CustomPopperComponent}
-  ListboxComponent={CustomListboxComponent}
+  slots={{
+    paper: CustomPaperComponent,
+    popper: CustomPopperComponent,
+  }}
+  slotProps={{
+    listbox: {
+      component: CustomListboxComponent,
+    },
+  }}
 />
```

:::warning
The listbox slot is a special case because `ListboxComponent` was implemented differently from the other `*Component` props, behaving similar to the `component` and `as` props.
The `slots.listbox` entry exists and you can use it to replace the component entirely, but if you want to keep `ListboxComponent`'s behavior which maintains the original listbox styles, you should use the `slotProps.listbox.component` entry.
:::

### \*Props props

All of the Autocomplete's slot props (`*Props`) props were deprecated in favor of equivalent `slotProps` entries:

```diff
 <Autocomplete
-  ChipProps={CustomChipProps}
-  ListboxProps={CustomListboxProps}
+  slotProps={{
+    chip: CustomChipProps,
+    listbox: CustomListboxProps,
+  }}
 />
```

### componentsProps

The Autocomplete's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Autocomplete
-  componentsProps={{
-    clearIndicator: { width: 10 },
-    paper: { width: 12 },
-    popper: { width: 14 },
-    popupIndicator: { width: 16 },
+  slotProps={{
+    clearIndicator: { width: 10 },
+    paper: { width: 12 },
+    popper: { width: 14 },
+    popupIndicator: { width: 16 },
   }}
 />
```

## Avatar

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#avatar-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/avatar-props <path>
```

### imgProps

The Avatar's `imgProps` prop was deprecated in favor of `slotProps.img`:

```diff
 <Avatar
-  imgProps={{
-    onError: () => {},
-    onLoad: () => {},
+  slotProps={{
+    img: {
+      onError: () => {},
+      onLoad: () => {},
+    }
   }}
 />;
```

## AvatarGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#avatar-group-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/avatar-group-props <path>
```

### slotProps.additionalAvatar

The AvatarGroup's `slotProps.additionalAvatar` was deprecated in favor of `slotProps.surplus`:

```diff
 <AvatarGroup
   slotProps={{
-    additionalAvatar: { color: 'red' },
+    surplus: { color: 'red' },
   }}
 >
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

### componentsProps

The AvatarGroup's `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <AvatarGroup
-  componentsProps={{
-    additionalAvatar: { color: 'red' },
+  slotProps={{
+    surplus: { color: 'red' },
   }}
 >
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

## Backdrop

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#backdrop-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/backdrop-props <path>
```

### components

The Backdrop's `components` prop was deprecated in favor of `slots`:

```diff
 <Backdrop
-  components={{ root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 />
```

### componentsProps

The Backdrop's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Backdrop
-  componentsProps={{ root: { id: 'root-id' } }}
+  slotProps={{ root: { id: 'root-id' } }}
 />
```

### TransitionComponent

The Backdrop's `TransitionComponent` prop was deprecated in favor of `slots.transition`:

```diff
 <Backdrop
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
```

## Badge

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#badge-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/badge-props <path>
```

### components

The Badge's `components` prop was deprecated in favor of `slots`:

```diff
 <Badge
-  components={{ root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 >
```

### componentsProps

The Badge's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Badge
-  componentsProps={{ root: { id: 'root-id' } }}
+  slotProps={{ root: { id: 'root-id' } }}
 >
```

## Button

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#button-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/button-classes <path>
```

### Composed CSS classes

The CSS classes composing the `variant` and `color` prop values, as well as those composing the `variant` and `size` prop values, along with the `icon` size CSS classes, have been removed.

Here's how to migrate:

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

## ButtonGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#button-group-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/button-group-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `orientation` | `variant` and `grouped`
- `color`, `variant` and `grouped`

Here's how to migrate:

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

## CardHeader

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#card-header-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/card-header-props <path>
```

### titleTypographyProps

The CardHeader's `titleTypographyProps` props were deprecated in favor of `slotProps.title`:

```diff
 <CardHeader
-  titleTypographyProps={titleTypographyProps}
+  slotProps={{ title: titleTypographyProps }}
 />
```

### subheaderTypographyProps

The CardHeader's `subheaderTypographyProps` props were deprecated in favor of `slotProps.subheader`:

```diff
 <CardHeader
-  subheaderTypographyProps={subheaderTypographyProps}
+  slotProps={{ subheader: subheaderTypographyProps }}
 />
```

## Chip

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#chip-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/chip-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `variant` | `clickable` | `deletable` and `color`
- `avatar` and `color` | `size`
- `icon` and `color` | `size`
- `deleteIcon` and `color` | `size`
- `label` and `size`

Here's how to migrate:

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

## CircularProgress

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#circular-progress-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/circular-progress-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `circle` CSS class and `variant` prop values were removed.

Here's how to migrate:

```diff
-.MuiCircularProgress-circleDeterminate
-.MuiCircularProgress-circleIndeterminate
+.MuiCircularProgress-determinate > .MuiCircularProgress-circle
+.MuiCircularProgress-indeterminate > .MuiCircularProgress-circle
```

```diff
 import { circularProgressClasses } from '@mui/material/CircularProgress';

 MuiCircularProgress: {
   styleOverrides: {
     root: {
-      [`& .${circularProgressClasses.circleDeterminate}`]: {
+      [`&.${circularProgressClasses.determinate} > .${circularProgressClasses.circle}`]: {
         color: 'red',
       },
-      [`& .${circularProgressClasses.circleIndeterminate}`]: {
+      [`&.${circularProgressClasses.indeterminate} > .${circularProgressClasses.circle}`]: {
         color: 'red',
       },
     },
   },
 },
```

## Divider

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#divider-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/divider-props <path>
```

### light

The Divider's `light` prop was deprecated, Use `sx={{ opacity : "0.6" }}` (or any opacity):

```diff
 <Divider
-  light
+  sx={{ opacity : "0.6" }}
 />
```

## Dialog

Use the [dialog-classes-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#dialog-classes) and [dialog-props-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#dialog-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/dialog-classes <path>
npx @mui/codemod@latest deprecations/dialog-props <path>
```

### Composed CSS classes

The CSS classes composing the `scroll` prop values have been removed.

Here's how to migrate:

```diff
-.MuiDialog-root .MuiDialog-paperScrollBody
+.MuiDialog-root .MuiDialog-scrollBody > .MuiDialog-paper
-.MuiDialog-root .MuiDialog-paperScrollPaper
+.MuiDialog-root .MuiDialog-scrollPaper > .MuiDialog-paper
```

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

### TransitionComponent

The Dialog's `TransitionComponent` prop was deprecated in favor of `slots.transition`:

```diff
 <Dialog
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
```

### TransitionProps

The Dialog's `TransitionProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <Dialog
-  TransitionProps={{ unmountOnExit: true }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

### PaperProps

The Dialog's `PaperProps` prop was deprecated in favor of `slotProps.paper`:

```diff
 <Dialog
-  PaperProps={paperProps}
+  slotProps={{ paper: paperProps }}
 />
```

## Drawer

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#drawer-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/drawer-props <path>
```

### BackdropProps

The Drawer's `BackdropProps` prop was deprecated in favor of `slotProps.backdrop`:

```diff
 <Drawer
-  BackdropProps={backdropProps}
+  slotProps={{ backdrop: backdropProps }}
 />
```

### PaperProps

The Drawer's `PaperProps` prop was deprecated in favor of `slotProps.paper`:

```diff
 <Drawer
-  PaperProps={paperProps}
+  slotProps={{ paper: paperProps }}
 />
```

### SlideProps

The Drawer's `SlideProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <Drawer
-  SlideProps={slideProps}
+  slotProps={{ transition: slideProps }}
 />
```

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#drawer-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/drawer-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `paper` and `anchor`
- `paper`, `anchor` and `docked`

Here's how to migrate:

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

## FilledInput

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#filled-input-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/filled-input-props <path>
```

### components

The FilledInput's prop `components` was deprecated in favor of `slots`:

```diff
 <FilledInput
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The FilledInput's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <FilledInput
-  componentsProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
+  slotProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
 />
```

## FormControlLabel

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#form-control-label-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/form-control-label-props <path>
```

### componentsProps

The FormControlLabel's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <FormControlLabel
-  componentsProps={{ typography: typographyProps }}
+  slotProps={{ typography: typographyProps }}
 />
```

## Input

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#input-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/input-props <path>
```

### components

The Input's prop `components` was deprecated in favor of `slots`:

```diff
 <Input
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The Input's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Input
-  componentsProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
+  slotProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
 />
```

## InputBase

Use the [input-base-props-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#input-base-props) and [input-base-classes-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#input-base-classes) codemods below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/input-base-props <path>
npx @mui/codemod@latest deprecations/input-base-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `input` class with other props `size`, `type`, `multiline`, `adornedStart`, `adornedEnd`, and `hiddenLabel` have been removed.

Here's how to migrate:

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

### components

The InputBase's prop `components` was deprecated in favor of `slots`:

```diff
 <InputBase
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The InputBase's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Input
-  componentsProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
+  slotProps={{ input: { id: 'test-input-id' }, root: { id: 'test-root-id' } }}
 />
```

## ListItem

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#list-item-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/list-item-props <path>
```

### components

The ListItem's `components` prop was deprecated in favor of `slots`:

```diff
 <ListItem
-  components={{ Root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 />
```

### componentsProps

The ListItem's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <ListItem
-  componentsProps={{ root: { id: 'root-id' } }}
+  slotProps={{ root: { id: 'root-id' } }}
 />
```

### ContainerComponent

The ListItem's `ContainerComponent` prop was deprecated in favor of `slots.root` or `component` instead.

```diff
 <ListItem
-  ContainerComponent={CustomContainer}
+  slots={{ root: CustomContainer }}
 />
```

### ContainerProps

The ListItem's `ContainerProps` prop was deprecated in favor of `slotProps.root` instead.

```diff
 <ListItem
-  ContainerProps={{ id: 'container-id' }}
+  slotProps={{ root: { id: 'container-id' } }}
 />
```

## ListItemSecondaryAction

### Deprecated component

The ListItemSecondaryAction component was deprecated in favor of the `secondaryAction` prop in the ListItem component.

```diff
 <ListItem
+  secondaryAction={
+    <IconButton aria-label="Leave a comment">
+      <CommentIcon />
+    </IconButton>
+  }
   disablePadding
 >
   <ListItemButton>
     <ListItemText primary="John Doe" />
   </ListItemButton>
-  <ListItemSecondaryAction>
-    <IconButton aria-label="Leave a comment">
-      <CommentIcon />
-    </IconButton>
-  </ListItemSecondaryAction>
 </ListItem>
```

## ListItemText

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#list-item-text-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/list-item-text-props <path>
```

### primaryTypographyProps

The ListItemText's `primaryTypographyProps` props were deprecated in favor of `slotProps.primary`:

```diff
 <ListItemText
-  primaryTypographyProps={primaryTypographyProps}
+  slotProps={{ primary: primaryTypographyProps }}
 />
```

### secondaryTypographyProps

The ListItemText's `secondaryTypographyProps` props were deprecated in favor of `slotProps.secondary`:

```diff
 <ListItemText
-  secondaryTypographyProps={secondaryTypographyProps}
+  slotProps={{ secondary: secondaryTypographyProps }}
 />
```

## ImageListItemBar

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#image-list-item-bar-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/image-list-item-bar-classes <path>
```

### Composed CSS classes

The CSS classes that composed the following props were deprecated:

- `position` prop and `titleWrap` class
- `actionPosition` prop and `titleWrap` class
- `actionPosition` prop and `actionIcon` class

Here's how to migrate:

```diff
-.MuiImageListItemBar-titleWrapBelow
+.MuiImageListItemBar-positionBelow > .MuiImageListItemBar-titleWrap
-.MuiImageListItemBar-titleWrapActionPosLeft
+.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-titleWrap
-.MuiImageListItemBar-titleWrapActionPosRight
+.MuiImageListItemBar-actionPositionRight > .MuiImageListItemBar-titleWrap
-.MuiImageListItemBar-actionIconActionPosLeft
+.MuiImageListItemBar-actionPositionLeft > .MuiImageListItemBar-actionIcon
```

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

## LinearProgress

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#linear-progress-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/linear-progress-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `variant` and `color` prop values were deprecated.

Here's how to migrate:

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

## Menu

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#menu-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/menu-props <path>
```

### MenuListProps

The Menu's `MenuListProps` prop was deprecated in favor of `slotProps.list`:

```diff
 <Menu
-  MenuListProps={menuListProps}
+  slotProps={{ list: menuListProps }}
 >
```

### TransitionProps

The Menu's `TransitionProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <Menu
-  TransitionProps={transitionProps}
+  slotProps={{ transition: transitionProps }}
 >
```

## MobileStepper

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#mobile-stepper-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/mobile-stepper-props <path>
```

### LinearProgressProps

The MobileStepper's `LinearProgressProps` prop was deprecated in favor of `slotProps.progress`:

```diff
 <MobileStepper
-  LinearProgressProps={{ color: 'primary' }}
+  slotProps={{ progress: { color: 'primary' } }}
 />
```

## Modal

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#modal-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/modal-props <path>
```

### components

The Modal's `components` prop was deprecated in favor of `slots`:

```diff
 <Modal
-  components={{ Root: CustomRoot, Backdrop: CustomBackdrop }}
+  slots={{ root: CustomRoot, backdrop: CustomBackdrop }}
 >
```

### componentsProps

The Modal's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Modal
-  componentsProps={{ root: { id: 'root-id' }, backdrop: { id: 'backdrop-id' } }}
+  slotProps={{ root: { id: 'root-id' }, backdrop: { id: 'backdrop-id' } }}
 >
```

### BackdropProps

The Modal's `BackdropProps` prop was deprecated in favor of `slotProps.backdrop`:

```diff
 <Modal
-  BackdropProps={{ timeout: 500 }}
+  slotProps={{ backdrop: { timeout: 500 } }}
 >
```

### BackdropComponent

The Modal's `BackdropComponent` prop was deprecated in favor of `slots.backdrop`:

```diff
 <Modal
-  BackdropComponent={Backdrop}
+  slots={{ backdrop: Backdrop }}
 >
```

## OutlinedInput

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#outlined-input-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/outlined-input-props <path>
```

### components

The OutlinedInput's prop `components` was deprecated in favor of `slots`:

```diff
 <OutlinedInput
-  components={{ Input: CustomInput, Root: CustomRoot }}
+  slots={{ input: CustomInput, root: CustomRoot }}
 />
```

### componentsProps

The OutlinedInput's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <OutlinedInput
-  componentsProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
+  slotProps={{ input: { id: 'test-input-id', root: { id: 'test-root-id' } } }}
 />
```

## PaginationItem

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#pagination-item-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/pagination-item-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `variant` and `color` prop values were removed.

Here's how to migrate:

```diff
-.MuiPaginationItem-textPrimary
+.MuiPaginationItem-text.MuiPaginationItem-colorPrimary
-.MuiPaginationItem-outlinedPrimary
+.MuiPaginationItem-outlined.MuiPaginationItem-colorPrimary
-.MuiPaginationItem-textSecondary
+.MuiPaginationItem-text.MuiPaginationItem-colorSecondary
-.MuiPaginationItem-outlinedSecondary
+.MuiPaginationItem-outlined.MuiPaginationItem-colorSecondary
```

```diff
 import { paginationItemClasses } from '@mui/material/PaginationItem';

 MuiPaginationItem: {
   styleOverrides: {
     root: {
-      [`&.${paginationItemClasses.textPrimary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.outlinedPrimary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorPrimary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.textSecondary}`]: {
+      [`&.${paginationItemClasses.text}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
       },
-      [`&.${paginationItemClasses.outlinedSecondary}`]: {
+      [`&.${paginationItemClasses.outlined}.${paginationItemClasses.colorSecondary}`]: {
         color: 'red',
       },
     },
   },
 },
```

### components

The PaginationItems's `components` prop was deprecated in favor of `slots`:

```diff
 <PaginationItems
-  components={{ first: FirstIcon, last: LastIcon, previous: PreviousIcons, next: NextIcon }}
+  slots={{ first: FirstIcon, last: LastIcon, previous: PreviousIcons, next: NextIcon }}
 />
```

## Popover

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#popover-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/popover-props <path>
```

### BackdropComponent

The Popover's `BackdropComponent` prop was deprecated in favor of `slots.backdrop`:

```diff
 <Popover
-  BackdropComponent={Backdrop}
+  slots={{ backdrop: Backdrop }}
 >
```

### BackdropProps

The Popover's `BackdropProps` prop was deprecated in favor of `slotProps.backdrop`:

```diff
 <Popover
-  BackdropProps={{ timeout: 500 }}
+  slotProps={{ backdrop: { timeout: 500 } }}
 >
```

### PaperProps

The Popover's `PaperProps` prop was deprecated in favor of `slotProps.paper`:

```diff
 <Popover
-  PaperProps={{ id: 'paper-id' }}
+  slotProps={{ paper: { id: 'paper-id' } }}
 >
```

### TransitionComponent

The Popover's `TransitionComponent` prop was deprecated in favor of `slots.transition`:

```diff
 <Popover
-  TransitionComponent={Transition}
+  slots={{ transition: Transition }}
 >
```

### TransitionProps

The Popover's `TransitionProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <Popover
-  TransitionProps={{ timeout: 500 }}
+  slotProps={{ transition: { timeout: 500 } }}
 >
```

## Popper

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#popper-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/popper-props <path>
```

### components

The Popper's prop `components` was deprecated in favor of `slots`:

```diff
 <Popper
-  components={{ Root: CustomRoot }}
+  slots={{ root: CustomRoot }}
 />
```

### componentsProps

The Popper's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Popper
-  componentsProps={{ root: { id: 'root-id' } }}
+  slotProps={{ root: { id: 'root-id' } }}
 />
```

## Rating

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#rating-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/rating-props <path>
```

### IconContainerComponent

The Rating's `IconContainerComponent` prop was deprecated in favor of `slotProps.icon.component`:

```diff
 <Rating
-  IconContainerComponent={CustomIconContainer}
+  slotProps={{ icon: { component: CustomIconContainer }}}
 />
```

## Select

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#select-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/select-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `icon` class and `variant` prop were removed.

Here's how to migrate:

```diff
- .MuiSelect-iconFilled
+ .MuiSelect-filled ~ .MuiSelect-icon
- .MuiSelect-iconOutlined
+ .MuiSelect-outlined ~ .MuiSelect-icon
- .MuiSelect-iconStandard
+ .MuiSelect-standard ~ .MuiSelect-icon
```

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

## Slider

Use the [slider-props-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#slider-props) and [slider-classes-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#slider-classes) codemods below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/slider-props <path>
npx @mui/codemod@latest deprecations/slider-classes <path>
```

### Composed CSS classes

The CSS classes composing the `color` prop values, as well as those composing the `size` prop values, have been removed.

Here's how to migrate:

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
+      [`& .${sliderClasses.colorInfo} > .${sliderClasses.thumb}`]: {
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

### components

The Slider's `components` prop was deprecated in favor of `slots`:

```diff
 <Slider
-  components={{ Track: CustomTrack }}
+  slots={{ track: CustomTrack }}
 />
```

### componentsProps

The Slider's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <Slider
-  componentsProps={{ track: { id: 'track-id' } }}
+  slotProps={{ track: { id: 'track-id' } }}
 />
```

## SwipeableDrawer

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#drawer-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/drawer-props <path>
```

### BackdropProps

The SwipeableDrawer's `BackdropProps` prop was deprecated in favor of `slotProps.backdrop`:

```diff
 <SwipeableDrawer
-  BackdropProps={backdropProps}
+  slotProps={{ backdrop: backdropProps }}
 />
```

### PaperProps

The SwipeableDrawer's `PaperProps` prop was deprecated in favor of `slotProps.paper`:

```diff
 <SwipeableDrawer
-  PaperProps={paperProps}
+  slotProps={{ paper: paperProps }}
 />
```

### SlideProps

The SwipeableDrawer's `SlideProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <SwipeableDrawer
-  SlideProps={slideProps}
+  slotProps={{ transition: slideProps }}
 />
```

## ToggleButtonGroup

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#toggle-button-group-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/toggle-button-group-classes <path>
```

### Composed CSS classes

The CSS classes composing the `orientation` prop value and `grouped` CSS class have been removed.

Here's how to migrate:

```diff
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedHorizontal
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-horizontal > .MuiToggleButtonGroup-grouped
-.MuiToggleButtonGroup-root .MuiToggleButtonGroup-groupedVertical
+.MuiToggleButtonGroup-root.MuiToggleButtonGroup-vertical > .MuiToggleButtonGroup-grouped
```

```diff
 import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';

 MuiButtonGroup: {
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

## Tabs

Use the [tab-props-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tabs-props), [tab-classes-codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tabs-classes) codemods below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/tabs-classes <path>
npx @mui/codemod@latest deprecations/tabs-props <path>
```

### flexContainer and flexContainerVertical classes

The class `flexContainer` has been deprecated in favor of `list`. The CSS classes composing the `vertical` prop value and `flexContainer` CSS class have been removed.

Here's how to migrate:

```diff
-.MuiTabs-flexContainer
+.MuiTabs-list
-.MuiTabs-flexContainerVertical
+.MuiTabs-list.MuiTabs-vertical
```

```diff
 import { tabsClasses } from '@mui/material/Tabs';

 MuiButtonGroup: {
   styleOverrides: {
     root: {
-      [`& .${tabsClasses.flexContainer}`]: {
+      [`& .${tabsClasses.list}`]: {
          color: 'red',
        },
-      [`& .${tabsClasses.flexContainerVertical}`]: {
+      [`& .${tabsClasses.list}.${tabsClasses.vertical}`]: {
          color: 'red',
       },
     },
   },
 },
```

### ScrollButtonComponent

The Tabs's `ScrollButtonComponent` prop was deprecated in favor of `slots.scrollButtons`:

```diff
 <Tabs
-  ScrollButtonComponent={ScrollButtonComponent}
+  slots={{ scrollButtons: ScrollButtonComponent }}
 />
```

### TabScrollButtonProps

The Tabs's `TabScrollButtonProps` prop was deprecated in favor of `slotProps.scrollButtons`:

```diff
 <Tabs
-  TabScrollButtonProps={TabScrollButtonProps}
+  slotProps={{ scrollButtons: TabScrollButtonProps }}
 />
```

### TabIndicatorProps

The Tabs's `TabIndicatorProps` prop was deprecated in favor of `slotProps.indicator`:

```diff
 <Tabs
-  TabIndicatorProps={TabIndicatorProps}
+  slotProps={{ indicator: TabIndicatorProps }}
 />
```

### slots.StartScrollButtonIcon

The Tabs's `slots.StartScrollButtonIcon` prop was deprecated in favor of `slots.startScrollButtonIcon` (camelCase):

```diff
 <Tabs
-  slots={{ StartScrollButtonIcon: StartScrollButtonIcon }}
+  slots={{ startScrollButtonIcon: StartScrollButtonIcon }}
 />
```

### slots.EndScrollButtonIcon

The Tabs's `slots.EndScrollButtonIcon` prop was deprecated in favor of `slots.endScrollButtonIcon` (camelCase):

```diff
 <Tabs
-  slots={{ EndScrollButtonIcon: EndScrollButtonIcon }}
+  slots={{ endScrollButtonIcon: EndScrollButtonIcon }}
 />
```

## Tab

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tab-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/tab-classes <path>
```

### Composed CSS classes

The `iconWrapper` class is removed.

Here's how to migrate:

```diff
- .MuiTab-iconWrapper
+ .MuiTab-icon
```

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

## TableSortLabel

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#table-sort-label-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/table-sort-label-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `direction` prop and `icon` prop were removed.

Here's how to migrate:

```diff
-.MuiTableSortLabel-iconDirectionDesc
+.MuiTableSortLabel-directionDesc > .MuiTableSortLabel-icon
-.MuiTableSortLabel-iconDirectionAsc
+.MuiTableSortLabel-directionAsc > .MuiTableSortLabel-icon
```

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

## TextField

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#text-field-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/text-field-props <path>
```

### \*Props props

All of the TextField's slot props (`*Props`) props were deprecated in favor of equivalent `slotProps` entries:

```diff
 <TextField
-  InputProps={CustomInputProps}
-  inputProps={CustomHtmlInputProps}
-  SelectProps={CustomSelectProps}
-  InputLabelProps={CustomInputLabelProps}
-  FormHelperTextProps={CustomFormHelperTextProps}
+  slotProps={{
+    input: CustomInputProps
+    htmlInput: CustomHtmlInputProps
+    select: CustomSelectProps
+    inputLabel: CustomInputLabelProps
+    formHelperText: CustomFormHelperTextProps
+  }}
 />
```

## Tooltip

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#tooltip-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/tooltip-props <path>
```

### components

The Tooltip's prop `components` was deprecated in favor of `slots`:

```diff
 <Tooltip
-  components={{ Arrow: CustomArrow }}
+  slots={{ arrow: CustomArrow }}
 />
```

### componentsProps

The Tooltip's prop `componentsProps` was deprecated in favor of `slotProps`:

```diff
 <Tooltip
-  componentsProps={{ arrow: { id: 'arrow-id' } }}
+  slotProps={{ arrow: { id: 'arrow-id' } }}
 />
```

### \*Component props

All of the Tooltip's slot (`*Component`) props were deprecated in favor of equivalent `slots` entries:

```diff
 <Tooltip
-  PopperComponent={CustomPopperComponent}
-  TransitionComponent={CustomTransitionComponent}
+  slots={{
+    popper: CustomPopperComponent,
+    transition: CustomTransitionComponent,
+  }}
 />
```

### \*Props props

All of the Tooltip's slot props (`*Props`) props were deprecated in favor of equivalent `slotProps` entries:

```diff
 <Tooltip
-  PopperProps={CustomPopperProps}
-  TransitionProps={CustomTransitionProps}
+  slotProps={{
+    popper: CustomPopperProps,
+    transition: CustomTransitionProps,
+  }}
 />
```

## Typography

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#typography-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/typography-props <path>
```

### paragraph

The Typography's `paragraph` prop was deprecated. If you want to render `p` when using Typography, pass `component="p"`.

```diff
 <Typography
   variant="subtitle1"
-  paragraph
+  component="p"
 />
```

Note that Typography already renders a `p` by default, so there's no need to pass `component="p"` when not explicitly passing a variant.
This is because `body1` is the default variant in Typography, and `body1` and `body2` variants render `p`, so there's no need to pass `component="p"` when using one of these variants.

The `16px` of margin-bottom that was automatically added to the element when using `paragraph` must be manually handled now.
The codemod that removes the `paragraph` prop adds `sx={{ marginBottom: '16px' }}` to the Typography component.

## StepLabel

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#step-label-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/step-label-props <path>
```

### componentsProps

The StepLabel's `componentsProps` prop was deprecated in favor of `slotProps`:

```diff
 <StepLabel
-  componentsProps={{ label: labelProps }}
+  slotProps={{ label: labelProps }}
 />
```

### StepIconComponent

The StepLabel's `StepIconComponent` prop was deprecated in favor of `slots.stepIcon`:

```diff
 <StepLabel
-  StepIconComponent={StepIconComponent}
+  slots={{ stepIcon: StepIconComponent }}
 />
```

### StepIconProps

The StepLabel's `StepIconProps` prop was deprecated in favor of `slotProps.stepIcon`:

```diff
 <StepLabel
-  StepIconProps={StepIconProps}
+  slotProps={{ stepIcon: StepIconProps }}
 />
```

## StepConnector

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#step-connector-classes) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/step-connector-classes <path>
```

### Composed CSS classes

The CSS classes that composed the `line` CSS class and `orientation` prop values were removed.

Here's how to migrate:

```diff
-.MuiStepConnector-lineHorizontal
+.MuiStepConnector-horizontal > .MuiStepConnector-line
-.MuiStepConnector-lineVertical
+.MuiStepConnector-vertical > .MuiStepConnector-line
```

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

## StepContent

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#step-content-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/step-content-props <path>
```

### TransitionComponent

The StepContent's `TransitionComponent` prop was deprecated in favor of `slots.transition`:

```diff
 <StepContent
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
 />
```

### TransitionProps

The StepContent's `TransitionProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <StepContent
-  TransitionProps={{ unmountOnExit: true }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

## SpeedDial

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#speed-dial-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/speed-dial-props <path>
```

### TransitionComponent

The SpeedDial's `TransitionComponent` prop was deprecated in favor of `slots.transition`:

```diff
 <SpeedDial
-  TransitionComponent={CustomTransition}
+  slots={{ transition: CustomTransition }}
```

### TransitionProps

The SpeedDial's `TransitionProps` prop was deprecated in favor of `slotProps.transition`:

```diff
 <SpeedDial
-  TransitionProps={{ unmountOnExit: true }}
+  slotProps={{ transition: { unmountOnExit: true } }}
 />
```

## SpeedDialAction

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#speed-dial-action-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/speed-dial-action-props <path>
```

### FabProps

The SpeedDialAction's `FabProps` prop was deprecated in favor of `slotProps.fab`:

```diff
 <SpeedDialAction
-  FabProps={CustomFabProps}
+  slotProps={{ fab: CustomFabProps }}
```

### TooltipClasses

The SpeedDialAction's `TooltipClasses` prop was deprecated in favor of `slotProps.tooltip.classes`:

```diff
 <SpeedDialAction
-  TooltipClasses={{ tooltip: 'foo' }}
+  slotProps={{ tooltip: { classes: { tooltip: 'foo' } } }}
 />
```

### tooltipPlacement

The SpeedDialAction's `tooltipPlacement` prop was deprecated in favor of `slotProps.tooltip.placement`:

```diff
 <SpeedDialAction
-  tooltipPlacement="top"
+  slotProps={{ tooltip: { placement: 'top' } }}
 />
```

### tooltipTitle

The SpeedDialAction's `tooltipTitle` prop was deprecated in favor of `slotProps.tooltip.title`:

```diff
 <SpeedDialAction
-  tooltipTitle="foo"
+  slotProps={{ tooltip: { title: 'foo' } }}
 />
```

### tooltipOpen

The SpeedDialAction's `tooltipOpen` prop was deprecated in favor of `slotProps.tooltip.open`:

```diff
 <SpeedDialAction
-  tooltipOpen
+  slotProps={{ tooltip: { open: true } }}
 />
```
