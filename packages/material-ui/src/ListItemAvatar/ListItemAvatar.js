import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import ListContext from '../List/ListContext';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getListItemAvatarUtilityClass } from './listItemAvatarClasses';

const useUtilityClasses = (styleProps) => {
  const { alignItems, classes } = styleProps;

  const slots = {
    root: ['root', alignItems === 'flex-start' && 'alignItemsFlexStart'],
  };

  return composeClasses(slots, getListItemAvatarUtilityClass, classes);
};

const ListItemAvatarRoot = styled('div', {
  name: 'MuiListItemAvatar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart];
  },
})(({ styleProps }) => ({
  /* Styles applied to the root element. */
  minWidth: 56,
  flexShrink: 0,
  /* Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  ...(styleProps.alignItems === 'flex-start' && {
    marginTop: 8,
  }),
}));

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */
const ListItemAvatar = React.forwardRef(function ListItemAvatar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemAvatar',
  });

  const { className, ...other } = props;
  const context = React.useContext(ListContext);
  const styleProps = { ...props, alignItems: context.alignItems };
  const classes = useUtilityClasses(styleProps);

  return (
    <ListItemAvatarRoot
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      ref={ref}
      {...other}
    />
  );
});

ListItemAvatar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `Avatar`.
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
};

export default ListItemAvatar;
