# Upgrade to v9

<p class="description">This guide explains how to upgrade from MUI System v7 to v9.</p>

## Why you should upgrade to MUI System v9

### More consistent styling APIs

MUI System v9 removes deprecated system props in favor of the `sx` prop.
This reduces the API surface, makes styling behavior more consistent across components, and avoids conflicts with props that should be forwarded to the underlying element.

### Clearer layout primitives

MUI System v9 keeps `Grid` focused on two-dimensional layouts and encourages `Stack` for vertical layouts.
This makes the layout APIs easier to reason about and aligns them more closely with their intended use cases.

## Breaking changes

Since v9 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from MUI System v7 to v9 are described below.

### Deprecated system props removed

Use the [system-props codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#system-props) below to migrate the code as described in the following section:

```bash
npx @mui/codemod@latest v9.0.0/system-props <path/to/folder>
```

The deprecated system props have been removed from the following components:

- `Box`
- `Grid`
- `Stack`

```diff
-<Box mt={2} color="primary.main" />
+<Box sx={{ mt: 2, color: 'primary.main' }} />

-<Grid mt={2} mr={1} />
+<Grid sx={{ mt: 2, mr: 1 }} />

-<Stack mt={2} alignItems="center" />
+<Stack sx={{ mt: 2, alignItems: 'center' }} />
```

This also fixes an issue where props like `color` could be consumed by the component instead of being forwarded to the element rendered via the `component` prop.

### Grid direction

The `Grid` component no longer supports `direction="column"` or `direction="column-reverse"`.
`Grid` is designed for two-dimensional layouts organized into columns.
For vertical layouts, use `Stack` instead.

```diff
-import Grid from '@mui/system/Grid';
+import Stack from '@mui/system/Stack';

-<Grid container direction="column" spacing={2}>
-  <Grid>First item</Grid>
-  <Grid>Second item</Grid>
-</Grid>
+<Stack spacing={2}>
+  <div>First item</div>
+  <div>Second item</div>
+</Stack>
```
