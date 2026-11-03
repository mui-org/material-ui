import { describe, it, assert } from 'vitest';
import { createTheme } from '@mui/material/styles';
import {
  blend,
  roundRatio,
  roundedContrastRatio,
  requiredRatio,
  WCAG_MINIMUM_RATIO,
} from '../../test/contrast';
import {
  FAILING_PALETTE_COLORS,
  PALETTE_CONTRAST,
  failsWcag,
  measurePaletteContrast,
} from '../../test/contrastContract';

/**
 * Enforces the palette contrast contract (`test/contrastContract.ts`): the
 * pinned 1.4.3 facts every component conformance suite consumes. A palette
 * change fails here, in the PR that makes it, with the new values in the
 * failure message.
 */
describe('palette contrast contract', () => {
  const theme = createTheme();

  it('pins the contrast ratios of every palette color', () => {
    // The claim is stated at two decimals — the precision the reports and
    // public checkers display — so round the exact measurement to compare.
    const measured = measurePaletteContrast(theme).map((entry) => ({
      ...entry,
      contrastTextOnMain: roundRatio(entry.contrastTextOnMain),
      mainOnPaper: roundRatio(entry.mainOnPaper),
    }));

    assert.deepEqual(
      measured,
      [...PALETTE_CONTRAST],
      'The default palette contrast ratios changed. Current values: ' +
        `${measured.map(({ color, main, contrastTextOnMain, mainOnPaper }) => `${color} (${main}) ${contrastTextOnMain}:1 contrastText on main, ${mainOnPaper}:1 main on paper`).join('; ')}. ` +
        'Update PALETTE_CONTRAST in test/contrastContract.ts, the 1.4.3 sections ' +
        'of the affected conformance reports ' +
        '(packages/mui-material/src/<Component>/accessibility.md), and expect the ' +
        'recorded axe results (*.a11y.json) to change with the next regression run.',
    );
  });

  it('only info and warning fall short of WCAG 4.5:1, in both directions', () => {
    // Classify on the exact ratios: rounding first can flip a color at the
    // boundary (a true 4.4992:1 fails 1.4.3 but rounds to 4.5).
    const failing = measurePaletteContrast(theme)
      .filter((entry) => failsWcag(entry, WCAG_MINIMUM_RATIO.normalText))
      .map(({ color }) => color);

    assert.deepEqual(
      failing,
      [...FAILING_PALETTE_COLORS],
      'The set of default palette colors failing WCAG 4.5:1 changed. Update ' +
        'FAILING_PALETTE_COLORS in test/contrastContract.ts and re-check every ' +
        'conformance report that rates 1.4.3: the Known gaps entries name info ' +
        'and warning as the failing colors.',
    );
  });

  it('derives the 1.4.3 threshold from the typography a component renders with', () => {
    // Button labels: 14px at weight 500 — not WCAG large text.
    assert.equal(requiredRatio(theme.typography.button, theme.typography.htmlFontSize), 4.5);
    // Body text: 16px regular — not large text either.
    assert.equal(requiredRatio(theme.typography.body1, theme.typography.htmlFontSize), 4.5);
    // h4: 34px regular — large text, the relaxed 3:1 threshold applies.
    assert.equal(requiredRatio(theme.typography.h4, theme.typography.htmlFontSize), 3);
    // 14pt bold (18.66px at weight 700) is the other large-text doorway.
    assert.equal(requiredRatio({ fontSize: '18.66px', fontWeight: 700 }), 3);
    assert.equal(requiredRatio({ fontSize: '18.66px', fontWeight: 500 }), 4.5);
    // The CSS keyword is the same doorway as the number it stands for.
    assert.equal(requiredRatio({ fontSize: '18.66px', fontWeight: 'bold' }), 3);
    assert.equal(requiredRatio({ fontSize: '18.66px', fontWeight: 'normal' }), 4.5);
  });

  it('refuses a size or weight it cannot resolve instead of guessing', () => {
    // `em` depends on the parent, so a theme value alone cannot size it. The
    // old silent parseFloat read this as 1.5px and rated it as normal text.
    assert.throws(() => requiredRatio({ fontSize: '1.5em' }), /cannot size/);
    assert.throws(() => requiredRatio({ fontSize: '2rex' }), /cannot size/);
    // `bolder` is relative to the parent for the same reason. The old
    // `Number('bolder')` gave NaN, which silently failed the >= 700 test.
    assert.throws(
      () => requiredRatio({ fontSize: '18.66px', fontWeight: 'bolder' }),
      /cannot weigh/,
    );
  });

  it('composites translucent surfaces the way the browser paints them', () => {
    // The filled input surface: 6% black over white.
    assert.equal(blend('#000', 0.06, '#fff'), '#f0f0f0');
    // A selected-state tint: warning.main at 8% over white (ToggleButton).
    assert.equal(blend(theme.palette.warning.main, 0.08, '#fff'), '#fef3eb');
    // A translucent text color resolves against its background before rating:
    // text.secondary (60% black) on white measures 5.74:1.
    assert.equal(roundedContrastRatio('rgba(0, 0, 0, 0.6)', '#fff'), 5.74);
  });
});
