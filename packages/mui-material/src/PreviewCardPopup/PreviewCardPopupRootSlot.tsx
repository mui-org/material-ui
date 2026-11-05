'use client';
import * as React from 'react';
import clsx from 'clsx';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import type { HTMLProps } from '@base-ui/react/types';
import { mergeProps } from '@base-ui/react/merge-props';
import composeClasses from '@mui/utils/composeClasses';
import useForkRef from '@mui/utils/useForkRef';
import Paper from '../Paper';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import useSlot from '../utils/useSlot';
import { getPreviewCardPopupUtilityClass } from './previewCardPopupClasses';
import RenderElement from './RenderElement';
import type { PopupRenderState } from './RenderElement';
import type { PreviewCardPopupOwnerState } from './PreviewCardPopup';

const useUtilityClasses = (ownerState: PreviewCardPopupOwnerState) => {
  const { classes, open } = ownerState;
  const slots = { root: ['root', open && 'open'] };
  return composeClasses(slots, getPreviewCardPopupUtilityClass, classes);
};

const PreviewCardPopupRoot = styled(Paper, {
  name: 'MuiPreviewCardPopup',
  slot: 'root',
})(
  memoTheme(({ theme }) => ({
    outline: 0,
    padding: theme.spacing(2),
    maxWidth: 'var(--available-width)',
    maxHeight: 'min(calc(100vh - 96px), var(--available-height))',
    overflowY: 'auto',
    transformOrigin: 'var(--transform-origin)',
  })),
);

export interface PreviewCardPopupRootSlotProps {
  baseProps: HTMLProps;
  baseState: BasePreviewCard.Popup.State;
  ownerState: PreviewCardPopupOwnerState;
  externalForwardedProps: object;
  style?: React.CSSProperties | undefined;
}

/**
 * @ignore - internal component.
 */
const PreviewCardPopupRootSlot = React.forwardRef(function PreviewCardPopupRootSlot(
  props: PreviewCardPopupRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { baseProps, baseState, ownerState, externalForwardedProps, style } = props;
  const { ref: baseRef, ...baseElementProps } = baseProps as HTMLProps & {
    ref?: React.Ref<HTMLDivElement> | undefined;
  };
  const classes = useUtilityClasses(ownerState);
  const handleRef = useForkRef(ref, baseRef);

  const [RootSlot, rootProps] = useSlot('root', {
    ref: handleRef,
    elementType: PreviewCardPopupRoot,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.root, ownerState.className),
    shouldForwardComponentProp: true,
    getSlotProps: (externalHandlers) => mergeProps(baseElementProps, { style }, externalHandlers),
    additionalProps: { elevation: ownerState.elevation },
    internalForwardedProps: ownerState.render
      ? {
          component: RenderElement,
          render: ownerState.render,
          renderState: baseState as PopupRenderState,
        }
      : undefined,
  });

  return <RootSlot {...rootProps} />;
});

export default PreviewCardPopupRootSlot;
