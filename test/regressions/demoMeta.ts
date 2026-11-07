/**
 * Per-tool VRT configuration as two independent rule arrays — one for
 * screenshots, one for axe — so editing one tool can never stomp on the
 * other. Each list is evaluated last-match-wins (no inheritance: an override
 * rule must restate every field it cares about) against the docs path
 * `docs/data/material/components/{slug}/{Demo}` (component demos),
 * `docs/src/components/product{Product}/{Name}` (landing-page composites), or
 * `test/regressions/a11y/fixtures/{slug}/{Demo}` (a11y-only fixtures).
 *
 * Whole-slug exclusions where *no* tool wants anything live in the
 * `index.jsx` glob — dropping them from the bundle entirely, not just from
 * the tools.
 */

import { minimatch } from 'minimatch';

/** Default playwright viewport when no `ScreenshotRule.viewport` matches. */
export const DEFAULT_VIEWPORT = { width: 1000, height: 700 };

export interface ScreenshotRule {
  /** Minimatch glob against the docs path (see file-level comment). */
  test: string;
  enabled?: boolean;
  /** Playwright waits for this selector to appear after navigation, before axe + screenshot. */
  waitForSelector?: string;
  /**
   * Per-route viewport width override (px). Defaults to
   * {@link DEFAULT_VIEWPORT}'s width. Only the width is configurable: the
   * screenshot targets the testcase element, which captures its full rendered
   * height regardless of viewport, so width is the only axis that affects the
   * result (composites key off desktop breakpoints). The viewport height stays
   * at the default.
   */
  viewportWidth?: number;
  /**
   * Skip the demo when the run's React major is below this. For demos whose
   * third-party dependencies need a newer React than MUI itself supports —
   * the nightly `test_regressions-react@18` job installs React 18 across the
   * workspace via pnpm overrides, past any peer range that says otherwise.
   */
  minReactMajor?: number;
}

export interface A11yRule {
  /** Minimatch glob against `docs/data/material/components/{slug}/{Demo}`. */
  test: string;
  enabled?: boolean;
  /**
   * `visual` asserts rules that depend on rendered CSS. `all` asserts every
   * axe violation/incomplete that is not listed in `skipAssertions`.
   * @default 'visual'
   */
  assertions?: 'visual' | 'all';
  /** Axe rule IDs recorded into results JSON but not asserted on. */
  skipAssertions?: string[];
}

/**
 * Screenshots default to enabled. Add a rule with `enabled: false` to opt
 * out, or `waitForSelector` to gate axe + screenshot on a specific element.
 * Trailing comments preserve the prose used in the old glob so `git grep` on a
 * reason still finds every affected demo.
 */
