# Material UI + Next.js: reference

## `@mui/material-nextjs` entry points

Pick the `v1X-*` segment that matches the app's Next.js major (see the package's README on npm if a new major adds a new entry).

| Router       | Typical import path                                                    |
| :----------- | :--------------------------------------------------------------------- |
| App Router   | `@mui/material-nextjs/v15-appRouter` (or `v14-appRouter`, etc.)        |
| Pages Router | `@mui/material-nextjs/v15-pagesRouter` (or matching `v1X-pagesRouter`) |

Pages Router also uses `@emotion/server` for the documented setup; App Router uses `@emotion/cache` only in the default instructions.

## Provider placement (App Router)

```text
<html>
  <body>
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>   <!-- optional but common -->
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  </body>
</html>
```

Order and `next/font` `className` on `html` follow [Next.js integration—Font optimization](https://mui.com/material-ui/integrations/nextjs.md#font-optimization).
