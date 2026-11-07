'use client';
import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import type { HTMLProps } from '@base-ui/react/types';
import composeClasses from '@mui/utils/composeClasses';
import type { Theme } from '../styles';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import useSlot from '../utils/useSlot';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import { getMeterUtilityClass } from './meterClasses';
import type { MeterOwnerState } from './Meter';

const useUtilityClasses = (ownerState: MeterOwnerState) => {
  const { classes } = ownerState;
  const slots = {
    label: ['label'],
    value: ['value'],
    track: ['track'],
    indicator: ['indicator'],
  };
  return composeClasses(slots, getMeterUtilityClass, classes);
};

type PaletteMainColors = Record<string, { main: string }>;

const getMainColor = (theme: Theme, color: string) =>
  ((theme.vars || theme).palette as unknown as PaletteMainColors)[color].main;

const MeterLabel = styled('span', {
  name: 'MuiMeter',
  slot: 'label',
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    gridColumn: 1,
    color: (theme.vars || theme).palette.text.primary,
  })),
);

const MeterValue = styled('span', {
  name: 'MuiMeter',
  slot: 'value',
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    gridColumn: 2,
    textAlign: 'end',
    color: (theme.vars || theme).palette.text.secondary,
  })),
);

const MeterTrack = styled('div', {
  name: 'MuiMeter',
  slot: 'track',
})(
  memoTheme(({ theme }) => ({
    gridColumn: '1 / -1',
    position: 'relative',
    overflow: 'hidden',
    height: 4,
    '@media print': {
      colorAdjust: 'exact',
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            backgroundColor: theme.alpha(getMainColor(theme, color), 0.3),
          },
        })),
      {
        props: { color: 'inherit' },
        style: {
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundColor: 'currentColor',
            opacity: 0.3,
          },
        },
      },
    ],
  })),
);

const MeterIndicator = styled('div', {
  name: 'MuiMeter',
  slot: 'indicator',
})(
  memoTheme(({ theme }) => ({
    position: 'relative',
    height: '100%',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.standard,
    }),
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            backgroundColor: getMainColor(theme, color),
          },
        })),
      {
        props: { color: 'inherit' },
        style: {
          backgroundColor: 'currentColor',
        },
      },
    ],
  })),
);

const elementTypes = {
  label: MeterLabel,
  value: MeterValue,
  track: MeterTrack,
  indicator: MeterIndicator,
};

export type MeterInnerSlotName = keyof typeof elementTypes;

export interface MeterInnerSlotProps {
  name: MeterInnerSlotName;
  baseProps: HTMLProps;
  ownerState: MeterOwnerState;
}

/**
 * @ignore - internal component.
 */
function MeterInnerSlot(props: MeterInnerSlotProps) {
  const { name, baseProps, ownerState } = props;
  const classes = useUtilityClasses(ownerState);

  const [Slot, slotProps] = useSlot(name, {
    elementType: elementTypes[name],
    externalForwardedProps: { slots: ownerState.slots, slotProps: ownerState.slotProps },
    ownerState,
    className: classes[name],
    getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
  });

  return <Slot {...slotProps} />;
}

export default MeterInnerSlot;
