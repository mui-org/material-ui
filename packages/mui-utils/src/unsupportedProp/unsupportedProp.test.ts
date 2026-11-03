import { describe, it, expect } from 'vitest';
import unsupportedProp from './unsupportedProp';

describe('unsupportedProp', () => {
  const propName = 'children';
  const componentName = 'ComponentName';
  const location = 'prop';
  const propFullName = null;

  it('should return null for supported props', () => {
    const props: Record<string, any> = {};
    // @ts-expect-error Validator expects a string for propFullName
    const result = unsupportedProp(props, propName, componentName, location, propFullName);
    expect(result).to.equal(null);
  });

  it('should return an error for unsupported props', () => {
    const props: Record<string, any> = {
      children: null,
    };
    // @ts-expect-error Validator expects a string for propFullName
    const result = unsupportedProp(props, propName, componentName, location, propFullName);
    expect(result!.message).to.match(/The prop `children` is not supported. Please remove it/);
  });
});
