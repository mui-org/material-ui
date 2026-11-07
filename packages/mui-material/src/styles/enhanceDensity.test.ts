import { describe, test, expect } from 'vitest';
import createTheme from './createTheme';
import enhanceDensity from './enhanceDensity';

const leaves = (node: unknown, path = '', out: Record<string, string> = {}) => {
  if (node !== null && typeof node === 'object') {
    Object.entries(node).forEach(([key, value]) => leaves(value, `${path}/${key}`, out));
  } else if (typeof node === 'string' || typeof node === 'number') {
    out[path] = String(node);
  }
  return out;
};

const isSignFlip = (ltr: string, rtl: string) =>
  rtl === `-${ltr}` ||
  rtl === `calc(-1 * ${ltr})` ||
  (ltr.includes('calc(1 * ') && rtl === ltr.replace('calc(1 * ', 'calc(-1 * '));

describe('enhanceDensity', () => {
  test('accepts a theme without a body2 variant', () => {
    expect(() => enhanceDensity(createTheme({ typography: { body2: undefined } }))).not.to.throw();
  });

  test('a user slotProps default merges into the density default of the same slot', () => {
    const closeButton = (slotProps: Record<string, unknown>) =>
      (
        enhanceDensity(createTheme({ components: { MuiAlert: { defaultProps: { slotProps } } } }))
          .components as any
      ).MuiAlert.defaultProps.slotProps.closeButton;

    expect(closeButton({ closeButton: { title: 'user' } })).to.deep.equal({
      size: 'medium',
      title: 'user',
    });
    expect(closeButton({ closeButton: { size: 'small' } })).to.deep.equal({ size: 'small' });
  });

  test('the toolbar mixin matches the regular Toolbar height', () => {
    const theme = enhanceDensity(createTheme());
    const regular = (theme.components as any).MuiToolbar.styleOverrides.root[0].variants.find(
      (variant: { props: { variant?: string } }) => variant.props.variant === 'regular',
    ).style;

    expect(theme.mixins.toolbar).to.deep.equal(regular);
  });

  test('the toolbar mixin keeps the keys it does not size', () => {
    const theme = enhanceDensity(createTheme({ mixins: { toolbar: { gap: 4 } } }));

    expect(theme.mixins.toolbar).to.include({ gap: 4, minHeight: 'calc(32px + 2*8px)' });
  });

  test('leaves the input theme unchanged', () => {
    const input = createTheme({
      components: {
        MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
        MuiAlert: { defaultProps: { slotProps: { closeButton: { title: 'user' } } } },
      },
    });
    const before = JSON.stringify(input);
    enhanceDensity(input);

    expect(JSON.stringify(input)).to.equal(before);
  });

  test('an rtl theme only flips the sign of the inline offsets', () => {
    const ltr = leaves(enhanceDensity(createTheme()).components);
    const rtl = leaves(enhanceDensity(createTheme({ direction: 'rtl' })).components);
    const differing = Object.keys({ ...ltr, ...rtl }).filter((path) => ltr[path] !== rtl[path]);

    const inlineOffsets = Object.keys(ltr).filter(
      (path) => path.endsWith('/--_inlinePad') || ltr[path].startsWith('translateX('),
    );

    expect(inlineOffsets).not.to.have.length(0);
    expect(inlineOffsets.filter((path) => !differing.includes(path))).to.deep.equal([]);
    expect(differing.filter((path) => !isSignFlip(ltr[path] ?? '', rtl[path] ?? ''))).to.deep.equal(
      [],
    );
  });
});
