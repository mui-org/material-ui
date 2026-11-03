# Migrating to Pigment CSS

<p class="description">This guide helps you integrate Pigment CSS with Material UI.</p>

:::warning
Pigment CSS is currently in the early alpha stage of development. We're actively working on improving its performance and stability. If you find any problem, please open a [GitHub issue](https://github.com/mui/pigment-css/issues).
:::

Before going through this guide, make sure you have [upgraded to Material UI v7](/material-ui/migration/upgrade-to-v7/) (or [v6](/material-ui/migration/upgrade-to-v6/)).

## Introduction

The default styling engine of Material UI is [Emotion](https://emotion.sh/docs/introduction).
It lets you write styles in a CSS-in-JS fashion, which is great for dynamic styles that depend on states and props. However, it has some performance drawbacks when it comes to frequent re-renders because the style recalculation happens on the client-side.
It also does not fully support [React Server Components](https://react.dev/reference/rsc/server-components), a new rendering paradigm that renders components ahead of time on the server.

Pigment CSS aims to solve these problems while keeping the same developer experience of writing styles in a CSS-in-JS fashion.
It can work alongside Emotion to ease the migration process, but it is recommended to fully migrate to Pigment CSS in the end.

## Supported frameworks

Pigment CSS can be used with one of the following frameworks:

- [Next.js App Router](https://nextjs.org/docs/app) with webpack v5 (Turbopack is not supported yet)
- [Vite](https://vite.dev/)

## Installation

First, install the Material UI wrapper package for Pigment CSS:

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material-pigment-css @pigment-css/react
```

```bash pnpm
pnpm add @mui/material-pigment-css @pigment-css/react
```

```bash yarn
yarn add @mui/material-pigment-css @pigment-css/react
```

</codeblock>

Then, follow the instructions based on your framework:

### Next.js

Install the Next.js plugin as a dev dependency:

<codeblock storageKey="package-manager">

```bash npm
npm install --save-dev @pigment-css/nextjs-plugin
```

```bash pnpm
pnpm add -D @pigment-css/nextjs-plugin
```

```bash yarn
yarn add -D @pigment-css/nextjs-plugin
```

</codeblock>

Then, open Next.js config file and add the plugin:

<codeblock>

```js next.config.mjs
import { withPigment } from '@pigment-css/nextjs-plugin';

const nextConfig = {
  // ...Your nextjs config.
};

/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
const pigmentConfig = {
  transformLibraries: ['@mui/material'],
};

export default withPigment(nextConfig, pigmentConfig);
```

```js next.config.js
const { withPigment } = require('@pigment-css/nextjs-plugin');

const nextConfig = {
  // ...Your nextjs config.
};

/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
const pigmentConfig = {
  transformLibraries: ['@mui/material'],
};

module.exports = withPigment(nextConfig, pigmentConfig);
```

</codeblock>

Finally, import the stylesheet at the top of the layout file.

```diff title="app/layout.(js|tsx)"
 import type { Metadata } from 'next';
 import { Inter } from 'next/font/google';

+import '@mui/material-pigment-css/styles.css';

 export default function RootLayout(props) {
   return (
     <html lang="en">
       <body className={`${inter.className}`}>
         {props.children}
       </body>
     </html>
   );
 }
```

### Vite

Install the Vite plugin as a dev dependency:

<codeblock storageKey="package-manager">

```bash npm
npm install --save-dev @pigment-css/vite-plugin
```

```bash yarn
yarn add -D @pigment-css/vite-plugin
```

</codeblock>

Next, open the Vite config file (usually named `vite.config.mjs` or `vite.config.js`) and add the plugin:

```js
import { defineConfig } from 'vite';
import { pigment } from '@pigment-css/vite-plugin';

/**
 * @type {import('@pigment-css/vite-plugin').PigmentOptions}
 */
const pigmentConfig = {
  transformLibraries: ['@mui/material'],
};

export default defineConfig({
  plugins: [
    pigment(pigmentConfig),
    // ... Your other plugins.
  ],
});
```

:::warning
There is [a known issue with pnpm](https://github.com/mui/pigment-css/issues/176) that currently prevents the plugin from working correctly with this package manager.
Until it's resolved, you must use npm or yarn instead.
:::

Finally, add the Pigment CSS stylesheet to the top of the main file.

```diff title="src/main.(js|tsx)"
 import * as React from 'react';
+import '@mui/material-pigment-css/styles.css';
 import App from './App';

 ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
     <App />
   </React.StrictMode>,
 );
```

## Configuring the theme

Integrating Pigment CSS with Material UI requires you to configure the theme to the plugin.
Add the following code to your [Next.js](#next-js) or [Vite](#vite) config file:

```diff
+import { createTheme } from '@mui/material';

 const pigmentConfig = {
   transformLibraries: ['@mui/material'],
+  theme: createTheme({
+    cssVariables: true,
+    /* other parameters, if any */
+  }),
 };
```

If you have a custom theme, follow the [theme migration instructions](#migrating-custom-theme) next.
Otherwise you're now ready to start the development server:

<codeblock storageKey="package-manager">

```bash npm
npm run dev
```

```bash pnpm
pnpm dev
```

```bash yarn
yarn dev
```

</codeblock>

Open the browser and navigate to the localhost URL, you should see the app running with Pigment CSS.

### Next.js font optimization

If you are using `next/font` to optimize font loading, pass a CSS variable name to the `variable` property of the font configuration and use it in the body className:

```diff title="app/layout.tsx"
 import { Roboto } from 'next/font/google';

 const roboto = Roboto({
   weight: ['300', '400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
+  variable: '--my-font-family',
 });

 export default function RootLayout(props) {
   const { children } = props;
   return (
     <html lang="en">
+      <body className={roboto.variable}>
          {children}
       </body>
     </html>
   );
 }
```

Finally, update the `typography.fontFamily` value with the variable created in the previous step:

```diff title="next.config.mjs"
 const pigmentConfig = {
   transformLibraries: ['@mui/material'],
   theme: createTheme({
+    typography: {
+      fontFamily: 'var(--my-font-family)',
+    },
   }),
 };
```

### TypeScript

If you are using TypeScript, you need to extend the Pigment CSS theme types with Material UI `Theme`.
Add the following code to a file that is included in your `tsconfig.json`:

```ts
// e.g. App.tsx
import { Theme } from '@mui/material/styles';

declare module '@mui/material-pigment-css' {
  interface ThemeArgs {
    theme: Theme;
  }
}
```

Then, verify that the types is correctly picked up by Pigment CSS with the following code:

```ts
// e.g. App.tsx
import { styled } from '@mui/material-pigment-css';

const TestThemeTypes = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
}));
```

You should see no TypeScript errors in your editor. Finally, remove the test code.

## How it works

When a Pigment CSS plugin is configured through a framework bundler, it intercepts the styling APIs that Material UI uses and replaces them with those from Pigment CSS instead. Pigment CSS then extracts the styles at build time and injects them into the stylesheet.

If you come from Material UI v5, using Pigment CSS will be a paradigm shift in terms of writing styles.
Since Pigment CSS is a build-time extraction tool, it does not support dynamic styles that depend on runtime variables.
For example, Pigment CSS will throw an error for styles that depend on a state like the one below:

```js
import Card from '@mui/material/Card';

function App() {
  const [color, setColor] = useState('#000000');

  return (
    <Card
      sx={{
        color, // ❌ Pigment CSS cannot extract this style.
      }}
    />
  );
}
```

We recommend reading the rest of the guide below to learn about the new styling paradigm and patterns for creating dynamic styles.

## Migrating custom theme

### Removing owner state

Since Pigment CSS is a build-time extraction tool, it does not support owner state through callbacks. Here is an example that will throw an error at build time:

```js
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          color: ({ ownerState }) => ({
            // ❌ Pigment CSS cannot extract this style.
            ...(ownerState.variant === 'outlined' && {
              borderWidth: 3,
            }),
          }),
        },
      },
    },
  },
});
```

Run the following codemod to remove the owner state from the theme:

```bash
npx @mui/codemod@latest v6.0.0/theme-v6 next.config.mjs
```

There are cases where the codemod is not able to remove the owner state. In such cases, you have to manually replace the owner state with `variants`.

#### Dynamic color based on palette

If you have a dynamic color based on the theme palette, you can use the `variants` property to define the styles for each palette.

<codeblock>

```js before
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          color: theme.palette[ownerState.palette]?.main,
        }),
      },
    },
  },
});
```

```js after
const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          variants: [
            ...Object.entries(theme.palette)
              .filter(([, palette]) => palette && palette.main)
              .map(([palette, { main }]) => ({
                props: { palette },
                style: {
                  color: main,
                },
              })),
          ],
        }),
      },
    },
  },
});
```

</codeblock>

### Default props provider

Use `DefaultPropsProvider` in your main application file and move all the component default props to it:

<codeblock>

```diff next.config|vite.config
 import { createTheme } from '@mui/material';

 const customTheme = createTheme({
   // ...other tokens.
   components: {
     MuiButtonBase: {
-      defaultProps: {
-        disableRipple: true,
-      },
     },
     MuiSelect: {
-      defaultProps: {
-        IconComponent: DropdownIcon,
-      },
     }
   }
 });
