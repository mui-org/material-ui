# Material UI + Tailwind CSS: reference

## Layer order (v4)

```css
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

Pages Router + GlobalStyles (first child of `AppCacheProvider`):

```jsx
<GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
```

## VS Code `settings.json` (IntelliSense for `slotProps`)

```json
{
  "tailwindCSS.experimental.classRegex": [["className\\s*:\\s*['\"]([^'\"]*)['\"]"]]
}
```

From [Tailwind CSS v4 integration—Tailwind CSS IntelliSense for VS Code](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#tailwind-css-intellisense-for-vs-code).

## v3 `tailwind.config.js` sketch

```js
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: '#__next', // or '#root' for Vite
  // ...
};
```

See [Interoperability—Tailwind CSS v3](https://mui.com/material-ui/integrations/interoperability.md#tailwind-css-v3).

## Related skills

- material-ui-nextjs: `AppRouterCacheProvider`, `enableCssLayer`, Pages `emotionCache`
- material-ui-theming: `cssVariables: true` for `--mui-*` token bridging
