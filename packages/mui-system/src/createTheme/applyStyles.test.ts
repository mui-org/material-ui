import { describe, it, expect } from 'vitest';
import applyStyles from './applyStyles';

describe('applyStyles', () => {
  it('should apply styles for media prefers-color-scheme', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `@media (prefers-color-scheme: ${colorScheme})`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '@media (prefers-color-scheme: light)': styles,
    });
  });

  it('should apply styles for a class selector', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `.${colorScheme}`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where(.light) &': styles,
    });
  });

  it('should apply styles for a data attribute selector', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme-${colorScheme}]`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where([data-color-scheme-light]) &': styles,
    });
  });

  it('should apply styles for a data attribute selector with &', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme="${colorScheme}"] &`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal({
      '*:where([data-color-scheme="light"]) &': styles,
    });
  });

  it('should not apply styles if colorScheme does not exist', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: (colorScheme: string) => {
        return `[data-color-scheme="${colorScheme}"] &`;
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'dark', styles)).to.deep.equal({});
  });

  it('should return the styles directly if selector is &', () => {
    const theme = {
      vars: {},
      colorSchemes: { light: true },
      getColorSchemeSelector: () => {
        return '&';
      },
    };
    const styles = { background: '#e5e5e5' };
    expect(applyStyles.call(theme, 'light', styles)).to.deep.equal(styles);
  });
});