```

```diff App.tsx
+ import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';

  function App() {
    return (
+     <DefaultPropsProvider value={{
+       MuiButtonBase: {
+         disableRipple: true,
+       },
+       MuiSelect: {
+         IconComponent: DropdownIcon,
+       },
+     }}>
        {/* Your app */}
+     </DefaultPropsProvider>
    );
  }
```

</codeblock>

## Migrating dynamic styles

### sx prop

Run the following codemod:

```bash
npx @mui/codemod@latest v6.0.0/sx-prop path/to/folder
```

The scenarios below are not covered by the codemod, so you have to manually update them:

<!-- Add manual case -->

#### Dynamic values

If a value depends on a variable, you need to move it to a CSS variable inside inline styles.

<codeblock>

```js before
<div>
  {items.map((item, index) => (
    <Box
      key={index}
      sx={{
        borderRadius: '50%',
        width: `max(${6 - index}px, 3px)`,
        height: `max(${6 - index}px, 3px)`,
        bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
      }}
    />
  ))}
</div>
```

```js after
<div>
  {items.map((item, index) => (
    <Box
      key={index}
      sx={{
        borderRadius: '50%',
        width: `max(6px - var(--offset), 3px)`,
        height: `max(6px - var(--offset), 3px)`,
        bgcolor: `var(--bg)`,
      }}
      style={{
        '--offset': `${index}px`,
        '--bg':
          index === 0
            ? 'var(--mui-palette-primary-solidBg)'
            : 'var(--mui-palette-background-level3)',
      }}
    />
  ))}
