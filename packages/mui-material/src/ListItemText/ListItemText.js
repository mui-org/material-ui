'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import Typography, { typographyClasses } from '../Typography';
import ListContext from '../List/ListContext';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import listItemTextClasses, { getListItemTextUtilityClass } from './listItemTextClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, inset, primary, secondary, dense } = ownerState;

  const slots = {
    root: ['root', inset && 'inset', dense && 'dense', primary && secondary && 'multiline'],
    primary: ['primary'],
    secondary: ['secondary'],
  };

  return composeClasses(slots, getListItemTextUtilityClass, classes);
};

const ListItemTextRoot = styled('div', {
  name: 'MuiListItemText',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${listItemTextClasses.primary}`]: styles.primary },
      { [`& .${listItemTextClasses.secondary}`]: styles.secondary },
      styles.root,
      ownerState.inset && styles.inset,
      ownerState.primary && ownerState.secondary && styles.multiline,
      ownerState.dense && styles.dense,
    ];
  },
})({
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  // Combine this and the below selector once https://github.com/emotion-js/emotion/issues/3366 is solved
  [`.${typographyClasses.root}:where(& .${listItemTextClasses.primary})`]: {
    display: 'block',
  },
  [`.${typographyClasses.root}:where(& .${listItemTextClasses.secondary})`]: {
    display: 'block',
  },
  variants: [
    {
      props: ({ ownerState }) => ownerState.primary && ownerState.secondary,
      style: {
        marginTop: 6,
        marginBottom: 6,
      },
    },
    {
      props: ({ ownerState }) => ownerState.inset,
      style: {
        paddingLeft: 56,
      },
    },
  ],
});

const ListItemText = React.forwardRef(function ListItemText(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiListItemText' });
  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    secondary: secondaryProp,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const { dense } = React.useContext(ListContext);

  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;

  const ownerState = {
    ...props,
    disableTypography,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    className: clsx(classes.root, className),
    elementType: ListItemTextRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
    ref,
  });

  const [PrimarySlot, primarySlotProps] = useSlot('primary', {
    className: classes.primary,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
  });
  const [SecondarySlot, secondarySlotProps] = useSlot('secondary', {
    className: classes.secondary,
    elementType: Typography,
    externalForwardedProps,
    ownerState,
  });

  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = (
      <PrimarySlot
        variant={dense ? 'body2' : 'body1'}
        component={primarySlotProps?.variant ? undefined : 'span'}
        {...primarySlotProps}
      >
        {primary}
      </PrimarySlot>
    );
  }

  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = (
      <SecondarySlot variant="body2" color="textSecondary" {...secondarySlotProps}>
        {secondary}
      </SecondarySlot>
    );
  }

  return (
    <RootSlot {...rootSlotProps}>
      {primary}
      {secondary}
    </RootSlot>
  );
});

ListItemText.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Alias for the `primary` prop.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: PropTypes.bool,
  /**
   * The main content element.
   */
  primary: PropTypes.node,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    primary: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    secondary: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    primary: PropTypes.elementType,
    root: PropTypes.elementType,
    secondary: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ListItemText;
