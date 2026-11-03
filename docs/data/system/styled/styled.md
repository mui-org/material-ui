# `styled()`

<p class="description">Utility for creating styled components.</p>

## Introduction

All Material UI components are styled with the `styled()` utility.
This utility is built on top of the `styled()` module of `@mui/styled-engine` and provides additional features.

### Import path

You can use the utility coming from the `@mui/system` package, or if you are using `@mui/material`, you can import it from `@mui/material/styles`.
The difference is in the default `theme` that is used (if no theme is available in the React context).

```ts
import { styled } from '@mui/system';
// If you are using @mui/material
import { styled } from '@mui/material/styles';
```

### What problems does it solve?

The utility can be used as a replacement for emotion's or styled-components' styled() utility.
It aims to solve the same problem, but also provides the following benefits:

1. It uses a default `theme` if no theme is available in React context.
2. It supports the theme's [`styleOverrides`](/material-ui/customization/theme-components/#theme-style-overrides) and [`variants`](/material-ui/customization/theme-components/#variants) to be applied, based on the `name` applied in the options (can be skipped).
3. It adds support for the [the `sx` prop](/system/getting-started/the-sx-prop/) on the resulting component (can be skipped).
4. It adds by default the `shouldForwardProp` option (that can be overridden), taking into account: `ownerState`, `theme`, `sx`, and `as`.

## API

### `styled(Component, [options])(styles) => Component`

#### Arguments

1. `Component`: The component that will be wrapped.
2. `options` (_object_ [optional]):
   - `options.shouldForwardProp` (_`(prop: string) => bool`_ [optional]): Indicates whether the `prop` should be forwarded to the `Component`.
   - `options.label` (_string_ [optional]): The suffix of the style sheet. Useful for debugging.
   - `options.name` (_string_ [optional]): The key used under `theme.components` for specifying `styleOverrides` and `variants`. Also used for generating the `label`.
   - `options.slot` (_string_ [optional]): If `Root`, it automatically applies the theme's `variants`.
   - `options.overridesResolver` (_(props: object, styles: Record<string, styles>) => styles_ [optional]): Function that returns styles based on the props and the `theme.components[name].styleOverrides` object.
   - `options.skipVariantsResolver` (_bool_): Disables the automatic resolver for the `theme.components[name].variants`.
   - `options.skipSx` (_bool_ [optional]): Disables the `sx` prop on the component.
   - The other keys are forwarded to the `options` argument of emotion's [`styled([Component], [options])`](https://emotion.sh/docs/styled).

3. `styles` (_object | `({ ...props, theme }) => object`_ [optional]): A styles object or a function returning a styles object.
   The function receives the theme and component's props in an object which is its single argument.

#### Returns

`Component`: The new component created.

## Basic usage

{{"component": "file://./demos/basic-usage/index.ts", "initialExpanded": true}}

## Using the theme

{{"component": "file://./demos/theme-usage/index.ts", "initialExpanded": true}}

## Custom components

This example demonstrates how you can use the `styled` API to create custom components, with the same capabilities as the core components:

{{"component": "file://./demos/using-options/index.ts", "initialExpanded": true }}

If you inspect this element with the browser DevTools in development mode, you will notice that the class of the component now ends with the `MyThemeComponent-root`, which comes from the `name` and `slot` options that were provided.

<img src="/static/images/system/styled-options.png" alt="browser DevTools showing the rendered component" width="654" height="258" style="width: 327px" />

In addition to this, the `color`, `sx`, and `variant` props are not propagated to the generated `div` element.

## Removing features

If you would like to remove some of the MUI System specific features, you can do it like this:

```diff
 const StyledComponent = styled('div', {}, {
   name: 'MuiStyled',
   slot: 'Root',
-  overridesResolver: (props, styles) => styles.root, // disables theme.components[name].styleOverrides
+  skipVariantsResolver: true, // disables theme.components[name].variants
+  skipSx: true, // disables the sx prop
 });
```

## Create custom `styled()` utility

If you want to have a different default theme for the `styled()` utility, you can create your own version of it, using the `createStyled()` utility.

```js
import { createStyled, createTheme } from '@mui/system';

const defaultTheme = createTheme({
  // your custom theme values
});

const styled = createStyled({ defaultTheme });

export default styled;
```

## Difference with the `sx` prop

The `styled` function is an extension of the `styled` utility provided by the underlying style library used – either Emotion or styled-components.
It is guaranteed that it will produce the same output as the `styled` function coming from the style library for the same input.

The [`sx`](/system/getting-started/the-sx-prop/) prop, on the other hand, is a new way of styling your components, focused on fast customization. `styled` is a function, while `sx` is a prop available on the components created with `styled`.

