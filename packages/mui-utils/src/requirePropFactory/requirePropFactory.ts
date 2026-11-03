import type * as React from 'react';
import type PropTypes from 'prop-types';

export default function requirePropFactory(
  componentNameInError: string,
  Component?: React.ComponentType<unknown>,
): (requiredProp: string) => PropTypes.Validator<any> {
  if (process.env.NODE_ENV === 'production') {
    return () => () => null;
  }

  // eslint-disable-next-line react/forbid-foreign-prop-types
  const prevPropTypes = Component ? { ...Component.propTypes } : null;

  const requireProp =
    (requiredProp: string): PropTypes.Validator<any> =>
    (props, propName, componentName, location, propFullName, ...args) => {
      const propFullNameSafe = propFullName || propName;

      const defaultTypeChecker = prevPropTypes?.[propFullNameSafe];

      if (defaultTypeChecker) {
        const typeCheckerResult = defaultTypeChecker(
          props,
          propName,
          componentName,
          location,
          propFullName,
          ...args,
        );
        if (typeCheckerResult) {
          return typeCheckerResult;
        }
      }

      if (typeof props[propName] !== 'undefined' && !props[requiredProp]) {
        return new Error(
          `The prop \`${propFullNameSafe}\` of ` +
            `\`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`,
        );
      }

      return null;
    };
  return requireProp;
}
