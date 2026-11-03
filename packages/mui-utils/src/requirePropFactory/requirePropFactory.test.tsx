import { describe, beforeAll, it, expect, beforeEach } from 'vitest';
import PropTypes from 'prop-types';
import requirePropFactory from './requirePropFactory';

describe('requirePropFactory', () => {
  const componentNameInError = 'componentNameInError';
  let requireProp: (prop: string) => PropTypes.Validator<any>;

  beforeAll(() => {
    requireProp = requirePropFactory(componentNameInError);
  });

  it('should have the right shape', () => {
    expect(typeof requirePropFactory).to.equal('function');
    expect(typeof requireProp).to.equal('function');
  });

  describe('requireProp()', () => {
    const requiredPropName = 'requiredPropName';

    let requirePropValidator: PropTypes.Validator<any>;

    beforeAll(() => {
      requirePropValidator = requireProp(requiredPropName);
    });

    it('should return a function', () => {
      expect(typeof requirePropValidator).to.equal('function');
    });

    describe('requirePropValidator', () => {
      let props: Record<string, unknown>;
      let propName: string;

      beforeEach(() => {
        PropTypes.resetWarningCache();
      });

      it('should not warn for propName not in props', () => {
        propName = 'propName';
        props = {};

        expect(() => {
          PropTypes.checkPropTypes(
            {
              [propName]: requirePropValidator,
            },
            props,
            'prop',
            componentNameInError,
          );
        }).not.toErrorDev();
      });

      it('should not warn for propName and requiredProp in props', () => {
        propName = 'propName';
        props = {};
        props[propName] = true;
        props[requiredPropName] = true;

        expect(() => {
          PropTypes.checkPropTypes(
            {
              [propName]: requirePropValidator,
            },
            props,
            'prop',
            componentNameInError,
          );
        }).not.toErrorDev();
      });

      describe('propName is in props and requiredProp not in props', () => {
        let result: Error | null;

        beforeAll(() => {
          props = {};
          propName = 'propName';
          props[propName] = true;
          delete props[requiredPropName];
          // @ts-expect-error The validator should be called with the right arguments
          result = requirePropValidator(props, propName, undefined, undefined, undefined);
        });

        it('should return Error', () => {
          expect(() => {
            PropTypes.checkPropTypes(
              {
                [propName]: requirePropValidator,
              },
              props,
              'prop',
              componentNameInError,
            );
          }).toErrorDev(
            'Warning: Failed prop type: The prop `propName` of `componentNameInError` can only be used together with the `requiredPropName` prop.',
          );
        });

        describe('propFullName given to validator', () => {
          let propFullName: string;

          beforeAll(() => {
            propFullName = 'propFullName';
            // @ts-expect-error The validator should be called with the right arguments
            result = requirePropValidator(props, propName, undefined, undefined, propFullName);
          });

          it('returned error message should have propFullName', () => {
            expect(result!.message.includes(propFullName)).to.equal(true);
          });

          it('returned error message should not have propName', () => {
            expect(result!.message.includes(propName)).to.equal(false);
          });
        });
      });

      it('should work with chained proptypes coming from the default props', () => {
        function Test() {
          return null;
        }
        Test.propTypes = {
          test: PropTypes.string,
        };

        const localProps: Record<string, unknown> = {};
        const localPropName = 'test';
        localProps[localPropName] = 'string';

        const updatedPropChecker = requirePropFactory('Test', Test);

        expect(() => {
          PropTypes.checkPropTypes(
            {
              [localPropName]: updatedPropChecker('otherProp'),
            },
            localProps,
            'prop',
            'Test',
          );
        }).toErrorDev([
          'Warning: Failed prop type: The prop `test` of `Test` can only be used together with the `otherProp` prop.',
        ]);
      });

      it('should validate default prop types coming from the component', () => {
        function Test() {
          return null;
        }
        Test.propTypes = {
          test: PropTypes.string,
        };

        const localProps: Record<string, unknown> = {};
        const localPropName = 'test';
        localProps[localPropName] = true;

        const updatedPropChecker = requirePropFactory('Test', Test);

        expect(() => {
          PropTypes.checkPropTypes(
            {
              [localPropName]: updatedPropChecker('otherProp'),
            },
            localProps,
            'prop',
            'Test',
          );
        }).toErrorDev([
          'Warning: Failed prop type: Invalid prop `test` of type `boolean` supplied to `Test`, expected `string`.',
        ]);
      });
    });
  });
});
