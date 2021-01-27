import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import cardActionAreaClasses, { getCardActionAreaUtilityClass } from './cardActionAreaClasses';
import ButtonBase from '../ButtonBase';

const overridesResolver = (props, styles) => {
  // const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    [`& .${cardActionAreaClasses.focusHighlight}`]: styles.focusHighlight,
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
    focusHighlight: ['focusHighlight'],
  };

  return composeClasses(slots, getCardActionAreaUtilityClass, classes);
};

const CardActionAreaRoot = experimentalStyled(
  ButtonBase,
  {},
  {
    name: 'MuiCardActionArea',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme }) => ({
  /* Styles applied to the root element. */
  display: 'block',
  textAlign: 'inherit',
  width: '100%',
  [`&:hover .${cardActionAreaClasses.focusHighlight}`]: {
    opacity: theme.palette.action.hoverOpacity,
    '@media (hover: none)': {
      opacity: 0,
    },
  },
  [`&.Mui-focusVisible .${cardActionAreaClasses.focusHighlight}`]: {
    opacity: theme.palette.action.focusOpacity,
  },
}));

const CardActionAreaFocusHighlight = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiCardActionArea',
    slot: 'FocusHighlight',
  },
)(({ theme }) => ({
  /* Styles applied to the overlay that covers the action area when it is keyboard focused. */
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit',
  opacity: 0,
  backgroundColor: 'currentcolor',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.short,
  }),
}));

const CardActionArea = React.forwardRef(function CardActionArea(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiCardActionArea' });
  const { children, className, focusVisibleClassName, ...other } = props;

  // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed
  const styleProps = { ...props };

  const classes = useUtilityClasses(styleProps);

  return (
    <CardActionAreaRoot
      className={clsx(classes.root, className)}
      focusVisibleClassName={clsx(focusVisibleClassName, classes.focusVisible)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    >
      {children}
      <CardActionAreaFocusHighlight className={classes.focusHighlight} styleProps={styleProps} />
    </CardActionAreaRoot>
  );
});

CardActionArea.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default CardActionArea;
