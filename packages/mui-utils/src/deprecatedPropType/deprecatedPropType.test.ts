import { describe, beforeEach, it, expect } from 'vitest';
import PropTypes from 'prop-types';
import deprecatedPropType from '@mui/utils/deprecatedPropType';

describe('deprecatedPropType', () => {
  const componentName = 'ComponentName';
  const location = 'prop';

  beforeEach(() => {
    PropTypes.resetWarningCache();
  });

  it('should not warn', () => {
    const propName = `children${new Date()}`;
    const props: Record<string, any> = {};
    PropTypes.checkPropTypes(
      {
        [propName]: deprecatedPropType(PropTypes.string, 'give me a reason'),
      },
      props,
      location,
      componentName,
    );
    expect(() => {}).not.toErrorDev();
  });

  it('should warn once', () => {
    const propName = `children`;
    const props: Record<string, any> = {
      [propName]: 'yolo',
    };

    expect(() => {
      PropTypes.checkPropTypes(
        {
          [propName]: deprecatedPropType(PropTypes.string, 'give me a reason'),
        },
        props,
        location,
        componentName,
      );
    }).toErrorDev('give me a reason');

    expect(() => {
      PropTypes.checkPropTypes(
        {
          [propName]: deprecatedPropType(PropTypes.string, 'give me a reason'),
        },
        props,
        location,
        componentName,
      );
    }).not.toErrorDev();
  });
});
