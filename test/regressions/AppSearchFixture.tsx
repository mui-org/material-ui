import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '@mui/internal-core-docs/branding';
import { UserLanguageProvider } from '@mui/internal-core-docs/i18n';
import PageContext from '@mui/internal-core-docs/PageContext';
import { AppSearch } from '@mui/internal-core-docs/AppLayout/components/AppSearch';

// DocSearch ships its own stylesheet, and every release is free to restyle the
// markup our `AppSearch` overrides target. Two regressions slipped through the
// v4 -> v5 bump that way, and the v3 -> v4 one broke dark mode, so both schemes
// are covered. `fixtures/AppSearch/` holds one route per scheme.
//
// `index.test.js` drives the rest (see the `AppSearch` block): it seeds the
// stored recent searches, opens the modal, stubs the search request and
// declares the `docsearch` layer order. Opening a fixture by hand in
// `test:regressions:dev` therefore shows the closed button only.

// `AppSearch` reads `productId`/`productCategoryId` off the context, and
// `PageContext` has no default value.
const pageContext = {
  activePage: null,
  pages: [],
  productId: 'material-ui',
  productCategoryId: 'core',
  productIdentifier: { metadata: '', name: 'Material UI', versions: [] },
  activePageParents: [],
} as unknown as React.ContextType<typeof PageContext>;

export default function AppSearchFixture({ mode }: { mode: 'light' | 'dark' }) {
  return (
    // The docs theme, so `AppSearch` styles against `theme.vars` and its dark
    // block keys off `[data-mui-color-scheme="dark"]` exactly as in production.
    // The storage key is per scheme: the route loop reuses one page, and a mode
    // persisted by one route would otherwise carry into the other.
    <ThemeProvider
      theme={getTheme('ltr')}
      defaultMode={mode}
      modeStorageKey={`docsearch-regression-${mode}`}
      disableTransitionOnChange
    >
      {/*
        `TestViewer` sets `box-sizing: content-box` on purpose, to catch
        components that rely on the docs' reset. DocSearch is one: it sets
        `border-box` on the modal subtree, and with the layer order corrected
        our `content-box` now outranks it and the modal overflows. The docs
        render `CssBaseline`, so render it here too.
      */}
      <CssBaseline />
      {/* `useUserLanguage` defaults to an empty string, which makes every
          `t(...)` call fall back to an ellipsis. */}
      <UserLanguageProvider defaultUserLanguage="en">
        <PageContext.Provider value={pageContext}>
          {/* `TestViewer`'s own surface comes from the default theme, so the
              dark button would otherwise sit on a light background. */}
          <Box sx={{ bgcolor: 'background.default', p: 1 }}>
            <AppSearch sx={{ minWidth: { sm: 160 } }} />
          </Box>
        </PageContext.Provider>
      </UserLanguageProvider>
    </ThemeProvider>
  );
}
