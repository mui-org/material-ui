import { describe, beforeEach, it, expect } from 'vitest';
import PropTypes from 'prop-types';
import chainPropTypes from './chainPropTypes';

describe('chainPropTypes', () => {
  const props = {};
  const propName = 'children';
  const componentName = 'ComponentName';
  const location = 'prop';

  beforeEach(() => {
    PropTypes.resetWarningCache();
  });

  it('should have the right shape', () => {
    expect(typeof chainPropTypes).to.equal('function');
  });

  it('should return null for supported props', () => {
    PropTypes.checkPropTypes(
      {
        [propName]: chainPropTypes(PropTypes.string, () => null),
      },
      props,
      location,
      componentName,
    );
    expect(() => {}).not.toErrorDev();
  });

  it('should return an error for unsupported props', () => {
    expect(() => {
      PropTypes.checkPropTypes(
        {
          [propName]: chainPropTypes(PropTypes.string, () => new Error('something is wrong')),
        },
        props,
        location,
        componentName,
      );
    }).toErrorDev(['something is wrong']);
  });
});
