'use client';
import * as React from 'react';
import clsx from 'clsx';
import type { Meter as BaseMeter } from '@base-ui/react/meter';
import { mergeProps } from '@base-ui/react/merge-props';
import type { HTMLProps } from '@base-ui/react/types';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import useSlot from '../utils/useSlot';
import RenderElement from './RenderElement';
import { getMeterUtilityClass } from './meterClasses';
import type { MeterOwnerState } from './Meter';

const useUtilityClasses = (ownerState: MeterOwnerState) => {
  const { classes } = ownerState;
  const slots = { root: ['root'] };
  return composeClasses(slots, getMeterUtilityClass, classes);
};

const MeterRoot = styled('div', {
  name: 'MuiMeter',
  slot: 'root',
})({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'baseline',
  columnGap: 16,
  rowGap: 8,
  width: '100%',
});

export interface MeterRootSlotProps {
  baseProps: HTMLProps;
  baseState: BaseMeter.Root.State;
  ownerState: MeterOwnerState;
  externalForwardedProps: object;
}

/**
 * @ignore - internal component.
 */
const MeterRootSlot = React.forwardRef(function MeterRootSlot(
  props: MeterRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { baseProps, baseState, ownerState, externalForwardedProps } = props;
  const classes = useUtilityClasses(ownerState);

  const [RootSlot, rootProps] = useSlot('root', {
    ref,
    elementType: MeterRoot,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.root, ownerState.className),
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
    internalForwardedProps: ownerState.render
      ? { as: RenderElement, render: ownerState.render, renderState: baseState }
      : undefined,
  });

  return <RootSlot {...rootProps} />;
});

export default MeterRootSlot;
