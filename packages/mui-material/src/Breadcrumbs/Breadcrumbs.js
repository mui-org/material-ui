'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import integerPropType from '@mui/utils/integerPropType';
import composeClasses from '@mui/utils/composeClasses';
import useSlotProps from '@mui/utils/useSlotProps';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import Typography from '../Typography';
import BreadcrumbCollapsed from './BreadcrumbCollapsed';
import breadcrumbsClasses, { getBreadcrumbsUtilityClass } from './breadcrumbsClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator'],
  };

  return composeClasses(slots, getBreadcrumbsUtilityClass, classes);
};

const BreadcrumbsRoot = styled(Typography, {
  name: 'MuiBreadcrumbs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [{ [`& .${breadcrumbsClasses.li}`]: styles.li }, styles.root];
  },
})({});

const BreadcrumbsOl = styled('ol', {
  name: 'MuiBreadcrumbs',
  slot: 'Ol',
})({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const BreadcrumbsSeparator = styled('li', {
  name: 'MuiBreadcrumbs',
  slot: 'Separator',
})({
  display: 'flex',
  userSelect: 'none',
  marginLeft: 8,
  marginRight: 8,
});

function insertSeparators(items, className, separator, ownerState) {
  return items.reduce((acc, current, index) => {
    acc.push(current);

    if (index < items.length - 1) {
      acc.push(
        <BreadcrumbsSeparator
          aria-hidden
          key={`separator-${index}`}
          className={className}
          ownerState={ownerState}
        >
          {separator}
        </BreadcrumbsSeparator>,
      );
    }

    return acc;
  }, []);
}

const Breadcrumbs = React.forwardRef(function Breadcrumbs(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiBreadcrumbs' });
  const {
    children,
    className,
    component = 'nav',
    slots = {},
    slotProps = {},
    expandText = 'Show path',
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    maxItems = 8,
    separator = '/',
    ...other
  } = props;

  const [expanded, setExpanded] = React.useState(false);

  const ownerState = {
    ...props,
    component,
    expanded,
    expandText,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    maxItems,
    separator,
  };

  const classes = useUtilityClasses(ownerState);

  const collapsedIconSlotProps = useSlotProps({
    elementType: slots.CollapsedIcon,
    externalSlotProps: slotProps.collapsedIcon,
    ownerState,
  });

  const listRef = React.useRef(null);
  const renderItemsBeforeAndAfter = (allItems) => {
    const handleClickExpand = () => {
      setExpanded(true);

      // The clicked element received the focus but gets removed from the DOM.
      // Let's keep the focus in the component after expanding.
      // Moving it to the <ol> or <nav> does not cause any announcement in NVDA.
      // By moving it to some link/button at least we have some announcement.
      const focusable = listRef.current.querySelector('a[href],button,[tabindex]');
      if (focusable) {
        focusable.focus();
      }
    };

    // This defends against someone passing weird input, to ensure that if all
    // items would be shown anyway, we just show all items without the EllipsisItem
    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          [
            'MUI: You have provided an invalid combination of props to the Breadcrumbs.',
            `itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`,
          ].join('\n'),
        );
      }
      return allItems;
    }

    return [
      ...allItems.slice(0, itemsBeforeCollapse),
      <BreadcrumbCollapsed
        aria-label={expandText}
        key="ellipsis"
        slots={{ CollapsedIcon: slots.CollapsedIcon }}
        slotProps={{ collapsedIcon: collapsedIconSlotProps }}
        onClick={handleClickExpand}
      />,
      ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length),
    ];
  };

  const allItems = React.Children.toArray(children)
    .filter((child) => {
      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(
            [
              "MUI: The Breadcrumbs component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );
        }
      }

      return React.isValidElement(child);
    })
    .map((child, index) => (
      <li className={classes.li} key={`child-${index}`}>
        {child}
      </li>
    ));

  return (
    <BreadcrumbsRoot
      ref={ref}
      component={component}
      color="textSecondary"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      <BreadcrumbsOl className={classes.ol} ref={listRef} ownerState={ownerState}>
        {insertSeparators(
          expanded || (maxItems && allItems.length <= maxItems)
            ? allItems
            : renderItemsBeforeAndAfter(allItems),
          classes.separator,
          separator,
          ownerState,
        )}
      </BreadcrumbsOl>
    </BreadcrumbsRoot>
  );
});

Breadcrumbs.propTypes /* remove-proptypes */ = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Show path'
   */
  expandText: PropTypes.string,
  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse: integerPropType,
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse: integerPropType,
  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems: integerPropType,
  /**
   * Custom separator node.
   * @default '/'
   */
  separator: PropTypes.node,
  /**
   * The props used for each slot inside the Breadcumb.
   * @default {}
   */
  slotProps: PropTypes.shape({
    collapsedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Breadcumb.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    CollapsedIcon: PropTypes.elementType,
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

export default Breadcrumbs;
