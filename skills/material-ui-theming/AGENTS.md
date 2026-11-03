# Material UI theming and design tokens

Version 1.0.0 (Material UI v9)

> **Version notice:** This skill targets Material UI v9 (`>=9.0.0 <10.0.0`). If you are using a different major version, verify the API details before following this guidance.

> Note: This document is for agents and LLMs implementing themes and design tokens with Material UI. Grounded in `docs/data/material/customization/` (theming, palette, dark-mode, css-theme-variables, typography, spacing, shape).

---

## Abstract

A Material UI theme is a single object of design tokens (palette, typography, spacing, shape, breakpoints, etc.) plus optional per-component defaults (`theme.components`). Apps typically call `createTheme` once (or in composed steps), pass the result to `ThemeProvider` near the root, and read values with `useTheme`, `sx`, or `styled`. For system-driven light/dark, prefer `colorSchemes` and related APIs over a static `palette.mode`-only setup when you need toggling, tab sync, and SSR-friendly behavior; enable `cssVariables` when you want `theme.vars`, fewer theme nests for dark regions, and clearer debugging via `--mui-*` CSS variables.

---

## Table of contents

1. [Core setup](#core-setup)
2. [Where tokens live (design token map)](#where-tokens-live-design-token-map)
3. [Palette quick facts](#palette-quick-facts)
4. [Color schemes vs palette-only dark](#color-schemes-vs-palette-only-dark)
5. [CSS theme variables (`cssVariables: true`)](#css-theme-variables-cssvariables-true)
6. [Typography and spacing](#typography-and-spacing)
7. [Composing and merging themes](#composing-and-merging-themes)
8. [Nesting `ThemeProvider`](#nesting-themeprovider)
9. [Custom tokens (brand-specific design keys)](#custom-tokens-brand-specific-design-keys)
10. [Windows High Contrast mode (`enhanceHighContrast`)](#windows-high-contrast-mode-enhancehighcontrast)
11. [Further reading](#further-reading)

---

## Core setup

1. `import { createTheme, ThemeProvider } from '@mui/material/styles'` (Material UI default theme).
2. Build a theme with `createTheme({ ... })`; wrap the app in `<ThemeProvider theme={theme}>` so descendants receive context.
3. Use `<CssBaseline />` inside the provider when you want baseline element styles and correct dark background behavior (see [Dark mode](https://mui.com/material-ui/customization/dark-mode.md)).

Access in components: `useTheme()` from `@mui/material/styles`.

---

## Where tokens live (design token map)

| Area          | Role                                                                                    | Doc                                                                                |
| :------------ | :-------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `palette`     | Semantic colors (`primary`, `secondary`, `error`, …), text, background, divider, action | [Palette](https://mui.com/material-ui/customization/palette.md)                    |
| `typography`  | `fontFamily`, `fontSize`, variants (`h1` through `body2`, `button`, …)                  | [Typography](https://mui.com/material-ui/customization/typography.md)              |
| `spacing`     | `theme.spacing(n)` scale (default 8px per unit)                                         | [Spacing](https://mui.com/material-ui/customization/spacing.md)                    |
| `shape`       | `borderRadius` (default 4); optional extra radii need TypeScript augmentation           | [Shape](https://mui.com/material-ui/customization/shape.md)                        |
| `breakpoints` | Responsive keys for `sx` / media queries                                                | [Breakpoints](https://mui.com/material-ui/customization/breakpoints.md)            |
| `zIndex`      | Layering tokens                                                                         | [z-index](https://mui.com/material-ui/customization/z-index.md)                    |
| `transitions` | Duration / easing helpers                                                               | [Transitions](https://mui.com/material-ui/customization/transitions.md)            |
| `components`  | `defaultProps`, `styleOverrides`, `variants` per `Mui*` key                             | [Themed components](https://mui.com/material-ui/customization/theme-components.md) |

Full defaults: [Default theme explorer](https://mui.com/material-ui/customization/default-theme.md).

---

## Palette quick facts

- Each palette color is usually `main`, `light`, `dark`, `contrastText`. Supplying `main` alone is often enough; `createTheme` can derive the rest.
- Use `@mui/material/colors` (for example `purple[500]`) for Material Design hues when building a palette.
- `palette.mode: 'dark'` forces a dark palette for the whole theme; if you use a fully custom palette with dark mode, ensure values match the mode (see [Dark mode](https://mui.com/material-ui/customization/dark-mode.md)).

---

## Color schemes vs palette-only dark

- `colorSchemes` (for example `colorSchemes: { dark: true }`) enables built-in behavior: system preference, tab sync, optional transition disable on scheme change, storage, etc. Docs recommend it over the older, narrower palette-only approach for those features.
- If both `colorSchemes` and `palette` are set, `palette` takes precedence. Avoid accidental overrides.
- `useColorScheme` reads/updates mode for toggling. `mode` can be `undefined` on the first render; handle that to avoid hydration mismatches.
- `ThemeProvider` supports `storageManager`, `disableTransitionOnChange`, `noSsr`, etc., for color-scheme UX and SSR (see [Dark mode](https://mui.com/material-ui/customization/dark-mode.md)).

---

## CSS theme variables (`cssVariables: true`)

- Set `cssVariables: true` in `createTheme` so components use `var(--mui-...)` values. Prefer `theme.vars` in style callbacks when variables are enabled (mirrors palette/typography as CSS var references). See [Usage](https://mui.com/material-ui/customization/css-theme-variables/usage.md).
- Do not pass a custom `vars` key into `createTheme`. That key is reserved and autogenerated for this feature.
- For dark-specific styles with CSS variables, use `theme.applyStyles('dark', { ... })` rather than branching on `theme.palette.mode` in ways that cause flicker (see docs warning in [Usage](https://mui.com/material-ui/customization/css-theme-variables/usage.md) and [Configuration](https://mui.com/material-ui/customization/css-theme-variables/configuration.md)).
- `InitColorSchemeScript`: place before any rendered content to prevent the initial color-scheme flash. App Router: inside `<body>` before `{children}` in `app/layout.tsx`. Pages Router: in `_document.tsx` before `<Main />`. See [Preventing SSR flickering](https://mui.com/material-ui/customization/css-theme-variables/configuration.md#preventing-ssr-flickering).
- Trade-offs: larger HTML (both schemes' variables), possible FCP impact; benefits include less JavaScript work on scheme switch and better SSR dark experience. See [Overview](https://mui.com/material-ui/customization/css-theme-variables/overview.md).
- `CssVarsProvider` is superseded by `ThemeProvider` with the same capabilities. Use `ThemeProvider`.

---

## Typography and spacing

- Typography uses `rem`; default root sizing is documented on [Typography](https://mui.com/material-ui/customization/typography.md). Adjust `typography.fontSize` or per-variant sizes as needed; `responsiveFontSizes(theme)` can scale typography across breakpoints.
- `theme.spacing(k)` follows the configured scale; `sx` spacing shorthands use the same system. Array-based `spacing` in the theme has limitations (negative / fractional / `'auto'`). Prefer a function if you need full expressiveness (see [Spacing](https://mui.com/material-ui/customization/spacing.md)).

---

## Composing and merging themes

- When one token should derive from another, build in steps: call `createTheme` with base options, then `createTheme(theme, { ... })` using the first result (see [Theming—Using theme options to define other options](https://mui.com/material-ui/customization/theming.md#theme-composition-using-theme-options-to-define-other-options)).
- Avoid relying on multiple arguments to `createTheme` for merging; only the first argument is formally processed. Deep-merge yourself (for example `deepmerge` from `@mui/utils`) and pass a single object for forward compatibility (see [Theming—createTheme(options, ...args)](https://mui.com/material-ui/customization/theming.md#createtheme-options-args-theme)).

---

## Nesting `ThemeProvider`

Inner provider overrides outer. Pass `theme={(outer) => createTheme({ ...outer, ... })}`-style functions only when intentionally extending the parent theme (see [Theming—Nesting the theme](https://mui.com/material-ui/customization/theming.md#nesting-the-theme)).

---

## Custom tokens (brand-specific design keys)

Add keys on the theme (for example `status.danger`) inside `createTheme`, then augment TypeScript with `declare module '@mui/material/styles'` on `Theme` and `ThemeOptions` (see [Theming—Custom variables](https://mui.com/material-ui/customization/theming.md#custom-variables)). For extra palette fields, follow [Palette customization](https://mui.com/material-ui/customization/palette.md) patterns.

Do not use `theme.vars` as a custom property name; it is private to CSS variables support.

---

## Windows High Contrast mode (`enhanceHighContrast`)

`enhanceHighContrast` is a theme enhancer (same pattern as `responsiveFontSizes`) that adds `@media (forced-colors: active)` overrides to MUI components, improving visibility in Windows High Contrast / Forced Colors mode.

```js
import { createTheme, enhanceHighContrast } from '@mui/material/styles';

const theme = enhanceHighContrast(createTheme());
```

- It accepts a fully-created theme and returns an enhanced copy — call it **after** `createTheme`, not inside it.
- By default it uses CSS system color keywords (`Highlight`, `HighlightText`, `ButtonBorder`, etc.).
- Override individual tokens via the second argument to align with your brand:

```js
const theme = enhanceHighContrast(createTheme(), {
  activeBackground: 'SelectedItem', // e.g. toggled/active controls
  activeText: 'SelectedItemText',
});
```

- Only pass [CSS system color keywords](https://www.w3.org/TR/css-color-4/#css-system-colors) as token values — those are the values the browser guarantees will contrast with their paired tokens.
- See [Palette—Windows High Contrast mode](https://mui.com/material-ui/customization/palette.md#windows-high-contrast-mode) for the full token list and a live demo.

---

## Further reading

| Topic                          | Link                                                                                                           |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------- |
| Theming overview & API         | [Theming](https://mui.com/material-ui/customization/theming.md)                                                |
| Dark mode & toggling           | [Dark mode](https://mui.com/material-ui/customization/dark-mode.md)                                            |
| CSS variables overview         | [CSS theme variables](https://mui.com/material-ui/customization/css-theme-variables/overview.md)               |
| Windows High Contrast mode     | [Palette—High Contrast mode](https://mui.com/material-ui/customization/palette.md#windows-high-contrast-mode)  |
| Color tool / brand hues        | [Color](https://mui.com/material-ui/customization/color.md)                                                    |
| TypeScript theme customization | [TypeScript—Customization of `Theme`](https://mui.com/material-ui/guides/typescript.md#customization-of-theme) |

TypeScript snippet templates: [reference.md](reference.md).
