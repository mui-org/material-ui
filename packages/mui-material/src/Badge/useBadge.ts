'use client';
import type * as React from 'react';
import usePreviousProps from '@mui/utils/usePreviousProps';
import type { UseBadgeParameters, UseBadgeReturnValue } from './useBadge.types';

function useBadge(parameters: UseBadgeParameters): UseBadgeReturnValue {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false,
  } = parameters;

  const prevProps = usePreviousProps({
    badgeContent: badgeContentProp,
    max: maxProp,
  });

  let invisible = invisibleProp;

  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }

  const { badgeContent, max = maxProp } = invisible ? prevProps : parameters;

  const displayValue: React.ReactNode =
    badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;

  return {
    badgeContent,
    invisible,
    max,
    displayValue,
  };
}

export default useBadge;
