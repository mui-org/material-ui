import PropTypes from 'prop-types';
import chainPropTypes from '../chainPropTypes';

function isClassComponent(elementType: Function) {
  // elementType.prototype?.isReactComponent
  const { prototype = {} } = elementType;

  return Boolean(prototype.isReactComponent);
}

function acceptingRef(
  props: { [key: string]: unknown },
  propName: string,
  componentName: string,
  location: string,
  propFullName: string,
) {
  const element = props[propName];
  const safePropName = propFullName || propName;

  if (
    element == null ||
    // When server-side rendering React doesn't warn either.
    // This is not an accurate check for SSR.
    // This is only in place for Emotion compat.
    // TODO: Revisit once https://github.com/react/react/issues/20047 is resolved.
    typeof window === 'undefined'
  ) {
    return null;
  }

  let warningHint;

  const elementType: unknown = (element as any).type;
  /**
   * Blacklisting instead of whitelisting
   *
   * Blacklisting will miss some components, such as React.Fragment. Those will at least
   * trigger a warning in React.
   * We can't whitelist because there is no safe way to detect React.forwardRef
   * or class components. "Safe" means there's no public API.
   *
   */
  if (typeof elementType === 'function' && !isClassComponent(elementType)) {
    warningHint = 'Did you accidentally use a plain function component for an element instead?';
  }

  if (warningHint !== undefined) {
    return new Error(
      `Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. ` +
        `Expected an element that can hold a ref. ${warningHint} ` +
        'For more information see https://mui.com/r/caveat-with-refs-guide',
    );
  }

  return null;
}

const elementAcceptingRef = chainPropTypes(
  PropTypes.element,
  acceptingRef,
) as PropTypes.Requireable<unknown>;
elementAcceptingRef.isRequired = chainPropTypes(PropTypes.element.isRequired, acceptingRef);

export default elementAcceptingRef;
