import { describe, it, expect } from 'vitest';
import propsToClassKey from './propsToClassKey';

describe('propsToClassKey', () => {
  it('should return the variant value as string', () => {
    expect(propsToClassKey({ variant: 'custom' })).to.equal('custom');
  });

  it('should combine the variant with other props', () => {
    expect(propsToClassKey({ variant: 'custom', size: 'large' })).to.equal('customSizeLarge');
  });

  it('should append the props after the variant in alphabetical order', () => {
    expect(propsToClassKey({ variant: 'custom', size: 'large', mode: 'static' })).to.equal(
      'customModeStaticSizeLarge',
    );
  });

  it('should not prefix the color prop', () => {
    expect(propsToClassKey({ variant: 'custom', color: 'primary' })).to.equal('customPrimary');
  });

  it('should work without variant in props', () => {
    expect(propsToClassKey({ color: 'primary', size: 'large', mode: 'static' })).to.equal(
      'primaryModeStaticSizeLarge',
    );
  });

  it('should not capitalize the first prop', () => {
    expect(propsToClassKey({ size: 'large', zIndex: 'toolbar' })).to.equal(
      'sizeLargeZIndexToolbar',
    );
  });

  it('should work with non string properties', () => {
    expect(propsToClassKey({ disabled: true, valid: false })).to.equal('disabledTrueValidFalse');
  });
});
