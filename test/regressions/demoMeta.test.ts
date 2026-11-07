import { describe, it, expect } from 'vitest';
import { A11Y_RULES, SCREENSHOT_RULES, getConfig, parseRoute } from './demoMeta';

describe('parseRoute', () => {
  it('parses an a11y fixture route into its a11y/fixtures path, suite as slug', () => {
    expect(parseRoute('/a11y-buttons/ButtonA11yNonNative')).to.deep.equal({
      path: 'test/regressions/a11y/fixtures/buttons/ButtonA11yNonNative',
      slug: 'buttons',
      demo: 'ButtonA11yNonNative',
    });
  });

  it('returns null for a screenshot-only regression fixture route', () => {
    expect(parseRoute('/regression-Rating/FocusVisibleRating')).to.equal(null);
  });

  it('parses a docs-components route into path/slug/demo', () => {
    expect(parseRoute('/docs-components-buttons/BasicButtons')).to.deep.equal({
      path: 'docs/data/material/components/buttons/BasicButtons',
      slug: 'buttons',
      demo: 'BasicButtons',
    });
  });

  it('parses a getting-started template route into its docs/data path', () => {
    expect(
      parseRoute('/docs-getting-started-templates-crud-dashboard/CrudDashboard'),
    ).to.deep.equal({
      path: 'docs/data/material/getting-started/templates/crud-dashboard/CrudDashboard',
      slug: 'crud-dashboard',
      demo: 'CrudDashboard',
    });
  });

  it('parses a docs-product route into the matching product*/ docs/src path', () => {
    expect(parseRoute('/docs-product-material/MaterialHero')).to.deep.equal({
      path: 'docs/src/components/productMaterial/MaterialHero',
      slug: 'material',
      demo: 'MaterialHero',
    });
    expect(parseRoute('/docs-product-x/XGridFullDemo')).to.deep.equal({
      path: 'docs/src/components/productX/XGridFullDemo',
      slug: 'x',
      demo: 'XGridFullDemo',
    });
  });
});

