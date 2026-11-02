// Fixture discovery for the visual-regression bundle.
//
// This module exists to host the eager `import.meta.glob` calls in isolation.
// Eager globs *prepend* their resolved imports to the top of the module that
// contains them, ahead of that module's own `import` statements (see
// mui/base-ui#4370). If these globs lived in `index.jsx`, the demo modules —
// including their top-level `dayjs()` calls — would evaluate before
// `index.jsx`'s first import (`./fakeDateSetup`) could install the frozen
// clock. Keeping them here, imported *after* `./fakeDateSetup`, guarantees the
// override is in place first.

import assertUniqueFixtures from './assertUniqueFixtures';

// Get all the fixtures specifically written for preventing visual regressions.
const importRegressionFixtures = import.meta.glob(['./fixtures/**/*.{js,ts,tsx}'], {
  import: 'default',
  eager: true,
});

const regressionFixtures = [];

Object.keys(importRegressionFixtures).forEach((path) => {
  const [suite, name] = path
    .replace('./fixtures/', '')
    .replace(/\.\w+$/, '')
    .split('/');

  // TODO: Why does webpack include a key for the absolute and relative path?
  // We just want the relative path
  if (path.startsWith('./')) {
    regressionFixtures.push({
      path,
      suite: `regression-${suite}`,
      name,
      Component: importRegressionFixtures[path],
    });
  }
}, []);

// A11y-only fixtures, routed as `/a11y-{slug}/{Name}`. Each suite directory
// is named after a docs slug (lowercase) so the reporter merges its results
// into that slug's `{slug}.a11y.json` — see `parseRoute` in `demoMeta.ts`.
// They live outside `./fixtures/` on purpose: a lowercase slug directory next
// to a PascalCase screenshot suite (`rating/` next to `Rating/`) would fold
// into one directory on case-insensitive file systems (macOS default).
const importA11yFixtures = import.meta.glob(['./a11y/fixtures/**/*.{js,ts,tsx}'], {
  import: 'default',
  eager: true,
});

const a11yFixtures = [];

Object.keys(importA11yFixtures).forEach((path) => {
  const [suite, name] = path
    .replace('./a11y/fixtures/', '')
    .replace(/\.\w+$/, '')
    .split('/');

  if (path.startsWith('./')) {
    a11yFixtures.push({
      path,
      suite: `a11y-${suite}`,
      name,
      Component: importA11yFixtures[path],
    });
  }
}, []);

// Also use some of the demos to avoid code duplication.
//
// Two exclusion layers:
//   - Slug-level (whole slug has no tool consumer, or path can't be imported) lives here,
//     dropping the demo from the bundle entirely.
//   - Per-demo (a specific demo inside an otherwise-enrolled slug is skipped by one tool
//     or the other) lives in `demoMeta.ts`, so screenshot-specific reasons
//     ("Redundant", "Flaky image loading") don't also drop a11y coverage.
//
// Enrolling a new component for a11y: un-negate the slug glob below if needed,
// then add an `A11Y_RULES` entry in `demoMeta.ts`
// (e.g. `{ test: 'docs/data/material/components/foo/{BasicFoo,FooVariants}', enabled: true }`).
const importDemos = import.meta.glob(
  [
    // Migrated docs-infra demos: `<area>/demos/<slug>/<Name>.{js,tsx}`.
    'docs/data/**/demos/*/[A-Z]*.{js,tsx}',
    // Templates: flat `templates/<name>/<Name>.{js,tsx}` layout (not yet
    // migrated). Each template ships both files; only `.js` is enrolled so a
    // template can't register the same route/screenshot path twice.
    'docs/data/material/getting-started/templates/*/[A-Z]*.js',
    // Legacy Base UI variants (not yet migrated to the docs-infra demo layout).
    'docs/data/base/**/[A-Z]*/css/index.js',
    'docs/data/base/**/[A-Z]*/tailwind/index.js',
    'docs/data/base/**/[A-Z]*/system/index.js',
    // ================== Structural — cannot be imported safely ==================
    '!docs/data/experiments/**',
    '!docs/data/material/**/*NoSnap.*',
    // Templates that aren't standalone demos
    '!docs/data/material/getting-started/templates/marketing-page/**',
    '!docs/data/material/getting-started/templates/shared-theme/**',
    // Customization demos — not component pages
    '!docs/data/material/customization/breakpoints/demos/**',
    '!docs/data/material/customization/color/demos/**',
    '!docs/data/material/customization/container-queries/demos/resizable/**',
    '!docs/data/material/customization/default-theme/demos/**',
    '!docs/data/material/customization/density/demos/**',
    '!docs/data/material/customization/right-to-left/demos/rtl-demo/**',
    '!docs/data/material/customization/transitions/demos/**',
    '!docs/data/material/customization/typography/demos/responsive-font-sizes-chart/**',
    // Other non-demo subtrees
    '!docs/data/material/getting-started/supported-components/demos/**',
    '!docs/data/material/guides/**',
    '!docs/data/base/getting-started/quickstart/BaseButtonTailwind/**',
    '!docs/data/base/guides/working-with-tailwind-css/PlayerFinal/**',
    '!docs/data/premium-themes/**',
    // ================== Slug-level — no tool consumer ==================
    '!docs/data/material/components/backdrop/**', // Needs interaction
    '!docs/data/material/components/click-away-listener/**', // Needs interaction
    '!docs/data/material/components/container/**', // Can't see the impact
    '!docs/data/material/components/dialogs/**', // Needs interaction
    '!docs/data/material/components/image-list/**', // Images don't load
    '!docs/data/material/components/material-icons/demos/search-icons/**', // Heavy icon grid
    '!docs/data/material/components/menus/**', // Needs interaction
    '!docs/data/material/components/popper/**', // Needs interaction
    // `progress` is included so axe can run on the enrolled LinearProgress docs
    // demos; its animated bars make screenshots flaky, so screenshots are
    // disabled slug-wide in `SCREENSHOT_RULES` (a11y still runs on the demos).
    '!docs/data/material/components/speed-dial/**', // Needs interaction
    '!docs/data/material/components/textarea-autosize/**', // Superseded by a dedicated regression test
    '!docs/data/material/components/tooltips/**', // Needs interaction
    '!docs/data/material/components/transitions/**', // Needs interaction
    '!docs/data/material/components/use-media-query/**', // Need to dynamically resize to test
    '!docs/data/material/getting-started/versions/demos/**', // not a component
  ],
  {
    import: 'default',
    eager: true,
  },
);

