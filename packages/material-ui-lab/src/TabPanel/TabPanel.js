import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { getTabPanelUtilityClass } from './tabPanelClasses';
import { getPanelId, getTabId, useTabContext } from '../TabContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTabPanelUtilityClass, classes);
};

const TabPanelRoot = styled('div', {
  name: 'MuiTabPanel',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  padding: theme.spacing(3),
}));

const TabPanel = React.forwardRef(function TabPanel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTabPanel' });

  const { children, className, value, ...other } = props;

  const styleProps = {
    ...props,
  };

  const classes = useUtilityClasses(styleProps);

  const context = useTabContext();
  if (context === null) {
    throw new TypeError('No TabContext provided');
  }
  const id = getPanelId(context, value);
  const tabId = getTabId(context, value);

  return (
    <TabPanelRoot
      aria-labelledby={tabId}
      className={clsx(classes.root, className)}
      hidden={value !== context.value}
      id={id}
      ref={ref}
      role="tabpanel"
      styleProps={styleProps}
      {...other}
    >
      {value === context.value && children}
    </TabPanelRoot>
  );
});

TabPanel.propTypes /* remove-proptypes */ = {
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: PropTypes.string.isRequired,
};

export default TabPanel;
