/**
 * The Playwright suites that test WCAG criteria per component. The regression
 * tests register them, and `pnpm a11y:scorecard` reads them as evidence.
 */

/** The criteria each `CSS_LAYOUT_SUITES` entry tests, unless it skips them. */
export const LAYOUT_CRITERIA = ['1.4.10', '1.4.4', '1.4.12'];

export const CSS_LAYOUT_SUITES = [
  { component: 'Accordion', route: '/docs-components-accordion/AccordionUsage' },
  // The same demo renders the summary header, which is rated separately.
  { component: 'AccordionSummary', route: '/docs-components-accordion/AccordionUsage' },
  {
    component: 'Avatar',
    route: '/docs-components-avatars/LetterAvatars',
    // 1.4.4 is asserted here as *text-only* resize, which the Avatar report
    // explicitly treats as out of scope: its fixed 40px box scales under
    // full-page zoom (the mechanism the criterion assumes) but not under
    // text-only zoom, which the report calls an author concern. Left rated
    // Manual rather than silently downgraded. See Avatar/accessibility.md.
    skipCriteria: ['1.4.4'],
  },
  { component: 'Button', route: '/docs-components-buttons/BasicButtons' },
  { component: 'Checkbox', route: '/docs-components-checkboxes/Checkboxes' },
  { component: 'Chip', route: '/docs-components-chips/ChipsArray' },
  {
    component: 'CircularProgress',
    route: '/docs-components-progress/CircularDeterminate',
    // The spinner renders no text, so the report rates 1.4.4 and 1.4.12 not applicable.
    skipCriteria: ['1.4.4', '1.4.12'],
  },
  {
    component: 'LinearProgress',
    route: '/docs-components-progress/LinearDeterminate',
    // The bar renders no text, so the report rates 1.4.4 and 1.4.12 not applicable.
    skipCriteria: ['1.4.4', '1.4.12'],
  },
  { component: 'Radio', route: '/docs-components-radio-buttons/RadioButtonsGroup' },
  { component: 'Switch', route: '/docs-components-switches/BasicSwitches' },
  { component: 'TextField', route: '/docs-components-text-fields/BasicTextFields' },
  { component: 'ToggleButton', route: '/docs-components-toggle-button/ToggleButtons' },
  // The same demo renders the group wrapper, which is rated separately.
  {
    component: 'ToggleButtonGroup',
    route: '/docs-components-toggle-button/ToggleButtons',
    // The group inherits 1.4.4 and 1.4.12 from ToggleButton, which covers them.
    skipCriteria: ['1.4.4', '1.4.12'],
  },
];

/** Each entry tests 2.4.7 Focus Visible on a docs demo. */
export const FOCUS_VISIBLE_TARGETS = [
  {
    component: 'AccordionSummary',
    route: '/docs-components-accordion/AccordionUsage',
    selector: '.MuiAccordionSummary-root',
  },
  {
    component: 'Button',
    route: '/docs-components-buttons/BasicButtons',
    selector: '.MuiButton-root',
  },
  {
    component: 'Checkbox',
    route: '/docs-components-checkboxes/Checkboxes',
    selector: '.MuiCheckbox-root',
  },
  {
    component: 'Chip',
    route: '/docs-components-chips/ClickableChips',
    selector: '.MuiChip-clickable',
  },
  {
    component: 'Radio',
    route: '/docs-components-radio-buttons/RadioButtonsGroup',
    selector: '.MuiRadio-root',
  },
  {
    component: 'Switch',
    route: '/docs-components-switches/BasicSwitches',
    selector: '.MuiSwitch-root',
  },
  {
    component: 'TextField',
    route: '/docs-components-text-fields/BasicTextFields',
    selector: '.MuiOutlinedInput-root',
  },
  {
    component: 'ToggleButton',
    route: '/docs-components-toggle-button/ToggleButtons',
    selector: '.MuiToggleButton-root',
  },
];

/** The criteria the Playwright suites test for a component. */
export function playwrightCriteria(component) {
  const layout = CSS_LAYOUT_SUITES.find((suite) => suite.component === component);
  return [
    ...(layout
      ? LAYOUT_CRITERIA.filter((number) => !(layout.skipCriteria ?? []).includes(number))
      : []),
    ...(FOCUS_VISIBLE_TARGETS.some((target) => target.component === component) ? ['2.4.7'] : []),
  ];
}
