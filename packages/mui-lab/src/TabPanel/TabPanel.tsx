'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import composeClasses from '@mui/utils/composeClasses';
import type { InternalStandardProps as StandardProps } from '@mui/material/internal';
import type { SxProps } from '@mui/system';
import { getTabPanelUtilityClass } from './tabPanelClasses';
import type { TabPanelClasses } from './tabPanelClasses';
import { getPanelId, getTabId, useTabContext } from '../TabContext';

export interface TabPanelProps extends StandardProps<React.ComponentPropsWithRef<'div'>> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabPanelClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: string | number;
  /**
   * Always keep the children in the DOM.
   * @default false
   */
  keepMounted?: boolean | undefined;
}

type OwnerState = TabPanelProps;

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes, hidden } = ownerState;

  const slots = {
    root: ['root', hidden && 'hidden'],
  };

  return composeClasses(slots, getTabPanelUtilityClass, classes);
};

const TabPanelRoot = styled('div', {
  name: 'MuiTabPanel',
  slot: 'Root',
})<{ ownerState: OwnerState }>(({ theme }) => ({
  padding: theme.spacing(3),
}));

/**
 *
 * Demos:
 *
 * - [Tabs](https://next.mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [TabPanel API](https://next.mui.com/material-ui/api/tab-panel/)
 */
const TabPanel = React.forwardRef(function TabPanel(
  inProps: TabPanelProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useThemeProps({ props: inProps, name: 'MuiTabPanel' });

  const { children, className, value, keepMounted = false, ...other } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  const context = useTabContext();
  if (context === null) {
    throw /* minify-error */ new TypeError(
      'MUI: No TabContext provided. ' +
        'TabPanel must be used within a TabContext. ' +
        'Wrap your TabPanel with <TabContext value={...}>. ' +
        'See https://mui.com/material-ui/react-tabs/#experimental-api for more info.',
    );
  }
  const id = getPanelId(context, value as string);
  const tabId = getTabId(context, value as string);

  return (
    <TabPanelRoot
      aria-labelledby={tabId}
      className={clsx(classes.root, className)}
      hidden={value !== context.value}
      id={id}
      ref={ref}
      role="tabpanel"
      ownerState={ownerState}
      {...other}
    >
      {(keepMounted || value === context.value) && children}
    </TabPanelRoot>
  );
}) as React.ForwardRefExoticComponent<TabPanelProps>;

TabPanel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
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
   * Always keep the children in the DOM.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The `value` of the corresponding `Tab`. Must use the index of the `Tab` when
   * no `value` was passed to `Tab`.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
} as any;

export default TabPanel;
