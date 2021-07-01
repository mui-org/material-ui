import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getAccordionActionsUtilityClass } from './accordionActionsClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, disableSpacing } = styleProps;

  const slots = {
    root: ['root', !disableSpacing && 'spacing'],
  };

  return composeClasses(slots, getAccordionActionsUtilityClass, classes);
};

const AccordionActionsRoot = styled('div', {
  name: 'MuiAccordionActions',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, !styleProps.disableSpacing && styles.spacing];
  },
})(({ styleProps }) => ({
  /* Styles applied to the root element. */
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  /* Styles applied to the root element unless `disableSpacing={true}`. */
  ...(!styleProps.disableSpacing && {
    '& > :not(:first-of-type)': {
      marginLeft: 8,
    },
  }),
}));

const AccordionActions = React.forwardRef(function AccordionActions(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAccordionActions' });
  const { className, disableSpacing = false, ...other } = props;
  const styleProps = { ...props, disableSpacing };

  const classes = useUtilityClasses(styleProps);

  return (
    <AccordionActionsRoot
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      {...other}
    />
  );
});

AccordionActions.propTypes /* remove-proptypes */ = {
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default AccordionActions;
