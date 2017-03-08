// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames'
import customPropTypes from '../utils/customPropTypes';
import Input from 'material-ui/Input';
import ArrowDropDownIcon from '../svg-icons/arrow-drop-down';

const styleSheet = createStyleSheet('MuiSelectFieldInput', (theme) => {
  return {
    root: {
      minWidth: 182
    },
    select: {
      cursor: 'pointer',
      position: 'relative',
      zIndex: 2,
    },
    icon: {
      color: theme.palette.text.secondary,
      position: 'absolute',
      right: 0,
      top: 4,
      zIndex: 1,
    },
  }
})

export default class SelectFieldInput extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const classes = this.context.styleManager.render(styleSheet)
    console.log(this.props)
    return (
      <div className={classes.root}>
        <select {...this.props} className={classNames(this.props.className, classes.select)}>
          {React.Children.map(this.props.options, (option, index) =>
            React.createElement('option', {
              key: index,
              value: option.props.value,
              children: option.props.value && option.props.children,
            })
          )}
        </select>
        <ArrowDropDownIcon className={classes.icon} />
      </div>
    );
  }
}
