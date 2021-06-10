import * as React from 'react';
import PropTypes from 'prop-types';
import useId from './useId';

export const opaqueIdentifierPropType = PropTypes.oneOfType([PropTypes.object, PropTypes.string]);

declare const opaqueIdentifierBranding: unique symbol;
/**
 * WARNING: Don't use this as a `string`.
 *
 * This is an opaque type that is not supposed to type-check structurally.
 * It is only valid if returned from React methods and passed to React e.g. `<button aria-labelledby={opaqueIdentifier} />`
 */
// We can't create a type that would be rejected for string concatenation or `.toString()` calls.
// So in order to not have to add `string | OpaqueIdentifier` to every react-dom host prop we intersect it with `string`.
type OpaqueIdentifier = string & {
  readonly [opaqueIdentifierBranding]: unknown;
  // While this would cause `const stringified: string = opaqueIdentifier.toString()` to not type-check it also adds completions while typing.
  // It would also still allow string concatenation.
  // Unsure which is better. Not type-checking or not suggesting.
  // toString(): void;
};

/**
 * A type that React can stringify.
 * @remark We only allow string-like types to prevent unexpected stringification behavior. It's not always clear how e.g. booleans or arrays are stringified.
 */
export type ReactStringAttribute = OpaqueIdentifier | string;

export default function usePossiblyOpaqueIdentifier(
  idOverride?: string,
): OpaqueIdentifier | undefined {
  // react@next?
  if (typeof (React as any).unstable_useOpaqueIdentifier === 'function') {
    const opaqueIdentifier = (React as any).unstable_useOpaqueIdentifier();

    return idOverride ?? opaqueIdentifier;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks -- early return is invariant during runtime
  return useId(idOverride) as OpaqueIdentifier | undefined;
}
