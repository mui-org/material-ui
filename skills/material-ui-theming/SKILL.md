---
name: material-ui-theming
description: Guides Material UI theming and design tokens (createTheme, ThemeProvider, palette, colorSchemes, cssVariables, theme.vars, dark mode, TypeScript augmentation). Use when building or extending a theme, toggling light/dark, or aligning tokens across an app.
license: MIT
metadata:
  author: mui
  version: '1.0.0'
---

# Material UI theming and design tokens

Agent skill for theme creation, design tokens, light/dark, and CSS theme variables. SKILL.md is the entry; AGENTS.md is the full guide.

## When to apply

- `createTheme`, `ThemeProvider`, `useTheme`, `CssBaseline`
- `colorSchemes`, `useColorScheme`, storage / SSR behavior
- `cssVariables: true`, `theme.vars`, `applyStyles('dark', …)`
- Custom theme keys and TypeScript module augmentation

## Sections in AGENTS.md

| Area          | Topics                                                          |
| :------------ | :-------------------------------------------------------------- |
| Core setup    | Imports, provider placement, `useTheme`                         |
| Token map     | palette, typography, spacing, shape, breakpoints, components, … |
| Palette       | `main` / derived colors, `@mui/material/colors`, `mode`         |
| Color schemes | vs palette-only, hydration, `ThemeProvider` props               |
| CSS variables | `cssVariables`, reserved `vars`, flicker avoidance              |
| Composition   | Multi-step `createTheme`, `deepmerge`, nesting providers        |
| Custom tokens | Augmenting `Theme` / `ThemeOptions`                             |

## Full guide

Read [AGENTS.md](./AGENTS.md) for the complete instructions and links.

TypeScript snippets: [reference.md](./reference.md).
