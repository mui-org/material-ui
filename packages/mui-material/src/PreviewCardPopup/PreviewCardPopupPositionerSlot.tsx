'use client';
import * as React from 'react';
import type { HTMLProps } from '@base-ui/react/types';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRtl } from '@mui/system/RtlProvider';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import useSlot from '../utils/useSlot';
import { getPreviewCardPopupUtilityClass } from './previewCardPopupClasses';
import type { PreviewCardPopupOwnerState, PreviewCardPopupProps } from './PreviewCardPopup';

const useUtilityClasses = (ownerState: PreviewCardPopupOwnerState) => {
  const { classes } = ownerState;
  const slots = { positioner: ['positioner'] };
  return composeClasses(slots, getPreviewCardPopupUtilityClass, classes);
};

const PreviewCardPopupPositioner = styled('div', {
  name: 'MuiPreviewCardPopup',
  slot: 'positioner',
})({
  zIndex: 1,
});

export interface PreviewCardPopupPositionerSlotProps {
  baseProps: HTMLProps;
  ownerState: PreviewCardPopupOwnerState;
  externalForwardedProps: Pick<PreviewCardPopupProps, 'slots' | 'slotProps'>;
}

/**
 * @ignore - internal component.
 */
function PreviewCardPopupPositionerSlot(props: PreviewCardPopupPositionerSlotProps) {
  const { baseProps, ownerState, externalForwardedProps } = props;
  const classes = useUtilityClasses(ownerState);
  const isRtl = useRtl();

  const [PositionerSlot, positionerProps] = useSlot('positioner', {
    elementType: PreviewCardPopupPositioner,
    externalForwardedProps,
    ownerState,
    className: classes.positioner,
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
    additionalProps: { dir: isRtl ? 'rtl' : 'ltr' },
  });

  return <PositionerSlot {...positionerProps} />;
}

export default PreviewCardPopupPositionerSlot;