</div>
```

</codeblock>

#### Custom components

With Pigment CSS, any JSX element can accept the `sx` prop so it is **no** longer needed to pass down the `sx` prop to Material UI components.

```diff
 import ButtonBase from '@mui/material/ButtonBase';

 function ActiveButton({ sx, ...props }) {
   return (
     <ButtonBase
       sx={[
         {
           '&:active': {
             opacity: 0.5,
           },
         },
-        ...Array.isArray(sx) ? sx : [sx],
       ]}
       {...props}
     />
   );
 }
```

### styled

If you have custom components that are using `styled` from `@mui/material/styles`, change the import source to `@mui/material-pigment-css`:

```diff
-import { styled } from '@mui/material/styles';
+import { styled } from '@mui/material-pigment-css';
```

Then, run the following codemod:

```bash
npx @mui/codemod@latest v6.0.0/styled path/to/folder
```

The scenarios below are not covered by the codemod, so you have to manually update them:

#### Dynamic styles based on props

If you have dynamic styles based on props, you need to move them to CSS variables. You will need to create a wrapper component to set the inline style with the CSS variables.

<codeblock>

```js before
const FlashCode = styled('div')(
  ({ theme, startLine = 0, endLine = startLine, lineHeight = '0.75rem' }) => ({
    top: `calc(${lineHeight} * 1.5 * ${startLine})`,
    height: `calc(${lineHeight} * 1.5 * ${endLine - startLine + 1})`,
    ...theme.typography.caption,
  }),
);

export default FlashCode;
```

```js after
const FlashCodeRoot = styled('div')(({ theme }) => ({
  top: `calc(var(--Flashcode-lineHeight) * 1.5 * var(--Flashcode-startLine))`,
  height: `calc(var(--Flashcode-lineHeight) * 1.5 * (var(--Flashcode-endLine) - var(--Flashcode-startLine) + 1))`,
  ...theme.typography.caption,
}));

