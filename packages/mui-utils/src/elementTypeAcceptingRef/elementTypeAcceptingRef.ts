import PropTypes from 'prop-types';
import * as React from 'react';
import chainPropTypes from '../chainPropTypes';

function isClassComponent(elementType: Function) {
  // elementType.prototype?.isReactComponent
  const { prototype = {} } = elementType;

  return Boolean(prototype.isReactComponent);
}

function elementTypeAcceptingRef(
  props: { [key: string]: unknown },
  propName: string,
  componentName: string,
  location: string,
  propFullName: string,
) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;

  if (
    propValue == null ||
    // When server-side rendering React doesn't warn either.
    // This is not an accurate check for SSR.
    // This is only in place for emotion compat.
    // TODO: Revisit once https://github.com/react/react/issues/20047 is resolved.
    typeof window === 'undefined'
  ) {
    return null;
  }

  let warningHint;

  /**
   * Blacklisting instead of whitelisting
   *
   * Blacklisting will miss some components, such as React.Fragment. Those will at least
   * trigger a warning in React.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. "Safe" means there's no public API.
   *
   */
  if (typeof propValue === 'function' && !isClassComponent(propValue)) {
    warningHint = 'Did you accidentally provide a plain function component instead?';
  }

  if (propValue === React.Fragment) {
    warningHint = 'Did you accidentally provide a React.Fragment instead?';
  }

  if (warningHint !== undefined) {
    // #host-reference
    return new Error(
      `Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` +
        `Expected an element type that can hold a ref. ${warningHint} ` +
        'For more information see https://next.mui.com/r/caveat-with-refs-guide',
    );
  }

  return null;
}

export default chainPropTypes(PropTypes.elementType, elementTypeAcceptingRef);
