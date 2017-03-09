// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('MuiListItem', (theme) => {
  const { palette, transitions } = theme;
  return {
    listItem: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
    },
    listItemContainer: {
      position: 'relative',
    },
    keyboardFocused: {
      background: palette.text.divider,
    },
    default: {
      paddingTop: 12,
      paddingBottom: 12,
    },
    dense: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    avatarDense: {
      height: '32px !important',
      marginRight: 8,
      width: '32px !important',
    },
    disabled: {
      opacity: 0.5,
    },
    divider: {
      borderBottom: `1px solid ${palette.text.lightDivider}`,
    },
    gutters: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    button: {
      transition: transitions.create('background-color', {
        duration: transitions.duration.short,
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: palette.text.divider,
        '&$disabled': {
          backgroundColor: 'transparent',
        },
      },
    },
  };
});

const mapListIemChildren = (children, classes, dense) => React.Children.map(children, (child) => {
  const props = {};
  if (child.type.name === 'ListItemIcon') props.dense = dense;
  if (child.type.name === 'Avatar' && dense) props.className = classes.avatarDense;

  return React.cloneElement(child, props);
});

export default class ListItem extends Component {
  static propTypes = {
    button: PropTypes.bool,
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a ReactElement.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    dense: PropTypes.bool,
    /**
     * @ignore
     */
    disabled: PropTypes.bool,
    divider: PropTypes.bool,
    gutters: PropTypes.bool,
  };

  static defaultProps = {
    button: false,
    component: 'div',
    dense: false,
    disabled: false,
    divider: false,
    gutters: true,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      button,
      children: childrenProp,
      className: classNameProp,
      component: componentProp,
      dense,
      disabled,
      divider,
      gutters,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const children = React.Children.toArray(childrenProp);

    // let hasIcon;
    let hasAvatar;
    React.Children.map(children, (child) => {
      // if (child.type.name === 'ListItemIcon') hasIcon = true;
      if (child.type.name === 'Avatar') hasAvatar = true;
    });

    const className = classNames(classes.listItem, {
      [classes.gutters]: gutters,
      [classes.divider]: divider,
      [classes.disabled]: disabled,
      [classes.button]: button,
      [dense || hasAvatar ? classes.dense : classes.default]: true,
    }, classNameProp);

    const listItemProps = { className, disabled, ...other };
    let ComponentMain = componentProp;

    if (button) {
      ComponentMain = ButtonBase;
      listItemProps.component = componentProp || 'div';
      listItemProps.keyboardFocusedClassName = classes.keyboardFocused;
    }

    if (
      children.length &&
      children[children.length - 1].type &&
      children[children.length - 1].type.muiName === 'ListItemSecondaryAction'
    ) {
      const secondaryAction = children.pop();
      return (
        <div className={classes.listItemContainer}>
          <ComponentMain {...listItemProps}>
            {mapListIemChildren(children, classes, dense)}
          </ComponentMain>
          {secondaryAction}
        </div>
      );
    }

    return (
      <ComponentMain {...listItemProps}>
        {mapListIemChildren(children, classes, dense)}
      </ComponentMain>
    );
  }
}
