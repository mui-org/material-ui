import { describe, test, expect } from 'vitest';
import createTheme from './createTheme';
import {
  applyDensity,
  DEFAULT_SIZING_PX,
  DEFAULT_STEP_PX,
  DENSITY_KEYS,
  SIZING_KEYS,
} from './densityScale';

const lastSheet = (theme: ReturnType<typeof applyDensity>) => {
  const sheets = theme.generateStyleSheets();
  return sheets[sheets.length - 1];
};
const rootVars = (theme: ReturnType<typeof applyDensity>) =>
  lastSheet(theme)[':root'] as Record<string, string>;
const sx = (theme: ReturnType<typeof createTheme>, input: Record<string, unknown>) =>
  (theme as any).unstable_sx(input);

describe('densityScale', () => {
  describe('applyDensity on a static theme', () => {
    test('theme.spacing resolves every step to px', () => {
      const theme = applyDensity(createTheme());

      expect(
        Object.fromEntries(DENSITY_KEYS.map((key) => [key, theme.spacing(key)])),
      ).to.deep.equal({
        xxSmall: '4px',
        xSmall: '8px',
        small: '12px',
        medium: '16px',
        large: '24px',
        xLarge: '32px',
        xxLarge: '48px',
      });
    });

    test('negated steps resolve to negative px; numbers, raw CSS and other names stay untouched', () => {
      const theme = applyDensity(createTheme());

      expect(theme.spacing('-xSmall')).to.equal('-8px');
      expect(theme.spacing(2)).to.equal('16px');
      expect(theme.spacing('small', 2)).to.equal('12px 16px');
      expect(theme.spacing('auto')).to.equal('auto');
      expect(theme.spacing(1, 'auto')).to.equal('8px auto');
      expect(theme.spacing('toString')).to.equal('toString');
      SIZING_KEYS.forEach((key) => {
        expect(theme.spacing(key)).to.equal(key);
      });
    });

    test('the sizing constants land on the theme as px lengths', () => {
      const theme = applyDensity(createTheme());

      expect(Object.fromEntries(SIZING_KEYS.map((key) => [key, theme[key]]))).to.deep.equal({
        touchTarget: '32px',
        iconSize: '16px',
      });
    });

    test('an override replaces only the values it names', () => {
      const overrides = { spacing: { small: 6, large: 40 }, touchTarget: 24 };
      const theme = applyDensity(createTheme(), overrides);

      expect(theme.unstable_densityScale).to.deep.equal({
        ...DEFAULT_SIZING_PX,
        ...overrides,
        spacing: { ...DEFAULT_STEP_PX, ...overrides.spacing },
      });
      expect([
        theme.spacing('small'),
        theme.spacing('-small'),
        theme.spacing('medium'),
      ]).to.deep.equal(['6px', '-6px', '16px']);
      expect([theme.touchTarget, theme.iconSize]).to.deep.equal([
        '24px',
        `${DEFAULT_SIZING_PX.iconSize}px`,
      ]);
      expect(
        applyDensity(createTheme({ spacing: [0, 4, 8, 16] }), { spacing: { small: 10 } }).spacing(
          'small',
        ),
      ).to.equal('10px');
    });

    test('every spacing option form keeps the steps in px and its own meaning for numbers', () => {
      const forms: Record<string, any> = {
        number: 4,
        rem: '0.5rem',
        function: (factor: number) => `${0.25 * factor}rem`,
        array: [0, 4, 8, 16, 32, 64],
      };
      const read = (spacing: any) => {
        const theme = applyDensity(createTheme({ spacing }));
        return [theme.spacing('small'), theme.spacing('-small'), theme.spacing(2)];
      };

      expect(
        Object.fromEntries(Object.entries(forms).map(([name, form]) => [name, read(form)])),
      ).to.deep.equal({
        number: ['12px', '-12px', '8px'],
        rem: ['12px', '-12px', 'calc(2 * 0.5rem)'],
        function: ['12px', '-12px', '0.5rem'],
        array: ['12px', '-12px', '8px'],
      });
    });

    test('createTheme over the enhanced spacing keeps the steps in sx', () => {
      const theme = createTheme({ spacing: applyDensity(createTheme()).spacing });

      expect(sx(theme, { p: 'small' })).to.deep.equal({ padding: '12px' });
    });

    test('does not mutate the input theme and owns a fresh components object', () => {
      const input = createTheme({
        components: { MuiButton: { defaultProps: { disableRipple: true } } },
      });
      const theme = applyDensity(input);

      expect(input.spacing('small')).to.equal('small');
      expect('unstable_densityScale' in input).to.equal(false);
      expect(theme.components).to.not.equal(input.components);
      expect(theme.components.MuiButton).to.deep.equal({ defaultProps: { disableRipple: true } });
    });
  });

  describe('applyDensity on a CSS variables theme', () => {
    test('theme.spacing resolves every step to its variable, with the px as fallback', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));

      DENSITY_KEYS.forEach((key) => {
        expect(theme.spacing(key)).to.equal(`var(--mui-spacing-${key}, ${DEFAULT_STEP_PX[key]}px)`);
      });
      expect(theme.spacing('-xSmall')).to.equal('calc(var(--mui-spacing-xSmall, 8px) * -1)');
      expect(theme.spacing('small', 2)).to.equal(
        'var(--mui-spacing-small, 12px) calc(2 * var(--mui-spacing, 8px))',
      );
      expect(theme.spacing(1, 'auto')).to.equal('var(--mui-spacing, 8px) auto');
    });

    test('the last style sheet defines the steps and sizing constants in px, whatever the spacing unit', () => {
      const expected = {
        ...Object.fromEntries(
          DENSITY_KEYS.map((key) => [`--mui-spacing-${key}`, `${DEFAULT_STEP_PX[key]}px`]),
        ),
        ...Object.fromEntries(
          SIZING_KEYS.map((key) => [`--mui-${key}`, `${DEFAULT_SIZING_PX[key]}px`]),
        ),
      };

      [undefined, 4, '0.5rem', [0, 4, 8, 16, 32, 64]].forEach((spacing) => {
        expect(
          rootVars(applyDensity(createTheme({ cssVariables: true, spacing } as any))),
        ).to.deep.equal(expected);
      });
    });

    test('a step override changes the variable value and the fallback', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }), { spacing: { small: 6 } });

      expect(rootVars(theme)['--mui-spacing-small']).to.equal('6px');
      expect(theme.spacing('small')).to.equal('var(--mui-spacing-small, 6px)');
    });

    test('the variables sheet uses the theme rootSelector', () => {
      const theme = applyDensity(createTheme({ cssVariables: { rootSelector: '.app' } }));

      expect(Object.keys(lastSheet(theme))).to.deep.equal(['.app']);
    });

    test('adds only the sizing constants to theme.vars, as references', () => {
      const input = createTheme({ cssVariables: true });
      const theme = applyDensity(input, { touchTarget: 24 });

      expect(theme.vars!.touchTarget).to.equal('var(--mui-touchTarget, 24px)');
      expect(theme.vars!.iconSize).to.equal(`var(--mui-iconSize, ${DEFAULT_SIZING_PX.iconSize}px)`);
      expect(theme.touchTarget).to.equal('24px');
      expect(theme.vars!.spacing).to.equal(input.vars.spacing);
      expect(Object.keys(theme.vars!).filter((key) => !(key in input.vars))).to.deep.equal(
        SIZING_KEYS,
      );
    });

    test('does not mutate a CSS variables input theme', () => {
      const input = createTheme({ cssVariables: true });
      const sheets = input.generateStyleSheets().length;
      applyDensity(input);

      expect(input.generateStyleSheets()).to.have.length(sheets);
      SIZING_KEYS.forEach((key) => {
        expect(key in input.vars).to.equal(false);
      });
    });

    test('the rebuilds CssVarsProvider runs on mount keep the steps and sizing constants', () => {
      const theme = applyDensity(createTheme({ cssVariables: true }));
      const spacing = (theme as any).generateSpacing() as typeof theme.spacing;
      const vars = theme.generateThemeVars!() as NonNullable<typeof theme.vars>;

      expect(spacing('small')).to.equal('var(--mui-spacing-small, 12px)');
      expect(spacing(2)).to.equal('calc(2 * var(--mui-spacing, 8px))');
      expect(sx({ ...theme, spacing } as any, { p: 'small' })).to.deep.equal({
        padding: 'var(--mui-spacing-small, 12px)',
      });
      SIZING_KEYS.forEach((key) => {
        expect(vars[key]).to.equal(`var(--mui-${key}, ${DEFAULT_SIZING_PX[key]}px)`);
      });
      expect(vars.spacing).to.equal('var(--mui-spacing)');
    });

    test('respects cssVarPrefix, including an empty one', () => {
      const app = applyDensity(createTheme({ cssVariables: { cssVarPrefix: 'app' } }));
      const bare = applyDensity(createTheme({ cssVariables: { cssVarPrefix: '' } }));

      expect(app.spacing('small')).to.equal('var(--app-spacing-small, 12px)');
      expect(app.spacing(1)).to.equal('var(--app-spacing, 8px)');
      expect(app.vars!.touchTarget).to.equal('var(--app-touchTarget, 32px)');
      expect(bare.spacing('small')).to.equal('var(--spacing-small, 12px)');
      expect(bare.vars!.touchTarget).to.equal('var(--touchTarget, 32px)');
      expect(rootVars(bare)).to.include({ '--spacing-small': '12px', '--touchTarget': '32px' });
      expect(Object.keys(rootVars(bare)).some((name) => name.startsWith('---'))).to.equal(false);
    });
  });

  describe('sx spacing props', () => {
    test('resolve steps and negated steps on static and CSS variables themes', () => {
      const staticTheme = applyDensity(createTheme());
      const varsTheme = applyDensity(createTheme({ cssVariables: true }));

      expect(sx(staticTheme, { p: 'small', mx: '-small' })).to.deep.equal({
        padding: '12px',
        marginLeft: '-12px',
        marginRight: '-12px',
      });
      expect(sx(varsTheme, { p: 'small', gap: '-medium' })).to.deep.equal({
        padding: 'var(--mui-spacing-small, 12px)',
        gap: 'calc(var(--mui-spacing-medium, 16px) * -1)',
      });
    });

    test('leave raw CSS and the sizing names untouched', () => {
      const theme = applyDensity(createTheme());

      expect(sx(theme, { m: 'auto', p: '2rem' })).to.deep.equal({
        margin: 'auto',
        padding: '2rem',
      });
      SIZING_KEYS.forEach((key) => {
        expect(sx(theme, { m: key })).to.deep.equal({ margin: key });
      });
    });
  });
});