describe('getConfig', () => {
  it('returns undefined when no rule matches', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/accordion/BasicAccordion'),
    ).to.equal(undefined);
  });

  it('returns a screenshot opt-out rule for an excluded demo', () => {
    expect(
      getConfig(SCREENSHOT_RULES, 'docs/data/material/components/autocomplete/Asynchronous'),
    ).to.deep.include({ enabled: false });
  });

  it('returns the a11y rule for a brace-glob enrolment', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/buttons/BasicButtons'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'test/regressions/a11y/fixtures/buttons/ButtonA11yNonNative'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
  });

  it('allows a known Button color-contrast fixture to record failures without asserting them', () => {
    expect(
      getConfig(A11Y_RULES, 'test/regressions/a11y/fixtures/buttons/ButtonA11yColorMatrix'),
    ).to.deep.include({
      enabled: true,
      assertions: 'all',
      skipAssertions: ['color-contrast'],
    });
  });

  it('asserts image-alt on the Avatar a11y fixture', () => {
    expect(
      getConfig(A11Y_RULES, 'test/regressions/a11y/fixtures/avatars/AvatarA11yImage'),
    ).to.deep.include({ enabled: true, assertions: 'all', skipAssertions: ['color-contrast'] });
  });

  it('keeps the a11y fixture tree screenshot-off, except explicit re-enrolments', () => {
    expect(
      getConfig(SCREENSHOT_RULES, 'test/regressions/a11y/fixtures/buttons/ButtonA11yColorMatrix'),
    ).to.deep.include({ enabled: false });
    expect(
      getConfig(SCREENSHOT_RULES, 'test/regressions/a11y/fixtures/buttons/ButtonA11yTextSpacing'),
    ).to.deep.include({ enabled: true });
  });

  it('asserts every rule on the enrolled Toggle Button demos', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/toggle-button/ToggleButtons'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(
        A11Y_RULES,
        'test/regressions/a11y/fixtures/toggle-button/ToggleButtonA11ySemanticStates',
      ),
    ).to.deep.include({ enabled: true, assertions: 'all' });
  });

  it('allows a known Toggle Button color-contrast fixture to record failures without asserting them', () => {
    expect(
      getConfig(
        A11Y_RULES,
        'test/regressions/a11y/fixtures/toggle-button/ToggleButtonA11yColorMatrix',
      ),
    ).to.deep.include({
      enabled: true,
      assertions: 'all',
      skipAssertions: ['color-contrast'],
    });
  });

  it('returns undefined for a demo outside a brace-glob enrolment', () => {
    // The buttons enrolments cover Button and IconButton, not ButtonBase.
    expect(getConfig(A11Y_RULES, 'docs/data/material/components/buttons/DisabledButtons')).to.equal(
      undefined,
    );
    expect(getConfig(A11Y_RULES, 'docs/data/material/components/buttons/ButtonBaseDemo')).to.equal(
      undefined,
    );
  });

  it('asserts every rule on the enrolled IconButton demos and fixtures', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/buttons/IconButtons'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/buttons/LoadingIconButton'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'test/regressions/a11y/fixtures/buttons/IconButtonA11ySemanticStates'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
  });

  it('returns the radio a11y rule for a brace-glob enrolment', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/radio-buttons/RadioButtonsGroup'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/radio-buttons/UseRadioGroup'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
  });

  it('returns undefined for a radio demo outside the enrolment', () => {
    // The radio-buttons enrolment omits FormControlLabelPlacement.
    expect(
      getConfig(
        A11Y_RULES,
        'docs/data/material/components/radio-buttons/FormControlLabelPlacement',
      ),
    ).to.equal(undefined);
  });

  it('leaves the StandaloneToggleButton demo unenrolled', () => {
    // StandaloneToggleButton is a docs demo that is not enrolled for axe assertions.
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/toggle-button/StandaloneToggleButton'),
    ).to.equal(undefined);
  });

  it('returns the a11y rule with assertions:all for the progress brace-glob enrolment', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/progress/LinearDeterminate'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/progress/CircularIndeterminate'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(
        A11Y_RULES,
        'test/regressions/a11y/fixtures/progress/LinearProgressA11yColorMatrix',
      ),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(
        A11Y_RULES,
        'test/regressions/a11y/fixtures/progress/CircularProgressA11yColorMatrix',
      ),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/progress/CircularWithValueLabel'),
    ).to.deep.include({
      enabled: true,
      assertions: 'all',
      skipAssertions: ['color-contrast'],
    });
  });

  it('returns undefined for a mixed progress demo outside the enrolment', () => {
    // CustomizedProgressBars and CircularIntegration render more than one component.
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/progress/CustomizedProgressBars'),
    ).to.equal(undefined);
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/progress/CircularIntegration'),
    ).to.equal(undefined);
  });

  it('opts the LinearProgress a11y fixtures out of screenshots', () => {
    expect(
      getConfig(
        SCREENSHOT_RULES,
        'test/regressions/a11y/fixtures/progress/LinearProgressA11ySemanticStates',
      ),
    ).to.deep.include({ enabled: false });
  });

  it('asserts every rule on the enrolled Switch demos', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/switches/BasicSwitches'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/switches/CustomizedSwitches'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
  });

  it('leaves the FormControlLabelPosition Switch demo unenrolled', () => {
    // Excluded for its `aria-label` on a role-less FormGroup div (aria-prohibited-attr).
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/switches/FormControlLabelPosition'),
    ).to.equal(undefined);
  });

  it('enrols a text-fields demo with assertions:all and color-contrast recorded-not-asserted', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/text-fields/FormPropsTextFields'),
    ).to.deep.include({ enabled: true, assertions: 'all', skipAssertions: ['color-contrast'] });
  });

  it('returns undefined for a text-fields demo outside the enrolment (select)', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/text-fields/SelectTextFields'),
    ).to.equal(undefined);
  });

  it('honours last-match-wins when multiple rules apply', () => {
    const rules = [
      { test: 'docs/data/material/components/foo/*', enabled: true },
      { test: 'docs/data/material/components/foo/Bar', enabled: false },
    ];
    expect(getConfig(rules, 'docs/data/material/components/foo/Bar')).to.deep.equal({
      test: 'docs/data/material/components/foo/Bar',
      enabled: false,
    });
    expect(getConfig(rules, 'docs/data/material/components/foo/Baz')).to.deep.equal({
      test: 'docs/data/material/components/foo/*',
      enabled: true,
    });
  });
});

describe('getConfig (accordion a11y)', () => {
  it('enrols the accordion demos and fixtures for all-rule assertions', () => {
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/accordion/AccordionUsage'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
    expect(
      getConfig(A11Y_RULES, 'test/regressions/a11y/fixtures/accordion/AccordionA11yNonNative'),
    ).to.deep.include({ enabled: true, assertions: 'all' });
  });

  it('records but does not assert color-contrast on the accordion cluster', () => {
    // The divider `::before` makes axe unable to resolve the summary background.
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/accordion/CustomizedAccordions'),
    ).to.deep.include({
      enabled: true,
      assertions: 'all',
      skipAssertions: ['color-contrast'],
    });
  });

  it('returns undefined for an accordion demo outside the brace-glob enrolment', () => {
    // The accordion enrolment lists specific demos; it is not slug-wide.
    expect(
      getConfig(A11Y_RULES, 'docs/data/material/components/accordion/SomeUnenrolledDemo'),
    ).to.equal(undefined);
  });
});

describe('minReactMajor', () => {
  it('marks the crud-dashboard template as needing React 19', () => {
    expect(
      getConfig(
        SCREENSHOT_RULES,
        'docs/data/material/getting-started/templates/crud-dashboard/CrudDashboard',
      ),
    ).to.deep.include({ minReactMajor: 19 });
  });

  it('leaves demos without the field unconstrained', () => {
    expect(
      getConfig(SCREENSHOT_RULES, 'docs/data/material/components/autocomplete/Asynchronous'),
    ).to.not.have.property('minReactMajor');
  });
});

describe('rule data sanity', () => {
  it('rule arrays are non-empty (catches accidental import regression)', () => {
    expect(SCREENSHOT_RULES.length).to.be.greaterThan(0);
    expect(A11Y_RULES.length).to.be.greaterThan(0);
  });
});
