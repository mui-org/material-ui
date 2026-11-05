'use client';
import * as React from 'react';
import type { HTMLProps } from '@base-ui/react/types';
import { mergeProps } from '@base-ui/react/merge-props';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import useSlot from '../utils/useSlot';
import previewCardPopupClasses, {
  getPreviewCardPopupUtilityClass,
} from './previewCardPopupClasses';
import type { PreviewCardPopupProps } from './PreviewCardPopup';

const useUtilityClasses = (ownerState: PreviewCardPopupProps) => {
  const { classes } = ownerState;
  const slots = { portal: ['portal'] };
  return composeClasses(slots, getPreviewCardPopupUtilityClass, classes);
};

const PreviewCardPopupPortal = styled('div', {
  name: 'MuiPreviewCardPopup',
  slot: 'portal',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: (theme.vars || theme).zIndex.tooltip,
    [`&:has(> .${previewCardPopupClasses.positioner}[hidden])`]: { display: 'none' },
  })),
);

export interface PreviewCardPopupPortalSlotProps {
  baseProps: HTMLProps;
  ownerState: PreviewCardPopupProps;
  externalForwardedProps: Pick<PreviewCardPopupProps, 'slots' | 'slotProps'>;
}

/**
 * @ignore - internal component.
 */
function PreviewCardPopupPortalSlot(props: PreviewCardPopupPortalSlotProps) {
  const { baseProps, ownerState, externalForwardedProps } = props;
  const classes = useUtilityClasses(ownerState);

  const [PortalSlot, portalProps] = useSlot('portal', {
    elementType: PreviewCardPopupPortal,
    externalForwardedProps,
    ownerState,
    className: classes.portal,
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
  });

  return <PortalSlot {...portalProps} />;
}

export default PreviewCardPopupPortalSlot;
