// @flow
import React, {Component, Element, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';

export const styleSheet = createStyleSheet('ListItem', (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 8,
      paddingBottom: 8,
      textDecoration: 'none',
    },
    gutters: theme.mixins.gutters({}),
  };
});

type DefaultProps = {
  component: string|Function,
  gutters: boolean,
};

type Props = {
  children?: Element<any>,
  className?: string,
  component: string|Function,
  gutters: boolean,
};

export default class ListItem extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    styleManager: Object,
  };

  defaultProps:DefaultProps = {
    component: 'div',
    gutters: true,
  };
  
  props:Props;

  render():Element<any> {
    const {className, component, gutters, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});
    const classNames = ClassNames(classes.root, {
      [classes.gutters]: gutters,
    }, className);
    return React.createElement(component, {className: classNames, ...other});
  }
}
