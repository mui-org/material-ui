import * as React from 'react';
import PropTypes from 'prop-types';
function Snackbar(props) {
  return <div {...props} />;
}
// here we don't care about `key`

Snackbar.propTypes = {
  /**
   * some hints about state reset that relates to prop of this component
   */
  key: () => null,
};

export { Snackbar };
function SomeOtherComponent(props) {
  return <div>{props.children}</div>;
}

SomeOtherComponent.propTypes = {
  children: PropTypes.node,
};

export { SomeOtherComponent };
