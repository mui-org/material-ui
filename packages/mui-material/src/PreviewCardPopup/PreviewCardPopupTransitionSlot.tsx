'use client';
import * as React from 'react';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type { HTMLProps } from '@base-ui/react/types';
import Grow from '../Grow';
import useSlot from '../utils/useSlot';
import PreviewCardPopupRootSlot from './PreviewCardPopupRootSlot';
import type { PreviewCardPopupOwnerState, PreviewCardPopupProps } from './PreviewCardPopup';

export interface PreviewCardPopupTransitionSlotProps {
  baseProps: HTMLProps;
  baseState: BasePreviewCard.Popup.State;
  ownerState: PreviewCardPopupOwnerState;
  externalForwardedProps: Pick<PreviewCardPopupProps, 'slots' | 'slotProps'> &
    Record<string, unknown>;
  transitionDuration: PreviewCardPopupProps['transitionDuration'];
}

/**
 * @ignore - internal component.
 */
const PreviewCardPopupTransitionSlot = React.forwardRef(function PreviewCardPopupTransitionSlot(
  props: PreviewCardPopupTransitionSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { baseProps, baseState, ownerState, externalForwardedProps, transitionDuration } = props;

  const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
    elementType: Grow,
    externalForwardedProps: {
      slots: { transition: externalForwardedProps.slots?.transition ?? undefined },
      slotProps: {
        transition: externalForwardedProps.slotProps?.transition as
          | Record<string, unknown>
          | ((ownerState: PreviewCardPopupOwnerState) => Record<string, unknown>)
          | undefined,
      },
    },
    ownerState,
    className: undefined,
    additionalProps: {
      appear: false,
      in: baseState.open && baseState.transitionStatus !== 'starting',
    },
  });

  const rootSlot = (
    <PreviewCardPopupRootSlot
      ref={ref}
      baseProps={baseProps}
      baseState={baseState}
      ownerState={ownerState}
      externalForwardedProps={externalForwardedProps}
    />
  );

  if (externalForwardedProps.slots?.transition === null) {
    return rootSlot;
  }

  const timeout =
    transitionDuration === 'auto' &&
    !(TransitionSlot as { muiSupportAuto?: boolean | undefined }).muiSupportAuto
      ? undefined
      : transitionDuration;

  return (
    <TransitionSlot {...transitionSlotProps} timeout={timeout}>
      {rootSlot}
    </TransitionSlot>
  );
});

export default PreviewCardPopupTransitionSlot;