const FlashCode = React.forwardRef(function FlashCode(props, ref) {
  const {
    children,
    startLine = 0,
    endLine = startLine,
    lineHeight = '0.75rem',
    ...other
  } = props;

  return (
    <FlashCodeRoot
      ref={ref}
      {...other}
      style={{
        '--Flashcode-lineHeight': lineHeight,
        '--Flashcode-startLine': startLine,
        '--Flashcode-endLine': endLine,
        ...other.style,
      }}
    >
      {children}
    </FlashCodeRoot>
  );
});

export default FlashCode;
```

</codeblock>

## Migrating layout components

To use layout components that are compatible with Pigment CSS, replace the following components with those from the adapter package:

```diff
-import Container from '@mui/material/Container';
+import Container from '@mui/material-pigment-css/Container';

-import Grid from '@mui/material/Grid';
+import Grid from '@mui/material-pigment-css/Grid';

-import Stack from '@mui/material/Stack';
+import Stack from '@mui/material-pigment-css/Stack';

-import Hidden from '@mui/material/Hidden';
+import Hidden from '@mui/material-pigment-css/Hidden';
```

:::info
`Grid` component from `@mui/material-pigment-css/Grid` has a different behavior compared to the default `Grid` component.
It uses CSS `gap` instead of `margin` for spacing between items.
:::

## Migrating Box component

Choose one of the following approaches:

### Continue using Box

Replace the `Box` component with the one from the adapter package:

```diff
-import Box from '@mui/material/Box';
+import Box from '@mui/material-pigment-css/Box';
```

### Use HTML element

Pigment CSS can extract the `sx` prop from any JSX element, so there is no need to use the Box component.

```diff
-import Box from '@mui/material/Box';

 function CustomCard() {
   return (
-    <Box sx={{ display: 'flex' }}>
-      <Box component="img" src="..." sx={{ width: 24, height: 24 }}>
-      ...
-    </Box>
+    <div sx={{ display: 'flex' }}>
+      <img src="..." sx={{ width: 24, height: 24 }}>
+      ...
+    </div>
   );
 }
```

For **TypeScript** users, you need to extend the `HTMLAttributes` interface to support the `sx` prop. Add the following code to a file that is included in your `tsconfig.json`:

```ts
import type { Theme, SxProps } from '@mui/material/styles';

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?: SxProps<Theme>;
    }
    interface SVGProps<T> {
      sx?: SxProps<Theme>;
    }
  }
}
```

## Migrate useTheme hook

If you are using the `useTheme` hook, replace the import source:

```diff
-import { useTheme } from '@mui/material/styles';
+import { useTheme } from '@mui/material-pigment-css';
```

:::info
For Next.js App Router, `useTheme` hook only works with React Client Components.
You need to add `'use client'` directive to the component that uses the hook.
:::

## Right-to-left support

Update the config file with the following code to enable right-to-left support:

```diff
 const pigmentConfig = {
   theme: createTheme(),
+  css: {
+    // Specify your default CSS authoring direction
+    defaultDirection: 'ltr',
+    // Generate CSS for the opposite of the `defaultDirection`
+    // This is set to `false` by default
+    generateForBothDir: true,
+  },
 }
```

### Migrating from theme direction

If you are using the `theme.direction` in your component, wrap your application with `RtlProvider` and use the `useRtl` hook to get the direction instead:

<codeblock>

```diff app.tsx
+ import RtlProvider from '@mui/material-pigment-css/RtlProvider';

 function App() {
+  const [rtl, setRtl] = React.useState(false);
   return (
+    <RtlProvider value={rtl}>
       {/* Your app */}
+    </RtlProvider>
   )
 }
```

```diff component.tsx
- import { useTheme } from '@mui/material/styles';
+ import { useRtl } from '@mui/material-pigment-css/RtlProvider';

 function App() {
-  const theme = useTheme();
+  const isRtl = useRtl();

   return (
     <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
       <IconButton aria-label="previous">
-        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
+        {isRtl ? <SkipNextIcon /> : <SkipPreviousIcon />}
       </IconButton>
       <IconButton aria-label="play/pause">
         <PlayArrowIcon sx={{ height: 38, width: 38 }} />
       </IconButton>
       <IconButton aria-label="next">
-        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
+        {isRtl ? <SkipPreviousIcon /> : <SkipNextIcon />}
       </IconButton>
     </Box>
   );
 }

```

</codeblock>
