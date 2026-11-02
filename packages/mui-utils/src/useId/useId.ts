'use client';
import * as React from 'react';

/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export default function useId(idOverride?: string): string {
  const reactId = React.useId();
  return idOverride ?? reactId;
}
