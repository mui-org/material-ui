'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import Paper from '../Paper';
import { getCardUtilityClass } from './cardClasses';
import { CardContextProvider } from './CardContext';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getCardUtilityClass, classes);
};

const CardRoot = styled(Paper, {
  name: 'MuiCard',
  slot: 'Root',
})(({ ownerState, theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  ...(ownerState.clickable && {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: 'currentcolor',
      opacity: 0,
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.short,
      }),
      pointerEvents: 'none',
    },
    '&:hover::after': {
      opacity: (theme.vars || theme).palette.action.hoverOpacity,
    },
  }),
}));

const Card = React.forwardRef(function Card(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCard',
  });

  const { className, raised = false, href, onClick, ...other } = props;

  const ownerState = { ...props, raised, clickable: !!(href || onClick) };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardContextProvider value={{ href, onClick }}>
      <CardRoot
        className={clsx(classes.root, className)}
        elevation={raised ? 8 : undefined}
        ref={ref}
        ownerState={ownerState}
        {...other}
      />
    </CardContextProvider>
  );
});

Card.propTypes /* remove-proptypes */ = {
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
   * If provided, the card will render a clickable link.
   */
  href: PropTypes.string,
  /**
   * If provided, the card will call this function when clicked.
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: chainPropTypes(PropTypes.bool, (props) => {
    if (props.raised && props.variant === 'outlined') {
      return new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.');
    }

    return null;
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

export default Card;
