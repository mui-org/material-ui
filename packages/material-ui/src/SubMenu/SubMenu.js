import * as React from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu';

const SubMenu = React.forwardRef(function SubMenu(props, ref) {
  const { children, ...restProps } = props;
  return (
    <Menu ref={ref} {...restProps}>
      {children}
    </Menu>
  );
});

SubMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
};

export default SubMenu;
