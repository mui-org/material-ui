let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let MenuItem = require('../menus/menu-item');

let SideNavItem = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    innerDivStyle: React.PropTypes.object,
    insetChildren: React.PropTypes.bool,
  },

  getTheme() {
    if(this.context.muiTheme.component.sideNav)
      return this.context.muiTheme.component.sideNav;
    else
      return {
        navItemBackgroundColor: Colors.white,
        navItemTextColor: Colors.black,
      };
  },

  getDefaultProps() {
    return {
      disabled: false,
    };
  },

  render() {
    let {
      disabled,
      innerDivStyle,
      style,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      color: this.getTheme().navItemTextColor,
    }, style);

    let mergedInnerDivStyles = this.mergeAndPrefix({
      display: 'flex',
    }, innerDivStyle);

    return (
      <MenuItem {...other} disabled={disabled} 
         style={mergedStyles} innerDivStyle={mergedInnerDivStyles}>
        {this.props.children}
      </MenuItem>
    );
  },
});

module.exports = SideNavItem;
