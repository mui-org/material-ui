# Migrating to v5: getting started

<p class="description">This guide explains how and why to migrate from Material UI v4 to v5.</p>

## Material UI v5 migration

1. Getting started 👈 _you are here_
2. [Breaking changes part one: style and theme](/material-ui/migration/v5-style-changes/)
3. [Breaking changes part two: components](/material-ui/migration/v5-component-changes/)
4. [Migrating from JSS](/material-ui/migration/migrating-from-jss/)
5. [Troubleshooting](/material-ui/migration/troubleshooting/)

## Introduction

This is the first document in a multi-part series to walk you through upgrading your app from Material UI v4 to v5.

We highly recommend running our [codemods](#run-codemods) for efficiency—these will automatically address many of the [breaking changes](#address-breaking-changes) introduced in v5.

One of the biggest changes in v5 is the replacement of JSS for [Emotion](https://emotion.sh/docs/introduction) as a default styling solution.

Note that you may continue to use JSS for adding overrides to the components (for example `makeStyles`, `withStyles`) even after migrating to v5.
Once you've completed the rest of the v5 upgrade, we recommend progressively moving over to the new styling engine.

This process is covered in [Migrating from JSS](/material-ui/migration/migrating-from-jss/).

:::info
Need to refer back to an older version of the docs? Check out [the v4 documentation here](https://v4.mui.com/).
:::

:::info
<!-- #target-branch-reference -->

If you are using Next.js and you are not sure how to configure SSR to work with both Emotion & JSS, take a look a this [example project](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts-v4-v5-migration).
:::

## Why you should migrate

Material UI v5 includes many bug fixes and improvements over v4.

Chief among these improvements is the new styling engine, which offers significant advancements in performance when it comes to dynamic styles, as well as a more enjoyable developer experience.

Additionally, v5 is the only version that fully supports React 18, so you will need to migrate to take advantage of the latest React features.

To learn more, check out [the blog post about the release of Material UI v5](https://mui.com/blog/mui-core-v5/).

:::success
Create small commits as you go to ensure a smooth migration.

If you encounter any issues along the way, check the [Troubleshooting](/material-ui/migration/troubleshooting/) doc.

For problems not addressed there please [create an issue](https://github.com/mui/material-ui/issues/new/choose) with this title format: **[Migration] Summary of your issue**.
:::

## Supported browsers and Node versions

The targets of the default bundle have changed in v5.

The exact versions will be pinned on release from the browserslist query `"> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11, maintained node versions"`.

The default bundle supports the following minimum versions:

<!-- #stable-snapshot -->

- Node 12 (up from 8)
- Chrome 90 (up from 49)
- Edge 91 (up from 14)
- Firefox 78 (up from 52)
- Safari 14 (macOS) and 12.5 (iOS) (up from 10)
- and more (see [.browserslistrc (`stable` entry)](https://github.com/mui/material-ui/blob/v5.0.0/.browserslistrc#L11))

Material UI no longer supports IE 11.
If you need to support IE 11, check out the [legacy bundle](https://v5.mui.com/material-ui/guides/minimizing-bundle-size/#legacy-bundle).

## Update React & TypeScript version

### Update React

The minimum supported version of React has been increased from v16.8.0 to v17.0.0.

If you are using a React version below 17.0.0, update your packages to at least v4.11.2 for Material UI and v17.0.0 for React.

<codeblock storageKey="package-manager">

```bash npm
npm install @material-ui/core@^4.11.2 react@^17.0.0
```

```bash yarn
yarn upgrade @material-ui/core@^4.11.2 react@^17.0.0
```

</codeblock>

### Update TypeScript

The minimum supported version of TypeScript has been increased from v3.2 to v3.5.

:::info
We try to align with types released by [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (that is packages published on npm under the `@types` namespace).

We will not change the minimum supported version in a minor version of Material UI.
However, we generally recommend not to use a TypeScript version older than the lowest supported version of DefinitelyTyped.
:::

If your project includes these packages, you'll need to update them:

- `react-scripts`
- `@types/react`
- `@types/react-dom`

:::warning
Make sure that your application is still running without errors, and commit the changes before continuing to the next step.
:::

## Set up `ThemeProvider`

Before upgrading to v5, please make sure that `ThemeProvider` is defined at the root of your application and in tests—even if you are using the default theme—and `useStyles` is _not_ called before `ThemeProvider`.

Eventually you will want to [migrate from JSS to Emotion](/material-ui/migration/migrating-from-jss/), but in the meantime you can continue to use the older JSS-based utilities with the deprecated `@mui/styles` package.
This package requires `ThemeProvider`.

The root of your application should look something like this:

```js
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});

function App() {
  const classes = useStyles(); // ❌ If you have this, consider moving it
  // inside of a component wrapped with <ThemeProvider />
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
```

:::warning
Make sure that your application is still running without errors, and commit the changes before continuing to the next step.
:::

## Update Material UI packages

### Material UI v5 and `@mui/styles`

Install the Material UI v5 packages.

<codeblock storageKey="package-manager">
```bash npm
npm install @mui/material @mui/styles
```

```bash yarn
yarn add @mui/material @mui/styles
```

</codeblock>

If you're using `@material-ui/lab` or `@material-ui/icons`, you will need to install the new packages.

### `@material-ui/lab`

<codeblock storageKey="package-manager">
```bash npm
npm install @mui/lab
```

```bash yarn
yarn add @mui/lab
```

</codeblock>

### `@material-ui/icons`

<codeblock storageKey="package-manager">
```bash npm
npm install @mui/icons-material
```

```bash yarn
yarn add @mui/icons-material
```

</codeblock>

### Date and time pickers

The date and time picker components have been moved to MUI X.
If you are using `@material-ui/date-pickers` or the pickers in the `@mui/lab` package, you will need to migrate to `@mui/x-date-pickers`.
See [Migration from the lab](https://mui.com/x/migration/migration-pickers-lab/) for details.

### Peer dependencies

Next, add the Emotion packages.

<codeblock storageKey="package-manager">

```bash npm
npm install @emotion/react @emotion/styled
```

```bash yarn
yarn add @emotion/react @emotion/styled
```

</codeblock>

#### styled-components (optional)

If you want to use Material UI v5 with styled-components instead of Emotion, check out [the Material UI installation guide](/material-ui/getting-started/installation/).

Note that if your app uses server-side rendering (SSR), there is a [known bug](https://github.com/mui/material-ui/issues/29742) with the Babel plugin for styled-components which prevents `@mui/styled-engine-sc` (the adapter for styled-components) from being used.

We strongly recommend using the default setup with Emotion instead.

:::warning
Make sure that your application is still running without errors, and commit the changes before continuing to the next step.
:::

### Replace all imports

With the release of v5, the names of all related packages were changed from `@material-ui/*` to `@mui/*` as part of our updated branding. See [this blog post](/blog/material-ui-is-now-mui/) for details.

<details>
<summary>Updated package names</summary>

```text
@material-ui/core -> @mui/material
@material-ui/unstyled -> @mui/base
@material-ui/icons -> @mui/icons-material
@material-ui/styles -> @mui/styles
@material-ui/system -> @mui/system
@material-ui/lab -> @mui/lab
@material-ui/types -> @mui/types
@material-ui/styled-engine -> @mui/styled-engine
@material-ui/styled-engine-sc ->@mui/styled-engine-sc
@material-ui/private-theming -> @mui/private-theming
@material-ui/codemod -> @mui/codemod
@material-ui/docs -> @mui/internal-core-docs
@material-ui/envinfo -> @mui/envinfo
```

</details>

### Remove old packages

Once you've installed all the necessary packages and ensured that your app still runs, you can safely remove the old `@material-ui/*` packages by running `npm uninstall @material-ui/*` or `yarn remove @material-ui/*`.

:::success
The [preset-safe codemod](#preset-safe) (explained in more detail below) handles this automatically.
:::

## Fix CSS specificity (optional)

If you want to apply styles to components by importing a CSS file, you need to bump up the specificity to be able to target the correct components.

Consider the following example:

```js
import './style.css';
import Chip from '@mui/material/Chip';

const ChipWithGreenIcon = () => (
  <Chip
    classes={{ deleteIcon: 'green' }}
    label="delete icon is green"
    onDelete={() => {}}
  />
);
```

In this example, in order to correctly apply a particular style to the delete icon of `Chip`, one option is to increase the specificity of your CSS classes, as shown below:

```css
.MuiChip-root .green {
  color: green;
}
```

By contrast, the following CSS snippet will not apply the style to the delete icon:

```css
.green {
  color: green;
}
```

## Run codemods

The following codemods will automatically adjust the bulk of your code to account for breaking changes in v5.

Make sure that your application still runs without errors after running each codemod, and commit the changes before continuing to the next step.

### preset-safe

This codemod contains most of the transformers that are necessary for migration. It should be only applied **once per folder.**

```bash
npx @mui/codemod@latest v5.0.0/preset-safe <path>
```

:::info
If you want to run the transformers one by one, check out the [preset-safe codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#-preset-safe) for more details.
:::

### variant-prop

This codemod transforms the `<TextField/>`, `<FormControl/>`, and `<Select/>` components by applying `variant="standard"` if no variant is defined—the default variant has changed from `"standard"` in v4 to `"outlined"` in v5.

:::error
You should _not_ use this codemod if you have already defined `variant: "outlined"` as the default in the theme.
:::

```js
// ❌ if you have a theme setup like this, don't run this codemod.
// these default props can be removed later because `outlined` is the default value in v5
createMuiTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
```

If you want to keep `variant="standard"` in your components, run this codemod or else configure the corresponding default theme props.

```bash
npx @mui/codemod@latest v5.0.0/variant-prop <path>
```

For more details, check out the [variant-prop codemod README](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#variant-prop).

### link-underline-hover

This codemod transforms the `<Link />` component by applying `underline="hover"` if there is no `underline` prop defined—the default `underline` has changed from `"hover"` in v4 to `"always"` in v5.

:::error
You should _not_ use this codemod if you have already defined `underline: "always"` as the default in the theme.
:::

```js
// if you have theme setup like this, ❌ don't run this codemod.
// this default props can be removed later because `always` is the default value in v5
createMuiTheme({
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'always',
      },
    },
  },
});
```

If you want to keep `underline="hover"`, run this codemod or else configure the corresponding default theme props.

```bash
npx @mui/codemod@latest v5.0.0/link-underline-hover <path>
```

For more details, check out the [link-underline-hover codemod README](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#link-underline-hover).

## Address breaking changes

The codemods handle many of the breaking changes, but others must be addressed manually.

Whether or not you choose to use the codemods, you are now ready to move on to the first of two [breaking changes](/material-ui/migration/v5-style-changes/) documents.
