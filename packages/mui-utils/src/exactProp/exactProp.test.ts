import { describe, beforeEach, it, expect } from 'vitest';
import PropTypes from 'prop-types';
import exactProp from './exactProp';

describe('exactProp()', () => {
  beforeEach(() => {
    PropTypes.resetWarningCache();
  });

  it('should return null for supported props', () => {
    const props = {
      bar: false,
    };
    const propTypes = {
      bar: PropTypes.bool,
    };

    expect(() => {
      PropTypes.checkPropTypes(exactProp(propTypes), props, 'props', 'Component');
    }).not.toErrorDev();
  });

  it('should return an error for unsupported props', () => {
    const props = {
      foo: false,
    };
    const propTypes = {
      bar: PropTypes.bool,
    };

    expect(() => {
      PropTypes.checkPropTypes(exactProp(propTypes), props, 'props', 'Component');
    }).toErrorDev('The following props are not supported: `foo`. Please remove them');
  });
});
