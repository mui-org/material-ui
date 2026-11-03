# Material UI and Next.js

Version 1.0.0 (Material UI v9)

> **Version notice:** This skill targets Material UI v9 (`>=9.0.0 <10.0.0`). If you are using a different major version, verify the API details before following this guidance.

> Note: This document is for agents and LLMs integrating Material UI with Next.js. Source: `docs/data/material/integrations/nextjs/nextjs.md` and related integration docs in this repository.

---

## Abstract

Material UI uses Emotion for styles. On Next.js you must wire an Emotion cache so SSR and streaming produce correct CSS (prefer injecting styles into `head` instead of only `body`). The `@mui/material-nextjs` package supplies `AppRouterCacheProvider` (App Router) and `AppCacheProvider` / `DocumentHeadTags` (Pages Router). Material UI components ship as client components (`"use client"`); they still SSR but are not React Server Components. Match the package import suffix (for example `v15-appRouter`) to your Next.js major version.

---

## Table of contents

1. [App Router (recommended)](#app-router-recommended)
2. [Pages Router](#pages-router)
3. [Fonts (`next/font`)](#fonts-nextfont) — Roboto vs custom fonts
4. [CSS theme variables and SSR](#css-theme-variables-and-ssr)
5. [Other styling stacks (CSS layers)](#other-styling-stacks-css-layers)
6. [Next.js Link and `component` prop](#nextjs-link-and-component-prop)
7. [Further reading](#further-reading)

---

## App Router (recommended)

### Dependencies

Have `@mui/material` and `next` installed, then add:

- `@mui/material-nextjs`
- `@emotion/cache`

Example: `pnpm add @mui/material-nextjs @emotion/cache`

### Root layout

In `app/layout.tsx`, wrap everything under `<body>` with `AppRouterCacheProvider` from the entry that matches your Next major, for example:

`import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';`

(Use the `v1X-appRouter` path that matches your Next.js version if not on v15.)

Why: it collects CSS from MUI System during server rendering and streaming so styles attach predictably; it is recommended so styles go to `<head>` instead of only `<body>`. See [Next.js integration—Configuration](https://mui.com/material-ui/integrations/nextjs.md#configuration).

### Optional cache `options`

Pass `options` to `AppRouterCacheProvider` to override [Emotion cache options](https://emotion.sh/docs/@emotion/cache#options), for example `key: 'css'` (the default MUI key is `mui`). See [Next.js integration—Custom cache (optional)](https://mui.com/material-ui/integrations/nextjs.md#custom-cache-optional).

### URL hooks and Suspense

Dashboards and internal tools often combine MUI client components with URL-driven UI (filters, tabs, pagination) using `useSearchParams()` from `next/navigation`.

Next.js expects a `<Suspense>` boundary around the part of the tree that uses `useSearchParams` (and similar patterns that opt the route into client-side rendering), otherwise you can get build failures or runtime errors about a missing Suspense boundary.

Practical pattern: keep `app/.../page.tsx` as a server component when possible; render a client subtree that uses components such as `Table`, `Tabs`, or `TextField` and is tied to the query string inside `<Suspense>` from that server page. Do not use `fallback={null}` for UI that occupies layout space (toolbars, filters, and similar); it tends to cause layout shift when the client mounts. Use a fallback that matches the real layout (for example `Skeleton` with `Stack` or `Box` and the same `minHeight` and rough dimensions as the final UI). Full example: [Next.js integration—URL-driven UI and the Suspense boundary](https://mui.com/material-ui/integrations/nextjs.md#url-driven-ui-and-the-suspense-boundary).

Official reference: [Next.js—`useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params) (static rendering and Suspense notes vary by major version).

---

## Pages Router

### Dependencies

Add `@mui/material-nextjs`, `@emotion/cache`, and `@emotion/server`.

Example: `pnpm add @mui/material-nextjs @emotion/cache @emotion/server`

### `_document.tsx`

- Import `DocumentHeadTags` and `documentGetInitialProps` from the `v15-pagesRouter` (or matching `v1X-pagesRouter`) entry.
- Render `<DocumentHeadTags {...props} />` inside `<Head>`.
- Assign `getInitialProps` to call `documentGetInitialProps`.

### `_app.tsx`

Wrap the app with `AppCacheProvider` from the same major entry (for example `v15-pagesRouter`).

### Optional: custom cache and cascade layers

- Pass a custom `emotionCache` into `documentGetInitialProps` options when needed.
- For `@layer`, use `createEmotionCache({ enableCssLayer: true })` from `@mui/material-nextjs`, pass it from `_document` and align `_app` with the same cache pattern. See [Next.js integration—Cascade layers (optional)](https://mui.com/material-ui/integrations/nextjs.md#cascade-layers-optional).

### TypeScript

Extend `Document` props with `DocumentHeadTagsProps` from the same import path. See [Next.js integration—TypeScript](https://mui.com/material-ui/integrations/nextjs.md#typescript).

---

## Fonts (`next/font`)

### Roboto (default MUI font)

Apply the font via `className`, not a CSS variable. Load Roboto from `next/font/google` and set `className={roboto.className}` on the `<html>` element (App Router) or a wrapper `<main>` (Pages Router). Do **not** set `typography.fontFamily` in the theme.

Why: `createTypography` applies Roboto-specific letter-spacing only when `fontFamily` exactly equals the default font stack string `'"Roboto", "Helvetica", "Arial", sans-serif'`. A CSS variable never matches that string, silently removing letter-spacing from all typography variants.

### Custom fonts (non-Roboto)

Use `next/font/google` (or local fonts), set `variable: '--font-…'`, put `className={font.variable}` on `<html>` (App Router) or a wrapper element (Pages Router), and set `typography.fontFamily: 'var(--font-…)'` in a `'use client'` theme file. Wrap with `ThemeProvider` inside `AppRouterCacheProvider` as needed.

Details, App Router: [Font optimization](https://mui.com/material-ui/integrations/nextjs.md#font-optimization) and [Custom font](https://mui.com/material-ui/integrations/nextjs.md#custom-font). Pages Router: [Font optimization](https://mui.com/material-ui/integrations/nextjs.md#font-optimization-2) and [Custom font](https://mui.com/material-ui/integrations/nextjs.md#custom-font-2).

---

## CSS theme variables and SSR

Enable `cssVariables: true` in `createTheme` when using [CSS theme variables](https://mui.com/material-ui/customization/css-theme-variables/overview.md). For SSR flicker and `InitColorSchemeScript`, follow [CSS theme variables—Preventing SSR flickering](https://mui.com/material-ui/customization/css-theme-variables/configuration.md#preventing-ssr-flickering) and [CSS theme variables overview—Advantages](https://mui.com/material-ui/customization/css-theme-variables/overview.md#advantages). Add `suppressHydrationWarning` to `<html>` when using `colorSchemes` — the color scheme attribute is written client-side on first render and will otherwise produce a React hydration mismatch.

---

## Other styling stacks (CSS layers)

If you combine MUI with Tailwind CSS, CSS Modules, or other global CSS, set `enableCssLayer: true` on `AppRouterCacheProvider`:

`<AppRouterCacheProvider options={{ enableCssLayer: true }}>`

That wraps MUI output in `@layer mui` so anonymous layers can override as intended. See [Next.js integration—Using other styling solutions](https://mui.com/material-ui/integrations/nextjs.md#using-other-styling-solutions) and [MDN—@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer).

---

## Next.js Link and `component` prop

Next.js v16: passing `next/link` directly into `component` can trigger "Functions cannot be passed directly to Client Components". Fix: a small client re-export:

```tsx
'use client';
import Link, { LinkProps } from 'next/link';
export default Link;
```

Import that wrapper and use `component={Link}` on `Button` and similar. See [Next.js integration—Next.js v16 Client Component restriction](https://mui.com/material-ui/integrations/nextjs.md#nextjs-v16-client-component-restriction).

Pages Router and theme-wide patterns: see [Routing libraries—Next.js Pages Router](https://mui.com/material-ui/integrations/routing.md#nextjs-pages-router) and the [material-ui-nextjs-pages-router-ts example](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-pages-router-ts).

---

## Further reading

| Topic                            | Link                                                                                                   |
| :------------------------------- | :----------------------------------------------------------------------------------------------------- |
| Full integration guide           | [Next.js integration](https://mui.com/material-ui/integrations/nextjs.md)                              |
| Example (App Router, TypeScript) | [material-ui-nextjs-ts](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts) |
| Routing + Link adapters          | [Routing libraries](https://mui.com/material-ui/integrations/routing.md)                               |
| RSC vs SSR (terminology)         | [React WG discussion](https://github.com/reactwg/server-components/discussions/4)                      |

Import path cheat sheet: [reference.md](reference.md).
