# Material UI theming: reference snippets

## Custom theme property (TypeScript)

After adding a key in `createTheme`, augment both `Theme` and `ThemeOptions`:

```ts
declare module '@mui/material/styles' {
  interface Theme {
    status: { danger: string };
  }
  interface ThemeOptions {
    status?: { danger?: string };
  }
}
```

Source pattern: [Theming—Custom variables](https://mui.com/material-ui/customization/theming.md#custom-variables).

## Extra `shape` keys (TypeScript)

New shape properties require augmenting `Shape` and `ShapeOptions`. See [Shape—TypeScript](https://mui.com/material-ui/customization/shape.md#typescript).

## `theme.vars` typings (CSS variables)

Typings for `theme.vars` are not enabled by default. Follow [CSS theme variables—TypeScript](https://mui.com/material-ui/customization/css-theme-variables/usage.md#typescript).

## Fallback when rendering outside `ThemeProvider`

```js
backgroundColor: (theme.vars || theme).palette.primary.main;
```

Use when a component might run outside the provider. From [CSS theme variables—Usage](https://mui.com/material-ui/customization/css-theme-variables/usage.md).
