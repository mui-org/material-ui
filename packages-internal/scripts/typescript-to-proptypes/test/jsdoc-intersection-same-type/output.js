import * as React from 'react';
import PropTypes from 'prop-types';
function Component(props) {
  const { onClick } = props;
  return <button onClick={(e) => onClick?.(e.nativeEvent)}>click</button>;
}

Component.propTypes = {
  /**
   * Callback fired (extended).
   * @param {MouseEvent} event The event.
   */
  onClick: PropTypes.func,
};

export default Component;
