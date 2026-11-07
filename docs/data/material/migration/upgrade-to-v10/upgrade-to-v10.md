# Upgrade to v10

<p class="description">This guide explains how to upgrade from Material UI v9 to v10.</p>

## Breaking changes

Since v10 is a new major release, it contains some changes that affect the public API.
The steps you need to take to migrate from Material UI v9 to v10 are described below.

### Minimum React version

Material UI v10 requires React 18 or later. Support for React 17 is removed.
The peer dependency range of `react`, `react-dom`, and `@types/react` is now `^18.0.0 || ^19.0.0`.

If your project uses React 17, upgrade to React 18 first.
See the [React 18 upgrade guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide).
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

### Khmer locale renamed

The Khmer locale is now exported as `kmKH` instead of `khKH`, to match the ISO 639-1 code for Khmer (`km`).

```diff
-import { khKH } from '@mui/material/locale';
+import { kmKH } from '@mui/material/locale';

-const theme = createTheme(themeOptions, khKH);
+const theme = createTheme(themeOptions, kmKH);
```

Numbers in `TablePagination` are now formatted with the `km-KH` locale.
Previously, `Intl.NumberFormat` didn't recognize `kh-KH` and fell back to the runtime's default locale.
