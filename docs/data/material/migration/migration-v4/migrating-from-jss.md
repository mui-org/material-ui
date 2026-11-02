# Migrating from JSS (optional)

<p class="description">This guide explains how to migrate from JSS to Emotion when updating from Material UI v4 to v5.</p>

## Material UI v5 migration

1. [Getting started](/material-ui/migration/migration-v4/)
2. [Breaking changes part one: style and theme](/material-ui/migration/v5-style-changes/)
3. [Breaking changes part two: components](/material-ui/migration/v5-component-changes/)
4. Migrating from JSS 👈 _you are here_
5. [Troubleshooting](/material-ui/migration/troubleshooting/)

## Migrating from JSS to Emotion

One of the biggest changes in v5 is the replacement of JSS with [Emotion](https://emotion.sh/docs/introduction) (or [styled-components](https://styled-components.com/) as an alternative) as a default styling solution.

Note that you may continue to use JSS for adding overrides for the components (for example `makeStyles`, `withStyles`) even after migrating to v5.
Then, if at any point you want to move over to the new styling engine, you can refactor your components progressively.

:::info
<!-- #target-branch-reference -->

If you are using Next.js and you are not sure how to configure SSR to work with both Emotion & JSS, take a look at this [example project](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts-v4-v5-migration).
:::

This document reviews all the steps necessary to migrate away from JSS.

While you can use either of the following two options, the first is considered preferable:

### 1. Use styled or sx API

#### Codemod

We provide [a codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#jss-to-styled) to help migrate JSS styles to `styled` API, but this approach increases the CSS specificity.

:::info
Normally you wouldn't write styles like this.
But this is the best transformation that we could create with a codemod.

If you want to refine them later, you can refer to the examples shown in the sections below.
:::

```bash
npx @mui/codemod@latest v5.0.0/jss-to-styled <path>
```

Example transformation:

```diff
 import Typography from '@mui/material/Typography';
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

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
+const Root = styled('div')(({ theme }) => ({
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
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
+    <Root className={classes.root}>
       {/* The benefit of this approach is that the code inside Root stays the same. */}
       <Typography className={classes.content}>...</Typography>
       <Button className={classes.cta}>Go</Button>
-    </div>
+    </Root>
   )
 }
```

:::success
You should run this codemod on a small chunk of files and then check the changes before continuing, because in some cases you might need to adjust the code after the transformation—this codemod won't cover all cases.
:::

#### Manual

We recommend `sx` API over `styled` for creating responsive styles or overriding minor CSS.
[Read more about `sx` here](/system/getting-started/the-sx-prop/).

```diff
 import Chip from '@mui/material/Chip';
-import makeStyles from '@mui/styles/makeStyles';
+import Box from '@mui/material/Box';

-const useStyles = makeStyles((theme) => ({
-  wrapper: {
-    display: 'flex',
-  },
-  chip: {
-    padding: theme.spacing(1, 1.5),
-    boxShadow: theme.shadows[1],
-  }
-}));

 function App() {
-  const classes = useStyles();
   return (
-    <div className={classes.wrapper}>
-      <Chip className={classes.chip} label="Chip" />
-    </div>
+    <Box sx={{ display: 'flex' }}>
+      <Chip label="Chip" sx={{ py: 1, px: 1.5, boxShadow: 1 }} />
+    </Box>
   );
 }
```

In some cases, you might want to create multiple styled components in a file instead of increasing CSS specificity.

For example:

```diff
-import makeStyles from '@mui/styles/makeStyles';
+import { styled } from '@mui/material/styles';

-const useStyles = makeStyles((theme) => ({
-  root: {
-    display: 'flex',
-    alignItems: 'center',
-    borderRadius: 20,
-    background: theme.palette.grey[50],
-  },
-  label: {
-    color: theme.palette.primary.main,
-  }
-}))
+const Root = styled('div')(({ theme }) => ({
+  display: 'flex',
+  alignItems: 'center',
+  borderRadius: 20,
+  background: theme.palette.grey[50],
+}))

+const Label = styled('span')(({ theme }) => ({
+  color: theme.palette.primary.main,
+}))

 function Status({ label }) {
-  const classes = useStyles();
   return (
-    <div className={classes.root}>
-      {icon}
-      <span className={classes.label}>{label}</span>
-    </div>
+    <Root>
+      {icon}
+      <Label>{label}</Label>
+    </Root>
   )
 }
```

:::success
[This jss-to-styled tool](https://siriwatk.dev/tool/jss-to-styled) helps convert JSS to multiple styled components without increasing CSS specificity.

This tool is _not_ maintained by MUI.
:::

### 2. Use [tss-react](https://github.com/garronej/tss-react)

:::error
This API will not work if you are [using `styled-components` as the underlying styling engine in place of `@emotion`](/material-ui/integrations/interoperability/#styled-components).
:::

The API is similar to JSS `makeStyles`, but under the hood, it uses `@emotion/react`.
It also features much better TypeScript support than v4's `makeStyles`.

In order to use it, you'll need to add it to your project's dependencies:

With npm:

```bash
npm install tss-react
```

With yarn:

```bash
yarn add tss-react
```

#### Codemod

We provide [a codemod](https://github.com/mui/material-ui/blob/master/packages/mui-codemod/README.md#jss-to-tss-react) to help migrate JSS styles to the `tss-react` API.

```bash
npx @mui/codemod@latest v5.0.0/jss-to-tss-react <path>
```

Example transformation:

```diff
 import * as React from 'react';
-import makeStyles from '@material-ui/styles/makeStyles';
+import { makeStyles } from 'tss-react/mui';
 import Button from '@mui/material/Button';
 import Link from '@mui/material/Link';

-const useStyles = makeStyles((theme) => {
+const useStyles = makeStyles()((theme) => {
   return {
     root: {
       color: theme.palette.primary.main,
     },
     apply: {
       marginRight: theme.spacing(2),
     },
   };
 });

 function Apply() {
-  const classes = useStyles();
+  const { classes } = useStyles();

   return (
     <div className={classes.root}>
       <Button component={Link} to="https://support.mui.com" className={classes.apply}>
         Apply now
       </Button>
     </div>
   );
 }

 export default Apply;
```

If you were using the `$` syntax and `clsx` to combine multiple CSS classes,
the transformation would look like this:

```diff
 import * as React from 'react';
-import { makeStyles } from '@material-ui/core/styles';
-import clsx from 'clsx';
+import { makeStyles } from 'tss-react/mui';

-const useStyles = makeStyles((theme) => ({
+const useStyles = makeStyles<void, 'child' | 'small'>()((theme, _params, classes) => ({
   parent: {
     padding: 30,
-    '&:hover $child': {
+    [`&:hover .${classes.child}`]: {
       backgroundColor: 'red',
     },
   },
   small: {},
   child: {
     backgroundColor: 'blue',
     height: 50,
-    '&$small': {
+    [`&.${classes.small}`]: {
       backgroundColor: 'lightblue',
       height: 30
     }
   },
 }));

 function App() {
-  const classes = useStyles();
+  const { classes, cx } = useStyles();
   return (
     <div className={classes.parent}>
       <div className={classes.child}>
         Background turns red when the mouse hovers over the parent.
       </div>
-      <div className={clsx(classes.child, classes.small)}>
+      <div className={cx(classes.child, classes.small)}>
         Background turns red when the mouse hovers over the parent.
         I am smaller than the other child.
       </div>
     </div>
   );
 }

 export default App;
```

:::error
When using JavaScript (rather than TypeScript), remove `<void, 'child' | 'small'>`.
:::

The following is a comprehensive example using the `$` syntax, `useStyles()` parameters, merging in classes from a `classes` prop ([see doc](https://docs.tss-react.dev/your-own-classes-prop)) and [an explicit name for the stylesheet](https://docs.tss-react.dev/api/makestyles#naming-the-stylesheets-useful-for-debugging-and-theme-style-overrides).

```diff
-import clsx from 'clsx';
-import { makeStyles, createStyles } from '@material-ui/core/styles';
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

After running the codemod, search your code for "TODO jss-to-tss-react codemod" to find cases that the codemod could not handle reliably.

There may be other cases beyond those with TODO comments that are not handled fully by the codemod—particularly if parts of the styles are returned by functions.

If the styles buried within a function use the `$` syntax or `useStyles` params, then those styles won't be migrated appropriately.

:::error
You should drop [`clsx`](https://www.npmjs.com/package/clsx) in favor of [`cx`](https://emotion.sh/docs/@emotion/css#cx).

The key advantage of `cx` is that it detects Emotion-generated class names to ensure that styles are overwritten in the correct order.

The default precedence of styles from multiple CSS classes is different between JSS and tss-react and some manual re-ordering of `cx` parameters
may be necessary—see [this issue comment](https://github.com/mui/material-ui/pull/31802#issuecomment-1093478971) for more details.
:::

To ensure that your class names always includes the actual name of your components, you can provide the `name` as an implicitly named key (`name: { App }`).

See [this tss-react doc](https://docs.tss-react.dev/api/makestyles#naming-the-stylesheets-useful-for-debugging-and-theme-style-overrides) for details.

You may end up with ESLint warnings [like this one](https://user-images.githubusercontent.com/6702424/148657837-eae48942-fb86-4516-abe4-5dc10f44f0be.png) if you deconstruct more than one item.

Don't hesitate to disable `eslint(prefer-const)`, [like this](https://github.com/thieryw/gitlanding/blob/b2b0c71d95cfd353979c86dfcfa1646ef1665043/.eslintrc.js#L17) in a regular project.

#### withStyles()

`tss-react` also features a [type-safe implementation](https://docs.tss-react.dev/api/withstyles) of [v4's `withStyles()`](https://v4.mui.com/styles/api/#withstyles-styles-options-higher-order-component).

:::info
The equivalent of the `$` syntax is also supported in tss's `withStyles()`.
[See doc](https://docs.tss-react.dev/nested-selectors#withstyles).
:::

```diff
-import Button from '@material-ui/core/Button';
+import Button from '@mui/material/Button';
-import withStyles from '@material-ui/styles/withStyles';
+import { withStyles } from 'tss-react/mui';

 const MyCustomButton = withStyles(
+  Button,
   (theme) => ({
     root: {
       minHeight: '30px',
     },
     textPrimary: {
       color: theme.palette.text.primary,
     },
     '@media (min-width: 960px)': {
       textPrimary: {
         fontWeight: 'bold',
       },
     },
   }),
-)(Button);
+);

 export default MyCustomButton;
```

#### Theme style overrides

[Global theme overrides](https://v4.mui.com/customization/components/#global-theme-override) are supported out of the box by TSS.

Follow the instructions in the relevant section of the [Breaking changes](/material-ui/migration/v5-style-changes/#restructure-component-definitions) doc, and [provide a `name` to `makeStyles`](https://docs.tss-react.dev/api/makestyles#naming-the-stylesheets-useful-for-debugging-and-theme-style-overrides).

In Material UI v5, [style overrides also accept callbacks](https://mui.com/material-ui/customization/theme-components/).

By default, TSS is only able to provide the theme.
If you want to provide the props and the `ownerState`, [please refer to this documentation](https://docs.tss-react.dev/mui-global-styleoverrides).

:::warning
tss-react is _not_ maintained by MUI.

If you have any question about how to setup SSR (Next.js), or if you are wondering
how to customize the `theme` object, please refer to the [tss-react documentation](https://github.com/garronej/tss-react#mui-integration).

You can also [submit an issue](https://github.com/garronej/tss-react/issues/new) for any bug or feature request, and [start a discussion](https://github.com/garronej/tss-react/discussions) if you need help.
:::

## Complete the migration

Once you migrate all of the styling, remove unnecessary `@mui/styles` by uninstalling the package.

With npm:

```bash
npm uninstall @mui/styles
```

With yarn:

```bash
yarn remove @mui/styles
```

:::warning
`@emotion/styled` is a peer dependency of `@mui/material`.
You must keep it in your dependencies even if you never explicitly use it.
:::