export const SCREENSHOT_RULES: ScreenshotRule[] = [
  { test: 'docs/data/material/components/alert/TransitionAlerts', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/BackToTop', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/ElevateAppBar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/HideAppBar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/app-bar/MenuAppBar', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Asynchronous', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/CheckboxesTags', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/CountrySelect', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/DisabledOptions', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Filter', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/FreeSolo', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/GoogleMaps', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Grouped', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Highlights', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Playground', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/UseAutocomplete', enabled: false }, // Redundant
  { test: 'docs/data/material/components/autocomplete/Virtualize', enabled: false }, // Redundant
  { test: 'docs/data/material/components/badges/BadgeAlignment', enabled: false }, // Redux isolation
  { test: 'docs/data/material/components/badges/BadgeVisibility', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/bottom-navigation/FixedBottomNavigation', enabled: false }, // Redundant
  { test: 'docs/data/material/components/breadcrumbs/ActiveLastBreadcrumb', enabled: false }, // Redundant
  { test: 'docs/data/material/components/chips/ChipsPlayground', enabled: false }, // Redux isolation
  { test: 'docs/data/material/components/drawers/SwipeableEdgeDrawer', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/drawers/SwipeableTemporaryDrawer', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/drawers/TemporaryDrawer', enabled: false }, // Needs interaction
  {
    test: 'docs/data/material/components/floating-action-button/FloatingActionButtonZoom',
    enabled: false,
  }, // Needs interaction
  { test: 'docs/data/material/components/masonry/ImageMasonry', enabled: false }, // Images don't load
  { test: 'docs/data/material/components/masonry/Sequential', enabled: false }, // Flaky
  { test: 'docs/data/material/components/modal/BasicModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/modal/KeepMountedModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/modal/SpringModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/modal/TransitionsModal', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/no-ssr/FrameDeferring', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/popover/AnchorPlayground', enabled: false }, // Redux isolation
  { test: 'docs/data/material/components/popover/BasicPopover', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/popover/PopoverPopupState', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/selects/ControlledOpenSelect', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/selects/DialogSelect', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/selects/GroupedSelect', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/skeleton/Animations', enabled: false }, // Animation disabled
  { test: 'docs/data/material/components/skeleton/Facebook', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/skeleton/SkeletonChildren', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/skeleton/YouTube', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/snackbars/ConsecutiveSnackbars', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/CustomizedSnackbars', enabled: false }, // Redundant
  { test: 'docs/data/material/components/snackbars/DirectionSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/FabIntegrationSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/IntegrationNotistack', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/PositionedSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/SimpleSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/snackbars/TransitionsSnackbar', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/stack/InteractiveStack', enabled: false }, // Redundant
  { test: 'docs/data/material/components/steppers/HorizontalNonLinearStepper', enabled: false }, // Redundant
  { test: 'docs/data/material/components/steppers/TextMobileStepper', enabled: false }, // Flaky image loading
  { test: 'docs/data/material/components/tabs/AccessibleTabs1', enabled: false }, // Needs interaction
  { test: 'docs/data/material/components/tabs/AccessibleTabs2', enabled: false }, // Needs interaction
  {
    test: 'docs/data/material/components/table/ReactVirtualizedTable',
    waitForSelector: '[data-index="1"]',
  }, // Wait for virtualized rows to render

  // Landing-page composites under `docs/src/components/product*/` use
  // desktop breakpoints (`md`+) and look clipped at the default width.
  { test: 'docs/src/components/product*/**', viewportWidth: 1280 },
  // X composites (large grids, dense charts) want a wider canvas to match
  // their live-docs desktop layout. Last-match-wins so this overrides the
  // broader product*/** width above.
  { test: 'docs/src/components/productX/**', viewportWidth: 1440 },

  // The template mounts react-router's data router (`createHashRouter` +
  // `RouterProvider`), which calls `useOptimistic` — React 19 only.
  // react-router@8 peers on `react >= 19.2.7`, so under the nightly
  // `test_regressions-react@18` override the whole demo throws on render and
  // the harness waits out its timeout on a testcase element that never
  // appears. It is the only demo mounting a data router; the other
  // react-router demos use `MemoryRouter`/`Link` and are unaffected.
  {
    test: 'docs/data/material/getting-started/templates/crud-dashboard/CrudDashboard',
    minReactMajor: 19,
  },

  // Composites whose Data Grid loads its rows asynchronously via `useDemoData`
  // — `aria-busy` only tracks fonts, not the grid data, so without this the
  // screenshot can capture the loading skeleton. The skeleton's cells carry
  // *both* `.MuiDataGrid-cell` and `.MuiDataGrid-cellSkeleton` (and its rows
  // both `.MuiDataGrid-row` and `.MuiDataGrid-rowSkeleton`), so a plain
  // `.MuiDataGrid-row .MuiDataGrid-cell` matches the skeleton too. Exclude
  // skeleton rows so the wait only resolves once real data has rendered. Rules
  // are last-match-wins, so each restates the X width from the rule above.
  {
    test: 'docs/src/components/productX/XHero',
    viewportWidth: 1440,
    waitForSelector: '.MuiDataGrid-row:not(.MuiDataGrid-rowSkeleton) .MuiDataGrid-cell',
  },
  {
    test: 'docs/src/components/productX/XGridFullDemo',
    viewportWidth: 1440,
    waitForSelector: '.MuiDataGrid-row:not(.MuiDataGrid-rowSkeleton) .MuiDataGrid-cell',
  },
  {
    test: 'docs/src/components/productX/XTheming',
    viewportWidth: 1440,
    waitForSelector: '.MuiDataGrid-row:not(.MuiDataGrid-rowSkeleton) .MuiDataGrid-cell',
  },
  { test: 'docs/data/material/components/progress/*', enabled: false }, // Animated progress bars make screenshots flaky; axe still runs on the enrolled LinearProgress and CircularProgress demos
  // The a11y fixture tree exists for axe, so screenshots are off by default.
  // Later rules re-enable single fixtures that also guard a visual state.
  { test: 'test/regressions/a11y/fixtures/**', enabled: false }, // A11y-only coverage fixtures
  { test: 'test/regressions/a11y/fixtures/buttons/ButtonA11yTextSpacing', enabled: true }, // Visual regression for text spacing (1.4.12); adds no unique axe coverage
  { test: 'test/regressions/a11y/fixtures/accordion/AccordionA11yTextSpacing', enabled: true }, // Visual regression for text spacing (1.4.12); adds no unique axe coverage
  {
    test: 'test/regressions/a11y/fixtures/toggle-button/ToggleButtonA11yTextSpacing',
    enabled: true,
  }, // Visual regression for text spacing (1.4.12); adds no unique axe coverage
];

// Accordion docs demos + a11y fixtures enrolled for axe assertions (the cluster:
// root Accordion + AccordionSummary header + AccordionDetails/Actions).
const ACCORDION_A11Y_DEMOS = [
  'AccordionUsage',
  'AccordionExpandDefault',
  'AccordionExpandIcon',
  'ControlledAccordions',
  'CustomizedAccordions',
  'DisabledAccordion',
  'AccordionTransition',
];

// toggle-button docs demos enrolled for axe assertions; the remaining demos add
// no axe coverage beyond the a11y fixtures.
const TOGGLE_BUTTON_A11Y_DEMOS = [
  'ToggleButtons',
  'ToggleButtonsMultiple',
  'VerticalToggleButtons',
];

// Progress docs demos enrolled for axe assertions. Mixed demos that are not one
// component (CustomizedProgressBars, DelayingAppearance, CircularIntegration)
// stay excluded.
const LINEARPROGRESS_A11Y_DEMOS = [
  'LinearIndeterminate',
  'LinearDeterminate',
  'LinearBuffer',
  'LinearQuery',
  'LinearColor',
  'LinearWithValueLabel',
  'LinearWithAriaValueText',
];

const CIRCULARPROGRESS_A11Y_DEMOS = [
  'CircularIndeterminate',
  'CircularDeterminate',
  'CircularColor',
  'CircularWithValueLabel',
  'CircularSize',
  'CircularEnableTrack',
  'CircularCustomScale',
  'CircularUnderLoad',
];

// Button docs demos enrolled for axe assertions. The IconButton demos have their own
// list below, and neither list enrolls the ButtonBase demo.
const BUTTON_A11Y_DEMOS = [
  'BasicButtons',
  'TextButtons',
  'ContainedButtons',
  'DisableElevation',
  'OutlinedButtons',
  'ColorButtons',
  'ButtonSizes',
  'IconLabelButtons',
  'InputFileUpload',
  'LoadingButtons',
  'CustomizedButtons',
];

// IconButton docs demos enrolled for axe assertions. They share the `buttons` slug, so
// `IconButton/accessibility.json` names them in `axeDemos` to keep them out of Button's report.
const ICON_BUTTON_A11Y_DEMOS = [
  'IconButtons',
  'IconButtonColors',
  'IconButtonSizes',
  'IconButtonWithBadge',
  'LoadingIconButton',
];

// Radio docs demos enrolled for axe assertions. FormControlLabelPlacement is left out: its axe
// output duplicates RowRadioButtonsGroup (a row RadioGroup with a FormLabel), adding no new rules.
const RADIO_A11Y_DEMOS = [
  'RadioButtons',
  'RadioButtonsGroup',
  'ControlledRadioButtonsGroup',
  'ColorRadioButtons',
  'CustomizedRadios',
  'SizeRadioButtons',
  'RowRadioButtonsGroup',
  'ErrorRadios',
  'UseRadioGroup',
];

const CHECKBOX_A11Y_DEMOS = [
  'Checkboxes',
  'CheckboxLabels',
  'ColorCheckboxes',
  'ControlledCheckbox',
  'CustomizedCheckbox',
  'IconCheckboxes',
  'SizeCheckboxes',
  'CheckboxesGroup',
  'IndeterminateCheckbox',
];

// Switch docs demos enrolled for axe assertions. FormControlLabelPosition is
// excluded: its `aria-label` on a role-less FormGroup div trips
// `aria-prohibited-attr`, a demo quirk unrelated to Switch.
const SWITCH_A11Y_DEMOS = [
  'BasicSwitches',
  'SwitchLabels',
  'ColorSwitches',
  'ControlledSwitches',
  'CustomizedSwitches',
  'SwitchesSize',
  'SwitchesGroup',
];

// TextField docs demos enrolled for axe assertions; the `select` dropdown,
// InputBase-only, and standalone hidden-label demos are excluded.
const TEXTFIELD_A11Y_DEMOS = [
  'BasicTextFields',
  'ColorTextFields',
  'ValidationTextFields',
  'FormPropsTextFields',
  'TextFieldSizes',
  'MultilineTextFields',
];

/**
 * A11y defaults to off — only matched-and-enabled rules produce results.
 * Slug-wide rules use `*`; brace-globs narrow enrolment to specific demos;
 * later opt-out rules disable individual demos.
 *
 * Scope: the components with a conformance report under
 * `packages/mui-material/src/<Component>/accessibility.md`. Others onboard
 * incrementally.
 */
export const A11Y_RULES: A11yRule[] = [
  {
    test: 'docs/data/material/components/avatars/{LetterAvatars,BackgroundLetterAvatars,IconAvatars,VariantAvatars}',
    enabled: true,
  },
  // Avatar's default `colorDefault` styling is white text on grey[400] (~1.9:1),
  // and the documented letter/background examples use low-contrast author
  // colors, so color-contrast genuinely fails (WCAG 1.4.3). Record the
  // violations in the JSON without failing the build. IconAvatars (icons only,
  // aria-hidden, no text) is excluded here so it still asserts a clean pass.
  {
    test: 'docs/data/material/components/avatars/{LetterAvatars,BackgroundLetterAvatars,VariantAvatars}',
    enabled: true,
    skipAssertions: ['color-contrast'],
  },
  // A11y-only fixture under `test/regressions/a11y/fixtures/avatars/` (no
  // docs page consumes it); the suite name maps its results into the same
  // `avatars.a11y.json` as the docs demos above. `assertions: 'all'` makes
  // axe's `image-alt` rule an asserted check, which is the reason the
  // fixture exists.
  {
    test: 'test/regressions/a11y/fixtures/avatars/AvatarA11yImage',
    enabled: true,
    assertions: 'all',
    skipAssertions: ['color-contrast'],
  },
  {
    // `color-contrast` is recorded but not asserted: the Accordion root's
    // divider `::before` pseudo-element blocks axe's background resolution for
    // the summary label, so the rule returns `incomplete` on some demos.
    // No demo records a contrast failure; the label clears 4.5:1 on `paper`.
    test: `docs/data/material/components/accordion/{${ACCORDION_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
    skipAssertions: ['color-contrast'],
  },
  // A11y-only fixtures live under `test/regressions/a11y/fixtures/accordion/`
  // (no docs page consumes them); the suite name maps their results into the
  // same `accordion.a11y.json` as the docs demos above. The divider
  // `::before` skip is not needed here: both fixtures pass `color-contrast`.
  {
    test: 'test/regressions/a11y/fixtures/accordion/{AccordionA11yNonNative,AccordionA11yTextSpacing}',
    enabled: true,
    assertions: 'all',
  },
  {
    test: `docs/data/material/components/buttons/{${BUTTON_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
  },
  // A11y-only fixtures live under `test/regressions/a11y/fixtures/buttons/`
  // (no docs page consumes them); the suite name maps their results into the
  // same `buttons.a11y.json` as the docs demos above.
  {
    test: 'test/regressions/a11y/fixtures/buttons/{ButtonA11yNonNative,ButtonA11ySemanticStates,ButtonA11yTextSpacing}',
    enabled: true,
    assertions: 'all',
  },
  // `color-contrast` is a known, documented product gap, not a regression:
  // `info` and `warning` fail 4.5:1 in every variant with the default palette
  // Asserting it would keep CI permanently red, so the failure is recorded in
  // `buttons.a11y.json` (status only, a tripwire for flips) and documented with
  // measured ratios in `packages/mui-material/src/Button/accessibility.md`
  // § 1.4.3. A palette change cannot go unnoticed: the contrast contract
  // tests recompute the ratios from `createTheme()` and fail when the
  // failing set drifts.
  {
    test: 'test/regressions/a11y/fixtures/buttons/ButtonA11yColorMatrix',
    enabled: true,
    assertions: 'all',
    skipAssertions: ['color-contrast'],
  },
  {
    test: `docs/data/material/components/buttons/{${ICON_BUTTON_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
  },
  // A11y-only fixtures for IconButton, recorded into `buttons.a11y.json` like the
  // Button fixtures above.
  {
    test: 'test/regressions/a11y/fixtures/buttons/{IconButtonA11yNonNative,IconButtonA11ySemanticStates}',
    enabled: true,
    assertions: 'all',
  },
  // IndeterminateCheckbox needs no skip: the component sets the native
  // `.indeterminate` property and no aria-checked attribute (#49053), so
  // axe's aria-conditional-attr passes.
  {
    test: `docs/data/material/components/checkboxes/{${CHECKBOX_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
  },
  {
    test: `docs/data/material/components/progress/{${[
      ...LINEARPROGRESS_A11Y_DEMOS,
      ...CIRCULARPROGRESS_A11Y_DEMOS,
    ].join(',')}}`,
    enabled: true,
    assertions: 'all',
  },
  // The percentage caption is positioned over the SVG arc, so axe cannot
  // resolve its background and reports `color-contrast` incomplete. The
  // caption is author-supplied Typography, not part of the component.
  // Recorded, not asserted.
  {
    test: 'docs/data/material/components/progress/CircularWithValueLabel',
    enabled: true,
    assertions: 'all',
    skipAssertions: ['color-contrast'],
  },
  // A11y-only fixtures live under `test/regressions/a11y/fixtures/progress/`
  // (no docs page consumes them); the suite name maps their results into the
  // same `progress.a11y.json` as the docs demos above. Linear and circular
  // share that file because the reporter keys results by the docs slug.
  {
    test: 'test/regressions/a11y/fixtures/progress/{LinearProgressA11ySemanticStates,LinearProgressA11yColorMatrix,CircularProgressA11ySemanticStates,CircularProgressA11yColorMatrix}',
    enabled: true,
    assertions: 'all',
  },
  {
    test: `docs/data/material/components/radio-buttons/{${RADIO_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
  },
  {
    test: `docs/data/material/components/switches/{${SWITCH_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
  },
  {
    test: `docs/data/material/components/text-fields/{${TEXTFIELD_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
    // color-contrast is recorded but not asserted (1.4.3): axe cannot resolve
    // the input value's background through the overlapping notched outline
    // (logged as incomplete), and the focused color labels (warning 3.11:1),
    // error text on the filled surface (4.36:1), and the ~0.42-opacity
    // placeholder (~2.6:1) are known shortfalls kept in the JSON without
    // failing CI.
    skipAssertions: ['color-contrast'],
  },
  {
    test: `docs/data/material/components/toggle-button/{${TOGGLE_BUTTON_A11Y_DEMOS.join(',')}}`,
    enabled: true,
    assertions: 'all',
  },
  // A11y-only fixtures live under `test/regressions/a11y/fixtures/toggle-button/`
  // (no docs page consumes them); the suite name maps their results into the
  // same `toggle-button.a11y.json` as the docs demos above.
  {
    test: 'test/regressions/a11y/fixtures/toggle-button/{ToggleButtonA11yNonNative,ToggleButtonA11ySemanticStates,ToggleButtonA11yTextSpacing}',
    enabled: true,
    assertions: 'all',
  },
  // `color-contrast` is a documented gap, not a regression: a selected label
  // renders `color.main` text over an alpha tint of the same color, and the
  // `primary`/`error`/`info`/`warning` labels fall short of 4.5:1 there. The
  // failure is recorded in `toggle-button.a11y.json` (a tripwire for flips)
  // and documented in `packages/mui-material/src/ToggleButton/accessibility.md`
  // § 1.4.3.
  {
    test: 'test/regressions/a11y/fixtures/toggle-button/ToggleButtonA11yColorMatrix',
    enabled: true,
    assertions: 'all',
    skipAssertions: ['color-contrast'],
  },
];

export interface ParsedRoute {
  path: string;
  slug: string;
  demo: string;
}

const COMPONENT_ROUTE_REGEX = /^\/docs-components-([^/]+)\/(.+)$/;
const COMPOSITE_ROUTE_REGEX = /^\/docs-product-([^/]+)\/(.+)$/;
const TEMPLATE_ROUTE_REGEX = /^\/docs-getting-started-templates-([^/]+)\/(.+)$/;
const A11Y_FIXTURE_ROUTE_REGEX = /^\/a11y-([^/]+)\/(.+)$/;

/**
 * Map a VRT route to its source path + slug + demo, or `null` for
 * `/regression-*` screenshot fixtures (always screenshot, never axe).
 *
 * Recognises four route shapes:
 * - `/docs-components-{slug}/{Demo}` → `docs/data/material/components/{slug}/{Demo}`
 * - `/docs-product-{product}/{Name}` → `docs/src/components/product{Product}/{Name}`
 * - `/docs-getting-started-templates-{slug}/{Demo}` →
 *   `docs/data/material/getting-started/templates/{slug}/{Demo}`
 * - `/a11y-{slug}/{Demo}` → `test/regressions/a11y/fixtures/{slug}/{Demo}`
 *
 * The template shape is matched by its literal prefix: `fixtures.js` joins the
 * directory segments with `-`, so `getting-started-templates-crud-dashboard`
 * cannot be split back into directories without knowing where the slug starts.
 *
 * For a11y fixture routes the suite directory doubles as the slug. Name a
 * suite after an existing docs slug (lowercase, for example
 * `a11y/fixtures/buttons/`) to record its axe results into that slug's
 * committed `{slug}.a11y.json` — for a11y-only fixtures that must not live in
 * `docs/data` because no docs page consumes them. The a11y reporter rejects a
 * slug without a docs directory. These suites live outside
 * `test/regressions/fixtures/` because a lowercase slug directory next to a
 * PascalCase screenshot suite (`rating/` next to `Rating/`) would fold into
 * one directory on case-insensitive file systems.
 */
export function parseRoute(route: string): ParsedRoute | null {
  const componentMatch = route.match(COMPONENT_ROUTE_REGEX);
  if (componentMatch) {
    const [, slug, demo] = componentMatch;
    return { path: `docs/data/material/components/${slug}/${demo}`, slug, demo };
  }
  const templateMatch = route.match(TEMPLATE_ROUTE_REGEX);
  if (templateMatch) {
    const [, slug, demo] = templateMatch;
    return {
      path: `docs/data/material/getting-started/templates/${slug}/${demo}`,
      slug,
      demo,
    };
  }
  const compositeMatch = route.match(COMPOSITE_ROUTE_REGEX);
  if (compositeMatch) {
    const [, product, demo] = compositeMatch;
    // Re-capitalize the single-word product segment from `index.jsx`'s glob
    // (`material` → `Material`, `x` → `X`) to rebuild the directory name.
    const dir = `product${product.charAt(0).toUpperCase()}${product.slice(1)}`;
    return { path: `docs/src/components/${dir}/${demo}`, slug: product, demo };
  }
  const a11yFixtureMatch = route.match(A11Y_FIXTURE_ROUTE_REGEX);
  if (a11yFixtureMatch) {
    const [, suite, demo] = a11yFixtureMatch;
    return { path: `test/regressions/a11y/fixtures/${suite}/${demo}`, slug: suite, demo };
  }
  return null;
}

/**
 * Walk a rule list back-to-front, return the last matching rule (or undefined).
 * Rules don't inherit from each other — every override must restate any field
 * it cares about. Defaults (`enabled` on/off when no rule matches) live at
 * the call site, not here.
 */
export function getConfig<T extends { test: string }>(
  rules: ReadonlyArray<T>,
  pathStr: string,
): T | undefined {
  for (let i = rules.length - 1; i >= 0; i -= 1) {
    if (minimatch(pathStr, rules[i].test)) {
      return rules[i];
    }
  }
  return undefined;
}
