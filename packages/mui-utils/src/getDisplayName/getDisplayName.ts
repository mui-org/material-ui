import type * as React from 'react';
import { ForwardRef, Memo } from 'react-is';

function getFunctionComponentName(
  Component: React.FunctionComponent | React.ComponentClass,
  fallback = '',
) {
  return Component.displayName || Component.name || fallback;
}

function getWrappedName(outerType: any, innerType: any, wrapperName: string) {
  const functionName = getFunctionComponentName(innerType);
  return (
    outerType.displayName || (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName)
  );
}

/**
 * cherry-pick from
 * https://github.com/react/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 * originally forked from recompose/getDisplayName
 */
export default function getDisplayName(Component: React.ElementType): string | undefined {
  if (Component == null) {
    return undefined;
  }

  if (typeof Component === 'string') {
    return Component;
  }

  if (typeof Component === 'function') {
    return getFunctionComponentName(Component, 'Component');
  }

  // TypeScript can't have components as objects but they exist in the form of `memo` or `Suspense`
  if (typeof Component === 'object') {
    switch ((Component as any).$$typeof) {
      case ForwardRef:
        return getWrappedName(Component, (Component as any).render, 'ForwardRef');
      case Memo:
        return getWrappedName(Component, (Component as any).type, 'memo');
      default:
        return undefined;
    }
  }

  return undefined;
}
