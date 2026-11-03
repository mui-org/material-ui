import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  const { onItemClick } = props;
  return <button onClick={(e) => onItemClick?.(e.nativeEvent, '1')}>click</button>;
}

Component.propTypes = {
  /**
   * Callback fired when item clicked.
   * @param {MouseEvent | React.MouseEvent} event The event source (extended).
   * @param {string} id The item identifier.
   */
  onItemClick: PropTypes.func,
};

export default Component;
