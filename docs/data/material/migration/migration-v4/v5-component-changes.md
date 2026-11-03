# Breaking changes in v5, part two: core components

<p class="description">This is a reference guide to the breaking changes introduced in Material UI v5, and how to migrating from v4. This part covers changes to components.</p>

## Material UI v5 migration

1. [Getting started](/material-ui/migration/migration-v4/)
2. [Breaking changes part one: style and theme](/material-ui/migration/v5-style-changes/)
3. Breaking changes part two: components 👈 _you are here_
4. [Migrating from JSS](/material-ui/migration/migrating-from-jss/)
5. [Troubleshooting](/material-ui/migration/troubleshooting/)

## Breaking changes, part two

Material UI v5 introduces a number of breaking changes from v4.
Many of these changes can be resolved automatically using [the codemods](/material-ui/migration/migration-v4/#run-codemods) described in the [main migration guide](/material-ui/migration/migration-v4/).

The following document lists all breaking changes related to components in v5 and how to address them.

If you haven't already, please be sure to review [Breaking changes in v5 part one: styles and themes](/material-ui/migration/v5-style-changes/) to continue the migration process.

:::warning
Breaking changes that are handled by the codemods are denoted by a ✅ emoji in the table of contents on the right side of the screen.

If you have already followed the instructions in the main migration guide and run the codemods, then you should not need to take any further action on these items.

All other changes must be handled manually.
:::

As the core components use Emotion as their style engine, the props used by Emotion are not intercepted. The prop `as` in the following code snippet will not be propagated to `SomeOtherComponent`.

```jsx
<MuiComponent component={SomeOtherComponent} as="button" />
```

## AccordionSummary

### Rename `expandIcon` to `expandIconWrapper`

This change was made to make it clearer that the element is a wrapper around the icon, not the icon itself.

Update the CSS class name and the theme overrides accordingly.

```diff
-'.MuiAccordionSummary-expandIcon': {
+'.MuiAccordionSummary-expandIconWrapper': {
```

```diff
 createTheme({
   components: {
     MuiAccordionSummary: {
       styleOverrides: {
-        expandIcon: {
+        expandIconWrapper: {
          // ...
         },
       },
     },
   },
 });
```

## AppBar

### Fix z-index issues

Remove z-index when position static and relative. This avoids the creation of a stacking context and rendering issues.

### Replace color prop for dark mode

The `color` prop has no longer any effect in dark mode. The app bar uses the background color required by the elevation to follow the [Material Design guidelines](https://m2.material.io/design/color/dark-theme.html). Use `enableColorOnDark` to restore the behavior of v4.

```jsx
<AppBar enableColorOnDark />
```

## Alert

### ✅ Update import

Move the component from the lab to the core. The component is now stable.

```diff
-import Alert from '@mui/lab/Alert';
-import AlertTitle from '@mui/lab/AlertTitle';
+import Alert from '@mui/material/Alert';
+import AlertTitle from '@mui/material/AlertTitle';
```

## Autocomplete

### ✅ Update import

Move the component from the lab to the core. The component is now stable.

```diff
-import Autocomplete from '@mui/lab/Autocomplete';
-import useAutocomplete  from '@mui/lab/useAutocomplete';
+import Autocomplete from '@mui/material/Autocomplete';
+import useAutocomplete from '@mui/material/useAutocomplete';
```

### Remove debug prop

Remove `debug` prop. There are a couple of simpler alternatives: `open={true}`, Chrome devtools ["Emulate focused"](https://x.com/sulco/status/1305841873945272321), or React devtools prop setter.

### Update `renderOption`

`renderOption` should now return the full DOM structure of the option.
It makes customizations easier. You can recover from the change with:

```diff
 <Autocomplete
-  renderOption={(option, { selected }) => (
-    <React.Fragment>
+  renderOption={(props, option, { selected }) => (
+    <li {...props}>
       <Checkbox
         icon={icon}
         checkedIcon={checkedIcon}
         style={{ marginRight: 8 }}
         checked={selected}
       />
       {option.title}
-    </React.Fragment>
+    </li>
   )}
 />
```

### ✅ Rename `closeIcon` to `clearIcon`

Rename `closeIcon` prop to `clearIcon` to avoid confusion.

```diff
-<Autocomplete closeIcon={defaultClearIcon} />
+<Autocomplete clearIcon={defaultClearIcon} />
```

### Rename reason arguments

The following values of the reason argument in `onChange` and `onClose` were renamed for consistency:

1. `create-option` to `createOption`
2. `select-option` to `selectOption`
3. `remove-option` to `removeOption`

Change the CSS rules that use `[data-focus="true"]` to use `.Mui-focused`. The `data-focus` attribute is not set on the focused option anymore; instead, global class names are used.

```diff
-'.MuiAutocomplete-option[data-focus="true"]': {
+'.MuiAutocomplete-option.Mui-focused': {
```

### ✅ Rename getOptionSelected

Rename `getOptionSelected` to `isOptionEqualToValue` to better describe its purpose.

```diff
 <Autocomplete
-  getOptionSelected={(option, value) => option.title === value.title}
+  isOptionEqualToValue={(option, value) => option.title === value.title}
```

## Avatar

### ✅ Rename circle

Rename `circle` to `circular` for consistency:

```diff
-<Avatar variant="circle">
-<Avatar classes={{ circle: 'className' }}>
+<Avatar variant="circular">
+<Avatar classes={{ circular: 'className' }}>
```

Since `circular` is the default value, the variant prop can be deleted:

```diff
-<Avatar variant="circle">
+<Avatar>
```

### ✅ Update AvatarGroup import

Move the AvatarGroup from the lab to the core.

```diff
-import AvatarGroup from '@mui/lab/AvatarGroup';
+import AvatarGroup from '@mui/material/AvatarGroup';
```

## Badge

### ✅ Rename circle and rectangle

Rename `circle` to `circular` and `rectangle` to `rectangular` for consistency.

```diff
-<Badge overlap="circle">
-<Badge overlap="rectangle">
+<Badge overlap="circular">
+<Badge overlap="rectangular">
```

```diff
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

## BottomNavigation

### Update event type (TypeScript)

The `event` in `onChange` is now typed as a `React.SyntheticEvent` instead of a `React.ChangeEvent`.

```diff
-<BottomNavigation onChange={(event: React.ChangeEvent<{}>) => {}} />
+<BottomNavigation onChange={(event: React.SyntheticEvent) => {}} />
```

## BottomNavigationAction

### Remove span and wrapper

Remove the `span` element that wraps the children.
Remove the `wrapper` classKey too.

You can find out more details about this change in [this GitHub pull request](https://github.com/mui/material-ui/pull/26923).

```diff
 <button class="MuiBottomNavigationAction-root">
-  <span class="MuiBottomNavigationAction-wrapper">
     {icon}
     <span class="MuiBottomNavigationAction-label">
       {label}
     </span>
-  </span>
 </button>
```

## Box

### ✅ Update borderRadius prop value

The `borderRadius` system prop value transformation has been changed.

If it receives a number, it multiplies this value with the `theme.shape.borderRadius` value.

Use a string to provide an explicit px value.

```diff
-<Box borderRadius="borderRadius">
+<Box borderRadius={1}>
```

```diff
-<Box borderRadius={16}>
+<Box borderRadius="16px">
```

### ✅ Apply sx API

The Box system props have an optional alternative API in v5, using the `sx` prop.

Check out MUI System docs to learn more about [the tradeoffs of this API](/system/getting-started/usage/#api-tradeoff).

```jsx
<Box border="1px dashed grey" p={[2, 3, 4]} m={2}>
<Box sx={{ border: "1px dashed grey", p: [2, 3, 4], m: 2 }}>
```

### ✅ Rename CSS properties

The following properties have been renamed because they are considered deprecated CSS properties by the CSS specification:

1. `gridGap` to `gap`
2. `gridColumnGap` to `columnGap`
3. `gridRowGap` to `rowGap`

```diff
-<Box gridGap={1}>
-<Box gridColumnGap={2}>
-<Box gridRowGap={3}>
+<Box gap={1}>
+<Box columnGap={2}>
+<Box rowGap={3}>
```

:::info
The system grid function was not documented in v4.
:::

### Remove clone prop

The `clone` prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material UI component.

```diff
-<Box sx={{ border: '1px dashed grey' }} clone>
-  <Button>Save</Button>
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

### Replace render prop with `sx`

The ability to pass a render prop was removed because its behavior can be obtained by applying the `sx` prop directly to the child if it is a Material UI component.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  {(props) => <Button {...props}>Save</Button>}
-</Box>
+<Button sx={{ border: '1px dashed grey' }}>Save</Button>
```

For non-Material UI components, use the `component` prop.

```diff
-<Box sx={{ border: '1px dashed grey' }}>
-  {(props) => <button {...props}>Save</button>}
-</Box>
+<Box component="button" sx={{ border: '1px dashed grey' }}>Save</Box>
```

## Button

### ✅ Remove default color prop

The button `color` prop is now "primary" by default, and "default" has been removed.
This makes the button closer to the Material Design guidelines and simplifies the API.

```diff
-<Button color="default">
+<Button>
```

:::info
If you prefer to use the `default` color in v4, take a look at this [CodeSandbox demo](https://codesandbox.io/p/sandbox/mimic-v4-button-default-color-bklx8?file=/src/Demo.tsx) to see how to make it work in v5.
:::

### Remove span and label

The `span` element that wraps children has been removed.
The `label` classKey is also removed.

You can find out more details about this change in [this GitHub pull request](https://github.com/mui/material-ui/pull/26666), it used to be necessary for iOS.

```diff
 <button class="MuiButton-root">
-  <span class="MuiButton-label">
     children
-  </span>
 </button>
```

## Chip

### ✅ Rename default to filled

Rename `default` variant to `filled` for consistency.

Since `filled` is the default value, the variant prop can be deleted:

```diff
-<Chip variant="default">
+<Chip>
```

## Checkbox

### Set to "primary" by default

The checkbox color prop is now "primary" by default.
To continue using the "secondary" color, you must explicitly indicate `secondary`.
This brings the checkbox closer to the Material Design guidelines.

```diff
-<Checkbox />
+<Checkbox color="secondary" />
```

### Update CSS class names

The component doesn't have `.MuiIconButton-root` and `.MuiIconButton-label` class names anymore.

Target `.MuiButtonBase-root` instead.

```diff
-<span class="MuiIconButton-root MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
-  <span class="MuiIconButton-label">
-    <input class="PrivateSwitchBase-input">
+<span class="MuiButtonBase-root MuiCheckbox-root PrivateSwitchBase-root">
+  <span class="PrivateSwitchBase-input">
```

## CircularProgress

### ✅ Rename static to determinate

The `static` variant has been renamed to `determinate`, and the previous appearance of `determinate` has been replaced by that of `static`.

This was an exception to Material Design, and was removed from the specification.

```diff
-<CircularProgress variant="static" classes={{ static: 'className' }} />
+<CircularProgress variant="determinate" classes={{ determinate: 'className' }} />
```

:::error
If you had previously customized `determinate`, then your customizations are most likely no longer valid.
Please remove them.
:::

## Collapse

### ✅ Rename collapsedHeight prop

The `collapsedHeight` prop was renamed `collapsedSize` to support the horizontal direction.

```diff
-<Collapse collapsedHeight={40}>
+<Collapse collapsedSize={40}>
```

The `classes.container` key was changed to match the convention of the other components.

```diff
-<Collapse classes={{ container: 'collapse' }}>
+<Collapse classes={{ root: 'collapse' }}>
```

## CssBaseline

### Update styled-engine

The component was migrated to use the `@mui/styled-engine` (`emotion` or `styled-components`) instead of `jss`.

You should remove the `@global` key when defining the style overrides for it.
You could also start using the CSS template syntax over the JavaScript object syntax.

```diff
 const theme = createTheme({
   components: {
     MuiCssBaseline: {
-      styleOverrides: {
-        '@global': {
-          html: {
-            WebkitFontSmoothing: 'auto',
-          },
-        },
-      },
+      styleOverrides: `
+        html {
+          -webkit-font-smoothing: auto;
+        }
+      `
     },
   },
 });
```

### Update body font size

The `body` font size has changed from `theme.typography.body2` (`0.875rem`) to `theme.typography.body1` (`1rem`).
To return to the previous size, you can override it in the theme:

```js
const theme = createMuiTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: '0.875rem',
          lineHeight: 1.43,
          letterSpacing: '0.01071em',
        },
      },
    },
  },
});
```

## Dialog

### ✅ Update transition props

The `on*` transition props were removed.
Use `TransitionProps` instead.

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
  >
```

