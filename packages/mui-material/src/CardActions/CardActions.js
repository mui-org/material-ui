'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getCardActionsUtilityClass } from './cardActionsClasses';
import { useCardContext } from '../Card/CardContext';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, disableSpacing } = ownerState;

  const slots = {
    root: ['root', !disableSpacing && 'spacing'],
    readMore: ['readMore'],
  };

  return composeClasses(slots, getCardActionsUtilityClass, classes);
};

const CardActionsRoot = styled('div', {
  name: 'MuiCardActions',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  },
})({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  position: 'relative',
  '& > *': {
    zIndex: 2,
  },
  variants: [
    {
      props: { disableSpacing: false },
      style: {
        '& > :not(style) ~ :not(style)': {
          marginLeft: 8,
        },
      },
    },
  ],
});

const ReadMore = styled('span')(
  memoTheme(({ theme }) => ({
    ...theme.typography.button,
    color: (theme.vars || theme).palette.primary.main,
    textTransform: 'uppercase',
    padding: '6px 8px',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
    marginLeft: 'auto',
    pointerEvents: 'none',
  })),
);

const CardActions = React.forwardRef(function CardActions(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCardActions',
  });

  const {
    disableSpacing = false,
    className,
    children,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = { ...props, children, disableSpacing };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = { slots, slotProps };

  const { href, onClick } = useCardContext();
  const clickable = !!(href || onClick);

  const [ReadMoreSlot, readMoreSlotProps] = useSlot('readMore', {
    className: classes.readMore,
    elementType: ReadMore,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      'aria-hidden': true,
    },
  });

  return (
    <CardActionsRoot
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      {children}
      {clickable && <ReadMoreSlot {...readMoreSlotProps}>{'Read more'}</ReadMoreSlot>}
    </CardActionsRoot>
  );
});

CardActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    readMore: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    readMore: PropTypes.elementType,
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

export default CardActions;
