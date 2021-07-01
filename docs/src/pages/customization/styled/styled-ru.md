# `styled()`

<p class="description">Utility for creating styled components.</p>

## Вступление

All the Material-UI components are styled with the `styled()` utility from `@material-ui/core/styles`. This utility is built on top of the `styled()` module of [`@material-ui/styled-engine`](/guides/styled-engine/) and provides additional features.

## What problems does it solve?

The utility can be used as a replacement for emotion's or styled-components' styled() utility. It aims to solve the same problem, but also provides the following benefits:

1. It uses Material-UI's default `theme` if no theme is available in React context.
2. It supports the theme's [`styleOverrides`](/customization/theme-components/#global-style-overrides) and [`variants`](/customization/theme-components/#adding-new-component-variants) to be applied, based on the `name` applied in the options (can be skipped).
3. It adds support for the [the `sx` prop](/system/basics/#the-sx-prop) (can be skipped).
4. It adds by default `shouldForwardProp` option that is taking into account all props used internally in the Material-UI components (can be overridden).

## API

### `styled(Component, [options])(styles) => Component`

#### Аргументы

1. `Component`: The component that will be wrapped.
2. `options` (_object_ [optional]):

   - `options.shouldForwardProp` (_`(props: string) => bool`_ [optional]): Indicates whether the `prop` should be forwarded to the `Component`.
   - `options.label` (_string_ [optional]): The suffix of the style sheet. Полезно для отладки.
   - `options.name` (_string_ [optional]): The key used under `theme.components` for specifying `styleOverrides` and `variants`. Also used for generating the `label`.
   - `options.slot` (_string_ [optional]): If `Root`, it automatically applies the theme's `styleOverrides` & `variants`.
   - `options.overridesResolver` (_(props: object, styles: Record<string, styles>) => styles_ [optional]): Function that returns styles based on the props and the `theme.components[name]styleOverrides` object.
   - `options.skipVariantsResolver` (_bool_): Disables the automatic resolver for the `theme.components[name].variants`.
   - `options.skipSx` (_bool_ [optional]): Disables the `sx` prop on the component.
   - The other keys are forwarded to the `options` argument of emotion's [`styled([Component], [options])`](https://emotion.sh/docs/styled).

#### Возвращает

`Component`: The new component created.

## Basic Usage (Основное использование)

{{"demo": "pages/customization/styled/BasicUsage.js", "defaultCodeOpen": true}}

## Using the theme

{{"demo": "pages/customization/styled/ThemeUsage.js", "defaultCodeOpen": true}}

## Custom components

This example demonstrates how you can use the `styled` API to create custom components, with the same capabilities as the core components:

{{"demo": "pages/customization/styled/UsingOptions.js", "defaultCodeOpen": true }}

If you inspect this element with the browser DevTools, you will notice that the class of the component now ends with the `MyTestComponent-root`, which comes from the `name` and `slot` options that were provided. In addition to this, the `color` and `variant` props are not propagated to the generated `div` element.

<img src="/static/images/customization/styled-options.png" alt="Developer tools showing the rendered component" width="312" />

## Removing features

If you would like to remove some of the Material-UI specific features, you can do it like this:

```diff
const StyledComponent = styled('div', {}, {
   name: 'MuiStyled',
   slot: 'Root',
-  overridesResolver: (props, styles) => styles.root, // disables theme.components[name].styleOverrides
+  skipVariantsResolver: true, // disable theme.components[name].variants
+  skipSx: true, // disable the sx prop
})
```