Therefore, you will notice the following differences:

### `sx` provides more shortcuts than `styled`

With `styled`:

```js
const MyStyledButton = styled('button')({
  mx: 1, // ❌ don't use this! This shortcut is only provided by the `sx` prop
});
```

With `sx`:

```js
import Button from '@mui/material/Button';

const MyStyledButton = (props) => (
  <Button
    sx={{
      mx: 1, // ✔️ this shortcut is specific to the `sx` prop,
    }}
  >
    {props.children}
  </Button>
);
```

### The style definition varies slightly

With `styled`:

```js
const MyStyledButton = styled('button')({
  padding: 1, // means "1px", NOT "theme.spacing(1)"
});
```

With `sx`:

```js
import Button from '@mui/material/Button';

const MyStyledButton = (props) => (
  <Button
    sx={{
      padding: 1, // means "theme.spacing(1)", NOT "1px"
    }}
  >
    {props.children}
  </Button>
);
```

### Patterns for how to use props differ

With `styled`:

```js
const MyStyledButton = styled('button')((props) => ({
  backgroundColor: props.myBackgroundColor,
}));
```

With `sx`:

```js
import Button from '@mui/material/Button';

const MyStyledButton = (props) => (
  <Button sx={{ backgroundColor: props.myCustomColor }}>{props.children}</Button>
);
```

### Parameter when using function are different for each field

With `styled` (not recommended):

```js
// You may find this syntax in the wild, but for code readability
// we recommend using only one top-level function
const MyStyledButtonPropsPerField = styled('button')({
  backgroundColor: (props) => props.myBackgroundColor,
});
```

With `sx`:

```js
import Button from '@mui/material/Button';
import { lighten } from 'polished';

const MyStyledButton = (props) => (
  <Button
    sx={{ backgroundColor: (theme) => lighten(0.2, theme.palette.primary.main) }}
  >
    {props.children}
  </Button>
);
// Note: for direct theme access without modification, you can also use a shortcut by providing the key as a string
const MyStyledButton = (props) => (
  <Button sx={{ backgroundColor: 'primary.main' }}>{props.children}</Button>
);
```

### How can I use the `sx` syntax with the `styled()` utility?

If you prefer the `sx` syntax and want to use it in both the `sx` prop and the `styled()` utility, you can use the `unstable_sx` utility from the `theme`:

{{"component": "file://./demos/using-with-sx/index.ts", "initialExpanded": true}}

The overhead added by using the `unstable_sx` utility is the same as if you were to use the `sx` prop on the component.

:::info
Note: You can use `unstable_sx` outside of the `styled()` utility, too; for example when defining `variants` in your custom theme.
:::

## How to use components selector API

If you've ever used the `styled()` API of either [`emotion`](https://emotion.sh/docs/styled#targeting-another-emotion-component) or [`styled-components`](https://styled-components.com/docs/advanced#referring-to-other-components), you should have been able to use components as selectors.

```jsx
import styled from '@emotion/styled';

const Child = styled.div`
  color: red;
`;

const Parent = styled.div`
  ${Child} {
    color: green;
  }
`;

render(
  <div>
    <Parent>
      <Child>Green because I am inside a Parent</Child>
    </Parent>
    <Child>Red because I am not inside a Parent</Child>
  </div>,
);
```

With MUI System's `styled()` utility, you can use components as selectors, too. When using `@mui/styled-engine-sc` (`styled-components`), nothing needs to be done. When using `@mui/styled-engine` (`emotion`), the default engine, there are a few steps you should perform:

First, you should install [`@emotion/babel-plugin`](https://emotion.sh/docs/@emotion/babel-plugin).

```bash
npm install @emotion/babel-plugin
```

Then, configure the plugin to know about the Material UI version of the `styled()` utility:

**babel.config.js**

```js
module.exports = {
  ...
  plugins: [
    [
      "@emotion",
      {
        importMap: {
          "@mui/system": {
            styled: {
              canonicalImport: ["@emotion/styled", "default"],
              styledBaseImport: ["@mui/system", "styled"]
            }
          },
          "@mui/material": {
            styled: {
              canonicalImport: ["@emotion/styled", "default"],
              styledBaseImport: ["@mui/material", "styled"]
            }
          },
          "@mui/material/styles": {
            styled: {
              canonicalImport: ["@emotion/styled", "default"],
              styledBaseImport: ["@mui/material/styles", "styled"]
            }
          }
        }
      }
    ]
  ]
};

```

:::info
Note: If you use [`babel-plugin-direct-import`](https://github.com/avocadowastaken/babel-plugin-direct-import), place it after `@emotion/babel-plugin` in the Babel config.
:::

Now you should be able to use components as your selectors!