const demoFixtures = [];
Object.keys(importDemos).forEach((path) => {
  const [name, ...suiteArray] = path
    .replace(/^.*?docs\/data\//, '')
    .replace(/\.(tsx?|jsx?)$/, '')
    .split('/')
    .reverse();
  // Drop the `demos/<slug>` infix introduced by the docs-infra demo layout so
  // the suite slug stays stable: `<comp>/demos/<slug>/<Name>` -> `<comp>/<Name>`.
  // After reverse + destructure, the original `demos/<slug>` pair shows up as
  // adjacent entries `<slug>, demos` in `suiteArray`.
  const segments = suiteArray.reverse();
  const cleaned = [];
  for (let i = 0; i < segments.length; i += 1) {
    if (segments[i] === 'demos') {
      i += 1; // also skip the slug that follows
      continue;
    }
    cleaned.push(segments[i]);
  }
  const suite = `docs-${cleaned.join('-').replace(/^material-/, '')}`;

  demoFixtures.push({
    path,
    suite,
    name,
    Component: importDemos[path],
  });
}, []);

// Bespoke composites under `docs/src/components/product*/` that assemble the
// product landing pages (`/material-ui`, `/x`). They aren't covered by the
// `docs/data/**` glob above. See `test/regressions/MarketingWrapper.tsx` for
// the branding wrapper and `test/regressions/stubs/` for the `next/*` shims
// that let composites with transitive `next/router` imports render outside
// the Next.js docs host.
//
// This is an explicit allowlist rather than a `product*/[A-Z]*.tsx` glob: most
// composites are marketing chrome (heroes with links, pricing tables, Figma
// kit promos, template thumbnails) with no meaningful component integration to
// guard. We only cover the ones that render real MUI / MUI X components in a
// composed layout — where a CSS/theme regression would actually show up.
const importComposites = import.meta.glob(
  [
    // Material UI — component showcases under the docs branding theme.
    'docs/src/components/productMaterial/MaterialHero.tsx',
    'docs/src/components/productMaterial/MaterialStyling.tsx',
    'docs/src/components/productMaterial/MaterialTheming.tsx',
    // MUI X — one isolated demo per product (the switcher composite
    // `XComponents` renders these same demos behind tabs; isolating them
    // drops the tab chrome and avoids screenshotting one product at a time).
    'docs/src/components/productX/XHero.tsx',
    'docs/src/components/productX/XGridFullDemo.tsx',
    'docs/src/components/productX/XDateRangeDemo.tsx',
    'docs/src/components/productX/XChartsDemo.tsx',
    'docs/src/components/productX/XTreeViewDemo.tsx',
    'docs/src/components/productX/XTheming.tsx',
  ],
  {
    import: 'default',
    eager: true,
  },
);

const compositeFixtures = [];
Object.keys(importComposites).forEach((path) => {
  const productMatch = path.match(/components\/product([^/]+)\//);
  if (!productMatch) {
    return;
  }
  // Only single-word products are covered (`productMaterial`, `productX`), so
  // the suite name is just the lower-cased segment (`material`, `x`).
  // `parseRoute` in `demoMeta.ts` re-capitalizes it to rebuild the docs path.
  const product = productMatch[1].toLowerCase();
  const name = path
    .split('/')
    .pop()
    .replace(/\.tsx$/, '');
  compositeFixtures.push({
    path,
    suite: `docs-product-${product}`,
    name,
    Component: importComposites[path],
    isComposite: true,
  });
}, []);

const fixtures = assertUniqueFixtures(
  regressionFixtures.concat(a11yFixtures).concat(demoFixtures).concat(compositeFixtures),
);

export default fixtures;
