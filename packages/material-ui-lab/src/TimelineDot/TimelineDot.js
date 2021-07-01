import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { getTimelineDotUtilityClass } from './timelineDotClasses';

const useUtilityClasses = (styleProps) => {
  const { color, variant, classes } = styleProps;

  const slots = {
    root: ['root', variant, color !== 'inherit' && `${variant}${capitalize(color)}`],
  };

  return composeClasses(slots, getTimelineDotUtilityClass, classes);
};

const TimelineDotRoot = styled('span', {
  name: 'MuiTimelineDot',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styles[
        styleProps.color !== 'inherit' && `${styleProps.variant}${capitalize(styleProps.color)}`
      ],
      styles[styleProps.variant],
    ];
  },
})(({ styleProps, theme }) => ({
  /* Styles applied to the root element. */
  display: 'flex',
  alignSelf: 'baseline',
  borderStyle: 'solid',
  borderWidth: 2,
  padding: 4,
  borderRadius: '50%',
  boxShadow: theme.shadows[1],
  margin: '11.5px 0',
  ...(styleProps.variant === 'filled' && {
    borderColor: 'transparent',
    ...(styleProps.color === 'grey'
      ? {
          color: theme.palette.grey[50],
          backgroundColor: theme.palette.grey[400],
        }
      : {
          color: theme.palette[styleProps.color].contrastText,
          backgroundColor: theme.palette[styleProps.color].main,
        }),
  }),
  ...(styleProps.variant === 'outlined' && {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    ...(styleProps.color === 'grey'
      ? {
          borderColor: theme.palette.grey[400],
        }
      : {
          borderColor: theme.palette[styleProps.color].main,
        }),
  }),
}));

const TimelineDot = React.forwardRef(function TimelineDot(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimelineDot' });
  const { className, color = 'grey', variant = 'filled', ...other } = props;

  const styleProps = {
    ...props,
    color,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TimelineDotRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

TimelineDot.propTypes /* remove-proptypes */ = {
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
   * The dot can have a different colors.
   * @default 'grey'
   */
  color: PropTypes.oneOf([
    'error',
    'grey',
    'info',
    'inherit',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined']),
    PropTypes.string,
  ]),
};

export default TimelineDot;
