import * as React from 'react';
import PropTypes from 'prop-types';
function Snackbar(props) {
  return <div {...props} />;
}

Snackbar.propTypes = {
  /**
   * Some hints about why this is useful
   */
  id: PropTypes.string,
};

export { Snackbar };
export function SomeOtherComponent(props) {
  return <div {...props} />;
}
