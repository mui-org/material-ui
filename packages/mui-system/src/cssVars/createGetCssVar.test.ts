import { describe, it, expect } from 'vitest';
import createGetCssVar from './createGetCssVar';

describe('createGetCssVar', () => {
  describe('default without prefix', () => {
    const getThemeVar = createGetCssVar();

    it('should return correct CSS var with default prefix', () => {
      expect(getThemeVar('palette-primary-500')).to.equal('var(--palette-primary-500)');
    });

    it('should return correct CSS var with prefix', () => {
      expect(getThemeVar('palette-primary-500')).to.equal('var(--palette-primary-500)');
    });

    it('should return correct CSS var with comma', () => {
      expect(getThemeVar('fontFamily-body, JetBrains Mono')).to.equal(
        'var(--fontFamily-body, JetBrains Mono)',
      );
      expect(getThemeVar('fontSize-xl, ')).to.equal('var(--fontSize-xl, )'); // this is a valid CSS.
    });

    it('support default value', () => {
      expect(getThemeVar('palette-primary-500', 'palette-background-body')).to.equal(
        'var(--palette-primary-500, var(--palette-background-body))',
      );
    });

    it('support nested values', () => {
      expect(
        getThemeVar('palette-primary-500', 'palette-primary-600', 'palette-text-primary'),
      ).to.equal(
        'var(--palette-primary-500, var(--palette-primary-600, var(--palette-text-primary)))',
      );
    });
  });

  it('able to custom prefix', () => {
    const getThemeVar = createGetCssVar('custom');
    expect(getThemeVar('shadow-xs')).to.equal('var(--custom-shadow-xs)');
  });

  it('does not add var() to CSS value', () => {
    const getCssVar = createGetCssVar();
    expect(getCssVar('palette-primary-500', 'rgba(255 255 255 / 0.1)')).to.equal(
      'var(--palette-primary-500, rgba(255 255 255 / 0.1))',
    );
    expect(getCssVar('fontSize-sm', '1rem')).to.equal('var(--fontSize-sm, 1rem)');
  });
});