### ✅ Remove disableBackdropClick prop

Remove the `disableBackdropClick` prop because it is redundant.

Ignore close events from `onClose` when `reason === 'backdropClick'` instead.

```diff
  <Dialog
-  disableBackdropClick
-  onClose={handleClose}
+  onClose={(event, reason) => {
+    if (reason !== 'backdropClick') {
+      handleClose(event, reason);
+    }
+  }}
  />
```

### Remove withMobileDialog component

Remove the `withMobileDialog` higher-order component.

:::warning
This is handled in the [preset-safe codemod](/material-ui/migration/migration-v4/#preset-safe) by applying hard-coded function to prevent application crash, but further fixes are required.
:::

The hook API allows a simpler and more flexible solution:

```diff
-import withMobileDialog from '@mui/material/withMobileDialog';
+import { useTheme, useMediaQuery } from '@mui/material';

 function ResponsiveDialog(props) {
-  const { fullScreen } = props;
+  const theme = useTheme();
+  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const [open, setOpen] = React.useState(false);

 // ...

-export default withMobileDialog()(ResponsiveDialog);
+export default ResponsiveDialog;
```

### ✅ Remove disableTypography prop

Flatten DialogTitle DOM structure and remove the `disableTypography` prop.

```diff
-<DialogTitle disableTypography>
-  <Typography variant="h4" component="h2">
+<DialogTitle>
+  <Typography variant="h4" component="span">
      My header
   </Typography>
```

## Divider

### Replace background-color with border-color

Use `border-color` instead of `background-color`.
This prevents inconsistent height on scaled screens.

If you have customized the color of the border, you will need to update the CSS property override:

```diff
 .MuiDivider-root {
-  background-color: #f00;
+  border-color: #f00;
 }
```

### Support "middle" variant with "vertical" orientation

In v4, using `orientation="vertical"` and `variant="middle"` was adding a left and right margins of `16px` in the component.
In the v5, to avoid fixed spacing on the component, this margin was removed.

:::info
If you want to use the previous margin values, this change can be made in your theme with the following code. See the example on [CodeSandbox demo](https://codesandbox.io/p/sandbox/v5-migration-vertical-alignment-middle-divider-45vepj?file=/src/index.tsx).
:::

```diff
 const theme = createTheme({
  components: {
   MuiDivider: {
+     styleOverrides: {
+       root: ({ ownerState, theme }) => ({
+         ...(ownerState.orientation === 'vertical' && ownerState.variant === 'middle' && {
+           marginLeft: theme.spacing(2),
+           marginRight: theme.spacing(2),
+         }),
+       })
+     }
    },
  },
 });
```

## ExpansionPanel

### ✅ Rename components

Rename the `ExpansionPanel` components to `Accordion` to use a more common naming convention:

```diff
-import ExpansionPanel from '@mui/material/ExpansionPanel';
-import ExpansionPanelSummary from '@mui/material/ExpansionPanelSummary';
-import ExpansionPanelDetails from '@mui/material/ExpansionPanelDetails';
-import ExpansionPanelActions from '@mui/material/ExpansionPanelActions';
+import Accordion from '@mui/material/Accordion';
+import AccordionSummary from '@mui/material/AccordionSummary';
+import AccordionDetails from '@mui/material/AccordionDetails';
+import AccordionActions from '@mui/material/AccordionActions';

-<ExpansionPanel>
+<Accordion>
-  <ExpansionPanelSummary>
+  <AccordionSummary>
      <Typography>Location</Typography>
      <Typography>Select trip destination</Typography>
-  </ExpansionPanelSummary>
+  </AccordionSummary>
-  <ExpansionPanelDetails>
+  <AccordionDetails>
      <Chip label="Barbados" onDelete={() => {}} />
      <Typography variant="caption">Select your destination of choice</Typography>
-  </ExpansionPanelDetails>
+  </AccordionDetails>
    <Divider />
-  <ExpansionPanelActions>
+  <AccordionActions>
      <Button size="small">Cancel</Button>
      <Button size="small">Save</Button>
-  </ExpansionPanelActions>
+  </AccordionActions>
-</ExpansionPanel>
+</Accordion>
```

### Update event type (TypeScript)

The `event` in `onChange` is now typed as a `React.SyntheticEvent` instead of a `React.ChangeEvent`.

```diff
-<Accordion onChange={(event: React.ChangeEvent<{}>, expanded: boolean) => {}} />
+<Accordion onChange={(event: React.SyntheticEvent, expanded: boolean) => {}} />
```

## ExpansionPanelDetails

### Remove display: flex

Remove `display: flex` from `AccordionDetails` (formerly `ExpansionPanelDetails`) as it was too opinionated—most developers expect `display: block`.

## ExpansionPanelSummary

### Rename focused to focusVisible

Rename `focused` to `focusVisible` for consistency:

```diff
 <AccordionSummary
   classes={{
-    focused: 'custom-focus-visible-classname',
+    focusVisible: 'custom-focus-visible-classname',
   }}
 />
```

### Remove IconButtonProps prop

Remove `IconButtonProps` prop from `AccordionSummary` (formerly `ExpansionPanelSummary`).

The component renders a `<div>` element instead of an `IconButton`, so the prop is no longer necessary.

## Fab

### ✅ Rename round to circular

```diff
-<Fab variant="round">
+<Fab variant="circular">
```

### Remove span and label

The `span` element that wraps children has been removed.
The `label` classKey is also removed.

You can find out more details about this change in [this GitHub pull request](https://github.com/mui/material-ui/pull/27112), it used to be necessary for iOS.

```diff
 <button class="MuiFab-root">
-  <span class="MuiFab-label">
     {children}
-  </span>
 </button>
```

## FormControl

### ✅ Update default variant

Change the default variant from `standard` to `outlined`.

`standard` has been removed from the Material Design guidelines.

:::success
This is handled in [variant-prop codemod](/material-ui/migration/migration-v4/#variant-prop)—read the details before running this codemod.
:::

```diff
-<FormControl value="Standard" />
-<FormControl value="Outlined" variant="outlined" />
+<FormControl value="Standard" variant="standard" />
+<FormControl value="Outlined" />
```

## FormControlLabel

### Add required label prop

The `label` prop is now required.
If you were using a `FormControlLabel` without a `label`, you can replace it with just the value of the `control` prop.

```diff
-<FormControlLabel control={<Checkbox />} />
+<Checkbox />
```

## Grid

### ✅ Rename justify prop

Rename the `justify` prop to `justifyContent` to align with the CSS property name.

```diff
-<Grid justify="center">
+<Grid justifyContent="center">
```

### ✅ Remove align and justify props and classes

The props `alignItems`, `alignContent`, and `justifyContent`—along with their classes and style overrides keys—have been removed:

"align-items-xs-center", "align-items-xs-flex-start", "align-items-xs-flex-end", "align-items-xs-baseline", "align-content-xs-center", "align-content-xs-flex-start", "align-content-xs-flex-end", "align-content-xs-space-between", "align-content-xs-space-around", "justify-content-xs-center", "justify-content-xs-flex-end", "justify-content-xs-space-between", "justify-content-xs-space-around" and "justify-content-xs-space-evenly".

These props are now considered part of MUI System, not the `Grid` component itself.

If you still wish to add overrides for them, you can use the [callback as a value in `styleOverrides`](https://v5.mui.com/material-ui/customization/theme-components/#overrides-based-on-props).

```diff
 const theme = createTheme({
   components: {
     MuiGrid: {
-      styleOverrides: {
-        'align-items-xs-flex-end': {
-          marginTop: 20,
-        },
-      },
+      styleOverrides: ({ ownerState }) => ({
+        ...ownerState.alignItems === 'flex-end' && {
+          marginTop: 20,
+        },
+      }),
     },
   },
 });
```

### Change negative margins

The negative margins apply only to the top and left sides of the grid container.
If you need negative margins on all sides, we recommend using the new Grid v2 instead:

```diff
- import Grid from '@mui/material/Grid';
+ import Grid from '@mui/material/Grid2';
```

To learn more about Grid2, check out the [Grid2 component doc](/material-ui/react-grid/) and the [upgrade guide](/material-ui/migration/upgrade-to-grid-v2/).

:::info
Grid2 was introduced in Material UI v5.9.1 and features negative margins on all sides by default.
:::

## GridList

### ✅ Rename GridList component

Rename the `GridList` components to `ImageList` to align with the current Material Design naming.

### Rename GridList props

- Rename the GridList `spacing` prop to `gap` to align with the CSS attribute.
- Rename the GridList `cellHeight` prop to `rowHeight`.
- Add the `variant` prop to GridList.
- Rename the GridListItemBar `actionPosition` prop to `position`. (Note also the related classname changes.)

### Use CSS object-fit

Use CSS `object-fit`. For IE 11 support either use a polyfill such as
[this npm package](https://www.npmjs.com/package/object-fit-images), or else continue to use the v4 component.

```diff
-import GridList from '@mui/material/GridList';
-import GridListTile from '@mui/material/GridListTile';
-import GridListTileBar from '@mui/material/GridListTileBar';
+import ImageList from '@mui/material/ImageList';
+import ImageListItem from '@mui/material/ImageListItem';
+import ImageListItemBar from '@mui/material/ImageListItemBar';

-<GridList spacing={8} cellHeight={200}>
-  <GridListTile>
+<ImageList gap={8} rowHeight={200}>
+  <ImageListItem>
    <img src="file.jpg" alt="Image title" />
-    <GridListTileBar
+    <ImageListItemBar
      title="Title"
      subtitle="Subtitle"
    />
-  </GridListTile>
-</GridList>
+  </ImageListItem>
+</ImageList>
```

## Hidden

### Replace deprecated component

This component is deprecated because its functionality can be created with the [`sx`](/system/getting-started/the-sx-prop/) prop or the [`useMediaQuery`](/material-ui/react-use-media-query/) hook.

:::success
This is handled in the [preset-safe codemod](/material-ui/migration/migration-v4/#preset-safe) by applying fake `Hidden` component to prevent application crash, but further fixes are required.
:::

Use the `sx` prop to replace `implementation="css"`:

```diff
-<Hidden implementation="css" xlUp><Paper /></Hidden>
-<Hidden implementation="css" xlUp><button /></Hidden>
+<Paper sx={{ display: { xl: 'none', xs: 'block' } }} />
+<Box component="button" sx={{ display: { xl: 'none', xs: 'block' } }} />
```

```diff
-<Hidden implementation="css" mdDown><Paper /></Hidden>
-<Hidden implementation="css" mdDown><button /></Hidden>
+<Paper sx={{ display: { xs: 'none', md: 'block' } }} />
+<Box component="button" sx={{ display: { xs: 'none', md: 'block' } }} />
```

Use the `useMediaQuery` hook to replace `implementation="js"`:

```diff
-<Hidden implementation="js" xlUp><Paper /></Hidden>
+const hidden = useMediaQuery(theme => theme.breakpoints.up('xl'));
+return hidden ? null : <Paper />;
```

## Icon

### Remove fontSize="default"

The default value of `fontSize` was changed from `default` to `medium` for consistency.
In the unlikely event that you were using the value `default`, the prop can be removed:

```diff
-<Icon fontSize="default">icon-name</Icon>
+<Icon>icon-name</Icon>
```

## IconButton

### ✅ Update size prop

Padding for the default size has been reduced to 8px, bringing it down to 40px.

For the old default size of 48px, use `size="large"`.

The change was made to better match Google's products when Material Design stopped documenting the icon button pattern.

```diff
- <IconButton>
+ <IconButton size="large">
```

### Remove span and label

The `span` element that wraps children has been removed.
The `label` classKey is also removed.

You can find out more details about this change in [this GitHub pull request](https://github.com/mui/material-ui/pull/26666), it used to be necessary for iOS.

```diff
 <button class="MuiIconButton-root">
-  <span class="MuiIconButton-label">
     <svg />
-  </span>
 </button>
```

## Link

### ✅ Update default underline prop

The default `underline` prop is changed from `"hover"` to `"always"`.

To recreate the behavior from v4, apply `defaultProps` in the theme.

:::success
This is handled in [link-underline-hover codemod](/material-ui/migration/migration-v4/#link-underline-hover)—read the details before running this codemod.
:::

```js
createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
});
```

## Menu

### ✅ Update transition props

The `on*` transition props were removed.
Use `TransitionProps` instead.

```diff
 <Menu
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
 >
```

:::info
The `selectedMenu` variant will no longer vertically align the selected item with the anchor.
:::

### Change default anchorOrigin.vertical value

Change the default value of `anchorOrigin.vertical` to follow the Material Design guidelines.

The menu is now displayed below the anchor instead of on top of it.

You can restore the previous behavior with:

```diff
 <Menu
+  anchorOrigin={{
+    vertical: 'top',
+    horizontal: 'left',
+  }}
```

## MenuItem

### Update CSS class names

The `MenuItem` component inherits the `ButtonBase` component instead of `ListItem`.

The class names related to "MuiListItem-\*" have been removed, and theming `ListItem` no longer has an effect on `MenuItem`.

```diff
-<li className="MuiButtonBase-root MuiMenuItem-root MuiListItem-root">
+<li className="MuiButtonBase-root MuiMenuItem-root">
```

### Replace listItemClasses prop

prop `listItemClasses` is removed, use `classes` instead.

```diff
-<MenuItem listItemClasses={{...}}>
+<MenuItem classes={{...}}>
```

Read more about the [MenuItem CSS API](/material-ui/api/menu-item/#classes).

## Modal

### ✅ Remove disableBackdropClick prop

Remove the `disableBackdropClick` prop because it is redundant.

Use `onClose` with `reason === 'backdropClick'` instead.

```diff
 <Modal
-  disableBackdropClick
-  onClose={handleClose}
+  onClose={(event, reason) => {
+    if (reason !== 'backdropClick') {
+      handleClose(event, reason);
+    }
+  }}
 />
```

### ✅ Remove `onEscapeKeyDown` prop

Remove the `onEscapeKeyDown` prop because it is redundant.

Use `onClose` with `reason === "escapeKeyDown"` instead.

```diff
 <Modal
-  onEscapeKeyDown={handleEscapeKeyDown}
+  onClose={(event, reason) => {
+    if (reason === 'escapeKeyDown') {
+      handleEscapeKeyDown(event);
+    }
+  }}
 />
```

### Remove `onRendered` prop

Remove the `onRendered` prop.

Depending on your use case, you can either use a [callback ref](https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback) on the child element, or an effect hook in the child component.

## NativeSelect

### Remove selectMenu slot

Merge the `selectMenu` slot into `select`.
The `selectMenu` slot was redundant.

The `root` slot is no longer applied to the select, but to the root.

```diff
-<NativeSelect classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
+<NativeSelect classes={{ select: 'class1 class2 class3' }} />
```

## OutlinedInput

### Replace labelWidth prop

Remove the `labelWidth` prop.

The `label` prop now fulfills the same purpose, using CSS layout instead of JavaScript measurement to render the gap in the outlined.

```diff
-<OutlinedInput labelWidth={20} />
+<OutlinedInput label="First Name" />
```

## Paper

### Change dark mode background opacity

Change the background opacity based on the elevation in dark mode.

This change was made to better conform to the Material Design guidelines.

You can revert it in the theme:

```diff
 const theme = createTheme({
   components: {
     MuiPaper: {
+      styleOverrides: { root: { backgroundImage: 'unset' } },
     },
   },
 });
```

## Pagination

### ✅ Update import

Move the component from the lab to the core.

The component is now stable.

```diff
-import Pagination from '@mui/lab/Pagination';
-import PaginationItem from '@mui/lab/PaginationItem';
-import { usePagination } from '@mui/lab/Pagination';
+import Pagination from '@mui/material/Pagination';
+import PaginationItem from '@mui/material/PaginationItem';
+import usePagination from '@mui/material/usePagination';
```

### ✅ Rename round to circular

```diff
-<Pagination shape="round">
-<PaginationItem shape="round">
+<Pagination shape="circular">
+<PaginationItem shape="circular">
```

## Popover

### ✅ Update transition props

The `on*` transition props were removed.

Use `TransitionProps` instead.

```diff
  <Popover
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
  >
```

### Remove getContentAnchorEl prop

The `getContentAnchorEl` prop was removed to simplify the positioning logic.

## Popper

### Upgrade from v1 to v2

Upgrade [Popper.js](https://github.com/floating-ui/popper-docs) from v1 to v2.

The CSS prefixes have changed:

```diff
  popper: {
    zIndex: 1,
-  '&[x-placement*="bottom"] .arrow': {
+  '&[data-popper-placement*="bottom"] .arrow': {
```

Method names have changed:

```diff
-popperRef.current.scheduleUpdate()
+popperRef.current.update()
```

```diff
-popperRef.current.update()
+popperRef.current.forceUpdate()
```

The Modifiers API has been changed too significantly to fully cover here.

Read the [Popper.js migration guide](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/migration-guide.md) for complete details.

## Portal

### Remove onRendered prop

Remove the `onRendered` prop.

Depending on your use case, you can either use a [callback ref](https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback) on the child element, or an effect hook in the child component.

## Radio

### Update default color prop

The radio color prop is now "primary" by default.

To continue using the "secondary" color, you must explicitly indicate `secondary`.

This brings the radio closer to the Material Design guidelines.

```diff
-<Radio />
+<Radio color="secondary" />
```

### Update CSS classes

This component no longer has the class names `.MuiIconButton-root` or `.MuiIconButton-label`.

Instead, target `.MuiButtonBase-root`.

```diff
- <span class="MuiIconButton-root MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
-   <span class="MuiIconButton-label">
-     <input class="PrivateSwitchBase-input">
+ <span class="MuiButtonBase-root MuiRadio-root PrivateSwitchBase-root">
+   <span class="PrivateSwitchBase-input">
```

## Rating

### ✅ Update imports

Move the component from the lab to the core.

The component is now stable.

```diff
-import Rating from '@mui/lab/Rating';
+import Rating from '@mui/material/Rating';
```

### Change default empty icon

Change the default empty icon to improve accessibility.

If you have a custom `icon` prop but no `emptyIcon` prop, you can restore the previous behavior with:

```diff
 <Rating
   icon={customIcon}
+  emptyIcon={null}
 />
```

### Rename visuallyhidden

Rename `visuallyhidden` to `visuallyHidden` for consistency:

```diff
  <Rating
    classes={{
-    visuallyhidden: 'custom-visually-hidden-classname',
+    visuallyHidden: 'custom-visually-hidden-classname',
    }}
  />
```

## RootRef

### Remove component

This component has been removed.

You can get a reference to the underlying DOM node of our components via `ref` prop.

The component relied on [`ReactDOM.findDOMNode`](https://legacy.reactjs.org/docs/react-dom.html#finddomnode) which is [deprecated in `React.StrictMode`](https://react.dev/reference/react/StrictMode#warning-about-deprecated-finddomnode-usage).

:::success
This is handled in the [preset-safe codemod](/material-ui/migration/migration-v4/#preset-safe) by applying fake `RootRef` component to prevent application crash, but further fixes are required.
:::

```diff
-<RootRef rootRef={ref}>
-  <Button />
-</RootRef>
+<Button ref={ref} />
```

## Select

### ✅ Update default variant

Change the default variant from `standard` to `outlined`.

`standard` has been removed from the Material Design guidelines.

If you are composing the `Select` with a form control component, you only need to update `FormControl`—the select inherits the variant from its context.

:::success
This is handled in [variant-prop codemod](/material-ui/migration/migration-v4/#variant-prop)—read the details before running this codemod.
:::

```diff
-<Select value="Standard" />
-<Select value="Outlined" variant="outlined" />
+<Select value="Standard" variant="standard" />
+<Select value="Outlined" />
```

### Replace labelWidth prop

Remove the `labelWidth` prop.

The `label` prop now fulfills the same purpose, using the CSS layout instead of JavaScript measurements to render the gap in the `outlined` variant.

The `TextField` already handles this by default.

```diff
-<Select variant="outlined" labelWidth={20} />
+<Select variant="outlined" label="Gender" />
```

### Remove selectMenu slot

Merge the `selectMenu` slot into `select`.
The `selectMenu` slot was redundant.

The `root` slot is no longer applied to the select, but to the root.

```diff
-<Select classes={{ root: 'class1', select: 'class2', selectMenu: 'class3' }} />
+<Select classes={{ select: 'class1 class2 class3' }} />
```

### Update event type (TypeScript)

The `event` in `onChange` is now typed as a `SelectChangeEvent<T>` instead of a `React.ChangeEvent`.

```diff
+ import Select, { SelectChangeEvent } from '@mui/material/Select';

-<Select onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
+<Select onChange={(event: SelectChangeEvent<T>, child: React.ReactNode) => {}} />
```

This was necessary to prevent overriding the `event.target` of the events that caused the change.

## Skeleton

### ✅ Update import

Move the component from the lab to the core.

The component is now stable.

```diff
-import Skeleton from '@mui/lab/Skeleton';
+import Skeleton from '@mui/material/Skeleton';
```

### ✅ Rename circle and rect

Rename `circle` to `circular` and `rect` to `rectangular` for consistency:

```diff
-<Skeleton variant="circle" />
-<Skeleton variant="rect" />
-<Skeleton classes={{ circle: 'custom-circle-classname', rect: 'custom-rect-classname',  }} />
+<Skeleton variant="circular" />
+<Skeleton variant="rectangular" />
+<Skeleton classes={{ circular: 'custom-circle-classname', rectangular: 'custom-rect-classname',  }} />
```

## Slider

### Update event type (TypeScript)

The `event` in `onChange` is now typed as a `React.SyntheticEvent` instead of a `React.ChangeEvent`.

```diff
-<Slider onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
+<Slider onChange={(event: Event, value: unknown) => {}} />
```

This was necessary to prevent overriding the `event.target` of the events that caused the change.

### Replace ValueLabelComponent and ThumbComponent props

The `ValueLabelComponent` and `ThumbComponent` props are now part of the `components` prop.

```diff
  <Slider
-  ValueLabelComponent={CustomValueLabel}
-  ThumbComponent={CustomThumb}
+  components={{
+    ValueLabel: CustomValueLabel,
+    Thumb: CustomThumb,
+  }}
  />
```

### Refactor CSS

Rework the CSS to match the latest [Material Design guidelines](https://m2.material.io/components/sliders) and make custom styles more intuitive.
[See documentation](/material-ui/react-slider/).

<a href="/material-ui/react-slider/#continuous-sliders"><img width="247" alt="" src="https://user-images.githubusercontent.com/3165635/121884800-a8808600-cd13-11eb-8cdf-e25de8f1ba73.png" style="margin: auto"></a>

You can reduce the density of the slider, closer to v4 with the [`size="small"` prop](/material-ui/react-slider/#sizes).

## Snackbar

### Update default positioning

The notification now displays at the bottom left on large screens.

This better matches the behavior of Gmail, Google Keep, material.io, etc.

You can restore the v4 behavior with:

```diff
-<Snackbar />
+<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
```

### ✅ Update transition props

The `on*` transition props were removed.

Use `TransitionProps` instead.

```diff
 <Snackbar
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
 >
```

## SpeedDial

### ✅ Update import

Move the component from the lab to the core.

The component is now stable.

```diff
-import SpeedDial from '@mui/lab/SpeedDial';
-import SpeedDialAction from '@mui/lab/SpeedDialAction';
-import SpeedDialIcon from '@mui/lab/SpeedDialIcon';
+import SpeedDial from '@mui/material/SpeedDial';
+import SpeedDialAction from '@mui/material/SpeedDialAction';
+import SpeedDialIcon from '@mui/material/SpeedDialIcon';
```

## Stepper

### Update component structure

The root component `Paper` was replaced with a `<div>`.

`Stepper` no longer has elevation, and it does not inherit props from `Paper` anymore.
This change is meant to encourage composition.

```diff
+<Paper square elevation={2}>
-  <Stepper elevation={2}>
+  <Stepper>
      <Step>
        <StepLabel>Hello world</StepLabel>
      </Step>
    </Stepper>
+<Paper>
```

### Remove built-in padding

The built-in 24px padding has been removed.

To keep it intact, add the following:

```diff
-<Stepper>
+<Stepper style={{ padding: 24 }}>
    <Step>
      <StepLabel>Hello world</StepLabel>
    </Step>
  </Stepper>
```

## SvgIcon

### Remove fontSize="default"

The default value of `fontSize` was changed from `default` to `medium` for consistency.

In the unlikely event that you were using the value `default`, the prop can be removed:

```diff
-<SvgIcon fontSize="default">
+<SvgIcon>
   <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
 </SvgIcon>
```

## Switch

### Remove second onChange argument

The second argument from `onChange` has been deprecated.

You can pull out the checked state by accessing `event.target.checked`.

```diff
 function MySwitch() {
-  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
+  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
+    const checked = event.target.checked;
   };

   return <Switch onChange={handleChange} />;
 }
```

### Update default color prop

The `color` prop is now "primary" by default.

To continue using the "secondary" color, you must explicitly indicate `secondary`.

This brings `Switch` closer to the Material Design guidelines.

```diff
-<Switch />
+<Switch color="secondary" />
```

### Update CSS classes

This component no longer has the `.MuiIconButton-root` and `.MuiIconButton-label`.

Instead, target `.MuiButtonBase-root`.

```diff
  <span class="MuiSwitch-root">
-  <span class="MuiIconButton-root MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
-    <span class="MuiIconButton-label">
-      <input class="MuiSwitch-input PrivateSwitchBase-input">
+  <span class="MuiButtonBase-root MuiSwitch-switchBase PrivateSwitchBase-root">
+    <span class="MuiSwitch-input PrivateSwitchBase-input">
```

## Table

### Rename default padding prop value

Rename the `default` value of the `padding` prop to `normal`.

```diff
-<Table padding="default" />
-<TableCell padding="default" />
+<Table padding="normal" />
+<TableCell padding="normal" />
```

## TablePagination

### Customize labels with getItemAriaLabel prop

The customization of the table pagination's actions labels must be done with the `getItemAriaLabel` prop.

This increases consistency with the `Pagination` component.

```diff
  <TablePagination
-  backIconButtonText="Back"
-  nextIconButtonText="Next"
+  getItemAriaLabel={…}
```

### ✅ Rename onChangeRowsPerPage and onChangePage

Rename `onChangeRowsPerPage` to `onRowsPerPageChange` and `onChangePage` to `onPageChange` for API consistency.

```diff
  <TablePagination
-  onChangeRowsPerPage={()=>{}}
-  onChangePage={()=>{}}
+  onRowsPerPageChange={()=>{}}
+  onPageChange={()=>{}}
```

### Separate label classes

Separate classes for different table pagination labels.

```diff
  <TablePagination
-  classes={{ caption: 'foo' }}
+  classes={{ selectLabel: 'foo', displayedRows: 'foo' }}
  />
```

### Move custom class on input to select

Move the custom class on `input` to `select`.

The `input` key is applied on another element.

```diff
  <TablePagination
-  classes={{ input: 'foo' }}
+  classes={{ select: 'foo' }}
  />
```

## Tabs

### Update default indicatorColor and textColor prop values

Change the default `indicatorColor` and `textColor` prop values to "primary".

This is done to match the most common use cases with Material Design.

If you'd prefer to keep the v4 color styles, use `"secondary"` and `"inherit"`, respectively, as shown below:

```diff
-<Tabs />
+<Tabs indicatorColor="secondary" textColor="inherit" />
```

### Update event type (TypeScript)

The `event` in `onChange` is now typed as a `React.SyntheticEvent` instead of a `React.ChangeEvent`.

```diff
-<Tabs onChange={(event: React.ChangeEvent<{}>, value: unknown) => {}} />
+<Tabs onChange={(event: React.SyntheticEvent, value: unknown) => {}} />
```

### ✅ Add new scroll button props

The API that controls the scroll buttons has been split into two props.

- The `scrollButtons` prop controls when the scroll buttons are displayed depending on the space available.
- The `allowScrollButtonsMobile` prop removes the CSS media query that systematically hides the scroll buttons on mobile.

```diff
-<Tabs scrollButtons="on" />
-<Tabs scrollButtons="desktop" />
-<Tabs scrollButtons="off" />
+<Tabs scrollButtons allowScrollButtonsMobile />
+<Tabs scrollButtons />
+<Tabs scrollButtons={false} />
```

## Tab

### Update default minWidth and maxWidth

Default minimum and maximum widths have been changed to match the [Material Design specifications](https://m2.material.io/components/tabs#specs):

- `minWidth` was changed from 72px to 90px.
- `maxWidth` was changed from 264px to 360px.

### Remove span and wrapper

The `span` element that wraps children has been removed.
The `wrapper` classKey is also removed.

You can find out more details about this change in [this GitHub pull request](https://github.com/mui/material-ui/pull/26926).

```diff
  <button class="MuiTab-root">
-  <span class="MuiTab-wrapper">
      {icon}
      {label}
-  </span>
  </button>
```

## TextField

### ✅ Update default variant

Change the default variant from `standard` to `outlined`.

`standard` has been removed from the Material Design guidelines.

:::success
This is handled in [variant-prop codemod](/material-ui/migration/migration-v4/#variant-prop)—read the details before running this codemod.
:::

```diff
-<TextField value="Standard" />
-<TextField value="Outlined" variant="outlined" />
+<TextField value="Standard" variant="standard" />
+<TextField value="Outlined" />
```

### ✅ Rename rowsMax

Rename `rowsMax` prop to `maxRows` for consistency with HTML attributes.

```diff
-<TextField rowsMax={6}>
+<TextField maxRows={6}>
```

### ✅ Replace rows with minRows

Rename `rows` prop to `minRows` for dynamic resizing.

You need to use the `minRows` prop in the following case:

```diff
-<TextField rows={2} maxRows={5} />
+<TextField minRows={2} maxRows={5} />
```

### Forward ref instead of inputRef prop

Change ref forwarding expectations on custom `inputComponent`.

The component should forward the `ref` prop instead of the `inputRef` prop.

```diff
-function NumberFormatCustom(props) {
-  const { inputRef, onChange, ...other } = props;
+const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
+  props,
+  ref,
+) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
-     getInputRef={inputRef}
+     getInputRef={ref}
```

### Rename marginDense and inputMarginDense classes

Rename `marginDense` and `inputMarginDense` classes to `sizeSmall` and `inputSizeSmall` to match the prop.

```diff
-<Input margin="dense" />
+<Input size="small" />
```

### Update InputAdornment position prop

Set the InputAdornment `position` prop to `start` or `end`.

Use `start` if used as the value of the `startAdornment` prop.
Use `end` if used as the value of the `endAdornment` prop.

```diff
-<TextField startAdornment={<InputAdornment>kg</InputAdornment>} />
-<TextField endAdornment={<InputAdornment>kg</InputAdornment>} />
+<TextField startAdornment={<InputAdornment position="start">kg</InputAdornment>} />
+<TextField endAdornment={<InputAdornment position="end">kg</InputAdornment>} />
```

## TextareaAutosize

### ✅ Replace rows with minRows

Remove the `rows` prop, use the `minRows` prop instead.

This change aims to clarify the behavior of the prop.

```diff
-<TextareaAutosize rows={2} />
+<TextareaAutosize minRows={2} />
```

### ✅ Rename rowsMax

Rename `rowsMax` prop to `maxRows` for consistency with HTML attributes.

```diff
-<TextareaAutosize rowsMax={6}>
+<TextareaAutosize maxRows={6}>
```

### ✅ Rename rowsMin

Rename `rowsMin` prop with `minRows` for consistency with HTML attributes.

```diff
-<TextareaAutosize rowsMin={1}>
+<TextareaAutosize minRows={1}>
```

## ToggleButton

### ✅ Update import

Move the component from the lab to the core.

The component is now stable.

```diff
-import ToggleButton from '@mui/lab/ToggleButton';
-import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
+import ToggleButton from '@mui/material/ToggleButton';
+import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
```

### Remove span and label

The `span` element that wraps children has been removed.
The `label` classKey is also removed.

You can find out more details about this change in [this GitHub pull request](https://github.com/mui/material-ui/pull/27111).

```diff
  <button class="MuiToggleButton-root">
-  <span class="MuiToggleButton-label">
      {children}
-  </span>
  </button>
```

## Tooltip

### Interactive by default

Tooltips are now interactive by default.

The previous default behavior failed the [success criterion 1.4.3 ("hoverable") in WCAG 2.1](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus).

To reflect the new default value, the prop was renamed to `disableInteractive`.

If you want to restore the v4 behavior, you can apply the following diff:

```diff
-<Tooltip>
+<Tooltip disableInteractive>

 # Interactive tooltips no longer need the `interactive` prop.
-<Tooltip interactive>
+<Tooltip>
```

## Typography

### Remove srOnly variant

Remove the `srOnly` variant.

You can use the `visuallyHidden` utility in conjunction with the `sx` prop instead.

```diff
+import { visuallyHidden } from '@mui/utils';

-<Typography variant="srOnly">Create a user</Typography>
+<span style={visuallyHidden}>Create a user</span>
```

### Remove color and style override keys

The following classes and style overrides keys were removed:

"colorInherit", "colorPrimary", "colorSecondary", "colorTextPrimary", "colorTextSecondary", "colorError", "displayInline", and "displayBlock".

These props are now considered part of MUISystem rather than the `Typography` component itself.

If you still wish to add overrides for them, you can use the [callback as a value in `styleOverrides`](https://v5.mui.com/material-ui/customization/theme-components/#overrides-based-on-props).

For example:

```diff
 const theme = createTheme({
   components: {
     MuiTypography: {
-      styleOverrides: {
-        colorSecondary: {
-          marginTop: '20px',
-        },
-      },
+      styleOverrides: ({ ownerState }) => ({
+        ...ownerState.color === 'secondary' && {
+          marginTop: '20px',
+        },
+      }),
     },
   },
 });
```

## Theme

### Default background colors

The default background color is now `#fff` in light mode and `#121212` in dark mode.

This matches the Material Design guidelines.

### ✅ Breakpoint behavior

Breakpoints are now treated as values instead of [ranges](https://v4.mui.com/customization/breakpoints/#default-breakpoints).

The behavior of `down(key)` was changed to define a media query below the value defined by the corresponding breakpoint (exclusive), rather than the breakpoint above.

`between(start, end)` was also updated to define a media query for the values between the actual start (inclusive) and end (exclusive) values.

When using the `down()` breakpoints utility, you need to update the breakpoint key by one step up.

When using `between(start, end)`, the end breakpoint should also be updated by one step up.

Here are some examples of the changes required:

```diff
-theme.breakpoints.down('sm') // '@media (max-width:959.95px)' - [0, sm + 1) => [0, md)
+theme.breakpoints.down('md') // '@media (max-width:959.95px)' - [0, md)
```

```diff
-theme.breakpoints.between('sm', 'md') // '@media (min-width:600px) and (max-width:1279.95px)' - [sm, md + 1) => [0, lg)
+theme.breakpoints.between('sm', 'lg') // '@media (min-width:600px) and (max-width:1279.95px)' - [0, lg)
```

```diff
-theme.breakpoints.between('sm', 'xl') // '@media (min-width:600px)'
+theme.breakpoints.up('sm') // '@media (min-width:600px)'
```

The same should be done when using the `Hidden` component:

```diff
-<Hidden smDown>{...}</Hidden> // '@media (min-width:600px)'
+<Hidden mdDown>{...}</Hidden> // '@media (min-width:600px)'
```

### Breakpoint sizes

The default breakpoints were changed to better match common use cases as well as the Material Design guidelines.

You can find out more details about this change in [this GitHub issue](https://github.com/mui/material-ui/issues/21902)

```diff
 {
   xs: 0,
   sm: 600,
-  md: 960,
+  md: 900,
-  lg: 1280,
+  lg: 1200,
-  xl: 1920,
+  xl: 1536,
 }
```

If you prefer the old breakpoint values, use the snippet below:

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
```

### ✅ Replace theme.breakpoints.width

The `theme.breakpoints.width` utility has been removed because it was redundant.

Use `theme.breakpoints.values` to get the same values.

```diff
-theme.breakpoints.width('md')
+theme.breakpoints.values.md
```

### Update theme.palette.augmentColor helper

The signature of `theme.palette.augmentColor` helper has changed:

```diff
-theme.palette.augmentColor(red);
+theme.palette.augmentColor({ color: red, name: 'brand' });
```

### Remove theme.typography.round helper

The `theme.typography.round` helper was removed because it was no longer used.

If you need it, use the function below:

```js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
```

## @mui/types

### Rename the exported Omit type

The module is now called `DistributiveOmit`.

This change removes the confusion with the built-in `Omit` helper introduced in TypeScript v3.5.

The built-in `Omit`, while similar, is non-distributive.
This leads to differences when applied to union types.
[See this Stack Overflow answer for further details](https://stackoverflow.com/questions/57103834/omit-a-property-from-all-interfaces-in-a-union-but-keep-the-union-structure/57103940#57103940).

```diff
-import { Omit } from '@mui/types';
+import { DistributiveOmit } from '@mui/types';
```
