# Migrating from deprecated APIs

<p class="description">Learn how to migrate away from recently deprecated APIs before they become breaking changes.</p>

## Why you should migrate

Features become deprecated over time as maintainers make improvements to the APIs.
Migrating to these improved APIs results in a better developer experience, so it's in your best interest to stay up to date.
Deprecated APIs often become breaking changes in subsequent major versions, so the sooner you migrate, the smoother the next major update will be.

## Autocomplete

Use the [codemod](https://github.com/mui/material-ui/tree/HEAD/packages/mui-codemod#autocomplete-props) below to migrate the code as described in the following sections:

```bash
npx @mui/codemod@latest deprecations/autocomplete-props <path>
```

### renderTags prop

The `renderTags` prop is deprecated, use `renderValue` instead.

```diff
 <Autocomplete
   multiple
   options={options}
-  renderTags={(value, getTagProps, ownerState) =>
-    value.map((option, index) => (
-      <Chip label={option.label} {...getTagProps({ index })} />
-    ))
-  }
+  renderValue={(value, getItemProps, ownerState) =>
+    value.map((option, index) => (
+      <Chip label={option.label} {...getItemProps({ index })} />
+    ))
+  }
 />
```

---

### useAutocomplete deprecated fields

The following return value fields are deprecated from the `useAutocomplete` hook:

- `getTagProps` → use `getItemProps`
- `focusedTag` → use `focusedItem`

#### getTagProps

```diff
 const {
-  getTagProps,
+  getItemProps,
 } = useAutocomplete(props);

 // ...
-<Chip {...getTagProps({ index })} />
+<Chip {...getItemProps({ index })} />
```

#### focusedTag

```diff
 const {
-  focusedTag,
+  focusedItem,
 } = useAutocomplete(props);
```
