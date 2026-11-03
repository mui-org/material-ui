import { describe, beforeAll, afterAll, beforeEach, it, expect } from 'vitest';
import * as React from 'react';
import { __unsafe_useEmotionCache } from '@emotion/react';
import styled, { StyledEngineProvider, GlobalStyles } from '@mui/styled-engine';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { TEST_INTERNALS_DO_NOT_USE } from './StyledEngineProvider';

const isJSDOM = isJsdom();

describe('[Emotion] StyledEngineProvider', () => {
  const { render } = createRenderer();

  let rule: string | undefined;

  beforeAll(() => {
    TEST_INTERNALS_DO_NOT_USE.insert = (...args: any[]) => {
      rule = args[0];
    };
  });

  afterAll(() => {
    delete TEST_INTERNALS_DO_NOT_USE.insert;
  });

  beforeEach(() => {
    rule = undefined;
  });

  it('should create styles with @layer', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles={{ html: { color: 'red' } }} />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer mui{html{color:red;}}');
  });

  it('should not do anything if the style is layer order', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer theme,base,mui,components,utilities;');
  });

  it('should wrap @layer rule', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles={{ '@layer components': { html: { color: 'red' } } }} />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer mui{@layer components{html{color:red;}}}');
  });

  it('able to config layer order through GlobalStyles', () => {
    render(
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      </StyledEngineProvider>,
    );
    expect(rule).to.equal('@layer theme,base,mui,components,utilities;');
  });

  it('should reuse the same cache', () => {
    let upperCache;
    let innerCache;
    function Upper() {
      const cache = __unsafe_useEmotionCache();
      upperCache = cache;
      return (
        <StyledEngineProvider injectFirst>
          <Inner />
        </StyledEngineProvider>
      );
    }
    function Inner() {
      const cache = __unsafe_useEmotionCache();
      innerCache = cache;
      return null;
    }
    render(
      <StyledEngineProvider injectFirst>
        <Upper />
      </StyledEngineProvider>,
    );
    expect(innerCache).to.equal(upperCache);
  });
});

// In its own `describe` so the `TEST_INTERNALS_DO_NOT_USE.insert` hook above is
// NOT installed — that hook intercepts emotion's insert and never applies the
// CSS, which would prevent these tests from observing real cascade resolution.
describe('[Emotion] StyledEngineProvider cascade layers', () => {
  const { render } = createRenderer();

  // Regression test for the visual-regression flake where MUI's own layered
  // styles were intermittently defeated (e.g. CustomizedSwitches: the Stack
  // `margin-left: 8px` spacing collapsed to 0, reverting to the pre-cssLayer
  // look).
  //
  // `injectFirst` (UNLAYERED) and `enableCssLayer` (inside `@layer mui`) both
  // used cache key `css`, so the same style hashed to the same class name in
  // both. An unlayered rule beats every cascade layer, so the unlayered copy
  // overrode MUI's layered style. A dedicated key for the layered cache keeps
  // the generated class names distinct, so the collision cannot happen.
  //
  // Asserts the actual cascade ORDERING via `getComputedStyle`, so it needs a
  // real browser: jsdom does not resolve `@layer` precedence.
  it.skipIf(isJSDOM)(
    'layered styles are not defeated by identically-named unlayered styles',
    () => {
      const Child = styled('span')({ marginLeft: 0 }); // reset, low specificity
      const Parent = styled('div')({ '& > span': { marginLeft: '8px' } }); // spacing, higher specificity

      const { container } = render(
        <React.Fragment>
          {/* UNLAYERED: inserts `.css-<hash> { margin-left: 0 }` */}
          <StyledEngineProvider injectFirst>
            <Child />
          </StyledEngineProvider>
          {/* layered: the parent's higher-specificity spacing must still win */}
          <StyledEngineProvider enableCssLayer>
            <Parent>
              <Child data-testid="child" />
            </Parent>
          </StyledEngineProvider>
        </React.Fragment>,
      );

      const child = container.querySelector('[data-testid="child"]') as HTMLElement;
      // Without a dedicated layered key the unlayered `.css-<hash>{margin-left:0}`
      // collides with and defeats the layered spacing, collapsing this to `0px`.
      expect(getComputedStyle(child).marginLeft).to.equal('8px');
    },
  );
});
